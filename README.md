Argos BI is a full-stack, multi-tenant web application that connects to Shopify stores, ingests their data in real-time via webhooks, and provides a rich analytics dashboard to visualize key business metrics.

The High-Level Architecture

The application is built on a decoupled frontend/backend architecture. The React frontend is a standalone SPA that communicates with the Node.js backend via a REST API. The backend handles all business logic, database interactions, and secure communication with the Shopify API. Data is pushed from Shopify to our backend in real-time using Webhooks.

<img width="1147" height="802" alt="HIGHlarchitectrue" src="https://github.com/user-attachments/assets/4f42be07-283c-4f30-867b-4d25f7d5b2d9" />

User: Interacts with the Frontend React based App.

React App (Render Static Pages): Makes API calls to the Backend for data.

Backend API (Render): Authenticates users, processes requests, and queries the database.

Database (MySQL on GCP): Stores all tenant, user, and Shopify data.

Shopify: Pushes real-time updates (order creation/updation, customer creation/updation, product creation/updation etc) to the Backend API via Webhooks.


Here is how the Project is divided.

<img width="1781" height="625" alt="part1ingestion" src="https://github.com/user-attachments/assets/814250ce-9791-4770-9b77-102d76bddead" />


<img width="1481" height="692" alt="part2insights" src="https://github.com/user-attachments/assets/ab3cb5c9-4ae2-4728-a957-b2d9d810d232" />



API ENDPOINTS TABLE.

Schema-

tenants  {

  id string pk
  
  shopUrl string
  
  apiToken string
  
  webhookSecret string
  
  createdAt timestamp
  
}


users  {

  id string pk
  
  email string
  
  password string
  
  createdAt timestamp
  
  tenantId string
  
}


customers  {

  id string pk
  
  shopifyCustomerId string
  
  firstName string
  
  lastName string
  
  email string
  
  city string
  
  province string
  
  country string
  
  totalSpent number
  
  ordersCount number
  
  createdAt timestamp
  
  updatedAt timestamp
  
  tenantId string
  
}

products  {
  id string pk
  shopifyProductId string
  title string
  vendor string
  createdAt timestamp
  updatedAt timestamp
  tenantId string
}


orders  {

  id string pk
  
  shopifyOrderId string
  
  shopifyCheckoutId string
  
  totalPrice number
  
  orderNumber number
  
  processedAt timestamp
  createdAt timestamp
  
  updatedAt timestamp
  
  tenantId string
  
  customerId string
  
}


line_items {
  id string pk
  
  quantity number
  
  price number
  
  orderId string
  
  productId string
  
}


# Relationships

users.tenantId > tenants.id

customers.tenantId > tenants.id

products.tenantId > tenants.id

orders.tenantId > tenants.id

orders.customerId > customers.id

line_items.orderId > orders.id

line_items.productId > products.id


<img width="1306" height="806" alt="erdiagram" src="https://github.com/user-attachments/assets/54fd9ddb-de8d-43b8-886f-b51e0545de57" />

