# Student Information System

A simple web application for managing and looking up student information, built with Express.js and PostgreSQL.

## Features

- 🔍 **Student Lookup** - Search for students by name or surname
- ➕ **Add Students** - Create new student records with validation
- 💾 **PostgreSQL Database** - Persistent data storage
- 🎨 **Clean UI** - User-friendly interface with custom styling

## Prerequisites

Before running this application, make sure you have:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v10 or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-info-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   
   Create a new database:
   ```sql
   CREATE DATABASE student_info_db;
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DB_USER=your_postgres_username
   DB_HOST=localhost
   DB_NAME=student_info_db
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   PORT=3000
   ```

5. **Initialize the database**
   
   The application will automatically create the required table on first run.

## Running the Application

**Development mode:**
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Looking up a student
1. Navigate to the home page (`/`)
2. Enter the student's name or surname in the search box
3. Click "Find" to view their details

### Adding a new student
1. Click the link to the "Student Information Page" or navigate to `/info`
2. Fill in all required fields:
   - Full Name
   - Surname
   - Specialty
   - Group
   - Year of Study (1-6)
   - Additional Info (optional)
3. Click "Submit" to save the student

## Project Structure

```
student-info-app/
├── bin/
│   └── www              # Server startup script
├── public/
│   ├── javascripts/     # Client-side JavaScript
│   └── stylesheets/     # CSS files
├── routes/
│   ├── index.js         # Home page route
│   ├── info.js          # Student info routes
│   └── users.js         # User routes
├── views/
│   ├── layout.jade      # Base template
│   ├── index.jade       # Home page
│   └── info.jade        # Student info form
├── app.js               # Express app configuration
├── db.js                # Database connection
├── package.json         # Dependencies
└── .env                 # Environment variables (not committed)
```

## Database Schema

**students table:**
- `id` - Serial primary key
- `full_name` - Student's full name
- `short_name` - Nickname or short form
- `surname` - Family name
- `specialty` - Field of study
- `group_name` - Class/group identifier
- `year_of_study` - Current year (1-6)
- `additional_info` - Optional notes
- `created_at` - Timestamp of record creation

## Technologies Used

- **Backend:** Express.js, Node.js
- **Database:** PostgreSQL with pg (node-postgres)
- **Templating:** Jade (Pug)
- **Frontend:** Vanilla JavaScript, CSS
