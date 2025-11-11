import { getCollection } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getLiveCollectionProducts, getCanonicalUrl } from 'lib/utils';

export const runtime = 'edge';
export const revalidate = 86400; // Revalidate daily (24 hours)

export async function generateMetadata({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  const canonicalUrl = getCanonicalUrl(
    `/search/${params.collection}`,
    searchParams ? new URLSearchParams(searchParams as Record<string, string>) : undefined
  );

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      url: canonicalUrl,
      type: 'website'
    }
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getLiveCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse
  });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} searchParams={searchParams} />
        </Grid>
      )}
    </section>
  );
}
