Task Manager
Task Manager is a web application that allows users to schedule their tasks. The backend is built with TypeScript and Node.js, utilizing Prisma for database management. The frontend is developed with Vite, React, and TypeScript.

Features
User authentication and authorization
Task scheduling and management
Responsive user interface
Prerequisites
Before running the application, ensure you have the following installed:

Node.js
TypeScript
Prisma CLI
Vite
Installation
Clone the repository:


Copy code
git clone https://github.com/D3VZ122/V3E.git
Navigate to the project directory:


cd <project-directory>
Install dependencies:


npm install
Migrate the database:


npx prisma migrate dev 
Generate Prisma client:


npx prisma generate
Usage
Backend
Build TypeScript files:


npx tsc -b
Navigate to the dist directory:


cd dist
Run the Node.js server:


node index.js
Frontend
Navigate to the frontend directory:


cd frontend
Start the development server:
npm run dev
Access the application at http://localhost:5173.

Postman Api Documenation json is present in Backend folder.

Configuration
You can configure the backend server and database connection in the .env file. Make sure to create this file in the root directory and add the necessary environment variables.

also add the env file with the backend link with VITE_server_link in .env file in root folder of vite .

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License.

Feel free to customize this template according to your project's specific details and requirements. Let me know if you need further assistance!
