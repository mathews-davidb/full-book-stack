/*

/api/users/register

post - [{email: email: password: password}]

return - [{ id: 1, email: whatever@gmail.com}]

-------------------------------------

/api/users/login

post - [{email: email: password: password}]

return - [{ id: 1, email: whatever@gmail.com}]

----------------------------------------

/api/users/me

get 

return - [{ id: 1, email: whatever@gmail.com}]

----------------------------------------

/api/users/:userId/orders

get 

return - [{ id: 1, userId: , isPurchased:, [products]]

------------------------------------------

/api/products/

get

return - [{id: id, name: name, description: description, price: , stock:, category: }]

------------------------------------------------

/api/products/:category


-------------------------------------------------

/api/products/

post - [{id: , name: , desc: , price: , stock: , category: }]

return - [{id: , name: , desc: , price: , stock: , category: }]

---------------------------------------------------

/api/products/:productId

patch - [{id: , name: , desc: , price: , stock: , category: }]

return - [{id: , name: , desc: , price: , stock: , category: }]

---------------------------------------------------

/api/products/:productId

delete - [{id: , name: , desc: , price: , stock: , category: }]

---------------------------------------------------

/api/orders

post - [{id: , userId:, is_purchase: }]

return - [{id: , userId:, is_purchase: }]

---------------------------------------------------

/api/orders

patch - [{is_purchase: }]

return - [{id: , userId:, is_purchase: }]

---------------------------------------------------

/api/orders/:orderID/products

post - [{productId: , price: , quantity: }]

return - [{id: , orderId: , productId: , price: , quantity: }]

---------------------------------------------------

/api/orders/:userId

get 

return - [{id: , userId:, is_purchase: }]


---------------------------------------------------

/api/orders/:id

delete - [{id: , userId:, is_purchase: }]

---------------------------------------------------

/api/order_products/:orderId

get 

return - [{id: , orderId: , productId: , price: , quantity:, }]

----------------------------------------------------

/api/order_products/:productId

patch - [{ quantity: }]

return - [{id: , orderId: , productId: , price: , quantity:, }]

----------------------------------------------------

/api/order_products/:productId

delete



*/
