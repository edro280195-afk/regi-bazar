import type { LucideIcon } from 'lucide-react';
import {
  Crown,
  Facebook,
  Gift,
  HeartHandshake,
  Home,
  MessageCircleHeart,
  PackageCheck,
  Sparkles,
  Star,
  TicketPercent,
  Truck
} from 'lucide-react';

export const brand = {
  name: 'Regi Bazar',
  slogan: 'La mejor calidad para tu hogar',
  deliveryZone: 'Nuevo Laredo, Tamaulipas',
  story:
    'Regi Bazar nació de la necesidad de generar ingresos para el hogar sin dejar de ser mamá 24/7.',
  categories: ['Sábanas', 'Colchas', 'Edredones', 'Utensilios de cocina', 'Detalles para el hogar']
} as const;

export const links = {
  facebook: 'https://www.facebook.com/regi.bazar.852309',
  messenger: 'https://m.me/regi.bazar.852309',
  tiktok: 'https://www.tiktok.com/@regi.bazar?_r=1&_t=ZS-96mHd4AK657',
  domain: 'https://regi-bazar.com',
  trackingBasePath: 'https://regibazar.com/pedido'
} as const;

export const nextLive = {
  // Actualiza este valor cuando ya tengas fecha. Ejemplo: '2026-06-07T20:00:00-05:00'.
  startsAt: null as string | null,
  fallbackTitle: 'Próximo live por anunciar',
  fallbackCopy: 'Síguenos en Facebook para enterarte primero, hermosa.',
  reminderCopy: 'Recordármelo por Messenger'
} as const;

export interface StepItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const buyingSteps: StepItem[] = [
  {
    id: 'live',
    title: 'Entra al live',
    description: 'Te esperamos en Facebook con piezas bonitas para tu hogar y dinámica sencilla.',
    icon: Facebook,
    accent: 'from-pink-300 to-pink-500'
  },
  {
    id: 'aparta',
    title: 'Aparta tu pieza',
    description: 'Comenta en el live o mándanos mensaje por Messenger para separar lo que te encantó.',
    icon: MessageCircleHeart,
    accent: 'from-fuchsia-300 to-violet-500'
  },
  {
    id: 'recibe',
    title: 'Recibe tu pedido',
    description: 'Te mandamos tu link de seguimiento y preparamos todo con moñito y mucho cariño.',
    icon: PackageCheck,
    accent: 'from-rose-300 to-pink-600'
  }
];

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  sparkle: string;
}

export const benefits: BenefitItem[] = [
  {
    id: 'regipuntos',
    title: 'RegiPuntos',
    description: 'Gana puntos en cada compra y cámbialos por sorpresas para seguir consintiéndote.',
    icon: Gift,
    sparkle: '💎'
  },
  {
    id: 'vip',
    title: 'Niveles VIP',
    description: 'Sube de Nueva a Frecuente y después a Consentida VIP con beneficios especiales.',
    icon: Crown,
    sparkle: '👑'
  },
  {
    id: 'seguimiento',
    title: 'Seguimiento en vivo',
    description: 'Mira el avance de tu pedido con un link personal, claro y precioso.',
    icon: Truck,
    sparkle: '📦'
  },
  {
    id: 'atencion',
    title: 'Atención con amor',
    description: 'Todo por Messenger, siempre al pendiente y con trato cercano.',
    icon: HeartHandshake,
    sparkle: '💬'
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  size: 'tall' | 'wide' | 'normal';
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'sabanas',
    title: 'Sábanas suaves',
    description: 'Placeholder para foto real de sábanas o blancos.',
    src: '/assets/placeholder-sabanas.svg',
    alt: 'Placeholder de sábanas suaves para el hogar',
    size: 'tall'
  },
  {
    id: 'cocina',
    title: 'Cocina bonita',
    description: 'Placeholder para utensilios de cocina.',
    src: '/assets/placeholder-cocina.svg',
    alt: 'Placeholder de utensilios de cocina de Regi Bazar',
    size: 'normal'
  },
  {
    id: 'edredones',
    title: 'Edredones consentidores',
    description: 'Placeholder para foto real de colchas y edredones.',
    src: '/assets/placeholder-edredones.svg',
    alt: 'Placeholder de edredones y colchas para habitación',
    size: 'wide'
  },
  {
    id: 'empaque',
    title: 'Pedidos con moñito',
    description: 'Placeholder para empaque real con moño.',
    src: '/assets/placeholder-empaque.svg',
    alt: 'Placeholder de empaque con moño para pedido de Regi Bazar',
    size: 'normal'
  },
  {
    id: 'live',
    title: 'Momentos del live',
    description: 'Placeholder para foto o captura bonita del live.',
    src: '/assets/placeholder-live.svg',
    alt: 'Placeholder de transmisión en vivo de Regi Bazar',
    size: 'tall'
  }
];

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  detail: string;
  placeholder: boolean;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 'empaque',
    quote: 'Aquí irá una reseña real sobre lo bonito que llega el pedido.',
    name: 'Testimonio pendiente',
    detail: 'Clienta de Nuevo Laredo',
    placeholder: true
  },
  {
    id: 'seguimiento',
    quote: 'Aquí irá una reseña real sobre lo fácil que es rastrear el pedido.',
    name: 'Testimonio pendiente',
    detail: 'Seguimiento Regi',
    placeholder: true
  },
  {
    id: 'atencion',
    quote: 'Aquí irá una reseña real sobre la atención por Messenger.',
    name: 'Testimonio pendiente',
    detail: 'Atención con cariño',
    placeholder: true
  }
];

export const socialActions = [
  {
    id: 'facebook',
    label: 'Ver Facebook',
    href: links.facebook,
    description: 'Lives, avisos y novedades',
    icon: Facebook
  },
  {
    id: 'messenger',
    label: 'Escribir por Messenger',
    href: links.messenger,
    description: 'Atención directa',
    icon: MessageCircleHeart
  },
  {
    id: 'tiktok',
    label: 'Seguir en TikTok',
    href: links.tiktok,
    description: 'Videos y detalles bonitos',
    icon: Sparkles
  }
] satisfies Array<{
  id: string;
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}>;

export const trustStats = [
  { id: 'hogar', label: 'Especialistas en hogar', value: 'Hogar', icon: Home },
  { id: 'puntos', label: 'Compras con beneficios', value: 'RegiPuntos', icon: TicketPercent },
  { id: 'cariño', label: 'Pedidos preparados con detalle', value: 'Moñitos', icon: Star }
] satisfies Array<{
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
}>;
