import React, { useState } from 'react';
import { Select, Table, Checkbox, Tooltip, Segmented } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as XLSX from 'xlsx';
import './RevenueByRoomTypeReport.css';

/* ─── Icons ─── */
const ColumnsIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.25" fill="none"/>
    <rect x="6" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.25" fill="none"/>
    <rect x="11" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.25" fill="none"/>
  </svg>
);

const ExportIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 11.5V12.5C3 13.052 3.448 13.5 4 13.5H12C12.552 13.5 13 13.052 13 12.5V11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    <path d="M8 2.5V10.5M8 10.5L5.5 8M8 10.5L10.5 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShuffleIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4.5h2.5c1 0 1.8.5 2.5 1.5M2 11.5h2.5c1 0 1.8-.5 2.5-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M10 3l2.5 1.5L10 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10l2.5 1.5L10 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 6c1 1 2 1.5 3 1.5h3M6.5 10c1-1 2-1.5 3-1.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

/* ═══════════════════════════════════════════
   APPROACH 1 — Separate Non-Hourly & Hourly
   ═══════════════════════════════════════════ */

interface NonHourlyRow {
  key: string; roomType: string; sold: number; total: number;
  revenue: number; adr: number; revpar: number; isTotal?: boolean;
}
const nonHourlyData: NonHourlyRow[] = [
  { key: '1', roomType: '(STD) Standard', sold: 6,  total: 14, revenue: 600,  adr: 100.00, revpar: 42.86 },
  { key: '2', roomType: '(DLX) Deluxe',   sold: 3,  total: 8,  revenue: 450,  adr: 150.00, revpar: 56.25 },
  { key: '3', roomType: '(STE) Suite',    sold: 1,  total: 4,  revenue: 300,  adr: 300.00, revpar: 75.00 },
  { key: 'T', roomType: 'Total', sold: 10, total: 26, revenue: 1350, adr: 135.00, revpar: 51.92, isTotal: true },
];

interface HourlyRow {
  key: string; roomType: string; roomsAvailable: number; roomsUtilized: number;
  bookings: number; revenue: number; adr: number; revpar: number; isTotal?: boolean;
}
const hourlyData: HourlyRow[] = [
  { key: '1', roomType: 'Executive Suite', roomsAvailable: 5,  roomsUtilized: 5,  bookings: 6,  revenue: 2100, adr: 350, revpar: 420 },
  { key: '2', roomType: 'King Room',       roomsAvailable: 10, roomsUtilized: 10, bookings: 14, revenue: 2380, adr: 170, revpar: 238 },
  { key: '3', roomType: 'Queen Smoking',   roomsAvailable: 3,  roomsUtilized: 3,  bookings: 11, revenue: 1320, adr: 120, revpar: 440 },
  { key: '4', roomType: 'Queen Double',    roomsAvailable: 12, roomsUtilized: 9,  bookings: 9,  revenue: 1530, adr: 170, revpar: 128 },
  { key: '5', roomType: 'King Smoking',    roomsAvailable: 8,  roomsUtilized: 4,  bookings: 4,  revenue: 680,  adr: 170, revpar: 85  },
  { key: 'T', roomType: 'Total', roomsAvailable: 38, roomsUtilized: 29, bookings: 44, revenue: 8010, adr: 182, revpar: 211, isTotal: true },
];

/* ═══════════════════════════════════════════
   APPROACH 2 — Unified Room-Hour Model
   Rules:
   - Full-day rooms sold → rooms × 24 hours
   - Available Hours = Total Rooms × 24
   - Avg Rate/Hr = Revenue / Room Hours Sold
   - RevPAR/Hr  = Revenue / Available Hours
   ═══════════════════════════════════════════ */

interface UnifiedRow {
  key: string; roomType: string; totalRooms: number;
  availHours: number; hoursSold: number; revenue: number;
  avgRatePerHour: number; revparPerHour: number; isTotal?: boolean;
}

/*
  STD: 10 rooms | avail=240 | sold=120 (5 full-day × 24) | rev=$1,200 → avg=$10 | revpar=$5.00
  DLX:  5 rooms | avail=120 | sold= 60 (2.5 full-day × 24 effectively) | rev=$900 → avg=$15 | revpar=$7.50
  STE:  4 rooms | avail= 96 | sold= 30 | rev=$600 → avg=$20 | revpar=$6.25
  Total:19 rooms | avail=456 | sold=210 | rev=$2,700 → avg=$12.86 | revpar=$5.92
*/
const unifiedData: UnifiedRow[] = [
  { key: '1', roomType: '(STD) Standard', totalRooms: 10, availHours: 240, hoursSold: 120, revenue: 1200, avgRatePerHour: 10.00, revparPerHour: 5.00 },
  { key: '2', roomType: '(DLX) Deluxe',   totalRooms: 5,  availHours: 120, hoursSold: 60,  revenue: 900,  avgRatePerHour: 15.00, revparPerHour: 7.50 },
  { key: '3', roomType: '(STE) Suite',    totalRooms: 4,  availHours: 96,  hoursSold: 30,  revenue: 600,  avgRatePerHour: 20.00, revparPerHour: 6.25 },
  { key: 'T', roomType: 'Total', totalRooms: 19, availHours: 456, hoursSold: 210, revenue: 2700, avgRatePerHour: 12.86, revparPerHour: 5.92, isTotal: true },
];

/* ═══════════════════════════════════════════
   APPROACH 3 — Transaction-Based (Industry Standard)
   Rules:
   - Every reservation = 1 room sold (hourly or full-day)
   - Rooms sold CAN exceed total rooms (room reuse)
   - No hour-based calculations
   - ADR   = Revenue ÷ Rooms Sold
   - RevPAR = Revenue ÷ Total Rooms
   ═══════════════════════════════════════════ */

interface TxnRow {
  key: string; roomType: string; sold: number; total: number;
  revenue: number; adr: number; revpar: number; isTotal?: boolean;
}

/*
  STD: 10 rooms, 14 sold (4 reused) → rev=$1,400, ADR=$100, RevPAR=$140
  DLX:  5 rooms,  5 sold            → rev=$750,   ADR=$150, RevPAR=$150
  STE:  4 rooms,  4 sold            → rev=$800,   ADR=$200, RevPAR=$200
  Total:19 rooms, 23 sold           → rev=$2,950, ADR=$128.26, RevPAR=$155.26
*/
const txnData: TxnRow[] = [
  { key: '1', roomType: '(STD) Standard', sold: 14, total: 10, revenue: 1400, adr: 100.00, revpar: 140.00 },
  { key: '2', roomType: '(DLX) Deluxe',   sold: 5,  total: 5,  revenue: 750,  adr: 150.00, revpar: 150.00 },
  { key: '3', roomType: '(STE) Suite',    sold: 4,  total: 4,  revenue: 800,  adr: 200.00, revpar: 200.00 },
  { key: 'T', roomType: 'Total', sold: 23, total: 19, revenue: 2950, adr: 128.26, revpar: 155.26, isTotal: true },
];

/* ─── Approach info blocks ─── */
interface ApproachInfo {
  description: string;
  pros: string[];
  cons: string[];
}
const approachInfo: Record<string, ApproachInfo> = {
  '1': {
    description: 'Treats hourly and full-day reservations as two separate products with their own metrics. Non-hourly performance is measured in nights (ADR, RevPAR); hourly performance is measured in hours (Avg Rate/Hr, RevPAR/Hr).',
    pros: [
      'Clear separation of two fundamentally different revenue streams',
      'Familiar night-based metrics for full-day rooms',
      'Dedicated hourly analytics without distorting overnight data',
    ],
    cons: [
      'No single unified view of total room performance',
      'Comparing total hotel RevPAR requires combining two different scales',
      'More complex for ownership and auditor reporting',
    ],
  },
  '2': {
    description: 'Converts all reservations into a common room-hour currency — full-day stays count as 24 room-hours. This creates a single unified table where hourly and overnight business are directly comparable.',
    pros: [
      'Single unified table across all reservation types',
      'Useful when hourly inventory is significant',
      'Mathematically consistent — one scale for all bookings',
    ],
    cons: [
      'Not aligned with industry-standard RevPAR (per-night basis)',
      'A 2-hour stay weighs the same per-hour as an overnight stay',
      'Less familiar to STR benchmarking, OTAs, and ownership groups',
    ],
  },
  '3': {
    description: 'Standard hotel industry model — every reservation event counts as 1 room sold, regardless of duration. If a room is reused within the same day, it is counted again. No hour-based calculations.',
    pros: [
      'Matches STR, OTA, and ownership reporting standards exactly',
      'ADR and RevPAR are universally understood by auditors',
      'Supports rooms sold exceeding inventory (captures true revenue yield)',
    ],
    cons: [
      'Ignores duration — a 2-hour stay counts identically to an overnight',
      'Can inflate ADR when many short-stay reservations are included',
      'Requires separate tracking to understand hourly vs full-day mix',
    ],
  },
};

/* ─── Column configs ─── */
interface ColConfig { key: string; label: string; visible: boolean }

const defaultNonHourlyCols: ColConfig[] = [
  { key: 'sold',    label: 'Sold / Total Rooms', visible: true },
  { key: 'revenue', label: 'Revenue ($)',         visible: true },
  { key: 'adr',     label: 'ADR ($)',             visible: true },
  { key: 'revpar',  label: 'RevPAR ($)',          visible: true },
];
const defaultHourlyCols: ColConfig[] = [
  { key: 'roomsAvailable', label: 'Rooms Available', visible: true },
  { key: 'roomsUtilized',  label: 'Rooms Utilized',  visible: true },
  { key: 'bookings',       label: 'Bookings',        visible: true },
  { key: 'revenue',        label: 'Revenue ($)',     visible: true },
  { key: 'adr',            label: 'ADR ($)',         visible: true },
  { key: 'revpar',         label: 'RevPAR ($)',      visible: true },
];
const defaultUnifiedCols: ColConfig[] = [
  { key: 'totalRooms',     label: 'Total Rooms',        visible: true },
  { key: 'availHours',     label: 'Available Hours',    visible: true },
  { key: 'hoursSold',      label: 'Room Hours Sold',    visible: true },
  { key: 'revenue',        label: 'Revenue ($)',         visible: true },
  { key: 'avgRatePerHour', label: 'Avg Rate / Hour ($)', visible: true },
  { key: 'revparPerHour',  label: 'RevPAR / Hour ($)',  visible: true },
];
const defaultTxnCols: ColConfig[] = [
  { key: 'sold',    label: 'Sold / Total Rooms', visible: true },
  { key: 'revenue', label: 'Revenue ($)',         visible: true },
  { key: 'adr',     label: 'ADR ($)',             visible: true },
  { key: 'revpar',  label: 'RevPAR ($)',          visible: true },
];

/* ─── Period options ─── */
const periodOptions = [
  { value: 'today',      label: 'Today' },
  { value: 'yesterday',  label: 'Yesterday' },
  { value: 'this-week',  label: 'This Week' },
  { value: 'last-week',  label: 'Last Week' },
  { value: 'this-month', label: 'This Month' },
  { value: 'last-month', label: 'Last Month' },
  { value: 'custom',     label: 'Custom Range' },
];

const fmt  = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtN = (v: number) => v.toLocaleString('en-US');

/* ─── Excel export ─── */
function exportToExcel(approach: string, period: string) {
  const wb = XLSX.utils.book_new();

  if (approach === '1') {
    const nhSheet = XLSX.utils.json_to_sheet(nonHourlyData.map(r => ({
      'Room Type': r.roomType, 'Sold Rooms': r.sold, 'Total Rooms': r.total,
      'Revenue ($)': r.revenue, 'ADR ($)': r.adr, 'RevPAR ($)': r.revpar,
    })));
    nhSheet['!cols'] = [{ wch: 30 }, { wch: 12 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, nhSheet, 'Non-Hourly');

    const hSheet = XLSX.utils.json_to_sheet(hourlyData.map(r => ({
      'Room Type': r.roomType, 'Rooms Available': r.roomsAvailable, 'Rooms Utilized': r.roomsUtilized,
      'Bookings': r.bookings, 'Revenue ($)': r.revenue, 'ADR ($)': r.adr, 'RevPAR ($)': r.revpar,
    })));
    hSheet['!cols'] = [{ wch: 30 }, { wch: 16 }, { wch: 16 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, hSheet, 'Hourly');
  }

  if (approach === '2') {
    const uSheet = XLSX.utils.json_to_sheet(unifiedData.map(r => ({
      'Room Type': r.roomType, 'Total Rooms': r.totalRooms,
      'Available Hours': r.availHours, 'Room Hours Sold': r.hoursSold,
      'Revenue ($)': r.revenue, 'Avg Rate/Hour ($)': r.avgRatePerHour, 'RevPAR/Hour ($)': r.revparPerHour,
    })));
    uSheet['!cols'] = [{ wch: 30 }, { wch: 12 }, { wch: 18 }, { wch: 18 }, { wch: 14 }, { wch: 20 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(wb, uSheet, 'Unified (Room-Hour)');
  }

  if (approach === '3') {
    const tSheet = XLSX.utils.json_to_sheet(txnData.map(r => ({
      'Room Type': r.roomType, 'Rooms Sold': r.sold, 'Total Rooms': r.total,
      'Revenue ($)': r.revenue, 'ADR ($)': r.adr, 'RevPAR ($)': r.revpar,
    })));
    tSheet['!cols'] = [{ wch: 30 }, { wch: 12 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, tSheet, 'Transaction-Based');
  }

  XLSX.writeFile(wb, `Revenue_By_Room_Type_Approach${approach}_${period}.xlsx`);
}

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */
const RevenueByRoomTypeReport: React.FC = () => {
  const [approach, setApproach] = useState<string>('1');
  const [tab, setTab]           = useState<'non-hourly' | 'hourly'>('non-hourly');
  const [period, setPeriod]     = useState('today');
  const [colDropdownOpen, setColDropdownOpen] = useState(false);

  const [nhCols,  setNhCols]  = useState<ColConfig[]>(defaultNonHourlyCols);
  const [hCols,   setHCols]   = useState<ColConfig[]>(defaultHourlyCols);
  const [uCols,   setUCols]   = useState<ColConfig[]>(defaultUnifiedCols);
  const [txnCols, setTxnCols] = useState<ColConfig[]>(defaultTxnCols);
  const [txnAltKpi, setTxnAltKpi] = useState(false);

  /* Active col config depends on approach + tab */
  const currentCols =
    approach === '3' ? txnCols :
    approach === '2' ? uCols :
    tab === 'non-hourly' ? nhCols : hCols;
  const setCurrentCols =
    approach === '3' ? setTxnCols :
    approach === '2' ? setUCols :
    tab === 'non-hourly' ? setNhCols : setHCols;

  const isVis = (key: string) => currentCols.find(c => c.key === key)?.visible ?? true;
  const toggleCol = (key: string) =>
    setCurrentCols(prev => prev.map(c => c.key === key ? { ...c, visible: !c.visible } : c));

  /* ── Approach 1: Non-Hourly columns ── */
  const nonHourlyCols: ColumnsType<NonHourlyRow> = [
    {
      title: 'Room Type', dataIndex: 'roomType', key: 'roomType', width: 220,
      sorter: (a, b) => a.roomType.localeCompare(b.roomType),
      render: (v, row) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{v}</span>,
    },
    ...(isVis('sold') ? [{
      title: 'Sold / Total Rooms', key: 'sold', width: 170, align: 'right' as const,
      sorter: (a: NonHourlyRow, b: NonHourlyRow) => a.sold - b.sold,
      render: (_: unknown, row: NonHourlyRow) =>
        <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmtN(row.sold)} / {fmtN(row.total)}</span>,
    }] : []),
    ...(isVis('revenue') ? [{
      title: 'Revenue ($)', dataIndex: 'revenue', key: 'revenue', width: 140, align: 'right' as const,
      sorter: (a: NonHourlyRow, b: NonHourlyRow) => a.revenue - b.revenue,
      render: (v: number, row: NonHourlyRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
    ...(isVis('adr') ? [{
      title: 'ADR ($)', dataIndex: 'adr', key: 'adr', width: 120, align: 'right' as const,
      sorter: (a: NonHourlyRow, b: NonHourlyRow) => a.adr - b.adr,
      render: (v: number, row: NonHourlyRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
    ...(isVis('revpar') ? [{
      title: 'RevPAR ($)', dataIndex: 'revpar', key: 'revpar', width: 130, align: 'right' as const,
      sorter: (a: NonHourlyRow, b: NonHourlyRow) => a.revpar - b.revpar,
      render: (v: number, row: NonHourlyRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
  ];

  /* ── Approach 1: Hourly columns ── */
  const hourlyCols: ColumnsType<HourlyRow> = [
    {
      title: 'Room Type', dataIndex: 'roomType', key: 'roomType', width: 220,
      sorter: (a, b) => a.roomType.localeCompare(b.roomType),
      render: (v, row) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{v}</span>,
    },
    ...(isVis('roomsAvailable') ? [{
      title: 'Rooms Available', dataIndex: 'roomsAvailable', key: 'roomsAvailable', width: 150, align: 'right' as const,
      sorter: (a: HourlyRow, b: HourlyRow) => a.roomsAvailable - b.roomsAvailable,
      render: (v: number, row: HourlyRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmtN(v)}</span>,
    }] : []),
    ...(isVis('roomsUtilized') ? [{
      title: 'Rooms Utilized', dataIndex: 'roomsUtilized', key: 'roomsUtilized', width: 150, align: 'right' as const,
      sorter: (a: HourlyRow, b: HourlyRow) => a.roomsUtilized - b.roomsUtilized,
      render: (v: number, row: HourlyRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmtN(v)}</span>,
    }] : []),
    ...(isVis('bookings') ? [{
      title: 'Bookings', dataIndex: 'bookings', key: 'bookings', width: 130, align: 'right' as const,
      sorter: (a: HourlyRow, b: HourlyRow) => a.bookings - b.bookings,
      render: (v: number, row: HourlyRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmtN(v)}</span>,
    }] : []),
    ...(isVis('revenue') ? [{
      title: 'Revenue ($)', dataIndex: 'revenue', key: 'revenue', width: 140, align: 'right' as const,
      sorter: (a: HourlyRow, b: HourlyRow) => a.revenue - b.revenue,
      render: (v: number, row: HourlyRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
    ...(isVis('adr') ? [{
      title: 'ADR ($)', dataIndex: 'adr', key: 'adr', width: 120, align: 'right' as const,
      sorter: (a: HourlyRow, b: HourlyRow) => a.adr - b.adr,
      render: (v: number, row: HourlyRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
    ...(isVis('revpar') ? [{
      title: 'RevPAR ($)', dataIndex: 'revpar', key: 'revpar', width: 130, align: 'right' as const,
      sorter: (a: HourlyRow, b: HourlyRow) => a.revpar - b.revpar,
      render: (v: number, row: HourlyRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
  ];

  /* ── Approach 3: Transaction-Based columns ── */
  const txnTableCols: ColumnsType<TxnRow> = [
    {
      title: 'Room Type', dataIndex: 'roomType', key: 'roomType', width: 220,
      sorter: (a, b) => a.roomType.localeCompare(b.roomType),
      render: (v, row) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{v}</span>,
    },
    ...(isVis('sold') ? [{
      title: 'Sold / Total Rooms', key: 'sold', width: 170, align: 'right' as const,
      sorter: (a: TxnRow, b: TxnRow) => a.sold - b.sold,
      render: (_: unknown, row: TxnRow) => (
        <span className={row.isTotal ? 'rrt-total-cell' : ''}>
          {row.sold > row.total
            ? <><span className="rrt-sold-over">{fmtN(row.sold)}</span> / {fmtN(row.total)}</>
            : <>{fmtN(row.sold)} / {fmtN(row.total)}</>}
        </span>
      ),
    }] : []),
    ...(isVis('revenue') ? [{
      title: 'Revenue ($)', dataIndex: 'revenue', key: 'revenue', width: 140, align: 'right' as const,
      sorter: (a: TxnRow, b: TxnRow) => a.revenue - b.revenue,
      render: (v: number, row: TxnRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
    ...(isVis('adr') ? [{
      title: 'ADR ($)', dataIndex: 'adr', key: 'adr', width: 120, align: 'right' as const,
      sorter: (a: TxnRow, b: TxnRow) => a.adr - b.adr,
      render: (v: number, row: TxnRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
    ...(isVis('revpar') ? [{
      title: 'RevPAR ($)', dataIndex: 'revpar', key: 'revpar', width: 130, align: 'right' as const,
      sorter: (a: TxnRow, b: TxnRow) => a.revpar - b.revpar,
      render: (v: number, row: TxnRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
  ];

  /* ── Approach 2: Unified columns ── */
  const unifiedCols: ColumnsType<UnifiedRow> = [
    {
      title: 'Room Type', dataIndex: 'roomType', key: 'roomType', width: 220,
      sorter: (a, b) => a.roomType.localeCompare(b.roomType),
      render: (v, row) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{v}</span>,
    },
    ...(isVis('totalRooms') ? [{
      title: 'Total Rooms', dataIndex: 'totalRooms', key: 'totalRooms', width: 140, align: 'right' as const,
      sorter: (a: UnifiedRow, b: UnifiedRow) => a.totalRooms - b.totalRooms,
      render: (v: number, row: UnifiedRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmtN(v)}</span>,
    }] : []),
    ...(isVis('availHours') ? [{
      title: 'Available Hours', dataIndex: 'availHours', key: 'availHours', width: 160, align: 'right' as const,
      sorter: (a: UnifiedRow, b: UnifiedRow) => a.availHours - b.availHours,
      render: (v: number, row: UnifiedRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmtN(v)}</span>,
    }] : []),
    ...(isVis('hoursSold') ? [{
      title: 'Room Hours Sold', dataIndex: 'hoursSold', key: 'hoursSold', width: 160, align: 'right' as const,
      sorter: (a: UnifiedRow, b: UnifiedRow) => a.hoursSold - b.hoursSold,
      render: (v: number, row: UnifiedRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmtN(v)}</span>,
    }] : []),
    ...(isVis('revenue') ? [{
      title: 'Revenue ($)', dataIndex: 'revenue', key: 'revenue', width: 140, align: 'right' as const,
      sorter: (a: UnifiedRow, b: UnifiedRow) => a.revenue - b.revenue,
      render: (v: number, row: UnifiedRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
    ...(isVis('avgRatePerHour') ? [{
      title: 'Avg Rate / Hour ($)', dataIndex: 'avgRatePerHour', key: 'avgRatePerHour', width: 190, align: 'right' as const,
      sorter: (a: UnifiedRow, b: UnifiedRow) => a.avgRatePerHour - b.avgRatePerHour,
      render: (v: number, row: UnifiedRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
    ...(isVis('revparPerHour') ? [{
      title: 'RevPAR / Hour ($)', dataIndex: 'revparPerHour', key: 'revparPerHour', width: 180, align: 'right' as const,
      sorter: (a: UnifiedRow, b: UnifiedRow) => a.revparPerHour - b.revparPerHour,
      render: (v: number, row: UnifiedRow) => <span className={row.isTotal ? 'rrt-total-cell' : ''}>{fmt(v)}</span>,
    }] : []),
  ];

  return (
    <div className="rrt-container">

      {/* ── Toolbar ── */}
      <div className="rrt-toolbar">
        <div className="rrt-toolbar-left">
          <Select
            className="rrt-period-select"
            value={period}
            onChange={setPeriod}
            options={periodOptions}
            size="middle"
          />
        </div>

        <div className="rrt-toolbar-right">
          <Segmented
            className="rrt-approach-segmented"
            value={approach}
            onChange={v => { setApproach(v as string); setColDropdownOpen(false); }}
            options={[
              { label: 'Approach 1', value: '1' },
              { label: 'Approach 2', value: '2' },
              { label: 'Approach 3', value: '3' },
            ]}
          />

          {/* Custom columns */}
          <div className="rrt-icon-btn-wrapper">
            <Tooltip title="Customize Columns" placement="top">
              <button
                className={`rrt-icon-btn${colDropdownOpen ? ' active' : ''}`}
                onClick={() => setColDropdownOpen(o => !o)}
              >
                <ColumnsIcon />
              </button>
            </Tooltip>
            {colDropdownOpen && (
              <>
                <div className="rrt-col-backdrop" onClick={() => setColDropdownOpen(false)} />
                <div className="rrt-col-dropdown">
                  <div className="rrt-col-dropdown-header">Customize Columns</div>
                  {currentCols.map(col => (
                    <div key={col.key} className="rrt-col-dropdown-item">
                      <Checkbox checked={col.visible} onChange={() => toggleCol(col.key)}>
                        {col.label}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Export */}
          <Tooltip title="Export to Excel" placement="top">
            <button className="rrt-icon-btn" onClick={() => exportToExcel(approach, period)}>
              <ExportIcon />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* ══ APPROACH 1 ══ */}
      {approach === '1' && (
        <>
          <div className="rrt-tabs">
            <button className={`rrt-tab${tab === 'non-hourly' ? ' active' : ''}`} onClick={() => setTab('non-hourly')}>Non-Hourly</button>
            <button className={`rrt-tab${tab === 'hourly'     ? ' active' : ''}`} onClick={() => setTab('hourly')}>Hourly</button>
          </div>
          {tab === 'non-hourly' && (
            <Table<NonHourlyRow> className="rrt-table" columns={nonHourlyCols} dataSource={nonHourlyData}
              pagination={false} size="middle" scroll={{ x: 'max-content' }}
              rowClassName={r => r.isTotal ? 'rrt-total-row' : ''} />
          )}
          {tab === 'hourly' && (
            <Table<HourlyRow> className="rrt-table" columns={hourlyCols} dataSource={hourlyData}
              pagination={false} size="middle" scroll={{ x: 'max-content' }}
              rowClassName={r => r.isTotal ? 'rrt-total-row' : ''} />
          )}
        </>
      )}

      {/* ══ APPROACH 2 ══ */}
      {approach === '2' && (
        <>
          <div className="rrt-approach2-note">
            Full-day reservations are converted to <strong>24 room-hours each</strong>. All reservation types are measured on a common hour-based scale.
          </div>

          {/* KPI Cards */}
          <div className="rrt-kpi-grid">

            {/* 1. Reservations Split */}
            <div className="rrt-kpi-card">
              <div className="rrt-kpi-title">Reservations Split</div>
              <div className="rrt-kpi-total">30</div>
              <div className="rrt-kpi-divider" />
              <div className="rrt-kpi-row">
                <span className="rrt-kpi-dot rrt-dot-hourly" />
                <span className="rrt-kpi-label">Hourly</span>
                <span className="rrt-kpi-value">24</span>
                <span className="rrt-kpi-pct rrt-pct-hourly">80%</span>
              </div>
              <div className="rrt-kpi-row">
                <span className="rrt-kpi-dot rrt-dot-nonhourly" />
                <span className="rrt-kpi-label">Non-Hourly</span>
                <span className="rrt-kpi-value">6</span>
                <span className="rrt-kpi-pct rrt-pct-nonhourly">20%</span>
              </div>
              <div className="rrt-kpi-bar-track">
                <div className="rrt-kpi-bar-fill rrt-bar-hourly" style={{ width: '80%' }} />
              </div>
            </div>

            {/* 2. Revenue Split */}
            <div className="rrt-kpi-card">
              <div className="rrt-kpi-title">Revenue Split</div>
              <div className="rrt-kpi-total">$2,700</div>
              <div className="rrt-kpi-divider" />
              <div className="rrt-kpi-row">
                <span className="rrt-kpi-dot rrt-dot-hourly" />
                <span className="rrt-kpi-label">Hourly</span>
                <span className="rrt-kpi-value">$900</span>
                <span className="rrt-kpi-pct rrt-pct-hourly">33%</span>
              </div>
              <div className="rrt-kpi-row">
                <span className="rrt-kpi-dot rrt-dot-nonhourly" />
                <span className="rrt-kpi-label">Non-Hourly</span>
                <span className="rrt-kpi-value">$1,800</span>
                <span className="rrt-kpi-pct rrt-pct-nonhourly">67%</span>
              </div>
              <div className="rrt-kpi-bar-track">
                <div className="rrt-kpi-bar-fill rrt-bar-hourly" style={{ width: '33%' }} />
              </div>
            </div>

            {/* 3. Room Hours */}
            <div className="rrt-kpi-card">
              <div className="rrt-kpi-title">Room Hours</div>
              <div className="rrt-kpi-total">210 hrs</div>
              <div className="rrt-kpi-divider" />
              <div className="rrt-kpi-row">
                <span className="rrt-kpi-dot rrt-dot-hourly" />
                <span className="rrt-kpi-label">Hourly</span>
                <span className="rrt-kpi-value">70 hrs</span>
                <span className="rrt-kpi-pct rrt-pct-hourly">33%</span>
              </div>
              <div className="rrt-kpi-row">
                <span className="rrt-kpi-dot rrt-dot-nonhourly" />
                <span className="rrt-kpi-label">Non-Hourly</span>
                <span className="rrt-kpi-value">140 hrs</span>
                <span className="rrt-kpi-pct rrt-pct-nonhourly">67%</span>
              </div>
              <div className="rrt-kpi-bar-track">
                <div className="rrt-kpi-bar-fill rrt-bar-hourly" style={{ width: '33%' }} />
              </div>
            </div>

            {/* 4. RevPAR Comparison */}
            <div className="rrt-kpi-card">
              <div className="rrt-kpi-title">RevPAR Comparison</div>
              <div className="rrt-kpi-total rrt-kpi-total-sm">per available hour</div>
              <div className="rrt-kpi-divider" />
              <div className="rrt-kpi-row rrt-kpi-row-lg">
                <span className="rrt-kpi-dot rrt-dot-hourly" />
                <span className="rrt-kpi-label">Hourly RevPAR</span>
                <span className="rrt-kpi-value rrt-kpi-value-lg rrt-value-hourly">$2.50</span>
              </div>
              <div className="rrt-kpi-row rrt-kpi-row-lg">
                <span className="rrt-kpi-dot rrt-dot-nonhourly" />
                <span className="rrt-kpi-label">Non-Hourly RevPAR</span>
                <span className="rrt-kpi-value rrt-kpi-value-lg rrt-value-nonhourly">$4.00</span>
              </div>
              <div className="rrt-kpi-bar-track rrt-kpi-bar-split">
                <div className="rrt-kpi-bar-fill rrt-bar-hourly" style={{ width: '38.5%' }} />
                <div className="rrt-kpi-bar-fill rrt-bar-nonhourly" style={{ width: '61.5%' }} />
              </div>
            </div>

          </div>

          <Table<UnifiedRow> className="rrt-table" columns={unifiedCols} dataSource={unifiedData}
            pagination={false} size="middle" scroll={{ x: 'max-content' }}
            rowClassName={r => r.isTotal ? 'rrt-total-row' : ''} />
        </>
      )}

      {/* ══ APPROACH 3 ══ */}
      {approach === '3' && (
        <>
          {/* KPI Cards */}
          <div className="rrt-kpi-section">
            <div className="rrt-kpi-section-hd">
              <Tooltip title={txnAltKpi ? 'Switch to Alternative 1' : 'Switch to Alternative 2'} placement="top">
                <button
                  className={`rrt-kpi-alt-toggle${txnAltKpi ? ' active' : ''}`}
                  onClick={() => setTxnAltKpi(v => !v)}
                >
                  <ShuffleIcon />
                  <span>{txnAltKpi ? 'Alternative 1' : 'Alternative 2'}</span>
                </button>
              </Tooltip>
            </div>

            <div className="rrt-kpi-grid rrt-kpi-grid-txn">

              <div className="rrt-kpi-card">
                <div className="rrt-kpi-title">Occupancy %</div>
                {txnAltKpi ? (
                  <>
                    <div className="rrt-kpi-total">140%</div>
                    <div className="rrt-kpi-alt-badge">+40% Turnover Index</div>
                  </>
                ) : (
                  <div className="rrt-kpi-total">100%</div>
                )}
              </div>

              <div className="rrt-kpi-card">
                <div className="rrt-kpi-title">Rooms Sold</div>
                <div className="rrt-kpi-total">19</div>
                <div className="rrt-kpi-total rrt-kpi-total-sm">unique rooms</div>
              </div>

              <div className="rrt-kpi-card">
                <div className="rrt-kpi-title">Room Sales Events</div>
                <div className="rrt-kpi-total">23</div>
                <div className="rrt-kpi-divider" />
                <div className="rrt-kpi-row">
                  <span className="rrt-kpi-dot" style={{ backgroundColor: 'var(--color-primary)' }} />
                  <span className="rrt-kpi-label">Standard</span>
                  <span className="rrt-kpi-value">19</span>
                </div>
                <div className="rrt-kpi-row">
                  <span className="rrt-kpi-dot rrt-dot-excess" />
                  <span className="rrt-kpi-label">Excess (reuse)</span>
                  <span className="rrt-kpi-value rrt-txn-excess">4</span>
                </div>
              </div>

              {!txnAltKpi && (
                <div className="rrt-kpi-card">
                  <div className="rrt-kpi-title">Turnover Index</div>
                  <div className="rrt-kpi-total">1.21x</div>
                  <div className="rrt-kpi-total rrt-kpi-total-sm">23 sold / 19 rooms</div>
                </div>
              )}

            </div>
          </div>

          <Table<TxnRow> className="rrt-table" columns={txnTableCols} dataSource={txnData}
            pagination={false} size="middle" scroll={{ x: 'max-content' }}
            rowClassName={r => r.isTotal ? 'rrt-total-row' : ''} />
        </>
      )}

      {/* ── Approach Info ── */}
      <div className="rrt-approach-info">
        <p className="rrt-approach-desc">{approachInfo[approach].description}</p>
        <div className="rrt-pros-cons">
          <div className="rrt-pros">
            <div className="rrt-pros-cons-heading rrt-pros-heading">Pros</div>
            <ul className="rrt-pros-cons-list">
              {approachInfo[approach].pros.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div className="rrt-cons">
            <div className="rrt-pros-cons-heading rrt-cons-heading">Cons</div>
            <ul className="rrt-pros-cons-list">
              {approachInfo[approach].cons.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueByRoomTypeReport;
