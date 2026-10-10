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

<!-- STARLIGHT:OPERATING:BEGIN v2 sha=9f8fecc91edc source=794db1e51a55a128816f7aa266eb0ac1dbd452c3 -->

## Agent operating guidance

Repository agents use the shared Starlight operating contract in `AGENTS.md` alongside local instructions.
The contract asks agents to establish a useful outcome, select relevant skills, complete authorized work,
verify current sources, refine the actual artifact, and report evidence and remaining gates.
It covers human agency, privacy, rights, resource stewardship and bounded proactivity.
Repository identity, brand, canon, build commands and release gates remain local.

[Pinned contract](https://github.com/frankxai/Starlight-Intelligence-System/blob/794db1e51a55a128816f7aa266eb0ac1dbd452c3/docs/architecture/agents-md/band-a.md)
· [Projection and verification](https://github.com/frankxai/Starlight-Intelligence-System/blob/794db1e51a55a128816f7aa266eb0ac1dbd452c3/docs/architecture/AGENTS-MD-CONTRACT.md)

These files supply operating guidance. They do not activate an agent, grant tool permissions,
schedule recurring work, certify compliance or prove a live capability.

<!-- STARLIGHT:OPERATING:END -->
