# Postman API Testing Guide

## Server Information
- **Base URL**: `http://localhost:3000`
- **Server Status**: Running ✅
- **Database**: SQLite (custom.db)

## Available API Endpoints

### 1. Products API

#### Get All Products
```
Method: GET
URL: http://localhost:3000/api/products
Headers: None required
```

**Response Example:**
```json
[
  {
    "id": "product-id",
    "name": "Product Name",
    "description": "Product description",
    "price": 299.99,
    "image": "https://example.com/image.jpg",
    "category": "Keychains",
    "stock": 10,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Create Product (Admin)
```
Method: POST
URL: http://localhost:3000/api/products
Headers:
  Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Beautiful Keychain",
  "description": "Handcrafted keychain with premium materials",
  "price": 299.99,
  "image": "https://example.com/keychain.jpg",
  "category": "Keychains",
  "stock": 50
}
```

#### Update Product
```
Method: PUT
URL: http://localhost:3000/api/products/{productId}
Headers:
  Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 349.99,
  "stock": 25
}
```

#### Delete Product
```
Method: DELETE
URL: http://localhost:3000/api/products/{productId}
Headers: None required
```

---

### 2. Cart API

#### Get Cart Items
```
Method: GET
URL: http://localhost:3000/api/cart
Headers: None required
```

**Response Example:**
```json
[
  {
    "id": "cart-item-id",
    "userId": "user-id",
    "productId": "product-id",
    "quantity": 2,
    "product": {
      "id": "product-id",
      "name": "Product Name",
      "price": 299.99,
      "image": "https://example.com/image.jpg",
      "stock": 10
    }
  }
]
```

#### Add to Cart
```
Method: POST
URL: http://localhost:3000/api/cart
Headers:
  Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "product-id-here",
  "quantity": 1
}
```

#### Update Cart Item Quantity
```
Method: PUT
URL: http://localhost:3000/api/cart/{cartItemId}
Headers:
  Content-Type: application/json
```

**Request Body:**
```json
{
  "quantity": 3
}
```

#### Remove from Cart
```
Method: DELETE
URL: http://localhost:3000/api/cart/{cartItemId}
Headers: None required
```

---

### 3. Orders API

#### Get All Orders
```
Method: GET
URL: http://localhost:3000/api/orders
Headers: None required
```

**Response Example:**
```json
[
  {
    "id": "order-id",
    "userId": "user-id",
    "status": "pending",
    "total": 899.97,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "items": [
      {
        "id": "order-item-id",
        "quantity": 2,
        "price": 299.99,
        "product": {
          "id": "product-id",
          "name": "Product Name",
          "image": "https://example.com/image.jpg"
        }
      }
    ],
    "user": {
      "id": "user-id",
      "email": "customer@example.com",
      "name": "Customer Name"
    }
  }
]
```

#### Create Order
```
Method: POST
URL: http://localhost:3000/api/orders
Headers:
  Content-Type: application/json
```

**Request Body:**
```json
{
  "customerInfo": {
    "email": "customer@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "shippingAddress": {
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  },
  "paymentMethod": "cod",
  "items": [
    {
      "productId": "product-id-1",
      "quantity": 2,
      "price": 299.99
    },
    {
      "productId": "product-id-2",
      "quantity": 1,
      "price": 499.99
    }
  ],
  "total": 1099.97
}
```

#### Update Order Status
```
Method: PUT
URL: http://localhost:3000/api/orders/{orderId}
Headers:
  Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Valid Status Values:**
- `pending`
- `confirmed`
- `shipped`
- `delivered`
- `cancelled`

---

## Postman Setup Steps

### Step 1: Install Postman
1. Download from: https://www.postman.com/downloads/
2. Install and open Postman

### Step 2: Create New Collection
1. Click "New" → "Collection"
2. Name it: "N S GIFT & DECOR API"
3. Add description: "E-commerce API endpoints"

### Step 3: Add Requests

#### For GET Requests:
1. Click "Add Request" in your collection
2. Name: "Get All Products"
3. Method: GET
4. URL: `http://localhost:3000/api/products`
5. Click "Send"

#### For POST Requests:
1. Click "Add Request"
2. Name: "Create Product"
3. Method: POST
4. URL: `http://localhost:3000/api/products`
5. Go to "Body" tab
6. Select "raw" and "JSON"
7. Paste the JSON request body
8. Click "Send"

### Step 4: Save Environment Variables (Optional)
1. Click "Environments" (left sidebar)
2. Create new environment: "Local Development"
3. Add variable:
   - Variable: `baseUrl`
   - Initial Value: `http://localhost:3000`
   - Current Value: `http://localhost:3000`
4. Use in requests: `{{baseUrl}}/api/products`

---

## Testing Workflow

### 1. Test Products
```
1. GET /api/products - Get all products
2. POST /api/products - Create a new product
3. GET /api/products - Verify product was created
4. PUT /api/products/{id} - Update the product
5. DELETE /api/products/{id} - Delete the product
```

### 2. Test Cart Flow
```
1. POST /api/cart - Add product to cart
2. GET /api/cart - View cart items
3. PUT /api/cart/{id} - Update quantity
4. DELETE /api/cart/{id} - Remove from cart
```

### 3. Test Order Flow
```
1. POST /api/cart - Add products to cart
2. POST /api/orders - Create order
3. GET /api/orders - View all orders
4. PUT /api/orders/{id} - Update order status
```

---

## Common Issues & Solutions

### Issue 1: Connection Refused
**Problem**: Cannot connect to localhost:3000
**Solution**: 
- Ensure dev server is running: `npm run dev`
- Check if port 3000 is available
- Try: `http://127.0.0.1:3000` instead

### Issue 2: 404 Not Found
**Problem**: API endpoint not found
**Solution**:
- Check URL spelling
- Ensure `/api/` prefix is included
- Verify endpoint exists in your code

### Issue 3: 500 Internal Server Error
**Problem**: Server error
**Solution**:
- Check server console for error details
- Verify database is connected
- Check request body format

### Issue 4: CORS Error
**Problem**: Cross-origin request blocked
**Solution**:
- This shouldn't happen with Postman
- If it does, check Next.js CORS settings

---

## Sample Postman Collection JSON

Save this as `postman_collection.json` and import into Postman:

```json
{
  "info": {
    "name": "N S GIFT & DECOR API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Products",
      "item": [
        {
          "name": "Get All Products",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/api/products",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["api", "products"]
            }
          }
        },
        {
          "name": "Create Product",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Beautiful Keychain\",\n  \"description\": \"Handcrafted keychain\",\n  \"price\": 299.99,\n  \"category\": \"Keychains\",\n  \"stock\": 50\n}"
            },
            "url": {
              "raw": "http://localhost:3000/api/products",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["api", "products"]
            }
          }
        }
      ]
    },
    {
      "name": "Cart",
      "item": [
        {
          "name": "Get Cart",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/api/cart",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["api", "cart"]
            }
          }
        },
        {
          "name": "Add to Cart",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"productId\": \"your-product-id\",\n  \"quantity\": 1\n}"
            },
            "url": {
              "raw": "http://localhost:3000/api/cart",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["api", "cart"]
            }
          }
        }
      ]
    },
    {
      "name": "Orders",
      "item": [
        {
          "name": "Get All Orders",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/api/orders",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["api", "orders"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## Quick Start Commands

### Start Server
```bash
npm run dev
```

### Test in Postman
1. Open Postman
2. Import collection (optional)
3. Create GET request to: `http://localhost:3000/api/products`
4. Click Send
5. You should see products list!

---

## Tips for Testing

1. **Use Collections**: Organize requests by feature
2. **Save Responses**: Use "Save Response" to compare
3. **Use Variables**: Set baseUrl as environment variable
4. **Test Sequences**: Create test scripts for workflows
5. **Check Console**: View server logs for debugging
6. **Use Pre-request Scripts**: Set up data before requests
7. **Add Tests**: Validate responses automatically

---

## Next Steps

1. ✅ Start your dev server
2. ✅ Open Postman
3. ✅ Test GET /api/products
4. ✅ Create a product with POST
5. ✅ Test cart operations
6. ✅ Create an order
7. ✅ Update order status

Happy Testing! 🚀
