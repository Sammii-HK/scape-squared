'use client'

import Price from "components/ui/price";
import { Product, ProductVariant } from "lib/shopify/types";
import { useState } from "react";
import { VariantSelector } from "./variant-selector";

export function VariantDetails({ product }: { product: Product }) {
  const filterDeterminedOptions = product.options.filter(option => option.name !== 'Wrap');
  const [selectedVariant, setSelectedVariant] = useState<Partial<ProductVariant> | undefined>(product.variants[0]);

  return (
    <>
      <div className='flex align-middle justify-between border-b mb-6 border-neutral-500 dark:border-neutral-700'>
        <h1 className="mb-2 text-xl sm:text-2xl md:text-3xl font-medium">{product.title}</h1>
        <div className="flex justify-end self-center text-sm text-neutral-400">
          <Price
            amount={selectedVariant?.price?.amount || product.variants[0]!.price.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>

      </div>
      <VariantSelector options={filterDeterminedOptions} variants={product.variants} setSelectedVariant={setSelectedVariant} />
    </>
  )
}
