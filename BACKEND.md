# NextGo Backend Implementation

This document describes the backend implementation for the NextGo tourism website.

## Technology Stack

- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs

## Database Schema

The database consists of the following models:

1. **User**: Stores user information (name, email, password, role)
2. **Tour**: Stores tour information (title, description, price, etc.)
3. **Order**: Stores booking information (user, tour, booking details)
4. **Review**: Stores user reviews for tours
5. **ItineraryDay**: Stores daily itinerary information for tours

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user information

### Tours

- `GET /api/tours` - Get all tours
- `GET /api/tours/[id]` - Get a specific tour

### Orders

- `POST /api/orders` - Create a new order (requires authentication)
- `GET /api/orders` - Get orders (user-specific or all for admin)
- `GET /api/orders/[id]` - Get a specific order
- `PUT /api/orders/[id]` - Update order status (admin only)

## Authentication Flow

1. User registers or logs in
2. Server returns a JWT token
3. Client stores token in localStorage
4. Client includes token in Authorization header for protected requests
5. Server verifies token and processes request

## Order Flow

1. User selects a tour and fills booking form
2. User must be authenticated to book
3. Booking creates an order in the database
4. User can view their orders in the dashboard
5. Admin can view and manage all orders

## Running the Backend

The backend is integrated with the Next.js frontend and runs as part of the Next.js application.

1. Make sure PostgreSQL is running
2. Set up the database connection in `.env`
3. Run `npx prisma migrate dev` to set up the database
4. Run `npm run dev` to start the development server

## Testing

API endpoints can be tested with the provided shell scripts:

- `test-api.sh` - Tests basic API endpoints
- `test-order.sh` - Tests order creation
- `test-get-orders.sh` - Tests getting orders
- `test-get-order.sh` - Tests getting a specific order
