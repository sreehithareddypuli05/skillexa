# Skillexa — EdTech & Services Platform

> Full-stack web application for coding education, career training, and professional business services.

**Stack:** Django 5 · Django REST Framework · PostgreSQL · JWT Auth · React 18 · Vite · Tailwind CSS

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Deployment Guide](#deployment-guide)
  - [Deploy Backend on Render](#deploy-backend-on-render)
  - [Deploy Frontend on Vercel](#deploy-frontend-on-vercel)
- [Common Issues & Fixes](#common-issues--fixes)
- [Features](#features)

---

## Project Overview

Skillexa is a full-stack EdTech platform offering:

- **Courses** — C, Python, C++, Java, DSA, Full Stack Dev, Git, Career Guidance, and more
- **Services** — Resume building, LinkedIn optimization, startup consulting, Canva designs, portfolio websites
- **Authentication** — JWT-based register/login with role-based access (Student / Admin)
- **Contact** — Contact form that stores messages in the database
- **Admin Panel** — Django admin for managing all content

The frontend works **with or without the backend running** — all pages use static fallback data so the site is always fully visible even if the API is unavailable.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Django 5.0.4, Django REST Framework 3.15.1 |
| Auth | djangorestframework-simplejwt 5.3.1 |
| Database | PostgreSQL 14+ |
| CORS | django-cors-headers 4.3.1 |
| Static Files | WhiteNoise 6.7.0 |
| Production Server | Gunicorn 22.0.0 |
| Frontend | React 18, Vite 5 |
| Routing | React Router DOM 6 |
| HTTP Client | Axios 1.6 |
| Styling | Tailwind CSS 3.4 |
| Icons | Lucide React |

---

## Project Structure

```
skillexa/
│
├── backend/
│   ├── apps/
│   │   ├── accounts/          # Custom User model, JWT auth
│   │   │   ├── models.py      # User (email login, role: student/admin)
│   │   │   ├── serializers.py # Register, Login, Profile serializers
│   │   │   ├── views.py       # Register, Login, Profile, Logout
│   │   │   ├── urls.py
│   │   │   └── admin.py
│   │   ├── courses/           # Course catalog
│   │   │   ├── models.py      # Course, Category models
│   │   │   ├── serializers.py
│   │   │   ├── views.py       # CourseViewSet with featured/ action
│   │   │   ├── urls.py
│   │   │   ├── admin.py
│   │   │   └── management/commands/seed_data.py  # Seeds all courses + services
│   │   ├── services/          # Professional services
│   │   │   ├── models.py      # Service, ServiceRequest models
│   │   │   ├── serializers.py
│   │   │   ├── views.py       # ServiceViewSet with request_service/ action
│   │   │   ├── urls.py
│   │   │   └── admin.py
│   │   └── contact/           # Contact form submissions
│   │       ├── models.py      # ContactMessage model
│   │       ├── serializers.py
│   │       ├── views.py
│   │       └── urls.py
│   ├── skillexa/
│   │   ├── settings.py        # All configuration (reads from .env)
│   │   ├── urls.py            # Root URL config
│   │   └── wsgi.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx      # Fixed navbar, scroll-aware, mobile menu
    │   │   │   ├── Footer.jsx      # Links, contact, socials
    │   │   │   └── Layout.jsx      # Wraps all pages
    │   │   ├── ui/
    │   │   │   ├── CourseCard.jsx  # Course card (inline styles, always visible)
    │   │   │   └── ServiceCard.jsx # Service card with request modal trigger
    │   │   └── ProtectedRoute.jsx  # Redirects unauthenticated users
    │   ├── context/
    │   │   └── AuthContext.jsx     # Global auth state, login/register/logout
    │   ├── pages/
    │   │   ├── HomePage.jsx        # Hero, stats, courses, services, testimonials, CTA
    │   │   ├── AboutPage.jsx       # Story, mission, values, timeline, why us
    │   │   ├── CoursesPage.jsx     # All 13 courses, search, level filter
    │   │   ├── ServicesPage.jsx    # All 9 services, category filter, request modal
    │   │   ├── ContactPage.jsx     # Contact form with validation + success state
    │   │   ├── SignInPage.jsx      # Email/password login
    │   │   ├── SignUpPage.jsx      # Registration form
    │   │   └── ProfilePage.jsx     # Protected — view/edit profile
    │   ├── services/
    │   │   └── api.js              # Axios instance, interceptors, all API methods
    │   ├── App.jsx                 # All routes defined here
    │   ├── main.jsx
    │   └── index.css               # Tailwind + global component styles
    ├── index.html
    ├── vite.config.js              # Dev server proxies /api → localhost:8000
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## Local Development Setup

### Prerequisites

Make sure these are installed before starting:

- **Python 3.11+** — `python --version`
- **Node.js 18+** — `node --version`
- **PostgreSQL 14+** — `psql --version`
- **pip** and **npm** available in PATH

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/yourusername/skillexa.git
cd skillexa
```

---

### Step 2 — Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install all Python dependencies
pip install -r requirements.txt
```

---

### Step 3 — Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Open .env and fill in your values
nano .env   # or use any text editor
```

Your `.env` file should look like this:

```env
SECRET_KEY=your-random-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=skillexa_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

To generate a secure `SECRET_KEY`, run:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

### Step 4 — Create PostgreSQL Database

```bash
# Log into PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE skillexa_db;

# Exit psql
\q
```

---

### Step 5 — Run Migrations

```bash
# Still inside backend/ with venv active
python manage.py makemigrations accounts
python manage.py makemigrations courses
python manage.py makemigrations services
python manage.py makemigrations contact
python manage.py migrate
```

---

### Step 6 — Seed the Database

This populates all 13 courses and 9 services so the site has real data immediately:

```bash
python manage.py seed_data
```

Expected output:
```
Seeding courses...
  Created/updated 13 courses
Seeding services...
  Created/updated 9 services
✅ Database seeded successfully!
```

---

### Step 7 — Create Admin User

```bash
python manage.py createsuperuser
```

Enter your email, username, and password when prompted.

---

### Step 8 — Start the Backend Server

```bash
python manage.py runserver
```

Backend is now running at: **http://localhost:8000**  
Django Admin Panel: **http://localhost:8000/admin**

---

### Step 9 — Frontend Setup

Open a **new terminal**, then:

```bash
cd frontend

# Install all Node dependencies
npm install

# Create frontend environment file
echo "VITE_API_URL=/api" > .env.local

# Start the development server
npm run dev
```

Frontend is now running at: **http://localhost:5173**

> The Vite dev server automatically proxies all `/api/*` requests to `http://localhost:8000`, so no CORS issues during development.

---

### Both servers must be running at the same time

| Service | URL |
|---------|-----|
| Frontend (React) | http://localhost:5173 |
| Backend (Django) | http://localhost:8000 |
| Admin Panel | http://localhost:8000/admin |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SECRET_KEY` | ✅ Yes | — | Django secret key — change in production |
| `DEBUG` | ✅ Yes | `True` | Set to `False` in production |
| `ALLOWED_HOSTS` | ✅ Yes | `*` | Comma-separated list of allowed hostnames |
| `DB_NAME` | ✅ Yes | `skillexa_db` | PostgreSQL database name |
| `DB_USER` | ✅ Yes | `postgres` | PostgreSQL username |
| `DB_PASSWORD` | ✅ Yes | — | PostgreSQL password |
| `DB_HOST` | ✅ Yes | `localhost` | Database host |
| `DB_PORT` | ✅ Yes | `5432` | Database port |
| `CORS_ALLOWED_ORIGINS` | ✅ Yes | localhost URLs | Comma-separated frontend origins |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ Yes | Base URL for API calls. Use `/api` for local dev (proxied by Vite). Use full URL like `https://your-backend.onrender.com/api` in production. |

---

## API Reference

All endpoints are prefixed with `/api/`.

### Authentication

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register/` | No | Create new account |
| POST | `/api/auth/login/` | No | Login, returns access + refresh tokens |
| POST | `/api/auth/token/refresh/` | No | Get new access token using refresh token |
| GET | `/api/auth/profile/` | Yes | Get current user profile |
| PATCH | `/api/auth/profile/` | Yes | Update profile fields |
| POST | `/api/auth/logout/` | Yes | Logout (invalidates refresh token) |

### Courses

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/courses/` | No | List all active courses (paginated, 12/page) |
| GET | `/api/courses/featured/` | No | Get featured courses only |
| GET | `/api/courses/{slug}/` | No | Get single course details |

Query params for `/api/courses/`: `?level=beginner`, `?search=python`, `?is_featured=true`

### Services

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/services/` | No | List all active services |
| GET | `/api/services/featured/` | No | Get featured services |
| GET | `/api/services/{slug}/` | No | Get single service |
| POST | `/api/services/{slug}/request_service/` | No | Submit a service request |

### Contact

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/contact/` | No | Submit contact message |

### Sample Login Request

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "yourpassword"}'
```

Response:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGci...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGci...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student"
  }
}
```

---

## Deployment Guide

### Deploy Backend on Render

#### 1. Create a PostgreSQL Database on Render

1. Go to [render.com](https://render.com) → **New** → **PostgreSQL**
2. Name it `skillexa-db`, choose the free tier
3. After creation, copy the **Internal Database URL** — you'll need the individual parts (host, port, name, user, password)

#### 2. Create a Web Service on Render

1. Go to **New** → **Web Service**
2. Connect your GitHub repo (push your `backend/` folder or the whole repo)
3. Set **Root Directory** to `backend` (if deploying from mono-repo)
4. Set the following:

| Setting | Value |
|---------|-------|
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate` |
| **Start Command** | `gunicorn skillexa.wsgi:application` |

5. Add these **Environment Variables** in the Render dashboard:

```
SECRET_KEY=<generate a new secret key>
DEBUG=False
ALLOWED_HOSTS=your-app-name.onrender.com
DB_NAME=<from render postgres>
DB_USER=<from render postgres>
DB_PASSWORD=<from render postgres>
DB_HOST=<from render postgres internal host>
DB_PORT=5432
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

6. Click **Create Web Service** — Render will build and deploy automatically

7. After deploy, seed the database by running a one-off job in Render's **Shell**:
```bash
python manage.py seed_data
python manage.py createsuperuser
```

Your backend will be live at: `https://your-app-name.onrender.com`

---

### Deploy Frontend on Vercel

#### 1. Push your frontend to GitHub

Make sure your `frontend/` folder (or full repo) is pushed to GitHub.

#### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Set **Root Directory** to `frontend`
4. Vercel will auto-detect Vite — leave framework as **Vite**

#### 3. Set Environment Variables

In the Vercel project settings → **Environment Variables**:

```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

> ⚠️ Replace `your-backend-name` with your actual Render service URL.

#### 4. Deploy Settings

| Setting | Value |
|---------|-------|
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

5. Click **Deploy** — your site will be live in ~2 minutes

#### 5. Update Backend CORS

Go back to Render and update the `CORS_ALLOWED_ORIGINS` env variable:
```
CORS_ALLOWED_ORIGINS=https://your-actual-vercel-url.vercel.app
```

Then redeploy the backend for the change to take effect.

---

### Post-Deployment Checklist

After both services are deployed, verify everything works:

- [ ] Frontend loads at your Vercel URL
- [ ] Navbar links work (Home, About, Courses, Services, Contact)
- [ ] Course cards are visible on `/courses`
- [ ] Service cards are visible on `/services`
- [ ] Sign Up creates a new account
- [ ] Sign In works and shows user name in navbar
- [ ] Contact form submits successfully
- [ ] Django Admin accessible at `https://your-backend.onrender.com/admin`
- [ ] All 13 courses visible after `seed_data` command

---

## Common Issues & Fixes

### Courses/Services page shows blank cards or nothing

**Cause:** Tailwind CSS classes not processed, or API returning unexpected shape.

**Fix:** The `CourseCard` component uses inline styles, so it always renders. If you forked and modified the card component, ensure it doesn't rely on custom CSS class names like `.card` unless Tailwind is fully built.

---

### API returns 401 Unauthorized

**Cause:** JWT access token expired.

**Fix:** The Axios interceptor in `src/services/api.js` automatically refreshes the token using the refresh token stored in `localStorage`. If both tokens are expired, the user is redirected to `/signin`.

---

### CORS error in browser console

**Cause:** `CORS_ALLOWED_ORIGINS` in backend `.env` doesn't include your frontend URL.

**Fix:**
```env
# Local dev
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Production — use your exact Vercel URL
CORS_ALLOWED_ORIGINS=https://skillexa.vercel.app
```

---

### `django.db.utils.OperationalError` on migrate

**Cause:** PostgreSQL is not running, or DB credentials in `.env` are wrong.

**Fix:**
```bash
# Check PostgreSQL is running
sudo service postgresql start   # Linux
brew services start postgresql  # Mac

# Verify credentials
psql -U postgres -d skillexa_db
```

---

### `ModuleNotFoundError: No module named 'decouple'`

**Cause:** Virtual environment not activated, or `pip install` not run.

**Fix:**
```bash
source venv/bin/activate      # activate venv first
pip install -r requirements.txt
```

---

### Render backend sleeps after 15 minutes (free tier)

**Cause:** Render free tier spins down inactive services.

**Fix:** The first request after sleep takes ~30 seconds. To avoid this, upgrade to a paid Render plan, or use a free uptime monitoring service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 5 minutes.

---

### Frontend shows old cached version after deploy

**Fix:** Hard refresh in browser: **Ctrl + Shift + R** (Windows/Linux) or **Cmd + Shift + R** (Mac).

---

### `seed_data` command fails on Render

**Cause:** Migration hasn't run yet, or services app model is missing.

**Fix:** Make sure the build command runs `python manage.py migrate` before you run `seed_data`. Check Render logs for specific errors.

---

## Features

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, featured courses, services, testimonials, CTA |
| About | `/about` | Story, mission, vision, values, timeline |
| Courses | `/courses` | All 13 courses with search and level filter |
| Services | `/services` | All 9 services with category filter and request modal |
| Contact | `/contact` | Validated form, contact info, social links |
| Sign In | `/signin` | JWT login |
| Sign Up | `/signup` | Registration with JWT response |
| Profile | `/profile` | Protected — view and edit user profile |

### Courses Available

C Programming · Python · C++ · Java · Data Structures & Algorithms · Full Stack Development · Git & GitHub · Project Building · LinkedIn Optimization · Career Guidance · Communication & Personal Branding · Life-Changing Webinars · Internship Guidance

### Services Available

Canva Design Solutions · Video Creation for Ads · Sales & Marketing Support · LinkedIn Optimization · Startup Growth Support · Resume Building · Portfolio Websites · Company Websites · End-to-end Canva Design

---

## License

MIT License — free to use, modify, and distribute.

---

Built with ❤️ for students everywhere. **Skillexa © 2025**