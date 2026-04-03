# ASI - System Architecture

## 1. Architecture Overview

ASI is a modular, scalable hotel PMS system.

The system follows:
- Modular architecture
- Clear separation of concerns
- Domain-driven structure (based on PMS workflows)

---

## 2. High-Level Modules

### Core Domains

1. Reservations
2. Front Desk
3. Calendar (Availability)
4. Housekeeping
5. Rates & Availability
6. Guests (Guest DB, Group DB)
7. Night Audit
8. Reports
9. Admin & Configuration

Each domain is isolated and communicates via well-defined interfaces.

---

## 3. Frontend Architecture (React / NextJS)

### Structure

- pages/ or app/ → routing (NextJS)
- components/ → reusable UI components
- modules/ → domain-based features (IMPORTANT)
- services/ → API calls
- hooks/ → reusable logic
- utils/ → helper functions
- types/ → TypeScript definitions

---

### Domain-Based Folder Structure (IMPORTANT)

All features must follow a domain-based structure under modules/.

---

## 4. API Layer

### Rules

- APIs must be predictable and consistent
- No overloading endpoints
- Separate read and write concerns if needed

---

## 5. State Management

- Prefer local state where possible
- Use global state ONLY when necessary

Examples:
- Reservation form → local state
- User/session → global state

---

## 6. Data Flow

Standard flow:

UI → Hook → Service → API → Response → UI

- Components must NOT call APIs directly
- Always go through service layer

---

## 7. Key System Concepts

### 7.1 Working Date vs System Date
- Working date drives hotel operations
- Used in:
  - reservations
  - night audit
  - reports

---

### 7.2 Hourly vs Nightly Bookings
- Separate calculation logic
- Must not conflict in availability

---

### 7.3 Reservation Lifecycle

- Pre-stay → booking created
- In-stay → checked-in
- Post-stay → checked-out

All modules must respect this lifecycle

---

## 8. Scalability Principles

- Keep modules independent
- Avoid tight coupling
- Design for future:
  - multi-property support
  - integrations (OTA, payments)

---

## 9. Error Handling

- Centralized error handling
- Meaningful error messages
- No silent failures

---

## 10. Logging & Audit

- All critical actions must be logged:
  - reservation updates
  - guest changes
  - payment changes

Audit logs must:
- capture before/after state
- include user + timestamp

---

## 11. Anti-Patterns (STRICT)

- Direct API calls from components
- Mixing business logic inside UI
- Cross-module dependencies
- Hardcoded values
- Ignoring PMS domain rules

---

## 12. Future Considerations

- Multi-property support
- Role-based access control
- High-volume reservation handling
- Real-time updates (WebSockets if needed)
