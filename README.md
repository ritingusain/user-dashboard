# Next.js User Dashboard

A modern and responsive user dashboard built with Next.js 14, featuring user management, theme switching, and real-time form validation.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4)

## 👨‍💻 Developer
Built with ❤️ by Ritin Gusain

## ✨ Features

### Core Features
- 📊 User management with CRUD operations
- 🌓 Dark/Light theme with system preference detection
- 📱 Fully responsive design
- 💾 Data persistence using localStorage
- ✅ Form validation with real-time feedback
- ⚡ Fast loading states and error handling

### Technical Features
- Server-side and client-side rendering optimization
- Context-based state management
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for smooth animations

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animation:** Framer Motion
- **State Management:** React Context
- **Form Handling:** React Hook Form
- **Data Fetching:** JSONPlaceholder API
- **Validation:** Zod

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ritingusain/user-dashboard.git
cd user-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── components/      # Reusable UI components
│   │   ├── ThemeToggle.tsx
│   │   └── Toast.tsx
│   ├── context/        # React Context providers
│   │   ├── ThemeContext.tsx
│   │   └── UserContext.tsx
│   ├── dashboard/      # Dashboard pages
│   │   ├── add/       # Add user form
│   │   ├── error.tsx  # Error handling
│   │   ├── loading.tsx # Loading states
│   │   └── page.tsx   # Main dashboard
│   └── providers.tsx   # Context providers wrapper
├── styles/             # Global styles
└── types/             # TypeScript type definitions
```

## 🎯 Key Features Explained

### User Management
- View all users in a responsive table
- Add new users through a multi-step form
- Delete existing users
- Search users by name or city

### Theme System
- Light and dark mode support
- System preference detection
- Theme persistence across sessions
- Smooth theme transitions

### Form Validation
- Real-time field validation
- Custom validation rules
- Error messages with clear feedback
- Multi-step form with progress saving

## 🔧 Configuration

The project uses several configuration files:
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - TailwindCSS theme and plugins
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## 📱 Responsive Design

The dashboard is fully responsive and works across:
- Desktop monitors
- Laptops
- Tablets
- Mobile devices

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 📞 Contact

Ritin Gusain - [gauravgusain86@gmail.com](mailto:gauravgusain86@gmail.com)

Live - [Click here!](https://user-dashboard-livid-seven.vercel.app/dashboard)

