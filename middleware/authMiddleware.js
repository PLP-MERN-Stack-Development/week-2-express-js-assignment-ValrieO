import { UnauthorizedError } from '../utils/customErrors.js';
const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return next(new UnauthorizedError('Invalid API Key'));
  }
  next();
};
export default authMiddleware;