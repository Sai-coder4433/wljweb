import React, { useState } from 'react';
import {
  LayoutDashboard,
  Gem,
  FolderPlus,
  Image as ImageIcon,
  MessageSquareQuote,
  TrendingUp,
  Database,
  Plus,
  Search,
  ExternalLink,
  LogOut,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Star,
  Layers,
  ArrowRight,
  KeyRound,
  Lock,
  Settings,
  Camera,
  UploadCloud,
} from 'lucide-react';
import { Product, HeroSlide, Testimonial, DailyRates, CategoryItem, Language } from '../../types';
import {
  saveProduct,
  deleteProduct,
  saveCategory,
  deleteCategory,
  saveHeroSlide,
  deleteHeroSlide,
  saveTestimonial,
  deleteTestimonial,
  updateDailyRates,
  seedProductsBatch,
  seedHeroSlidesBatch,
  seedTestimonialsBatch,
  seedCategoriesBatch,
} from '../../services/firestoreDataService';
import { uploadImageToStorage } from '../../services/storageService';
import { PRODUCTS, CATEGORIES } from '../../data/jewelleryData';
import { DEFAULT_HERO_SLIDES, DEFAULT_TESTIMONIALS, DEFAULT_RATES } from '../../data/initialData';
import { BrandLogo } from '../BrandLogo';
import { AdminProductModal } from './AdminProductModal';
import { AdminCategoryModal } from './AdminCategoryModal';
import { AdminHeroModal } from './AdminHeroModal';
import { AdminTestimonialModal } from './AdminTestimonialModal';
import { AdminRatesModal } from './AdminRatesModal';
import { AdminSettings } from './AdminSettings';

interface AdminDashboardProps {
  products: Product[];
  categories: CategoryItem[];
  heroSlides: HeroSlide[];
  testimonials: Testimonial[];
  rates: DailyRates;
  onExitToStore: () => void;
  onLogout: () => void;
  firebaseConnected?: boolean;
}

type TabType = 'overview' | 'products' | 'categories' | 'hero' | 'testimonials' | 'rates' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  categories = [],
  heroSlides,
  testimonials,
  rates,
  onExitToStore,
  onLogout,
  firebaseConnected = true,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(null);

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);

  // Security / PIN change modal
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState('');

  // Filters & Search for Products
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');

  // Action toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      prod.marathiName.toLowerCase().includes(productSearch.toLowerCase()) ||
      prod.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      prod.category.toLowerCase().includes(productSearch.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || prod.category === categoryFilter;
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'in_stock' && (prod.inStock ?? true)) ||
      (stockFilter === 'out_of_stock' && prod.inStock === false);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Product CRUD
  const handleSaveProduct = async (product: Product) => {
    await saveProduct(product);

    // Auto-sync subcategory to category in Firestore if not already present
    const subName = (product.marathiSubcategory || product.subcategory || '').trim();
    if (subName && product.category) {
      const targetCategory = categories.find(
        (c) => c.slug === product.category || c.id === product.category
      );
      if (targetCategory) {
        const existingSubs = targetCategory.subcategories || [];
        const exists = existingSubs.some(
          (s) =>
            s.marathiName.toLowerCase() === subName.toLowerCase() ||
            s.name.toLowerCase() === subName.toLowerCase()
        );
        if (!exists) {
          const autoSlug =
            subName
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '') || `sub-${Date.now()}`;
          const newSubItem = {
            id: `sub-${Date.now()}`,
            name: subName,
            marathiName: subName,
            slug: autoSlug,
            image: '',
          };
          const updatedCategory: CategoryItem = {
            ...targetCategory,
            subcategories: [...existingSubs, newSubItem],
          };
          await saveCategory(updatedCategory);
        }
      }
    }

    showToast(`दागिना सेव्ह झाला: ${product.marathiName}`);
  };

  const handleQuickAddSubcategory = async (categoryId: string, subName: string) => {
    const trimmed = subName.trim();
    if (!trimmed) return;
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;

    const existing = cat.subcategories || [];
    if (
      existing.some(
        (s) =>
          s.marathiName.toLowerCase() === trimmed.toLowerCase() ||
          s.name.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      showToast(`'${trimmed}' हा उपवर्ग आधीपासूनच या कॅटेगरीमध्ये आहे.`);
      return;
    }

    const autoSlug =
      trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
      `sub-${Date.now()}`;
    const newSubItem = {
      id: `sub-${Date.now()}`,
      name: trimmed,
      marathiName: trimmed,
      slug: autoSlug,
      image: '',
    };

    const updatedCat: CategoryItem = {
      ...cat,
      subcategories: [...existing, newSubItem],
    };

    await saveCategory(updatedCat);
    showToast(`उपवर्ग जोडला: ${trimmed} ➔ ${cat.marathiName}`);
  };

  const handleUploadSubcategoryPhoto = async (cat: CategoryItem, subId: string, file: File) => {
    try {
      showToast('उपवर्ग फोटो क्लाऊड स्टोरेजवर अपलोड होत आहे...');
      const res = await uploadImageToStorage(file, 'subcategories');
      const updatedSubs = (cat.subcategories || []).map((s) =>
        s.id === subId ? { ...s, image: res.url } : s
      );
      await saveCategory({ ...cat, subcategories: updatedSubs });
      showToast('उपवर्ग फोटो क्लाऊड स्टोरेजवर सेव्ह झाला!');
    } catch (err: any) {
      console.error(err);
      showToast('फोटो अपलोड करताना त्रुटी: ' + (err.message || 'त्रुटी'));
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`तुम्हाला खात्री आहे का की तुम्ही हा दागिना हटवू इच्छिता?\n${name}`)) {
      await deleteProduct(id);
      showToast(`दागिना हटवला: ${name}`);
    }
  };

  const handleToggleStock = async (product: Product) => {
    const updated = { ...product, inStock: !product.inStock };
    await saveProduct(updated);
    showToast(`${product.marathiName} स्टॉक अपडेट: ${updated.inStock ? 'उपलब्ध' : 'अनुपलब्ध'}`);
  };

  // Category CRUD
  const handleSaveCategory = async (cat: CategoryItem) => {
    await saveCategory(cat);
    showToast(`कॅटेगरी सेव्ह झाली: ${cat.marathiName}`);
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (window.confirm(`तुम्हाला खात्री आहे का की तुम्ही ही कॅटेगरी हटवू इच्छिता?\n${name}`)) {
      await deleteCategory(id);
      showToast(`कॅटेगरी हटवली: ${name}`);
    }
  };

  // Hero CRUD
  const handleSaveHeroSlide = async (slide: HeroSlide) => {
    await saveHeroSlide(slide);
    showToast('हिरो बॅनर स्लाइड सेव्ह झाली!');
  };

  const handleDeleteHeroSlide = async (id: string | number) => {
    if (window.confirm('तुम्हाला ही हिरो स्लाइड हटवायची आहे का?')) {
      await deleteHeroSlide(id);
      showToast('हिरो बॅनर स्लाइड हटवली.');
    }
  };

  // Testimonial CRUD
  const handleSaveTestimonial = async (testi: Testimonial) => {
    await saveTestimonial(testi);
    showToast(`ग्राहक अभिप्राय सेव्ह झाला: ${testi.nameMr}`);
  };

  const handleDeleteTestimonial = async (id: string | number, name: string) => {
    if (window.confirm(`तुम्हाला हा अभिप्राय हटवायचा आहे का?\n${name}`)) {
      await deleteTestimonial(id);
      showToast('अभिप्राय हटवला.');
    }
  };

  // Rates CRUD
  const handleSaveRates = async (updatedRates: DailyRates) => {
    await updateDailyRates(updatedRates);
    showToast('आजचे सोने-चांदी भाव अपडेट झाले!');
  };

  // PIN Change Handler
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      setPinChangeMsg('पिन किमान ४ अक्षरांचा किंवा अंकांचा असावा.');
      return;
    }
    localStorage.setItem('wlj_admin_custom_pin', newPin.trim());
    setPinChangeMsg('सुरक्षा पिन यशस्वीरित्या बदलला!');
    setTimeout(() => {
      setIsPinModalOpen(false);
      setPinChangeMsg('');
      setNewPin('');
      showToast('नवीन सुरक्षा पिन सेट झाला आहे.');
    }, 1200);
  };

  // Reseed all data
  const handleReseedAll = async () => {
    if (
      !window.confirm(
        'तुम्हाला मूळ उत्पादने, कॅटेगरीज, हिरो बॅनर आणि ग्राहक अभिप्राय पुन्हा क्लाऊडवर सिंक करायचे आहेत का?'
      )
    )
      return;

    try {
      setIsSeeding(true);
      await seedProductsBatch(PRODUCTS);
      await seedCategoriesBatch(CATEGORIES);
      await seedHeroSlidesBatch(DEFAULT_HERO_SLIDES);
      await seedTestimonialsBatch(DEFAULT_TESTIMONIALS);
      await updateDailyRates(DEFAULT_RATES);
      showToast('🎉 सर्व मूळ डेटा यशस्वीरित्या क्लाऊडवर सिंक झाला!');
    } catch (err: any) {
      console.error(err);
      showToast('डेटा सिंक करताना अडचण आली: ' + err.message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#29231F] flex flex-col font-sans selection:bg-[#3C0015] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3C0015] text-[#E0C068] border border-[#A37B30] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-serif tracking-wider animate-in fade-in duration-300">
          <Sparkles className="w-4 h-4 text-[#E0C068]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#1F000B] text-[#F3F0EA] border-b border-[#A37B30]/40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" variant="maroon" />
            <div className="h-6 w-px bg-[#A37B30]/40 hidden sm:block" />
            <div>
              <span className="text-xs font-serif tracking-wider uppercase text-[#E0C068] font-bold block">
                वाफगावकर लक्ष्मी ज्वेलर्स
              </span>
              <span className="text-[10px] text-[#E8DCC4]/60 tracking-widest uppercase">
                ADMIN PANEL • FIREBASE REALTIME
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('settings')}
              title="सिस्टम सेटिंग्ज व पासवर्ड"
              className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#E0C068] text-[#1F000B] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white/80'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-[#E0C068]" />
              <span className="hidden sm:inline">सिस्टम सेटिंग्ज</span>
            </button>

            <button
              onClick={onExitToStore}
              className="px-3.5 py-1.5 rounded-lg bg-[#3C0015] hover:bg-[#500018] text-[#E0C068] text-xs font-serif tracking-wider border border-[#A37B30]/50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>संकेतस्थळ पहा</span>
            </button>

            <button
              onClick={onLogout}
              title="लॉगआउट"
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clean Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto space-x-1 border-t border-[#A37B30]/20 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 text-xs font-serif tracking-wider uppercase whitespace-nowrap flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#E0C068] text-[#E0C068] font-bold bg-white/5'
                : 'border-transparent text-[#E8DCC4]/70 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            डॅशबोर्ड
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-3.5 text-xs font-serif tracking-wider uppercase whitespace-nowrap flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#E0C068] text-[#E0C068] font-bold bg-white/5'
                : 'border-transparent text-[#E8DCC4]/70 hover:text-white'
            }`}
          >
            <Gem className="w-3.5 h-3.5" />
            दागिने ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-3.5 text-xs font-serif tracking-wider uppercase whitespace-nowrap flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'border-[#E0C068] text-[#E0C068] font-bold bg-white/5'
                : 'border-transparent text-[#E8DCC4]/70 hover:text-white'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            कॅटेगरी ({categories.length})
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`py-3 px-3.5 text-xs font-serif tracking-wider uppercase whitespace-nowrap flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'hero'
                ? 'border-[#E0C068] text-[#E0C068] font-bold bg-white/5'
                : 'border-transparent text-[#E8DCC4]/70 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            हिरो बॅनर ({heroSlides.length})
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`py-3 px-3.5 text-xs font-serif tracking-wider uppercase whitespace-nowrap flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'testimonials'
                ? 'border-[#E0C068] text-[#E0C068] font-bold bg-white/5'
                : 'border-transparent text-[#E8DCC4]/70 hover:text-white'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            ग्राहक अभिप्राय ({testimonials.length})
          </button>

          <button
            onClick={() => setActiveTab('rates')}
            className={`py-3 px-3.5 text-xs font-serif tracking-wider uppercase whitespace-nowrap flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'rates'
                ? 'border-[#E0C068] text-[#E0C068] font-bold bg-white/5'
                : 'border-transparent text-[#E8DCC4]/70 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            सोने-चांदी भाव
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3.5 text-xs font-serif tracking-wider uppercase whitespace-nowrap flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#E0C068] text-[#E0C068] font-bold bg-white/5'
                : 'border-transparent text-[#E8DCC4]/70 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            सिस्टम सेटिंग्ज
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow">
        
        {/* ==============================================================
            TAB 1: OVERVIEW DASHBOARD
        ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#D5C9B8]">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#3C0015]">
                  व्यवस्थापन फलक (Dashboard)
                </h1>
                <p className="text-xs text-[#7A6B5D] mt-0.5">
                  फायरबेस रियल-टाइम क्लाऊड डेटाबेस सुरू आहे.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setIsCategoryModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-white hover:bg-[#F3EFE9] text-[#3C0015] border border-[#D5C9B8] text-xs font-medium rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-[#8B2131]" />
                  + नवीन कॅटेगरी
                </button>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif tracking-wider uppercase font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#E0C068]" />
                  + नवीन दागिना
                </button>
              </div>
            </div>

            {/* KPI Metric Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              
              {/* Card 1: Products */}
              <div
                onClick={() => setActiveTab('products')}
                className="bg-white p-4 rounded-xl border border-[#D5C9B8] shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-serif uppercase tracking-wider text-[#7A6B5D]">
                    एकूण दागिने
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#F7EBEF] text-[#8B2131] flex items-center justify-center">
                    <Gem className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-serif font-bold text-[#3C0015]">
                  {products.length}
                </div>
                <div className="mt-1 text-[11px] text-emerald-700 font-medium">
                  {products.filter((p) => p.inStock ?? true).length} स्टॉकमध्ये
                </div>
              </div>

              {/* Card 2: Categories */}
              <div
                onClick={() => setActiveTab('categories')}
                className="bg-white p-4 rounded-xl border border-[#D5C9B8] shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-serif uppercase tracking-wider text-[#7A6B5D]">
                    वर्गवारी (कॅटेगरी)
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF0D8] text-[#A37B30] flex items-center justify-center">
                    <FolderPlus className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-serif font-bold text-[#3C0015]">
                  {categories.length}
                </div>
                <div className="mt-1 text-[11px] text-[#A37B30] font-medium">
                  सक्रिय कॅटेगरीज
                </div>
              </div>

              {/* Card 3: Hero Slides */}
              <div
                onClick={() => setActiveTab('hero')}
                className="bg-white p-4 rounded-xl border border-[#D5C9B8] shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-serif uppercase tracking-wider text-[#7A6B5D]">
                    हिरो बॅनर
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF0D8] text-[#A37B30] flex items-center justify-center">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-serif font-bold text-[#3C0015]">
                  {heroSlides.length}
                </div>
                <div className="mt-1 text-[11px] text-[#7A6B5D]">
                  होमपेज स्लाइडर
                </div>
              </div>

              {/* Card 4: Reviews */}
              <div
                onClick={() => setActiveTab('testimonials')}
                className="bg-white p-4 rounded-xl border border-[#D5C9B8] shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-serif uppercase tracking-wider text-[#7A6B5D]">
                    ग्राहक अभिप्राय
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0FE] text-blue-700 flex items-center justify-center">
                    <MessageSquareQuote className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-serif font-bold text-[#3C0015]">
                  {testimonials.length}
                </div>
                <div className="mt-1 text-[11px] text-amber-600 font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>५.० स्टार रेटिंग</span>
                </div>
              </div>

              {/* Card 5: Gold 24K */}
              <div
                onClick={() => setIsRatesModalOpen(true)}
                className="bg-white p-4 rounded-xl border border-[#D5C9B8] shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-serif uppercase tracking-wider text-[#7A6B5D]">
                    २४K सोने भाव
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-amber-700 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-xl font-serif font-bold text-[#8B2131]">
                  ₹{(rates.gold24K_10g || 76850).toLocaleString('en-IN')}
                </div>
                <div className="mt-1 text-[11px] text-[#7A6B5D]">
                  २२K: ₹{(rates.gold22K_10g || 70395).toLocaleString('en-IN')}
                </div>
              </div>

              {/* Card 6: System Settings */}
              <div
                onClick={() => setActiveTab('settings')}
                className="bg-white p-4 rounded-xl border border-[#D5C9B8] shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-serif uppercase tracking-wider text-[#7A6B5D]">
                    सिस्टम सेटिंग्ज
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] text-[#3C0015] flex items-center justify-center">
                    <Settings className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-xl font-serif font-bold text-[#3C0015]">
                  सुरक्षा & डेटा
                </div>
                <div className="mt-1 text-[11px] text-[#A37B30] font-medium">
                  पासवर्ड व दालन
                </div>
              </div>
            </div>

            {/* Simple Quick Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="p-4 rounded-xl border border-[#E5DFD5] bg-white hover:bg-[#FAF8F5] text-left transition-colors flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div>
                  <div className="font-serif font-bold text-xs text-[#3C0015] group-hover:text-[#8B2131]">
                    + नवीन दागिना जोडा
                  </div>
                  <div className="text-[11px] text-[#7A6B5D] mt-0.5">
                    गॅलरीतून फोटो व वजन
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A37B30] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryModalOpen(true);
                }}
                className="p-4 rounded-xl border border-[#E5DFD5] bg-white hover:bg-[#FAF8F5] text-left transition-colors flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div>
                  <div className="font-serif font-bold text-xs text-[#3C0015] group-hover:text-[#8B2131]">
                    + नवीन कॅटेगरी जोडा
                  </div>
                  <div className="text-[11px] text-[#7A6B5D] mt-0.5">
                    कंबरपट्टा, मंगळसूत्र, हार इ.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A37B30] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setEditingHeroSlide(null);
                  setIsHeroModalOpen(true);
                }}
                className="p-4 rounded-xl border border-[#E5DFD5] bg-white hover:bg-[#FAF8F5] text-left transition-colors flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div>
                  <div className="font-serif font-bold text-xs text-[#3C0015] group-hover:text-[#8B2131]">
                    + नवीन हिरो बॅनर जोडा
                  </div>
                  <div className="text-[11px] text-[#7A6B5D] mt-0.5">
                    होमपेज स्लाइडर फोटो
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A37B30] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsRatesModalOpen(true)}
                className="p-4 rounded-xl border border-[#E5DFD5] bg-white hover:bg-[#FAF8F5] text-left transition-colors flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div>
                  <div className="font-serif font-bold text-xs text-[#3C0015] group-hover:text-[#8B2131]">
                    आजचे भाव बदला
                  </div>
                  <div className="text-[11px] text-[#7A6B5D] mt-0.5">
                    सोने व चांदी दर अपडेट
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A37B30] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 2: PRODUCTS MANAGEMENT (NO PRICE, CLEAN TABLE)
        ============================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#D5C9B8]">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#3C0015]">
                  दागिने व्यवस्थापन ({filteredProducts.length}/{products.length})
                </h2>
                <p className="text-xs text-[#7A6B5D]">
                  किमतींशिवाय शुद्धता व अचूक वजनासह दागिन्यांची यादी.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="px-4 py-2 bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif tracking-wider uppercase font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#E0C068]" />
                नवीन दागिना जोडा
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-3 rounded-xl border border-[#D5C9B8] shadow-xs flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6B5D]" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="नाव, SKU किंवा प्रकार शोधा..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                >
                  <option value="all">सर्व वर्ग (All Categories)</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.marathiName} ({c.name})
                    </option>
                  ))}
                </select>

                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value as any)}
                  className="px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                >
                  <option value="all">सर्व स्टॉक</option>
                  <option value="in_stock">उपलब्ध (In Stock)</option>
                  <option value="out_of_stock">अनुपलब्ध (Out)</option>
                </select>
              </div>
            </div>

            {/* Products Table (Clean, No Price column) */}
            <div className="bg-white rounded-xl border border-[#D5C9B8] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-[#D5C9B8] text-[#5A4D41] uppercase tracking-wider font-serif">
                    <tr>
                      <th className="px-4 py-3">फोटो</th>
                      <th className="px-4 py-3">दागिन्याचे नाव (मराठी व इंग्रजी)</th>
                      <th className="px-4 py-3">SKU / प्रकार</th>
                      <th className="px-4 py-3">धातू / शुद्धता / वजन</th>
                      <th className="px-4 py-3">स्टॉक स्थिती</th>
                      <th className="px-4 py-3 text-right">कृती</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DFD5]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        
                        <td className="px-4 py-2.5">
                          <div className="relative w-12 h-12 rounded-lg border border-[#D5C9B8] overflow-hidden bg-[#FAF8F5] flex-shrink-0">
                            <img
                              src={p.images[0] || 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=200'}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                            {p.images.length > 1 && (
                              <span className="absolute bottom-0 right-0 bg-[#3C0015] text-[#E0C068] text-[9px] px-1 font-bold">
                                +{p.images.length - 1}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-2.5">
                          <div className="font-serif font-bold text-sm text-[#3C0015]">
                            {p.marathiName}
                          </div>
                          <div className="text-[11px] text-[#7A6B5D] font-sans">
                            {p.name}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {p.featured && (
                              <span className="px-1.5 py-0.2 bg-[#FAF0D8] text-[#A37B30] text-[9px] rounded font-medium">
                                निवडक
                              </span>
                            )}
                            {p.isBridal && (
                              <span className="px-1.5 py-0.2 bg-[#3C0015] text-[#E0C068] text-[9px] rounded font-medium">
                                वधू साज
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-2.5">
                          <span className="font-mono text-[11px] text-[#5A4D41] bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E5DFD5]">
                            {p.sku}
                          </span>
                          <div className="text-[11px] text-[#7A6B5D] mt-1">
                            {p.marathiCategory || p.category}
                          </div>
                        </td>

                        <td className="px-4 py-2.5">
                          <div className="font-medium text-[#29231F]">
                            {p.marathiMetal || p.metal}
                          </div>
                          <div className="text-[11px] text-[#7A6B5D]">
                            {p.purity} • {p.weight}
                          </div>
                        </td>

                        <td className="px-4 py-2.5">
                          <button
                            type="button"
                            onClick={() => handleToggleStock(p)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                              (p.inStock ?? true)
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {(p.inStock ?? true) ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                उपलब्ध (In Stock)
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 text-red-600" />
                                अनुपलब्ध (Out)
                              </>
                            )}
                          </button>
                        </td>

                        <td className="px-4 py-2.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setIsProductModalOpen(true);
                              }}
                              title="संपादन करा"
                              className="p-1.5 rounded-lg border border-[#D5C9B8] hover:bg-[#FAF8F5] text-[#3C0015] transition-colors cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.marathiName)}
                              title="हटवा"
                              className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-[#7A6B5D]">
                          कोणतेही उत्पादन सापडले नाही. शोध शब्द किंवा फिल्टर बदला.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 3: CATEGORIES & SUBCATEGORIES MANAGEMENT
        ============================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#D5C9B8]">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#3C0015] flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-[#8B2131]" />
                  वर्गवारी व उप-वर्गवारी व्यवस्थापन ({categories.length} Categories & Subcategories)
                </h2>
                <p className="text-xs text-[#7A6B5D]">
                  गॅलरीतून फोटो निवडून नवीन कॅटेगरी जोडा आणि त्याखालील उपवर्ग (उदा. ठुशी, साज, तोडे, झुमके) नियंत्रित करा.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryModalOpen(true);
                }}
                className="px-4 py-2 bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif tracking-wider uppercase font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#E0C068]" />
                नवीन कॅटेगरी जोडा (Add Category)
              </button>
            </div>

            {/* Categories Grid with Subcategories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.slug).length;
                const subs = cat.subcategories || [];

                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-xl border border-[#D5C9B8] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group p-4 text-center justify-between"
                  >
                    <div>
                      {/* Category circular photo */}
                      <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#D7B95F]/50 shadow-inner bg-[#FAF8F5]">
                        <img
                          src={cat.image || 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=200'}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="mt-3">
                        <h4 className="font-serif font-bold text-sm text-[#3C0015]">
                          {cat.marathiName}
                        </h4>
                        <p className="text-xs text-[#7A6B5D]">
                          {cat.name}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-center gap-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] text-[#5A4D41] border border-[#E5DFD5] font-mono">
                          {cat.slug}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF0D8] text-[#A37B30] font-medium">
                          {count} दागिने
                        </span>
                        {cat.metalType && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#F7EBEF] text-[#8B2131] font-medium">
                            {cat.metalType}
                          </span>
                        )}
                      </div>

                      {/* Subcategories tags display with thumbnail & photo upload */}
                      <div className="mt-3 pt-2.5 border-t border-[#F0EAE1] text-left">
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-serif font-bold text-[#5A4D41]">
                            उपवर्ग (Subcategories):
                          </span>
                          <span className="text-[10px] bg-[#FAF8F5] text-[#7A6B5D] px-1.5 py-0.2 rounded border border-[#E5DFD5]">
                            {subs.length} प्रकार
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 min-h-[30px]">
                          {subs.slice(0, 6).map((sub) => (
                            <div
                              key={sub.id}
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FAF0D8] text-[#3C0015] rounded-lg border border-[#D7B95F]/40 text-[10px] font-serif group"
                            >
                              {sub.image ? (
                                <img
                                  src={sub.image}
                                  alt={sub.marathiName}
                                  className="w-4 h-4 rounded-full object-cover border border-[#D7B95F]/70 flex-shrink-0"
                                />
                              ) : (
                                <label
                                  className="w-4 h-4 rounded-full bg-white/90 border border-[#D5C9B8] flex items-center justify-center cursor-pointer hover:bg-white text-[#8B2131] flex-shrink-0 transition-colors"
                                  title="या उपवर्गाचा फोटो अपलोड करा"
                                >
                                  <Camera className="w-2.5 h-2.5" />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        handleUploadSubcategoryPhoto(cat, sub.id, e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              )}
                              <span>{sub.marathiName || sub.name}</span>
                            </div>
                          ))}
                          {subs.length > 6 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-[#7A6B5D] font-medium self-center">
                              +{subs.length - 6} आणखी
                            </span>
                          )}
                          {subs.length === 0 && (
                            <span className="text-[11px] text-[#7A6B5D]/70 italic">
                              उपवर्ग जोडलेले नाहीत
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick inline subcategory add form */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          const input = form.elements.namedItem('subName') as HTMLInputElement;
                          if (input && input.value) {
                            handleQuickAddSubcategory(cat.id, input.value);
                            input.value = '';
                          }
                        }}
                        className="mt-2 pt-2 border-t border-[#F0EAE1] flex gap-1"
                      >
                        <input
                          name="subName"
                          type="text"
                          placeholder="+ नवा उपवर्ग टाका..."
                          className="flex-1 px-2 py-1 text-[11px] bg-[#FAF8F5] border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#8B2131]"
                        />
                        <button
                          type="submit"
                          title="उपवर्ग जोडा"
                          className="px-2.5 py-1 bg-[#3C0015] hover:bg-[#500018] text-[#E0C068] text-[10px] font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap"
                        >
                          + जोडा
                        </button>
                      </form>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-3.5 pt-2.5 border-t border-[#E5DFD5] flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setEditingCategory(cat);
                          setIsCategoryModalOpen(true);
                        }}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-[#FAF8F5] hover:bg-[#FAF0D8] text-[#3C0015] border border-[#D5C9B8] text-xs font-serif font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#8B2131]" />
                        उपवर्ग संपादन करा
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.marathiName)}
                        title="हटवा"
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 4: HERO BANNERS MANAGEMENT
        ============================================================== */}
        {activeTab === 'hero' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#D5C9B8]">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#3C0015]">
                  हिरो बॅनर स्लाइड्स ({heroSlides.length})
                </h2>
                <p className="text-xs text-[#7A6B5D]">
                  गॅलरीतून फोटो निवडून होमपेज बॅनर अपडेट करा.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingHeroSlide(null);
                  setIsHeroModalOpen(true);
                }}
                className="px-4 py-2 bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif tracking-wider uppercase font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#E0C068]" />
                नवीन बॅनर जोडा
              </button>
            </div>

            {/* Slides List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="bg-white rounded-xl border border-[#D5C9B8] shadow-xs overflow-hidden flex flex-col group"
                >
                  <div className="relative aspect-video bg-black/10 overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.headlineEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#3C0015]/90 text-[#E0C068] text-[10px] font-serif font-bold px-2 py-0.5 rounded shadow">
                      स्लाइड क्र. {slide.order ?? idx + 1}
                    </div>

                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          (slide.active ?? true)
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-600 text-white'
                        }`}
                      >
                        {(slide.active ?? true) ? 'सक्रिय' : 'बंद'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                    <div>
                      <div className="text-[10px] text-[#A37B30] uppercase font-serif tracking-widest font-semibold">
                        {slide.smallLabelMr}
                      </div>
                      <h3 className="font-serif font-bold text-xs text-[#3C0015] mt-1 line-clamp-2">
                        {slide.headlineMr}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-[#E5DFD5] flex items-center justify-between text-xs">
                      <div className="text-[10px] text-[#8C7A6B]">
                        बटण: <span className="font-medium text-[#29231F]">{slide.ctaMr}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingHeroSlide(slide);
                            setIsHeroModalOpen(true);
                          }}
                          className="p-1 rounded-lg border border-[#D5C9B8] hover:bg-[#FAF8F5] text-[#3C0015] transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteHeroSlide(slide.id)}
                          className="p-1 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 5: TESTIMONIALS MANAGEMENT
        ============================================================== */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#D5C9B8]">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#3C0015]">
                  ग्राहक अभिप्राय ({testimonials.length})
                </h2>
                <p className="text-xs text-[#7A6B5D]">
                  सध्याचे सर्व ५ मूळ अभिप्राय कायम आहेत. नवीन अभिप्राय जोडण्यासाठी बटण वापरा.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTestimonial(null);
                  setIsTestimonialModalOpen(true);
                }}
                className="px-4 py-2 bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif tracking-wider uppercase font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#E0C068]" />
                नवीन अभिप्राय जोडा
              </button>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((testi) => (
                <div
                  key={testi.id}
                  className="bg-white p-4 rounded-xl border border-[#D5C9B8] shadow-xs flex flex-col justify-between space-y-2.5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#D4AF37]">
                        {[...Array(testi.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#8C7A6B]">{testi.date}</span>
                    </div>

                    <p className="text-xs text-[#3C0015] leading-relaxed italic line-clamp-3">
                      "{testi.reviewMr}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E5DFD5] flex items-center justify-between">
                    <div>
                      <div className="font-serif font-bold text-xs text-[#29231F]">
                        {testi.nameMr}
                      </div>
                      <div className="text-[10px] text-[#7A6B5D]">
                        {testi.locationMr} • {testi.occasionMr}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingTestimonial(testi);
                          setIsTestimonialModalOpen(true);
                        }}
                        className="p-1 rounded-lg border border-[#D5C9B8] hover:bg-[#FAF8F5] text-[#3C0015] transition-colors cursor-pointer"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testi.id, testi.nameMr)}
                        className="p-1 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 6: LIVE BULLION RATES
        ============================================================== */}
        {activeTab === 'rates' && (
          <div className="max-w-xl mx-auto space-y-4 animate-in fade-in duration-200">
            
            <div className="text-center space-y-1 pb-2 border-b border-[#D5C9B8]">
              <h2 className="text-lg font-serif font-bold text-[#3C0015]">
                आजचे थेट सोने-चांदी भाव
              </h2>
              <p className="text-xs text-[#7A6B5D]">
                येथे बदललेले भाव मुख्य संकेतस्थळाच्या टिकर बारवर तत्काळ दिसतील.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#D5C9B8] shadow-xs space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD5]">
                  <span className="text-[10px] text-[#7A6B5D] uppercase font-serif">२४K शुद्ध सोने</span>
                  <div className="text-xl font-serif font-bold text-[#8B2131] mt-0.5">
                    ₹{(rates.gold24K_10g || 76850).toLocaleString('en-IN')}
                  </div>
                  <span className="text-[9px] text-[#8C7A6B]">प्रति १० ग्रॅम</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD5]">
                  <span className="text-[10px] text-[#7A6B5D] uppercase font-serif">२२K हॉलमार्क सोने</span>
                  <div className="text-xl font-serif font-bold text-[#8B2131] mt-0.5">
                    ₹{(rates.gold22K_10g || 70395).toLocaleString('en-IN')}
                  </div>
                  <span className="text-[9px] text-[#8C7A6B]">प्रति १० ग्रॅम</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD5]">
                  <span className="text-[10px] text-[#7A6B5D] uppercase font-serif">१८K दागिना सोने</span>
                  <div className="text-xl font-serif font-bold text-[#8B2131] mt-0.5">
                    ₹{(rates.gold18K_10g || 57638).toLocaleString('en-IN')}
                  </div>
                  <span className="text-[9px] text-[#8C7A6B]">प्रति १० ग्रॅम</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD5]">
                  <span className="text-[10px] text-[#7A6B5D] uppercase font-serif">शुद्ध चांदी</span>
                  <div className="text-xl font-serif font-bold text-[#8B2131] mt-0.5">
                    ₹{(rates.silver1kg || 94800).toLocaleString('en-IN')}
                  </div>
                  <span className="text-[9px] text-[#8C7A6B]">प्रति १ किलो</span>
                </div>
              </div>

              <button
                onClick={() => setIsRatesModalOpen(true)}
                className="w-full py-2.5 bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif font-bold tracking-wider uppercase rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-[#E0C068]" />
                दर बदला / नवीन भाव टाका (Update Rates)
              </button>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 7: SYSTEM SETTINGS & PASSWORD MANAGEMENT
        ============================================================== */}
        {activeTab === 'settings' && (
          <AdminSettings
            onReseedAll={handleReseedAll}
            isSeeding={isSeeding}
            showToast={showToast}
          />
        )}
      </main>

      {/* Modals */}
      <AdminProductModal
        isOpen={isProductModalOpen}
        product={editingProduct}
        categories={categories}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        onOpenAddCategory={() => {
          setIsProductModalOpen(false);
          setEditingCategory(null);
          setIsCategoryModalOpen(true);
        }}
      />

      <AdminCategoryModal
        isOpen={isCategoryModalOpen}
        category={editingCategory}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
      />

      <AdminHeroModal
        isOpen={isHeroModalOpen}
        slide={editingHeroSlide}
        onClose={() => setIsHeroModalOpen(false)}
        onSave={handleSaveHeroSlide}
      />

      <AdminTestimonialModal
        isOpen={isTestimonialModalOpen}
        testimonial={editingTestimonial}
        onClose={() => setIsTestimonialModalOpen(false)}
        onSave={handleSaveTestimonial}
      />

      <AdminRatesModal
        isOpen={isRatesModalOpen}
        rates={rates}
        onClose={() => setIsRatesModalOpen(false)}
        onSave={handleSaveRates}
      />

      {/* Change PIN Security Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] text-[#29231F] w-full max-w-sm rounded-2xl shadow-2xl border border-[#D5C9B8] overflow-hidden p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#D5C9B8]">
              <h3 className="font-serif font-bold text-sm text-[#3C0015] flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#8B2131]" />
                सुरक्षा पिन बदला (Change PIN)
              </h3>
              <button
                onClick={() => setIsPinModalOpen(false)}
                className="p-1 text-[#7A6B5D] hover:text-[#29231F]"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePin} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  नवीन सुरक्षा पिन टाका
                </label>
                <input
                  type="password"
                  required
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="उदा. 1951 किंवा नवा पिन"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              {pinChangeMsg && (
                <p className="text-xs text-emerald-700 font-medium">
                  {pinChangeMsg}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#5A4D41] hover:bg-white rounded-lg border border-[#D5C9B8]"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#3C0015] hover:bg-[#500018] rounded-lg shadow-xs"
                >
                  पिन सेव्ह करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
