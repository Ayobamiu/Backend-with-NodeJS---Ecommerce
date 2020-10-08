# Overview
This is a backend for an eccomerce platform. It is made public, so you can interact with it. Use [Postman](www.postman.com) to interact with the backend.



# Guides
Create user at https://ecommerce-usman.herokuapp.com/users . This endpoint takes three {key:value} as input  <br />
### `Type` POST <br />
### `inputs` <br />
      - input 1 {name : Type(String)}
      - input 2 {email: Type(email)} 
      - input 3 {password: Type(String)} 
### `response` <br />
      - User 
      -token 

https://ecommerce-usman.herokuapp.com/users returns User details plus `{token: Type(String)}`. Copy the token and use as Authentication Headers <br />
Set `{headers: {Authentication: Bearer <token>}}`

# Endpoints  

### `Enpoint`   <br />
      https://ecommerce-usman.herokuapp.com/products 
 ### `Name` <br />
      Create Product 
### `Type` <br />
      POST 
### `inputs`
     - input 1 `{images : Type(file)}` (multiple)
     - input 2 `{title: Type(String)}`
     - input 3 `{description: Type(String)}`
     - input 4 `{price: Type(Number)}`
           
### `response`   
      -Product
      -User
      
      

### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/products 
  ### `Name` <br />
      Get Products      
 ### `Type` <br />
      GET   
           
### `response`   
      -Products
      -Users
      
      


### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/products/<id> 
 ### `Name` <br />
      Get product by ID 
### `Type` <br />
      GET 
### `inputs`
           
### `response`   
      -Product
      -User


### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/products/<id> 
  ### `Name` <br />
      Delete Product       by ID
 ### `Type` <br />
      Delete   
           
### `response`   
      -Product
      -User
     
### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/products/<id> 
 ### `Name` <br />
      Update product by ID 
### `Type` <br />
      PATCH 
### `inputs`
           
### `response`   
      -Product
      -User
     
 

### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/users 
 ### `Name` <br />
      Create User 
### `Type` <br />
      POST 
### `inputs`
     - input 1 `{name : Type(String)}`
     - input 2 `{email: Type(email)}`
     - input 3 `{password: Type(String)}`
           
### `response`   
      -User
      -token
      
### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/users/login 
 ### `Name` <br />
      Login User 
### `Type` <br />
      POST 
### `inputs`
     - input 1 `{email: Type(email)}`
     - input 2 `{password: Type(String)}`
           
### `response`   
      -User
      -token
  
  
  
### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/users/logout 
 ### `Name` <br />
      LogoutUser 
### `Type` <br />
      POST 
### `inputs`
           
### `response`   
      -User



### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/users/me 
### `Name` <br />
      Get profile 
### `Type` <br />
      POST 
### `inputs`
           
### `response`   
      -User
      

### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/users/me 
### `Name` <br />
      Update profile 
### `Type` <br />
      PATCH 
### `inputs`
     - input 1 `{name : Type(String)}`
     - input 2 `{email: Type(email)}`
     - input 3 `{password: Type(String)}`
           
### `response`   
      -User
      
      
### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/users/me 
### `Name` <br />
      Delete profile 
### `Type` <br />
      DELETE 
### `inputs`
           
### `response`   
      -User
      


### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/users/me/image 
### `Name` <br />
      Upload user image 
### `Type` <br />
      POST 
### `inputs`
     - input 1 `{image: Type(File)}`
        
### `response`   
      -User


### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/users/me/image 
### `Name` <br />
      Update user image 
### `Type` <br />
      PATCH 
### `inputs`
     - input 1 `{image: Type(File)}`
        
### `response`   
      -User
      

### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/users/me/image 
### `Name` <br />
      Delete user image 
### `Type` <br />
      DELETE 
### `inputs`
        
### `response`   
      -User
      

### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/carts/<productID> 
### `Name` <br />
      Add cart by Product ID 
### `Type` <br />
      POST 
### `inputs`
           
### `response`   
      -Cart
      -User
      

### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/carts 
### `Name` <br />
      Get carts 
### `Type` <br />
      GET 
### `inputs`
           
### `response`   
      -Carts
      -Users


### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/carts/<cartID> 
### `Name` <br />
      Delete cart by ID 
### `Type` <br />
      PATCH 
### `inputs`

### `response`   
      -Cart
      -User

### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/orders/<cartID> 
### `Name` <br />
      Add order by Product ID 
### `Type` <br />
      POST 
### `inputs`
           
### `response`   
      -Order
      -User
      

### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/orders 
### `Name` <br />
      Get orders 
### `Type` <br />
      GET 
### `inputs`
           
### `response`   
      -orders
      -Users


### `Enpoint`  <br />
      https://ecommerce-usman.herokuapp.com/orders/<orderID> 
### `Name` <br />
      Delete order by ID 
### `Type` <br />
      PATCH 
### `inputs`

### `response`   
      -order
      -User
      

      
      
 
