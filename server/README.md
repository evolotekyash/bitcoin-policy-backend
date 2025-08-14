# Bitcoin Policy Initiative - Backend API

Backend API server for the Bitcoin Policy Initiative website. Handles contact form submissions and newsletter signups with MongoDB Atlas integration.

## Features

- Contact form submissions
- Newsletter signups
- Unified policy signup tracking
- MongoDB Atlas integration
- Admin dashboard data endpoints
- Real-time statistics

## Environment Variables

```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=8080
```

## API Endpoints

### Contact Forms
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions
- `DELETE /api/contact` - Clear all contact submissions

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - Get all newsletter signups
- `DELETE /api/newsletter` - Clear all newsletter signups

### Policy Signups (Unified)
- `GET /api/policy-signups` - Get all signups with filtering
- `GET /api/policy-signups/stats` - Get signup statistics
- `DELETE /api/policy-signups` - Delete signups
- `PATCH /api/policy-signups/:id` - Update signup status

### Health Check
- `GET /api/health` - Server health check

## Deployment

This backend is configured for Railway deployment with MongoDB Atlas.
