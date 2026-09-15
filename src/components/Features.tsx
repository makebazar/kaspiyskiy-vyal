import React from 'react';
import { Package, Scale, ThermometerSun, HeartHandshake, Truck, Eye } from 'lucide-react';

export default function Features() {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#faf7f2] border-b border-[#e8decb] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#bda78d] uppercase block mb-1">
            Традиции астраханских рыбаков
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-brand-serif font-bold text-[#08172c] tracking-tight text-balance">
            Секрет настоящего каспийского вяла
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal">
            Бережно сохраняем вековую рецептуру низовьев Волги: естественная сушка на ветру, выверенный малосол и барьерный вакуум.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Bento Cell 1 (Hero Card) */}
          <div className="md:col-span-8 rounded-3xl p-7 md:p-9 bg-[#08172c] text-[#eedfc8] relative overflow-hidden flex flex-col justify-between border border-[#eedfc8]/15 shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#eedfc8]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            
            <div className="relative z-10 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#eedfc8] text-[#08172c] flex items-center justify-center font-bold mb-5 shadow-sm">
                <ThermometerSun className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#dfcbb2] block mb-1">
                Натурально и безопасно
              </span>
              <h3 className="text-xl sm:text-2xl font-brand-serif font-bold text-[#eedfc8] mb-3 text-balance">
                Естественное вяление на каспийском ветру
              </h3>
              <p className="text-[#eedfc8]/80 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
                Сушка происходит в проветриваемых цехах при контролируемой влажности. Без жидкого дыма, красителей и ускоренной химии. Сохраняется природный янтарный жирок, мягкость волокон и чистый вкус малосола (4–6% соли).
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[#eedfc8]/15 text-xs text-[#eedfc8] relative z-10">
              <div>
                <span className="font-brand-serif text-lg sm:text-xl font-bold text-[#eedfc8] block tabular-nums">4–6%</span>
                <span className="text-[11px] text-[#eedfc8]/70">Правильный малосол</span>
              </div>
              <div>
                <span className="font-brand-serif text-lg sm:text-xl font-bold text-[#eedfc8] block tabular-nums">100%</span>
                <span className="text-[11px] text-[#eedfc8]/70">Без консервантов</span>
              </div>
              <div>
                <span className="font-brand-serif text-lg sm:text-xl font-bold text-[#eedfc8] block">Весенний</span>
                <span className="text-[11px] text-[#eedfc8]/70">Пик жирности и икры</span>
              </div>
            </div>
          </div>

          {/* Bento Cell 2 (Vacuum) */}
          <div className="md:col-span-4 rounded-3xl p-7 bg-white border border-[#e8decb] flex flex-col justify-between hover:border-[#dfcbb2] transition-colors shadow-xs">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center mb-4">
                <Package className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[#08172c] mb-2 text-balance">
                Плотный барьерный вакуум
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Защищает рыбу от контакта с воздухом, окисления и высыхания в дороге. Срок хранения в холодильнике до 6 месяцев.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e8decb] text-xs text-[#08172c] font-medium">
              ✓ Без запаха рыбы при получении
            </div>
          </div>

          {/* Bento Cell 3 (Weight & Selection) */}
          <div className="md:col-span-4 rounded-3xl p-7 bg-white border border-[#e8decb] flex flex-col justify-between hover:border-[#dfcbb2] transition-colors shadow-xs">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[#08172c] mb-2 text-balance">
                Ручной контроль на просвет
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Каждую рыбину перед вакуумацией технолог проверяет вручную. Это гарантирует 100% зрелую икру в вобле и отсутствие дефектов.
              </p>
            </div>
          </div>

          {/* Bento Cell 4 (Delivery) */}
          <div className="md:col-span-4 rounded-3xl p-7 bg-white border border-[#e8decb] flex flex-col justify-between hover:border-[#dfcbb2] transition-colors shadow-xs">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[#08172c] mb-2 text-balance">
                Ежедневная отправка СДЭК
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Отправляем заказы день в день прямо из Астрахани. Сроки в Москву и СПб: 2–3 дня. Высылаем трек-номер сразу после передачи курьеру.
              </p>
            </div>
          </div>

          {/* Bento Cell 5 (Guarantee) */}
          <div className="md:col-span-4 rounded-3xl p-7 bg-[#f5ebd9] border border-[#dfcbb2] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[#08172c] mb-2 text-balance">
                100% Гарантия вкуса и икры
              </h3>
              <p className="text-xs text-[#08172c]/85 leading-relaxed">
                Если вас не устроит степень просола или попадется рыба без икры: заменим партию за наш счет или вернем деньги без долгих споров.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


