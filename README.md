# 🧠 Memora — Browse Everything. Forget Nothing.

<p align="center">

<img src="./frontend/src/assets/logo/memora-logo.png" width="140"/>

</p>

<p align="center">

### AI Powered Browser Memory Assistant

**Capture • Organize • Search • Chat with Everything You Browse**

</p>

---

<p align="center">

![Python](https://img.shields.io/badge/Python-3.12+-blue?style=for-the-badge\&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge\&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge\&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge\&logo=mysql)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector%20Database-orange?style=for-the-badge)
![Groq](https://img.shields.io/badge/Groq-LLM-black?style=for-the-badge)
![JWT](https://img.shields.io/badge/Auth-JWT-success?style=for-the-badge)

</p>

---

# 📖 About Memora

**Memora** is an AI-powered Browser Memory Assistant that remembers everything you browse.

Instead of bookmarking hundreds of webpages or searching through browser history, Memora automatically converts webpages into searchable AI memories.

Every webpage is summarized, tagged, embedded into a vector database, and becomes searchable using natural language.

Think of it as your **second brain for the web.**

---

# ✨ Features

## 🧠 AI Memory

* Save webpages instantly
* AI generated summaries
* Automatic tags
* Reading time calculation
* Domain extraction
* Visit tracking

---

## 🔍 Semantic Search

Search naturally like:

> "Which YouTube songs did I watch yesterday?"

> "Show me React authentication articles"

> "Find FastAPI tutorials"

Instead of keyword matching, Memora searches using **vector embeddings**.

---

## 💬 AI Chat

Ask questions from your saved memories.

Examples:

* What projects was I working on?
* Which songs did I listen to?
* Show me browser history about React.
* What websites did I visit today?

The AI searches only **your personal memories** before generating an answer.

---

## 📊 Dashboard

Interactive dashboard including:

* Total Memories
* Favorite Memories
* Today's Memories
* Total Domains
* Recently Saved Memories
* Most Visited Pages
* Top Domains
* Top Tags
* AI Insight Card

---

## ⭐ Favorites

Bookmark important memories.

Quickly access frequently used webpages.

---

## 🗂 Collections

Organize memories into collections.

Examples:

* DSA
* React
* Internship
* College
* Research

---

## 🤖 AI Insight

Memora automatically analyzes browsing behavior and generates personalized insights.

Example:

> "You've recently explored many FastAPI resources. Consider building a REST API project."

---

## 🔐 Authentication

* JWT Authentication
* Secure Login
* Secure Signup
* Password Hashing (bcrypt)
* Protected Routes
* User-specific memories

---

# 🏗 System Architecture

```text
Browser Extension
        │
        ▼
FastAPI Backend
        │
        ▼
AI Processing
 ├── Summary
 ├── Tags
 ├── Embeddings
        │
        ▼
MySQL Database
        │
        ▼
Chroma Vector Database
        │
        ▼
Semantic Search
        │
        ▼
AI Chat
```

---

# ⚙ Tech Stack

## Frontend

* React
* Vite
* Axios
* React Router
* Framer Motion
* Lucide React

---

## Backend

* FastAPI
* SQLAlchemy
* MySQL
* JWT Authentication
* Passlib
* Python-Jose
* ChromaDB
* Sentence Transformers
* Groq API

---

# 📂 Project Structure

```text
memora_extension

backend
│
├── app
│   ├── api
│   ├── core
│   ├── database
│   ├── models
│   ├── schemas
│   ├── services
│   ├── utils
│   └── main.py
│
├── uploads
├── chroma_db
└── requirements.txt

frontend
│
├── src
│   ├── assets
│   ├── components
│   ├── context
│   ├── hooks
│   ├── pages
│   ├── routes
│   ├── services
│   └── styles
```

---

# 🔄 AI Workflow

```text
Webpage

↓

Extract Content

↓

AI Summary

↓

AI Tags

↓

Generate Embeddings

↓

Store in ChromaDB

↓

Save Metadata in MySQL

↓

Semantic Search

↓

AI Chat Retrieval

↓

Final AI Response
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📌 Current Features

* ✅ Authentication
* ✅ AI Summaries
* ✅ AI Tags
* ✅ Browser Memory Storage
* ✅ Semantic Search
* ✅ AI Chat
* ✅ Favorites
* ✅ Dashboard Analytics
* ✅ Most Visited Pages
* ✅ Top Domains
* ✅ Top Tags
* ✅ AI Insights
* ✅ Collections
* ✅ Reading Time
* ✅ Visit Tracking

---

# 🚀 Future Roadmap

* Browser Extension Sync
* PDF Memory
* Image OCR Memory
* Voice Search
* AI Memory Timeline
* Chrome History Sync
* Memory Sharing
* Mobile App
* Dark/Light Themes
* Smart Recommendations

---

# 👨‍💻 Contributors

**Snehal Matole**

AI Developer | Full Stack Developer

---

# ⭐ Support

If you found this project useful,

⭐ Star the repository

🍴 Fork it

🤝 Contribute

---

<p align="center">

## Browse Everything. Forget Nothing.

Built with ❤️ using FastAPI, React and AI.

</p>
