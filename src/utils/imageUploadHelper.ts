/**
 * High-performance client-side image compression & conversion helper.
 * Takes user gallery/camera photos and converts them into optimized WebP/JPEG data URLs
 * suitable for real-time Firestore synchronization and immediate rendering.
 */

export interface ProcessedImage {
  dataUrl: string;
  name: string;
  sizeKb: number;
}

export function compressAndConvertImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image element'));
      img.onload = () => {
        let { width, height } = img;

        // Scale down proportionally if larger than maximum dimension
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

        // Draw image with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG
        let dataUrl: string;
        try {
          dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Approximate size in KB
        const head = dataUrl.indexOf(',');
        const base64Length = dataUrl.length - (head + 1);
        const sizeKb = Math.round((base64Length * 3) / 4 / 1024);

        resolve({
          dataUrl,
          name: file.name,
          sizeKb,
        });
      };

      if (readerEvent.target?.result) {
        img.src = readerEvent.target.result as string;
      }
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Process multiple files selected from gallery
 */
export async function processGalleryFiles(files: FileList | File[]): Promise<ProcessedImage[]> {
  const fileArray = Array.from(files);
  const imageFiles = fileArray.filter((f) => f.type.startsWith('image/'));
  
  const results: ProcessedImage[] = [];
  for (const file of imageFiles) {
    try {
      const processed = await compressAndConvertImage(file);
      results.push(processed);
    } catch (err) {
      console.error('Error processing gallery image:', file.name, err);
    }
  }
  return results;
}
