// preloadImages.js
import products from "./products";

export function preloadImages() {
  const imagePaths = [];

  products.forEach(product => {
    if (product.mainImage) imagePaths.push(product.mainImage);
    if (product.images) imagePaths.push(...product.images);
  });

  // Remove duplicates
  const uniquePaths = [...new Set(imagePaths)];

  // Trigger browser preload
  uniquePaths.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}
