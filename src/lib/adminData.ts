export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
};

export type Order = {
  id: string;
  status?: 'pendente' | 'pago' | 'cancelado';
  paymentMethod?: 'infinitepay';
  checkoutUrl?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  items: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>;
  total: number;
  createdAt: string;
};

export type SiteImages = {
  heroBackground: string;
  profileImage: string;
  clinicImage: string;
};

export const DEFAULT_PRODUCTS: Product[] = [
  { id: '1', name: 'Fórmula Homeopática Calma Plus', price: 89.9, category: 'Homeopáticos', image: '', description: 'Composto homeopático para alívio da ansiedade e promoção do equilíbrio emocional.', stock: 12 },
  { id: '2', name: 'Complexo Vitamínico Neuro Balance', price: 129.9, category: 'Suplementos', image: '', description: 'Suplemento premium para suporte neurológico e equilíbrio hormonal.', stock: 9 },
  { id: '3', name: 'Tintura Floral Equilíbrio', price: 59.9, category: 'Florais', image: '', description: 'Fórmula floral para harmonização emocional e bem-estar diário.', stock: 20 },
  { id: '4', name: 'Óleo Essencial Terapêutico', price: 74.9, category: 'Aromaterapia', image: '', description: 'Blend exclusivo para relaxamento e equilíbrio energético.', stock: 7 },
  { id: '5', name: 'Cápsulas Magnésio Quântico', price: 98.9, category: 'Suplementos', image: '', description: 'Magnésio de alta absorção para relaxamento muscular e nervoso.', stock: 15 },
  { id: '6', name: 'Composto Fitoterápico Sono Reparador', price: 79.9, category: 'Fitoterápicos', image: '', description: 'Fórmula natural para qualidade do sono e recuperação noturna.', stock: 11 },
];

export const DEFAULT_SITE_IMAGES: SiteImages = {
  heroBackground: '',
  profileImage: '',
  clinicImage: '',
};

const KEYS = {
  products: 'nucleoquantic_products',
  orders: 'nucleoquantic_orders',
  siteImages: 'nucleoquantic_site_images',
};

const isBrowser = typeof window !== 'undefined';

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProducts() {
  return readJSON<Product[]>(KEYS.products, DEFAULT_PRODUCTS);
}

export function saveProducts(products: Product[]) {
  writeJSON(KEYS.products, products);
}

export function getOrders() {
  return readJSON<Order[]>(KEYS.orders, []);
}

export function saveOrders(orders: Order[]) {
  writeJSON(KEYS.orders, orders);
}

export function addOrder(order: Order) {
  const current = getOrders();
  saveOrders([order, ...current]);
}

export function getSiteImages() {
  return readJSON<SiteImages>(KEYS.siteImages, DEFAULT_SITE_IMAGES);
}

export function saveSiteImages(images: SiteImages) {
  writeJSON(KEYS.siteImages, images);
}
