import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, FileText, Phone, Mail, MapPin, Copy, ShieldCheck } from 'lucide-react';
import RequisitesClient from './RequisitesClient';
import { getSettings } from '../../lib/storage';

export const metadata: Metadata = {
  title: 'Публичная оферта и реквизиты ИП | Каспийский вял',
  description: 'Юридическая информация, реквизиты индивидуального предпринимателя и договор публичной оферты интернет-магазина вяленой рыбы «Каспийский вял».',
  alternates: {
    canonical: '/offer',
  },
  openGraph: {
    title: 'Публичная оферта и реквизиты ИП | Каспийский вял',
    description: 'Юридическая информация, реквизиты ИП и условия дистанционной продажи вяленой рыбы «Каспийский вял».',
  },
};

export default function OfferPage() {
  const settings = getSettings();
  const compName = settings.companyName || 'Индивидуальный предприниматель Дубоносова Светлана Валерьевна';
  const inn = settings.inn || '301807106238';
  const ogrnip = settings.ogrnip || '326300000031571';
  const address = settings.address || '414000, Астраханская область, г. Астрахань, р-н Трусовский';
  const bankName = settings.bankName || 'АО «ТБанк»';
  const bik = settings.bik || '044525974';
  const rs = settings.rs || '40802810400009795362';
  const ks = settings.ks || '30101810145250000974';
  const contactPerson = settings.contactPerson || 'Лыков Павел Сергеевич';
  const phone = settings.phone || '+79152982505';
  const phoneDisplay = settings.phoneDisplay || '+7 (915) 298-25-05';
  const email = settings.email || 'xtemple321@yandex.ru';

  return (
    <div className="min-h-screen bg-[#faf7f2] text-slate-900 flex flex-col justify-between selection:bg-[#eedfc8] selection:text-[#08172c]">
      {/* Top Header */}
      <header className="bg-[#08172c] text-[#eedfc8] py-4 border-b border-[#eedfc8]/15 sticky top-0 z-30 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#eedfc8] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>На главную</span>
          </Link>

          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-[11px] font-brand-serif font-bold tracking-[0.25em] text-[#eedfc8]/80 uppercase">
              Каспийский
            </span>
            <span className="text-lg font-brand-serif font-black tracking-[0.18em] text-[#eedfc8]">
              ВЯЛ
            </span>
          </Link>

          <Link
            href="/#catalog"
            className="px-3.5 py-1.5 rounded-xl bg-[#eedfc8] text-[#08172c] font-black text-xs uppercase tracking-wider hover:bg-[#f7f0e4] transition-colors"
          >
            В каталог
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 w-full">
        {/* Page Title */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#9c7847] uppercase block mb-1">
            Правовая информация
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-brand-serif font-bold text-[#08172c] tracking-tight text-balance">
            Публичная оферта и карточка предприятия
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl">
            Официальные реквизиты {compName} и условия дистанционной купли-продажи вяленой рыбы и рыбной продукции через интернет-магазин «{settings.siteName}».
          </p>
        </div>

        {/* Client Interactive Section (Copy Requisites + Tab Anchor) */}
        <RequisitesClient settings={settings} />

        {/* Public Offer Contract Text */}
        <article className="mt-12 bg-white rounded-3xl border border-[#e8decb] p-6 sm:p-10 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700">
          <div className="border-b border-[#e8decb] pb-4 mb-6">
            <h2 className="text-lg sm:text-xl font-brand-serif font-bold text-[#08172c] m-0">
              Договор публичной оферты о дистанционной продаже товаров
            </h2>
            <span className="text-[11px] text-slate-400 block mt-1">
              Редакция от 15 сентября 2026 г. • г. Астрахань
            </span>
          </div>

          <section className="space-y-6">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#08172c] mb-2">1. Общие положения</h3>
              <p>
                1.1. Настоящий документ является публичной офертой {compName} (ОГРНИП {ogrnip}, ИНН {inn}), именуемой в дальнейшем «Продавец», в соответствии со ст. 437 Гражданского кодекса Российской Федерации.
              </p>
              <p>
                1.2. Оформление Покупателем Заказа на сайте или через официальные каналы связи (Telegram, ВКонтакте, MAX) означает полное и безоговорочное принятие (акцепт) условий настоящего Договора (ст. 438 ГК РФ).
              </p>
              <p>
                1.3. К отношениям между Продавцом и Покупателем применяются положения ГК РФ о розничной купле-продаже, Закон РФ «О защите прав потребителей» № 2300-1 и Правила продажи товаров по договору розничной купли-продажи (Постановление Правительства РФ № 2463).
              </p>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#08172c] mb-2">2. Предмет договора</h3>
              <p>
                2.1. Продавец обязуется передать в собственность Покупателю, а Покупатель обязуется оплатить и принять вяленую рыбную продукцию, рыбные деликатесы и сопутствующие товары в вакуумной упаковке (далее — «Товар»), ассортимент, фасовка и стоимость которых согласованы Сторонами.
              </p>
              <p>
                2.2. Качество, безопасность и происхождение Товара соответствуют требованиям технических регламентов ЕАЭС и действующим санитарно-эпидемиологическим нормам РФ.
              </p>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#08172c] mb-2">3. Порядок оформления заказа и согласование веса</h3>
              <p>
                3.1. Покупатель выбирает Товар на сайте и формирует состав заказа.
              </p>
              <p>
                3.2. В связи с естественными природными особенностями штучно-весового товара (вяленая рыба) фактический вес собранной партии может иметь допустимое технологическое отклонение в пределах ±5–10% от расчетного номинала.
              </p>
              <p>
                3.3. Перед отправкой Продавец взвешивает партию, фиксирует точный вес, рассчитывает финальную сумму и предоставляет Покупателю фотоотчет партии в мессенджере.
              </p>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#08172c] mb-2">4. Цена товара и порядок оплаты</h3>
              <p>
                4.1. Цены на Товар указаны на Сайте в валюте РФ (рубли) за единицу измерения (килограмм, штука, набор).
              </p>
              <p>
                4.2. Оплата производится безналичным расчетом (банковской картой, по реквизитам счета или через Систему быстрых платежей / QR) после подтверждения точного веса партии и стоимости доставки.
              </p>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#08172c] mb-2">5. Доставка и передача товара</h3>
              <p>
                5.1. Доставка осуществляется по всей территории Российской Федерации посредством логистических служб: СДЭК (до пункта выдачи заказов или курьером) и Почта России (включая EMS).
              </p>
              <p>
                5.2. Товар упаковывается в плотный барьерный вакуумный пакет и транспортную упаковку, обеспечивающие сохранность органолептических свойств в пути.
              </p>
              <p>
                5.3. Сроки доставки зависят от региона получателя и регламентов выбранной транспортной компании. После передачи посылки в службу доставки Покупателю предоставляется трек-номер для отслеживания.
              </p>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#08172c] mb-2">6. Качество товара и условия возврата</h3>
              <p>
                6.1. В соответствии со ст. 25 Закона «О защите прав потребителей» и Перечнем непродовольственных товаров надлежащего качества, продовольственные товары надлежащего качества возврату и обмену не подлежат.
              </p>
              <p>
                6.2. В случае обнаружения производственного брака или повреждения вакуумной упаковки при транспортировке, Покупатель вправе направить претензию с приложением фото/видеоматериалов в течение 24 часов с момента получения заказа. Продавец осуществляет бесплатный повторный досыл или возврат денежных средств.
              </p>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#08172c] mb-2">7. Реквизиты и подпись Продавца</h3>
              <div className="bg-[#faf7f2] p-4 rounded-2xl border border-[#e8decb] text-xs font-mono leading-relaxed space-y-1">
                <p><strong>Индивидуальный предприниматель:</strong> {compName}</p>
                <p><strong>ОГРНИП:</strong> {ogrnip} | <strong>ИНН:</strong> {inn}</p>
                <p><strong>Адрес:</strong> {address}</p>
                <p><strong>Банк:</strong> {bankName}, БИК {bik}</p>
                <p><strong>Расчетный счет:</strong> {rs}</p>
                <p><strong>Корр. счет:</strong> {ks}</p>
                <p><strong>Контактное лицо:</strong> {contactPerson}</p>
                <p><strong>Телефон:</strong> {phoneDisplay} | <strong>Email:</strong> {email}</p>
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-[#08172c] text-[#eedfc8]/70 py-6 border-t border-[#eedfc8]/15 text-xs text-center">
        <div className="max-w-5xl mx-auto px-4">
          <p>© {new Date().getFullYear()} «{settings.siteName}». {compName}. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
