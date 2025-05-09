# TypeScript CRUD API - Technical Documentation

## Overview
This is a production-ready REST API built with TypeScript and Express.js that implements advanced features like worker threads, cancelable requests, and caching. The API uses Supabase as the main database and Redis for caching.

## Architecture

### Core Features

1. **Multi-Threading Support**
- Uses Node.js cluster module for horizontal scaling
- Implements worker threads for CPU-intensive tasks
- Configurable worker pool size for different operations

2. **Caching System**
- Redis-based caching implementation
- LRU (Least Recently Used) cache for running requests
- Request batching capabilities

3. **Security**
- JWT-based authentication
- Role-based access control (ADMIN/USER roles)
- API key validation
- Request validation middleware
- Uses Helmet for security headers

4. **Error Handling**
- Centralized error handling system
- Custom error classes
- Detailed error messages and logging
- HTTP status code standardization

### Key Components

1. **Data Access Layer**
- Supabase integration for data persistence
- Generic DAO pattern implementation
- Type-safe database operations

2. **Service Layer**
- Business logic separation
- Service dependency injection
- Asynchronous operation handling

3. **Controller Layer**
- Request validation
- Response formatting
- Error delegation
- Route handling

4. **Middleware Layer**
- Authentication validation
- Request cancellation
- API key verification
- Error handling

## Technical Specifications

### Database Structure
- Uses Supabase tables and buckets
- Redis for caching and performance optimization
- Supports multiple data types and relationships

### Authentication Flow
1. User registration with email/password
2. JWT token generation
3. Role-based authorization
4. Token validation middleware

### Worker Thread Implementation
- PDF generation worker
- User data processing worker
- Configurable worker pool
- Task queue management

### Request Cancellation System
- Supports canceling long-running operations
- Request tracking via unique IDs
- Automatic cleanup of canceled requests

## Performance Features

1. **Caching Strategy**
- Redis-based response caching
- In-memory LRU cache
- Batch request handling
- Cache invalidation mechanisms

2. **Optimization Techniques**
- Worker thread pooling
- Request batching
- Response streaming
- Connection pooling

## Security Measures

1. **Authentication**
- JWT token validation
- Password hashing with bcrypt
- Role-based access control

2. **Request Validation**
- Input sanitization
- Data validation
- Schema validation

3. **Security Headers**
- CORS configuration
- Helmet integration
- API key verification

## Error Handling

1. **Error Types**
- Custom error classes
- HTTP status mapping
- Validation errors
- Database errors

2. **Error Response Format**
```typescript
{
  statusCode: number;
  message: string;
  additionalInfo?: {
    route: string;
    method: string;
    ip: string;
    user?: string;
  }
}