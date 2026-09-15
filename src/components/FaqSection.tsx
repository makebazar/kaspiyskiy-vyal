'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-[#e8decb] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#bda78d] uppercase block mb-1">
            Полезная информация
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-brand-serif font-bold text-[#08172c] tracking-tight text-balance">
            Часто задаваемые вопросы
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Все о доставке, хранении, степени просола и гарантии свежести
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const answerId = `faq-answer-${idx}`;
            const questionId = `faq-question-${idx}`;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#e8decb] bg-white overflow-hidden transition-all shadow-2xs hover:border-[#dfcbb2]"
              >
                <button
                  id={questionId}
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-[#08172c] text-sm sm:text-base hover:text-[#0f2647] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c]"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#bda78d] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#08172c]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#e8decb]/60 pt-3 bg-[#faf7f2]"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

