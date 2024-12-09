# Choir Management System

A web-based application for managing choir members, attendance, and donations with user authentication. This project includes:

- **Frontend**: Built with React.
- **Backend**: Two separate servers using Express.js.
  - Main application backend
  - User authentication backend
- **Database**: MySQL, used to store application and authentication data.

---

## Project Structure

- **frontend/**: Contains the React frontend code.
- **CS5200/**: Backend server for the main application and database-related operations.
- **CS5200-Users/**: Backend server for user authentication and related database operations.

---

## Prerequisites

1. **Node.js and npm**  
   Install [Node.js](https://nodejs.org/) (includes npm) to run the frontend and backend servers.

2. **MySQL**  
   - Download and install MySQL:  
     - [Windows Installation Guide](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html)
     - [macOS Installation Guide](https://dev.mysql.com/doc/refman/8.0/en/macos-installation.html)
   - Start the MySQL server.

3. **MySQL Configuration**
   - Create two databases:
     - **choir_db**: For the main application.
     - **Users**: For user authentication.
   - Populate these databases using the SQL dump files:
     - In **CS5200/**, use `database.sql` for the `choir_db` database.
     - In **CS5200-Users/**, use `database.sql` for the `Users` database.

---

## Installation Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/letianqin123/choir.git
```

### 2. Setting Up the Frontend

1. Navigate to the `frontend` folder:
 ```bash
 cd frontend
 ```
2.	Install the required dependencies:
```bash
npm install
```
4.	Start the React development server:
```bash
npm start
```
The frontend application should now be accessible at:
http://localhost:3001

### 3. Setting Up the Backend Servers

#### 3.1 Main Backend (CS5200)
1.	Navigate to the CS5200 folder:
```bash
cd ../CS5200
```
2.	Install the required dependencies:
```bash
npm install
```
3.	Create a .env file in the CS5200 folder with the following content. Replace your-mysql-password with the password you set for MySQL.
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=choir_db
PORT=3000
```


4.	Start the main backend server:
```bash
npm start
```
The server should now be running at:
http://localhost:3000

#### 3.2 User Authentication Backend (CS5200-users)
1.	Navigate to the CS5200-users folder:
```bash
cd ../CS5200-Users
```
3.	Install the required dependencies:
```bash
npm install
```
5.	Create a .env file in the CS5200-users folder with the following content. Replace your-mysql-password with the password you set for MySQL.
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=Users
PORT=3002
```

7.	Start the user authentication backend server:
```bash
npm start
```
The server should now be running at:
http://localhost:3002

### 4. MySQL Database Setup

4.1 Create Databases
1.	Open your MySQL client or command line tool.
2.	Run the following commands to create the required databases:
```bash
CREATE DATABASE choir_db;
CREATE DATABASE Users;
```

4.2 Import SQL Dumps
1.	Populate the choir_db database with the data from the SQL dump in the CS5200 folder:
```bash
mysql -u root -p choir_db < CS5200/database.sql
```
3.	Populate the Users database with the data from the SQL dump in the CS5200-Users folder:
```bash
mysql -u root -p Users < CS5200_Users/db/database.sql
```

## Running the Full Application
1.	Start the frontend server:
```bash
cd frontend
npm start
```
3.	Start the main backend server:
```bash
cd ../CS5200
npm start
```
5.	Start the user authentication backend server:
```bash
cd ../CS5200-Users
npm start
```

6.	Access the application:
-	Frontend: http://localhost:3001
-	Main Backend: http://localhost:3000
-	User Authentication Backend: http://localhost:3002

### Login Credentials

This application includes a login page with role-based access. Use the following default credentials to log in based on the role:

| Role        | Username      | Password      |
|-------------|---------------|---------------|
| Admin       | admin         | admin         |
| Treasurer   | treasurer     | treasurer     |
| Secretary   | secretary     | secretary     |

You can modify these credentials in the `Users` database if needed.
