# Express RESTful API

## Setup
Install dependencies:
```bash
npm install
```
Create a `.env` file based on `.env.example`

Run the server:
```bash
npm run dev
```

## API Endpoints
### GET /api/products
- List products, optional `category`, `search`, `page`, `limit` params.
### POST /api/products
- Create a product
### GET /api/products/:id
- Get product by ID
### PUT /api/products/:id
- Update a product
### DELETE /api/products/:id
- Delete a product

## Authentication
Use `x-api-key` header for protected routes.
