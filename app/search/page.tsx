import type { Metadata } from 'next';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getAllLiveProducts, getCanonicalUrl } from 'lib/utils';

export const revalidate = 604800; // Weekly — Shopify webhooks handle real-time updates

export function generateMetadata({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Metadata {
  const canonicalUrl = getCanonicalUrl(
    '/search',
    searchParams ? new URLSearchParams(searchParams as Record<string, string>) : undefined
  );

  return {
    title: 'Search',
    description: 'Search for products in the store.',
    alternates: {
      canonical: canonicalUrl
    }
  };
}

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getAllLiveProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue ? (
        <p>
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
