# DESIGN.md

## 1. Idempotency
- Session creation uses MongoDB upsert with unique sessionId.
- Event creation uses a unique compound index (sessionId + eventId).
- Duplicate requests do not create duplicate data.

## 2. Concurrency Handling
- MongoDB atomic operations (findOneAndUpdate with upsert)
- Unique indexes prevent race conditions
- No explicit locks used

## 3. Indexes
- sessionId → unique index (fast lookup)
- (sessionId, eventId) → unique (prevent duplicates)
- (sessionId, timestamp) → for ordered retrieval

## 4. Scaling Strategy
- Stateless NestJS instances
- MongoDB sharding on sessionId
- Separate collections for sessions and events
- Add caching (Redis) for hot sessions

## 5. Out of Scope
- Authentication
- Queues / background jobs
- Rate limiting
- Distributed locking