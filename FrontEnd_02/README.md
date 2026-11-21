# Pothe (পথে) - Smart Public Transport Tracking & Demand Prediction System

> **Frontend Architecture & Android Native Artifacts (SE231 Capstone Project)**  
> Developed for Metropolitan Dhaka • React + TypeScript + Vite + Capacitor + Android Studio

---

## 🌟 Executive Summary

**Pothe (পথে)** is a comprehensive public transit tracking and predictive intelligence platform. It solves Dhaka's acute commuter challenges through a hybrid architecture:
1. **Passenger Mobile App**: 14 screens covering live corridor tracking, bus arrival ETA predictions, seating/standing load gauges, and public grievance logging.
2. **Checker Mobile App**: 10 screens featuring an ultra-fast, 3-tap passenger counting interface with a 60-second editable grace period, 50m geofence validation, and offline sync.
3. **Web Admin Portal**: Unified intelligence portal for **Government Transit Authorities (DTCA)** and **Bus Syndicate Fleet Owners** featuring real-time telemetry maps, demand load curve analysis, operator compliance scorecards, and audit report generation.

---

## 📦 Verified Deliverables

### Native Android APKs (`/apk-output`)
- 📱 **Passenger App**: `apk-output/passenger/passenger-debug.apk` (Package: `com.pothe.passenger`, **3.7 MB**)
- 📱 **Checker App**: `apk-output/checker/checker-debug.apk` (Package: `com.pothe.checker`, **3.7 MB**)

### Monorepo Structure
- `apps/passenger-app`: React + Capacitor native Android project
- `apps/checker-app`: React + Capacitor native Android project
- `web/admin-portal`: React + Vite web dashboard for Government & Fleet Owners
- `packages/design-tokens`: Shared design tokens (colors, typography, spacing, radii)
- `packages/mock-data`: Shared domain types, fixtures, and mock service layer
- `docs/`: Comprehensive project documentation (`README.md`, `screen-inventory.md`, `design-system.md`)

---

## 🚀 Quick Run Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Servers
```bash
# Passenger App (Mobile Web Preview)
npm run dev:passenger    # http://localhost:5173

# Checker App (Mobile Web Preview)
npm run dev:checker      # http://localhost:5174

# Web Admin Portal (Government & Fleet Owner)
npm run dev:admin        # http://localhost:5175
```

### 3. Build Everything
```bash
npm run build:all
```

### 4. Build Android Debug APKs
```bash
npm run build:apk:passenger
npm run build:apk:checker
```

---

## 📚 Complete Documentation
For detailed screen inventories, design token tables, credentials, and Android Studio instructions:
- [docs/README.md](docs/README.md)
- [docs/screen-inventory.md](docs/screen-inventory.md)
- [docs/design-system.md](docs/design-system.md)
