import { useEffect, useState } from 'react';
import {
  DEFAULT_PRODUCTS,
  DEFAULT_SITE_IMAGES,
  Product,
  SiteImages,
  getOrders,
  getProducts,
  getSiteImages,
  saveProducts,
  saveSiteImages,
  type Order,
} from '@/lib/adminData';

export function useAdminStore() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [siteImages, setSiteImages] = useState<SiteImages>(DEFAULT_SITE_IMAGES);

  const reload = () => {
    setProducts(getProducts());
    setOrders(getOrders());
    setSiteImages(getSiteImages());
  };

  useEffect(() => {
    reload();
    const onStorage = () => reload();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const updateProducts = (next: Product[]) => {
    setProducts(next);
    saveProducts(next);
  };

  const updateSiteImages = (next: SiteImages) => {
    setSiteImages(next);
    saveSiteImages(next);
  };

  return { products, orders, siteImages, setProducts: updateProducts, setSiteImages: updateSiteImages, reload };
}
