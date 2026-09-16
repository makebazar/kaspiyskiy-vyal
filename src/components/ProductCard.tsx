'use client';

import React, { useState } from 'react';
import { Product, SiteSettings, CartItem } from '../types/product';
import { CheckCircle2, AlertCircle, Clock, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  settings: SiteSettings;
  onQuickOrder?: (product: Product, selectedWeightLabel?: string, customPrice?: number) => void;
  onAddToCart?: (item: CartItem) => void;
}

export default function ProductCard({
  product,
  settings,
  onQuickOrder,
  onAddToCart,
}: ProductCardProps) {
  const defaultOption = product.weightOptions && product.weightOptions.length > 0
    ? (product.weightOptions.find((o) => o.multiplier === 1) || product.weightOptions[0])
    : { label: `1 ${product.unit}`, multiplier: 1, weightText: `1 ${product.unit}` };

  const [selectedWeight, setSelectedWeight] = useState(defaultOption);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentPrice = Math.round(product.price * selectedWeight.multiplier);
  const currentOldPrice = product.oldPrice ? Math.round(product.oldPrice * selectedWeight.multiplier) : undefined;

  const isAvailable = product.status === 'in_stock';
  const isPreorder = product.status === 'preorder';

  const initialImage = product.images && product.images.length > 0 && product.images[0] && !product.images[0].includes('/images/products/')
    ? product.images[0]
    : '/images/placeholder-logo.svg';

  const [cardImg, setCardImg] = useState(initialImage);

  const handleAddToCart = () => {
    if (!onAddToCart) return;
    const cartItem: CartItem = {
      id: `${product.id}-${selectedWeight.label}`,
      productId: product.id,
      name: product.name,
      pricePerUnit: product.price,
      unit: product.unit,
      weightLabel: selectedWeight.label,
      weightMultiplier: selectedWeight.multiplier,
      quantity: 1,
      totalPrice: currentPrice,
      image: cardImg,
    };
    onAddToCart(cartItem);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  return (
    <div className="brand-card rounded-2xl overflow-hidden flex flex-col bg-white border border-[#e8decb] hover:border-[#dfcbb2] transition-all duration-300">
      {/* Product Visual Box */}
      <div className="relative h-52 sm:h-56 w-full bg-[#08172c] flex items-center justify-center overflow-hidden group">
        <img
          src={cardImg}
          alt={product.name}
          title={`Купить ${product.name} — вяленая рыба из Астрахани`}
          width={400}
          height={240}
          onError={() => setCardImg('/images/placeholder-logo.svg')}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs ${
              product.badge === '100% с икрой' 
                ? 'bg-[#eedfc8] text-[#08172c]' 
                : product.badge === 'Хит продаж'
                ? 'bg-[#dfa143] text-[#08172c]'
                : 'bg-white text-[#08172c]'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Status Indicator */}
        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#08172c]/85 text-[#eedfc8] text-[10px] font-bold backdrop-blur-xs border border-[#eedfc8]/30">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" aria-hidden="true" />
              В наличии
            </span>
          ) : isPreorder ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#08172c]/85 text-[#eedfc8] text-[10px] font-bold backdrop-blur-xs border border-[#eedfc8]/30">
              <Clock className="w-3 h-3 text-[#eedfc8]" aria-hidden="true" />
              Под заказ
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#08172c]/85 text-slate-400 text-[10px] font-bold backdrop-blur-xs border border-slate-700">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />
              Нет в наличии
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-base font-bold text-[#08172c] leading-snug mb-1 text-balance">
            {product.name}
          </h3>

          {/* Weight / Caliber Info */}
          {product.weightInfo && (
            <p className="text-xs text-[#9c7847] font-semibold mb-2">
              Калибр: {product.weightInfo}
            </p>
          )}

          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Taste profile note */}
          {product.tasteProfile && (
            <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e8decb] text-[11px] text-slate-700 mb-3">
              <span className="font-bold text-[#08172c]">Вкус:</span> {product.tasteProfile}
            </div>
          )}

          {/* Feature Tags */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#f5ebd9]/70 text-[#08172c] text-[10px] font-medium border border-[#e8decb]/60"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          )}

          {/* Weight selector */}
          {product.weightOptions && product.weightOptions.length > 1 && (
            <div className="mb-4">
              <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                Выберите фасовку:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5" role="group" aria-label={`Выбор фасовки для ${product.name}`}>
                {product.weightOptions.map((opt) => {
                  const isSelected = selectedWeight.label === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedWeight(opt)}
                      aria-pressed={isSelected}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
                        isSelected
                          ? 'bg-[#08172c] text-[#eedfc8] border-[#08172c] shadow-xs'
                          : 'bg-[#faf7f2] text-[#08172c] border-[#e8decb] hover:bg-[#f5ebd9]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3 border-t border-[#e8decb] mt-2">
          {/* Price */}
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-brand-serif font-black text-[#08172c] tracking-tight tabular-nums">
                {currentPrice.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-xs font-semibold text-slate-500">
                за {selectedWeight.label}
              </span>
              {currentOldPrice && (
                <span className="text-xs line-through text-slate-400 font-medium ml-1 tabular-nums">
                  {currentOldPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
          </div>

          {/* Action Button: Add to Cart */}
          <div>
            <button
              onClick={handleAddToCart}
              aria-label={`Добавить ${product.name} (${selectedWeight.label}) в корзину`}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08172c] ${
                addedAnimation
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#08172c] hover:bg-[#0f2647] text-[#eedfc8]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Добавлено в корзину!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#eedfc8]" aria-hidden="true" />
                  <span>В корзину</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

