import type { Metadata, Viewport } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-playfair',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vyalka.ru';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Астраханская вяленая рыба с икрой | Каспийский вял — Купить',
  description:
    'Настоящая астраханская вяленая вобла со 100% гарантией икры, судак книжкой, жирный лещ и чехонь прямо из дельты Волги. Натуральный малосол (4–6%), вакуумная упаковка без усушки. Доставка СДЭК за 2–4 дня!',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'астраханская вобла',
    'купить воблу с икрой',
    'вяленая рыба с доставкой',
    'астраханская рыба купить',
    'вяленый судак книжка',
    'вяленый лещ жирный',
    'чехонь сабельная вяленая',
    'икра воблы вяленая в ястыках',
    'каспийский вял',
    'рыба в вакууме СДЭК',
    'астраханский малосол',
    'рыбные деликатесы Астрахань',
  ],
  authors: [{ name: 'Каспийский вял' }],
  creator: 'Каспийский вял',
  publisher: 'Каспийский вял',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Каспийский вял — Астраханская вобла со 100% икрой и вяленая рыба',
    description:
      'Отборная вобла с икрой, судак книжкой, жирный лещ и чехонь в плотном вакууме прямо из дельты Волги с доставкой по всей РФ.',
    url: siteUrl,
    siteName: 'Каспийский вял',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Каспийский вял — Астраханская вяленая рыба и икра',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Каспийский вял: Настоящая астраханская вяленая рыба',
    description: 'Вобла со 100% икрой, судак, чехонь, лещ в вакууме с доставкой СДЭК по всей РФ.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export const viewport: Viewport = {
  themeColor: '#0b192c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`scroll-smooth ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        <a
          href="#catalog"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#08172c] focus:text-[#eedfc8] focus:rounded-xl focus:font-bold focus:shadow-xl focus:ring-2 focus:ring-[#eedfc8]"
        >
          Перейти к каталогу рыбы
        </a>
        {children}
      </body>
    </html>
  );
}

