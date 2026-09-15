'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { CartItem, SiteSettings } from '@/types/product';
import { X, Trash2, CheckCircle2, Loader2, ArrowRight, Copy, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  settings: SiteSettings;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  settings,
}: CartDrawerProps) {
  const [messenger, setMessenger] = useState<'telegram' | 'vk' | 'max'>('telegram');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll & ESC key handling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const generateOrderText = () => {
    let text = `🛒 Здравствуйте! Хочу оформить заказ в магазине «Каспийский вял»:\n\n`;
    cartItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name}\n   • Фасовка: ${item.weightLabel} (${item.pricePerUnit.toLocaleString('ru-RU')} ₽/${item.unit})\n   • Количество: ${item.quantity} шт\n   • Стоимость: ${item.totalPrice.toLocaleString('ru-RU')} ₽\n\n`;
    });
    text += `💰 Итого к оплате: ${totalAmount.toLocaleString('ru-RU')} ₽\n\n`;
    text += `Подскажите, пожалуйста, по наличию и срокам доставки.`;
    return text;
  };

  const handleCopyText = async () => {
    try {
      const text = generateOrderText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleCheckout = async (selectedMessenger: 'telegram' | 'vk' | 'max') => {
    if (cartItems.length === 0) return;
    setLoading(true);

    const orderText = generateOrderText();
    const encodedText = encodeURIComponent(orderText);

    // Try to copy to clipboard for user convenience
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(orderText);
      }
    } catch (e) {
      console.warn('Clipboard write ignored', e);
    }

    // Save lead in background for admin panel tracking
    try {
      const summaryName = cartItems
        .map((i) => `${i.name} (${i.weightLabel} × ${i.quantity})`)
        .join('; ');

      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: summaryName,
          quantity: totalCount,
          customerName: 'Заказ через мессенджер',
          customerPhone: 'В чате',
          messengerPreference: selectedMessenger,
          comment: `Переход в ${selectedMessenger.toUpperCase()}`,
          items: cartItems,
          totalAmount,
        }),
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    setSuccess(true);

    // Redirect to chosen messenger with prepared message
    setTimeout(() => {
      if (selectedMessenger === 'telegram') {
        let tg = (settings.telegramBotOrChannelUrl || settings.telegramUsername || 'kaspiy_vyal').trim();
        if (tg.startsWith('@')) tg = tg.slice(1);
        if (tg.startsWith('http://') || tg.startsWith('https://')) {
          const separator = tg.includes('?') ? '&' : '?';
          window.open(`${tg}${separator}text=${encodedText}`, '_blank');
        } else {
          window.open(`https://t.me/${tg}?text=${encodedText}`, '_blank');
        }
      } else if (selectedMessenger === 'vk') {
        const vkUrl = settings.vkChatUrl || settings.vkGroupUrl || 'https://vk.me/kaspiy_vyal';
        window.open(vkUrl, '_blank');
      } else if (selectedMessenger === 'max') {
        const maxUrl = settings.maxChatUrl || `https://max.ru/${settings.telegramUsername || 'kaspiy_vyal'}`;
        window.open(maxUrl, '_blank');
      }
    }, 400);
  };

  const handleReset = () => {
    setSuccess(false);
    onClearCart();
    onClose();
  };

  // Mobile drag-to-close handler
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isMobile) {
      if (info.offset.y > 100 || info.velocity.y > 400) {
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-[#08172c]/75 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer / Bottom Sheet Container */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 320,
              mass: 0.8,
            }}
            drag={isMobile ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.6 }}
            onDragEnd={handleDragEnd}
            className="relative w-full max-w-lg bg-white h-[88vh] sm:h-full shadow-2xl flex flex-col justify-between rounded-t-3xl sm:rounded-none sm:rounded-l-3xl border-0 sm:border-l sm:border-[#e8decb] overflow-hidden z-10 touch-none sm:touch-auto"
          >
            {/* Header (No icon, clean typography) */}
            <div className="px-6 pt-5 pb-4 border-b border-[#eedfc8]/15 bg-[#08172c] text-[#eedfc8] flex items-center justify-between">
              <div>
                <h2 className="text-base font-brand-serif font-bold tracking-wider">Корзина заказов</h2>
                <span className="text-[11px] text-[#eedfc8]/70 font-normal block mt-0.5">
                  {cartItems.length > 0 ? `${totalCount} поз. на ${totalAmount.toLocaleString('ru-RU')} ₽` : 'Корзина пуста'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {cartItems.length > 0 && !success && (
                  <button
                    onClick={onClearCart}
                    className="text-xs text-[#eedfc8]/60 hover:text-rose-300 transition-colors mr-2 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8] rounded-lg px-2 py-1"
                    title="Очистить корзину"
                    aria-label="Очистить корзину"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Очистить</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-[#eedfc8]/70 hover:text-[#eedfc8] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8]"
                  aria-label="Закрыть корзину"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#faf7f2] touch-pan-y">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                    <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-brand-serif font-bold text-[#08172c] mb-2">Переходим в чат с заказом!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-xs mx-auto leading-relaxed">
                    Мы открыли диалог в выбранном мессенджере с готовым списком рыбы и суммой. Текст заказа также скопирован в буфер обмена.
                  </p>

                  <div className="p-4 rounded-2xl bg-white border border-[#e8decb] text-left text-xs text-slate-700 mb-6 max-h-40 overflow-y-auto whitespace-pre-line font-mono text-[11px] leading-relaxed">
                    {generateOrderText()}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      onClick={handleCopyText}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#e8decb] bg-white hover:bg-[#f5ebd9] text-[#08172c] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Скопировано в буфер!' : 'Скопировать текст заказа'}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#08172c] text-[#eedfc8] font-bold text-xs uppercase tracking-wider hover:bg-[#0f2647] transition-all"
                    >
                      Продолжить покупки
                    </button>
                  </div>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-14">
                  <h3 className="text-base font-bold text-[#08172c] mb-1">Ваша корзина пуста</h3>
                  <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                    Выберите понравившуюся астраханскую воблу, судака, леща или деликатесные наборы в каталоге
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#08172c] text-[#eedfc8] text-xs font-bold hover:bg-[#0f2647] transition-all flex items-center gap-1.5 mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c]"
                  >
                    <span>Перейти к выбору рыбы</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Item List */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-white border border-[#e8decb] shadow-2xs flex items-center justify-between gap-3"
                      >
                        {item.image && (
                          <div className="w-14 h-14 rounded-xl bg-[#08172c] overflow-hidden shrink-0 border border-[#e8decb]">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" width={56} height={56} loading="lazy" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#08172c] truncate">{item.name}</h4>
                          <p className="text-[11px] text-[#9c7847] font-semibold">
                            Фасовка: {item.weightLabel} ({item.pricePerUnit.toLocaleString('ru-RU')} ₽/{item.unit})
                          </p>
                          <div className="text-xs font-brand-serif font-black text-[#08172c] mt-0.5 tabular-nums">
                            {item.totalPrice.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>

                        {/* Quantity & Delete */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 bg-[#faf7f2] px-2 py-1 rounded-xl border border-[#e8decb]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              aria-label={`Уменьшить количество ${item.name}`}
                              className="w-5 h-5 rounded-md bg-white hover:bg-[#f5ebd9] text-[#08172c] font-bold text-xs flex items-center justify-center border border-[#e8decb]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c]"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-[#08172c] tabular-nums" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Увеличить количество ${item.name}`}
                              className="w-5 h-5 rounded-md bg-white hover:bg-[#f5ebd9] text-[#08172c] font-bold text-xs flex items-center justify-center border border-[#e8decb]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c]"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-md"
                            title="Удалить позицию"
                            aria-label={`Удалить ${item.name} из корзины`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Direct Messenger Order Block */}
                  <div className="mt-5 pt-4 border-t border-[#e8decb] bg-white p-5 rounded-2xl border border-[#e8decb] space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#08172c]">
                          Выберите мессенджер для заказа:
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyText}
                          className="text-[11px] font-semibold text-slate-500 hover:text-[#08172c] flex items-center gap-1 transition-colors"
                          title="Скопировать текст заказа"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copied ? 'Скопировано!' : 'Скопировать текст'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                        Без заполнения анкет — сразу откроем диалог с готовым текстом заказа:
                      </p>

                      {/* 3 Clean Messenger Choice Buttons (Text only, no icons) */}
                      <div className="grid grid-cols-3 gap-2">
                        {/* Telegram */}
                        <button
                          type="button"
                          onClick={() => setMessenger('telegram')}
                          aria-pressed={messenger === 'telegram'}
                          className={`py-3 px-2 rounded-2xl border text-center transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
                            messenger === 'telegram'
                              ? 'bg-[#08172c] border-[#08172c] text-[#eedfc8] shadow-sm font-bold'
                              : 'bg-[#faf7f2] border-[#e8decb] text-[#08172c] hover:bg-[#f5ebd9] font-medium'
                          }`}
                        >
                          <span className="text-xs">Telegram</span>
                        </button>

                        {/* VK */}
                        <button
                          type="button"
                          onClick={() => setMessenger('vk')}
                          aria-pressed={messenger === 'vk'}
                          className={`py-3 px-2 rounded-2xl border text-center transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
                            messenger === 'vk'
                              ? 'bg-[#08172c] border-[#08172c] text-[#eedfc8] shadow-sm font-bold'
                              : 'bg-[#faf7f2] border-[#e8decb] text-[#08172c] hover:bg-[#f5ebd9] font-medium'
                          }`}
                        >
                          <span className="text-xs">ВКонтакте</span>
                        </button>

                        {/* Messenger MAX */}
                        <button
                          type="button"
                          onClick={() => setMessenger('max')}
                          aria-pressed={messenger === 'max'}
                          className={`py-3 px-2 rounded-2xl border text-center transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
                            messenger === 'max'
                              ? 'bg-[#08172c] border-[#08172c] text-[#eedfc8] shadow-sm font-bold'
                              : 'bg-[#faf7f2] border-[#e8decb] text-[#08172c] hover:bg-[#f5ebd9] font-medium'
                          }`}
                        >
                          <span className="text-xs">MAX</span>
                        </button>
                      </div>
                    </div>

                    {/* Total and Order Button */}
                    <div className="pt-3 border-t border-[#e8decb]">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-600">Итого к оплате:</span>
                        <span className="text-2xl font-brand-serif font-black text-[#08172c] tabular-nums">
                          {totalAmount.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => handleCheckout(messenger)}
                        className="w-full py-3.5 rounded-xl bg-[#08172c] hover:bg-[#0f2647] text-[#eedfc8] font-black text-xs uppercase tracking-wider shadow-lg shadow-black/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] active:scale-[0.99]"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                            <span>Открываем чат…</span>
                          </>
                        ) : (
                          <>
                            <span>
                              Оформить в {messenger === 'telegram' ? 'Telegram' : messenger === 'vk' ? 'ВКонтакте' : 'MAX'} ({totalAmount.toLocaleString('ru-RU')} ₽)
                            </span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-center text-slate-400 mt-2.5 leading-normal">
                        В чате сразу появится готовый список рыбы. Менеджер ответит в течение 5 минут для согласования точного веса и доставки.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
