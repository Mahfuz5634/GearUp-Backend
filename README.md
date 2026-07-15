# GearUp 🏋️

**Rent Sports & Outdoor Gear Instantly** — A backend API for sports and outdoor equipment rental service.

## Overview

GearUp is a full-featured rental platform backend built with **Express.js**, **TypeScript**, and **Prisma ORM**. It enables three distinct user roles to interact: **Customers** browse and rent gear, **Providers** manage inventory and fulfill orders, and **Admins** oversee the entire platform.

### Roles

| Role | Key Permissions |
|------|----------------|
| 🧑‍🤝‍🧑 **Customer** | Browse gear, place rental orders, make payments, track status, leave reviews |
| 🏪 **Provider** | Manage gear inventory, view incoming orders, update rental status |
| 🛡️ **Admin** | Manage users (suspend/activate), view all gear and rentals, manage categories |

> Users select their role during registration (CUSTOMER or PROVIDER). Admin accounts are created via seeding.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** / **Express 5** | HTTP server & routing |
| **TypeScript** | Type safety |
| **Prisma 7** (PostgreSQL) | ORM, migrations, data modeling |
| **Zod** | Request validation |
| **JWT** (jsonwebtoken) | Authentication & role-based authorization |
| **bcrypt** | Password hashing |
| **Stripe** | Payment processing (Checkout Sessions + Webhooks) |

---

## Getting Started

### Prerequisites

- Node.js >= 20
- PostgreSQL database (or Prisma Data Proxy)
- Stripe account (for payments)

### Installation

```bash
git clone <repository-url>
cd gearup-backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@host:5432/gearup?sslmode=require"
JWT_ACCESS_SECRET="your_super_secret_key"
JWT_ACCESS_EXPIRES_IN="30d"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."          # Optional — only needed for webhook verification
FRONTEND_URL="http://localhost:5173"        # Redirect after Stripe Checkout
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database (admin, categories, providers, gear)
npm run seed
```

### Start Development Server

```bash
npm run dev
```

Server starts at `http://localhost:5000`.

---

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register as CUSTOMER or PROVIDER |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/auth/me` | Any | Get current authenticated user |

**Register Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "role": "CUSTOMER" },
    "accessToken": "eyJhbGci..."
  }
}
```

---

### Gear (Public)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/gear` | — | List all available gear with filters |
| GET | `/api/gear/:id` | — | Get single gear details with reviews |

**Query Parameters** (`GET /api/gear`):
| Param | Type | Example |
|-------|------|---------|
| `category` | string | `Cycling` |
| `brand` | string | `Trek` |
| `minPrice` | number | `10` |
| `maxPrice` | number | `100` |

---

### Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/categories` | — | List all gear categories |
| POST | `/api/categories` | — | Create new category |

---

### Rental Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/rentals` | Customer | Place a new rental order |
| GET | `/api/rentals` | Customer | Get your rental orders |
| GET | `/api/rentals/:id` | Customer/Provider | Get order details |
| PATCH | `/api/rentals/:id/cancel` | Customer | Cancel your order (only if PLACED) |

**Create Rental Request Body:**
```json
{
  "gearId": "uuid",
  "startDate": "2026-07-20",
  "endDate": "2026-07-25"
}
```

**Order Status Lifecycle:**
```
PLACED → CONFIRMED → PAID → PICKED_UP → RETURNED
   ↓         ↓
CANCELLED  CANCELLED
```

---

### Provider Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/provider/gear` | Provider | Add gear to inventory |
| PUT | `/api/provider/gear/:id` | Provider | Update gear listing |
| DELETE | `/api/provider/gear/:id` | Provider | Soft-delete gear |
| GET | `/api/provider/gear` | Provider | List your gear |
| GET | `/api/provider/orders` | Provider | View incoming rental orders |
| PATCH | `/api/provider/orders/:id` | Provider | Update order status |

**Update Order Status Request Body:**
```json
{
  "status": "CONFIRMED"
}
```

Valid status transitions for providers: `PLACED → CONFIRMED`, `CONFIRMED → CANCELLED`, `PAID → PICKED_UP`, `PICKED_UP → RETURNED`.

---

### Payments (Stripe)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/payments/create` | Customer | Create Stripe Checkout Session |
| POST | `/api/payments/confirm` | Customer | Verify & confirm payment manually |
| POST | `/api/payments/webhook` | Stripe | Stripe webhook handler (raw body) |
| GET | `/api/payments` | Customer/Provider | Get payment history |
| GET | `/api/payments/:id` | Customer/Provider | Get payment details |

**Create Payment Request:**
```json
{
  "rentalOrderId": "uuid"
}
```

**Create Payment Response:**
```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.stripe.com/pay/...",
    "transactionId": "cs_test_...",
    "paymentId": "uuid"
  }
}
```

> **Flow:** Customer opens the `checkoutUrl` in a browser, completes payment on Stripe's hosted page. The webhook (`/api/payments/webhook`) automatically updates the order to `PAID`. Alternatively, call `/api/payments/confirm` with the `transactionId` to verify manually.

**Confirm Payment Request:**
```json
{
  "transactionId": "cs_test_..."
}
```

---

### Reviews

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/reviews` | Customer | Leave a review (after gear is returned) |

**Request Body:**
```json
{
  "gearId": "uuid",
  "rating": 5,
  "comment": "Great bike, well maintained!"
}
```

> Reviews can only be submitted for gear the customer has rented and returned. Duplicate reviews are blocked.

---

### Admin

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/users` | Admin | View all users |
| PATCH | `/api/admin/users/:id` | Admin | Suspend or activate a user |
| GET | `/api/admin/gear` | Admin | View all gear listings |
| GET | `/api/admin/rentals` | Admin | View all rental orders |

**Update User Status Request:**
```json
{
  "status": "SUSPENDED"
}
```

> Admin users cannot be suspended.

---

## Database Schema

### Entity Relationship

```
User ──┬── GearItem[]    (provider relation)
       ├── RentalOrder[]  (customer relation)
       └── Review[]       (customer relation)

Category ──┬── GearItem[]

GearItem ──┬── RentalOrder[]
           ├── Review[]
           └── Category

RentalOrder ──┬── Payment (1:1)

Payment ──┬── RentalOrder

Review ──┬── GearItem
         └── User
```

### Enums

**Role:** `CUSTOMER`, `PROVIDER`, `ADMIN`

**OrderStatus:** `PLACED`, `CONFIRMED`, `PAID`, `PICKED_UP`, `RETURNED`, `CANCELLED`

**PaymentStatus:** `PENDING`, `COMPLETED`, `FAILED`

---

## Error Handling

All errors follow a consistent JSON structure:

```json
{
  "success": false,
  "message": "Human-readable error description",
  "statusCode": 400
}
```

| Status | Meaning |
|--------|---------|
| 400 | Validation failure or bad request |
| 401 | Missing or invalid authentication |
| 403 | Insufficient permissions |
| 404 | Resource not found |
| 409 | Duplicate resource conflict |
| 500 | Internal server error |

---

## Seed Data

Run `npm run seed` to populate the database with:

| User | Email | Password | Role |
|------|-------|----------|------|
| Admin | `admin@gearup.com` | `admin123` | ADMIN |
| Provider | `provider@gearup.com` | `provider123` | PROVIDER |
| Customer | `customer@gearup.com` | `customer123` | CUSTOMER |

Seeded categories: Cycling, Camping, Fitness, Water Sports, Winter Sports, Team Sports

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run seed` | Seed database with sample data |
| `npx prisma studio` | Open Prisma Studio (DB GUI) |
| `npx prisma migrate dev` | Run database migrations |

---

## Testing with Postman

A Postman collection (`GearUp-API.postman_collection.json`) is included in the project root. Import it into Postman or Thunder Client to test all endpoints.

**Authentication flow:**
1. Call `POST /api/auth/register` or `/api/auth/login`
2. Copy the `accessToken` from the response
3. Set it in the `Authorization` header as `Bearer <token>`

---

## Stripe Testing

1. Create a Checkout Session via `POST /api/payments/create`
2. Open the returned `checkoutUrl` in a browser
3. Use Stripe test card: `4242 4242 4242 4242` (any future date, any CVC)
4. For webhook testing, use the [Stripe CLI](https://stripe.com/docs/stripe-cli):
   ```bash
   stripe listen --forward-to localhost:5000/api/payments/webhook
   ```
5. Or skip the webhook and call `POST /api/payments/confirm` with the `transactionId`

---

## Project Structure

```
src/
├── app.ts                         # Express app setup
├── server.ts                      # Entry point
├── config/config.ts               # Environment config
├── errors/AppError.ts             # Custom error class
├── lib/prisma.ts                  # Prisma client singleton
├── middlewares/
│   ├── auth.ts                    # JWT + role verification
│   ├── globalErrorHandler.ts      # Centralized error handler
│   ├── notFound.ts                # 404 handler
│   └── validateRequest.ts         # Zod schema validation
├── utils/
│   ├── catchAsync.ts              # Async error wrapper
│   └── sendResponse.ts            # Standardized response helper
└── modules/
    ├── auth/                      # Registration, login, profile
    ├── gear/                      # Public gear listing & details
    ├── category/                  # Category CRUD
    ├── rental/                    # Customer rental orders
    ├── payment/                   # Stripe Checkout & webhooks
    ├── review/                    # Customer reviews
    ├── provider/                  # Provider inventory & orders
    └── admin/                     # Admin user/gear/rental management
prisma/
├── schema.prisma                  # Data model
├── seed.ts                        # Database seeder
└── migrations/                    # Migration history
```
