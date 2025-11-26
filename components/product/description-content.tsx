import { getProductDetails, isWallArt } from 'constants/item-details';
import { Product } from 'lib/shopify/types';

export function DescriptionContent({ product }: { product: Product }) {
  const productDetails = getProductDetails(product.tags);

  if (!productDetails) {
    return null;
  }

  const isGarment = !isWallArt(product.tags);

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide text-neutral-900 dark:text-neutral-100">
        Product Details
      </h4>
      <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
        {productDetails.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>

      {isGarment && productDetails.careInstructions && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide text-neutral-900 dark:text-neutral-100">
            Care Instructions
          </h4>
          <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            {productDetails.careInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
