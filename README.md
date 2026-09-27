# Event RSVP Tracker

A web app for creating events and recording RSVPs where hosts create an event and get a shareable link, guest response with a single click, and hosts can track responses without needing to log in.

## Features

- **Create an event** - title, date, location and description
- **Guest RSVP** - guests respond YES / NO / MAYBE via a shareable link, one person can give one response per event
- **Host-only results dashboard** - response counts and guest list, with no login required
- **My events** - hosts can revisit events they've created
- **Custom-designed UI** - built with React and Bootstrap, with a custom color theme, typography and layout

## Tech Stack

- **Frontend:** - React (Vite), React Router, Axios, Bootstrap
- **Backend:** - Node.js, Express, MongoDB, Mongoose

There are no user accounts. Instead:
- Every event gets a **guest link** (`/event/:id/rsvp`) — anyone with this link can only submit an RSVP.
- Every event also gets a **host link** containing a secret key (`/event/:id/results?key=...`) — only the host receives this, and it's required to view responses.

This keeps the app simple while enforcing a permission boundary between hosts and guests.

## Running It Locally

### Prerequisites
- Node.js installed
- A MongoDB database (e.g. a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` with the following content:

MONGODB_URI=your_mongodb_connection_string
PORT=4000

Then run:
```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

