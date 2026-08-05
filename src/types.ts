export type ItemType = 'product' | 'link' | 'consultation' | 'community';

export type BadgeColor = 'green' | 'blue' | 'red' | 'amber' | 'purple' | 'emerald' | 'gold';

export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  type: ItemType;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeColor?: BadgeColor;
  url?: string;
  imageUrl?: string;
  description?: string;
  category: string;
  isPinned?: boolean;
  isActive: boolean;
  order: number;
  features?: string[];
  rating?: number;
  salesCount?: number;
  estimatedTime?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  productTitle: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'kelas' | 'ebook' | 'akses' | 'muamalah' | 'umum';
}

export interface CartItem {
  product: LinkItem;
  quantity: number;
  notes?: string;
}

export type ThemeBackground = 'luxury-dark' | 'emerald-gold' | 'cosmic-earth' | 'clean-light' | 'dark-space';

export interface SocialLinks {
  tiktok?: string;
  youtube?: string;
  instagram?: string;
  whatsapp?: string;
  telegram?: string;
}

export interface HeroStat {
  id: string;
  value: string;
  label: string;
  color?: string;
}

export interface FreeWebTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  url: string;
  badge?: string;
  isExternal?: boolean;
  color: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  whatsappNumber: string;
  whatsappMessageHeader?: string;
  socials: SocialLinks;
  themeBackground: ThemeBackground;
  customBgUrl?: string;
  announcementText?: string;
  announcementActive: boolean;
  adminUsername?: string;
  adminPassword?: string;
  adminPin: string;
  hideAdminButtonFooter?: boolean;
  showCredentialsHint?: boolean;
  currency: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  stats?: HeroStat[];
  showPrayerTimes?: boolean;
  showFaq?: boolean;
  showTestimonials?: boolean;
  showQuiz?: boolean;
  showGoldCalc?: boolean;
  showFreeTools?: boolean;
  showCommunityBanner?: boolean;
  communityGroupUrl?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
}

export interface OrderLead {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  items: { title: string; price: number; quantity: number }[];
  totalAmount: number;
  status: 'Pending WA' | 'Selesai' | 'Batal';
}

