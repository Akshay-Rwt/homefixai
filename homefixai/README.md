# HomeFix AI - AI-Powered Home Services Booking Platform

A comprehensive home services booking application featuring an **AI-Powered Diagnostic Chatbot** built with RAG (Retrieval-Augmented Generation) principles. This project demonstrates modern AI integration in web applications, perfect for academic projects and resume showcases.

## 🚀 Features

### Core Features
- 🤖 **AI-Powered Diagnostic Chatbot** - Describe your problem in natural language and get instant service recommendations
- 📱 **Complete Multi-Page Application** - Home, Services, AI Chatbot, Booking, Login, Provider Dashboard
- 🔍 **Smart Search & Filters** - Find services quickly with category filters and search
- 📅 **Easy Booking System** - 3-step booking flow with date/time selection
- 📊 **Provider Dashboard** - Track bookings, revenue, and customer management
- 🎨 **Modern UI/UX** - Built with Tailwind CSS, responsive design

## 🧠 AI/RAG Technology Implementation

This project showcases cutting-edge AI concepts that are highly valued in industry:

### 1. Retrieval-Augmented Generation (RAG)

The AI chatbot uses a RAG-inspired architecture:

```
User Input → Intent Analysis → Knowledge Base Retrieval → Response Generation → Service Recommendation
```

**Key Components:**

- **Knowledge Base** (`services/data.js`): Services database with symptoms, keywords, and descriptions
- **Semantic Matching**: Keyword relevance scoring to simulate vector embeddings
- **Context-Aware Responses**: AI generates helpful diagnostic responses
- **Service Recommendations**: Maps user problems to specific services

### 2. System Prompt Engineering

The chatbot uses structured prompts for consistent responses:

```javascript
"You are a helpful assistant for HomeFix AI. The user has a problem. 
Based on the available services, diagnose the issue and recommend 
the specific service ID. Do not invent services."
```

### 3. Intent Detection

Automatic detection of booking intent from user messages:
- "Book it", "Yes", "Okay" → Navigates to booking
- "No", "Don't" → Clears recommendation

## 🛠️ Technology Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS 4.x
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **TypeScript**: Full type support (with .jsx for components)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with responsive menu
│   └── Footer.jsx          # Site footer with contact info
├── pages/
│   ├── Home.jsx            # Landing page with hero & features
│   ├── Login.jsx           # Authentication (login/signup)
│   ├── Services.jsx        # Service browsing with filters
│   ├── AIChatbot.jsx       # ⭐ AI Diagnostic Chatbot
│   ├── Booking.jsx         # 3-step booking flow
│   └── ProviderDashboard.jsx # Provider portal
├── services/
│   ├── data.js             # ⭐ Knowledge Base (16+ services)
│   └── chatbotAPI.js       # ⭐ RAG implementation
├── App.tsx                 # Main app with routing
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## 🎯 How to Use the AI Chatbot

1. Navigate to **AI Chatbot** page
2. Describe your home issue in natural language:
   - ✅ "My washing machine is making a loud banging noise when it spins"
   - ✅ "AC not cooling and has bad smell"
   - ✅ "Sink water not draining properly"
3. AI analyzes the problem using RAG
4. Get instant service recommendation with:
   - Service name & description
   - Price & duration
   - Provider & rating
   - One-click booking option

## 💡 Example AI Interactions

| User Input | AI Response |
|------------|-------------|
| "My AC is not cooling properly" | Recommends **Deep Clean AC** (₹599) or **AC Gas Refill** (₹1299) based on symptoms |
| "Washing machine making loud noise" | Diagnoses drum alignment issue → Recommends **Washing Machine Drum Checkup** |
| "Sofa dirty, having party tomorrow" | Recommends **5-Seater Sofa Shampoo Treatment** (2-hour dry time) |

## 📊 Service Categories

- ❄️ Air Conditioning (AC servicing, gas refill)
- 🧺 Home Appliances (washer, fridge, microwave)
- 🛋️ Cleaning Services (sofa, carpet, deep cleaning)
- 🚿 Plumbing (drains, leaks, pipe repair)
- 🔌 Electrical (fans, switches, geyser)

## 🎓 Academic & Resume Value

### Keywords to Highlight:
- **LLM Large Language Models**
- **RAG Retrieval-Augmented Generation**
- **Prompt Engineering**
- **Semantic Search**
- **Vector Embeddings** (simulated)
- **Intent Detection**
- **Natural Language Processing**

### Demo Tips for External Examiners:

1. **The "Before" Problem**: Show how difficult it is to find specific services through menus
2. **The "After" Solution**: Demo the AI chatbot with vague descriptions
3. **Technical Explanation**: Explain the RAG pipeline clearly
4. **Real-World Relevance**: Mention these technologies are used by companies like OpenAI, Google, Amazon

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔮 Future Enhancements

- [ ] Real LLM API integration (OpenAI/Gemini)
- [ ] True vector embeddings with SentenceTransformers
- [ ] Vector database (FAISS/ChromaDB)
- [ ] User authentication & JWT
- [ ] Backend API with Flask/FastAPI
- [ ] Real-time booking updates
- [ ] Payment gateway integration

## 📝 Technical Notes

### How the RAG System Works (Simplified for Demo):

1. **Knowledge Base**: 16 services with symptoms, keywords, descriptions
2. **Relevance Scoring**: Matches user input against service metadata
3. **Response Generation**: Uses predefined templates with service data
4. **Booking Flow**: Seamless navigation from chat to booking

### Production Architecture Would Include:

- Python backend with Flask/FastAPI
- LangChain for LLM orchestration
- PostgreSQL for service data
- Vector database (Pinecone/Weaviate)
- Real LLM API (GPT-4/Gemini Pro)

## 📄 License

This project is for educational purposes. Feel free to use it as a reference for your own projects.

## 👨‍💻 Built For

B.Tech AI/ML students looking to demonstrate practical AI applications in web development. Perfect for academic projects, hackathons, and portfolio building.

---

**Built with ❤️ using React, Vite, Tailwind CSS, and AI Concepts**