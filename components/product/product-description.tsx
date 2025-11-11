import { AddToCart } from 'components/cart/add-to-cart';
import { BrandPillars } from 'components/brand/brand-pillars';
import { SustainabilityBadges } from 'components/brand/sustainability-badges';
import { ProductTrustSignals } from 'components/conversion/product-trust-signals';
import { Product } from 'lib/shopify/types';
import { DescriptionContent } from './description-content';
import { VariantDetails } from './variant-details';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <VariantDetails product={product} />
      <AddToCart
        variants={product.variants}
        availableForSale={product.availableForSale}
        product={product}
      />
      <ProductTrustSignals />
      <SustainabilityBadges />
      <BrandPillars />
      <DescriptionContent product={product} />
      {/* {!product.tags.includes('wall') && <SustainabilityInfo />} */}
    </>
  );
}
