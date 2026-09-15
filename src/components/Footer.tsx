import React from 'react';
import Link from 'next/link';
import { Phone, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types/product';

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacts" className="bg-[#061222] text-[#eedfc8] pt-16 pb-12 border-t border-[#eedfc8]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Header inside Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-10 mb-10 border-b border-[#eedfc8]/15">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#eedfc8] flex items-center justify-center p-1 bg-[#08172c]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#eedfc8]" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="46" strokeWidth="2.5"/>
                <path d="M50,15 C45,30 65,40 40,55" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M20,65 C35,55 45,70 60,60 C75,50 85,65 90,60" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <span className="text-xs font-brand-serif font-bold tracking-[0.3em] uppercase block text-[#eedfc8]/80 leading-none mb-1">
                Каспийский
              </span>
              <span className="text-2xl font-brand-serif font-black tracking-[0.2em] block text-[#eedfc8] leading-none">
                ВЯЛ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-[#eedfc8]/80 font-semibold">
            <span>Натурально и вкусно</span>
            <span className="hidden sm:inline">·</span>
            <span>Традиции качества</span>
            <span className="hidden sm:inline">·</span>
            <span>Из Астрахани с любовью</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <p className="text-xs text-[#eedfc8]/70 leading-relaxed font-normal">
              {settings.siteTagline}. Продажа отборной астраханской вяленой рыбы и ястычной икры в вакуумной упаковке с доставкой по всей РФ.
            </p>
            <div className="text-xs text-[#eedfc8]/80">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Прием заказов: {settings.workHours}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-[#eedfc8] uppercase tracking-wider mb-4">
              Разделы сайта
            </h4>
            <ul className="space-y-2 text-xs text-[#eedfc8]/80">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Каталог рыбы и деликатесов
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Технология вяления и малосол
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-white transition-colors">
                  Вакуумная упаковка и доставка СДЭК
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Отзывы покупателей
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Часто задаваемые вопросы (FAQ)
                </a>
              </li>
              <li>
                <Link href="/offer" className="hover:text-white transition-colors">
                  Публичная оферта и реквизиты ИП
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Assortment */}
          <div>
            <h4 className="text-xs font-bold text-[#eedfc8] uppercase tracking-wider mb-4">
              Популярная рыба
            </h4>
            <ul className="space-y-2 text-xs text-[#eedfc8]/70">
              <li>Вобла астраханская с икрой (весенний вылов)</li>
              <li>Судак вяленый пластованный (книжкой)</li>
              <li>Лещ крупный волжский жирный</li>
              <li>Чехонь сабельная вяленая</li>
              <li>Икра воблы ястычная вяленая</li>
              <li>Подарочные наборы деликатесов</li>
            </ul>
          </div>

          {/* Col 4: Quick Contact Channels */}
          <div>
            <h4 className="text-xs font-bold text-[#eedfc8] uppercase tracking-wider mb-4">
              Связь и заказы
            </h4>
            <div className="space-y-2.5">
              {/* 3 Messenger Buttons in 1 Row */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={settings.telegramBotOrChannelUrl || `https://t.me/${settings.telegramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 px-2 bg-[#08172c] hover:bg-[#0c1f38] text-[#eedfc8] border border-[#eedfc8]/25 text-xs font-bold rounded-xl text-center transition-colors"
                  aria-label="Telegram"
                >
                  <span>Telegram</span>
                </a>
                <a
                  href={settings.vkChatUrl || settings.vkGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 px-2 bg-[#08172c] hover:bg-[#0c1f38] text-[#eedfc8] border border-[#eedfc8]/25 text-xs font-bold rounded-xl text-center transition-colors"
                  aria-label="ВКонтакте"
                >
                  <span>ВКонтакте</span>
                </a>
                <a
                  href={settings.maxChatUrl || `https://max.ru/${settings.telegramUsername || 'kaspiy_vyal'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 px-2 bg-[#08172c] hover:bg-[#0c1f38] text-[#eedfc8] border border-[#eedfc8]/25 text-xs font-bold rounded-xl text-center transition-colors"
                  aria-label="MAX"
                >
                  <span>MAX</span>
                </a>
              </div>

              {/* Phone */}
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#eedfc8] hover:bg-[#f7f0e4] text-[#08172c] text-xs font-bold transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#08172c]" />
                <span className="tabular-nums">{settings.phoneDisplay}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#eedfc8]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#eedfc8]/60">
          <p>© {currentYear} «Каспийский вял». ИП Дубоносова Светлана Валерьевна. Доставка по РФ.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/offer" className="hover:text-[#eedfc8] underline underline-offset-4 transition-colors">
              Публичная оферта и реквизиты
            </Link>
            <Link href="/admin" className="hover:text-[#eedfc8] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Панель управления</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
