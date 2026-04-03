# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# ASI - Hotel PMS System Context

## Product Overview
ASI is a hotel Property Management System (PMS) designed to handle end-to-end hotel operations including reservations, guest management, front desk operations, housekeeping, rate management, and reporting.

The system is used by hotel staff such as receptionists, managers, and administrators to manage daily operations efficiently.

---

## Core Modules

### 1. Operations
- Calendar View (room availability across dates)
- Reservations (create, modify, cancel bookings)
- Front Desk (check-in, check-out, room assignment, guest handling)
- Housekeeping (room status, task assignment, cleaning workflow)

### 2. Guest & Business Data
- Guest Database (individual guest profiles, history)
- Group Database (group bookings and members)
- Business Channels (sources like OTA, corporate, walk-in)

### 3. Revenue & Rates
- Rates & Availability (pricing, inventory)
- Rate Adjustment Panel
- Restrictions (min stay, max stay, closed to arrival/departure)
- Forecasting

### 4. System Operations
- Night Audit (day closure, financial reconciliation)
- Payment / Credit Card Authorization

### 5. Admin & Configuration
- Property Configuration
- Users & Roles (permissions and access control)
- Policies (cancellation, no-show, etc.)
- General Settings

### 6. Reports
- Reservation reports
- Revenue reports
- Operational reports

---

## Key Functional Capabilities

### Reservations
- Support multi-room, multi-rate, multi-night bookings
- Support hourly reservations in addition to nightly bookings
- Allow merging and splitting reservations
- Handle group reservations with multiple guests

### Front Desk
- Check-in / Check-out flows
- Room assignment and reassignment
- Late check-out handling
- Walk-in reservations

### Rates & Pricing
- Derived rates (child rates dependent on base rates)
- Dynamic pricing
- Hourly rate calculation logic
- Taxes, fees, and add-ons

### Night Audit
- End-of-day financial reconciliation
- Transition of working date
- Handling edge cases like pending check-outs

---

## Important System Concepts

### Working Date vs System Date
- Working date is controlled by hotel operations (used for night audit)
- System date is actual current date
- Many operations depend on working date instead of system date

### Hourly Reservations
- Booking is based on hours as well as nights
- Requires special handling for:
  - Availability
  - Pricing
  - Late checkout
  - Overlaps with nightly bookings

---

## UX Principles

- System should be workflow-driven, not module-driven
- Minimize cognitive load for hotel staff
- Ensure clarity in reservation lifecycle (pre-stay, in-stay, post-stay)
- Avoid duplication between modules (e.g., reservations vs front desk)
- Provide strong audit trails for all critical actions

---

## Expectations from Claude

- Suggest UX improvements with clear reasoning
- Identify edge cases in hotel operations
- Help design scalable backend logic and data models
- Ensure consistency across modules
- Think from perspective of hotel staff (receptionist, manager, admin)
