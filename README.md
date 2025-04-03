# 🚀 CryptoWeather Nexus

A **modern multi-page dashboard** that provides **real-time weather updates**, **cryptocurrency data**, and **latest crypto news** using various APIs.

## 📌 Tech Stack

- **Frontend:** Next.js (v13+), React (hooks), Redux (Thunk/Saga), Tailwind CSS  
- **Backend:** FastAPI (Python)  
- **APIs Used:** OpenWeatherMap, CoinGecko, NewsData.io  
- **Deployment:** Vercel (Frontend) & Render (Backend)  

---

---

## 🌟 Features

✅ **Live Weather Updates** – Get real-time weather data for any city 🌦️  
✅ **Cryptocurrency Prices** – Track live crypto prices and market trends 📊  
✅ **Latest Crypto News** – Stay updated with top 5 crypto headlines 📰  
✅ **Modern UI** – Built with Next.js, React, Redux & Tailwind CSS 🎨  
✅ **Real-Time Updates** – WebSocket integration for instant data refresh ⚡  

---
## 🚀 Installation & Setup

### **2️⃣ Backend Setup (FastAPI)**

#### 🔹 Install Dependencies
```sh
cd backend
pip install -r requirements.txt
```

#### 🔹 Set Up Environment Variables
Create a .env file inside the backend folder and add the required API keys:
```sh
OPENWEATHER_API_KEY=your_openweather_key
COINGECKO_API_KEY=your_coingecko_key
NEWSDATA_API_KEY=your_newsdata_key
```

#### 🔹 Run the Backend Server
```sh
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```
📍 The API will be available at: http://127.0.0.1:8000/

### 3️⃣ Frontend Setup (Next.js + Redux + Tailwind CSS)

#### 🔹 Install Dependencies
Ensure you have Node.js (v18+) installed. Then, install dependencies:
```sh
cd frontend
npm install
```

#### 🔹 Set Up Environment Variables
Create a .env.local file inside the frontend folder and add:
```sh
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

#### 🔹 Start the Development Server
```sh
npm run dev
```
📍 The frontend will be available at: http://localhost:3000/

### 🚀 Deployment
#### 🔹 Deploy Backend on Render
1. Go to Render
2. Create a new Web Service
3. Connect GitHub repository and select the backend folder
4. Set environment variables in Render Dashboard
5. Deploy and get the backend URL (https://your-api.onrender.com)
---

---
#### Deploy Frontend on Vercel
1. Install Vercel CLI
```sh
npm install -g vercel
```
2. Deploy frontend
```sh
cd frontend
vercel
```
3. Follow on-screen instructions to complete deployment.

----

---
## 📌 Contributing
We welcome contributions! If you find bugs or want to improve the project, feel free to:

1. Fork the repository

2. Create a new branch 

3. Commit your changes

4. Submit a Pull Request
---

---
## License
###### This project is licensed under the MIT License. You are free to use, modify, and distribute it.

---
---
## 🙌 Acknowledgements
Special thanks to:

#### OpenWeatherMap – Weather data API

#### CoinGecko – Cryptocurrency market data

#### NewsData.io – Crypto news API

#### Render & Vercel – Hosting services

[Deployment]((https://cryptoweather-nexus-0170-1.onrender.com)
