import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Send, Check } from 'lucide-react';
import { CartItem, CustomerDetails, StoreSettings } from '../types';
import { formatRupiah, addOrderLead } from '../utils/storage';
import { logOrderToFirestore } from '../lib/firebase';

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  settings: StoreSettings;
}

export const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  settings,
}) => {
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `*PESANAN BARU - ${settings.storeName.toUpperCase()}*\n`;
    msg += `-------------------------------------------\n\n`;
    msg += `🛒 *DETAIL KERANJANG:* \n`;

    cart.forEach((item, index) => {
      const itemTotal = item.product.price * item.quantity;
      msg += `${index + 1}. *${item.product.title}*\n`;
      msg += `   Jumlah: ${item.quantity}x @ ${formatRupiah(item.product.price)}\n`;
      if (item.product.price > 0) {
        msg += `   Subtotal: ${formatRupiah(itemTotal)}\n`;
      } else {
        msg += `   Status: GRATIS / FREE\n`;
      }
      msg += `\n`;
    });

    msg += `-------------------------------------------\n`;
    msg += `💰 *TOTAL BAYAR:* *${formatRupiah(totalPrice)}*\n\n`;

    msg += `👤 *DATA PEMESAN:* \n`;
    msg += `• *Nama:* ${customer.name || 'Pelanggan Sahabat Kafa'}\n`;
    msg += `• *No. WhatsApp:* ${customer.phone || '-'}\n`;
    if (customer.email) msg += `• *Email:* ${customer.email}\n`;
    if (customer.notes) msg += `• *Catatan:* ${customer.notes}\n`;

    msg += `\nMohon info instruksi pembayaran & pengiriman akses produk ini. Terima kasih! 🙏`;

    return msg;
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    // Log the order lead for Admin Dashboard & Firestore
    try {
      const orderPayload = {
        customerName: customer.name || 'Pelanggan Sahabat Kafa',
        customerPhone: customer.phone || '-',
        items: cart.map((c) => ({
          title: c.product.title,
          price: c.product.price,
          quantity: c.quantity,
        })),
        totalAmount: totalPrice,
        status: 'Pending WA' as const,
      };
      addOrderLead(orderPayload);
      logOrderToFirestore(orderPayload);
    } catch (err) {
      console.error('Failed to log order lead', err);
    }

    const message = generateWhatsAppMessage();
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
  };

  const handleCopyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Main Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 transition-transform duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Keranjang Belanja</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {totalItems} item dipilih
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 px-2.5 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                Kosongkan
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
              <ShoppingBag className="w-16 h-16 stroke-1 text-slate-300 dark:text-slate-700 mb-3" />
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                Keranjang Anda masih kosong
              </p>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Pilih paket belajar, ebook, atau kelas animasi Sahabat Kafa untuk ditambahkan.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
              >
                Lihat Produk
              </button>
            </div>
          ) : (
            <>
              {/* Cart Item List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-emerald-600 font-bold text-xs">
                          SK
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {formatRupiah(item.product.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-800 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Hapus dari keranjang"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Contact Form */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Data Pemesan (Penting)
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Contoh: Ahmad Fauzi"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    No. WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="Contoh: Minta info grup WhatsApp kelas animasi"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-3 shrink-0">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Total Pembayaran:</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {formatRupiah(totalPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMessage}
                className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                title="Salin Teks Format Pesanan"
              >
                {isCopied ? <Check className="w-5 h-5 text-emerald-500" /> : <MessageSquare className="w-5 h-5" />}
              </button>

              <button
                onClick={handleCheckoutWhatsApp}
                className="flex-1 py-3 px-4 rounded-xl font-extrabold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesanan ke WhatsApp</span>
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-500">
              Pesanan akan langsung terhubung ke WhatsApp Admin {settings.storeName}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
