import express from 'express';
import {
  getAllProducts, getProductById, createProduct,
  updateProduct, deleteProduct
} from '../models/productModel.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateProduct } from '../middleware/validateProduct.js';
import { NotFoundError } from '../utils/customErrors.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  let results = getAllProducts();
  if (req.query.category) results = results.filter(p => p.category === req.query.category);
  if (req.query.search) results = results.filter(p =>
    p.name.toLowerCase().includes(req.query.search.toLowerCase())
  );
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || results.length;
  const start = (page - 1) * limit;
  const paginatedResults = results.slice(start, start + limit);
  res.json({ total: results.length, page, limit, results: paginatedResults });
});

router.get('/:id', (req, res, next) => {
  const product = getProductById(req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

router.post('/', validateProduct, (req, res) => {
  const product = createProduct(req.body);
  res.status(201).json(product);
});

router.put('/:id', validateProduct, (req, res, next) => {
  const updated = updateProduct(req.params.id, req.body);
  if (!updated) return next(new NotFoundError('Product not found'));
  res.json(updated);
});

router.delete('/:id', (req, res, next) => {
  const success = deleteProduct(req.params.id);
  if (!success) return next(new NotFoundError('Product not found'));
  res.status(204).send();
});

export default router;