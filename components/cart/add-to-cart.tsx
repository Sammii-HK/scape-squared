'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/ui/loading-dots';
import { trackAddToCart } from 'lib/analytics/events';
import { ProductVariant, Product } from 'lib/shopify/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export function AddToCart({
  variants,
  availableForSale,
  product
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  product?: Product;
}) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === searchParams.get(option.name.toLowerCase())
      )
    );

    if (variant) {
      setSelectedVariantId(variant.id);
    }
  }, [searchParams, variants, setSelectedVariantId]);

  return (
    <button
      aria-label="Add item to cart"
      disabled={isPending}
      onClick={() => {
        if (!availableForSale) return;
        startTransition(async () => {
          const error = await addItem(selectedVariantId);

          if (error) {
            alert(error);
            return;
          }

          // Track add to cart event
          if (product) {
            const selectedVariant = variants.find((v) => v.id === selectedVariantId);
            if (selectedVariant) {
              trackAddToCart({
                id: product.id,
                name: product.title,
                price: parseFloat(selectedVariant.price.amount),
                currency: selectedVariant.price.currencyCode,
                quantity: 1,
                variant: selectedVariant.title
              });
            }
          }

          router.refresh();
        });
      }}
      className={clsx(
        'relative flex w-full items-center justify-center rounded bg-neutral-800 p-4 tracking-wide text-white hover:opacity-90',
        {
          'cursor-not-allowed opacity-60': !availableForSale,
          'cursor-not-allowed': isPending
        }
      )}
    >
      <div className="absolute left-0 ml-4">
        {!isPending ? <PlusIcon className="h-5" /> : <LoadingDots className="mb-3 bg-white" />}
      </div>
      <span>{availableForSale ? 'Add To Bag' : 'Out Of Stock'}</span>
    </button>
  );
}
