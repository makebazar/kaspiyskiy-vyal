'use client';

import React, { useState } from 'react';
import { Send, MessageCircle, Phone, X, MessageSquareText } from 'lucide-react';
import { SiteSettings } from '../types/product';

interface FloatingContactDockProps {
  settings: SiteSettings;
}

export default function FloatingContactDock({ settings }: FloatingContactDockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const tgUrl = settings.telegramBotOrChannelUrl || `https://t.me/${settings.telegramUsername}`;
  const vkUrl = settings.vkChatUrl || settings.vkGroupUrl;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="flex flex-col gap-2 items-end animate-modal">
          {/* Telegram */}
          <a
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Написать нам в Telegram"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Telegram</span>
            <Send className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          {/* VK */}
          <a
            href={vkUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Написать нам ВКонтакте"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>ВКонтакте</span>
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          {/* Phone */}
          <a
            href={`tel:${settings.phone}`}
            aria-label={`Позвонить по телефону ${settings.phoneDisplay}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#08172c] hover:bg-[#0c2242] text-[#eedfc8] font-bold text-xs shadow-md border border-[#eedfc8]/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8]"
          >
            <span className="tabular-nums">{settings.phoneDisplay}</span>
            <Phone className="w-3.5 h-3.5 text-[#eedfc8]" aria-hidden="true" />
          </a>
        </div>
      )}

      {/* Main Trigger */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-2xl bg-[#08172c] hover:bg-[#0c2242] text-[#eedfc8] border border-[#eedfc8]/30 shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eedfc8]"
        aria-label={isExpanded ? 'Закрыть контакты' : 'Связаться с нами'}
        aria-expanded={isExpanded}
      >
        {isExpanded ? <X className="w-5 h-5 text-[#eedfc8]" aria-hidden="true" /> : <MessageSquareText className="w-5 h-5 text-[#eedfc8]" aria-hidden="true" />}
      </button>

    </div>
  );
}

