import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getLiveCollectionProducts } from "lib/utils";

export default async function CollectionPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getLiveCollectionProducts({ collection: params.collection, sortKey, reverse });  

  
  return (
    <div className="p-8">
      <h2 className="text-2xl mb-5 capitalize">{params.collection}</h2>
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
        <ProductGridItems products={products} colSpan={1} />
      </div>
    </div>
  )
} 