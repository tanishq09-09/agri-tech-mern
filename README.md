# Agri-Tech — Smart Farming Management System (MERN)

A full-stack starter project for farm profiles, crop tracking, soil-health guidance, weather, pest alerts, resource orders, expert consultations, community posts, and admin management.

## Stack
- Frontend: React, React Router, Axios, Bootstrap, Recharts
- Backend: Node.js, Express, MongoDB/Mongoose
- Security: JWT authentication, bcrypt password hashing, farmer/admin roles
- Weather: OpenWeatherMap API (optional key)

## Requirements
- Node.js 18+ recommended (Node 16+ may work depending on package versions)
- npm
- MongoDB local instance or MongoDB Atlas account

## 1. Configure the backend
```bash
cd server
copy .env.example .env
```
On macOS/Linux use `cp .env.example .env`. Edit `.env` and set `MONGO_URI`, `JWT_SECRET`, and optionally `OPENWEATHER_API_KEY`.

Install and start:
```bash
npm install
npm run dev
```
The API runs on `http://localhost:5000`.

## 2. Configure the frontend
Open a second terminal:
```bash
cd client
copy .env.example .env
npm install
npm start
```
On macOS/Linux use `cp .env.example .env`. React runs on `http://localhost:3000`.

## 3. Create an admin
Register normally through the UI. Then, in MongoDB, update that user's role to `admin`, or use the seed script:
```bash
cd server
npm run seed:admin
```
The seed script creates an admin using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env` (change the example values before using).

## Included features
- Register/login with JWT and bcrypt
- Role-based protected routes
- Farmer dashboard with farm/crop summaries
- Farm profile CRUD
- Crop record CRUD
- Weather endpoint with graceful fallback if no API key is configured
- Soil-health input and rule-based guidance (educational, not laboratory diagnosis)
- Pest alerts
- Agricultural resource catalogue and orders
- Expert consultation requests
- Community discussion posts
- Admin overview and user/resource moderation basics
- Responsive layout and simple English/Hindi language toggle for key UI labels
- REST API validation, centralized error handling, and health endpoint

## API overview
- `GET /api/health`
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET/POST/PUT/DELETE /api/farms`
- `GET/POST/PUT/DELETE /api/crops`
- `GET /api/weather?city=Delhi`
- `POST /api/soil/analyze`
- `GET/POST /api/pests`
- `GET /api/resources`, `POST /api/orders`, `GET /api/orders/my`
- `POST /api/consultations`, `GET /api/consultations/my`
- `GET/POST /api/community`
- Admin: `GET /api/admin/overview`, `GET /api/admin/users`, `PATCH /api/admin/users/:id/role`

## Important notes
- Weather needs an OpenWeatherMap API key for live data. Without it, the app returns a clearly labelled demo forecast.
- Soil analysis is a simple rule-based educational guide, not a substitute for a soil lab test or agronomist.
- Pest alerts are sample/general alerts; validate pesticide and treatment advice with local agricultural experts.
- Before production use, add rate limiting, email verification, password reset, stronger audit logging, backups, and deployment-specific security configuration.
