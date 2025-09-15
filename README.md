# 📊 Argos BI – Shopify Insights Dashboard

> **Note:** Since Render takes time to scale up the website, it might take a while to log in. As this project is user-authenticated, I’m providing the username and password of the store manager here for recruiter review purposes. Please use these credentials to log into the Shopify Insights dashboard while reviewing this project. [Given at the end of this readme]

---

## 🚀 Project Overview

<i>**ShopifyInsights.com**</i> or I would call it as **Argos BI** is a full-stack, multi-tenant web application that connects to Shopify stores, ingests their data in real-time via webhooks, and provides a rich analytics dashboard to visualize key business metrics.

Live Project: https://shopifyinsights.onrender.com

Backend API: https://shopify-ingnins-backend.onrender.com

Backend Repo: https://github.com/sohail-RM2004/shopify-ingnins-backend

Demo Video: https://drive.google.com/file/d/1PGl5o7gW4M_hNCYYnsHnNGCNQeBWl_KK/view


---

## ✅ Core Features

- **Secure Multi-Tenant Authentication**  
  Onboard multiple Shopify stores with isolated data and user accounts.

- **Real-Time Data Ingestion**  
  Sync orders, products, and customers using Shopify Webhooks.

- **Comprehensive Insights Dashboard**  
  Interactive charts and KPIs to monitor business health.

- **Dynamic Date Range Filtering**  
  Filter metrics and charts using a global date picker.

- **Rich Data Visualizations**  
  Includes AOV, CLV, customer segmentation, time-series charts, and more.

- **Advanced Analytics**  
  Tracks top-selling products by revenue and identifies abandoned checkouts.

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, Recharts, Axios, react-datepicker  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL on Google Cloud Platform  
- **ORM:** Prisma  
- **Authentication:** JWT (JSON Web Tokens)  
- **Deployment:** Backend on Render, Frontend on Netlify, Database on GCP

---

## 📐 High-Level Architecture

The application follows a decoupled architecture where the frontend and backend communicate via REST APIs. Shopify pushes updates to the backend through webhooks, while users interact with a React-based interface.

![High-Level Architecture](https://github.com/user-attachments/assets/4f42be07-283c-4f30-867b-4d25f7d5b2d9)

### Flow:
- **User** → React Frontend → API Requests → Node.js Backend → MySQL on GCP  
- **Shopify** → Webhooks → Node.js Backend → Database updates

---

## 🔍 Project Division

### Data Ingestion Layer
![Part 1 - Ingestion](https://github.com/user-attachments/assets/814250ce-9791-4770-9b77-102d76bddead)

### Insights Dashboard
![Part 2 - Insights](https://github.com/user-attachments/assets/ab3cb5c9-4ae2-4728-a957-b2d9d810d232)

---

## 📂 API Endpoints

| Endpoint                        | Method | Description                                      |
| -------------------------------- | ------ | ------------------------------------------------ |
| `/api/auth/register`            | POST   | Register a new tenant and user                   |
| `/api/auth/login`               | POST   | Authenticate a user and return a JWT             |
| `/api/insights/stats`           | GET    | Get key stats (revenue, orders) for a date range  |
| `/api/insights/orders-over-time`| GET    | Get order count grouped by date for charts       |
| `/api/insights/top-customers`   | GET    | Get top 5 customers by all-time spend            |
| `/api/insights/top-products`    | GET    | Get top 5 products by revenue                   |
| `/api/insights/revenue-by-region`| GET   | Aggregate revenue by country                    |
| `/api/insights/customer-segments`| GET   | Get counts of new vs. returning customers        |
| `/api/webhooks/shopify`        | POST   | Public endpoint for all Shopify webhooks         |

---

## 🗃 Database Schema

### tenants
- `id` (PK)  
- `shopUrl`  
- `apiToken`  
- `webhookSecret`  
- `createdAt`

### users
- `id` (PK)  
- `email`  
- `password`  
- `createdAt`  
- `tenantId` (FK)

### customers
- `id` (PK)  
- `shopifyCustomerId`  
- `firstName`  
- `lastName`  
- `email`  
- `city`  
- `province`  
- `country`  
- `totalSpent`  
- `ordersCount`  
- `createdAt`  
- `updatedAt`  
- `tenantId` (FK)

### products
- `id` (PK)  
- `shopifyProductId`  
- `title`  
- `vendor`  
- `createdAt`  
- `updatedAt`  
- `tenantId` (FK)

### orders
- `id` (PK)  
- `shopifyOrderId`  
- `shopifyCheckoutId`  
- `totalPrice`  
- `orderNumber`  
- `processedAt`  
- `createdAt`  
- `updatedAt`  
- `tenantId` (FK)  
- `customerId` (FK)

### line_items
- `id` (PK)  
- `quantity`  
- `price`  
- `orderId` (FK)  
- `productId` (FK)

### Relationships
- `users.tenantId` → `tenants.id`  
- `customers.tenantId` → `tenants.id`  
- `products.tenantId` → `tenants.id`  
- `orders.tenantId` → `tenants.id`  
- `orders.customerId` → `customers.id`  
- `line_items.orderId` → `orders.id`  
- `line_items.productId` → `products.id`

![ER Diagram](https://github.com/user-attachments/assets/54fd9ddb-de8d-43b8-886f-b51e0545de57)

---

## ⚙ Assumptions & Limitations

### ✅ Assumptions
- Each tenant is managed by a single user account.
- Webhook security is validated using Shopify’s shared secret.

### ⚠ Limitations
- Date range filtering applies mainly to order-based metrics.
- Metrics like “Top Customers” reflect lifetime values and are not date-filtered.

---

## 📈 Next Steps to Productionize

- **Enhanced Security:** Encrypt sensitive data like API tokens and implement rate limiting.
- **Scalability:** Use Redis for caching and introduce background job queues for webhook processing.
- **User Management:** Allow multiple users with role-based permissions under a single tenant.
- **Robust Testing:** Add unit and integration tests for business logic and API endpoints.

---

## 📂 Screenshots

- ✅ High-Level Architecture  
- ✅ Data Ingestion Layer  
- ✅ Insights Layers
- ✅ ER Diagram

---
## 🛠 Project Setup

### 📥 Clone the Repository

```bash
git clone [repo-url]
cd [project-folder]
```
🖥 Setup Backend
Navigate to the backend folder:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```

Create a .env file and add the following environment variables:

env
```
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
```
Run database migrations:

```bash
npx prisma migrate dev
```
Start the backend server:
```bash
npm start
```
🌐 Setup Frontend
Navigate to the frontend folder:
```bash
cd ../frontend
```
Install dependencies:

```bash
npm install
```
Create a .env.local file and add the API base URL:
env
```
VITE_API_BASE_URL="http://localhost:5001/api"
```

Start the development server:
```bash
npm run dev
```
---

username - ```foodstoreman@example.com```

password - ```foodstore12```

