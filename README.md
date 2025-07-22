# 🛍️ ShopWish - Smart Shopping App

A modern shopping application with wishlist functionality, smart recommendations, and social sharing features. Built with React, Vite, and Clerk authentication.

## ✨ Features

- **User Authentication**: Secure login/signup with Clerk
- **Product Catalog**: Browse products from multiple APIs (DummyJSON & FakeStore API)
- **Smart Wishlist**: Add/remove products to your personal wishlist
- **Intelligent Recommendations**: Get product suggestions based on your browsing history and wishlist
- **Category Filtering**: Filter products by category
- **Social Sharing**: Share your wishlist with friends
- **Responsive Design**: Works perfectly on desktop and mobile
- **Persistent Data**: Your wishlist and browsing history are saved locally

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Clerk account (free at [clerk.com](https://clerk.com))

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Clerk authentication:**
   - Create a free account at [https://clerk.com](https://clerk.com)
   - Create a new application
   - Copy your publishable key from the dashboard

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Clerk publishable key:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Authentication**: Clerk
- **Styling**: CSS3 with modern features
- **Icons**: Lucide React
- **APIs**: DummyJSON, FakeStore API
- **Storage**: LocalStorage for persistence

## 📱 How to Use

### Getting Started
1. **Sign In**: Click "Sign In to Continue" and create an account or log in
2. **Browse Products**: Explore the product catalog on the home page
3. **Filter by Category**: Use the category dropdown to filter products
4. **Add to Wishlist**: Click the heart icon on any product card

### Wishlist Management
- **View Wishlist**: Click the "Wishlist" tab to see your saved items
- **Remove Items**: Click the heart icon again to remove from wishlist
- **Share Wishlist**: Use the "Share Wishlist" button to share with friends

### Smart Recommendations
- **Get Recommendations**: Visit the "Recommended" tab
- **Personalized Suggestions**: Recommendations improve as you browse and add items
- **Category-Based**: Suggestions are based on your preferred categories

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Styles and responsive design
├── main.jsx         # Application entry point
└── index.css        # Global styles
```

## 🌟 Key Features Explained

### Smart Recommendations
The app analyzes your:
- Wishlist items and their categories
- Browsing history (last 20 viewed products)
- Preferred product categories

Then suggests products from similar categories that you haven't wishlisted yet.

### Data Persistence
- Wishlist and browsing history are stored in localStorage
- Data is user-specific (tied to Clerk user ID)
- Survives browser sessions and page refreshes

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🔒 Privacy & Security

- Authentication handled by Clerk (SOC 2 compliant)
- No sensitive data stored locally
- User data is isolated and secure
- HTTPS enforced in production

## 🚀 Deployment

The app is ready for deployment on platforms like:
- Vercel
- Netlify
- GitHub Pages

Make sure to set your environment variables in your deployment platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
