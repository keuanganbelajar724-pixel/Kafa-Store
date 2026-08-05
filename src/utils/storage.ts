import { LinkItem, StoreSettings, Testimonial, OrderLead, FreeWebTool } from '../types';
import { INITIAL_ITEMS, INITIAL_SETTINGS, INITIAL_TESTIMONIALS, INITIAL_FREE_TOOLS } from '../data/initialData';

const SETTINGS_KEY = 'sahabat_kafa_settings_v1';
const ITEMS_KEY = 'sahabat_kafa_items_v1';
const TESTIMONIALS_KEY = 'sahabat_kafa_testimonials_v1';
const ORDERS_KEY = 'sahabat_kafa_orders_v1';
const FREE_TOOLS_KEY = 'sahabat_kafa_free_tools_v1';

export function getStoredSettings(): StoreSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) {
      return { ...INITIAL_SETTINGS, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Error loading settings from localStorage', e);
  }
  return INITIAL_SETTINGS;
}

export function saveStoredSettings(settings: StoreSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings to localStorage', e);
  }
}

export function getStoredItems(): LinkItem[] {
  try {
    const data = localStorage.getItem(ITEMS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading items from localStorage', e);
  }
  return INITIAL_ITEMS;
}

export function saveStoredItems(items: LinkItem[]): void {
  try {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving items to localStorage', e);
  }
}

export function getStoredTestimonials(): Testimonial[] {
  try {
    const data = localStorage.getItem(TESTIMONIALS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading testimonials from localStorage', e);
  }
  return INITIAL_TESTIMONIALS;
}

export function saveStoredTestimonials(testimonials: Testimonial[]): void {
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
  } catch (e) {
    console.error('Error saving testimonials to localStorage', e);
  }
}

export function getStoredFreeTools(): FreeWebTool[] {
  try {
    const data = localStorage.getItem(FREE_TOOLS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading free tools from localStorage', e);
  }
  return INITIAL_FREE_TOOLS;
}

export function saveStoredFreeTools(tools: FreeWebTool[]): void {
  try {
    localStorage.setItem(FREE_TOOLS_KEY, JSON.stringify(tools));
  } catch (e) {
    console.error('Error saving free tools to localStorage', e);
  }
}

export function getStoredOrders(): OrderLead[] {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading orders from localStorage', e);
  }
  return [];
}

export function saveStoredOrders(orders: OrderLead[]): void {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage', e);
  }
}

export function addOrderLead(order: Omit<OrderLead, 'id' | 'createdAt'>): OrderLead {
  const newOrder: OrderLead = {
    ...order,
    id: `ord-${Date.now()}`,
    createdAt: new Date().toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };
  const currentOrders = getStoredOrders();
  const updated = [newOrder, ...currentOrders];
  saveStoredOrders(updated);
  return newOrder;
}

export function resetToDefaultData(): {
  settings: StoreSettings;
  items: LinkItem[];
  testimonials: Testimonial[];
  freeTools: FreeWebTool[];
} {
  saveStoredSettings(INITIAL_SETTINGS);
  saveStoredItems(INITIAL_ITEMS);
  saveStoredTestimonials(INITIAL_TESTIMONIALS);
  saveStoredFreeTools(INITIAL_FREE_TOOLS);
  saveStoredOrders([]);
  return {
    settings: INITIAL_SETTINGS,
    items: INITIAL_ITEMS,
    testimonials: INITIAL_TESTIMONIALS,
    freeTools: INITIAL_FREE_TOOLS,
  };
}

export function formatRupiah(amount: number): string {
  if (amount === 0) return 'Gratis / Free';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

