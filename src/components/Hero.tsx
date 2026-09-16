'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SiteSettings, Product } from '../types/product';

interface HeroProps {
  settings: SiteSettings;
  featuredProduct?: Product;
}

export default function Hero({ settings, featuredProduct }: HeroProps) {
  const initialImage = settings.heroImage 
    || featuredProduct?.images?.[0] 
    || '/images/products/vobla-ikra.jpg';

  const [heroImg, setHeroImg] = useState(initialImage);

  useEffect(() => {
    const updated = settings.heroImage 
      || featuredProduct?.images?.[0] 
      || '/images/products/vobla-ikra.jpg';
    setHeroImg(updated);
  }, [settings.heroImage, featuredProduct]);

  const badgeText = settings.heroBadge || featuredProduct?.badge || 'Астрахань · 100% с икрой';
  const titleText = settings.heroTitle || featuredProduct?.name || 'Вобла астраханская отборная со 100% икрой';
  const priceText = settings.heroPriceText || (featuredProduct ? `от ${featuredProduct.price.toLocaleString('ru-RU')} ₽ / ${featuredProduct.unit}` : 'от 1 550 ₽ / кг');
  const saltingText = settings.heroSalting || 'Малосол (4–6% соли)';
  const dryingText = settings.heroDrying || 'Традиционное на каспийском ветру';
  const shelfLifeText = settings.heroShelfLife || 'До 6 месяцев в вакууме';

  return (
    <section className="relative pt-24 pb-20 md:pt-28 md:pb-28 overflow-hidden brand-hero-bg text-[#eedfc8]">
      {/* Volga Delta Map Background Overlay on Right */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 md:opacity-35 pointer-events-none flex items-center justify-end overflow-hidden">
        <img
          src="/images/volga-delta-map.svg"
          alt="Дельта Волги и Каспий"
          width={600}
          height={600}
          className="h-[120%] max-w-none object-contain translate-x-12 translate-y-4"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mobile: compact trust strip | Desktop: emblem + pillars row */}
        {/* Mobile trust strip — replaces bulky logo + 3 stacked rows */}
        <div className="flex lg:hidden items-center justify-center gap-3 pb-5 mb-5 border-b border-[#eedfc8]/15 flex-wrap">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#eedfc8]/80 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eedfc8]/70 shrink-0" aria-hidden="true" />
            Малосол 4–6%
          </span>
          <span className="text-[#eedfc8]/30">·</span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#eedfc8]/80 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eedfc8]/70 shrink-0" aria-hidden="true" />
            100% икры в вобле
          </span>
          <span className="text-[#eedfc8]/30">·</span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#eedfc8]/80 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eedfc8]/70 shrink-0" aria-hidden="true" />
            СДЭК 2–4 дня
          </span>
        </div>

        {/* Desktop: emblem + pillars row */}
        <div className="hidden lg:flex items-center justify-between gap-8 pb-8 mb-8 border-b border-[#eedfc8]/15">
          <div className="flex items-center gap-5">
            <div className="w-18 h-18 rounded-full border-2 border-[#eedfc8] flex items-center justify-center p-2 bg-[#061324] shadow-lg shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#eedfc8]" fill="none" stroke="currentColor" aria-hidden="true">
                <circle cx="50" cy="50" r="46" strokeWidth="2.5"/>
                <path d="M70,28 C73,25 76,25 78,28 C80,25 83,25 86,28 C82,29 79,31 78,32 C77,31 74,29 70,28 Z" fill="currentColor"/>
                <path d="M50,30 C45,42 62,50 42,62" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M15,70 C30,60 40,75 55,65 C70,55 80,70 88,65" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M18,80 C32,70 42,85 58,75 C72,65 82,80 88,76" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-brand-serif font-bold tracking-[0.35em] text-[#eedfc8]/80 uppercase block leading-none mb-1">Каспийский</span>
              <span className="text-4xl font-brand-serif font-black tracking-[0.22em] text-[#eedfc8] block leading-none mb-1.5">ВЯЛ</span>
              <div className="h-[1.5px] w-20 bg-[#eedfc8]/50" />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="w-[1px] h-10 bg-[#eedfc8]/25" />
            {[
              'Натуральный малосол (4–6%)',
              '100% гарантия икры в вобле',
              'Из Астрахани в вакууме',
            ].map((text) => (
              <div key={text} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#eedfc8] shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#eedfc8]/90">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Hero Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-brand-serif font-bold tracking-tight text-[#eedfc8] leading-[1.18] mb-5 text-balance">
              Настоящая астраханская вобла со 100% гарантией икры в каждой рыбке
            </h1>

            <p className="text-sm sm:text-base text-[#eedfc8]/85 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-normal">
              Бережный малосол на каспийском ветру: тугая янтарная спинка на просвет, тающий сочный жирок и плотный брусок зрелой икры. Доставим в герметичном вакууме за 2–4 дня по всей России.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-8">
              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#eedfc8] hover:bg-[#f7f0e4] text-[#08172c] font-black text-xs uppercase tracking-wider shadow-xl shadow-black/30 transition-all hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8]"
              >
                <span>Выбрать рыбу в каталоге</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Trust bullet row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#eedfc8]/80 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Малосол (4–6% соли)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Без усушки в вакууме</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>СДЭК за 2–3 дня в Москву и СПб</span>
              </div>
            </div>
          </div>

          {/* Right: Premium Showcase Card */}
          <div className="lg:col-span-5 relative">
            <a
              href="#catalog"
              className="block rounded-3xl p-6 bg-[#0c1e36] border border-[#eedfc8]/20 shadow-2xl backdrop-blur-md group hover:border-[#eedfc8]/40 transition-all"
            >
              <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden bg-[#061324] flex items-center justify-center border border-[#eedfc8]/15 mb-4">
                <img
                  src={heroImg}
                  alt={titleText}
                  title={`Астраханская вяленая рыба — ${titleText}`}
                  width={480}
                  height={256}
                  fetchPriority="high"
                  onError={() => setHeroImg('/images/placeholder-logo.svg')}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                {badgeText && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#08172c]/90 border border-[#eedfc8]/40 text-[#eedfc8] text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-xs">
                    {badgeText}
                  </div>
                )}

                {priceText && (
                  <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-[#eedfc8] text-[#08172c] text-xs font-black shadow-md tabular-nums">
                    {priceText}
                  </div>
                )}
              </div>

              <div className="space-y-2 text-xs text-[#eedfc8]/80">
                <div className="flex items-center justify-between py-1.5 border-b border-[#eedfc8]/10">
                  <span className="text-[#eedfc8]/60">Степень просола:</span>
                  <span className="font-bold text-[#eedfc8]">{saltingText}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#eedfc8]/10">
                  <span className="text-[#eedfc8]/60">Вяление:</span>
                  <span className="font-bold text-[#eedfc8]">{dryingText}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#eedfc8]/60">Срок хранения:</span>
                  <span className="font-bold text-[#eedfc8]">{shelfLifeText}</span>
                </div>
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}


