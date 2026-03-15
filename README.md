# EventEase

EventEase is a full-stack event management platform that enables users to discover upcoming events, RSVP, and submit reviews after attending. Administrators can create and manage events through role-based access control, while the system enforces review submission only after events conclude and automatically removes expired events. The platform also incorporates sentiment analysis to evaluate attendee feedback.

---

## Demo Video

https://www.loom.com/share/c30d569ba7e0437f83783d8875aa5352

---



## Requirements

Before running the project locally, ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm
- Python 3.9+
- MySQL Server
- Git

Optional but recommended:

- Postman (for testing APIs)
- VS Code

---

## Features

### User Features
- Browse upcoming events
- Search events by **title or location**
- RSVP to events
- View detailed event pages
- Submit reviews after events end
- View reviews from other users

### Admin Features
- Create events
- Edit event details
- Delete events
- Upload event images

### Smart Features
- Review **sentiment analysis**
- Event category tagging
- RSVP count tracking
- Automatic expired event filtering

### UI Features
- Animated **WebGL background** (react bits)
- **3D hover event cards**
- Glass-style UI components
- Debounced search bar
- Responsive layout

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Three Fiber / Three.js

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST API

### Database
- MySQL

### Machine Learning
- Python
- Flask API
- VADER Sentiment Analysis

### Storage
- Cloudinary (image uploads)

---

## Project Architecture

```
Client (React + Vite)
        │
        │ API Requests
        ▼
Node.js / Express Backend
        │
        ├── MySQL Database
        │
        ├── Cloudinary (Image Storage)
        │
        ▼
Python Sentiment Analysis Service
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/eventease.git
cd eventease
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SENTIMENT_API_URL=http://localhost:6001
```

Run backend:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 4. Sentiment Analysis Service

```bash
cd sentiment-service
pip install flask vaderSentiment
python app.py
```

---
## Screenshot

![EventEase Screenshot](./ss1.png)

*(Small part that is not covered in the video as reviewing is'nt allowed until event expires)*

---

## API Overview

| Method | Endpoint | Description |
|------|------|------|
GET | `/events` | Fetch upcoming events |
GET | `/events?search=` | Search events |
POST | `/events` | Create event |
POST | `/registrations` | RSVP to event |
POST | `/reviews` | Add review |
GET | `/reviews/event/:id` | Fetch reviews |

---

## Future Improvements

- Event recommendation system
- Real-time announcements
- Payment integration
- Event analytics dashboard
- Email notifications

---

