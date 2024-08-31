import { collectionTypes } from "@/lib/utils";

const collectionItems = collectionTypes.map(item => {
  return {
    title: item,
    path: `/collections/${item}`,
  }
});

const sizes = [ '2X-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', '2X-Large', '3X-Large' ];
const sizeItems = sizes.map(size => {
  return {
    title: size,
    path: `/collections/wardrobe?size=${size}`
  }
});


export const menu = [
  { title: "Collections",
    key: "collections",
    items: collectionItems,
  },
  {
    title: "All Products",
    key: "all-products",
    path: "/collections/all-products",
  },
  {
    title: "Art for the",
    key: "art-for-the",
    items: [
      {
        title: "Wall",
        path: "/collections/wall",
      },
      {
        title: "Wardrobe",
        path: "/collections/wardrobe",
      },
    ]
  },
  {
    title: "Shop 2xs-4xl",
    key: "sizes",
    items: sizeItems,
  },
  {
    title: "About",
    key: "about",
    path: "/about",
  },
  {
    title: "Responsibility",
    key: "responsibility",
    path: "/responsibility",
  }
];