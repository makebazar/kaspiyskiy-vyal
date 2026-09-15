import React from 'react';
import { ShieldCheck, Zap, MapPin } from 'lucide-react';
import { SiteSettings } from '@/types/product';

interface DeliveryProps {
  settings: SiteSettings;
}

export default function DeliverySection({ settings }: DeliveryProps) {
  const regions = [
    { name: 'Москва и Московская обл.', time: '2-3 дня', service: 'СДЭК / Курьер' },
    { name: 'Санкт-Петербург и ЛО', time: '2-3 дня', service: 'СДЭК / Курьер' },
    { name: 'Центральная Россия и Поволжье', time: '2-4 дня', service: 'СДЭК / Почта' },
    { name: 'Урал и Западная Сибирь', time: '3-5 дней', service: 'СДЭК / Почта' },
    { name: 'Восточная Сибирь и ДВ', time: '4-6 дней', service: 'СДЭК Авиа / EMS' },
  ];

  return (
    <section id="delivery" className="py-16 md:py-24 bg-white border-b border-[#e8decb] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#bda78d] uppercase block mb-1">
            Свежесть гарантирована
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-brand-serif font-bold text-[#08172c] tracking-tight text-balance">
            Барьерный вакуум и быстрая доставка по всей России
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Каждая партия упаковывается в плотный пищевой вакуум: рыба сохраняет первозданную сочность, икру и аромат в пути до 30 дней.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Vacuum Packaging Technology */}
          <div className="lg:col-span-6 p-7 md:p-9 rounded-3xl bg-[#08172c] text-[#eedfc8] relative overflow-hidden flex flex-col justify-between border border-[#eedfc8]/15 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#eedfc8]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div>
              <div className="mb-6">
                <h3 className="text-xl font-brand-serif font-bold text-[#eedfc8] text-balance">Фирменная вакуумная защита</h3>
                <p className="text-xs text-[#dfcbb2]/80 mt-1">Защита от воздуха, окисления жира и потери сочности</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#eedfc8]/20 text-[#eedfc8] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold" aria-hidden="true">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#eedfc8]">Без усушки и потери сочности в пути</h4>
                    <p className="text-xs text-[#eedfc8]/70 mt-0.5 leading-relaxed">
                      Влага и природный янтарный жирок остаются внутри мякоти. Икра сохраняет упругую зернистую структуру без пересыхания.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#eedfc8]/20 text-[#eedfc8] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold" aria-hidden="true">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#eedfc8]">100% без рыбных запахов в пункте выдачи</h4>
                    <p className="text-xs text-[#eedfc8]/70 mt-0.5 leading-relaxed">
                      Многослойный барьерный пакет надежно блокирует любой запах. Посылку удобно забирать в СДЭКе или на Почте.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#eedfc8]/20 text-[#eedfc8] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold" aria-hidden="true">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#eedfc8]">Хранение до 6 месяцев в холодильнике</h4>
                    <p className="text-xs text-[#eedfc8]/70 mt-0.5 leading-relaxed">
                      Вы можете взять запас деликатесов на несколько месяцев вперед: в невскрытом вакууме рыба не теряет качества.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#eedfc8]/15 text-xs text-[#eedfc8] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Двойной контроль запайки шва каждой упаковки перед отправкой</span>
            </div>
          </div>

          {/* Right: Delivery Channels & Regional Times */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            
            {/* Regional Times Box */}
            <div className="p-6 rounded-2xl bg-[#faf7f2] border border-[#e8decb]">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#08172c]" aria-hidden="true" />
                <h4 className="text-sm font-bold text-[#08172c] uppercase tracking-wider">Сроки доставки из Астрахани</h4>
              </div>

              <div className="space-y-2.5">
                {regions.map((reg, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-[#e8decb]/60 last:border-0">
                    <span className="text-slate-700 font-medium">{reg.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 hidden sm:inline">{reg.service}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#eedfc8] text-[#08172c] font-bold text-[11px] tabular-nums">
                        {reg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8decb]">
                <h5 className="text-sm font-bold text-[#08172c] mb-1">СДЭК</h5>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Более 5 000 пунктов выдачи и курьерская доставка. Отслеживание по трек-номеру онлайн.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8decb]">
                <h5 className="text-sm font-bold text-[#08172c] mb-1">Почта России</h5>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Доставка в любой населенный пункт или отдаленный регион РФ.
                </p>
              </div>
            </div>

            {/* Notice */}
            <div className="p-4 rounded-xl bg-[#f5ebd9] border border-[#dfcbb2] flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#08172c] shrink-0" />
              <p className="text-xs text-[#08172c] font-medium leading-snug">
                {settings.deliveryNotice}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

