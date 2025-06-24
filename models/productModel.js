import { v4 as uuidv4 } from 'uuid';
let products = [];
export const getAllProducts = () => products;
export const getProductById = (id) => products.find(p => p.id === id);
export const createProduct = (product) => {
  const newProduct = { id: uuidv4(), ...product };
  products.push(newProduct);
  return newProduct;
};
export const updateProduct = (id, updates) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  return products[index];
};
export const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};