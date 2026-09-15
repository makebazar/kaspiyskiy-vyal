export type ProductCategory = 
  | 'vobla' 
  | 'sudak' 
  | 'leshch' 
  | 'chekhon' 
  | 'shchuka' 
  | 'ikra' 
  | 'sets'
  | 'all';

export type ProductBadge = 'Хит продаж' | 'С икрой' | '100% с икрой' | 'Крупная' | 'Крупный' | 'Новинка' | 'Премиум' | 'Малосол' | 'Деликатес' | '';

export type StockStatus = 'in_stock' | 'preorder' | 'out_of_stock';

export type PriceUnit = 'кг' | 'шт' | 'набор' | '100 г';

export interface WeightOption {
  label: string;
  multiplier: number;
  weightText: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  oldPrice?: number;
  unit: PriceUnit;
  weightInfo?: string; // e.g. "от 200 до 350 г / шт"
  weightOptions?: WeightOption[];
  status: StockStatus;
  badge?: ProductBadge;
  description: string;
  tasteProfile?: string; // e.g. "Малосольная, умеренно жирная, чистый янтарный срез"
  images: string[];
  features?: string[]; // e.g. ["Астраханский вылов", "Вакуумная упаковка"]
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  pricePerUnit: number;
  unit: PriceUnit;
  weightLabel: string;
  weightMultiplier: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  phone: string;
  phoneDisplay: string;
  telegramUsername: string; // e.g. "kaspiy_vyal" (without @) or direct url
  telegramBotOrChannelUrl: string;
  vkGroupUrl: string; // e.g. "https://vk.com/kaspiy_vyal"
  vkChatUrl: string; // e.g. "https://vk.me/kaspiy_vyal"
  maxChatUrl?: string; // e.g. "https://max.ru/kaspiy_vyal"
  workHours: string;
  deliveryNotice: string;
  adminPin: string; // default "7788"
  // Hero Showcase Card settings (Управление карточкой на первом экране)
  heroBadge?: string; // "АСТРАХАНЬ • 100% С ИКРОЙ"
  heroTitle?: string; // "Вобла астраханская отборная со 100% икрой"
  heroPriceText?: string; // "от 1 550 ₽ / кг"
  heroSalting?: string; // "Малосол (4–6% соли)"
  heroDrying?: string; // "Традиционное на каспийском ветру"
  heroShelfLife?: string; // "До 6 месяцев в вакууме"
  heroImage?: string; // Ссылка на фото или загрузка
  // Company & Requisites
  companyName?: string; // "Индивидуальный предприниматель Дубоносова Светлана Валерьевна"
  companyShortName?: string; // "ИП Дубоносова Светлана Валерьевна"
  inn?: string; // "301807106238"
  ogrnip?: string; // "326300000031571"
  okpo?: string; // "2053386078"
  okato?: string; // "12401383000"
  oktmo?: string; // "12701000001"
  bankName?: string; // "АО «ТБанк»"
  bik?: string; // "044525974"
  rs?: string; // "40802810400009795362"
  ks?: string; // "30101810145250000974"
  bankInn?: string; // "7710140679"
  bankKpp?: string; // "771301001"
  address?: string; // "414000, Астраханская область, г. Астрахань, р-н Трусовский"
  contactPerson?: string; // "Лыков Павел Сергеевич"
  email?: string; // "xtemple321@yandex.ru"
}

export interface QuickOrderRequest {
  productId?: string;
  productName?: string;
  quantity?: number;
  customerName?: string;
  customerPhone?: string;
  messengerPreference?: 'telegram' | 'vk' | 'max';
  comment?: string;
  items?: CartItem[];
  totalAmount?: number;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  fish: string;
  rating: number;
  date: string;
  text: string;
  verified?: boolean;
}


