import { Product } from 'lib/shopify/types';
import Link from 'next/link';
import Grid from '../grid';
import { GridTileImage } from '../grid/tile';

export default function ProductGridItems(
  {
    products,
    colSpan,
    searchParams,
  }: { 
    products: Product[],
    colSpan?: Number,
    searchParams: { [key: string]: string | string[] | undefined; } | undefined
  }) {
  const sizeParam = searchParams?.size;
  const sizeSearchParam = `?size=${sizeParam}`
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className={`animate-fadeIn ${colSpan}`}>
          <Link className="inline-block h-full w-full" href={`/products/${product.handle}/${sizeSearchParam}`}>
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.minVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              width={600}
              height={600}
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
