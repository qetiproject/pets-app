Data for Database:

DATABASE_USER=postgres

DATABASE_PASSWORD=root

DATABASE_NAME=postgres

DATABASE_PORT=5432

PORT=3000

Data for Docker:
container_name: pets_app

host_port: 5432

POSTGRES_PASSWORD: root

Title: Pets Application

Overview:
Animal Application is a robust API-driven platform designed to manage and showcase information about animals available for ownership or sale. Developed using NestJS, TypeScript, and a suite of modern technologies, it offers a seamless experience for both administrators and users interested in adopting or selling animals.

Key Features:

Authentication and Authorization: Secure JWT-based authentication with roles (admin and user) ensures controlled access to functionalities.

Modular Structure: Divided into distinct modules:

Owner Module: Facilitates uploading and management of owner information.
Animal Module: Stores detailed information about animals, including breed, ownership status (owned or available in a store), and uploaded images.
Advanced Filtering and Pagination: Enables users to efficiently search and navigate through extensive lists of animals based on various criteria.

Documentation with Swagger: API endpoints are thoroughly documented using Swagger, providing clear and interactive documentation for developers and users alike.

Database Management with TypeORM: Utilizes TypeORM for seamless integration with databases, ensuring reliable data storage and retrieval through manually written migrations and entities.

Security: Implements bcrypt for secure password hashing, maintaining the integrity of user credentials.

Reactive Programming with RxJS: Leverages RxJS for managing asynchronous data streams, enhancing responsiveness and scalability.
