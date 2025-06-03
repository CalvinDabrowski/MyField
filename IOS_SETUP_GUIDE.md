# 📱 NexField iOS App Setup Guide

Convert your NexField oil & energy contractor marketplace into a native iOS app using Capacitor.

## 🛠 Prerequisites

Before you can build and run your iOS app, you need:

### **Required:**
- **Mac computer** (required for iOS development)
- **Xcode 14+** (free from Mac App Store)
- **Apple Developer Account** ($99/year for App Store distribution)
- **iOS device** for testing (recommended)

### **Installation Steps:**

1. **Install Xcode**
   ```bash
   # Download from Mac App Store or developer.apple.com
   # After installation, accept license and install components
   sudo xcode-select --install
   ```

2. **Install CocoaPods** (iOS dependency manager)
   ```bash
   sudo gem install cocoapods
   ```

## 🚀 Build & Run Commands

### **Build for iOS:**
```bash
# Build web assets and sync to iOS
npm run ios:build

# Or do it step by step:
npm run build          # Build Next.js app
npm run ios:sync       # Sync to iOS project
```

### **Open in Xcode:**
```bash
# Open iOS project in Xcode
npm run ios:open
```

### **Run on Device/Simulator:**
```bash
# Run on connected device or simulator
npm run ios:run
```

## 📱 iOS Project Structure

After setup, your project structure includes:

```
ally-energy-clone/
├── ios/                     # iOS native project
│   ├── App/
│   │   ├── App/
│   │   │   ├── public/      # Web assets copied here
│   │   │   ├── Info.plist   # iOS app configuration
│   │   │   └── ...
│   │   └── App.xcodeproj    # Xcode project file
│   └── Podfile              # iOS dependencies
├── capacitor.config.ts      # Capacitor configuration
├── out/                     # Built web assets
└── ...
```

## ⚙️ Configuration Files

### **capacitor.config.ts** - Main Capacitor config
```typescript
const config: CapacitorConfig = {
  appId: 'com.nexfield.app',
  appName: 'NexField',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'never',
    backgroundColor: '#ffffff'
  }
};
```

### **next.config.js** - Already configured for static export
```javascript
const nextConfig = {
  output: 'export',        // Required for Capacitor
  distDir: 'out',         // Output directory
  trailingSlash: true,    // Better iOS compatibility
  images: {
    unoptimized: true     // Required for static export
  }
};
```

## 🎨 iOS-Specific Features

### **Added Capacitor Plugins:**
- **@capacitor/status-bar** - Control status bar appearance
- **@capacitor/splash-screen** - Custom app launch screen
- **@capacitor/keyboard** - Keyboard behavior management
- **@capacitor/network** - Network status detection
- **@capacitor/device** - Device information

### **iOS Meta Tags** (automatically added):
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="NexField">
<meta name="theme-color" content="#2E8B57">
```

## 📱 Testing Your App

### **1. iOS Simulator**
```bash
# Open Xcode and run on simulator
npm run ios:open
# In Xcode: Select simulator > Click play button
```

### **2. Physical Device**
1. Connect iPhone/iPad via USB
2. In Xcode: Select your device
3. Click play button
4. Trust developer on device if prompted

### **3. TestFlight Beta Testing**
1. Archive build in Xcode
2. Upload to App Store Connect
3. Add beta testers
4. Distribute via TestFlight

## 🏪 App Store Submission

### **Required Assets:**

1. **App Icons** (various sizes):
   - 180x180px (iPhone)
   - 167x167px (iPad)
   - 152x152px (iPad)
   - 120x120px (iPhone)
   - 87x87px (iPhone)
   - 80x80px (iPad)
   - 58x58px (iPhone)
   - 40x40px (iPad)
   - 29x29px (iPhone/iPad)

2. **Screenshots** (required for App Store):
   - iPhone 6.7" display
   - iPhone 6.5" display
   - iPhone 5.5" display
   - iPad Pro 12.9" display
   - iPad Pro 11" display

3. **App Store Metadata:**
   - App name: "NexField"
   - Subtitle: "Oil & Energy Contractor Marketplace"
   - Keywords: oil, energy, contractors, marketplace, jobs
   - Description: Professional marketplace for energy sector contractors
   - Category: Business
   - Age rating: 4+ (suitable for all ages)

### **Submission Process:**
1. **Archive** your app in Xcode
2. **Upload** to App Store Connect
3. **Fill metadata** and add screenshots
4. **Submit for review** (usually 1-7 days)
5. **Release** once approved

## 🔧 Troubleshooting

### **Common Issues:**

**Build Errors:**
```bash
# Clear and rebuild
rm -rf out ios/App/App/public
npm run ios:build
```

**Pod Install Issues:**
```bash
cd ios && pod install --clean-install
```

**Xcode Build Fails:**
- Clean build folder (Cmd+Shift+K)
- Restart Xcode
- Check iOS deployment target (iOS 13+)

### **Performance Tips:**
- Enable minification in production
- Optimize images for mobile
- Test on older devices
- Monitor memory usage

## 📞 Support

- **Capacitor Docs**: https://capacitorjs.com/docs
- **iOS Development**: https://developer.apple.com/ios/
- **Xcode Help**: https://developer.apple.com/xcode/

---

## 🎯 Quick Start Commands

```bash
# 1. Build the web app
npm run build

# 2. Sync to iOS
npm run ios:sync

# 3. Open in Xcode
npm run ios:open

# 4. Run on device/simulator (in Xcode)
```

Your NexField oil & energy contractor marketplace is now ready to become a native iOS app! 🚀
