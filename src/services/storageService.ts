import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadResult {
  url: string;
  isCloudStorage: boolean;
  name: string;
  sizeKb: number;
}

/**
 * Optimizes an image using an offscreen canvas to a Blob (WebP/JPEG)
 */
export function optimizeImageToBlob(
  file: File,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.85
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image data'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to dataUrl for quick preview/fallback
        let dataUrl: string;
        try {
          dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Convert to Blob for Firebase Storage upload
        const mimeType = dataUrl.startsWith('data:image/webp') ? 'image/webp' : 'image/jpeg';
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, dataUrl, width, height });
            } else {
              // Fallback to fetch from dataUrl
              fetch(dataUrl)
                .then((r) => r.blob())
                .then((b) => resolve({ blob: b, dataUrl, width, height }))
                .catch(reject);
            }
          },
          mimeType,
          quality
        );
      };

      if (readerEvent.target?.result) {
        img.src = readerEvent.target.result as string;
      }
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Upload single image to Firebase Cloud Storage with automatic fallback to optimized base64
 */
export async function uploadImageToStorage(
  file: File,
  folder = 'products'
): Promise<UploadResult> {
  // 1. Optimize image first
  const { blob, dataUrl } = await optimizeImageToBlob(file);
  const sizeKb = Math.round(blob.size / 1024);

  // 2. Try Firebase Storage upload
  try {
    const cleanFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, '_')
      .replace(/_{2,}/g, '_');
    const storagePath = `wlj_jewellers/${folder}/${Date.now()}_${cleanFileName}`;
    const storageRef = ref(storage, storagePath);

    // Upload blob
    const snapshot = await uploadBytes(storageRef, blob, {
      contentType: blob.type || 'image/jpeg',
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });

    // Get public download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log(`✅ Firebase Storage Upload Success [${folder}]:`, downloadUrl);

    return {
      url: downloadUrl,
      isCloudStorage: true,
      name: file.name,
      sizeKb,
    };
  } catch (err: any) {
    console.error(
      '❌ Firebase Storage upload failed, falling back to optimized base64 data URL:',
      err?.code,
      err?.message || err
    );
    // Graceful fallback: return the high-performance base64 data URL
    return {
      url: dataUrl,
      isCloudStorage: false,
      name: file.name,
      sizeKb,
    };
  }
}

/**
 * Upload multiple images concurrently
 */
export async function uploadMultipleImagesToStorage(
  files: File[],
  folder = 'products'
): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => uploadImageToStorage(file, folder));
  return Promise.all(uploadPromises);
}
