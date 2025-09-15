High-Level Architecture
The application is built on a decoupled frontend/backend architecture. The React frontend is a standalone SPA that communicates with the Node.js backend via a REST API. The backend handles all business logic, database interactions, and secure communication with the Shopify API. Data is pushed from Shopify to our backend in real-time using Webhooks.

User: Interacts with the React App.

React App (Netlify): Makes API calls to the Backend for data.

Backend API (Render): Authenticates users, processes requests, and queries the database.

Database (GCP): Stores all tenant, user, and Shopify data.

Shopify: Pushes real-time updates (new orders, etc.) to the Backend API via Webhooks.

<img width="1147" height="802" alt="HIGHlarchitectrue" src="https://github.com/user-attachments/assets/4f42be07-283c-4f30-867b-4d25f7d5b2d9" />

Here is how the Project is divided.

<img width="1781" height="625" alt="part1ingestion" src="https://github.com/user-attachments/assets/814250ce-9791-4770-9b77-102d76bddead" />


<img width="1481" height="692" alt="part2insights" src="https://github.com/user-attachments/assets/ab3cb5c9-4ae2-4728-a957-b2d9d810d232" />
