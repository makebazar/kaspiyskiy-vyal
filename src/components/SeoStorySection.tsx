import React from 'react';
import { Waves, Award, Sparkles, BookOpen, UtensilsCrossed, ShieldCheck, Thermometer, Check } from 'lucide-react';

export default function SeoStorySection() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#e8decb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#735634] uppercase block mb-1">
            Культура и традиции дельты Волги
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-brand-serif font-bold text-[#08172c] tracking-tight text-balance">
            Гид по астраханской вяленой рыбе: секреты каспийского малосола
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Почему настоящая весенняя вобла со 100% икрой и пластованный волжский судак признаны эталоном рыбной гастрономии в России.
          </p>
        </div>

        {/* 2 Column SEO Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-12">
          
          <div className="space-y-4 bg-[#faf7f2] p-6 sm:p-8 rounded-3xl border border-[#e8decb]">
            <div className="flex items-center gap-3 text-[#08172c] font-bold text-base sm:text-lg font-brand-serif">
              <div className="w-9 h-9 rounded-xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center shrink-0">
                <Waves className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3>Уникальный микроклимат низовьев Волги и каспийские ветра</h3>
            </div>
            <p>
              Астраханский край исторически признан столицей русского рыбного промысла. Уникальное географическое положение дельты Волги с тысячами протоков, ильменей и раскатов создает непревзойденную природную кормовую базу для рыбы весеннего нагула.
            </p>
            <p>
              В отличие от ускоренной промышленной термической сушки в термокамерах, аутентичное вяление происходит на открытом воздухе при естественном движении каспийского ветра. Это обеспечивает плавное, постепенное обезвоживание без пересушивания волокон, сохраняя сочный янтарный жирок и нежную эластичную структуру спинки.
            </p>
          </div>

          <div className="space-y-4 bg-[#faf7f2] p-6 sm:p-8 rounded-3xl border border-[#e8decb]">
            <div className="flex items-center gap-3 text-[#08172c] font-bold text-base sm:text-lg font-brand-serif">
              <div className="w-9 h-9 rounded-xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3>Традиционный выверенный малосол (4–6% соли)</h3>
            </div>
            <p>
              Мы строго следуем вековой рецептуре малосола: содержание поваренной соли составляет всего 4–6%. Такой деликатный баланс подчеркивает благородный сливочно-рыбный вкус деликатеса, не обжигая рецепторы избыточной соленой коркой.
            </p>
            <p>
              Перед упаковкой каждая рыба калибруется и просвечивается технологом вручную. Барьерный вакуумный пакет надежно запечатывает сочность и упругость зрелой ястычной икры, исключая усушку, окисление жиров и посторонние запахи при оперативной доставке СДЭК по всей России.
            </p>
          </div>

        </div>

        {/* Variety Guide Block (Encyclopedic Content) */}
        <div className="bg-[#faf7f2] rounded-3xl border border-[#e8decb] p-6 sm:p-9 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl font-brand-serif font-bold text-[#08172c]">
              Сорта и вкусовая палитра каспийских деликатесов
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700 leading-relaxed">
            <div className="p-5 rounded-2xl bg-white border border-[#e8decb]">
              <h3 className="font-bold text-[#08172c] text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#dfa143]" />
                Астраханская вобла с икрой
              </h3>
              <p>
                Главная визитная карточка Каспия. Отличается плотной янтарной спинкой, просвечивающей на солнце, и цельным бруском зрелой зернистой икры от головы до хвоста. Чистится легко, оставляя на пальцах аппетитный сок.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e8decb]">
              <h3 className="font-bold text-[#08172c] text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#dfa143]" />
                Судак пластованный «книжкой»
              </h3>
              <p>
                Диетический хищник слабой соли. Разделан вдоль хребта пластом, полностью освобожден от мелких костей. Чистейшее белое мясо легко разделяется на аппетитные сочные волокна. Идеален для ценителей нежирной рыбы.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e8decb]">
              <h3 className="font-bold text-[#08172c] text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#dfa143]" />
                Волжский лещ и сабельная чехонь
              </h3>
              <p>
                Крупный волжский лещ славится своей неповторимой жирностью и глубоким классическим ароматом, а сабельная чехонь порадует янтарным жирком и тонким нежным вкусом истинного речного деликатеса.
              </p>
            </div>
          </div>
        </div>

        {/* How to Serve & Store Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e8decb] shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-[#08172c] font-bold text-sm sm:text-base font-brand-serif">
              <UtensilsCrossed className="w-5 h-5 text-[#735634]" aria-hidden="true" />
              <h3>Как правильно подавать вяленую рыбу малосола</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              После вскрытия плотной вакуумной упаковки дайте рыбе «подышать» при комнатной температуре 15–20 минут. Это раскроет весь букет эфирных ароматов натурального каспийского вяла, а янтарный жирок станет мягким и тающим.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Отлично сочетается со свежими ржаными тостами и зеленым луком</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Идеальная классическая закуска к светлым и нефильтрованным напиткам</span>
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e8decb] shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-[#08172c] font-bold text-sm sm:text-base font-brand-serif">
              <Thermometer className="w-5 h-5 text-[#735634]" aria-hidden="true" />
              <h3>Правила хранения в домашних условиях</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              В запечатанном фирменном вакууме рыба сохраняет первозданную свежесть, сочность и органолептику до 6 месяцев в обычном холодильнике при температуре от 0°C до +6°C.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>После вскрытия храните в пергаменте или бумажном пакете в холодильнике</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Не рекомендуется хранить вскрытую рыбу в полиэтилене без доступа воздуха</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Highlights Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl border border-[#e8decb] bg-[#faf7f2]">
            <span className="font-brand-serif text-xl font-bold text-[#08172c] block">Астрахань</span>
            <span className="text-[11px] text-slate-500">Прямой вылов и сушка</span>
          </div>
          <div className="p-4 rounded-2xl border border-[#e8decb] bg-[#faf7f2]">
            <span className="font-brand-serif text-xl font-bold text-[#08172c] block">4–6% соли</span>
            <span className="text-[11px] text-slate-500">Правильный малосол</span>
          </div>
          <div className="p-4 rounded-2xl border border-[#e8decb] bg-[#faf7f2]">
            <span className="font-brand-serif text-xl font-bold text-[#08172c] block">Барьерный вакуум</span>
            <span className="text-[11px] text-slate-500">До 6 мес. хранения</span>
          </div>
          <div className="p-4 rounded-2xl border border-[#e8decb] bg-[#faf7f2]">
            <span className="font-brand-serif text-xl font-bold text-[#08172c] block">2–4 дня</span>
            <span className="text-[11px] text-slate-500">Доставка СДЭК по РФ</span>
          </div>
        </div>

      </div>
    </section>
  );
}
