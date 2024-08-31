import ProductGridItems from '../../../components/layout/product-grid-items';
import { defaultSort, sorting } from '../../../lib/constants';
import { getCollectionProducts } from '../../../lib/shopify';
import { collectionTypes, getAllLiveProducts, getLiveWallProducts, getLiveWardrobeProducts } from '../../../lib/utils';

export default async function CollectionPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const getCollection = async () => {
    if (params && (params.collection === "wall")){ return await getLiveWallProducts(searchParams);}
    if (params && (params.collection === "wardrobe")) {return await getLiveWardrobeProducts(searchParams);}
    if (params && collectionTypes.includes(params.collection)) {return await getCollectionProducts({collection: params.collection, sortKey, reverse});}
    
    return await getAllLiveProducts(searchParams);
  };

  const currentProducts = await getCollection();
  console.log("currentProducts", currentProducts);
  

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-5 capitalize">{params.collection}</h2>
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
        <ProductGridItems products={currentProducts} colSpan={1} />
      </div>
    </div>
  )
} 