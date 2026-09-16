import React from 'react';
import { getProducts, getSettings, getReviews } from '../lib/storage';
import MainLanding from '../components/MainLanding';
import { FAQ_ITEMS } from '../data/faqData';

export const revalidate = 60;

export default function HomePage() {
  const products = getProducts();
  const settings = getSettings();
  const reviews = getReviews();

  const jsonLdStore = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Каспийский вял',
    alternateName: 'Kaspiyskiy Vyal',
    description: settings.siteTagline || 'Производство и прямая доставка отборной астраханской вяленой рыбы и икры по всей России',
    url: 'https://vyalka.ru',
    logo: 'https://vyalka.ru/favicon.svg',
    image: 'https://vyalka.ru/images/og-image.png',
    telephone: settings.phone,
    priceRange: '₽₽',
    currenciesAccepted: 'RUB',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, SBP',
    areaServed: {
      '@type': 'Country',
      name: 'Россия',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Астрахань',
      addressRegion: 'Астраханская область',
      addressCountry: 'RU',
    },
    aggregateRating: reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2),
      reviewCount: String(reviews.length),
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'RU',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 14,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
    },
    sameAs: [
      settings.telegramBotOrChannelUrl || `https://t.me/${settings.telegramUsername}`,
      settings.vkGroupUrl,
    ].filter(Boolean),
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const jsonLdProducts = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: prod.name,
        description: prod.description,
        image: prod.images && prod.images.length > 0 ? prod.images[0] : undefined,
        sku: prod.id,
        brand: {
          '@type': 'Brand',
          name: 'Каспийский вял',
        },
        offers: {
          '@type': 'Offer',
          price: prod.price,
          priceCurrency: 'RUB',
          priceValidUntil: '2026-12-31',
          availability: prod.status === 'in_stock' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
          seller: {
            '@type': 'Organization',
            name: 'Каспийский вял',
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'RUB',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'RU',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'DAY',
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 2,
                maxValue: 5,
                unitCode: 'DAY',
              },
            },
          },
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStore) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProducts) }}
      />

      <MainLanding initialProducts={products} settings={settings} initialReviews={reviews} />
    </>
  );
}

