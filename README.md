# CARSHARING-pet-project
The **CARSHARING** project is a personal learning initiative designed to simulate a car rental service. Users can select a car from the available options, submit a rental request, and have it processed through a database. The request is managed by administrators who contact the user (via phone number) to discuss rental details, such as dates. Once approved, the request is moved to the user's history. While the rental date is pending, users can cancel their request. The plan includes a future feature where the status changes from "pending" to "approved" when the user picks up the car (this logic is not yet implemented but is intended for future development). The project is built with a **Django** backend and an **Angular** frontend, providing a full-stack web application for practice and exploration.

# Prerequisites
Python (version 3.8 or higher)
Node.js and npm (Node.js version 16 or higher recommended)
Git (to clone the repository)

# Technologies Used
#### Backend (Django)

Django: 5.2

#### Frontend (Angular)

Angular: 19.1.0 (core, common, compiler, forms, platform-browser, router, etc.)

#### Database

SQLite (default, managed via Django migrations)

# Setup Instructions

# 1. Clone the Repository

Clone the project to your local machine:

`git clone <repository-url>`

`cd CARSHARING`

# 2. Set Up the Backend (Django)

### a. Navigate to the Backend Directory
`cd django_part`

### b. Create a Virtual Environment
Create and activate a virtual environment to isolate dependencies:

Linux/Mac:python3 -m venv venv

`source venv/bin/activate`

Windows:python -m venv venv

`venv\Scripts\activate`
or `.\venv\Scripts\activate`

### c. Install Python Dependencies
Install the required Python packages:
`pip install -r requirements.txt`

### d. Create a .env File
The project requires a .env file for configuration. Create it in the django_part directory:
`touch .env`

Open the .env file in a text editor and add the following line:
`SECRET_KEY=your-secret-key-here`

To generate a secure SECRET_KEY, you can run the following Python command:
`python -c "import secrets; print(secrets.token_urlsafe(50))"`

Copy the output and paste it into your .env file as the SECRET_KEY.

### e. Apply Database Migrations
Set up the SQLite database by running migrations:
`python manage.py migrate`

### f. Run the Django Development Server
Start the backend server:
`python manage.py runserver`

The backend should now be running at http://127.0.0.1:8000/.


# 3. Set Up the Frontend (Angular)

### a. Navigate to the Frontend Directory
Open a new terminal (or deactivate the virtual environment with deactivate and navigate):
`cd ../angular_part`

### b. Install Node.js Dependencies
Install the required Node.js packages:
`npm install`

### c. Run the Angular Development Server
Start the frontend server:
`ng serve`

The frontend should now be running at http://localhost:4200/.

# 4. Access the Application

Open your browser and go to http://localhost:4200/ to access the frontend.

The frontend will communicate with the backend at http://127.0.0.1:8000/.

To access the Django admin panel, go to http://127.0.0.1:8000/admin/ and log in with a superuser account. Create a superuser if needed: 
`python manage.py createsuperuser`



# Notes

-Ensure both the backend and frontend servers are running simultaneously.

-If you encounter issues with the frontend connecting to the backend, check the API URL configuration in angular_part (e.g., in environment.ts).

-The .env file contains sensitive information like SECRET_KEY. It is ignored by Git for security reasons. Do not use the generated SECRET_KEY in production; always generate a new one for production environments.

# Troubleshooting

-If pip install fails, ensure your virtual environment is activated and you have the correct Python version.

-If ng serve fails, ensure Node.js and npm are installed correctly, and run `npm install` again.

-If the database doesn't work, re-run migrations: `python manage.py migrate`

