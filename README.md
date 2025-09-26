# Arcanea Mobile App

A React Native mobile application for the Arcanea AI creative platform, built with Expo.

## 🚀 Features

- **Cross-Platform**: iOS and Android support
- **AI Character Interactions**: Powered by Anthropic Claude and OpenAI
- **Voice & Speech**: Real-time voice interactions
- **Modern UI**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router for type-safe navigation

## 🛠️ Tech Stack

- **React Native** with Expo 53
- **TypeScript** for type safety
- **NativeWind** for styling
- **Expo Router** for navigation
- **AI SDK** for AI integrations
- **Zustand** for state management

## 📱 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/frankxai/arcanea-mobile.git
cd arcanea-mobile

# Install dependencies
npm install

# Start the development server
expo start
```

### Running on Devices

```bash
# iOS
expo start --ios

# Android
expo start --android

# Web (for testing)
expo start --web
```

## 📱 App Structure

```
app/
├── (tabs)/              # Tab-based navigation
│   ├── index.tsx        # Home screen
│   ├── lumina.tsx       # Lumina AI character
│   ├── kinetix.tsx      # Kinetix AI character
│   └── scripta.tsx      # Scripta AI character
├── api/                 # API endpoints
└── _layout.tsx          # Root layout

components/              # Reusable components
assets/                  # Images, fonts, etc.
constants/               # App constants
```

## 🏗️ Build & Deploy

### Development Build
```bash
eas build --platform all --profile development
```

### Production Build
```bash
eas build --platform all --profile production
```

### App Store Submission
```bash
eas submit --platform all
```

## 🔗 Related Repositories

- [Arcanea Main Platform](https://github.com/frankxai/arcanea) - Web applications and core platform
- [Arcanea Library](https://github.com/frankxai/arcanea-library) - Educational content and resources

## 📄 License

Private repository - All rights reserved

## 🤝 Contributing

This is a private repository for the Arcanea mobile application development.