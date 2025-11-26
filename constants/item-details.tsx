// ============================================
// Product Detail Types
// ============================================

export type ProductDetail = {
  title: string;
  details: string[];
  careInstructions?: string[];
  certifications?: string[];
};

// ============================================
// Garment Details (T-shirts, Hoodies, etc.)
// ============================================

export const garmentDetails: { [key: string]: ProductDetail } = {
  tshirt: {
    title: 'T-Shirt',
    details: [
      'Buttery soft 100% organic cotton (180gsm)',
      'Modern relaxed fit, true to size',
      'Water-based eco-friendly print',
      'Subtle brand label on front hem',
      'Unisex style'
    ],
    careInstructions: [
      'Machine wash 30°C',
      'Wash similar colours together',
      'No ironing on print',
      'Wash inside out',
      'Do not tumble dry'
    ],
    certifications: ['GOTS', 'OEKO-TEX', 'Fair Wear', 'PETA Vegan']
  },
  crew: {
    title: 'Sweatshirt',
    details: [
      'Cosy 100% organic cotton (500gsm)',
      'Relaxed fit for effortless comfort',
      'Water-based eco-friendly print',
      'Subtle brand label on front hem',
      'Unisex style'
    ],
    careInstructions: [
      'Machine wash 30°C',
      'Wash similar colours together',
      'No ironing on print',
      'Wash inside out',
      'Do not tumble dry'
    ],
    certifications: ['GOTS', 'OEKO-TEX', 'Fair Wear', 'PETA Vegan']
  },
  hoodie: {
    title: 'Hoodie',
    details: [
      'Premium 100% organic cotton (500gsm)',
      'Relaxed fit with kangaroo pocket',
      'Water-based eco-friendly print',
      'Subtle brand label on front hem',
      'Unisex style'
    ],
    careInstructions: [
      'Machine wash 30°C',
      'Wash similar colours together',
      'No ironing on print',
      'Wash inside out',
      'Do not tumble dry'
    ],
    certifications: ['GOTS', 'OEKO-TEX', 'Fair Wear', 'PETA Vegan']
  }
};

// ============================================
// Wall Art Details (Prints, Canvas)
// ============================================

export const wallArtDetails: { [key: string]: ProductDetail } = {
  poster: {
    title: 'Art Print',
    details: [
      'Premium 200gsm matte paper with luxurious smooth finish',
      'Vibrant, fade-resistant giclée print',
      'Sustainably sourced, FSC certified paper',
      'Ships flat in protective packaging',
      'Made to order, just for you'
    ],
    certifications: ['FSC']
  },
  canvas: {
    title: 'Canvas Print',
    details: [
      'Gallery-quality canvas on FSC certified wood frame',
      'Rich texture that enhances artwork',
      'Ready to hang - hardware included',
      'Durable cotton-poly blend (300gsm)',
      'Ships protected in sturdy packaging'
    ],
    certifications: ['FSC']
  }
};

// ============================================
// Tag-based detection helpers
// ============================================

function hasTag(tags: string[] | undefined | null, ...searchTags: string[]): boolean {
  if (!tags || !Array.isArray(tags)) return false;
  const lowerTags = tags.map(t => t.toLowerCase());
  return searchTags.some(tag => lowerTags.includes(tag.toLowerCase()));
}

// Helper to check if product is canvas (check first - takes priority over print)
export function isCanvas(tags: string[] | undefined | null): boolean {
  return hasTag(tags, 'canvas');
}

// Helper to check if product is wall art (print or canvas)
export function isWallArt(tags: string[] | undefined | null): boolean {
  return hasTag(tags, 'canvas', 'print', 'poster');
}

// Helper to check if product is a garment
export function isGarment(tags: string[] | undefined | null): boolean {
  return hasTag(tags, 't-shirt', 'tshirt', 'tee', 'sweatshirt', 'crew', 'hoodie');
}

// ============================================
// Get product details based on tags
// ============================================

export function getProductDetails(tags: string[] | undefined | null): ProductDetail | null {
  // Wall art - canvas takes priority
  if (isCanvas(tags)) {
    return wallArtDetails.canvas ?? null;
  }
  if (hasTag(tags, 'print', 'poster')) {
    return wallArtDetails.poster ?? null;
  }

  // Garments
  if (hasTag(tags, 'hoodie')) {
    return garmentDetails.hoodie ?? null;
  }
  if (hasTag(tags, 'sweatshirt', 'crew')) {
    return garmentDetails.crew ?? null;
  }
  if (hasTag(tags, 't-shirt', 'tshirt', 'tee')) {
    return garmentDetails.tshirt ?? null;
  }

  return null;
}

// ============================================
// Legacy exports for backwards compatibility
// ============================================

export const cotton100 = '100% organic cotton';

export type GarmentDetailContent = {
  title: string;
  content: string;
  weight: {
    feel: string;
    gsm: number;
  };
  fit: string;
  print: string;
  common: {
    style: string;
    branding: string;
  };
};

export const productTypes: { [productTypeName: string]: GarmentDetailContent } = {
  tshirt: {
    title: 'T-Shirt',
    content: cotton100,
    weight: { feel: 'medium', gsm: 180 },
    fit: 'relaxed',
    print: 'water based ink print on back',
    common: { style: 'unisex', branding: 'subtle brand label on front hem' }
  },
  crew: {
    title: 'Crew Neck Sweatshirt',
    content: cotton100,
    weight: { feel: 'heavy', gsm: 500 },
    fit: 'relaxed',
    print: 'water based ink print on back',
    common: { style: 'unisex', branding: 'subtle brand label on front hem' }
  },
  hoodie: {
    title: 'Hoodie',
    content: cotton100,
    weight: { feel: 'heavy', gsm: 500 },
    fit: 'relaxed',
    print: 'water based ink print on back',
    common: { style: 'unisex', branding: 'subtle brand label on front hem' }
  }
};
