# 🚀 FRIX.ai - AI-Moderated Real-Time Debate Arena

FRIX is a high-performance, real-time social platform engineered to structure online debates. Instead of chaotic comment sections, FRIX provides a "Twitch-style" arena where users engage in live debates, while an **Autonomous AI Umpire** moderates, fact-checks, and scores the arguments in milliseconds.

## 🔥 Key Features
* **AI Umpire:** Powered by LLaMA-3 (via Groq LPUs), the AI analyzes chat logic, detects fallacies, and awards scores in < 100ms.
* **Tug-of-War UI:** A dynamic, physics-based bar that shifts in real-time based on the AI's logic scoring and crowd voting.
* **Microservice Architecture:** Golang handles massive WebSocket concurrency, while Next.js handles the front-end rendering and database transactions.
* **ELO Ranking System:** Uses the Arpad Elo mathematical formula (similar to Chess.com) to rank debaters based on their win/loss record.

## 🛠️ Tech Stack
* **Backend Engine:** Golang, Gorilla WebSockets, Goroutines/Channels
* **Frontend:** Next.js (React), TailwindCSS, Framer Motion
* **Authentication:** Clerk v5
* **Database:** Neon (Serverless PostgreSQL), Prisma ORM
* **AI Processing:** Groq API (LLaMA-3.1 8B Instant)

---

## 🏗️ Architecture & Logic Guide for Collaborators

### 1. The Golang Concurrency Engine (`frix-backend`)
Standard Node.js WebSockets block the event loop under heavy load. We built the engine in Go. 
* **Room Management:** We use thread-safe Hash Maps (`map[string]*Room`) locked by `sync.Mutex`. Finding and isolating a debate room is instantly `O(1)`.
* **Channels:** Data moves between clients using Go Channels (`Broadcast`, `Register`). This prevents memory leaks and race conditions when 2,500+ users connect simultaneously.
* **Async AI:** When a JSON message is received, Go instantly broadcasts it to the room, while simultaneously spawning a background `Goroutine` to call the Groq AI API. This ensures zero latency for the end user.

### 2. The Next.js UI & Database (`frix-ui`)
* **Dynamic Routing:** `src/app/arena/[id]` allows infinite debate rooms. The Next.js URL is passed directly to the Go WebSocket connection string.
* **Clerk Middleware:** `proxy.ts` acts as a route interceptor, ensuring only authenticated users can trigger database writes or join arenas.
* **The DB Connection:** `lib/prisma.ts` utilizes a singleton pattern to prevent Next.js hot-reloads from exhausting the PostgreSQL connection pool.

---

## 💻 Local Development Setup

To run FRIX locally, you need to spin up both the Go Engine and the Next.js UI.

### Prerequisites
* [Go (1.20+)](https://go.dev/dl/) installed.
* [Node.js (18+)](https://nodejs.org/) installed.

### Step 1: Start the Golang Backend
```bash
cd frix-backend
go mod tidy
