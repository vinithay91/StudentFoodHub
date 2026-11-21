# CampusCart Frontend

React + JavaScript + Vite frontend inspired by the four reference screens:
Home, Registration, Shop, Cart and Checkout.

## Install and run (VS Code terminal)

1. Extract this folder.
2. Open the `campuscart-frontend` folder in VS Code.
3. Open Terminal > New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the URL printed by Vite (normally http://localhost:5173).

## Backend connection

The frontend uses JavaScript `fetch()` and expects these Spring Boot endpoints:

- `POST http://localhost:8080/api/auth/register`
- `POST http://localhost:8080/api/auth/login`

Registration JSON:

```json
{
  "name": "Ravi Kumar",
  "email": "ravi@gmail.com",
  "phone": "9876543210",
  "password": "ravi123",
  "department": "Computer Science",
  "year": 3,
  "collegeName": "ABC Engineering College",
  "address": "Hostel, Room 12"
}
```

Login JSON:

```json
{
  "email": "ravi@gmail.com",
  "password": "ravi123"
}
```

Login response should contain at least the student's name and email, for example:

```json
{
  "message": "Login successful",
  "name": "Ravi Kumar",
  "email": "ravi@gmail.com"
}
```

The frontend reads the API base URL from `.env` if present. To configure it:
- Copy `.env.example` to `.env`
- Set `VITE_API_BASE_URL=http://localhost:8080/api/auth`
- Restart `npm run dev` after changing `.env`.

## Important backend checks

- Spring Boot must be running on port 8080.
- Allow CORS from `http://localhost:5173`.
- Ensure your controller paths and request DTO fields match the payload above.
- If your current backend uses different endpoint names or fields, update `API` in `src/App.jsx` and the request payloads to match.

## What's functional

- Home, registration, login, product search, category filters, cart quantity controls and checkout form.
- Registration and login send requests to Spring Boot.
- Student name is kept in browser localStorage after login.

## Demo limitations

- Products are currently sample data in `src/App.jsx`.
- Cart is held in React state and resets after a page refresh.
- Checkout is a frontend demo. It does not create an order in MySQL, process payments, or call an order endpoint.
- Product photographs are remote Unsplash images and require internet access.
- The current login UI stores a display profile in localStorage; it is not secure server-side session authentication.
