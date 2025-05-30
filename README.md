# 🚀 Next.js User Dashboard

A modern, responsive **User Management Dashboard** built with **Next.js 14** and **TypeScript**, featuring multi-step user forms, theme switching, and real-time validation.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4)

---

## 👨‍💻 Developer

Built with ❤️ by **Ritin Gusain**

---

## ✨ Features

### ✅ Core Features
- 📋 User listing with filtering (name/city)
- ➕ Add new users with multi-step form
- 🔁 Back and next form navigation
- ✅ Real-time form validation
- 💡 Light/Dark theme toggle with system preference
- 💾 Data persistence with `localStorage`
- ⚠️ Loading and error states

### ⚙️ Technical Highlights
- SSR + Client rendering optimization
- Type-safe with TypeScript & Zod
- State management using React Context API
- Animations with Framer Motion
- Clean UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | Next.js 14 |
| **Language** | TypeScript |
| **Styling** | TailwindCSS |
| **Forms** | React Hook Form + Zod |
| **State** | React Context API |
| **Animation** | Framer Motion |
| **API** | JSONPlaceholder |
| **Validation** | Zod |

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js v18 or later
- npm or yarn

### 📦 Installation
```bash
git clone https://github.com/ritingusain/user-dashboard.git
cd user-dashboard
npm install     # or yarn install
npm run dev     # or yarn dev
Open http://localhost:3000 in your browser to view it live.
```

📁 Project Structure
pgsql
Copy
Edit
src/
├── app/                  # Next.js app directory
│   ├── dashboard/        # Dashboard routes & pages
│   │   ├── add/          # Multi-step add form
│   │   ├── loading.tsx   # Loading fallback
│   │   ├── error.tsx     # Error fallback
│   │   └── page.tsx      # User list
│   ├── components/       # Reusable components
│   ├── context/          # Context Providers (Theme, User)
│   └── providers.tsx     # Wrapper for context usage
├── styles/               # Global styles
├── types/                # TypeScript types
🎯 Key Functionalities
👥 User Management
View users from a public API

Add new users via a clean multi-step form

Search/filter users by name or city

🌓 Theme System
Toggle light/dark mode

Detect system preference

Persist theme between sessions

🧾 Form & Validation
Multi-step form with progress saving

Real-time validation

Friendly error messages

Submit logs complete user data to console

🔧 Configuration
next.config.js – Next.js config

tailwind.config.js – Tailwind theme

tsconfig.json – TypeScript settings

package.json – Scripts & dependencies

📱 Responsive Design
Tested on:

✅ Desktop

✅ Laptops

✅ Tablets

✅ Mobile devices

🤝 Contributing
Pull requests are welcome!

Fork this repo

Create a branch

Make your changes

Open a PR

📝 License
Licensed under the MIT License.

📞 Contact
Ritin Gusain
📧 gauravgusain86@gmail.com
🔗 GitHub Repo
🌐 Live Site
