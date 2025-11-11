'use client';

import { trackProductView } from 'lib/analytics/events';
import { Product } from 'lib/shopify/types';
import { useEffect } from 'react';

export function ProductViewTracker({ product }: { product: Product }) {
  useEffect(() => {
    if (product && product.variants.length > 0) {
      const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
      trackProductView({
        id: product.id,
        name: product.title,
        price: minPrice,
        currency: product.priceRange.minVariantPrice.currencyCode,
        category: product.tags.find((tag) => tag !== 'hidden-product') || undefined
      });
    }
  }, [product]);

  return null;
}
