# solarmarket
  
### Getting Started

To get started with solarmarket locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Yasitha-sgx/Solar-MarketApp.git
   ```
   
3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

- Create a .env file in the root directory.
- Define the following variables:
  
  ```.env
  PORT=5000
  MONGO_URI=
  JWT_SECRET=
  MAIL_USER=your email address
  MAIL_PASS=email app password
  PUBLIC_FRONTEND=frontend url
  ```

- Create a .env file in the client directory.
- Define the following variables:
  
  ```.env
  VITE_SERVER_URL=
  VITE_TINY_API=tiny api
  ```

4. Run the development server:
   
   Open two new terminals and type the following commands in the root directory:

   ```bash
   npm run server
   ```

      ```bash
   npm run client
   ```
      
6. Open http://localhost:5173 in your browser to view the application.
