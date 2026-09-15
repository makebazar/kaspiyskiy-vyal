'use client';

import React from 'react';
import { ShoppingBag, Send, Phone, ArrowRight } from 'lucide-react';
import { CartItem, SiteSettings } from '@/types/product';

interface MobileBottomBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  settings: SiteSettings;
}

export default function MobileBottomBar({ cartItems, onOpenCart, settings }: MobileBottomBarProps) {
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const tgUrl = settings.telegramBotOrChannelUrl || `https://t.me/${settings.telegramUsername}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08172c]/95 backdrop-blur-md border-t border-[#eedfc8]/20 px-4 py-2.5 shadow-2xl">
      {cartItems.length > 0 ? (
        <div className="flex items-center justify-between gap-3">
          {/* Cart Status Button */}
          <button
            onClick={onOpenCart}
            aria-label={`Открыть корзину, товаров: ${totalCount}`}
            className="flex items-center gap-2.5 text-left text-[#eedfc8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8] rounded-xl p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-[#eedfc8] text-[#08172c] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#08172c] tabular-nums" aria-live="polite">
                {totalCount}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#eedfc8]/70 block leading-tight">В корзине</span>
              <span className="text-sm font-brand-serif font-black text-[#eedfc8] tabular-nums">
                {totalAmount.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </button>

          {/* Checkout CTA */}
          <button
            onClick={onOpenCart}
            aria-label="Оформить заказ из корзины"
            className="flex-1 py-3 px-4 rounded-xl bg-[#eedfc8] hover:bg-[#f7f0e4] text-[#08172c] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Оформить заказ</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <a
            href="#catalog"
            aria-label="Перейти к каталогу рыбы"
            className="flex flex-col items-center justify-center py-1 text-[#eedfc8]/80 hover:text-[#eedfc8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8] rounded-lg"
          >
            <ShoppingBag className="w-4 h-4 mb-0.5" aria-hidden="true" />
            <span className="text-[10px] font-bold">Каталог</span>
          </a>

          <a
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать нам в Telegram"
            className="flex flex-col items-center justify-center py-1 text-[#eedfc8]/80 hover:text-[#eedfc8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8] rounded-lg"
          >
            <Send className="w-4 h-4 mb-0.5" aria-hidden="true" />
            <span className="text-[10px] font-bold">Telegram</span>
          </a>

          <a
            href={`tel:${settings.phone}`}
            aria-label={`Позвонить по номеру ${settings.phoneDisplay}`}
            className="flex flex-col items-center justify-center py-1 text-[#eedfc8] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8] rounded-lg"
          >
            <Phone className="w-4 h-4 mb-0.5" aria-hidden="true" />
            <span className="text-[10px]">Позвонить</span>
          </a>
        </div>
      )}
    </div>
  );
}

