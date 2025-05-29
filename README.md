# 🧠 AI IQ Test Website

A modern, interactive IQ test website powered by AI. Built with a minimalistic UI, responsive design, and full functionality. This project offers users a chance to test their intelligence with an AI-assisted evaluation.

---

## 🌐 Live Preview

*(Add live link here if deployed)*

---

## ✨ Features

- ✅ Fully functional IQ test with 10 randomized questions  
- ⏱️ 15-minute timer and progress tracker  
- 📊 Instant score with AI-generated feedback  
- 🎨 Clean, modern UI with dark/light mode toggle  
- 🔁 Retake test and share score options  
- 🧠 Simulated AI scoring via mock API  

---

## 📁 Project Structure

```
.
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Test.jsx
│   │   ├── Result.jsx
│   │   └── About.jsx
│   ├── App.jsx
│   └── main.jsx
├── README.md
└── package.json
```

---

## 🚀 Getting Started

```bash
# 1. Clone the Repository
git clone https://github.com/your-username/ai-iq-test.git
cd ai-iq-test

# 2. Install Dependencies
npm install

# 3. Run the Development Server
npm run dev

# Open your browser and go to:
# http://localhost:5173
```

---

## ⚙️ Tech Stack

- **React** – UI library  
- **Tailwind CSS** – Styling  
- **Vite** – Development server and build tool  
- **Mock AI API** – Simulated intelligence scoring  

---

## 📡 API Simulation

> All AI scoring is simulated using mock data for now. Can be replaced with a real AI API (e.g. OpenAI, HuggingFace inference API, etc.)

```js
// Simulate API call
setTimeout(() => {
  resolve({
    iqScore: 128,
    interpretation: "High IQ. You have above-average reasoning and problem-solving skills.",
    suggestion: "Keep challenging yourself with puzzles, learning, and cognitive games."
  });
}, 2000);
```

---

## 📸 Screenshots

*(Include screenshots or demo GIFs here if available)*

---

## 📄 License

This project is open-source under the MIT License.

---

## 🙋‍♂️ Author

Made with ❤️ by [Wahyu Prasetyo Wibowo](https://github.com/your-username)
