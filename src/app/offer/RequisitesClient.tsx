'use client';

import React, { useState } from 'react';
import { CreditCard, Phone, Mail, MapPin, Copy, Check, ShieldCheck, UserCheck } from 'lucide-react';
import { SiteSettings } from '@/types/product';

interface RequisitesClientProps {
  settings?: SiteSettings;
}

export default function RequisitesClient({ settings }: RequisitesClientProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const compName = settings?.companyName || 'Индивидуальный предприниматель Дубоносова Светлана Валерьевна';
  const compShort = settings?.companyShortName || 'ИП Дубоносова Светлана Валерьевна';
  const inn = settings?.inn || '301807106238';
  const ogrnip = settings?.ogrnip || '326300000031571';
  const okpo = settings?.okpo || '2053386078';
  const okato = settings?.okato || '12401383000';
  const oktmo = settings?.oktmo || '12701000001';
  const bankName = settings?.bankName || 'АО «ТБанк»';
  const bik = settings?.bik || '044525974';
  const rs = settings?.rs || '40802810400009795362';
  const ks = settings?.ks || '30101810145250000974';
  const bankInn = settings?.bankInn || '7710140679';
  const bankKpp = settings?.bankKpp || '771301001';
  const address = settings?.address || '414000, Астраханская область, г. Астрахань, р-н Трусовский';
  const contactPerson = settings?.contactPerson || 'Лыков Павел Сергеевич';
  const phone = settings?.phone || '+79152982505';
  const phoneDisplay = settings?.phoneDisplay || '+7 (915) 298-25-05';
  const email = settings?.email || 'xtemple321@yandex.ru';

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Grid of 3 Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: General Organization Info */}
        <div className="p-6 rounded-3xl bg-white border border-[#e8decb] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8decb]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#08172c]">
                Организация
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Полное наименование:</span>
                <p className="font-bold text-[#08172c] leading-snug">
                  {compName}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Сокращенно:</span>
                <p className="font-bold text-[#08172c]">{compShort}</p>
              </div>

              <div className="pt-1">
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">ИНН:</span>
                <div className="flex items-center justify-between font-mono text-[#08172c] font-bold bg-[#faf7f2] px-2.5 py-1.5 rounded-lg border border-[#e8decb]">
                  <span>{inn}</span>
                  <button
                    onClick={() => copyToClipboard(inn, 'inn')}
                    className="text-slate-400 hover:text-[#08172c]"
                    title="Скопировать ИНН"
                  >
                    {copiedKey === 'inn' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">ОГРНИП:</span>
                <div className="flex items-center justify-between font-mono text-[#08172c] font-bold bg-[#faf7f2] px-2.5 py-1.5 rounded-lg border border-[#e8decb]">
                  <span>{ogrnip}</span>
                  <button
                    onClick={() => copyToClipboard(ogrnip, 'ogrnip')}
                    className="text-slate-400 hover:text-[#08172c]"
                    title="Скопировать ОГРНИП"
                  >
                    {copiedKey === 'ogrnip' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Коды статистики:</span>
                <p className="text-[11px] text-slate-600 font-mono leading-relaxed">
                  ОКПО: {okpo}<br />
                  ОКАТО: {okato}<br />
                  ОКТМО: {oktmo}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e8decb] text-[11px] text-slate-500 flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#9c7847]" />
            <span>{address}</span>
          </div>
        </div>

        {/* Card 2: Banking Details */}
        <div className="p-6 rounded-3xl bg-white border border-[#e8decb] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8decb]">
              <CreditCard className="w-4 h-4 text-[#9c7847]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#08172c]">
                Банковские реквизиты
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Банк получателя:</span>
                <p className="font-bold text-[#08172c]">{bankName}</p>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">БИК банка:</span>
                <div className="flex items-center justify-between font-mono text-[#08172c] font-bold bg-[#faf7f2] px-2.5 py-1.5 rounded-lg border border-[#e8decb]">
                  <span>{bik}</span>
                  <button
                    onClick={() => copyToClipboard(bik, 'bik')}
                    className="text-slate-400 hover:text-[#08172c]"
                    title="Скопировать БИК"
                  >
                    {copiedKey === 'bik' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Расчетный счет:</span>
                <div className="flex items-center justify-between font-mono text-[#08172c] font-bold bg-[#faf7f2] px-2.5 py-1.5 rounded-lg border border-[#e8decb] text-[11px] break-all">
                  <span>{rs}</span>
                  <button
                    onClick={() => copyToClipboard(rs, 'rs')}
                    className="text-slate-400 hover:text-[#08172c] shrink-0 ml-1"
                    title="Скопировать счет"
                  >
                    {copiedKey === 'rs' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Корреспондентский счет:</span>
                <div className="flex items-center justify-between font-mono text-[#08172c] font-bold bg-[#faf7f2] px-2.5 py-1.5 rounded-lg border border-[#e8decb] text-[11px] break-all">
                  <span>{ks}</span>
                  <button
                    onClick={() => copyToClipboard(ks, 'ks')}
                    className="text-slate-400 hover:text-[#08172c] shrink-0 ml-1"
                    title="Скопировать корр. счет"
                  >
                    {copiedKey === 'ks' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">ИНН / КПП банка:</span>
                <p className="font-mono text-slate-600 text-[11px]">{bankInn} / {bankKpp}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Contacts & Responsible Person */}
        <div className="p-6 rounded-3xl bg-white border border-[#e8decb] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8decb]">
              <UserCheck className="w-4 h-4 text-[#08172c]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#08172c]">
                Контакты и обратная связь
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Ответственное контактное лицо:</span>
                <p className="font-bold text-[#08172c] text-sm">{contactPerson}</p>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Телефон для связи:</span>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 font-bold text-[#08172c] hover:text-[#9c7847] text-sm tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#9c7847]" />
                  <span>{phoneDisplay}</span>
                </a>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Электронная почта:</span>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 font-bold text-[#08172c] hover:text-[#9c7847] text-xs font-mono"
                >
                  <Mail className="w-4 h-4 text-[#9c7847]" />
                  <span>{email}</span>
                </a>
              </div>

              <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e8decb] text-[11px] text-slate-600 leading-snug">
                По вопросам сотрудничества, оптовых поставок и закрывающих бухгалтерских документов пишите на почту или звоните.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
