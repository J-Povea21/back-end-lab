# Online Judge Platform - Backend

A scalable backend platform for evaluating algorithmic challenges, built with Clean Architecture principles using NestJS, PostgreSQL, Redis, and Docker.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Current Limitations](#current-limitations)
- [Future Roadmap](#future-roadmap)
- [Development](#development)

## 🎯 Overview

This platform allows:
- **Students** to submit code solutions to algorithmic challenges
- **Professors** to create courses and challenges with test cases
- **Automatic evaluation** of submissions using isolated Docker containers
- **Real-time processing** through Redis-backed job queues

Similar to platforms like LeetCode, HackerRank, and Codeforces, but designed for academic courses.

## 🏗️ Architecture

### Clean Architecture Layers
```
┌─────────────────────────────────────────────────────────┐
│                     Interface Layer                      │
│                  (HTTP Controllers)                      │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  Application Layer                       │
│              (Use Cases + DTOs)                         │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                    Domain Layer                          │
│         (Entities + Business Logic)                     │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                Infrastructure Layer                      │
│    (Prisma, BullMQ, Workers, External Services)         │
└─────────────────────────────────────────────────────────┘
```

### System Flow
```
┌─────────┐     1. Submit Code      ┌─────────────┐
│ Student │ ───────────────────────> │   API       │
└─────────┘                          │  (NestJS)   │
                                     └──────┬──────┘
                                            │ 2. Save to DB
                                            │    & Queue
                                     ┌──────▼──────┐
                                     │ PostgreSQL  │
                                     └─────────────┘
                                     ┌──────▼──────┐
                                     │   Redis     │
                                     │   Queue     │
                                     └──────┬──────┘
                                            │ 3. Worker picks job
                                     ┌──────▼──────┐
                                     │   Worker    │
                                     │  (BullMQ)   │
                                     └──────┬──────┘
                                            │ 4. Process & Update
                                     ┌──────▼──────┐
                                     │ PostgreSQL  │
                                     └─────────────┘
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | NestJS (Node.js) |
| **Database** | PostgreSQL 16 |
| **Queue** | Redis + BullMQ |
| **ORM** | Prisma |
| **Validation** | class-validator |
| **Container** | Docker + Docker Compose |
| **Language** | TypeScript |

## 📁 Project Structure
```
src/
├── submissions/
│   ├── core/
│   │   ├── domain/
│   │   │   └── submission.entity.ts          # Domain entity with business logic
│   │   └── application/
│   │       ├── dto/
│   │       │   └── create-submission.dto.ts  # Data Transfer Objects
│   │       └── use-cases/
│   │           ├── create-submission.use-case.ts
│   │           └── process-submission.use-case.ts
│   ├── infrastructure/
│   │   ├── ports/
│   │   │   ├── job-queue.port.ts            # Queue interface
│   │   │   └── submission-repository.port.ts # Repository interface
│   │   ├── adapters/
│   │   │   ├── bullmq.adapter.ts            # BullMQ implementation
│   │   │   └── prisma-submission.repository.ts # Prisma implementation
│   │   └── workers/
│   │       └── submission.worker.ts          # Queue worker
│   ├── interface/
│   │   └── http/
│   │       └── submission.controller.ts      # REST endpoints
│   └── submission.module.ts
├── prisma/
│   └── schema.prisma                         # Database schema
├── app.module.ts
├── main.ts                                   # API entry point
└── worker.ts                                 # Worker entry point (future)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone <repository-url>
   cd back-end-lab
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file:
```env
   # Database
   DATABASE_URL="postgresql://user:pass@localhost:5434/clean_nest"

   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379

   # App
   NODE_ENV=development
   PORT=3000
```

4. **Start services with Docker Compose**
```bash
   docker-compose up -d
```

   This will start:
   - PostgreSQL (port 5434)
   - Redis (port 6379)
   - API (port 3000)
   - Migrations (runs once)

5. **Verify everything is running**
```bash
   # Check service status
   docker-compose ps

   # Check logs
   docker-compose logs -f

   # Test API
   curl http://localhost:3000/health
```

### Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (if not using Docker)
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

## 📡 API Endpoints

### Health Check
```http
GET /health
```

### Submissions

#### Create Submission
```http
POST /submissions
Content-Type: application/json

{
  "challengeId": 1,
  "courseId": "uuid",
  "code": "print('Hello World')",
  "language": "python"
}
```

**Response:**
```json
{
  "success": true,
  "submissionId": "uuid",
  "message": "Submission created and queued for processing"
}
```

#### Get Submission Status
```http
GET /submissions/:id
```

**Response:**
```json
{
  "id": "uuid",
  "status": "COMPLETED",
  "verdict": "ACCEPTED",
  "score": 100,
  "executionTime": 150,
  "memoryUsed": 32,
  "createdAt": "2025-10-26T10:00:00Z"
}
```

### Submission Statuses

| Status | Description |
|--------|-------------|
| `QUEUED` | Waiting to be processed |
| `RUNNING` | Currently being executed |
| `COMPLETED` | Finished processing |
| `FAILED` | System error occurred |

### Verdicts

| Verdict | Description |
|---------|-------------|
| `ACCEPTED` | All test cases passed ✅ |
| `WRONG_ANSWER` | Incorrect output ❌ |
| `TIME_LIMIT_EXCEEDED` | Execution too slow ⏱️ |
| `MEMORY_LIMIT_EXCEEDED` | Used too much memory 💾 |
| `RUNTIME_ERROR` | Crashed during execution 💥 |
| `COMPILATION_ERROR` | Code didn't compile 🔨 |

## ⚠️ Current Limitations (Deliverable #1)

This is an MVP focusing on architecture and infrastructure. Current limitations:

### 1. **Single Worker for All Languages**
- Currently, one worker process handles submissions for all languages (Python, Java, C++, Node.js)
- In production, each language should have dedicated worker pools
- **Future:** Separate workers per language for independent scaling

### 2. **Stub Processing**
- Workers currently simulate processing with dummy results
- No actual code execution in Docker containers yet
- **Future:** Implement isolated runners with real compilation/execution

### 3. **No Authentication**
- `userId` is hardcoded for testing
- No JWT authentication implemented
- **Future:** Module 1 - JWT-based auth with roles (STUDENT, PROFESSOR, ADMIN)

### 4. **No Test Case Validation**
- Submissions are marked as ACCEPTED without running test cases
- **Future:** Compare submission output against expected `.out` files

### 5. **Missing Modules**
- Courses management not implemented
- Challenge CRUD not implemented
- Leaderboard not implemented
- Evaluations/Exams not implemented

## 🗺️ Future Roadmap

### Deliverable #2 (Next Steps)

1. **Separate Workers by Language**
```bash
   docker-compose up --scale worker_python=3 --scale worker_java=2
```

2. **Implement Docker Runners**
   - Execute code in isolated containers with resource limits
   - Support Python, Java, C++, Node.js
   - Enforce time and memory limits

3. **Test Case Execution**
   - Run submissions against `.in` files
   - Compare output with `.out` files
   - Calculate scores and verdicts

4. **Additional Modules**
   - Authentication & Authorization (JWT)
   - Courses management
   - Challenge CRUD
   - Leaderboard
   - Observability (logs, metrics)

## 💻 Development

### Running Locally (without Docker)

1. **Start PostgreSQL and Redis**
```bash
   docker-compose up db redis -d
```

2. **Run the API**
```bash
   npm run start:dev
```

3. **Watch logs**
```bash
   # API logs
   npm run start:dev

   # Worker logs (when separated)
   npm run start:worker
```

### Useful Commands
```bash
# Rebuild and restart services
docker-compose up --build

# Scale workers (future)
docker-compose up --scale worker_python=5

# View logs
docker-compose logs -f api
docker-compose logs -f worker_python

# Stop all services
docker-compose down

# Stop and remove volumes (reset database)
docker-compose down -v

# Run Prisma Studio (database GUI)
npx prisma studio

# Format code
npm run format

# Run linter
npm run lint
```

### Database Management
```bash
# Create new migration
npx prisma migrate dev --name add_new_feature

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# View database in browser
npx prisma studio
```

## 🧪 Testing
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📊 Monitoring

### Redis Queue Dashboard (Optional)

Install Bull Board for visual queue monitoring:
```bash
npm install @bull-board/api @bull-board/nestjs @bull-board/express
```

Access at: `http://localhost:3000/admin/queues`

### Health Checks
```bash
# API health
curl http://localhost:3000/health

# Database connection
docker-compose exec db pg_isready -U user -d clean_nest

# Redis connection
docker-compose exec redis redis-cli ping
```

## 🤝 Contributing

This is an academic project for the Backend Development course at Universidad del Norte.

**Team Members:**
- [Your Name]
- [Team Member 2]
- [Team Member 3]

## 📝 License

This project is part of an academic assignment.

---

**Course:** Desarrollo de Aplicaciones Backend  
**Institution:** Universidad del Norte  
**Semester:** 2025-1