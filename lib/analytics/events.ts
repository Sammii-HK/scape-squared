// Google Analytics 4 Event Tracking

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    // eslint-disable-next-line no-unused-vars
    gtag?: (..._args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url
    });
  }
};

// Track product views
export const trackProductView = (product: {
  id: string;
  name: string;
  price: number;
  currency: string;
  category?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: product.currency,
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          currency: product.currency,
          item_category: product.category
        }
      ]
    });
  }
};

// Track add to cart
export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity?: number;
  variant?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: product.currency,
      value: product.price * (product.quantity || 1),
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          currency: product.currency,
          quantity: product.quantity || 1,
          item_variant: product.variant
        }
      ]
    });
  }
};

// Track remove from cart
export const trackRemoveFromCart = (product: {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      currency: product.currency,
      value: product.price * (product.quantity || 1),
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          currency: product.currency,
          quantity: product.quantity || 1
        }
      ]
    });
  }
};

// Track begin checkout
export const trackBeginCheckout = (cart: {
  value: number;
  currency: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: cart.currency,
      value: cart.value,
      items: cart.items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        currency: cart.currency,
        quantity: item.quantity
      }))
    });
  }
};

// Track purchase (called after successful checkout)
export const trackPurchase = (transaction: {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transaction.transaction_id,
      currency: transaction.currency,
      value: transaction.value,
      items: transaction.items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        currency: transaction.currency,
        quantity: item.quantity
      }))
    });
  }
};

// Track search
export const trackSearch = (searchTerm: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm
    });
  }
};
