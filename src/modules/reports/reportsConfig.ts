/* ─── Reports Catalog ───
 * Central registry of all reports available in the Reports module.
 * Grouped by category as shown in the search dropdown.
 */

export interface ReportItem {
  key: string;
  label: string;
}

export interface ReportCategory {
  key: string;
  label: string;
  reports: ReportItem[];
}

export const reportCategories: ReportCategory[] = [
  {
    key: 'crs-distribution',
    label: 'CRS / Distribution Reports',
    reports: [
      { key: 'crs-booking-summary', label: 'CRS Booking Summary Report' },
    ],
  },
  {
    key: 'daily-shift',
    label: 'Daily & Shift Reports',
    reports: [
      { key: 'cashier', label: 'Cashier Report' },
      { key: 'daily-collection-by-payment-type', label: 'Daily Collection by Payment Type Report' },
      { key: 'daily-collection', label: 'Daily Collection Report' },
      { key: 'daily-other-charges', label: 'Daily Other Charges Report' },
      { key: 'daily-reservation-sheet', label: 'Daily Reservation Sheet Report' },
      { key: 'daily-shift', label: 'Daily Shift Report' },
      { key: 'daily-summary', label: 'Daily Summary Report' },
    ],
  },
  {
    key: 'guest-operations',
    label: 'Guest Operations Reports',
    reports: [
      { key: 'guest-arrival', label: 'Guest Arrival Report' },
      { key: 'guest-departure', label: 'Guest Departure Report' },
      { key: 'guest-segmentation', label: 'Guest Segmentation Report' },
      { key: 'room-space-type-arrivals', label: 'Room/Space Type Arrivals Report' },
    ],
  },
  {
    key: 'housekeeping-room-status',
    label: 'Housekeeping & Room Status Reports',
    reports: [
      { key: 'housekeeping-task-summary', label: 'Housekeeping Task Summary Report' },
      { key: 'room-status-change', label: 'Room Status Change Report' },
      { key: 'room-type-restriction-change', label: 'Room Type Restriction Change Report' },
    ],
  },
  {
    key: 'ledger',
    label: 'Ledger Reports',
    reports: [
      { key: 'deposit-ledger', label: 'Deposit Ledger' },
      { key: 'group-ledger', label: 'Group Ledger Report' },
      { key: 'guest-ledger', label: 'Guest Ledger Report' },
      { key: 'ledger-summary', label: 'Ledger Summary Report' },
    ],
  },
  {
    key: 'payments-transactions',
    label: 'Payments & Transactions Reports',
    reports: [
      { key: 'credit-card-activity', label: 'Credit Card Activity Report' },
      { key: 'daily-credit-card-summary', label: 'Daily Credit Card Summary' },
    ],
  },
  {
    key: 'reservation-occupancy',
    label: 'Reservation & Occupancy Reports',
    reports: [
      { key: 'in-house-room-change', label: 'In-House Room Change Report' },
      { key: 'maintenance', label: 'Maintenance Report' },
      { key: 'reservation-detail', label: 'Reservation Detail Report' },
    ],
  },
  {
    key: 'revenue-financial',
    label: 'Revenue & Financial Reports',
    reports: [
      { key: 'adr-by-business-source', label: 'ADR by Business Source Report' },
      { key: 'no-show-cancel-revenue', label: 'No-Show/Cancel Revenue Report' },
      { key: 'rate-type-performance', label: 'Rate Type Performance Report' },
      { key: 'revenue-by-room-type', label: 'Revenue By Room Type Report' },
      { key: 'room-type-rate-change', label: 'Room Type Rate Change Report' },
      { key: 'sales-revenue', label: 'Sales & Revenue Report' },
    ],
  },
  {
    key: 'tax-compliance',
    label: 'Tax & Compliance Reports',
    reports: [
      { key: 'tax-detail', label: 'Tax Detail Report' },
      { key: 'tax-exemption', label: 'Tax Exemption Report' },
      { key: 'tax-exempt-claim', label: 'Tax Exempt Claim Report' },
    ],
  },
];

/* Flat lookup: reportKey -> { label, categoryLabel } */
export const reportLookup: Record<string, { label: string; categoryLabel: string }> = (() => {
  const map: Record<string, { label: string; categoryLabel: string }> = {};
  for (const cat of reportCategories) {
    for (const r of cat.reports) {
      map[r.key] = { label: r.label, categoryLabel: cat.label };
    }
  }
  return map;
})();
