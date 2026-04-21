import React, { useState } from 'react';
import { DatePicker, Select, Switch, Badge, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import './Calendar.css';

const { RangePicker } = DatePicker;

// ─── Constants ────────────────────────────────────────────────────────────────
const CAL_COL_WIDTH = 140;
const CAL_LEFT_WIDTH = 200;
const TODAY_STR = '2026-04-16';

// ─── Types ────────────────────────────────────────────────────────────────────
type ResStatus = 'confirmed' | 'in-house' | 'checked-out' | 'unconfirmed' | 'courtesy-hold';

interface Reservation {
  id: string;
  guestName: string;
  status: ResStatus;
  isHourly: boolean;
  hours?: number;
  checkIn: string;  // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD (exclusive for nightly, same day for hourly)
  roomId: string;
  stacked?: boolean;
}

interface Room {
  id: string;
  number: string;
  accessible: boolean;
  smoking: boolean;
  wifi: boolean;
  pet: boolean;
}

interface RoomTypeDayData {
  available: number;
  total: number;
  minPrice: number;
  maxPrice: number;
}

interface RoomType {
  id: string;
  name: string;
  rooms: Room[];
  occupancy: Record<string, RoomTypeDayData>;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const WifiIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4-4.5a5.657 5.657 0 0 1 8 0m-10.6-3a9.5 9.5 0 0 1 13.2 0M1.5 8.5a14 14 0 0 1 21 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AccessibleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7.5v5M7 10h5M10 12.5l-2 5h8l-1-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SmokingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 15h13v3H3zM18 15h3v3h-3zM19 12c0-2-2-2-2-4M16 11c0-2-2-2-2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PetIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm5 3a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 13c-3.3 0-6 2.2-6 5 0 2.5 2 3.5 6 3.5s6-1 6-3.5c0-2.8-2.7-5-6-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConfirmedStatusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#38A169"/>
    <path d="M7.5 12l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InHouseStatusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12L12 3l9 9" stroke="#3E4BE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="#3E4BE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckedOutStatusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#718096"/>
    <path d="M7.5 12l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UnconfirmedStatusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#D69E2E" strokeWidth="1.5" strokeDasharray="3 2"/>
    <path d="M12 8v4M12 16h.01" stroke="#D69E2E" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const UnallocatedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 2.5H5a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1V7.5L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M11.5 2.5v5h5M7 9h6M7 12h4M7 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const WifiSmallIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-3.5-4a5 5 0 0 1 7 0M5 11.5a10 10 0 0 1 14 0M1.5 8a14.5 14.5 0 0 1 21 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DATES: Dayjs[] = Array.from({ length: 7 }, (_, i) =>
  dayjs(TODAY_STR).add(i, 'day')
);

const ROOM_TYPES: RoomType[] = [
  {
    id: 'std',
    name: '(STD) Standard',
    rooms: [
      { id: '101', number: '101', accessible: true, smoking: false, wifi: true, pet: true },
      { id: '102', number: '102', accessible: true, smoking: false, wifi: true, pet: true },
      { id: '103', number: '103', accessible: false, smoking: false, wifi: true, pet: false },
    ],
    occupancy: {
      '2026-04-16': { available: 1, total: 1, minPrice: 500, maxPrice: 750 },
      '2026-04-17': { available: 1, total: 2, minPrice: 25, maxPrice: 50 },
      '2026-04-18': { available: 2, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-19': { available: 4, total: 3, minPrice: 80, maxPrice: 120 },
      '2026-04-20': { available: 1, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-21': { available: 3, total: 3, minPrice: 5, maxPrice: 10 },
      '2026-04-22': { available: 0, total: 2, minPrice: 150, maxPrice: 200 },
    },
  },
  {
    id: 'kns',
    name: '(KNS) King Non-Smoking',
    rooms: [
      { id: '201', number: '201', accessible: true, smoking: false, wifi: true, pet: true },
      { id: '202', number: '202', accessible: true, smoking: false, wifi: true, pet: true },
      { id: '203', number: '203', accessible: true, smoking: false, wifi: true, pet: true },
    ],
    occupancy: {
      '2026-04-16': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-17': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-18': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-19': { available: 1, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-20': { available: 1, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-21': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-22': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
    },
  },
  {
    id: 'qns',
    name: '(QNS) Queen Non-Smoking',
    rooms: [
      { id: '301', number: '301', accessible: false, smoking: false, wifi: true, pet: false },
      { id: '302', number: '302', accessible: true, smoking: false, wifi: true, pet: false },
      { id: '303', number: '303', accessible: false, smoking: false, wifi: true, pet: false },
    ],
    occupancy: {
      '2026-04-16': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-17': { available: 2, total: 1, minPrice: 50, maxPrice: 75 },
      '2026-04-18': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-19': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-20': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-21': { available: 0, total: 3, minPrice: 150, maxPrice: 200 },
      '2026-04-22': { available: 1, total: 3, minPrice: 150, maxPrice: 200 },
    },
  },
];

const OVERALL_OCCUPANCY: Record<string, number> = {
  '2026-04-16': 85,
  '2026-04-17': 94,
  '2026-04-18': 100,
  '2026-04-19': 24,
  '2026-04-20': 11,
  '2026-04-21': 27,
  '2026-04-22': 32,
};

const RESERVATIONS: Reservation[] = [
  // Room 101
  { id: 'r1', guestName: 'F...', status: 'confirmed', isHourly: true, hours: 4, checkIn: '2026-04-16', checkOut: '2026-04-16', roomId: '101' },
  { id: 'r2', guestName: 'Jamie Williams...', status: 'confirmed', isHourly: false, checkIn: '2026-04-17', checkOut: '2026-04-19', roomId: '101' },
  { id: 'r3', guestName: 'Dav...', status: 'in-house', isHourly: true, hours: 4, checkIn: '2026-04-22', checkOut: '2026-04-22', roomId: '101' },
  // Room 102
  { id: 'r4', guestName: 'J...', status: 'in-house', isHourly: true, hours: 4, checkIn: '2026-04-16', checkOut: '2026-04-16', roomId: '102' },
  { id: 'r5', guestName: 'Richard Gilmore', status: 'in-house', isHourly: false, checkIn: '2026-04-17', checkOut: '2026-04-19', roomId: '102' },
  { id: 'r6', guestName: 'Dav...', status: 'in-house', isHourly: true, hours: 4, checkIn: '2026-04-22', checkOut: '2026-04-22', roomId: '102' },
  // Room 103
  { id: 'r7', guestName: '...', status: 'in-house', isHourly: true, hours: 4, checkIn: '2026-04-16', checkOut: '2026-04-16', roomId: '103' },
  { id: 'r8', guestName: 'Lorelai Gilmore', status: 'confirmed', isHourly: false, checkIn: '2026-04-17', checkOut: '2026-04-19', roomId: '103' },
  { id: 'r9', guestName: 'Frank Westin', status: 'confirmed', isHourly: false, checkIn: '2026-04-21', checkOut: '2026-04-22', roomId: '103' },
  // Room 201
  { id: 'r10', guestName: 'John Doe', status: 'confirmed', isHourly: true, hours: 4, checkIn: '2026-04-17', checkOut: '2026-04-17', roomId: '201' },
  { id: 'r11', guestName: 'Michael Thompson', status: 'in-house', isHourly: false, checkIn: '2026-04-19', checkOut: '2026-04-21', roomId: '201' },
  { id: 'r12', guestName: 'Christopher Nolan', status: 'in-house', isHourly: false, checkIn: '2026-04-21', checkOut: '2026-04-22', roomId: '201' },
  // Room 202
  { id: 'r13', guestName: 'Fra...', status: 'in-house', isHourly: false, checkIn: '2026-04-16', checkOut: '2026-04-19', roomId: '202' },
  // Room 203
  { id: 'r14', guestName: 'Jo...', status: 'confirmed', isHourly: false, checkIn: '2026-04-17', checkOut: '2026-04-18', roomId: '203' },
  { id: 'r15', guestName: 'Michael Thompson', status: 'confirmed', isHourly: false, checkIn: '2026-04-19', checkOut: '2026-04-21', roomId: '203' },
  // Room 301
  { id: 'r16', guestName: 'Anna Smith', status: 'confirmed', isHourly: false, checkIn: '2026-04-16', checkOut: '2026-04-19', roomId: '301' },
  // Room 302
  { id: 'r17', guestName: 'David Lee', status: 'in-house', isHourly: true, hours: 6, checkIn: '2026-04-16', checkOut: '2026-04-16', roomId: '302' },
  { id: 'r18', guestName: 'Emma Watson', status: 'confirmed', isHourly: false, checkIn: '2026-04-21', checkOut: '2026-04-22', roomId: '302' },
  // Room 303
  { id: 'r19', guestName: 'Carlos Mendez', status: 'unconfirmed', isHourly: false, checkIn: '2026-04-17', checkOut: '2026-04-20', roomId: '303' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getOccupancyClass(pct: number): string {
  if (pct >= 70) return 'occ-high';
  if (pct >= 50) return 'occ-mid';
  return 'occ-low';
}

function isWeekend(date: Dayjs): boolean {
  const day = date.day();
  return day === 0 || day === 6;
}

function isToday(date: Dayjs): boolean {
  return date.format('YYYY-MM-DD') === TODAY_STR;
}

function getStatusIcon(status: ResStatus) {
  switch (status) {
    case 'confirmed': return <ConfirmedStatusIcon />;
    case 'in-house': return <InHouseStatusIcon />;
    case 'checked-out': return <CheckedOutStatusIcon />;
    case 'unconfirmed': return <UnconfirmedStatusIcon />;
    default: return <ConfirmedStatusIcon />;
  }
}

interface PlacedReservation {
  res: Reservation;
  startCol: number;
  colSpan: number;
  extendsLeft: boolean;
  extendsRight: boolean;
}

function getVisibleReservations(roomId: string, dates: Dayjs[]): PlacedReservation[] {
  const startDateStr = dates[0].format('YYYY-MM-DD');
  const endDateStr = dates[dates.length - 1].format('YYYY-MM-DD');

  return RESERVATIONS.filter(r => r.roomId === roomId)
    .filter(r => {
      const resEnd = r.isHourly ? r.checkIn : dayjs(r.checkOut).subtract(1, 'day').format('YYYY-MM-DD');
      return r.checkIn <= endDateStr && resEnd >= startDateStr;
    })
    .map(r => {
      const checkInIdx = dates.findIndex(d => d.format('YYYY-MM-DD') === r.checkIn);
      const startCol = checkInIdx === -1 ? 0 : checkInIdx;
      const extendsLeft = checkInIdx === -1;

      let colSpan: number;
      let extendsRight = false;

      if (r.isHourly) {
        colSpan = 1;
      } else {
        const lastNightStr = dayjs(r.checkOut).subtract(1, 'day').format('YYYY-MM-DD');
        const lastNightIdx = dates.findIndex(d => d.format('YYYY-MM-DD') === lastNightStr);
        if (lastNightIdx === -1) {
          colSpan = dates.length - startCol;
          extendsRight = true;
        } else {
          colSpan = Math.max(1, lastNightIdx - startCol + 1);
        }
      }

      return { res: r, startCol, colSpan, extendsLeft, extendsRight };
    });
}

// ─── Sub-components ───────────────────────────────────────────────────────────
interface ReservationBlockProps {
  placed: PlacedReservation;
}

const ReservationBlock: React.FC<ReservationBlockProps> = ({ placed }) => {
  const { res, startCol, colSpan, extendsLeft, extendsRight } = placed;
  const blockWidth = (res.isHourly ? 1 : colSpan) * CAL_COL_WIDTH - 8;
  const blockLeft = startCol * CAL_COL_WIDTH + 4;

  return (
    <div
      className={`cal-res-block cal-res-${res.status} ${res.isHourly ? 'cal-res-hourly' : ''} ${extendsLeft ? 'extends-left' : ''} ${extendsRight ? 'extends-right' : ''}`}
      style={{ left: blockLeft, width: blockWidth }}
    >
      <div className="cal-res-icon">{getStatusIcon(res.status)}</div>
      <div className="cal-res-content">
        <span className="cal-res-name">{res.guestName}</span>
        <div className="cal-res-meta">
          <LockIcon />
          <WifiSmallIcon />
          {res.isHourly && <span className="cal-res-hours">{res.hours}h</span>}
        </div>
      </div>
    </div>
  );
};

interface RoomRowProps {
  room: Room;
  dates: Dayjs[];
}

const RoomRow: React.FC<RoomRowProps> = ({ room, dates }) => {
  const placed = getVisibleReservations(room.id, dates);

  return (
    <div className="cal-row cal-room-row">
      {/* Fixed left cell */}
      <div className="cal-left-cell cal-room-left">
        <div className="cal-room-number">{room.number}</div>
        <div className="cal-room-icons">
          {room.wifi && <WifiIcon />}
          {room.accessible && <AccessibleIcon />}
          {!room.smoking && <SmokingIcon />}
          {room.pet && <PetIcon />}
        </div>
      </div>

      {/* Timeline area */}
      <div className="cal-timeline">
        {/* Background date cells */}
        {dates.map((date, i) => (
          <div
            key={i}
            className={`cal-bg-cell ${isToday(date) ? 'cal-today-cell' : ''} ${isWeekend(date) ? 'cal-weekend-cell' : ''}`}
            style={{ left: i * CAL_COL_WIDTH, width: CAL_COL_WIDTH }}
          />
        ))}

        {/* Reservation blocks */}
        {placed.map(p => (
          <ReservationBlock key={p.res.id} placed={p} />
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Calendar: React.FC = () => {
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(
    new Set(ROOM_TYPES.map(rt => rt.id))
  );
  const [delinquent, setDelinquent] = useState(false);
  const [viewType, setViewType] = useState('room-space');
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs(TODAY_STR),
    dayjs(TODAY_STR).add(6, 'day'),
  ]);

  const toggleExpand = (typeId: string) => {
    setExpandedTypes(prev => {
      const next = new Set(prev);
      if (next.has(typeId)) {
        next.delete(typeId);
      } else {
        next.add(typeId);
      }
      return next;
    });
  };

  const totalTimelineWidth = DATES.length * CAL_COL_WIDTH;

  return (
    <div className="calendar-view">
      {/* ── Toolbar ── */}
      <div className="cal-toolbar">
        <div className="cal-toolbar-left">
          <h2 className="cal-title">Calendar</h2>

          <RangePicker
            size="large"
            value={dateRange}
            onChange={(vals) => {
              if (vals && vals[0] && vals[1]) {
                setDateRange([vals[0], vals[1]]);
              }
            }}
            format="MMM D, YYYY"
            separator={
              <span style={{ color: 'rgba(0,0,0,0.45)', margin: '0 4px' }}>→</span>
            }
            allowClear={false}
          />

          <Select
            size="large"
            value={viewType}
            onChange={setViewType}
            style={{ width: 200 }}
            options={[
              { value: 'room-space', label: 'Room & Space Type View' },
              { value: 'room', label: 'Room View' },
              { value: 'space', label: 'Space View' },
            ]}
          />
        </div>

        <div className="cal-toolbar-right">
          <div className="cal-delinquent">
            <span className="cal-delinquent-label">Delinquent</span>
            <Switch size="small" checked={delinquent} onChange={setDelinquent} />
          </div>

          <Badge count="9+" size="small" color="#E53E3E" offset={[-2, 2]}>
            <Button
              size="large"
              icon={<UnallocatedIcon />}
              className="cal-unallocated-btn"
            />
          </Badge>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="cal-table-wrapper">
        <div className="cal-table" style={{ width: CAL_LEFT_WIDTH + totalTimelineWidth }}>

          {/* ── Header Row ── */}
          <div className="cal-row cal-header-row">
            <div className="cal-left-cell cal-header-left">
              <span className="cal-header-left-label">Room/Space</span>
            </div>
            <div className="cal-timeline">
              {DATES.map((date, i) => {
                const dateStr = date.format('YYYY-MM-DD');
                const occ = OVERALL_OCCUPANCY[dateStr];
                const today = isToday(date);
                const weekend = isWeekend(date);

                return (
                  <div
                    key={i}
                    className={`cal-date-header ${today ? 'cal-date-today' : ''} ${weekend && !today ? 'cal-date-weekend' : ''}`}
                    style={{ left: i * CAL_COL_WIDTH, width: CAL_COL_WIDTH }}
                  >
                    <span className="cal-day-name">{date.format('ddd')}</span>
                    <span className="cal-date-text">{date.format('MMM D, YYYY')}</span>
                    {occ !== undefined && (
                      <span className={`cal-occ-tag ${today ? 'occ-today' : getOccupancyClass(occ)}`}>
                        {occ}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Room Type Groups ── */}
          {ROOM_TYPES.map(roomType => {
            const isExpanded = expandedTypes.has(roomType.id);

            return (
              <React.Fragment key={roomType.id}>
                {/* Room Type Row */}
                <div className="cal-row cal-type-row">
                  <div className="cal-left-cell cal-type-left">
                    <button
                      className="cal-collapse-btn"
                      onClick={() => toggleExpand(roomType.id)}
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    </button>
                    <div className="cal-type-info">
                      <div className="cal-type-name">{roomType.name}</div>
                      <div className="cal-type-count">{roomType.rooms.length} Rooms</div>
                    </div>
                  </div>

                  <div className="cal-timeline">
                    {DATES.map((date, i) => {
                      const dateStr = date.format('YYYY-MM-DD');
                      const occ = roomType.occupancy[dateStr];
                      const today = isToday(date);
                      const weekend = isWeekend(date);

                      return (
                        <div
                          key={i}
                          className={`cal-type-cell ${today ? 'cal-today-cell' : ''} ${weekend && !today ? 'cal-weekend-cell' : ''}`}
                          style={{ left: i * CAL_COL_WIDTH, width: CAL_COL_WIDTH }}
                        >
                          {occ && (
                            <>
                              <span className="cal-avail">{occ.available} | {occ.total}</span>
                              <span className="cal-price">${occ.minPrice} - ${occ.maxPrice}</span>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual Room Rows */}
                {isExpanded && roomType.rooms.map(room => (
                  <RoomRow key={room.id} room={room} dates={DATES} />
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
