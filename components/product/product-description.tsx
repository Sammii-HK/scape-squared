import { AddToCart } from 'components/cart/add-to-cart';
import { Product } from 'lib/shopify/types';
import { DescriptionContent } from './description-content';
import { VariantDetails } from './variant-details';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <VariantDetails product={product} />
      <AddToCart variants={product.variants} availableForSale={product.availableForSale} />

      <DescriptionContent product={product} />
      {/* {!product.tags.includes('wall') && <SustainabilityInfo />} */}
    </>
  );
}
