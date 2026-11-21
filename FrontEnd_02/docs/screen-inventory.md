# Screen Inventory - Pothe (পথে) Transit System

This inventory lists every screen in the **Passenger App**, **Checker App**, and **Web Admin Portal** for the Pothe (পথে) Smart Public Transport Tracking & Demand Prediction System (SE231 project).

---

## 1. Passenger App (`apps/passenger-app`)
Package Name: `com.pothe.passenger`  
Navigation Pattern: Top App Header with persistent 5-Tab Bottom Navigation (`Home`, `Buses`, `Alerts`, `Complaints`, `Profile`).

| Screen ID | Screen Name | Route Path | Purpose | Key Components | Navigation In | Navigation Out |
|---|---|---|---|---|---|---|
| **P01** | Splash & Language Selection | `/splash` | App brand intro and first-launch language preference toggle | Pothe logo, English/Bengali radio buttons, "Get Started" CTA | App cold start | `/onboarding` |
| **P02** | Passenger Onboarding | `/onboarding` | 3-step feature showcase (Real-time tracking, seat occupancy, crowd alerts) | Carousel slides, dot indicator, Skip/Next/Finish buttons | `/splash` | `/login` |
| **P03** | Phone Number Authentication | `/login` | Passwordless phone login with country code `+880` | Phone input field, OTP trigger button, terms notice | `/onboarding`, `/profile` | `/otp` |
| **P04** | 6-Digit OTP Verification | `/otp` | SMS OTP verification with auto-fill simulation | 6 digit boxes, resend timer countdown, Verify CTA | `/login` | `/home` |
| **P05** | Home Dashboard | `/home` | Primary commuting hub with live search and quick routes | Route search bar, recent trips, live corridor cards, bottom nav | `/otp`, Bottom Nav | `/search`, `/route/:id`, tabs |
| **P06** | Search & Route Discovery | `/search` | Origin/Destination corridor filter & autocomplete | Origin/destination inputs, recent searches, filtered route cards | `/home` | `/route/:id` |
| **P07** | Route Detail & Checkpoint Timeline | `/route/:routeId` | Stop-by-stop checkpoint timeline with crowd level dots | Route header stats, vertical stop timeline, crowd badges | `/home`, `/search` | `/bus/:busId` |
| **P08** | Bus Detail & Live ETA | `/bus/:busId` | Specific vehicle telemetry, ETA, seat vs standing load | ETA card, confidence %, seat vs stand gauges, crowd pill | `/route/:routeId`, `/buses` | `/route/:routeId`, `/complaints/new` |
| **P09** | Live Corridor Tracking | `/buses` | Real-time map & list of all active buses on corridor | Segment schematic, bus list with ETAs and occupancy | Bottom Nav (`Buses`) | `/bus/:busId` |
| **P10** | Corridor Alerts & Congestion Warnings | `/alerts` | Push-style congestion warnings and bottleneck alerts | Alert cards with severity badge, time stamps, mark all read | Bottom Nav (`Alerts`) | Dismiss alert |
| **P11** | File a Complaint | `/complaints/new` | Passenger grievance submission with photo evidence | Category picker, target selector, description, file upload | Bottom Nav (`Complaints`) | `/complaints/track/:id` |
| **P12** | Grievance Tracking & Timeline | `/complaints/track/:id` | Status docket showing investigation stages | Status banner, vertical timeline with timestamps, inquiry details | `/complaints/new`, `/complaints` | Bottom Nav |
| **P13** | Complaints History | `/complaints` | List of all previously filed grievances by this passenger | Complaint cards with status pills, filter tabs (All/Active/Resolved) | Bottom Nav (`Complaints`) | `/complaints/track/:id` |
| **P14** | Passenger Profile & Settings | `/profile` | Manage user details, language, notification preferences, logout | User card, language selector, push toggles, sign out CTA | Bottom Nav (`Profile`) | `/login` |

---

## 2. Checker App (`apps/checker-app`)
Package Name: `com.pothe.checker`  
Navigation Pattern: Fixed Bottom Navigation with 3 primary operational tabs (`Entry`, `History`, `Profile`).

| Screen ID | Screen Name | Route Path | Purpose | Key Components | Navigation In | Navigation Out |
|---|---|---|---|---|---|---|
| **C01** | Checker Login | `/login` | Authentication for field checkers using Employee ID | ID input, password field, Shift/Location badge, demo fill | App launch, `/profile` | `/dashboard` |
| **C02** | Checker Shift Dashboard | `/dashboard` | Active checkpoint status, geofence radius check, shift summary | Geofence verification badge, assigned stop card, quick stats | `/login`, Bottom Nav (`Entry`) | `/entry` |
| **C03** | Bus Detection & Plate Selection | `/entry` | Select arriving bus by license plate or search | License plate pills, route selector, quick filter | `/dashboard`, Bottom Nav | `/entry/count` |
| **C04** | Passenger Count Entry | `/entry/count` | Fast field entry of sitting and standing passenger counts | Stepper buttons (+1, +5, -1), big number display, Submit CTA | `/entry` | `/entry/confirm` |
| **C05** | Count Review & Confirmation | `/entry/confirm` | Summary confirmation before locking record to server | Count review card, capacity check, Confirm & Broadcast CTA | `/entry/count` | `/entry/success` |
| **C06** | Submission Success & Grace Period | `/entry/success` | Confirms broadcast; starts 60-second editable grace timer | Success animation, 60s countdown circular progress, Edit button | `/entry/confirm` | `/dashboard`, `/entry/edit/:id` |
| **C07** | Grace Period Correction | `/entry/edit/:id` | Amend count within grace window with required reason | Adjustment stepper, reason dropdown (Miscount, Quick board), Save | `/entry/success`, `/history` | `/entry/success` |
| **C08** | Offline Sync Queue | `/offline` | Queues logs during cell coverage dropouts; auto-sync | Pending sync list, retry button, network status indicator | Network drop banner | `/dashboard` |
| **C09** | Shift Submission History | `/history` | Chronological log of all buses logged during current shift | Entry cards, sitting/standing tags, correction state badge | Bottom Nav (`History`) | `/entry/edit/:id` |
| **C10** | Checker Profile & Shift Handover | `/profile` | Checker employee details, shift stats, handover & logout | Stats grid (buses counted, corrections), End Shift CTA | Bottom Nav (`Profile`) | `/login` |

---

## 3. Web Admin Portal (`web/admin-portal`)
URL: `http://localhost:5175`  
Navigation Pattern: Top branded header with Live Signal & Quick Role Switcher, combined with a responsive sidebar.

### 3.1 Authentication & Role Gate
- **Route**: `/login`
- **Features**: Role selector (Government Transit Authority vs Bus Fleet Operator), Demo credential autofill, mock session persistence in `localStorage`.

### 3.2 Government Transit Authority (DTCA) Views
| View Name | Route Path | Purpose & Functionality | Key Visualizations |
|---|---|---|---|
| **Transit Overview** | `/gov/overview` | Executive city-wide dashboard across all bus routes and corridors | KPI metric cards, Live Corridor schematic map with active bus markers, real-time checker telemetry stream, critical bottleneck alerts |
| **Demand Analytics** | `/gov/demand` | Long-term transit planning, peak hour load curves, capacity utilization | Recharts Area chart (Weekly, Monthly, 6-Monthly, Annual), Bar chart of seated vs standing passenger ratios, capacity utilization gauge per checkpoint |
| **Operator Monitoring** | `/gov/operators` | Compliance ratings, punctuality metrics, and silent checkpoint detour detection | Operator scorecard table, silent checkpoint anomaly detector card with detour flags, formal route audit notice trigger |
| **Complaints Oversight** | `/gov/complaints` | Citizen grievance management and regulatory accountability | Category breakdown cards, searchable complaint ledger, investigation docket with evidence review, status update actions |
| **Export & Audits** | `/gov/export` | Formal statutory reporting for DTCA, BRTA, and city authorities | Configurable report generator (CSV & printable PDF), corridor filters, ISO transit format |

### 3.3 Bus Fleet Owner Views (e.g. Thikana Paribahan)
| View Name | Route Path | Purpose & Functionality | Key Visualizations |
|---|---|---|---|
| **Fleet Overview** | `/owner/fleet` | Fleet operations center for company-owned vehicles | Fleet operational status KPIs, interactive corridor map filtered to company buses, assigned vehicles inventory table |
| **Live Bus Telemetry** | `/owner/bus/:busId` | Per-vehicle diagnostics and daily checkpoint progression | Dual occupancy gauges (Sitting vs Standing), vehicle specs & driver credentials, chronological checkpoint verification log |
| **Demand & Scheduling** | `/owner/demand` | Dispatch optimization to maximize seat revenue and minimize empty runs | Morning and evening commute rush peak indicators, hourly passenger load curves, AI fleet manager dispatch guidance |
| **Fleet Complaints** | `/owner/complaints` | Manage complaints targeting company drivers and bus crew | Filtered grievance feed, official response composer, formal redressal submission to DTCA |
