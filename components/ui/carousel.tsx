import { getCollectionProducts } from 'lib/shopify';
import { getAllLiveProducts } from 'lib/utils';
import Link from 'next/link';
import { GridTileImage } from '../grid/tile';

type Collection = 'flower' | 'foliage' | 'nature' | 'urban' | 'sky';

export async function Carousel({ collection }: { collection: Collection | undefined }) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const scapeTitle = collection
    ? `${collection[0]?.toUpperCase()}${collection.slice(1)}scapes`
    : '';

  const getProducts = async () => {
    return !!collection ? getCollectionProducts({ collection: scapeTitle }) : getAllLiveProducts();
  };
  const products = await getProducts();

  if (!products?.length) return null;

  const Title = ({ title }: { title: string }) => {
    return <h4 className="text-lg md:text-xl text-black md:mb-3">{title}</h4>;
  };

  return (
    <div className="max-w-full">
      {scapeTitle && (
        <Link href={`/search/${scapeTitle}`}>
          <Title title={scapeTitle} />
        </Link>
      )}
      {!scapeTitle && <Title title="Popular Products" />}
      <div className=" w-full overflow-x-auto pb-6 pt-1 border-neutral-300 border-bottom:not-last-of-type">
        <div className="flex animate-carousel gap-4">
          {/* Only duplicate for visual effect, but use same image references to avoid duplicate downloads */}
          {products.map((product, i) => (
            <Link
              key={`${product.handle}-${i}`}
              href={`/products/${product.handle}`}
              className="h-50 w-1/2 md:w-1/3 flex-none"
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                width={600}
                height={600}
                loading="lazy"
              />
            </Link>
          ))}
          {/* Duplicate only first 3 for infinite scroll effect - browser will reuse cached images */}
          {products.length > 0 &&
            products.slice(0, Math.min(products.length, 3)).map((product, i) => (
              <Link
                key={`${product.handle}-dup-${i}`}
                href={`/products/${product.handle}`}
                className="h-50 w-1/2 md:w-1/3 flex-none"
                aria-hidden="true"
              >
                <GridTileImage
                  alt=""
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage?.url}
                  width={600}
                  height={600}
                  loading="lazy"
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
