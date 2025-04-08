# ParkSmart Mobile App

A modern mobile application for finding and booking parking spots. Built with React Native and Expo.

## Features

- User authentication (login, register, forgot password)
- Find available parking spots
- Book and manage parking sessions
- View parking history and receipts
- Profile management
- Real-time parking spot availability
- Secure payment integration

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Navigation
- Secure Store
- React Context API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/parksmart-app.git
   cd parksmart-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Run on your device or simulator:
   - Press `i` to open in iOS simulator
   - Press `a` to open in Android emulator
   - Scan the QR code with Expo Go app on your physical device

## Project Structure

```
parksmart-app/
├── app/                    # App screens and navigation
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── constants/             # App constants and theme
├── contexts/             # React Context providers
└── types/                # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
