# E-Commerce App - REST API with MongoDB
---

e-commerce app API to handel online shopping procedures, such as users, products, and orders.
tools used include `Node.js` `Express` `MongoDB` 


## Image installation


```
docker pull ahmednashaat/ecommerce-backend:1.0

docker run -p 3000:3000  ahmednashaat/ecommerce-backend:1.0
```

to try it online follow this link : [e-commerce API](https://ecommerce-backend-testproject.herokuapp.com)


## API Routes

- Users Endpoint

| Routes               	| Method 	| Description             	|
|----------------------	|--------	|-------------------------	|
| /api/users           	| Get    	| get all users           	|
| /api/users/:id       	| Get    	| get user by id          	|
| /api/users/register  	| Post   	| register a user         	|
| /api/users/login     	| Post   	| user login              	|
| /api/users/logout    	| Post   	| user logout             	|
| /api/users/logoutAll 	| Post   	| user logout all devices 	|
| /api/users/me        	| Get    	| user account            	|
| /api/users/me        	| Put    	| user update his account 	|
| /api/users/me        	| Delete 	| user delete his account 	|
<br>

- Products Endpoint

| Routes           	| Method 	| Description       	|
|------------------	|--------	|-------------------	|
| /api/products     	| Get    	| get all products  	|
| /api/products     	| Post   	| add products      	|
| /api/products/:id 	| Get    	| get product by id 	|
| /api/products/:id 	| Patch  	| update product    	|
| /api/products/:id 	| Delete 	| delete product    	|
<br>

- Orders Endpoint

| Routes               	| Method 	| Description         	|
|----------------------	|--------	|---------------------	|
| /api/orders          	| Get    	| get all orders      	|
| /api/orders          	| Post   	| create order        	|
| /api/orders/:id      	| Get    	| get order by id     	|
| /api/orders/:id      	| Patch  	| update order        	|
| /api/orders/:id      	| Delete 	| delete order        	|
| /api/orders/myorders 	| Get    	| get all user orders 	|
<br>

- Cart Endpoint

| Routes                              	| Method 	| Description                   	|
|-------------------------------------	|--------	|-------------------------------	|
| /api/cart                           	| Get    	| get all user carts            	|
| /api/cart                           	| Post   	| create cart                   	|
| /api/cart/:cartId                   	| Get    	| get cart by id                	|
| /api/cart/:cartId                   	| Delete 	| delete cart                   	|
| /api/cart/:cartId/products          	| Get    	| get all products in cart      	|
| /api/cart/:cartId/:productId        	| Post   	| add product to cart           	|
| /api/cart/:cartId/:productId        	| Delete 	| delete product from cart      	|
| /api/cart/:cartId/:productId/status 	| Patch  	| edit product status in cart   	|
| /api/cart/:cartId/products/status   	| Get    	| get products status from cart 	|

<br>

---
## Team members
- [Omar Gamal](https://github.com/O-Gamal)
- [Ahmed Nashat](https://github.com/AhmadNashaat0)
- [Ahmed Yasser](https://github.com/ahmadyasser01)
- [Shahenda Hamdy](https://github.com/shahendahamdy)
