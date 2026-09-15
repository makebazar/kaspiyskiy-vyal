'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Product, SiteSettings, ProductCategory, ProductBadge, StockStatus, PriceUnit, Review } from '../../types/product';
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Settings,
  Layers,
  Upload,
  Phone,
  Send,
  MessageCircle,
  ShieldCheck,
  LogOut,
  RefreshCw,
  Search,
  Copy,
  ExternalLink,
  Check,
  Sparkles,
  Building2,
  Globe,
  Sliders,
  Star,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'settings'>('products');

  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Search and Category filters for products tab
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Edit / Add Product Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [featuresText, setFeaturesText] = useState('');

  // Reviews State
  const [reviewSearchQuery, setReviewSearchQuery] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);

  // Check saved session PIN
  useEffect(() => {
    const savedPin = sessionStorage.getItem('admin_pin');
    if (savedPin) {
      verifyPin(savedPin);
    }
  }, []);

  const verifyPin = async (inputPin: string) => {
    setLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: inputPin }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPin(inputPin);
        sessionStorage.setItem('admin_pin', inputPin);
        setSettings(data.settings);
        fetchProducts();
        fetchReviews();
      } else {
        setLoginError('Неверный PIN-код доступа');
        sessionStorage.removeItem('admin_pin');
      }
    } catch (err) {
      setLoginError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_pin');
    setIsAuthenticated(false);
    setPin('');
  };

  // Open Product Modal for Add or Edit
  const openEditModal = (product?: Product) => {
    if (product) {
      setEditingProduct({ ...product });
      setFeaturesText(product.features ? product.features.join(', ') : '');
    } else {
      setEditingProduct({
        name: '',
        category: 'vobla',
        categoryName: 'Вобла',
        price: 1890,
        unit: 'кг',
        status: 'in_stock',
        badge: '100% с икрой',
        weightInfo: 'Размер 19-23 см (5-7 шт в 1 кг)',
        description: 'Отборная вяленая рыба традиционного астраханского посола.',
        tasteProfile: 'Мягкий малосол, янтарный жирок на срезе',
        images: ['/images/placeholder-logo.svg'],
        features: ['100% с икрой', 'Вакуумная упаковка', 'Честный вес'],
      });
      setFeaturesText('100% с икрой, Вакуумная упаковка, Честный вес');
    }
    setIsProductModalOpen(true);
  };

  // Duplicate / Clone Product
  const handleCloneProduct = async (product: Product) => {
    const cloned: Partial<Product> = {
      ...product,
      id: undefined,
      name: `${product.name} (Копия)`,
    };
    setEditingProduct(cloned);
    setFeaturesText(product.features ? product.features.join(', ') : '');
    setIsProductModalOpen(true);
  };

  // Product Save (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) return;

    setLoading(true);
    const action = editingProduct.id ? 'update' : 'create';

    const parsedFeatures = featuresText
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const productPayload = {
      ...editingProduct,
      features: parsedFeatures.length > 0 ? parsedFeatures : undefined,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          action,
          product: productPayload,
        }),
      });

      if (res.ok) {
        setStatusMessage({ text: 'Товар успешно сохранен в каталоге!', type: 'success' });
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        setStatusMessage({ text: 'Ошибка при сохранении товара', type: 'error' });
      }
    } catch (err) {
      setStatusMessage({ text: 'Ошибка соединения', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Product Delete
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Вы действительно хотите удалить этот товар из каталога?')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          action: 'delete',
          productId,
        }),
      });

      if (res.ok) {
        setStatusMessage({ text: 'Товар успешно удален', type: 'success' });
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Quick Stock Status Toggle in table
  const handleToggleStock = async (product: Product, newStatus: StockStatus) => {
    const updated = { ...product, status: newStatus };
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          action: 'update',
          product: updated,
        }),
      });
      setProducts(products.map((p) => (p.id === product.id ? updated : p)));
    } catch (err) {
      console.error(err);
    }
  };

  // Quick Inline Price Edit
  const handleQuickPriceChange = async (product: Product, newPrice: number) => {
    if (!newPrice || isNaN(newPrice) || newPrice <= 0) return;
    const updated = { ...product, price: newPrice };
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          action: 'update',
          product: updated,
        }),
      });
      setProducts(products.map((p) => (p.id === product.id ? updated : p)));
      setStatusMessage({ text: `Цена для «${product.name}» обновлена (${newPrice} ₽)`, type: 'success' });
    } catch (err) {
      console.error(err);
    }
  };

  // Image Upload from Device
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('pin', pin);
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setEditingProduct((prev) => ({
          ...prev,
          images: [data.url, ...(prev?.images?.filter((img) => img !== data.url) || [])],
        }));
        setStatusMessage({ text: 'Фото загружено и прикреплено!', type: 'success' });
      } else {
        alert('Ошибка при загрузке фото');
      }
    } catch (err) {
      alert('Ошибка соединения при загрузке');
    } finally {
      setUploadingImage(false);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          newSettings: settings,
        }),
      });

      if (res.ok) {
        setStatusMessage({
          text: 'Настройки, мессенджеры и реквизиты успешно сохранены! Все кнопки на сайте и страница оферты обновлены.',
          type: 'success',
        });
        if (settings.adminPin && settings.adminPin !== pin) {
          setPin(settings.adminPin);
          sessionStorage.setItem('admin_pin', settings.adminPin);
        }
      } else {
        setStatusMessage({ text: 'Ошибка при сохранении настроек', type: 'error' });
      }
    } catch (err) {
      setStatusMessage({ text: 'Ошибка соединения', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Open Review Modal
  const openReviewModal = (review?: Review) => {
    if (review) {
      setEditingReview({ ...review });
    } else {
      setEditingReview({
        name: '',
        city: 'Москва',
        fish: 'Вобла с икрой (2 кг)',
        rating: 5,
        date: 'Только что',
        text: '',
        verified: true,
      });
    }
    setIsReviewModalOpen(true);
  };

  // Save Review (Create or Update)
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview?.name || !editingReview?.text) return;

    setLoading(true);
    const action = editingReview.id ? 'update' : 'create';

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          action,
          review: editingReview,
        }),
      });

      if (res.ok) {
        setStatusMessage({ text: 'Отзыв успешно сохранен!', type: 'success' });
        setIsReviewModalOpen(false);
        setEditingReview(null);
        fetchReviews();
      } else {
        setStatusMessage({ text: 'Ошибка при сохранении отзыва', type: 'error' });
      }
    } catch (err) {
      setStatusMessage({ text: 'Ошибка соединения', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Delete Review
  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Вы действительно хотите удалить этот отзыв?')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          action: 'delete',
          reviewId,
        }),
      });

      if (res.ok) {
        setStatusMessage({ text: 'Отзыв удален', type: 'success' });
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Clone Review
  const handleCloneReview = (review: Review) => {
    setEditingReview({
      ...review,
      id: undefined,
      name: `${review.name} (Копия)`,
    });
    setIsReviewModalOpen(true);
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, categoryFilter]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const q = reviewSearchQuery.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.fish.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q)
      );
    });
  }, [reviews, reviewSearchQuery]);

  // Statistics summary
  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.status === 'in_stock').length;
    const preorder = products.filter((p) => p.status === 'preorder').length;
    const outOfStock = products.filter((p) => p.status === 'out_of_stock').length;
    return { total, inStock, preorder, outOfStock };
  }, [products]);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08172c] p-4 selection:bg-[#eedfc8] selection:text-[#08172c]">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#08172c] text-[#eedfc8] flex items-center justify-center mx-auto mb-4 shadow-lg border border-[#eedfc8]/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Панель управления</h1>
            <p className="text-xs text-slate-500 mt-1">«Каспийский вял» • Администрирование магазина</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyPin(pin);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Введите PIN-код администратора:
              </label>
              <input
                type="password"
                required
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-center text-xl font-bold tracking-widest focus:outline-none focus:border-[#08172c] focus:ring-2 focus:ring-[#08172c]/10"
              />
            </div>

            {loginError && (
              <p className="text-xs font-bold text-rose-500 text-center">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#08172c] hover:bg-[#0e2444] text-[#eedfc8] font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-60"
            >
              {loading ? 'Проверка...' : 'Войти в панель'}
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
                ← Вернуться на сайт
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-[#eedfc8] selection:text-[#08172c]">
      
      {/* Top Admin Navbar */}
      <header className="bg-[#08172c] text-white py-3.5 px-4 sm:px-8 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#eedfc8] transition-colors"
              title="Перейти на сайт"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-sm font-black tracking-tight text-white block">
                КАСПИЙСКИЙ <span className="text-[#eedfc8]">ВЯЛ</span>
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">Админ-панель</span>
            </div>
          </div>

          {/* Navigation Tabs (Products, Reviews, Settings) */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-[#eedfc8] text-[#08172c] shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Каталог рыбы ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-[#eedfc8] text-[#08172c] shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Отзывы ({reviews.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#eedfc8] text-[#08172c] shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Настройки & Контакты</span>
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 text-xs font-semibold transition-all border border-slate-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Flash Message */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center justify-between shadow-xs animate-in fade-in duration-200 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs font-bold underline opacity-70 hover:opacity-100 ml-4"
            >
              Закрыть
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Header & Stats Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Каталог вяленой рыбы и наборов</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Управляйте позициями, ценами, наличием и фотографиями (включая прямые ссылки из VK).
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => openEditModal()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#08172c] hover:bg-[#0e2444] text-[#eedfc8] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить рыбу</span>
                </button>

                <button
                  onClick={fetchProducts}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Обновить список"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-400 block">Всего позиций</span>
                <span className="text-xl font-black text-slate-900">{stats.total}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/30">
                <span className="text-[11px] font-semibold text-emerald-700 block">В наличии</span>
                <span className="text-xl font-black text-emerald-800">{stats.inStock}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-amber-100 bg-amber-50/30">
                <span className="text-[11px] font-semibold text-amber-700 block">Под заказ</span>
                <span className="text-xl font-black text-amber-800">{stats.preorder}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-rose-100 bg-rose-50/30">
                <span className="text-[11px] font-semibold text-rose-700 block">Нет в наличии</span>
                <span className="text-xl font-black text-rose-800">{stats.outOfStock}</span>
              </div>
            </div>

            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Поиск по названию или описанию рыбы..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#08172c] focus:ring-1 focus:ring-[#08172c]"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#08172c]"
              >
                <option value="all">Все категории</option>
                <option value="vobla">Вобла</option>
                <option value="sudak">Судак</option>
                <option value="leshch">Лещ</option>
                <option value="chekhon">Чехонь</option>
                <option value="shchuka">Щука</option>
                <option value="ikra">Икра воблы</option>
                <option value="sets">Наборы</option>
              </select>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4 w-16">Фото</th>
                      <th className="py-3.5 px-4 min-w-[200px]">Название и калибр</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Цена / Ед.</th>
                      <th className="py-3.5 px-4">Бейдж</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Наличие</th>
                      <th className="py-3.5 px-4 text-right min-w-[120px]">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => {
                      const primaryImg = p.images && p.images.length > 0 ? p.images[0] : null;

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Image */}
                          <td className="py-3 px-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                              {primaryImg ? (
                                <img
                                  src={primaryImg}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Fallback if image URL fails
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-slate-300" />
                              )}
                            </div>
                          </td>

                          {/* Title & Info */}
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block text-xs">{p.name}</span>
                            <span className="text-[10px] text-slate-400 block font-medium">
                              {p.categoryName} {p.weightInfo ? `• ${p.weightInfo}` : ''}
                            </span>
                          </td>

                          {/* Price Inline Edit */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                defaultValue={p.price}
                                onBlur={(e) => {
                                  const val = Number(e.target.value);
                                  if (val !== p.price) {
                                    handleQuickPriceChange(p, val);
                                  }
                                }}
                                className="w-20 px-2 py-1 rounded-lg border border-slate-200 font-extrabold text-slate-900 text-xs text-right focus:outline-none focus:border-[#08172c]"
                              />
                              <span className="text-[11px] font-bold text-slate-500">₽ / {p.unit}</span>
                            </div>
                            {p.oldPrice && (
                              <span className="text-[10px] text-slate-400 line-through block mt-0.5">
                                Старая: {p.oldPrice} ₽
                              </span>
                            )}
                          </td>

                          {/* Badge */}
                          <td className="py-3 px-4">
                            {p.badge ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200/60 inline-block">
                                {p.badge}
                              </span>
                            ) : (
                              <span className="text-slate-300 text-xs">-</span>
                            )}
                          </td>

                          {/* Stock Status Selector */}
                          <td className="py-3 px-4">
                            <select
                              value={p.status}
                              onChange={(e) => handleToggleStock(p, e.target.value as StockStatus)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                                p.status === 'in_stock'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : p.status === 'preorder'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-rose-50 text-rose-800 border-rose-200'
                              }`}
                            >
                              <option value="in_stock">В наличии</option>
                              <option value="preorder">Под заказ</option>
                              <option value="out_of_stock">Нет в наличии</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleCloneProduct(p)}
                                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                                title="Клонировать товар"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => openEditModal(p)}
                                className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                                title="Редактировать товар"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                                title="Удалить товар"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 px-4">
                  <p className="text-xs text-slate-500">Товары не найдены. Попробуйте изменить параметры поиска.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: REVIEWS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Отзывы покупателей</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Управляйте отзывами реальных клиентов, оценками, городами и статусом проверенного покупателя.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => openReviewModal()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#08172c] hover:bg-[#0e2444] text-[#eedfc8] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить отзыв</span>
                </button>

                <button
                  onClick={fetchReviews}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Обновить отзывы"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Review Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск по имени, городу, рыбе или тексту отзыва..."
                value={reviewSearchQuery}
                onChange={(e) => setReviewSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#08172c] focus:ring-1 focus:ring-[#08172c]"
              />
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
                >
                  <div>
                    {/* Top Row: Author & Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-sm">{r.name}</h3>
                          {r.verified && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Проверен</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {r.city} {r.fish ? `• Заказ: ${r.fish}` : ''}
                        </p>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 text-amber-400 bg-amber-50/60 px-2 py-1 rounded-lg shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < (r.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-xs text-slate-700 leading-relaxed mt-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                      «{r.text}»
                    </p>
                  </div>

                  {/* Footer Date & Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                    <span className="text-[10px]">{r.date || 'Недавно'}</span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCloneReview(r)}
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                        title="Клонировать отзыв"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => openReviewModal(r)}
                        className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                        title="Редактировать отзыв"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteReview(r.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Удалить отзыв"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="bg-white text-center py-12 px-4 rounded-3xl border border-slate-200">
                <p className="text-xs text-slate-500">Отзывы не найдены. Попробуйте изменить поисковый запрос или добавьте новый отзыв.</p>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SETTINGS, MESSENGERS & COMPANY REQUISITES */}
        {/* ======================================================== */}
        {activeTab === 'settings' && settings && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* Top Bar for Settings */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Настройки сайта, мессенджеров и реквизитов</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Изменяйте ссылки для заказа в корзине, телефон и юридические данные ИП Дубоносова С. В.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#08172c] hover:bg-[#0e2444] text-[#eedfc8] font-bold text-xs uppercase tracking-wider shadow-sm transition-all shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Сохранение...' : 'Сохранить все изменения'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* CARD 0: Hero Showcase Card Management */}
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Главный экран (Hero) — Карточка деликатеса</h2>
                      <p className="text-[11px] text-slate-400">Управляйте фото, ценой, бейджем и характеристиками карточки на первом экране сайта</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Left Column: Image & Preview */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-bold text-slate-800 text-xs">
                        📷 Фотография для карточки первого экрана:
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={settings.heroImage || ''}
                        onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                        placeholder="Вставьте ссылку на фото или оставьте пустым для лого-заглушки"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-[#08172c] text-xs"
                      />

                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5 text-sky-600" />
                        <span>{uploadingImage ? 'Загрузка...' : 'Загрузить файл'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setUploadingImage(true);
                            const formData = new FormData();
                            formData.append('file', file);
                            formData.append('pin', pin);
                            try {
                              const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
                              const data = await res.json();
                              if (res.ok && data.url) {
                                setSettings({ ...settings, heroImage: data.url });
                              }
                            } catch (err) {
                              console.error(err);
                            } finally {
                              setUploadingImage(false);
                            }
                          }}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Preview box */}
                    <div className="p-3 bg-[#08172c] rounded-2xl border border-slate-200 flex items-center gap-4">
                      <div className="w-24 h-20 rounded-xl bg-[#061324] border border-[#eedfc8]/20 overflow-hidden flex items-center justify-center shrink-0">
                        <img
                          src={settings.heroImage || '/images/placeholder-logo.svg'}
                          alt="Предпросмотр Hero"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder-logo.svg';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-[#eedfc8]">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#dfa143] block">
                          {settings.heroBadge || 'Астрахань · 100% с икрой'}
                        </span>
                        <p className="text-xs font-bold truncate mt-0.5">
                          {settings.heroTitle || 'Вобла астраханская отборная со 100% икрой'}
                        </p>
                        <span className="text-[11px] font-mono text-[#eedfc8]/80 font-bold block mt-1">
                          {settings.heroPriceText || 'от 1 550 ₽ / кг'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Texts & Specs */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Бейдж на фото:</label>
                        <input
                          type="text"
                          value={settings.heroBadge || ''}
                          onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                          placeholder="АСТРАХАНЬ • 100% С ИКРОЙ"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Текст цены в карточке:</label>
                        <input
                          type="text"
                          value={settings.heroPriceText || ''}
                          onChange={(e) => setSettings({ ...settings, heroPriceText: e.target.value })}
                          placeholder="от 1 550 ₽ / кг"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Название рыбы / товара:</label>
                      <input
                        type="text"
                        value={settings.heroTitle || ''}
                        onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                        placeholder="Вобла астраханская отборная со 100% икрой"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Степень просола:</label>
                        <input
                          type="text"
                          value={settings.heroSalting || ''}
                          onChange={(e) => setSettings({ ...settings, heroSalting: e.target.value })}
                          placeholder="Малосол (4–6% соли)"
                          className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#08172c]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Вяление:</label>
                        <input
                          type="text"
                          value={settings.heroDrying || ''}
                          onChange={(e) => setSettings({ ...settings, heroDrying: e.target.value })}
                          placeholder="Традиционное на каспийском ветру"
                          className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#08172c]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Срок хранения:</label>
                        <input
                          type="text"
                          value={settings.heroShelfLife || ''}
                          onChange={(e) => setSettings({ ...settings, heroShelfLife: e.target.value })}
                          placeholder="До 6 месяцев в вакууме"
                          className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#08172c]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 1: Messengers Checkout Links (Critical for Cart) */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Ссылки мессенджеров для оформления заказа</h2>
                    <p className="text-[11px] text-slate-400">Используются в корзине и кнопках быстрой связи</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Telegram (логин или ссылка):
                    </label>
                    <input
                      type="text"
                      value={settings.telegramUsername || ''}
                      onChange={(e) => setSettings({ ...settings, telegramUsername: e.target.value })}
                      placeholder="kaspiy_vyal или https://t.me/kaspiy_vyal"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      При заказе из корзины клиент перенаправляется в этот Telegram-диалог с готовым списком рыбы.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      ВКонтакте (ссылка на чат или сообщество):
                    </label>
                    <input
                      type="text"
                      value={settings.vkChatUrl || settings.vkGroupUrl || ''}
                      onChange={(e) => setSettings({ ...settings, vkChatUrl: e.target.value, vkGroupUrl: e.target.value })}
                      placeholder="https://vk.me/kaspiy_vyal или https://vk.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      MAX мессенджер (ссылка):
                    </label>
                    <input
                      type="text"
                      value={settings.maxChatUrl || ''}
                      onChange={(e) => setSettings({ ...settings, maxChatUrl: e.target.value })}
                      placeholder="https://max.ru/kaspiy_vyal"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: Phones & Working Hours */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Телефон и режим работы</h2>
                    <p className="text-[11px] text-slate-400">Отображаются в шапке, подвале и контактах</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Телефон для звонков (tel:):</label>
                      <input
                        type="text"
                        value={settings.phone || ''}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        placeholder="+79152982505"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Красивый формат номера:</label>
                      <input
                        type="text"
                        value={settings.phoneDisplay || ''}
                        onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                        placeholder="+7 (915) 298-25-05"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Режим работы:</label>
                    <input
                      type="text"
                      value={settings.workHours || ''}
                      onChange={(e) => setSettings({ ...settings, workHours: e.target.value })}
                      placeholder="Ежедневно с 09:00 до 21:00 (МСК)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email для связи:</label>
                    <input
                      type="email"
                      value={settings.email || ''}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      placeholder="xtemple321@yandex.ru"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 3: Company Requisites (IP Dubonosova) */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Юридические реквизиты предприятия (для страницы Оферты)</h2>
                    <p className="text-[11px] text-slate-400">
                      Все изменения здесь автоматически обновляют страницу{' '}
                      <Link href="/offer" target="_blank" className="text-sky-600 underline">
                        /offer
                      </Link>{' '}
                      и блок в подвале сайта.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Полное наименование организации / ИП:</label>
                    <input
                      type="text"
                      value={settings.companyName || ''}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      placeholder="Индивидуальный предприниматель Дубоносова Светлана Валерьевна"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Сокращенное наименование:</label>
                    <input
                      type="text"
                      value={settings.companyShortName || ''}
                      onChange={(e) => setSettings({ ...settings, companyShortName: e.target.value })}
                      placeholder="ИП Дубоносова Светлана Валерьевна"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ИНН:</label>
                    <input
                      type="text"
                      value={settings.inn || ''}
                      onChange={(e) => setSettings({ ...settings, inn: e.target.value })}
                      placeholder="301807106238"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ОГРНИП:</label>
                    <input
                      type="text"
                      value={settings.ogrnip || ''}
                      onChange={(e) => setSettings({ ...settings, ogrnip: e.target.value })}
                      placeholder="326300000031571"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Контактное лицо:</label>
                    <input
                      type="text"
                      value={settings.contactPerson || ''}
                      onChange={(e) => setSettings({ ...settings, contactPerson: e.target.value })}
                      placeholder="Лыков Павел Сергеевич"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Банк получателя:</label>
                    <input
                      type="text"
                      value={settings.bankName || ''}
                      onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                      placeholder="АО «ТБанк»"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">БИК банка:</label>
                    <input
                      type="text"
                      value={settings.bik || ''}
                      onChange={(e) => setSettings({ ...settings, bik: e.target.value })}
                      placeholder="044525974"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Расчетный счет:</label>
                    <input
                      type="text"
                      value={settings.rs || ''}
                      onChange={(e) => setSettings({ ...settings, rs: e.target.value })}
                      placeholder="40802810400009795362"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Корреспондентский счет:</label>
                    <input
                      type="text"
                      value={settings.ks || ''}
                      onChange={(e) => setSettings({ ...settings, ks: e.target.value })}
                      placeholder="30101810145250000974"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Юридический адрес:</label>
                    <input
                      type="text"
                      value={settings.address || ''}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      placeholder="414000, Астраханская область, г. Астрахань, р-н Трусовский"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 4: General Site Info & Promo */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Тексты и уведомления сайта</h2>
                    <p className="text-[11px] text-slate-400">Название, слоган и плашка доставки</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Название магазина:</label>
                    <input
                      type="text"
                      value={settings.siteName || ''}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      placeholder="Каспийский вял"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Слоган / Дескриптор:</label>
                    <input
                      type="text"
                      value={settings.siteTagline || ''}
                      onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
                      placeholder="Настоящая астраханская вяленая рыба с доставкой по всей России"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Плашка-уведомление о доставке:</label>
                    <input
                      type="text"
                      value={settings.deliveryNotice || ''}
                      onChange={(e) => setSettings({ ...settings, deliveryNotice: e.target.value })}
                      placeholder="Отправка СДЭК и Почтой России в день заказа в герметичном вакууме"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 5: Admin Access & Security */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Безопасность и пароль панели</h2>
                    <p className="text-[11px] text-slate-400">PIN-код для входа в панель администратора</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">PIN-код доступа:</label>
                    <input
                      type="text"
                      value={settings.adminPin || ''}
                      onChange={(e) => setSettings({ ...settings, adminPin: e.target.value })}
                      placeholder="Введите секретный PIN"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono font-bold tracking-wider focus:outline-none focus:border-[#08172c]"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Обязательно сохраните или запомните новый PIN-код после изменения.
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Save Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#08172c] hover:bg-[#0e2444] text-[#eedfc8] font-black text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Сохранение...' : 'Сохранить все настройки'}</span>
              </button>
            </div>

          </form>
        )}

      </main>

      {/* ======================================================== */}
      {/* PRODUCT ADD / EDIT MODAL (WITH DIRECT PHOTO URL + PREVIEW) */}
      {/* ======================================================== */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {editingProduct.id ? 'Редактировать позицию рыбы' : 'Добавить новую рыбу / набор'}
                </h3>
                <span className="text-[11px] text-slate-400">
                  Заполните данные и вставьте ссылку на фотографию
                </span>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5 text-xs flex-1">
              
              {/* Product Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Название товара: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="Вобла Астраханская отборная с икрой"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                />
              </div>

              {/* Category and Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Категория:</label>
                  <select
                    value={editingProduct.category || 'vobla'}
                    onChange={(e) => {
                      const cat = e.target.value as ProductCategory;
                      const catNames: Record<string, string> = {
                        vobla: 'Вобла',
                        sudak: 'Судак',
                        leshch: 'Лещ',
                        chekhon: 'Чехонь',
                        shchuka: 'Щука',
                        ikra: 'Икра воблы',
                        sets: 'Подарочные наборы',
                      };
                      setEditingProduct({
                        ...editingProduct,
                        category: cat,
                        categoryName: catNames[cat] || 'Рыба',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                  >
                    <option value="vobla">Вобла</option>
                    <option value="sudak">Судак</option>
                    <option value="leshch">Лещ</option>
                    <option value="chekhon">Чехонь</option>
                    <option value="shchuka">Щука</option>
                    <option value="ikra">Икра воблы</option>
                    <option value="sets">Подарочные наборы</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Бейдж / Метка:</label>
                  <select
                    value={editingProduct.badge || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, badge: e.target.value as ProductBadge })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                  >
                    <option value="">Без бейджа</option>
                    <option value="100% с икрой">100% с икрой</option>
                    <option value="Хит продаж">Хит продаж</option>
                    <option value="Премиум">Премиум</option>
                    <option value="Малосол">Малосол</option>
                    <option value="Крупная">Крупная</option>
                    <option value="Крупный">Крупный</option>
                    <option value="Новинка">Новинка</option>
                    <option value="Деликатес">Деликатес</option>
                  </select>
                </div>
              </div>

              {/* Price, Old Price, Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Цена (₽): <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                    }
                    placeholder="1890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold focus:outline-none focus:border-[#08172c]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Старая цена (₽, для скидки):</label>
                  <input
                    type="number"
                    value={editingProduct.oldPrice || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        oldPrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="2200"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ед. измерения:</label>
                  <select
                    value={editingProduct.unit || 'кг'}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, unit: e.target.value as PriceUnit })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                  >
                    <option value="кг">за 1 кг</option>
                    <option value="шт">за 1 шт</option>
                    <option value="набор">за набор</option>
                    <option value="100 г">за 100 г</option>
                  </select>
                </div>
              </div>

              {/* Weight info & caliber */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Калибр / размер рыбы и фасовка:
                </label>
                <input
                  type="text"
                  value={editingProduct.weightInfo || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, weightInfo: e.target.value })
                  }
                  placeholder="Размер 19-23 см (5-7 шт в 1 кг)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                />
              </div>

              {/* ======================================================== */}
              {/* PHOTO URL & LIVE PREVIEW SECTION */}
              {/* ======================================================== */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 text-xs">
                    📷 Ссылка на фотографию товара:
                  </label>
                  <span className="text-[10px] text-slate-500">
                    Поддерживаются ссылки из VK, любых сайтов или локальные пути
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={editingProduct.images?.[0] || ''}
                    onChange={(e) => {
                      const url = e.target.value;
                      setEditingProduct({
                        ...editingProduct,
                        images: url ? [url] : [],
                      });
                    }}
                    placeholder="Вставьте ссылку: https://sun9-*.userapi.com/... или /images/..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-[#08172c] text-xs"
                  />

                  {/* Device upload button fallback */}
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-sky-600" />
                    <span>{uploadingImage ? 'Загрузка...' : 'Загрузить файл'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Live Image Preview Card */}
                {editingProduct.images && editingProduct.images[0] && (
                  <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                      <img
                        src={editingProduct.images[0]}
                        alt="Предпросмотр"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder-logo.svg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Фото готово к отображению
                      </span>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">
                        {editingProduct.images[0]}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Будет показано в каталоге, карточке товара и корзине.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Описание:</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  placeholder="Эталонная астраханская вобла весеннего вылова: тугая янтарная спинка..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                />
              </div>

              {/* Taste Profile */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Вкусовой профиль / ноты:</label>
                <input
                  type="text"
                  value={editingProduct.tasteProfile || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, tasteProfile: e.target.value })
                  }
                  placeholder="Мягкий малосол (4-6%), сочный янтарный жирок и крупная зрелая икра"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                />
              </div>

              {/* Features Tags */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Преимущества / плашки (через запятую):
                </label>
                <input
                  type="text"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="100% с икрой, Весенний вылов, Вакуумная упаковка, Честный калибр"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                />
              </div>

              {/* Modal Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#08172c] hover:bg-[#0e2444] text-[#eedfc8] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  {loading ? 'Сохранение...' : 'Сохранить рыбу'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* REVIEW ADD / EDIT MODAL */}
      {/* ======================================================== */}
      {isReviewModalOpen && editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {editingReview.id ? 'Редактировать отзыв' : 'Добавить новый отзыв'}
                </h3>
                <span className="text-[11px] text-slate-400">
                  Заполните текст, имя автора, оценку и город
                </span>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveReview} className="p-6 space-y-4 text-xs flex-1">
              
              {/* Author Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Имя и фамилия покупателя: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingReview.name || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                  placeholder="Константин М., Алексей В."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                />
              </div>

              {/* City and Ordered Fish */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Город покупателя:</label>
                  <input
                    type="text"
                    value={editingReview.city || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, city: e.target.value })}
                    placeholder="Москва, Санкт-Петербург, Самара"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Заказанная рыба / набор:</label>
                  <input
                    type="text"
                    value={editingReview.fish || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, fish: e.target.value })}
                    placeholder="Вобла с икрой (2 кг), Набор «Каспий»"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                  />
                </div>
              </div>

              {/* Date and Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Дата отзыва:</label>
                  <input
                    type="text"
                    value={editingReview.date || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, date: e.target.value })}
                    placeholder="Вчера, 3 дня назад, 12 мая"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Оценка (звезды):</label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setEditingReview({ ...editingReview, rating: starVal })}
                        className="p-1 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            starVal <= (editingReview.rating || 5)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">
                      {editingReview.rating || 5} из 5
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Badge Checkbox */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2.5 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={editingReview.verified !== false}
                    onChange={(e) => setEditingReview({ ...editingReview, verified: e.target.checked })}
                    className="w-4 h-4 rounded text-[#08172c] focus:ring-0 cursor-pointer"
                  />
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Отметка «Проверенный покупатель» (зеленая плашка)</span>
                  </div>
                </label>
              </div>

              {/* Review Text */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Текст отзыва: <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingReview.text || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })}
                  placeholder="Заказывал воблу с икрой. Доставка СДЭКом в Москву за 2 дня. Рыба свежайшая, малосол идеальный, икра в каждой рыбке..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#08172c]"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#08172c] hover:bg-[#0e2444] text-[#eedfc8] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  {loading ? 'Сохранение...' : 'Сохранить отзыв'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
