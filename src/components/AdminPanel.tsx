import React, { useState } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Save,
  Check,
  RefreshCw,
  LogOut,
  Palette,
  Settings,
  ShoppingBag,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  List,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Quote,
  Star,
  Receipt,
  Layout,
  BarChart2,
  Phone,
  Image as ImageIcon,
  Wrench,
  BookOpen,
  Calculator,
  Compass
} from 'lucide-react';
import {
  LinkItem,
  StoreSettings,
  Testimonial,
  OrderLead,
  BadgeColor,
  ItemType,
  ThemeBackground,
  HeroStat,
  FreeWebTool
} from '../types';
import { Badge } from './Badge';
import { formatRupiah } from '../utils/storage';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: LinkItem[];
  settings: StoreSettings;
  testimonials: Testimonial[];
  orders: OrderLead[];
  freeTools?: FreeWebTool[];
  onSaveItems: (items: LinkItem[]) => void;
  onSaveSettings: (settings: StoreSettings) => void;
  onSaveTestimonials: (testimonials: Testimonial[]) => void;
  onSaveOrders: (orders: OrderLead[]) => void;
  onSaveFreeTools?: (tools: FreeWebTool[]) => void;
  onResetData: () => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  items,
  settings,
  testimonials,
  orders,
  freeTools = [],
  onSaveItems,
  onSaveSettings,
  onSaveTestimonials,
  onSaveOrders,
  onSaveFreeTools,
  onResetData,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'items' | 'hero' | 'freetools' | 'testimonials' | 'settings' | 'orders' | 'theme'>('items');

  // ITEM Form State
  const [editingItem, setEditingItem] = useState<Partial<LinkItem> | null>(null);
  const [isItemFormOpen, setIsItemFormOpen] = useState(false);

  // FREE TOOLS Form State
  const [editingTool, setEditingTool] = useState<Partial<FreeWebTool> | null>(null);
  const [isToolFormOpen, setIsToolFormOpen] = useState(false);

  // TESTIMONIAL Form State
  const [editingTesti, setEditingTesti] = useState<Partial<Testimonial> | null>(null);
  const [isTestiFormOpen, setIsTestiFormOpen] = useState(false);

  // Settings Local State
  const [localSettings, setLocalSettings] = useState<StoreSettings>({ ...settings });
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  if (!isOpen) return null;

  const showTempMessage = (msg: string) => {
    setSavedSuccessMsg(msg);
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  // --- ITEM CRUD HANDLERS ---
  const handleOpenAddItem = () => {
    setEditingItem({
      id: `item-${Date.now()}`,
      title: '',
      subtitle: '',
      type: 'product',
      price: 0,
      originalPrice: 0,
      badge: '',
      badgeColor: 'emerald',
      category: 'Edukasi',
      url: '',
      imageUrl: '',
      description: '',
      features: ['Akses Produk Digital 24/7', 'Panduan Praktis'],
      isActive: true,
      isPinned: false,
      order: items.length + 1,
    });
    setIsItemFormOpen(true);
  };

  const handleOpenEditItem = (item: LinkItem) => {
    setEditingItem({ ...item });
    setIsItemFormOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title) return;

    const exists = items.some((i) => i.id === editingItem.id);
    let updated: LinkItem[];

    if (exists) {
      updated = items.map((i) => (i.id === editingItem.id ? (editingItem as LinkItem) : i));
    } else {
      updated = [...items, editingItem as LinkItem];
    }

    onSaveItems(updated);
    setIsItemFormOpen(false);
    setEditingItem(null);
    showTempMessage('Produk/Link berhasil disimpan!');
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      const updated = items.filter((i) => i.id !== id);
      onSaveItems(updated);
      showTempMessage('Item berhasil dihapus');
    }
  };

  const handleToggleItemActive = (id: string) => {
    const updated = items.map((i) => (i.id === id ? { ...i, isActive: !i.isActive } : i));
    onSaveItems(updated);
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const reordered = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    onSaveItems(reordered);
  };

  // --- TESTIMONIAL CRUD HANDLERS ---
  const handleOpenAddTesti = () => {
    setEditingTesti({
      id: `testi-${Date.now()}`,
      name: '',
      role: 'Pembeli / Alumni',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      comment: '',
      rating: 5,
      productTitle: 'Sahabat Kafa Premium',
    });
    setIsTestiFormOpen(true);
  };

  const handleOpenEditTesti = (t: Testimonial) => {
    setEditingTesti({ ...t });
    setIsTestiFormOpen(true);
  };

  const handleSaveTesti = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTesti || !editingTesti.name || !editingTesti.comment) return;

    const exists = testimonials.some((t) => t.id === editingTesti.id);
    let updated: Testimonial[];

    if (exists) {
      updated = testimonials.map((t) => (t.id === editingTesti.id ? (editingTesti as Testimonial) : t));
    } else {
      updated = [...testimonials, editingTesti as Testimonial];
    }

    onSaveTestimonials(updated);
    setIsTestiFormOpen(false);
    setEditingTesti(null);
    showTempMessage('Testimoni berhasil disimpan!');
  };

  const handleDeleteTesti = (id: string) => {
    if (confirm('Hapus ulasan/testimoni ini?')) {
      const updated = testimonials.filter((t) => t.id !== id);
      onSaveTestimonials(updated);
      showTempMessage('Testimoni berhasil dihapus');
    }
  };

  // --- FREE TOOLS CRUD HANDLERS ---
  const handleOpenAddTool = () => {
    setEditingTool({
      id: `tool-${Date.now()}`,
      title: '',
      description: '',
      url: 'https://',
      badge: 'GRATIS',
      category: 'Animasi',
      iconName: 'Sparkles',
      isPopular: false,
    });
    setIsToolFormOpen(true);
  };

  const handleOpenEditTool = (tool: FreeWebTool) => {
    setEditingTool({ ...tool });
    setIsToolFormOpen(true);
  };

  const handleSaveTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool || !editingTool.title || !editingTool.url) return;

    const currentTools = freeTools || [];
    const exists = currentTools.some((t) => t.id === editingTool.id);
    let updated: FreeWebTool[];

    if (exists) {
      updated = currentTools.map((t) => (t.id === editingTool.id ? (editingTool as FreeWebTool) : t));
    } else {
      updated = [...currentTools, editingTool as FreeWebTool];
    }

    if (onSaveFreeTools) {
      onSaveFreeTools(updated);
    }
    setIsToolFormOpen(false);
    setEditingTool(null);
    showTempMessage('Web / Tool Gratis berhasil disimpan!');
  };

  const handleDeleteTool = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus Web/Tool ini?')) {
      const currentTools = freeTools || [];
      const updated = currentTools.filter((t) => t.id !== id);
      if (onSaveFreeTools) {
        onSaveFreeTools(updated);
      }
      showTempMessage('Tool berhasil dihapus');
    }
  };

  const handleMoveToolOrder = (index: number, direction: 'up' | 'down') => {
    const currentTools = freeTools || [];
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === currentTools.length - 1)) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newTools = [...currentTools];
    const temp = newTools[index];
    newTools[index] = newTools[targetIndex];
    newTools[targetIndex] = temp;

    if (onSaveFreeTools) {
      onSaveFreeTools(newTools);
    }
  };

  // --- SETTINGS FORM SAVE ---
  const handleSaveSettingsForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(localSettings);
    showTempMessage('Pengaturan toko berhasil diperbarui!');
  };

  // --- ORDER STATUS UPDATE ---
  const handleUpdateOrderStatus = (orderId: string, newStatus: 'Pending WA' | 'Selesai' | 'Batal') => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    onSaveOrders(updated);
    showTempMessage('Status pesanan diperbarui');
  };

  const handleClearOrders = () => {
    if (confirm('Bersihkan seluruh riwayat log pesanan?')) {
      onSaveOrders([]);
      showTempMessage('Log pesanan dibersihkan');
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status === 'Selesai')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 h-[94vh] flex flex-col overflow-hidden">
        {/* Top Bar Header */}
        <div className="p-4 sm:p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black">
              <Settings className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Dashboard Admin Super
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 border border-emerald-500/40">
                  FULL EDIT ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kelola katalog, headline hero, ulasan pembeli, tema, & nomor WA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold"
              title="Keluar dari Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar Admin</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Temporary Success Toast */}
        {savedSuccessMsg && (
          <div className="bg-emerald-600 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 text-center animate-pulse shadow-md">
            {savedSuccessMsg}
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 px-4 pt-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('items')}
            className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'items'
                ? 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Katalog ({items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'hero'
                ? 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Hero & Profil</span>
          </button>

          <button
            onClick={() => setActiveTab('freetools')}
            className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'freetools'
                ? 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Web Gratis ({freeTools.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'testimonials'
                ? 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            <Quote className="w-4 h-4" />
            <span>Testimoni ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Setelan WA</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Log Pesanan ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'theme'
                ? 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Tema Warna</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
          {/* TAB 1: CATALOG ITEMS */}
          {activeTab === 'items' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Kelola Katalog Produk & Link
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tambah, edit harga, ubah urutan, atau sembunyikan item dari pengunjung.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddItem}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Item Baru</span>
                </button>
              </div>

              <div className="space-y-3 pt-2">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-center gap-4 ${
                      item.isActive
                        ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80'
                        : 'bg-slate-100 dark:bg-slate-900/50 border-slate-300 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    {/* Reorder Up / Down */}
                    <div className="flex sm:flex-col gap-1 text-slate-400 shrink-0">
                      <button
                        onClick={() => handleMoveOrder(index, 'up')}
                        disabled={index === 0}
                        className="p-1.5 hover:text-emerald-500 disabled:opacity-20"
                        title="Naikkan Urutan"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(index, 'down')}
                        disabled={index === items.length - 1}
                        className="p-1.5 hover:text-emerald-500 disabled:opacity-20"
                        title="Turunkan Urutan"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Image Thumbnail */}
                    <div className="w-14 h-14 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-slate-500" />
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </span>
                        {item.badge && <Badge text={item.badge} color={item.badgeColor || 'emerald'} size="sm" />}
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {item.type}
                        </span>
                      </div>

                      <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 mt-1">
                        <span>Harga: <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">{formatRupiah(item.price)}</strong></span>
                        <span>Kategori: <strong>{item.category}</strong></span>
                      </div>
                    </div>

                    {/* Item Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleItemActive(item.id)}
                        className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                          item.isActive
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}
                        title={item.isActive ? 'Sembunyikan' : 'Tampilkan'}
                      >
                        {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleOpenEditItem(item)}
                        className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-colors"
                        title="Hapus Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: HERO & PROFILE EDITOR */}
          {activeTab === 'hero' && (
            <form onSubmit={handleSaveSettingsForm} className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  Edit Tampilan Hero & Profil Utama
                </h3>
                <p className="text-xs text-slate-500">
                  Ubah judul besar, sub-judul, bio toko, dan angka statistik yang muncul di paling atas website.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Judul Utama / Hero Headline *
                  </label>
                  <input
                    type="text"
                    value={localSettings.heroHeadline || ''}
                    onChange={(e) => setLocalSettings({ ...localSettings, heroHeadline: e.target.value })}
                    placeholder="Contoh: Tingkatkan Skill & Penghasilan Kreatif Berkah"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm font-extrabold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Sub-Judul Hero / Deskripsi Singkat
                  </label>
                  <textarea
                    rows={3}
                    value={localSettings.heroSubheadline || ''}
                    onChange={(e) => setLocalSettings({ ...localSettings, heroSubheadline: e.target.value })}
                    placeholder="Penjelasan singkat mengenai Sahabat Kafa..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Store / Website
                    </label>
                    <input
                      type="text"
                      value={localSettings.storeName}
                      onChange={(e) => setLocalSettings({ ...localSettings, storeName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tagline Sub-brand
                    </label>
                    <input
                      type="text"
                      value={localSettings.tagline}
                      onChange={(e) => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    URL Logo / Avatar Profil
                  </label>
                  <input
                    type="text"
                    value={localSettings.avatarUrl}
                    onChange={(e) => setLocalSettings({ ...localSettings, avatarUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Edit Hero Stats Counters */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Edit 4 Kotak Angka Statistik (Hero Counters)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(localSettings.stats && localSettings.stats.length === 4
                      ? localSettings.stats
                      : [
                          { id: '1', value: '12,500+', label: 'Anggota Komunitas', color: 'emerald' },
                          { id: '2', value: '1,400+', label: 'Alumni Kelas Animasi', color: 'amber' },
                          { id: '3', value: '50+', label: 'Modul & E-book Digital', color: 'sky' },
                          { id: '4', value: '99.4%', label: 'Tingkat Kepuasan', color: 'rose' },
                        ]
                    ).map((st, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-emerald-500">Kotak #{idx + 1}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={st.value}
                            onChange={(e) => {
                              const newStats = [...(localSettings.stats || [])];
                              newStats[idx] = { ...st, value: e.target.value };
                              setLocalSettings({ ...localSettings, stats: newStats });
                            }}
                            placeholder="Nilai (e.g. 15,000+)"
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                          />
                          <input
                            type="text"
                            value={st.label}
                            onChange={(e) => {
                              const newStats = [...(localSettings.stats || [])];
                              newStats[idx] = { ...st, label: e.target.value };
                              setLocalSettings({ ...localSettings, stats: newStats });
                            }}
                            placeholder="Label (e.g. Alumni)"
                            className="px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Hero & Profil</span>
              </button>
            </form>
          )}

          {/* TAB: FREE WEB TOOLS MANAGEMENT */}
          {activeTab === 'freetools' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Kelola Kumpulan Web & Tool Gratis Sahabat
                  </h3>
                  <p className="text-xs text-slate-500">
                    Atur daftar link website gratis, tools interaktif, & redirect URL yang tampil di dashboard.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddTool}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Web / Tool</span>
                </button>
              </div>

              <div className="space-y-3 pt-2">
                {freeTools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center gap-4 transition-all"
                  >
                    {/* Reorder Up / Down */}
                    <div className="flex sm:flex-col gap-1 text-slate-400 shrink-0">
                      <button
                        onClick={() => handleMoveToolOrder(index, 'up')}
                        disabled={index === 0}
                        className="p-1.5 hover:text-emerald-500 disabled:opacity-20"
                        title="Naikkan Urutan"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveToolOrder(index, 'down')}
                        disabled={index === freeTools.length - 1}
                        className="p-1.5 hover:text-emerald-500 disabled:opacity-20"
                        title="Turunkan Urutan"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Badge / Category Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="w-6 h-6" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {tool.title}
                        </h4>
                        {tool.badge && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                            {tool.badge}
                          </span>
                        )}
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {tool.category}
                        </span>
                        {tool.isPopular && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                            🔥 Populer
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 truncate">
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{tool.url}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-300 transition-colors"
                        title="Buka Website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleOpenEditTool(tool)}
                        className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors"
                        title="Edit Web / Tool"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteTool(tool.id)}
                        className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-colors"
                        title="Hapus Tool"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {freeTools.length === 0 && (
                  <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
                    Belum ada Web / Tool Gratis. Klik tombol "+ Tambah Web / Tool" di atas untuk menambahkan.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TESTIMONIALS EDITOR */}
          {activeTab === 'testimonials' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Kelola Testimoni & Ulasan Pembeli
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tambah ulasan alumni kelas atau pembeli untuk meningkatkan kepercayaan pembeli baru.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddTesti}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Testimoni</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: t.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500">{t.productTitle}</span>
                      </div>
                      <p className="text-xs italic text-slate-600 dark:text-slate-300">"{t.comment}"</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                          <p className="text-[10px] text-slate-500">{t.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditTesti(t)}
                          className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTesti(t.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WHATSAPP & STORE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettingsForm} className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  Pengaturan WhatsApp & Ticker Pengumuman
                </h3>
                <p className="text-xs text-slate-500">
                  Ubah nomor tujuan order, template pesan, dan pengumuman promo di bagian atas website.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor WhatsApp Admin (Tujuan Pesanan & Konsultasi) *
                  </label>
                  <input
                    type="text"
                    value={localSettings.whatsappNumber}
                    onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                    placeholder="6281234567890"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    required
                  />
                  <span className="text-[10px] text-slate-400">Pastikan diawali dengan 62 (contoh: 6281234567890).</span>
                </div>

                {/* Feature Toggles Center */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    🎛️ Pusat Kontrol Fitur & Komponen Website
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Aktifkan atau nonaktifkan fitur interaktif sesuai kebutuhan toko Sahabat Kafa:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        🕌 Jam & Widget Jadwal Sholat
                      </span>
                      <input
                        type="checkbox"
                        checked={localSettings.showPrayerTimes !== false}
                        onChange={(e) =>
                          setLocalSettings({ ...localSettings, showPrayerTimes: e.target.checked })
                        }
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        ❓ Section FAQ (Tanya Jawab)
                      </span>
                      <input
                        type="checkbox"
                        checked={localSettings.showFaq !== false}
                        onChange={(e) => setLocalSettings({ ...localSettings, showFaq: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        🎯 Kuis Rekomendasi Paket
                      </span>
                      <input
                        type="checkbox"
                        checked={localSettings.showQuiz !== false}
                        onChange={(e) => setLocalSettings({ ...localSettings, showQuiz: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        📊 Kalkulator Emas & Income
                      </span>
                      <input
                        type="checkbox"
                        checked={localSettings.showGoldCalc !== false}
                        onChange={(e) =>
                          setLocalSettings({ ...localSettings, showGoldCalc: e.target.checked })
                        }
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Announcement Ticker Settings */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Bar Ticker Pengumuman Promo (Bagian Paling Atas Website)
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.announcementActive}
                        onChange={(e) =>
                          setLocalSettings({ ...localSettings, announcementActive: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  <input
                    type="text"
                    value={localSettings.announcementText || ''}
                    onChange={(e) => setLocalSettings({ ...localSettings, announcementText: e.target.value })}
                    placeholder="Contoh: 🔥 FLASH SALE SPESIAL: Diskon Hingga 50% Kelas Animasi Faceless!"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Tautan Sosial Media</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">TikTok</label>
                      <input
                        type="text"
                        value={localSettings.socials.tiktok || ''}
                        onChange={(e) => setLocalSettings({ ...localSettings, socials: { ...localSettings.socials, tiktok: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">YouTube</label>
                      <input
                        type="text"
                        value={localSettings.socials.youtube || ''}
                        onChange={(e) => setLocalSettings({ ...localSettings, socials: { ...localSettings.socials, youtube: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Instagram</label>
                      <input
                        type="text"
                        value={localSettings.socials.instagram || ''}
                        onChange={(e) => setLocalSettings({ ...localSettings, socials: { ...localSettings.socials, instagram: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Telegram</label>
                      <input
                        type="text"
                        value={localSettings.socials.telegram || ''}
                        onChange={(e) => setLocalSettings({ ...localSettings, socials: { ...localSettings.socials, telegram: e.target.value } })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Admin Credentials & Security Settings */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-amber-500/10 to-teal-500/10 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                    <Wrench className="w-4 h-4" />
                    <span>Keamanan & Kredensial Login Admin</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Username Admin
                      </label>
                      <input
                        type="text"
                        value={localSettings.adminUsername || 'admin'}
                        onChange={(e) => setLocalSettings({ ...localSettings, adminUsername: e.target.value })}
                        placeholder="Contoh: admin"
                        className="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Password Admin
                      </label>
                      <input
                        type="text"
                        value={localSettings.adminPassword || 'kafa123'}
                        onChange={(e) => setLocalSettings({ ...localSettings, adminPassword: e.target.value })}
                        placeholder="Contoh: kafa123"
                        className="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      PIN Cepat Backup Admin
                    </label>
                    <input
                      type="text"
                      value={localSettings.adminPin || '1234'}
                      onChange={(e) => setLocalSettings({ ...localSettings, adminPin: e.target.value })}
                      placeholder="1234"
                      className="w-36 px-3 py-1.5 rounded-xl text-xs font-mono font-extrabold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Stealth Mode Toggle */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.hideAdminButtonFooter || false}
                        onChange={(e) => setLocalSettings({ ...localSettings, hideAdminButtonFooter: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        🔒 Sembunyikan Tombol Admin di Footer (Login Rahasia Tersembunyi)
                      </span>
                    </label>
                    <p className="text-[11px] text-slate-500 mt-1 pl-6">
                      Jika diaktifkan, pengunjung umum tidak akan melihat tombol "Login Admin". Anda dapat tetap login dengan menekan shortcut <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded font-mono text-emerald-500">Ctrl + Shift + A</code> atau mengklik tulisan Copyright di footer 5x cepat.
                    </p>
                  </div>

                  {/* Toggle Show Credentials Hint */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.showCredentialsHint || false}
                        onChange={(e) => setLocalSettings({ ...localSettings, showCredentialsHint: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        💡 Tampilkan Petunjuk Username/Password Default pada Popup Login
                      </span>
                    </label>
                    <p className="text-[11px] text-slate-500 mt-1 pl-6">
                      Saran: Matikan opsi ini agar orang lain yang tidak sengaja membuka popup login tidak melihat username & password Anda.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20"
              >
                Simpan Setelan WhatsApp & Toko
              </button>
            </form>
          )}

          {/* TAB 5: ORDERS LOG & LEAD TRACKER */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Log Masuk Pesanan & Lead WhatsApp
                  </h3>
                  <p className="text-xs text-slate-500">
                    Riwayat pembeli yang melakukan checkout keranjang via WhatsApp.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold">
                    Omset Selesai: {formatRupiah(totalRevenue)}
                  </div>

                  {orders.length > 0 && (
                    <button
                      onClick={handleClearOrders}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white text-xs font-bold transition-colors"
                    >
                      Bersihkan Log
                    </button>
                  )}
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <Receipt className="w-12 h-12 stroke-1 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold">Belum Ada Pesanan Masuk</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Setiap kali pengunjung mengklik "Kirim Pesanan ke WhatsApp", data pesanan akan otomatis tercatat di sini.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            {ord.customerName}
                          </span>
                          <span className="text-[11px] font-mono font-semibold text-emerald-500">
                            ({ord.customerPhone})
                          </span>
                          <span className="text-[10px] text-slate-400">• {ord.createdAt}</span>
                        </div>

                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          {ord.items.map((i) => `${i.quantity}x ${i.title}`).join(', ')}
                        </div>

                        <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                          Total: {formatRupiah(ord.totalAmount)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(ord.id, e.target.value as 'Pending WA' | 'Selesai' | 'Batal')
                          }
                          className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                        >
                          <option value="Pending WA">Pending WA</option>
                          <option value="Selesai">Selesai (Lunas)</option>
                          <option value="Batal">Batal</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: THEME & COLOR BACKGROUND */}
          {activeTab === 'theme' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  Pilihan Tema Latar Belakang & Suasana Website
                </h3>
                <p className="text-xs text-slate-500">
                  Ubah palet warna latar belakang website Sahabat Kafa secara instan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Luxury Dark */}
                <div
                  onClick={() => {
                    const newSet = { ...localSettings, themeBackground: 'luxury-dark' as ThemeBackground };
                    setLocalSettings(newSet);
                    onSaveSettings(newSet);
                    showTempMessage('Tema Luxury Dark diaktifkan!');
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    localSettings.themeBackground === 'luxury-dark'
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-lg'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-amber-400 font-extrabold shrink-0">
                    👑
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Luxury Dark (Rekomendasi)</h4>
                    <p className="text-xs text-slate-500">Latar gelap premium dengan aksen hijau & emas</p>
                  </div>
                </div>

                {/* Emerald Gold */}
                <div
                  onClick={() => {
                    const newSet = { ...localSettings, themeBackground: 'emerald-gold' as ThemeBackground };
                    setLocalSettings(newSet);
                    onSaveSettings(newSet);
                    showTempMessage('Tema Emerald Gold diaktifkan!');
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    localSettings.themeBackground === 'emerald-gold'
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-lg'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-900 to-amber-950 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-extrabold shrink-0">
                    ✨
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Emerald Gold</h4>
                    <p className="text-xs text-slate-500">Nuansa hijau zamrudislami & gradasi mewah</p>
                  </div>
                </div>

                {/* Cosmic Earth */}
                <div
                  onClick={() => {
                    const newSet = { ...localSettings, themeBackground: 'cosmic-earth' as ThemeBackground };
                    setLocalSettings(newSet);
                    onSaveSettings(newSet);
                    showTempMessage('Tema Cosmic Earth diaktifkan!');
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    localSettings.themeBackground === 'cosmic-earth'
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-lg'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-950 to-indigo-950 border border-indigo-400/30 flex items-center justify-center text-white shrink-0">
                    🌌
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cosmic Earth</h4>
                    <p className="text-xs text-slate-500">Gaya luar angkasa bernuansa biru indigo</p>
                  </div>
                </div>

                {/* Clean Light */}
                <div
                  onClick={() => {
                    const newSet = { ...localSettings, themeBackground: 'clean-light' as ThemeBackground };
                    setLocalSettings(newSet);
                    onSaveSettings(newSet);
                    showTempMessage('Tema Clean Light diaktifkan!');
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    localSettings.themeBackground === 'clean-light'
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-lg'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 shrink-0">
                    ☀️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Clean Pearl Light</h4>
                    <p className="text-xs text-slate-500">Latar terang bersih, ramah mata & kontras tinggi</p>
                  </div>
                </div>
              </div>

              {/* Reset Default Preset */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400">Reset Semua Data Bawaan</h4>
                    <p className="text-[11px] text-slate-500">
                      Mengembalikan seluruh isi katalog, testimoni, & setelan ke posisi awal Sahabat Kafa.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Reset ulang data ke setelan awal Sahabat Kafa?')) {
                        onResetData();
                        showTempMessage('Data berhasil di-reset!');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0"
                  >
                    Reset Bawaan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL ADD / EDIT CATALOG ITEM FORM */}
      {isItemFormOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setIsItemFormOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {items.some((i) => i.id === editingItem.id) ? 'Edit Item Produk/Link' : 'Tambah Item Baru'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama / Judul Item *
                </label>
                <input
                  type="text"
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Contoh: Kelas Animasi Faceless Ramah Muslim"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Sub-judul / Penjelasan Ringkas
                </label>
                <input
                  type="text"
                  value={editingItem.subtitle || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  placeholder="Contoh: Panduan step-by-step membuat video animasi tanpa wajah"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tipe Item
                  </label>
                  <select
                    value={editingItem.type || 'product'}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value as ItemType })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="product">Produk Jualan (Bisa Keranjang)</option>
                    <option value="consultation">Layanan Konsultasi WA</option>
                    <option value="community">Grup Komunitas</option>
                    <option value="link">Link Eksternal Direct</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={editingItem.category || 'Kelas Animasi'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    placeholder="Kelas Animasi / E-book / Edukasi"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Harga Jual (Rp)
                  </label>
                  <input
                    type="number"
                    value={editingItem.price ?? 0}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  />
                  <span className="text-[10px] text-slate-400">Isi 0 jika Gratis.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Harga Coret (Original Price)
                  </label>
                  <input
                    type="number"
                    value={editingItem.originalPrice ?? 0}
                    onChange={(e) => setEditingItem({ ...editingItem, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Badge Teks (e.g. BEST SELLER)
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                    placeholder="BEST SELLER / FAVORIT"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Warna Badge
                  </label>
                  <select
                    value={editingItem.badgeColor || 'amber'}
                    onChange={(e) => setEditingItem({ ...editingItem, badgeColor: e.target.value as BadgeColor })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="amber">Amber / Emas</option>
                    <option value="emerald">Teal / Hijau Zamrud</option>
                    <option value="blue">Biru (Favorit)</option>
                    <option value="purple">Ungu</option>
                    <option value="red">Merah (Promo)</option>
                    <option value="gold">Gold Gradient</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  URL Gambar Thumbnail Banner
                </label>
                <input
                  type="text"
                  value={editingItem.imageUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              {editingItem.type !== 'product' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    URL Tautan Tujuan (Direct Link)
                  </label>
                  <input
                    type="text"
                    value={editingItem.url || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                    placeholder="https://wa.me/..."
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Lengkap Detail Produk
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Penjelasan detail apa yang didapat di paket ini..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsItemFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
                >
                  Simpan Item Katalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ADD / EDIT TESTIMONIAL FORM */}
      {isTestiFormOpen && editingTesti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <button
              onClick={() => setIsTestiFormOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {testimonials.some((t) => t.id === editingTesti.id) ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
            </h3>

            <form onSubmit={handleSaveTesti} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Pembeli / Alumni *</label>
                <input
                  type="text"
                  value={editingTesti.name || ''}
                  onChange={(e) => setEditingTesti({ ...editingTesti, name: e.target.value })}
                  placeholder="Contoh: Ahmad Rizky"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Role / Pekerjaan</label>
                <input
                  type="text"
                  value={editingTesti.role || ''}
                  onChange={(e) => setEditingTesti({ ...editingTesti, role: e.target.value })}
                  placeholder="Contoh: Content Creator Animasi"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Produk Yang Dibeli</label>
                <input
                  type="text"
                  value={editingTesti.productTitle || ''}
                  onChange={(e) => setEditingTesti({ ...editingTesti, productTitle: e.target.value })}
                  placeholder="Contoh: Kelas Animasi Faceless"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Komentar / Ulasan *</label>
                <textarea
                  rows={3}
                  value={editingTesti.comment || ''}
                  onChange={(e) => setEditingTesti({ ...editingTesti, comment: e.target.value })}
                  placeholder="Tulis ulasan positif pembeli di sini..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">URL Avatar Foto</label>
                <input
                  type="text"
                  value={editingTesti.avatar || ''}
                  onChange={(e) => setEditingTesti({ ...editingTesti, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTestiFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 text-white shadow-md"
                >
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ADD / EDIT FREE WEB TOOL FORM */}
      {isToolFormOpen && editingTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsToolFormOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {(freeTools || []).some((t) => t.id === editingTool.id) ? 'Edit Web / Tool Gratis' : 'Tambah Web / Tool Baru'}
            </h3>

            <form onSubmit={handleSaveTool} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Web / Tool *</label>
                <input
                  type="text"
                  value={editingTool.title || ''}
                  onChange={(e) => setEditingTool({ ...editingTool, title: e.target.value })}
                  placeholder="Contoh: Canva Animasi Gratis"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">URL Link Redirect Website Tujuan *</label>
                <input
                  type="url"
                  value={editingTool.url || ''}
                  onChange={(e) => setEditingTool({ ...editingTool, url: e.target.value })}
                  placeholder="https://contoh-website.com"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori Tool</label>
                  <input
                    type="text"
                    value={editingTool.category || ''}
                    onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value })}
                    placeholder="Animasi / Edukasi / Kalkulator"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Label Badge</label>
                  <input
                    type="text"
                    value={editingTool.badge || ''}
                    onChange={(e) => setEditingTool({ ...editingTool, badge: e.target.value })}
                    placeholder="GRATIS / NEW / HOT / VIRTUAL"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Singkat Tool</label>
                <textarea
                  rows={2}
                  value={editingTool.description || ''}
                  onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                  placeholder="Tuliskan fungsi atau manfaat utama website ini..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pilihan Ikon</label>
                  <select
                    value={editingTool.iconName || 'Sparkles'}
                    onChange={(e) => setEditingTool({ ...editingTool, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Sparkles">Sparkles (Bintang / Kreatif)</option>
                    <option value="BookOpen">BookOpen (Buku / Modul)</option>
                    <option value="Calculator">Calculator (Kalkulator)</option>
                    <option value="Quote">Quote (Mutiara / Hikmah)</option>
                    <option value="Compass">Compass (Panduan / Arah)</option>
                    <option value="Layout">Layout (Desain / Template)</option>
                    <option value="Wrench">Wrench (Tool Alat)</option>
                    <option value="ExternalLink">ExternalLink (Tautan Luar)</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingTool.isPopular || false}
                      onChange={(e) => setEditingTool({ ...editingTool, isPopular: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Tandai Populer / Hot 🔥
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsToolFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 text-white shadow-md"
                >
                  Simpan Web Gratis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
