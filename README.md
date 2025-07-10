# 🌐 LiFi Embedded Console (LIFI-Dashboard)

A real-time web dashboard for managing and monitoring ESP8266 and Raspberry Pi-based Li-Fi communication devices. Built with **Next.js**, **Firebase**, and **TailwindCSS**, and prepared for full-scale embedded integration and live telemetry.

---

## 🔧 Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend/Realtime DB**: Firebase Firestore, Firebase Auth, Firebase Emulator Suite
- **Realtime Sync**: Firestore `onSnapshot` listeners
- **CI/CD & Deployment**: GitHub + Vercel
- **Auth**: Google OAuth via Firebase

---

## 📦 Features

- 🔒 Secure Google Authentication
- 📡 Real-time Firestore device sync
- 🧩 Add/Edit/Delete Li-Fi devices
- 💻 Emulator support for local dev
- 🚀 Ready for Vercel deployment
- 📊 Live device telemetry placeholder
- 🛠️ Type-safe & modular code structure

---

## 🛠️ Local Setup

1. Clone the repo  
   `git clone https://github.com/YOUR_USERNAME/lifi-dashboard.git`

2. Install dependencies  
   `npm install`

3. Copy `.env.local.example` → `.env.local` and fill with your Firebase config

4. Run development server  
   `npm run dev`

5. Run Firebase Emulators (optional)  
   `npm run emulators`

---

## 🌍 Live Demo  
🔗 _Deployed via Vercel_: [https://lifi-dashboard.vercel.app](https://lifi-dashboard.vercel.app) (replace with actual)

---

## 📡 Future Integration (PHASE 4)

- 🔌 Connect to ESP8266 & RPi via Firebase
- 💡 Simulate Li-Fi data flow using Wokwi/Proteus/FLUX
- 🧪 Flash firmware and validate sync in real-time

---

## 🧠 Maintained by  
**PROJECTGALAHADD** — Smart systems. Embedded AI. Intelligent dashboards.

---
