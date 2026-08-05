import React, { useState, useEffect } from 'react';
import { LinkItem, CartItem, StoreSettings, Testimonial, OrderLead, FreeWebTool, FaqItem } from './types';
import { DEMO_ITEMS } from './data/initialData';
import {
  getStoredSettings,
  saveStoredSettings,
  getStoredItems,
  saveStoredItems,
  getStoredTestimonials,
  saveStoredTestimonials,
  getStoredOrders,
  saveStoredOrders,
  getStoredFreeTools,
  saveStoredFreeTools,
  getStoredFaqs,
  saveStoredFaqs,
  resetToDefaultData,
} from './utils/storage';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { InternationalTickerBar } from './components/InternationalTickerBar';
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { FreeToolsSection } from './components/FreeToolsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CommunityBanner } from './components/CommunityBanner';
import { RecommendationQuiz } from './components/RecommendationQuiz';
import { GoldCalculatorModal } from './components/GoldCalculatorModal';
import { ZakatCalculatorModal } from './components/ZakatCalculatorModal';
import { SurahDoaModal } from './components/SurahDoaModal';
import { ShareModal } from './components/ShareModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ShoppingCartDrawer } from './components/ShoppingCartDrawer';
import { AdminModal } from './components/AdminModal';
import { AdminPanel } from './components/AdminPanel';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import {
  seedInitialFirestoreData,
  subscribeProducts,
  subscribeSettings,
  subscribeTestimonials,
  subscribeFaqs,
  saveProductToFirestore,
  saveSettingsToFirestore,
  saveTestimonialsToFirestore,
  saveFaqsToFirestore,
  logOrderToFirestore
} from './lib/firebase';

export default function App() {
  const [settings, setSettings] = useState<StoreSettings>(getStoredSettings());
  const [items, setItems] = useState<LinkItem[]>(getStoredItems());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getStoredTestimonials());
  const [faqs, setFaqs] = useState<FaqItem[]>(getStoredFaqs());
  const [orders, setOrders] = useState<OrderLead[]>(getStoredOrders());
  const [freeTools, setFreeTools] = useState<FreeWebTool[]>(getStoredFreeTools());
  const [cart, setCart] = useState<CartItem[]>([]);

  // Interactive Modals State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isGoldCalcOpen, setIsGoldCalcOpen] = useState(false);
  const [isZakatCalcOpen, setIsZakatCalcOpen] = useState(false);
  const [isSurahDoaOpen, setIsSurahDoaOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // International Currency & Language Switchers
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');

  const handleToggleCurrency = () => setCurrency((c) => (c === 'IDR' ? 'USD' : 'IDR'));
  const handleToggleLang = () => setLang((l) => (l === 'ID' ? 'EN' : 'ID'));

  // Dark / Light Mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sahabat_kafa_theme_mode');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // Sync isDarkMode with themeBackground whenever themeBackground changes
  useEffect(() => {
    if (settings.themeBackground === 'clean-light') {
      setIsDarkMode(false);
      localStorage.setItem('sahabat_kafa_theme_mode', 'light');
    } else if (['luxury-dark', 'emerald-gold', 'cosmic-earth'].includes(settings.themeBackground)) {
      setIsDarkMode(true);
      localStorage.setItem('sahabat_kafa_theme_mode', 'dark');
    }
  }, [settings.themeBackground]);

  // Filtering & Navigation Tab State
  const [activeMainTab, setActiveMainTab] = useState<'katalog' | 'web-gratis'>('katalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers State
  const [detailProduct, setDetailProduct] = useState<LinkItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState<boolean>(false);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('sahabat_kafa_theme_mode', next ? 'dark' : 'light');
      return next;
    });
  };

  // Global Secret Shortcut for Admin Login (Ctrl + Shift + A or Alt + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.altKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsAdminPanelOpen((prev) => !prev);
        } else {
          setIsAdminModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  useEffect(() => {
    // Initialize Firestore initial data if empty
    seedInitialFirestoreData();

    // Subscribe to real-time products
    const unsubProducts = subscribeProducts((firestoreProducts) => {
      if (firestoreProducts && firestoreProducts.length > 0) {
        setItems(firestoreProducts);
      }
    });

    // Subscribe to real-time settings
    const unsubSettings = subscribeSettings((firestoreSettings) => {
      if (firestoreSettings) {
        setSettings(firestoreSettings);
      }
    });

    // Subscribe to real-time testimonials
    const unsubTestis = subscribeTestimonials((firestoreTestis) => {
      if (firestoreTestis) {
        setTestimonials(firestoreTestis);
      }
    });

    // Subscribe to real-time FAQs
    const unsubFaqs = subscribeFaqs((firestoreFaqs) => {
      if (firestoreFaqs && firestoreFaqs.length > 0) {
        setFaqs(firestoreFaqs);
      }
    });

    return () => {
      unsubProducts();
      unsubSettings();
      unsubTestis();
      unsubFaqs();
    };
  }, []);

  // Sync state handlers
  const handleSaveSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
    saveSettingsToFirestore(newSettings);
  };

  const handleSaveItems = (newItems: LinkItem[]) => {
    setItems(newItems);
    saveStoredItems(newItems);
    newItems.forEach((item) => saveProductToFirestore(item));
  };

  const handleSaveTestimonials = (newTestis: Testimonial[]) => {
    setTestimonials(newTestis);
    saveStoredTestimonials(newTestis);
    saveTestimonialsToFirestore(newTestis);
  };

  const handleSaveFaqs = (newFaqs: FaqItem[]) => {
    setFaqs(newFaqs);
    saveStoredFaqs(newFaqs);
    saveFaqsToFirestore(newFaqs);
  };

  const handleSaveOrders = (newOrders: OrderLead[]) => {
    setOrders(newOrders);
    saveStoredOrders(newOrders);
  };

  const handleSaveFreeTools = (newTools: FreeWebTool[]) => {
    setFreeTools(newTools);
    saveStoredFreeTools(newTools);
  };

  const handleResetData = () => {
    const { settings: defSet, items: defItems, testimonials: defTestis, freeTools: defTools, faqs: defFaqs } = resetToDefaultData();
    setSettings(defSet);
    setItems(defItems);
    setTestimonials(defTestis);
    setFreeTools(defTools);
    setFaqs(defFaqs);
    setOrders([]);
    setCart([]);
  };

  // Cart Management
  const handleAddToCart = (product: LinkItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.product.id === product.id);
      if (existing) {
        return prevCart.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: LinkItem) => {
    if (product.url && product.url.trim().length > 0) {
      let targetUrl = product.url.trim();
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
      }
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      const cleanWa = settings.whatsappNumber.replace(/[^0-9]/g, '');
      const waMessage = encodeURIComponent(`Halo, saya ingin memesan/membeli ${product.title}`);
      window.open(`https://wa.me/${cleanWa}?text=${waMessage}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Admin authentication (Supports Username + Password or PIN)
  const handleAuthenticateAdmin = (credentials: { username?: string; password?: string; pin?: string }) => {
    const targetUsername = settings.adminUsername || 'admin';
    const targetPassword = settings.adminPassword || 'kafa123';
    const targetPin = settings.adminPin || '1234';

    if (credentials.username && credentials.password) {
      if (
        credentials.username.trim().toLowerCase() === targetUsername.trim().toLowerCase() &&
        credentials.password === targetPassword
      ) {
        setIsAdminLoggedIn(true);
        setIsAdminModalOpen(false);
        setIsAdminPanelOpen(true);
        return true;
      }
    }

    if (credentials.pin) {
      if (credentials.pin === targetPin || credentials.pin === targetPassword) {
        setIsAdminLoggedIn(true);
        setIsAdminModalOpen(false);
        setIsAdminPanelOpen(true);
        return true;
      }
    }

    return false;
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsAdminPanelOpen(false);
  };

  // Categories
  const categories = Array.from(new Set(items.map((i) => i.category))).filter(Boolean);

  // Filter items
  const visibleItems = items
    .filter((i) => i.isActive)
    .filter((i) => {
      if (selectedCategory !== 'Semua' && i.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          i.title.toLowerCase().includes(q) ||
          (i.subtitle && i.subtitle.toLowerCase().includes(q)) ||
          i.category.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const getThemeBackgroundClass = () => {
    if (!isDarkMode) {
      return 'bg-slate-50 text-slate-900';
    }
    switch (settings.themeBackground) {
      case 'emerald-gold':
        return 'bg-gradient-to-b from-slate-950 via-emerald-950 to-teal-950 text-slate-100';
      case 'cosmic-earth':
        return 'bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-slate-100';
      case 'luxury-dark':
      case 'clean-light':
      default:
        return 'bg-slate-950 text-slate-100';
    }
  };

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-x-hidden ${getThemeBackgroundClass()}`}>
      {/* Interactive Cursor Aura */}
      <CustomCursor />

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />

      {/* Background Graphic Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-600/10 via-teal-900/10 to-transparent blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Ticker Announcement */}
      {!announcementDismissed && (
        <AnnouncementBar
          text={settings.announcementText}
          active={settings.announcementActive}
          onClose={() => setAnnouncementDismissed(true)}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        settings={settings}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Live International Market & Gold Ticker */}
      <InternationalTickerBar currency={currency} lang={lang} settings={settings} />

      {/* Hero Header Section */}
      <HeroSection
        settings={settings}
        selectedCategory={selectedCategory}
        categories={categories}
        onSelectCategory={setSelectedCategory}
        totalProductsCount={items.filter((i) => i.isActive).length}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Tab Navigation Bar */}
      <div className="max-w-3xl mx-auto px-4 my-6">
        <div className="p-1.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveMainTab('katalog')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeMainTab === 'katalog'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]'
                : 'text-slate-700 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white'
            }`}
          >
            <span>🛍️ Katalog Produk & Kelas</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-emerald-500/10 dark:bg-white/20 text-emerald-800 dark:text-white text-[10px]">
              {items.filter((i) => i.isActive).length}
            </span>
          </button>

          {settings.showFreeTools !== false && (
            <button
              onClick={() => setActiveMainTab('web-gratis')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                activeMainTab === 'web-gratis'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]'
                  : 'text-slate-700 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white'
              }`}
            >
              <span>🌐 Web Tools Sahabat</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-800 dark:text-amber-300 text-[10px]">
                FREE
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Main Showcase Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-24 space-y-12">
        {activeMainTab === 'katalog' && (
          <>
            <ProductGrid
              items={visibleItems}
              onViewDetail={(item) => setDetailProduct(item)}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
              onLoadSampleData={() => handleSaveItems(DEMO_ITEMS)}
            />

            {/* Free Tools ecosystem rendered once */}
            {settings.showFreeTools !== false && (
              <FreeToolsSection
                tools={freeTools}
                onOpenGoldCalc={() => setIsGoldCalcOpen(true)}
                onOpenZakatCalc={() => setIsZakatCalcOpen(true)}
                onOpenSurahDoa={() => setIsSurahDoaOpen(true)}
              />
            )}
          </>
        )}

        {activeMainTab === 'web-gratis' && (
          <div className="space-y-8">
            <FreeToolsSection
              tools={freeTools}
              onOpenGoldCalc={() => setIsGoldCalcOpen(true)}
              onOpenZakatCalc={() => setIsZakatCalcOpen(true)}
              onOpenSurahDoa={() => setIsSurahDoaOpen(true)}
            />
          </div>
        )}

        {/* Community & Admin Consultation Banner */}
        <CommunityBanner settings={settings} />

        {/* Testimonials Social Proof */}
        <TestimonialsSection testimonials={testimonials} showTestimonials={settings.showTestimonials} />

        {/* FAQ Section */}
        {settings.showFaq !== false && <FaqSection faqs={faqs} whatsappNumber={settings.whatsappNumber} />}

        {/* Footer */}
        <Footer
          storeName={settings.storeName}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
          hideAdminButtonFooter={settings.hideAdminButtonFooter}
        />
      </main>

      {/* Interactive Feature Modals */}
      <RecommendationQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        items={items}
        onAddToCart={handleAddToCart}
      />

      <GoldCalculatorModal
        isOpen={isGoldCalcOpen}
        onClose={() => setIsGoldCalcOpen(false)}
      />

      <ZakatCalculatorModal
        isOpen={isZakatCalcOpen}
        onClose={() => setIsZakatCalcOpen(false)}
        whatsappNumber={settings.whatsappNumber}
      />

      <SurahDoaModal
        isOpen={isSurahDoaOpen}
        onClose={() => setIsSurahDoaOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        settings={settings}
      />

      {/* Floating Bottom Nav */}
      <BottomNav
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Modal Dialogs */}
      <ProductDetailModal
        item={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        settings={settings}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onAuthenticate={handleAuthenticateAdmin}
        adminUsername={settings.adminUsername}
        adminPassword={settings.adminPassword}
        adminPin={settings.adminPin}
        showCredentialsHint={settings.showCredentialsHint}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        items={items}
        settings={settings}
        testimonials={testimonials}
        orders={orders}
        freeTools={freeTools}
        faqs={faqs}
        onSaveItems={handleSaveItems}
        onSaveSettings={handleSaveSettings}
        onSaveTestimonials={handleSaveTestimonials}
        onSaveOrders={handleSaveOrders}
        onSaveFreeTools={handleSaveFreeTools}
        onSaveFaqs={handleSaveFaqs}
        onResetData={handleResetData}
        onLogout={handleLogoutAdmin}
      />
    </div>
  );
}

