# Grean Energy - User Help Documentation

Welcome to the Grean Energy application! This guide will help you get started and make the most of our renewable energy monitoring platform.

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Features Overview](#features-overview)
3. [Interactive 3D Model](#interactive-3d-model)
4. [Energy System Components](#energy-system-components)
5. [Navigation Guide](#navigation-guide)
6. [Troubleshooting](#troubleshooting)
7. [Configuration](#configuration)
8. [FAQ](#frequently-asked-questions)
9. [Support](#support)

---

## 🚀 Getting Started

### First Time Setup

1. **Access the Application**
   - Open your web browser
   - Navigate to the Grean Energy application URL
   - The application will load with an interactive energy system visualization

2. **System Requirements**
   - Modern web browser (Chrome, Firefox, Safari, Edge)
   - JavaScript enabled
   - Stable internet connection for 3D model loading
   - Recommended screen resolution: 1024x768 or higher

3. **Initial Loading**
   - The application may take a few moments to load the 3D interactive model
   - You'll see a loading animation while the energy system initializes
   - If loading takes too long, check your internet connection

---

## ✨ Features Overview

### 🏠 Home Section
- **Interactive Energy Dashboard**: Real-time visualization of energy flow
- **3D Energy Model**: Interactive Spline-powered 3D visualization
- **System Status**: Current energy production and consumption metrics

### 🔋 Energy System Components
- **Solar Panels**: Monitor solar energy generation
- **Inverters**: Track power conversion efficiency
- **Battery Storage**: View energy storage levels
- **Smart Switches**: Control energy distribution
- **LED Indicators**: Visual status of system components

### 📊 Enhanced Features ✅ IMPLEMENTED
- **Premium Animations**: Smooth energy flow visualizations with pause/resume control
- **Sound Effects**: Audio feedback for system interactions with volume control
- **Responsive Design**: Optimized for desktop, tablet, and mobile with gesture support
- **Dark/Light Mode**: Toggle between visual themes with system preference detection
- **Keyboard Shortcuts**: Full keyboard navigation and control system
- **Mobile Gestures**: Touch-based navigation and component interaction
- **Error Handling**: Robust 3D model loading with retry mechanisms
- **System Status**: Real-time monitoring of all application features

---

## 🎮 Interactive 3D Model

### Using the 3D Visualization

1. **Navigation Controls**
   - **Mouse/Touch**: Rotate the 3D model by clicking and dragging
   - **Scroll/Pinch**: Zoom in and out of the energy system
   - **Reset View**: Double-click to return to default view

2. **Interactive Elements**
   - **Solar Panels**: Click to view energy generation data
   - **Inverters**: Interact to see conversion statistics
   - **Switches**: Toggle to control energy flow
   - **Bulbs**: Click to test lighting systems

3. **Loading States**
   - If the 3D model doesn't load, you'll see a "Try Again" button
   - Check your internet connection if loading fails repeatedly
   - The system will show helpful error messages if configuration is missing

### 3D Model Features
- **Real-time Energy Flow**: Watch energy move through the system
- **Component Highlighting**: Interactive elements glow when hovered
- **Status Indicators**: Visual feedback for system health
- **Performance Optimized**: Smooth animations on modern devices

---

## ⚡ Energy System Components

### Solar Panel Nodes
- **Function**: Convert sunlight to electrical energy
- **Visual Indicators**: Blue glow indicates active generation
- **Interaction**: Click to view current output levels
- **Status**: Green = optimal, Yellow = reduced efficiency, Red = maintenance needed

### Inverter Systems
- **Function**: Convert DC power to AC power
- **Visual Indicators**: Pulsing animation shows conversion activity
- **Monitoring**: Real-time efficiency percentages
- **Alerts**: Audio/visual warnings for system issues

### Smart Switches
- **Function**: Control energy distribution throughout the system
- **Interaction**: Click to toggle on/off states
- **Visual Feedback**: LED-style indicators show current status
- **Safety**: Automatic shutoff during maintenance mode

### Battery Storage
- **Function**: Store excess energy for later use
- **Visual Indicators**: Fill level animations show charge status
- **Monitoring**: Real-time charge/discharge rates
- **Optimization**: Smart charging based on energy availability

---

## 🧭 Navigation Guide

### Main Navigation
- **Home**: Return to main energy dashboard
- **Enhanced**: Access premium features and advanced analytics
- **Green**: Sustainability metrics and environmental impact
- **Animation Test**: Developer tools for testing system animations

### Mobile Navigation
- **Hamburger Menu**: Access all sections on mobile devices
- **Swipe Gestures**: Navigate between sections with touch
- **Responsive Layout**: Optimized interface for smaller screens

### Keyboard Shortcuts ✅ IMPLEMENTED
- **Space**: Pause/resume animations
- **R**: Reset 3D model view
- **F**: Toggle fullscreen mode
- **Esc**: Exit fullscreen or close modals

### Audio Controls ✅ IMPLEMENTED
- **Audio Feedback**: Button clicks, component interactions, and ambient sounds
- **Volume Control**: Adjustable audio levels with mute option
- **Sound Effects**: Inverter hum, fan noise, button clicks, and alerts

### Mobile Gestures ✅ IMPLEMENTED
- **Swipe Left/Right**: Navigate between sections and control components
- **Pinch**: Zoom 3D model
- **Tap**: Activate components

### Theme System ✅ IMPLEMENTED
- **Theme Toggle**: Switch between light, dark, and system themes
- **Persistent Settings**: Theme preferences saved automatically
- **System Integration**: Follows device theme preferences

---

## 🔧 Troubleshooting

### Common Issues

#### 3D Model Not Loading
**Problem**: The interactive 3D model shows an error or doesn't appear

**Solutions**:
1. **Check Internet Connection**: Ensure stable internet connectivity
2. **Browser Compatibility**: Use a modern browser with WebGL support
3. **Clear Cache**: Refresh the page or clear browser cache
4. **Disable Extensions**: Temporarily disable browser extensions that might block 3D content
5. **Try Again Button**: Click the "Try Again" button if it appears

#### Performance Issues
**Problem**: Slow animations or laggy interactions

**Solutions**:
1. **Close Other Tabs**: Free up browser memory
2. **Update Browser**: Ensure you're using the latest browser version
3. **Hardware Acceleration**: Enable hardware acceleration in browser settings
4. **Reduce Quality**: Some browsers automatically adjust 3D quality based on performance

#### Audio Not Working
**Problem**: No sound effects during interactions

**Solutions**:
1. **Check Volume**: Ensure system and browser volume are enabled
2. **Browser Permissions**: Allow audio playback in browser settings
3. **Autoplay Policy**: Some browsers block autoplay - interact with the page first
4. **Audio Format Support**: Ensure your browser supports MP3 audio files

#### Mobile Display Issues
**Problem**: Layout problems on mobile devices

**Solutions**:
1. **Rotate Device**: Try both portrait and landscape orientations
2. **Zoom Level**: Adjust browser zoom to 100%
3. **Full Screen**: Use full-screen mode for better experience
4. **Update Browser**: Ensure mobile browser is up to date

### Error Messages

#### "Configuration Required"
- **Cause**: Missing environment configuration for 3D model
- **Solution**: Contact system administrator to configure SPLINE_SCENE URL

#### "3D Model Unavailable"
- **Cause**: Network issues or server problems
- **Solution**: Check internet connection and try again later

#### "Component Not Found"
- **Cause**: Missing system components
- **Solution**: Refresh the page or contact support

---

## ⚙️ Configuration

### Environment Variables
The application uses the following configuration:

```
NEXT_PUBLIC_SPLINE_SCENE="https://my.spline.design/lightningbulb-y5xHAcgz5Y5XycvkpgJ9zO94/"
```

### Browser Settings
For optimal experience:
- **JavaScript**: Must be enabled
- **WebGL**: Required for 3D graphics
- **Audio**: Enable for sound effects
- **Cookies**: Allow for preferences storage

### Performance Settings
- **Hardware Acceleration**: Enable in browser settings
- **Memory**: Minimum 4GB RAM recommended
- **Graphics**: Dedicated GPU recommended for complex 3D scenes

---

## ❓ Frequently Asked Questions

### General Questions

**Q: What is Grean Energy?**
A: Grean Energy is an interactive web application for monitoring and managing renewable energy systems with real-time 3D visualizations.

**Q: Do I need to install anything?**
A: No, it's a web-based application that runs entirely in your browser.

**Q: Is it free to use?**
A: Yes, the basic features are free. Premium features may require subscription.

### Technical Questions

**Q: Why is the 3D model loading slowly?**
A: The 3D model is loaded from external servers. Slow loading can be due to internet speed or server load.

**Q: Can I use this on my phone?**
A: Yes, the application is fully responsive and optimized for mobile devices.

**Q: What browsers are supported?**
A: All modern browsers including Chrome, Firefox, Safari, and Edge.

### Feature Questions

**Q: How do I interact with the energy components?**
A: Click on solar panels, switches, and other components to view their status and control their operation.

**Q: Can I save my preferences?**
A: Yes, your theme preferences and settings are automatically saved in your browser.

**Q: How accurate are the energy readings?**
A: The application shows simulated data for demonstration purposes. Real implementations would connect to actual energy monitoring systems.

---

## 🆘 Support

### Getting Help

1. **Documentation**: Check this help file first
2. **Troubleshooting**: Try the solutions in the troubleshooting section
3. **Browser Console**: Check for error messages (F12 → Console)
4. **Contact Support**: Reach out to the development team

### Reporting Issues

When reporting problems, please include:
- **Browser and Version**: e.g., "Chrome 120.0"
- **Operating System**: e.g., "Windows 11", "macOS Sonoma"
- **Error Messages**: Any error text that appears
- **Steps to Reproduce**: What you were doing when the issue occurred
- **Screenshots**: Visual evidence of the problem

### Contact Information

- **Email**: support@greanenergy.com
- **GitHub**: [Project Repository](https://github.com/yourusername/grean-energy)
- **Documentation**: [Online Docs](https://docs.greanenergy.com)

---

## 🔄 Updates and Changelog

### Recent Updates
- **v1.0.0**: Major feature implementation update
  - ✅ **Keyboard Shortcuts**: Space, R, F, Esc controls implemented
  - ✅ **Enhanced Audio System**: Complete sound effects with volume control
  - ✅ **Theme Toggle**: Light/dark/system theme switching
  - ✅ **Mobile Gestures**: Swipe and pinch gesture navigation
  - ✅ **Error Handling**: Robust 3D model loading with retry mechanisms
  - ✅ **System Status**: Real-time feature monitoring dashboard
  - ✅ **Component Interactions**: Audio feedback for all user interactions
- **v0.1.0**: Initial release with 3D energy visualization
- **SplineViewer**: Enhanced 3D model integration with error handling
- **Mobile Optimization**: Improved responsive design
- **Performance**: Optimized loading and animation performance

### Upcoming Features
- **Real-time Data**: Integration with actual energy monitoring systems
- **User Accounts**: Personal dashboards and settings
- **Advanced Analytics**: Detailed energy usage reports
- **Multi-language**: Support for additional languages

---

*Last Updated: December 2024*
*Version: 1.0.0*
