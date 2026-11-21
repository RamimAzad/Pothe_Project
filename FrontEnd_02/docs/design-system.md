# Design System Specification - Pothe (পথে)

This document specifies the design tokens, visual hierarchy, typography, components, and interaction guidelines used across the **Passenger App**, **Checker App**, and **Web Admin Portal**.

All tokens are defined in `@pothe/design-tokens` and consumed across Tailwind CSS configurations.

---

## 1. Color Palette

The color system is derived from Dhaka's public transit branding, with deep teal greens as primary brand colors, high-contrast functional status hues, and WCAG AA accessibility compliance.

### 1.1 Primary Brand (`pothe`)
| Token | Hex Value | Usage |
|---|---|---|
| `pothe-50` | `#ECFDF5` | Subtle backgrounds, active tab pills, badge backgrounds |
| `pothe-100` | `#D1FAE5` | Border highlights, soft chips |
| `pothe-200` | `#A7F3D0` | Secondary borders, interactive hover states |
| `pothe-300` | `#6EE7B7` | Disabled buttons, secondary icons |
| `pothe-400` | `#34D399` | Light brand accent |
| `pothe-500` | `#10B981` | Active toggles, secondary buttons |
| `pothe-600` / `pothe` | `#0F7B4F` | **Core Brand Primary**: App headers, primary CTAs, active bottom nav icon |
| `pothe-700` / `pothe-dark` | `#0A5C3D` | Hover state for primary CTAs, dark headers |
| `pothe-800` | `#064E3B` | Active/clicked state for CTAs |
| `pothe-900` | `#022C22` | High-contrast brand text, hero banners |

### 1.2 Neutral Palette (`neutral`)
| Token | Hex Value | Usage |
|---|---|---|
| `neutral-50` | `#F8FAFC` | Page background, card backgrounds |
| `neutral-100` | `#F1F5F9` | Secondary card background, dividers |
| `neutral-200` | `#E2E8F0` | Border lines, card borders, inactive pills |
| `neutral-300` | `#CBD5E1` | Input borders, timeline connector lines |
| `neutral-400` | `#94A3B8` | Placeholder text, disabled icon state |
| `neutral-500` | `#64748B` | Secondary captions, helper text |
| `neutral-600` | `#475569` | Supporting body copy |
| `neutral-700` | `#334155` | Medium-emphasis labels, table headers |
| `neutral-800` | `#1E293B` | Subheadings, card titles |
| `neutral-900` | `#0F172A` | **High-emphasis primary text**, titles, headings |

### 1.3 Functional & Status Indicators
| Token | Hex Value | Role |
|---|---|---|
| `status-green` | `#059669` | Success states, verified geofence badge, on-time punctuality |
| `status-amber` | `#D97706` | Warnings, moderate delays, pending review, 60s grace period |
| `status-red` | `#DC2626` | Critical alerts, overcrowded capacity, bypassed checkpoint |
| `status-blue` | `#2563EB` | Informational callouts, route details |

### 1.4 Crowd Density Indicators (`crowd`)
| Token | Hex Value | Threshold | Description |
|---|---|---|---|
| `crowd-low` | `#059669` | `< 60%` | Ample seats available |
| `crowd-med` | `#D97706` | `60% – 85%` | Limited seats; moderate standing load |
| `crowd-high` | `#DC2626` | `> 85%` | No seats; dense standing conditions |

---

## 2. Typography

The system uses a dual-font configuration to guarantee crisp readability in English and native typography for Bengali text.

- **Primary Latin**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`
- **Primary Bengali**: `Hind Siliguri`, `SolaimanLipi`, `Noto Sans Bengali`, `sans-serif`

### Type Scale
| Style | Size | Line Height | Weight | Tailwind Class |
|---|---|---|---|---|
| **Display** | 28px (`1.75rem`) | 34px | Bold (700) | `text-3xl font-bold` |
| **H1** | 24px (`1.5rem`) | 30px | Bold (700) | `text-2xl font-bold` |
| **H2** | 20px (`1.25rem`) | 26px | SemiBold (600) | `text-xl font-semibold` |
| **H3** | 16px (`1.0rem`) | 22px | SemiBold (600) | `text-base font-semibold` |
| **Body (Default)** | 14px (`0.875rem`) | 20px | Regular (400) / Medium (500) | `text-sm font-normal` |
| **Caption** | 12px (`0.75rem`) | 16px | Medium (500) | `text-xs font-medium` |
| **Micro / Overline** | 10px (`0.625rem`) | 14px | SemiBold (600) | `text-[10px] font-semibold uppercase tracking-wider` |

---

## 3. Spacing Scale

Based on an 8-point grid with 4-point half-steps:

| Token | Size | Common Use Case |
|---|---|---|
| `0.5` | 2px | Pill internal padding, micro dots |
| `1` | 4px | Icon and label spacing, tight tag padding |
| `2` | 8px | Button internal padding, badge padding |
| `3` | 12px | List item vertical padding, form input padding |
| `4` | 16px | Card internal padding, screen edge margins (mobile) |
| `5` | 20px | Section margins, dialog padding |
| `6` | 24px | Desktop card padding, header margins |
| `8` | 32px | Major component separation |

---

## 4. Corner Radius (`borderRadius`)

| Token | Size | Typical Elements |
|---|---|---|
| `sm` | 4px | Small tags, micro badges, table cells |
| `md` | 8px | Form inputs, buttons, status chips |
| `lg` | 12px | Cards, dialog modals, bottom sheet drawers |
| `xl` | 16px | Top app headers, featured stat widgets |
| `2xl` | 20px | Bottom navigation containers, large banners |
| `full` | 9999px | Avatars, crowd indicator pills, circular action buttons |

---

## 5. Component Patterns & Mobile Interaction Rules

### 5.1 Touch Target Compliance
- All interactive controls (buttons, navigation tabs, dropdown triggers, stepper counter buttons) have a minimum touch target size of **48 × 48 px**.
- Touch target padding is preserved even when the visual icon is smaller (e.g. 24px icon inside a 48px touch container).

### 5.2 Mobile Safe Area Insets
- All mobile screens include top safe area padding (`pt-[env(safe-area-inset-top)]`) and bottom safe area padding (`pb-[env(safe-area-inset-bottom)]`) to support edge-to-edge displays on modern Android and iOS devices.
- Screen root layout specifies `viewport-fit=cover`.

### 5.3 Iconography
- Icons are rendered via `lucide-react` with a standardized `strokeWidth={2.0}`.
- Standard sizes:
  - Micro / Inline: `w-3.5 h-3.5` (14px)
  - Navigation / Actions: `w-4 h-4` or `w-5 h-5` (16–20px)
  - Hero / Illustration: `w-8 h-8` or `w-10 h-10` (32–40px)

### 5.4 State Hierarchy
Every screen supports explicit state representation:
1. **Loading State**: Subtle skeleton loaders or pulse animations (no abrupt layout shifts).
2. **Empty State**: Clear contextual illustration / icon with actionable secondary prompt.
3. **Error State**: Non-blocking banner with retry action.
4. **Offline Mode**: Non-intrusive status pill indicating cached telemetry with auto-sync retry.
