# Institute Management System

Welcome to the Institute Management System (IMS) repository! This project aims to provide a comprehensive management system for educational institutes, facilitating both students and administrators.


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](./Snaps/Home.png)

The Institute Management System (IMS) is a comprehensive solution designed to streamline administrative tasks and enhance student experience within educational institutes. With a user-friendly interface and robust features, IMS facilitates student registration, course management, and administrative operations. Leveraging modern technologies such as React, NodeJS, ExpressJS, MongoDB, and Firebase, IMS aims to simplify institute management while providing a seamless experience for both students and administrators.


<!-- FEATURES -->
### Features

<!-- BECKEND -->
#### Backend

The backend of the Institute Management System (IMS) is powered by NodeJS and ExpressJS, providing a robust and efficient server-side architecture. MongoDB is used as the database to store and manage data securely. JWT authentication ensures secure access to API endpoints, enhancing the overall security of the system.


##### For Students
* Student Register API: Allows students to register for an account.
* Student Login API: Enables students to log in securely.
* JWT Authentication: Implements token-based authorization for secure access.
* Password Hashing: Utilizes BcryptJS library to hash passwords for enhanced security.
* Logout API: Provides a mechanism for students to log out securely.

##### For Admin
* Login API: Allows administrators to log in to the system.
* Protected APIs: Grants access to privileged actions, including:
   - Update & Delete Students Data from Database.
   - Update & Delete Courses from Database.
* Add New Courses API: Facilitates the addition of new courses to the system.


<!-- FRONTEND -->
#### Frontend

* Material UI: Utilizes Material UI for a modern and intuitive user interface.
* Register & Login Page: Provides easy-to-use interfaces for registration and login.
* Public Route for Courses: Allows everyone to explore available courses offered by the institute.

##### For Students
* Profile Page: Upon login, students are redirected to their profile page, featuring tabs for:
* Profile: Allows students to edit their information.
* Security: Enables students to change their password.
* Courses: Displays enrolled courses for the student.

##### For Admin
* Dashboard Page: After login, administrators are redirected to the protected dashboard, which includes tabs for:
* Students: Provides a list of all students, allowing administrators to edit and delete their information.
* Courses: Lists all courses with options for editing and deletion.
* Add Course: Offers a form for adding new courses to the system.


<!-- FIREBASE -->
#### Firebase Integration

* Image Storage: Utilizes Firebase for storage to save images, enhancing the system's capabilities to handle and display images efficiently.


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

<!-- INSTALLATION -->
### Installation

* Clone the repo
   ```sh
   git clone https://github.com/meet-salman/IMS-React.git
   ```

#### Backend

1. Install NPM packages
   ```sh
   npm install
   ```
2. Enter your Credentials in `.env`
   ```js
   JWT_SECRET = 'YOUR JWT SECRET';
   MONGO_URI = 'YOUR MONGODB URI';
   ```
3. Start Server on Localhost
   ```sh
   npm run dev
   ```

   #### Frontend

   1. Install NPM packages
   ```sh
   npm install
   ```
2. Enter your Firebase Configration in `.env`
   ```js
   VITE_APIKEY = 'API KEY';
   VITE_AUTHDOMAIN = 'AUTH DOMAIN';
   VITE_PROJECTID = 'PROJECT ID';
   VITE_STORAGEBUCKET = "STORAGE BUCKET";
   VITE_MESSAGINGSENDERID = 'MESSAGING SENDER ID';
   VITE_APPID = 'APP ID';
   VITE_MEASUREMENTID = 'MEASUREMENT ID';
   ```
3. Start Server on Localhost
   ```sh
   npm run dev
   ```


<!-- CONTRIBUTING -->
## Contributing

Feel free to explore the repository and contribute to make IMS even better! If you have any questions or suggestions that would make this better, don't hesitate to reach out. Happy coding! 


<!-- CONTACT  -->
## Contact

Salman Ahmed - [@Linkedin](https://www.linkedin.com/in/salman-ahmed-538897291/) - say2salmanahmed@gmail.com