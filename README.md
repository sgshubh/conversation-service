# Conversation Session Service

## Setup
npm install

## MongoDB
Ensure MongoDB is running locally:
mongodb://localhost:27017

## Environment
Create .env file:
MONGO_URI=mongodb://localhost:27017/conversation

## Run
npm run start:dev

## APIs

### Create Session
POST /sessions

### Add Event
POST /sessions/:sessionId/events

### Get Session
GET /sessions/:sessionId?limit=10&offset=0

### Complete Session
POST /sessions/:sessionId/complete

## Assumptions
- sessionId is provided externally
- eventId is unique per session
- events are immutable