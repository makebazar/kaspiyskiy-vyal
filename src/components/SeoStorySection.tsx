import React from 'react';
import { Compass, Waves, Award, Sparkles } from 'lucide-react';

export default function SeoStorySection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e8decb]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#bda78d] uppercase block mb-1">
            Культура и традиции дельты Волги
          </span>
          <h2 className="text-2xl sm:text-3xl font-brand-serif font-bold text-[#08172c] tracking-tight text-balance">
            Почему настоящая астраханская вобла и вяленый судак не имеют аналогов
          </h2>
        </div>

        {/* 2 Column SEO Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          
          <div className="space-y-4 bg-[#faf7f2] p-6 sm:p-7 rounded-3xl border border-[#e8decb]">
            <div className="flex items-center gap-3 text-[#08172c] font-bold text-sm sm:text-base font-brand-serif">
              <div className="w-8 h-8 rounded-xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center shrink-0">
                <Waves className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3>Уникальный климат низовьев Волги и каспийский ветер</h3>
            </div>
            <p>
              Астраханский край исторически признан столицей русского рыбного промысла. Уникальное географическое положение дельты Волги с тысячами проток и раскатов создает идеальную природную кормовую базу для рыбы весеннего нагула.
            </p>
            <p>
              В отличие от промышленной термической сушки, аутентичное вяление происходит на открытом каспийском ветру при естественном движении воздуха. Это обеспечивает постепенное обезвоживание без разрушения структуры мышечных волокон и сохраняет чистый янтарный жирок.
            </p>
          </div>

          <div className="space-y-4 bg-[#faf7f2] p-6 sm:p-7 rounded-3xl border border-[#e8decb]">
            <div className="flex items-center gap-3 text-[#08172c] font-bold text-sm sm:text-base font-brand-serif">
              <div className="w-8 h-8 rounded-xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3>Выверенный малосол и 100% гарантия зрелой икры</h3>
            </div>
            <p>
              Мы используем строгую технологию посола (4–6% морской соли). Такой баланс подчеркивает благородный сливочно-рыбный вкус деликатеса, не забивая его избыточной соленой коркой.
            </p>
            <p>
              Перед отправкой каждая вобла калибруется и просвечивается технологом вручную. Герметичный барьерный вакуум надежно консервирует сочность и упругость ястычной икры, полностью предотвращая усушку и посторонние запахи при транспортировке службами СДЭК и Почта России.
            </p>
          </div>

        </div>

        {/* Bottom Highlights */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl border border-[#e8decb] bg-white">
            <span className="font-brand-serif text-lg font-bold text-[#08172c] block">Астрахань</span>
            <span className="text-[11px] text-slate-500">Прямой вылов и сушка</span>
          </div>
          <div className="p-4 rounded-2xl border border-[#e8decb] bg-white">
            <span className="font-brand-serif text-lg font-bold text-[#08172c] block">4–6%</span>
            <span className="text-[11px] text-slate-500">Мягкий малосол</span>
          </div>
          <div className="p-4 rounded-2xl border border-[#e8decb] bg-white">
            <span className="font-brand-serif text-lg font-bold text-[#08172c] block">Барьерный вакуум</span>
            <span className="text-[11px] text-slate-500">До 6 мес. хранения</span>
          </div>
          <div className="p-4 rounded-2xl border border-[#e8decb] bg-white">
            <span className="font-brand-serif text-lg font-bold text-[#08172c] block">2–4 дня</span>
            <span className="text-[11px] text-slate-500">Доставка СДЭК по РФ</span>
          </div>
        </div>

      </div>
    </section>
  );
}
