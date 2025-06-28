# Django + React E-commerce Web App 🛒

This project is a full-stack e-commerce application built using Django for the backend and React for the frontend. It follows the tutorial by [@Dennis Ivy](https://www.youtube.com/watch?v=ORlsgbdC5aQ) and demonstrates how to build, connect, and deploy a modern web store.

## 🚀 Features

- User authentication (login/register)
- Product listing and detail pages
- Shopping cart and checkout
- Admin dashboard for product management
- REST API with Django REST Framework
- React frontend with Axios and Redux
- Deployment with Docker and Heroku

## 🛠️ Tech Stack

- **Backend:** Django, Django REST Framework
- **Frontend:** React, Redux, Axios
- **Database:** PostgreSQL
- **Deployment:** Docker, Heroku

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:msaeiid/django-react-ecommerce-app.git
   cd django-react-ecommerce-app

⚙️ Backend Setup (/backend)

# Navigate into the backend directory
cd backend

# Create and activate a virtual environment (optional but recommended)
python -m venv env
source env/bin/activate   # On Windows: env\Scripts\activate

# Install Django and Django REST Framework
pip install django djangorestframework

# Start a new Django project
django-admin startproject core .

# Create an app (e.g., store for product management)
python manage.py startapp store

# Run initial migrations and start the server
python manage.py migrate
python manage.py runserver

✅ Your backend server should now be live at http://127.0.0.1:8000/


🌐 Frontend Setup (/frontend)

# From the root, navigate to frontend
cd ../frontend

# Initialize a React app
npx create-react-app .

# Install helpful dependencies (Redux, Axios, etc.)
npm install axios redux react-redux react-router-dom

# Start the React development server
npm start

✅ Your frontend server should now be running at http://localhost:3000/
