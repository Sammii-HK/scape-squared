import { isWallArt } from 'constants/item-details';
import { credentials } from 'constants/sustainability';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export function SustainabilityBadges({ product }: { product: Product }) {
  const productIsWallArt = isWallArt(product.tags);
  
  // Different credentials for wall art vs garments
  const keyCredentials = productIsWallArt 
    ? ['fsc']
    : ['gots', 'oekoStandard', 'fairWear', 'peta'];

  // Get the description based on product type
  const getDescription = () => {
    if (productIsWallArt) {
      return 'Printed on sustainably sourced, FSC certified materials.';
    }
    return 'Made with certified organic materials and ethical practices.';
  };

  return (
    <div className="my-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
      <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide text-neutral-900 dark:text-neutral-100">
        Certifications
      </h4>
      <div className="flex flex-wrap gap-2">
        {keyCredentials.map((key) => {
          const credential = credentials[key as keyof typeof credentials];
          if (!credential) return null;

          return (
            <Link
              key={key}
              href={credential.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 text-xs font-medium border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-full hover:border-neutral-500 dark:hover:border-neutral-400 transition-colors"
              title={credential.excerpt}
            >
              {credential.title}
            </Link>
          );
        })}
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
        {getDescription()}
      </p>
    </div>
  );
}
