# Pothe (পথে) - Smart Public Transport Tracking & Demand Prediction System

> **Frontend Architecture & Android Deliverables (SE231 Capstone Project)**  
> Built strictly with **React + TypeScript + Vite**, styled via **Tailwind CSS + Design Tokens**, and native-wrapped with **Capacitor 6** for Android.

---

## 1. Project Overview & System Scope

**Pothe (পথে)** is an intelligent transit tracking and demand prediction platform designed for metropolitan Dhaka. Instead of relying on expensive, tamper-prone in-vehicle GPS hardware, Pothe leverages a network of **geofenced human checkers** at designated bus stops combined with a **probabilistic Kalman estimation engine** to provide:
1. High-accuracy bus arrival times (ETAs) and live seat/standing occupancy predictions to everyday commuters.
2. A streamlined, 3-tap counter interface with a 60-second grace period for field transit checkers.
3. A centralized intelligence portal for Government Authorities (DTCA/BRTA) and private bus fleet syndicates.

---

## 2. Monorepo Repository Structure

```
FrontEnd_02/
├── apps/
│   ├── passenger-app/       # React + Capacitor (Android package: com.pothe.passenger)
│   │   ├── android/         # Native Android project (Gradle 8.2 / AGP 8.2)
│   │   ├── src/             # 14 Passenger screens (P01 – P14)
│   │   └── package.json
│   │
│   └── checker-app/         # React + Capacitor (Android package: com.pothe.checker)
│       ├── android/         # Native Android project (Gradle 8.2 / AGP 8.2)
│       ├── src/             # 10 Checker screens (C01 – C10)
│       └── package.json
│
├── web/
│   └── admin-portal/        # React + Vite (Desktop/Tablet Responsive)
│       ├── src/             # Government & Bus Owner Dashboards
│       └── package.json
│
├── packages/
│   ├── design-tokens/       # Shared colors, typography scale, spacing, radii
│   └── mock-data/           # Domain models, fixtures, and mock service layer
│
├── apk-output/
│   ├── passenger/
│   │   └── passenger-debug.apk   # Built native APK (~3.7 MB)
│   └── checker/
│       └── checker-debug.apk     # Built native APK (~3.7 MB)
│
└── docs/
    ├── README.md            # This documentation guide
    ├── screen-inventory.md  # Detailed inventory of all 24 mobile + 6 web screens
    └── design-system.md     # Full design tokens & UI specification
```

---

## 3. Prerequisites & Environment Setup

To run or build all applications, ensure your machine has the following tools installed:

| Tool | Required Version | Verification Command | Notes |
|---|---|---|---|
| **Node.js** | `v20.x` or `v22.x` | `node -v` | Core JS runtime |
| **npm** | `v10.x` | `npm -v` | Monorepo workspace manager |
| **Java JDK** | **OpenJDK 21** | `javac -version` | **Mandatory** for Gradle 8.2 compatibility |
| **Android SDK** | Platforms `android-34`, Build Tools `34.0.0` | `adb --version` | Located at `$ANDROID_HOME` |

> [!IMPORTANT]
> **Gradle / JDK Compatibility Notice:**  
> Gradle 8.2 (embedded in Capacitor 6) does not support JDK 25 or JDK 26 (throws class file version 70 errors). If your system default Java is JDK 25+, you must set:
> ```bash
> export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
> export ANDROID_HOME=$HOME/Library/Android/sdk
> ```

---

## 4. Quick Start & Development Servers

Install dependencies from the repository root:
```bash
npm install
```

### Running Applications Locally

#### 1. Passenger App (`http://localhost:5173`)
```bash
npm run dev:passenger
```

#### 2. Checker App (`http://localhost:5174`)
```bash
npm run dev:checker
```

#### 3. Web Admin Portal (`http://localhost:5175`)
```bash
npm run dev:admin
```

#### Full Build Pipeline Test
To typecheck and build production assets across all 5 monorepo projects simultaneously:
```bash
npm run build:all
```

---

## 5. Seeded Demo Credentials

All authentication is handled by a zero-latency mock service layer with persisted sessions in `localStorage`.

### 1. Passenger App
- **Phone Number**: `+880 1712-345678`
- **SMS OTP**: Enter any 6-digit code (e.g. `123456`) or click **Auto-Fill OTP**.
- **User**: Ramim Azad (Verified Commuter)

### 2. Checker App
- **Employee ID**: `CHK-8801`
- **Password**: Any password (or click **Use Demo Credentials**)
- **User**: Rahim Uddin (Assigned to Mirpur 10 Checkpoint, Morning Shift)

### 3. Web Admin Portal
- **Government Authority (DTCA)**:
  - **ID / Email**: `planning@dtca.gov.bd`
  - **Password**: Any password (or click **Gov Quick Fill**)
  - **User**: Dr. Shahabuddin Ahmed (Director of Urban Transit Planning)
- **Bus Syndicate Fleet Owner**:
  - **ID / Email**: `rafiqul@thikanabus.com`
  - **Password**: Any password (or click **Owner Quick Fill**)
  - **User**: Al-Haj Rafiqul Islam (Thikana Paribahan Fleet)

---

## 6. Android Build & APK Pipeline

Both mobile apps have standalone, native Android projects located at:
- `apps/passenger-app/android/`
- `apps/checker-app/android/`

### Automated Build Commands
From the workspace root, run:
```bash
# Build Passenger App Debug APK
npm run build:apk:passenger

# Build Checker App Debug APK
npm run build:apk:checker
```

Each script automatically executes the full CI/CD pipeline:
1. Compiles TypeScript and builds the web bundle (`vite build`).
2. Synchronizes web assets and plugins to Android (`npx cap sync android`).
3. Invokes Gradle with JDK 21 (`./gradlew assembleDebug`).
4. Verifies and copies the output APK to the root `/apk-output/` directory.

### Verified Deliverables in `/apk-output`
| App Name | Package ID | Output File | Verified File Size |
|---|---|---|---|
| **Passenger App** | `com.pothe.passenger` | `apk-output/passenger/passenger-debug.apk` | **~3.7 MB** |
| **Checker App** | `com.pothe.checker` | `apk-output/checker/checker-debug.apk` | **~3.7 MB** |

---

## 7. Android Permissions & Privacy Rationale

Both apps declare only the strictly necessary permissions in `AndroidManifest.xml`:

| Permission | App | Technical Need / Screen Context |
|---|---|---|
| `android.permission.INTERNET` | Passenger & Checker | Cloud mock sync and live telemetry streaming |
| `android.permission.ACCESS_FINE_LOCATION` | Passenger & Checker | **P05/P06**: Finding nearest bus stop; **C02**: 50m geofence radius verification |
| `android.permission.ACCESS_COARSE_LOCATION` | Passenger & Checker | Battery-efficient approximate location fallback |
| `android.permission.CAMERA` | Passenger | **P11**: Attaching photo evidence to citizen complaint |
| `android.permission.READ_MEDIA_IMAGES` | Passenger | **P11**: Selecting existing photo proof from device gallery |

---

## 8. Opening in Android Studio

Both projects can be directly opened in **Android Studio** with zero manual configuration:
1. Launch Android Studio.
2. Select **Open** and choose either:
   - `apps/passenger-app/android`
   - `apps/checker-app/android`
3. Gradle will sync automatically using the configured Gradle wrapper (`gradle-8.2.1-bin.zip`).
4. Select an Android Virtual Device (API 33 or API 34 recommended) and click **Run (Shift+F10)**.

---

## 9. Production Release Keystore & Signing Guide

To generate a production-ready signed APK:

### 1. Generate Keystore
```bash
keytool -genkey -v -keystore pothe-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias pothe-key
```

### 2. Configure `android/app/build.gradle`
Add signing configuration to the `android` block:
```groovy
signingConfigs {
    release {
        storeFile file(System.getenv("KEYSTORE_PATH") ?: "pothe-release-key.jks")
        storePassword System.getenv("KEYSTORE_PASSWORD")
        keyAlias System.getenv("KEY_ALIAS")
        keyPassword System.getenv("KEY_PASSWORD")
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### 3. Build Release APK
```bash
cd apps/passenger-app/android
./gradlew assembleRelease
```
The signed APK will be output to:
`apps/passenger-app/android/app/build/outputs/apk/release/app-release.apk`
