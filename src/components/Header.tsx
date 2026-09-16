'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Send, MessageCircle, Phone, Menu, X, ShieldCheck, ShoppingBag } from 'lucide-react';
import { SiteSettings } from '../types/product';

interface HeaderProps {
  settings: SiteSettings;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export default function Header({ settings, cartItemCount = 0, onOpenCart }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Каталог', href: '#catalog' },
    { name: 'О посоле', href: '#about' },
    { name: 'Доставка', href: '#delivery' },
    { name: 'Отзывы', href: '#reviews' },
    { name: 'Вопросы', href: '#faq' },
    { name: 'Контакты', href: '#contacts' },
  ];

  const tgUrl = settings.telegramBotOrChannelUrl || (settings.telegramUsername?.startsWith('http') ? settings.telegramUsername : `https://t.me/${settings.telegramUsername || 'kaspiy_vyal'}`);
  const vkUrl = settings.vkChatUrl || settings.vkGroupUrl || 'https://vk.me/kaspiy_vyal';
  const maxUrl = settings.maxChatUrl || `https://max.ru/${settings.telegramUsername || 'kaspiy_vyal'}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'brand-glass-header py-2.5 shadow-md'
          : 'bg-[#08172c]/95 backdrop-blur-md py-3 border-b border-[#eedfc8]/15 text-[#eedfc8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-full border border-[#eedfc8]/70 flex items-center justify-center p-1 bg-[#061324] group-hover:scale-105 transition-transform shadow-xs">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#eedfc8]" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="46" strokeWidth="2"/>
              <path d="M50,15 C45,30 65,40 40,55" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M20,65 C35,55 45,70 60,60 C75,50 85,65 90,60" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M25,76 C40,66 50,81 65,71 C80,61 85,76 90,72" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-brand-serif font-bold tracking-[0.25em] text-[#eedfc8]/75 uppercase leading-none mb-0.5">
              Каспийский
            </span>
            <span className="text-lg font-brand-serif font-black tracking-[0.16em] text-[#eedfc8] leading-none">
              ВЯЛ
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Clean, single line with proper spacing */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold tracking-wider text-[#eedfc8]/75 hover:text-white transition-colors uppercase whitespace-nowrap py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Cluster (Phone + Messengers + Cart + Admin) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          
          {/* Phone Link */}
          <a
            href={`tel:${settings.phone}`}
            aria-label={`Позвонить по телефону ${settings.phoneDisplay}`}
            className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-[#eedfc8]/90 hover:text-white transition-colors whitespace-nowrap tabular-nums py-1.5 px-2.5 rounded-xl hover:bg-white/5"
          >
            <Phone className="w-3.5 h-3.5 text-[#eedfc8]" aria-hidden="true" />
            <span>{settings.phoneDisplay}</span>
          </a>

          {/* Compact Messenger Icon Group (TG, VK, MAX) */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-[#eedfc8]/15">
            <a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#eedfc8]/80 hover:text-white hover:bg-[#eedfc8]/20 rounded-lg transition-all"
              title="Написать в Telegram"
              aria-label="Написать в Telegram"
            >
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <a
              href={vkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#eedfc8]/80 hover:text-white hover:bg-[#eedfc8]/20 rounded-lg transition-all"
              title="Написать ВКонтакте"
              aria-label="Написать ВКонтакте"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <a
              href={maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 text-[11px] font-black text-[#eedfc8]/80 hover:text-white hover:bg-[#eedfc8]/20 rounded-lg transition-all"
              title="Написать в MAX"
              aria-label="Написать в MAX"
            >
              MAX
            </a>
          </div>

          {/* Primary Cart CTA Button */}
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              aria-label={`Открыть корзину, товаров: ${cartItemCount}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#eedfc8] hover:bg-[#f7f0e4] text-[#08172c] font-black text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              title="Открыть корзину"
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              <span>Корзина</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#08172c] text-[#eedfc8] text-[10px] font-black flex items-center justify-center tabular-nums" aria-live="polite">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}

          {/* Admin Lock Link */}
          <Link
            href="/admin"
            className="p-2 text-[#eedfc8]/40 hover:text-[#eedfc8] transition-colors rounded-xl hover:bg-white/5"
            title="Панель администратора"
            aria-label="Панель администратора"
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile menu & cart toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              className="relative p-2 bg-[#eedfc8] text-[#08172c] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8]"
              aria-label={`Корзина, товаров: ${cartItemCount}`}
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center tabular-nums" aria-live="polite">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#eedfc8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8] rounded-lg"
            aria-label={mobileMenuOpen ? 'Закрыть главное меню' : 'Открыть главное меню'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — full-screen overlay so page content doesn't bleed through */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-black/60 sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="sm:hidden fixed top-0 left-0 right-0 z-40 border-t border-[#eedfc8]/15 bg-[#08172c] px-4 py-5 shadow-2xl animate-modal text-[#eedfc8]" style={{ top: '56px' }}>
            <div className="flex flex-col gap-3 mb-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider uppercase text-[#eedfc8]/90 hover:text-[#eedfc8] py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-[#eedfc8]/15">
              {onOpenCart && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#eedfc8] text-[#08172c] font-black text-xs rounded-xl shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Открыть корзину ({cartItemCount})</span>
                </button>
              )}

              {/* 3 Messenger Buttons in 1 Single Horizontal Row */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={tgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 px-2 bg-[#eedfc8]/15 hover:bg-[#eedfc8]/25 text-[#eedfc8] border border-[#eedfc8]/30 font-bold text-xs rounded-xl text-center transition-colors"
                  aria-label="Написать в Telegram"
                >
                  <span>Telegram</span>
                </a>
                <a
                  href={vkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 px-2 bg-[#eedfc8]/15 hover:bg-[#eedfc8]/25 text-[#eedfc8] border border-[#eedfc8]/30 font-bold text-xs rounded-xl text-center transition-colors"
                  aria-label="Написать ВКонтакте"
                >
                  <span>ВКонтакте</span>
                </a>
                <a
                  href={maxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 px-2 bg-[#eedfc8]/15 hover:bg-[#eedfc8]/25 text-[#eedfc8] border border-[#eedfc8]/30 font-bold text-xs rounded-xl text-center transition-colors"
                  aria-label="Написать в MAX"
                >
                  <span>MAX</span>
                </a>
              </div>

              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#eedfc8] hover:bg-[#f7f0e4] text-[#08172c] font-bold text-xs rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="tabular-nums">{settings.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

