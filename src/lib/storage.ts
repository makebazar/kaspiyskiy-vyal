import fs from 'fs';
import path from 'path';
import { Product, SiteSettings, Review } from '../types/product';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_REVIEWS } from '../data/initialData';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getProducts(): Product[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(PRODUCTS_FILE)) {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(INITIAL_PRODUCTS, null, 2), 'utf-8');
      return INITIAL_PRODUCTS;
    }
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving products:', error);
    return false;
  }
}

export function getSettings(): SiteSettings {
  try {
    ensureDataDir();
    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(INITIAL_SETTINGS, null, 2), 'utf-8');
      return INITIAL_SETTINGS;
    }
    const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return { ...INITIAL_SETTINGS, ...parsed };
  } catch (error) {
    console.error('Error reading settings:', error);
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: SiteSettings): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
}

export function getReviews(): Review[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(REVIEWS_FILE)) {
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(INITIAL_REVIEWS, null, 2), 'utf-8');
      return INITIAL_REVIEWS;
    }
    const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading reviews:', error);
    return INITIAL_REVIEWS;
  }
}

export function saveReviews(reviews: Review[]): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving reviews:', error);
    return false;
  }
}

