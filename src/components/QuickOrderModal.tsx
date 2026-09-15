'use client';

import React, { useState, useEffect } from 'react';
import { Product, SiteSettings } from '../types/product';
import { X, Send, MessageCircle, Phone, CheckCircle2, Loader2, Zap } from 'lucide-react';

interface QuickOrderModalProps {
  product: Product | null;
  selectedWeightLabel?: string;
  customPrice?: number;
  settings: SiteSettings;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickOrderModal({
  product,
  selectedWeightLabel,
  customPrice,
  settings,
  isOpen,
  onClose,
}: QuickOrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [messenger, setMessenger] = useState<'telegram' | 'vk' | 'max'>('telegram');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSuccess(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const unitPrice = customPrice !== undefined ? customPrice : product.price;
  const weightName = selectedWeightLabel || `1 ${product.unit}`;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: `${product.name} (фасовка: ${weightName}, ${quantity} шт) — ${totalPrice.toLocaleString('ru-RU')} ₽`,
          quantity,
          customerName: name,
          customerPhone: phone,
          messengerPreference: messenger,
          comment,
          totalAmount: totalPrice,
        }),
      });

      if (res.ok) {
        setSuccess(true);

        if (messenger === 'telegram') {
          const text = encodeURIComponent(
            `🛒 Быстрый заказ с сайта «Каспийский вял»:\n\n` +
            `• Товар: ${product.name}\n` +
            `• Фасовка: ${weightName}\n` +
            `• Количество: ${quantity} шт\n` +
            `• Сумма: ${totalPrice.toLocaleString('ru-RU')} ₽\n\n` +
            `👤 Имя: ${name || 'Покупатель'}\n` +
            `📱 Телефон: ${phone}\n` +
            (comment ? `💬 Пожелания: ${comment}` : '')
          );
          setTimeout(() => {
            window.open(`https://t.me/${settings.telegramUsername}?text=${text}`, '_blank');
          }, 600);
        } else if (messenger === 'vk') {
          setTimeout(() => {
            window.open(settings.vkChatUrl || settings.vkGroupUrl, '_blank');
          }, 600);
        } else if (messenger === 'max') {
          setTimeout(() => {
            window.open(settings.maxChatUrl || `https://max.ru/${settings.telegramUsername || 'kaspiy_vyal'}`, '_blank');
          }, 600);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setName('');
    setPhone('');
    setComment('');
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08172c]/80 backdrop-blur-xs animate-modal">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#e8decb] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8decb] bg-[#08172c] text-[#eedfc8]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#dfa143] fill-[#dfa143]" aria-hidden="true" />
            <span className="text-sm font-brand-serif font-bold tracking-wider">Быстрый заказ в 1 клик</span>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-[#eedfc8]/70 hover:text-[#eedfc8] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8]"
            aria-label="Закрыть окно быстрого заказа"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#08172c] mb-1">Заявка принята!</h3>
              <p className="text-xs text-slate-600 mb-5 max-w-xs mx-auto">
                Мы свяжемся с вами в течение 10–15 минут для подтверждения точного веса и адреса доставки.
              </p>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-[#08172c] text-[#eedfc8] font-bold text-xs shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c]"
              >
                Отлично, закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Product Brief */}
              <div className="p-3 rounded-2xl bg-[#faf7f2] border border-[#e8decb] flex items-center justify-between">
                <div className="pr-2">
                  <h4 className="text-xs font-bold text-[#08172c] leading-tight">{product.name}</h4>
                  <span className="text-[11px] text-[#9c7847] font-bold block mt-0.5">
                    Фасовка: {weightName} ({unitPrice.toLocaleString('ru-RU')} ₽)
                  </span>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-[#e8decb] shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Уменьшить количество"
                    className="w-5 h-5 rounded-md bg-[#faf7f2] hover:bg-[#f5ebd9] text-[#08172c] font-bold text-xs flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c]"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold w-5 text-center text-[#08172c] tabular-nums" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Увеличить количество"
                    className="w-5 h-5 rounded-md bg-[#faf7f2] hover:bg-[#f5ebd9] text-[#08172c] font-bold text-xs flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex justify-between items-center px-1 text-xs">
                <span className="text-slate-500 font-medium">Итого к оплате:</span>
                <span className="text-base font-brand-serif font-black text-[#08172c] tabular-nums">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              {/* Name input */}
              <div>
                <label htmlFor="quick-name" className="block text-xs font-bold text-[#08172c] mb-1">
                  Ваше имя: <span className="text-rose-500">*</span>
                </label>
                <input
                  id="quick-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван"
                  className="w-full px-3 py-2 rounded-xl border border-[#e8decb] bg-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] focus-visible:border-[#08172c] transition-all"
                />
              </div>

              {/* Phone input */}
              <div>
                <label htmlFor="quick-phone" className="block text-xs font-bold text-[#08172c] mb-1">
                  Номер телефона: <span className="text-rose-500">*</span>
                </label>
                <input
                  id="quick-phone"
                  name="tel"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  spellCheck={false}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  className="w-full px-3 py-2 rounded-xl border border-[#e8decb] bg-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] focus-visible:border-[#08172c] transition-all"
                />
              </div>

              {/* Preferred Messenger */}
              <div>
                <label className="block text-xs font-bold text-[#08172c] mb-1">
                  Где подтвердить заказ?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMessenger('telegram')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
                      messenger === 'telegram'
                        ? 'bg-[#08172c] border-[#08172c] text-[#eedfc8]'
                        : 'bg-white border-[#e8decb] text-[#08172c] hover:bg-[#faf7f2]'
                    }`}
                  >
                    <Send className="w-3 h-3" aria-hidden="true" />
                    <span>Telegram</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMessenger('vk')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
                      messenger === 'vk'
                        ? 'bg-[#08172c] border-[#08172c] text-[#eedfc8]'
                        : 'bg-white border-[#e8decb] text-[#08172c] hover:bg-[#faf7f2]'
                    }`}
                  >
                    <MessageCircle className="w-3 h-3" aria-hidden="true" />
                    <span>VK</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMessenger('max')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
                      messenger === 'max'
                        ? 'bg-[#08172c] border-[#08172c] text-[#eedfc8]'
                        : 'bg-white border-[#e8decb] text-[#08172c] hover:bg-[#faf7f2]'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-sm bg-[#08172c] text-[#eedfc8] flex items-center justify-center text-[7px] font-black">
                      M
                    </div>
                    <span>MAX</span>
                  </button>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="quick-comment" className="block text-xs font-bold text-[#08172c] mb-1">
                  Комментарий (необязательно):
                </label>
                <textarea
                  id="quick-comment"
                  name="comment"
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например: пожелания по степени просола / город доставки…"
                  className="w-full px-3 py-1.5 rounded-xl border border-[#e8decb] bg-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] focus-visible:border-[#08172c] transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#08172c] hover:bg-[#0f2647] text-[#eedfc8] font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Оформляем заказ…</span>
                  </>
                ) : (
                  <span>Подтвердить заказ</span>
                )}
              </button>

              <p className="text-[10px] text-center text-slate-400">
                Оплата после согласования веса и фотоотчета перед отправкой.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


