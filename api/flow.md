## Endpoints

### Test endpoints

- api/test

### Auth endpoints

- api/auth/signin
- api/auth/signup
- api/auth/google

### Restaurant endpoints

- api/restaurants
- api/restaurant/:restaurantId

### Cart endpoints

- api/cart/add-item
- api/cart/remove-item
- api/cart/all-items
- api/cart/clear-cart
- api/cart/checkout

- api/cart/items
- api/cart/items/:itemId
- api/cart/items
- api/cart
- api/cart/checkout

### Order endpoints

- api/orders/order-details
- api/orders/webhook

```GET /api/orders # get all orders of current user
PATCH /api/orders/:orderId/status # update order status (admin or system)
```

---

### User Profile endpoints

- api/user/profile - get
- api/user/profile - put

### Addresses endpoints

- api/user/addresses - get
- api/user/addresses - post
- api/user/addresses/:addressId - put
- api/user/addresses/:addressId - delete

### Payments endpoint

- api/payment/intent
- api/payment/status/:orderId

### Admin panel endpoints

- GET /api/admin/orders # all orders (for admin)
- GET /api/admin/users # all users
- POST /api/admin/restaurants # add restaurant
- PUT /api/admin/restaurants/:id # update restaurant
- DELETE /api/admin/restaurants/:id # delete restaurant
