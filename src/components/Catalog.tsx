'use client';

import React, { useState, useMemo } from 'react';
import { Product, SiteSettings, ProductCategory, CartItem } from '../types/product';
import ProductCard from './ProductCard';
import { Search, Filter, Check, Layers } from 'lucide-react';

interface CatalogProps {
  initialProducts: Product[];
  settings: SiteSettings;
  onQuickOrder: (product: Product, selectedWeightLabel?: string, customPrice?: number) => void;
  onAddToCart?: (item: CartItem) => void;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'Весь ассортимент' },
  { id: 'vobla', label: 'Вобла' },
  { id: 'sudak', label: 'Судак' },
  { id: 'leshch', label: 'Лещ' },
  { id: 'chekhon', label: 'Чехонь' },
  { id: 'shchuka', label: 'Щука' },
  { id: 'ikra', label: 'Икра воблы' },
  { id: 'sets', label: 'Подарочные наборы' },
];

export default function Catalog({
  initialProducts,
  settings,
  onQuickOrder,
  onAddToCart,
}: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyWithRoe, setOnlyWithRoe] = useState(false);
  const [onlyHits, setOnlyHits] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCat = p.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      if (onlyInStock && p.status !== 'in_stock') {
        return false;
      }

      if (onlyWithRoe && p.badge !== '100% с икрой' && p.badge !== 'С икрой' && !p.name.toLowerCase().includes('икр')) {
        return false;
      }

      if (onlyHits && p.badge !== 'Хит продаж') {
        return false;
      }

      return true;
    });
  }, [initialProducts, selectedCategory, searchQuery, onlyInStock, onlyWithRoe, onlyHits]);

  return (
    <section id="catalog" className="py-16 md:py-24 bg-[#faf7f2] border-b border-[#e8decb] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#735634] uppercase block mb-1">
              Натуральный посол без химии
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-brand-serif font-bold text-[#08172c] tracking-tight text-balance">
              Каталог отборной астраханской рыбы
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Выберите рыбу и нужную фасовку для заказа в корзину или оформите в 1 клик
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по рыбе (напр. судак)…"
              aria-label="Поиск по каталогу рыбы"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8decb] bg-white text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] focus-visible:border-[#08172c] transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="relative mb-5">
          {/* Fade hint — shows more tabs exist to the right */}
          <div className="absolute right-0 top-0 bottom-3 w-10 bg-gradient-to-l from-[#faf7f2] to-transparent pointer-events-none z-10 lg:hidden" aria-hidden="true" />
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none" role="tablist" aria-label="Категории рыбы">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? initialProducts.length 
                : initialProducts.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
                    isActive
                      ? 'bg-[#08172c] text-[#eedfc8] shadow-sm'
                      : 'bg-white text-[#08172c] hover:bg-[#f5ebd9] border border-[#e8decb]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${isActive ? 'bg-[#0c1f38] text-[#eedfc8]' : 'bg-[#faf7f2] text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0 sm:flex-wrap mb-8 text-xs font-semibold">
          <span className="text-slate-600 flex items-center gap-1 mr-0.5 shrink-0">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" /> Фильтр:
          </span>

          <button
            onClick={() => setOnlyInStock(!onlyInStock)}
            aria-pressed={onlyInStock}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
              onlyInStock
                ? 'bg-[#08172c] border-[#08172c] text-[#eedfc8] font-bold'
                : 'bg-white border-[#e8decb] text-[#08172c] hover:border-[#dfcbb2]'
            }`}
          >
            {onlyInStock && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
            <span>Только в наличии</span>
          </button>

          <button
            onClick={() => setOnlyWithRoe(!onlyWithRoe)}
            aria-pressed={onlyWithRoe}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
              onlyWithRoe
                ? 'bg-[#08172c] border-[#08172c] text-[#eedfc8] font-bold'
                : 'bg-white border-[#e8decb] text-[#08172c] hover:border-[#dfcbb2]'
            }`}
          >
            {onlyWithRoe && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
            <span>Только с икрой</span>
          </button>

          <button
            onClick={() => setOnlyHits(!onlyHits)}
            aria-pressed={onlyHits}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
              onlyHits
                ? 'bg-[#08172c] border-[#08172c] text-[#eedfc8] font-bold'
                : 'bg-white border-[#e8decb] text-[#08172c] hover:border-[#dfcbb2]'
            }`}
          >
            {onlyHits && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
            <span>Хиты продаж</span>
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                settings={settings}
                onQuickOrder={onQuickOrder}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-14 bg-white rounded-3xl border border-[#e8decb] p-8 max-w-md mx-auto">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#08172c]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#08172c] mb-1">Ничего не найдено</h3>
            <p className="text-xs text-slate-500 mb-4">
              Попробуйте сбросить фильтры или изменить поисковый запрос
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyInStock(false);
                setOnlyWithRoe(false);
                setOnlyHits(false);
              }}
              className="px-4 py-2 rounded-xl bg-[#08172c] text-[#eedfc8] text-xs font-bold hover:bg-[#0f2647] transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

