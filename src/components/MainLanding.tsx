'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Product, SiteSettings, CartItem, Review } from '../types/product';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Catalog from './Catalog';
import DeliverySection from './DeliverySection';
import ReviewsSection from './ReviewsSection';
import SeoStorySection from './SeoStorySection';
import FaqSection from './FaqSection';
import Footer from './Footer';

const QuickOrderModal = dynamic(() => import('./QuickOrderModal'), { ssr: false });
const CartDrawer = dynamic(() => import('./CartDrawer'), { ssr: false });

interface MainLandingProps {
  initialProducts: Product[];
  settings: SiteSettings;
  initialReviews?: Review[];
}

const CART_STORAGE_KEY = 'kaspiy_vyal_cart_v1';

export default function MainLanding({ initialProducts, settings, initialReviews }: MainLandingProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [selectedWeightLabelForOrder, setSelectedWeightLabelForOrder] = useState<string | undefined>(undefined);
  const [customPriceForOrder, setCustomPriceForOrder] = useState<number | undefined>(undefined);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Load initial cart from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart changes
  const updateCartState = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddToCart = (item: CartItem) => {
    const existingIndex = cartItems.findIndex((i) => i.id === item.id);
    if (existingIndex >= 0) {
      const newItems = [...cartItems];
      newItems[existingIndex].quantity += item.quantity;
      newItems[existingIndex].totalPrice = newItems[existingIndex].pricePerUnit * newItems[existingIndex].weightMultiplier * newItems[existingIndex].quantity;
      updateCartState(newItems);
    } else {
      updateCartState([...cartItems, item]);
    }
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    const newItems = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: newQty,
          totalPrice: Math.round(item.pricePerUnit * item.weightMultiplier * newQty),
        };
      }
      return item;
    });
    updateCartState(newItems);
  };

  const handleRemoveItem = (id: string) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    updateCartState(newItems);
  };

  const handleClearCart = () => {
    updateCartState([]);
  };

  const handleQuickOrder = (
    product: Product,
    selectedWeightLabel?: string,
    customPrice?: number
  ) => {
    setSelectedProductForOrder(product);
    setSelectedWeightLabelForOrder(selectedWeightLabel);
    setCustomPriceForOrder(customPrice);
    setIsOrderModalOpen(true);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-slate-900 selection:bg-[#eedfc8] selection:text-[#08172c]">
      {/* Sticky Header */}
      <Header
        settings={settings}
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero settings={settings} featuredProduct={initialProducts[0]} />
        <Features />
        <Catalog
          initialProducts={initialProducts}
          settings={settings}
          onQuickOrder={handleQuickOrder}
          onAddToCart={handleAddToCart}
        />
        <DeliverySection settings={settings} />
        <ReviewsSection reviews={initialReviews} />
        <SeoStorySection />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer settings={settings} />

      {/* Full Multi-Product Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        settings={settings}
      />

      {/* Quick 1-Click Order Modal */}
      <QuickOrderModal
        product={selectedProductForOrder}
        selectedWeightLabel={selectedWeightLabelForOrder}
        customPrice={customPriceForOrder}
        settings={settings}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}

