import React from 'react';
import { Star, CheckCircle, ThumbsUp, ShieldCheck } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      name: 'Михаил Ковалев',
      city: 'Москва',
      fish: 'Вобла с икрой (2 кг) + Судак книжкой (1 кг)',
      rating: 5,
      date: '3 дня назад',
      text: 'Вобла просто восторг! Из 12 штук абсолютно все оказались с тугой, крупной зрелой икрой от головы до хвоста. Жирок течет по пальцам, но соли ровно в меру: настоящий астраханский малосол. До пункта СДЭКа в Москве доехало за 2 дня в идеальном плотном вакууме.',
    },
    {
      name: 'Сергей и Елена',
      city: 'Санкт-Петербург',
      fish: 'Подарочный набор «Каспийский улов» (3 кг)',
      rating: 5,
      date: 'Неделю назад',
      text: 'Брали набор в подарок отцу на юбилей. Коробка солидная из плотного крафта, упаковка герметичная, ни капли запаха при распаковке. Отец в восторге от жирной чехони и ястычной икры. Очень приятно, что вес точный до грамма. Будем заказывать еще к праздникам!',
    },
    {
      name: 'Дмитрий В.',
      city: 'Екатеринбург',
      fish: 'Лещ Цимлянский жирный (2 кг) + Вобла с икрой (1 кг)',
      rating: 5,
      date: '2 недели назад',
      text: 'В наших краях такую рыбу днем с огнем не сыщешь. Лещ мясистый, спинка янтарная на просвет, брюшко тает во рту. Отдельное спасибо за быструю связь в Telegram и фотоотчет перед отправкой посылки.',
    },
    {
      name: 'Алексей Морозов',
      city: 'Казань',
      fish: 'Судак пластованный (1 кг) + Чехонь сабельная (1 кг)',
      rating: 5,
      date: 'В прошлом месяце',
      text: 'Судак книжкой идеален: чистится одним движением, мясо белое и сочное. Чехонь жирненькая, спинка на просвет чистая. Вакуумная упаковка действительно на высоте: открыл через две недели в холодильнике, как будто только с вялки сняли.',
    },
    {
      name: 'Игорь Васильев',
      city: 'Новосибирск',
      fish: 'Вобла с икрой (3 кг) + Икра воблы в ястыках (500 г)',
      rating: 5,
      date: 'В прошлом месяце',
      text: 'До Сибири СДЭКом долетело за 4 дня. Вакуум плотный, все целое. Икра воблы в ястыках — это просто шедевр, нарезали тонкими янтарными чипсами к дружеским посиделкам. Рекомендую однозначно.',
    },
    {
      name: 'Владимир Павлов',
      city: 'Краснодар',
      fish: 'Судак книжка (1 кг) + Щука вяленая (1 кг)',
      rating: 5,
      date: '2 недели назад',
      text: 'Очень порадовало, что рыба не пересолена и не деревянная. Щука плотная, волокна чистые, судак сочный. Удобно, что можно сразу в Telegram согласовать любой вес и состав.',
    },
  ];

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#faf7f2] border-b border-[#e8decb] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#bda78d] uppercase block mb-1">
              Честные отзывы покупателей
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-brand-serif font-bold text-[#08172c] tracking-tight text-balance">
              Отзывы ценителей нашей рыбы
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Реальные впечатления покупателей после получения посылок и дегустации
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-[#e8decb] shadow-xs self-start sm:self-auto">
            <div className="flex text-[#dfa143]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#dfa143]" aria-hidden="true" />
              ))}
            </div>
            <span className="text-xs font-black text-[#08172c] tabular-nums">4.98 из 5.0</span>
            <span className="text-[11px] text-slate-500 tabular-nums">(более 850 заказов по РФ)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#e8decb] shadow-2xs hover:border-[#dfcbb2] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#08172c]">{rev.name}</h4>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle className="w-3 h-3" aria-hidden="true" /> Проверен
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.city} · {rev.date}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex text-[#dfa143]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#dfa143]" aria-hidden="true" />
                    ))}
                  </div>
                </div>

                {/* Ordered fish tag */}
                <div className="inline-block px-2.5 py-1 rounded-md bg-[#f5ebd9] text-[#08172c] text-[11px] font-semibold mb-3 border border-[#e8decb]">
                  Заказ: {rev.fish}
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  «{rev.text}»
                </p>
              </div>

              {/* Bottom tag */}
              <div className="mt-4 pt-3 border-t border-[#e8decb]/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <ThumbsUp className="w-3 h-3 text-[#08172c]" aria-hidden="true" /> Рекомендует
                </span>
                <span className="text-[#bda78d] font-serif font-bold text-xs">Каспийский вял</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

