# Second Brain 🧠

**Personal Knowledge Management Platform**  
Built with React.js · Tailwind CSS · Node.js · Express.js · MongoDB · Qdrant · Cohere LLM API

---

## 🚀 Overview

Second Brain is a semantic knowledge management system that helps users store, organize, and search across diverse content — like PDFs, YouTube videos, web links, and social media clips — all in one place. With AI-powered embeddings, you can retrieve relevant content even when keywords fail.

---

## 📸 Screenshots

![Dashboard Overview](path/to/dashboard.png)  
![Search Results Highlight](path/to/search.png)  
![Content Viewer](path/to/content_view.png)

---

## ⚙️ Key Features

- **Unified Content Management**: Upload and organize PDFs, videos, links, and notes with custom tags and categories.
- **Semantic Search**: Uses Qdrant + Cohere embeddings to deliver relevance-based search, not just literal matches.
- **Secure REST API**: Role-based endpoints authenticated by JWT tokens.
- **Responsive UI**: Built with React + Tailwind for a clean, accessible experience on desktop and mobile.
- **Optimized Data Model**: MongoDB schema designed for fast retrieval and structured queries.
- **Future Integration**: Real-time content embedding and enrichment pipeline planned.

---

## 🛠️ Tech Stack

| Layer         | Technologies                                       |
|---------------|----------------------------------------------------|
| Frontend      | React.js, Tailwind CSS                             |
| Backend       | Node.js, Express.js                                |
| Database      | MongoDB (NoSQL), Qdrant (vector database)          |
| AI / Embeddings | Cohere LLM API for semantic understanding       |
| Auth & Security | JWT-based authentication and role-based access  |

---

## 🔍 How It Works

1. **User Upload / Add Content**: Users can upload files, paste links, or add notes.
2. **Content Indexing**: A backend routine extracts metadata (e.g., titles, tags, embeddings).
3. **Search Flow**:
   - Query → embedding via Cohere → semantic similarity search in Qdrant
   - Provides context-aware results beyond keyword matching.
4. **Access Control**: JWT tokens validate user access, restrict queries appropriately.

---

## 🚧 Setup & Installation

```bash
# Clone the repo
git clone https://github.com/vikas-chaudhari/Second-Brain.git
cd Second‑Brain

# Install dependencies
npm install

# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start
