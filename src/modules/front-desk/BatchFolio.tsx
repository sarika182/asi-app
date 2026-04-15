import React, { useState, useMemo, useRef } from 'react';
import { Table, Input, Drawer, Select, DatePicker, Switch, Button, Dropdown, Badge, Tooltip, Tag, Checkbox, Spin, Alert } from 'antd';
import { SearchOutlined, CloseOutlined, PrinterOutlined, MailOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './BatchFolio.css';

/* ─── Custom SVG Icons ─── */

const FilterIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.56838 3.60645C2.71963 3.23145 3.08713 2.9877 3.49588 2.9877H20.4996C20.9084 2.9877 21.2759 3.23145 21.4271 3.60645C21.5784 3.98145 21.4909 4.4127 21.2021 4.70145L14.9996 10.904V18.7377C14.9996 19.0752 14.8184 19.3877 14.5259 19.5577C14.2334 19.7277 13.8771 19.7277 13.5884 19.5502L10.0884 17.4252C9.80713 17.254 9.62463 16.949 9.62463 16.6152V10.904L3.39338 4.70145C3.10463 4.4127 3.01713 3.98145 3.16838 3.60645H2.56838ZM5.53088 4.7877L10.8059 10.0627C10.9271 10.1877 10.9996 10.3502 10.9996 10.5202V16.2502L13.6246 17.8427V10.524C13.6246 10.354 13.6971 10.1877 13.8184 10.0665L19.0934 4.7877H5.53088Z" fill="currentColor"/>
  </svg>
);

const ColumnIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 5V19H8.5V5H5ZM10.5 5V19H13.5V5H10.5ZM15.5 5V19H19V5H15.5Z" fill="currentColor"/>
  </svg>
);

const BroomIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.4 15L17.8 9.8C17.4 8.5 16.6 7.4 15.5 6.6L13 4.8V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V4.8L8.5 6.6C7.4 7.4 6.6 8.5 6.2 9.8L4.6 15C4.2 16.2 4.5 17.5 5.4 18.4L6 19C6.4 19.4 7 19 6.8 18.4L6.4 17.2C6.1 16.4 6.3 15.5 6.9 14.9L7.8 14L9 19.5C9.1 19.8 9.4 20 9.7 20H14.3C14.6 20 14.9 19.8 15 19.5L16.2 14L17.1 14.9C17.7 15.5 17.9 16.4 17.6 17.2L17.2 18.4C17 19 17.6 19.4 18 19L18.6 18.4C19.5 17.5 19.8 16.2 19.4 15Z" fill="currentColor"/>
  </svg>
);

const GroupIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 8C6.88071 8 8 6.88071 8 5.5C8 4.11929 6.88071 3 5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8ZM5.5 4C6.32843 4 7 4.67157 7 5.5C7 6.32843 6.32843 7 5.5 7C4.67157 7 4 6.32843 4 5.5C4 4.67157 4.67157 4 5.5 4ZM11 8C12.1046 8 13 7.10457 13 6C13 4.89543 12.1046 4 11 4C9.89543 4 9 4.89543 9 6C9 7.10457 9.89543 8 11 8ZM11 5C11.5523 5 12 5.44772 12 6C12 6.55228 11.5523 7 11 7C10.4477 7 10 6.55228 10 6C10 5.44772 10.4477 5 11 5ZM11 9C9.67 9 7 9.67 7 11V12C7 12.5523 7.44772 13 8 13H14C14.5523 13 15 12.5523 15 12V11C15 9.67 12.33 9 11 9ZM14 12H8V11C8 10.4 9.92 10 11 10C12.08 10 14 10.4 14 11V12ZM5.5 9C3.83 9 0.5 9.84 0.5 11.5V12.5C0.5 12.7761 0.723858 13 1 13H6V12H1.5V11.5C1.5 10.87 3.62 10 5.5 10C5.86 10 6.23 10.03 6.59 10.07C6.76 9.76 7.02 9.47 7.36 9.22C6.69 9.08 6.05 9 5.5 9Z" fill="currentColor"/>
  </svg>
);

const GripDotsIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="5" r="1.5" fill="currentColor"/><circle cx="15" cy="5" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="19" r="1.5" fill="currentColor"/><circle cx="15" cy="19" r="1.5" fill="currentColor"/>
  </svg>
);

const DNRIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.5" stroke="#E53E3E" strokeWidth="1.5"/>
    <line x1="4.5" y1="11.5" x2="11.5" y2="4.5" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ─── Status Tag SVG Icons ─── */
const IconCircleCheck: React.FC = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1.2C3.349 1.2 1.2 3.349 1.2 6C1.2 8.651 3.349 10.8 6 10.8C8.651 10.8 10.8 8.651 10.8 6C10.8 3.349 8.651 1.2 6 1.2ZM8.354 4.854L5.354 7.854C5.307 7.9 5.252 7.937 5.191 7.963C5.131 7.988 5.066 8.001 5 8.001C4.934 8.001 4.869 7.988 4.809 7.963C4.748 7.937 4.693 7.9 4.646 7.854L3.646 6.854C3.552 6.76 3.5 6.633 3.5 6.5C3.5 6.367 3.552 6.24 3.646 6.146C3.74 6.052 3.867 6 4 6C4.133 6 4.26 6.052 4.354 6.146L5 6.793L7.646 4.146C7.74 4.052 7.867 4 8 4C8.133 4 8.26 4.052 8.354 4.146C8.448 4.24 8.5 4.367 8.5 4.5C8.5 4.633 8.448 4.76 8.354 4.854Z" fill="currentColor"/></svg>);
const IconUserClock: React.FC = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 6C5.743 6 6.75 4.993 6.75 3.75C6.75 2.507 5.743 1.5 4.5 1.5C3.257 1.5 2.25 2.507 2.25 3.75C2.25 4.993 3.257 6 4.5 6ZM4.5 2.5C5.19 2.5 5.75 3.06 5.75 3.75C5.75 4.44 5.19 5 4.5 5C3.81 5 3.25 4.44 3.25 3.75C3.25 3.06 3.81 2.5 4.5 2.5ZM1 10.5V10C1 8.343 2.343 7 4 7H4.5C4.814 7 5.12 7.036 5.414 7.103C5.287 7.385 5.192 7.684 5.134 7.997C4.929 7.952 4.717 7.929 4.5 7.929H4C2.857 7.929 1.929 8.857 1.929 10V10.5C1.929 10.776 1.705 11 1.429 11H1.25C1.112 11 1 10.888 1 10.75V10.5ZM8.5 7C7.119 7 6 8.119 6 9.5C6 10.881 7.119 12 8.5 12C9.881 12 11 10.881 11 9.5C11 8.119 9.881 7 8.5 7ZM9.25 9.75H8.5C8.362 9.75 8.25 9.638 8.25 9.5V8.5C8.25 8.362 8.362 8.25 8.5 8.25C8.638 8.25 8.75 8.362 8.75 8.5V9.25H9.25C9.388 9.25 9.5 9.362 9.5 9.5C9.5 9.638 9.388 9.75 9.25 9.75Z" fill="currentColor"/></svg>);
const IconTransferOut: React.FC = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3C2 2.448 2.448 2 3 2H7C7.552 2 8 2.448 8 3V5H7V3H3V9H7V7H8V9C8 9.552 7.552 10 7 10H3C2.448 10 2 9.552 2 9V3ZM9.293 4.293L10.586 5.586C10.781 5.781 10.781 6.098 10.586 6.293L9.293 7.586C9.098 7.781 8.781 7.781 8.586 7.586C8.391 7.391 8.391 7.074 8.586 6.879L9.172 6.293H5.5C5.224 6.293 5 6.069 5 5.793C5 5.517 5.224 5.293 5.5 5.293H9.172L8.586 4.707C8.391 4.512 8.391 4.195 8.586 4C8.781 3.805 9.098 3.805 9.293 4Z" fill="currentColor"/></svg>);
const IconKey: React.FC = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1.2C5.843 1.2 4.5 2.543 4.5 4.2C4.5 4.557 4.563 4.9 4.678 5.218L1.348 8.548C1.253 8.643 1.2 8.772 1.2 8.906V10.2C1.2 10.48 1.42 10.7 1.7 10.7H3.5C3.78 10.7 4 10.48 4 10.2V9.7H4.5C4.78 9.7 5 9.48 5 9.2V8.7H5.5C5.634 8.7 5.763 8.647 5.858 8.552L6.982 7.428C7.146 7.47 7.32 7.5 7.5 7.5C9.157 7.5 10.5 6.157 10.5 4.5C10.5 2.843 9.157 1.2 7.5 1.2ZM8 4C7.724 4 7.5 3.776 7.5 3.5C7.5 3.224 7.724 3 8 3C8.276 3 8.5 3.224 8.5 3.5C8.5 3.776 8.276 4 8 4Z" fill="currentColor"/></svg>);
const IconCalendarMinus: React.FC = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 1C4.276 1 4.5 1.224 4.5 1.5V2H7.5V1.5C7.5 1.224 7.724 1 8 1C8.276 1 8.5 1.224 8.5 1.5V2H9.5C10.052 2 10.5 2.448 10.5 3V5.05C10.179 4.86 9.826 4.72 9.45 4.64V4.5H2.5V9C2.5 9.276 2.724 9.5 3 9.5H5.05C5.15 9.876 5.31 10.226 5.52 10.545H3C2.172 10.545 1.5 9.873 1.5 9.045V3C1.5 2.448 1.948 2 2.5 2H3.5V1.5C3.5 1.224 3.724 1 4 1ZM8.5 6C7.119 6 6 7.119 6 8.5C6 9.881 7.119 11 8.5 11C9.881 11 11 9.881 11 8.5C11 7.119 9.881 6 8.5 6ZM7.5 8.25H9.5C9.638 8.25 9.75 8.362 9.75 8.5C9.75 8.638 9.638 8.75 9.5 8.75H7.5C7.362 8.75 7.25 8.638 7.25 8.5C7.25 8.362 7.362 8.25 7.5 8.25Z" fill="currentColor"/></svg>);
const IconUserSlash: React.FC = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 4C3.75 2.757 4.757 1.75 6 1.75C6.526 1.75 7.009 1.932 7.394 2.237L3.987 5.644C3.838 5.282 3.75 4.884 3.75 4.462V4ZM8.013 5.763L4.606 9.17C5.037 9.059 5.507 9 6 9C7.657 9 9 9.62 9 10.5V11H3V10.5C3 10.362 3.025 10.228 3.07 10.097L1.146 11.854C0.951 12.049 0.634 12.049 0.439 11.854C0.244 11.659 0.244 11.341 0.439 11.146L10.439 1.146C10.634 0.951 10.951 0.951 11.146 1.146C11.341 1.341 11.341 1.659 11.146 1.854L8.013 5.763ZM8.25 4C8.25 5.243 7.243 6.25 6 6.25C5.866 6.25 5.735 6.238 5.607 6.218L8.218 3.607C8.238 3.735 8.25 3.866 8.25 4Z" fill="currentColor"/></svg>);
const IconCheckedOut: React.FC = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2C2.224 2 2 2.224 2 2.5V9.5C2 9.776 2.224 10 2.5 10H5.5C5.776 10 6 9.776 6 9.5V7H7V9.5C7 10.328 6.328 11 5.5 11H2.5C1.672 11 1 10.328 1 9.5V2.5C1 1.672 1.672 1 2.5 1H5.5C6.328 1 7 1.672 7 2.5V5H6V2.5C6 2.224 5.776 2 5.5 2H2.5ZM8.646 4.146C8.842 3.951 9.158 3.951 9.354 4.146L11.354 6.146C11.549 6.342 11.549 6.658 11.354 6.854L9.354 8.854C9.158 9.049 8.842 9.049 8.646 8.854C8.451 8.658 8.451 8.342 8.646 8.146L9.793 7H4.5C4.224 7 4 6.776 4 6.5C4 6.224 4.224 6 4.5 6H9.793L8.646 4.854C8.451 4.658 8.451 4.342 8.646 4.146Z" fill="currentColor"/></svg>);

/* ─── Types ─── */
type ReservationStatus = 'confirmed' | 'unconfirmed' | 'in-house' | 'transfer-out' | 'no-show' | 'cancelled' | 'checked-out';
type DurationType = 'hourly' | 'non-hourly';

interface BatchFolioRecord {
  key: string;
  reservationId: string;
  pointOfContact: string;
  email: string;
  checkIn: string;
  checkInTime: string;
  checkOut: string;
  checkOutTime: string;
  rooms: string;
  status: ReservationStatus;
  cancellationPolicy: string;
  businessSource: string;
  businessSourceCategory: string;
  totalCharges: number;
  balance: number;
  isGroup: boolean;
  groupName?: string;
  durationType: DurationType;
  isDNR?: boolean;
  dnrReason?: string;
}

/* ─── Sample Data ─── */
const sampleData: BatchFolioRecord[] = [
  { key: '1', reservationId: 'F1755159619', pointOfContact: 'Audit Log Testinggggg', email: 'alexjones@example.com', checkIn: 'Feb 09, 2026', checkInTime: '01:30 AM', checkOut: 'Feb 14, 2026', checkOutTime: '01:00 AM', rooms: 'STD 9 (STD), BRT 4 (BRT)', status: 'no-show', cancellationPolicy: 'Non-Refundable', businessSource: 'Direct Walk-In', businessSourceCategory: 'Walk-In', totalCharges: 1885.40, balance: 1754.40, isGroup: false, durationType: 'non-hourly', isDNR: true, dnrReason: 'Chargeback Abuse' },
  { key: '2', reservationId: 'F1755159631', pointOfContact: 'Sarika Sethi', email: 'alexjones@example.com', checkIn: 'Feb 14, 2026', checkInTime: '11:05 PM', checkOut: 'Feb 15, 2026', checkOutTime: '01:00 AM', rooms: 'STD 3 (STD)', status: 'confirmed', cancellationPolicy: 'Free Cancellation', businessSource: 'ASI WebRes', businessSourceCategory: 'Web Reservation', totalCharges: 457.00, balance: 457.00, isGroup: false, durationType: 'non-hourly' },
  { key: '3', reservationId: 'F1755159630', pointOfContact: 'Test Payment', email: 'alexjones@example.com', checkIn: 'Feb 14, 2026', checkInTime: '03:52 AM', checkOut: 'Feb 14, 2026', checkOutTime: '08:13 AM', rooms: 'R1 new STD (STD)', status: 'checked-out', cancellationPolicy: 'Free Cancellation', businessSource: 'Direct Walk-In', businessSourceCategory: 'Walk-In', totalCharges: 457.00, balance: -30.00, isGroup: false, durationType: 'non-hourly' },
  { key: '4', reservationId: 'F1755159634', pointOfContact: 'Sarika Sethi', email: 'alexjones@example.com', checkIn: 'Feb 14, 2026', checkInTime: '01:53 AM', checkOut: 'Feb 16, 2026', checkOutTime: '01:00 AM', rooms: '(STD)', status: 'confirmed', cancellationPolicy: 'Free Cancellation', businessSource: 'Direct Walk-In', businessSourceCategory: 'Walk-In', totalCharges: 577.00, balance: 0.00, isGroup: true, groupName: 'Wedding Party A', durationType: 'non-hourly' },
  { key: '5', reservationId: 'F1755159635', pointOfContact: 'Sarika Sethi', email: 'alexjones@example.com', checkIn: 'Feb 14, 2026', checkInTime: '02:10 AM', checkOut: 'Feb 16, 2026', checkOutTime: '01:00 AM', rooms: '(STD)', status: 'unconfirmed', cancellationPolicy: 'Free Cancellation', businessSource: 'Booking.com', businessSourceCategory: 'Web Reservation', totalCharges: 577.00, balance: 0.00, isGroup: true, groupName: 'Wedding Party A', durationType: 'non-hourly' },
  { key: '6', reservationId: 'F1755159640', pointOfContact: 'John Smith', email: 'john.smith@example.com', checkIn: 'Feb 14, 2026', checkInTime: '10:00 AM', checkOut: 'Feb 14, 2026', checkOutTime: '04:00 PM', rooms: 'DLX 2 (DLX)', status: 'confirmed', cancellationPolicy: 'Hourly Cancellation', businessSource: 'Direct Walk-In', businessSourceCategory: 'Walk-In', totalCharges: 890.00, balance: 350.00, isGroup: false, durationType: 'hourly' },
  { key: '7', reservationId: 'F1755159641', pointOfContact: 'Emily Davis', email: 'emily.d@example.com', checkIn: 'Feb 14, 2026', checkInTime: '09:00 AM', checkOut: 'Feb 16, 2026', checkOutTime: '11:00 AM', rooms: 'STE 1 (STE)', status: 'in-house', cancellationPolicy: 'Non-Refundable', businessSource: 'Corporate Direct Billing', businessSourceCategory: 'Direct Billing', totalCharges: 1250.00, balance: 625.00, isGroup: false, durationType: 'non-hourly' },
  { key: '8', reservationId: 'F1755159642', pointOfContact: 'Michael Brown', email: 'mbrown@example.com', checkIn: 'Feb 13, 2026', checkInTime: '02:00 PM', checkOut: 'Feb 15, 2026', checkOutTime: '12:00 PM', rooms: 'STD 5 (STD)', status: 'cancelled', cancellationPolicy: 'Non-Refundable', businessSource: 'Expedia', businessSourceCategory: 'Web Reservation', totalCharges: 320.00, balance: 0.00, isGroup: false, durationType: 'non-hourly' },
  { key: '9', reservationId: 'F1755159643', pointOfContact: 'Anna Wilson', email: 'anna.w@example.com', checkIn: 'Feb 14, 2026', checkInTime: '03:00 PM', checkOut: 'Feb 17, 2026', checkOutTime: '11:00 AM', rooms: 'BRT 2 (BRT)', status: 'confirmed', cancellationPolicy: 'Free Cancellation', businessSource: 'Amora Travels', businessSourceCategory: 'Travel Agent', totalCharges: 680.00, balance: 680.00, isGroup: true, groupName: 'Corporate Summit', durationType: 'non-hourly' },
  { key: '10', reservationId: 'F1755159650', pointOfContact: 'Raj Patel', email: 'raj.patel@example.com', checkIn: 'Feb 14, 2026', checkInTime: '12:00 PM', checkOut: 'Feb 15, 2026', checkOutTime: '12:00 PM', rooms: 'STD 7 (STD)', status: 'transfer-out', cancellationPolicy: 'Free Cancellation', businessSource: 'Byway Travels', businessSourceCategory: 'Travel Agent', totalCharges: 430.00, balance: 215.00, isGroup: false, durationType: 'non-hourly' },
  { key: '11', reservationId: 'F1755159651', pointOfContact: 'Lisa Chen', email: 'lisa.chen@example.com', checkIn: 'Feb 14, 2026', checkInTime: '02:00 PM', checkOut: 'Feb 14, 2026', checkOutTime: '09:30 PM', rooms: 'DLX 5 (DLX)', status: 'in-house', cancellationPolicy: 'Hourly Cancellation', businessSource: 'Direct Walk-In', businessSourceCategory: 'Walk-In', totalCharges: 320.00, balance: 160.00, isGroup: false, durationType: 'hourly' },
];

/* ─── Status Tag Config ─── */
const statusTagConfig: Record<ReservationStatus, { label: string; icon: React.ReactNode; color: string; bg: string; border: string }> = {
  'confirmed': { label: 'Confirmed', icon: <IconCircleCheck />, color: '#22543d', bg: '#f0fff4', border: '#9ae6b4' },
  'unconfirmed': { label: 'Unconfirmed', icon: <IconUserClock />, color: 'rgba(0,0,0,0.88)', bg: 'rgba(0,0,0,0.02)', border: '#d9d9d9' },
  'in-house': { label: 'In-House', icon: <IconKey />, color: '#086f83', bg: '#edfdfd', border: '#9decf9' },
  'transfer-out': { label: 'Transfer-Out', icon: <IconTransferOut />, color: '#7b341e', bg: '#fffaf0', border: '#fbd38d' },
  'no-show': { label: 'No-Show', icon: <IconUserSlash />, color: '#744210', bg: '#fffff0', border: '#faf089' },
  'cancelled': { label: 'Cancelled', icon: <IconCalendarMinus />, color: '#822727', bg: '#fff5f5', border: '#feb2b2' },
  'checked-out': { label: 'Checked-Out', icon: <IconCheckedOut />, color: '#333d73', bg: '#f1f6ff', border: '#acc4fd' },
};

const renderStatusTag = (status: ReservationStatus) => {
  const c = statusTagConfig[status];
  return <Tag className="batch-folio-status-tag" style={{ color: c.color, backgroundColor: c.bg, borderColor: c.border, margin: 0 }} icon={<span className="status-tag-icon">{c.icon}</span>}>{c.label}</Tag>;
};

/* ─── Duration Type Tag (from Figma) ─── */
const renderDurationTag = (d: DurationType) => {
  if (d === 'hourly') return <Tag className="duration-tag duration-tag-hourly">Hourly</Tag>;
  return <Tag className="duration-tag duration-tag-non-hourly">Non-Hourly</Tag>;
};

/* ─── Filter & Column Options ─── */
const statusOptions = [
  { value: 'all', label: 'Select All' },
  { value: 'confirmed', label: 'Confirmed' }, { value: 'unconfirmed', label: 'Unconfirmed' },
  { value: 'in-house', label: 'In-House' }, { value: 'transfer-out', label: 'Transfer-Out' },
  { value: 'no-show', label: 'No-Show' }, { value: 'cancelled', label: 'Cancelled' },
  { value: 'checked-out', label: 'Checked-Out' },
];

const durationTypeOptions = [
  { value: 'all', label: 'Select All' },
  { value: 'hourly', label: 'Hourly' }, { value: 'non-hourly', label: 'Non-Hourly' },
];

const roomTypeOptions = [
  { value: 'all', label: 'Select All' },
  { value: 'STD', label: 'Standard (STD)' }, { value: 'DLX', label: 'Deluxe (DLX)' },
  { value: 'STE', label: 'Suite (STE)' }, { value: 'BRT', label: 'Bridal (BRT)' },
];

const groupOptions = [
  { value: 'group-a', label: 'Wedding Party A' }, { value: 'group-b', label: 'Corporate Summit' },
  { value: 'group-c', label: 'Travel Group C' },
];

/* Business Source — grouped dropdown */
const businessSourceOptions = [
  { label: 'Direct Billing', options: [{ value: 'corporate-direct', label: 'Corporate Direct Billing' }] },
  { label: 'Travel Agent', options: [{ value: 'amora-travels', label: 'Amora Travels' }, { value: 'byway-travels', label: 'Byway Travels' }] },
  { label: 'Walk-In', options: [{ value: 'direct-walk-in', label: 'Direct Walk-In' }] },
  { label: 'Web Reservation', options: [{ value: 'booking-com', label: 'Booking.com' }, { value: 'expedia', label: 'Expedia' }] },
];

/* Custom columns config — Reservation ID is always shown (fixed) */
interface ColumnConfig { key: string; label: string; visible: boolean }
const defaultColumnConfig: ColumnConfig[] = [
  { key: 'pointOfContact', label: 'Point of Contact', visible: true },
  { key: 'checkIn', label: 'Check-In', visible: true },
  { key: 'checkOut', label: 'Check-Out', visible: true },
  { key: 'rooms', label: 'Rooms/Spaces', visible: true },
  { key: 'durationType', label: 'Duration Type', visible: true },
  { key: 'status', label: 'Status', visible: true },
  { key: 'cancellationPolicy', label: 'Cancellation Policy', visible: true },
  { key: 'businessSource', label: 'Business Source', visible: true },
  { key: 'totalCharges', label: 'Total Charges ($)', visible: true },
  { key: 'balance', label: 'Balance ($)', visible: true },
];

const { RangePicker } = DatePicker;

/* ─── Main Component ─── */
const BatchFolio: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showCheckedOut, setShowCheckedOut] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);
  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>(defaultColumnConfig);

  /* Filter fields */
  const [filterDateRange, setFilterDateRange] = useState<[any, any] | null>(null);
  const [filterDurationType, setFilterDurationType] = useState<string | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [filterRoomType, setFilterRoomType] = useState<string | undefined>(undefined);
  const [filterGroup, setFilterGroup] = useState<string | undefined>(undefined);
  const [filterBusinessSource, setFilterBusinessSource] = useState<string | undefined>(undefined);

  const [appliedFilters, setAppliedFilters] = useState<{
    dateRange: [any, any] | null; durationType: string | undefined; status: string | undefined;
    roomType: string | undefined; group: string | undefined; businessSource: string | undefined;
  }>({ dateRange: null, durationType: undefined, status: undefined, roomType: undefined, group: undefined, businessSource: undefined });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data] = useState<BatchFolioRecord[]>(sampleData);

  /* Loading & Success states */
  const [loadingOverlay, setLoadingOverlay] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const alertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasBulkSelection = selectedRowKeys.length > 0;

  const showSuccessAlert = (msg: string) => {
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    setSuccessAlert(msg);
    alertTimerRef.current = setTimeout(() => setSuccessAlert(null), 4000);
  };

  /* ─── Filter Logic ─── */
  const hasActiveFilters = useMemo(() => !!(appliedFilters.dateRange || appliedFilters.durationType || appliedFilters.status || appliedFilters.roomType || appliedFilters.group || appliedFilters.businessSource), [appliedFilters]);
  const hasUncommittedFilters = useMemo(() => !!(filterDateRange || filterDurationType || filterStatus || filterRoomType || filterGroup || filterBusinessSource), [filterDateRange, filterDurationType, filterStatus, filterRoomType, filterGroup, filterBusinessSource]);

  const filteredData = useMemo(() => {
    let result = data;
    if (searchValue.trim()) {
      const s = searchValue.trim().toLowerCase();
      result = result.filter(r => r.reservationId.toLowerCase().includes(s) || r.pointOfContact.toLowerCase().includes(s) || r.email.toLowerCase().includes(s));
    }
    // Checked-out toggle: ON = only show checked-out, OFF = hide checked-out
    if (showCheckedOut) {
      result = result.filter(r => r.status === 'checked-out');
    } else {
      result = result.filter(r => r.status !== 'checked-out');
    }
    if (appliedFilters.status && appliedFilters.status !== 'all') result = result.filter(r => r.status === appliedFilters.status);
    if (appliedFilters.durationType && appliedFilters.durationType !== 'all') result = result.filter(r => r.durationType === appliedFilters.durationType);
    if (appliedFilters.roomType && appliedFilters.roomType !== 'all') result = result.filter(r => r.rooms.includes(appliedFilters.roomType!));
    if (appliedFilters.businessSource) {
      const bsMap: Record<string, string> = {
        'corporate-direct': 'Corporate Direct Billing', 'amora-travels': 'Amora Travels',
        'byway-travels': 'Byway Travels', 'direct-walk-in': 'Direct Walk-In',
        'booking-com': 'Booking.com', 'expedia': 'Expedia',
      };
      const target = bsMap[appliedFilters.businessSource];
      if (target) result = result.filter(r => r.businessSource === target);
    }
    return result;
  }, [data, searchValue, showCheckedOut, appliedFilters]);

  const getPreviewCount = () => {
    let result = data;
    if (searchValue.trim()) { const s = searchValue.trim().toLowerCase(); result = result.filter(r => r.reservationId.toLowerCase().includes(s) || r.pointOfContact.toLowerCase().includes(s)); }
    if (showCheckedOut) { result = result.filter(r => r.status === 'checked-out'); } else { result = result.filter(r => r.status !== 'checked-out'); }
    if (filterStatus && filterStatus !== 'all') result = result.filter(r => r.status === filterStatus);
    if (filterDurationType && filterDurationType !== 'all') result = result.filter(r => r.durationType === filterDurationType);
    if (filterRoomType && filterRoomType !== 'all') result = result.filter(r => r.rooms.includes(filterRoomType));
    return result.length;
  };

  const handleApplyFilters = () => { setAppliedFilters({ dateRange: filterDateRange, durationType: filterDurationType, status: filterStatus, roomType: filterRoomType, group: filterGroup, businessSource: filterBusinessSource }); setFilterDrawerOpen(false); };
  const handleClearAllFilters = () => { setFilterDateRange(null); setFilterDurationType(undefined); setFilterStatus(undefined); setFilterRoomType(undefined); setFilterGroup(undefined); setFilterBusinessSource(undefined); };
  const handleFilterCancel = () => { setFilterDateRange(appliedFilters.dateRange); setFilterDurationType(appliedFilters.durationType); setFilterStatus(appliedFilters.status); setFilterRoomType(appliedFilters.roomType); setFilterGroup(appliedFilters.group); setFilterBusinessSource(appliedFilters.businessSource); setFilterDrawerOpen(false); };
  const handleOpenFilterDrawer = () => { setFilterDateRange(appliedFilters.dateRange); setFilterDurationType(appliedFilters.durationType); setFilterStatus(appliedFilters.status); setFilterRoomType(appliedFilters.roomType); setFilterGroup(appliedFilters.group); setFilterBusinessSource(appliedFilters.businessSource); setFilterDrawerOpen(true); };

  /* ─── Column toggle ─── */
  const toggleColumn = (key: string) => {
    setColumnConfig(prev => prev.map(c => c.key === key ? { ...c, visible: !c.visible } : c));
  };

  const isColumnVisible = (key: string) => columnConfig.find(c => c.key === key)?.visible ?? true;

  /* ─── Print / Email handlers with loading ─── */
  const handlePrintAction = (folioName: string) => {
    setLoadingOverlay({ visible: true, message: 'Generating Folio...' });
    setTimeout(() => {
      setLoadingOverlay({ visible: false, message: '' });
      showSuccessAlert(`Batch ${folioName} printed successfully`);
    }, 2000);
  };

  const handleEmailAction = (folioName: string) => {
    setLoadingOverlay({ visible: true, message: 'Sending Folio via email...' });
    setTimeout(() => {
      setLoadingOverlay({ visible: false, message: '' });
      showSuccessAlert(`Batch "${folioName}" has been successfully emailed to the respective points of contact.`);
    }, 2000);
  };

  /* ─── Table Columns ─── */
  const allColumns: ColumnsType<BatchFolioRecord> = [
    {
      title: 'Reservation ID', dataIndex: 'reservationId', key: 'reservationId', width: 180, fixed: 'left' as const,
      sorter: (a, b) => a.reservationId.localeCompare(b.reservationId),
      render: (text: string, record: BatchFolioRecord) => (
        <div className="reservation-id-cell">
          <span className="cell-text">{text}</span>
          {record.isGroup && <Tooltip title={record.groupName || 'Group'} overlayClassName="batch-folio-tooltip"><span className="reservation-group-icon"><GroupIcon style={{ fontSize: 16 }} /></span></Tooltip>}
        </div>
      ),
    },
    {
      title: 'Point of Contact', dataIndex: 'pointOfContact', key: 'pointOfContact', width: 220,
      sorter: (a, b) => a.pointOfContact.localeCompare(b.pointOfContact),
      render: (_: string, record: BatchFolioRecord) => (
        <div className="poc-cell">
          <div className="poc-name-row">
            {record.isDNR && <Tooltip title={<span><strong>DNR Reason:</strong><br />{record.dnrReason}</span>} overlayClassName="batch-folio-tooltip"><span className="poc-dnr-icon"><DNRIcon /></span></Tooltip>}
            <span className="poc-name">{record.pointOfContact}</span>
          </div>
          <span className="poc-email">{record.email}</span>
        </div>
      ),
    },
    {
      title: 'Check-In', dataIndex: 'checkIn', key: 'checkIn', width: 150,
      sorter: (a, b) => a.checkIn.localeCompare(b.checkIn),
      render: (text: string, record: BatchFolioRecord) => (
        <div className="checkin-cell"><span className="checkin-date">{text}</span><span className="checkin-time">{record.checkInTime}</span></div>
      ),
    },
    {
      title: 'Check-Out', dataIndex: 'checkOut', key: 'checkOut', width: 150,
      sorter: (a, b) => a.checkOut.localeCompare(b.checkOut),
      render: (text: string, record: BatchFolioRecord) => (
        <div className="checkin-cell"><span className="checkin-date">{text}</span><span className="checkin-time">{record.checkOutTime}</span></div>
      ),
    },
    {
      title: 'Rooms/Spaces', dataIndex: 'rooms', key: 'rooms', width: 180,
      render: (text: string) => <Tooltip title={text} overlayClassName="batch-folio-tooltip"><span className="cell-ellipsis-text">{text}</span></Tooltip>,
    },
    { title: 'Duration Type', dataIndex: 'durationType', key: 'durationType', width: 130, render: (d: DurationType) => renderDurationTag(d) },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 150, sorter: (a, b) => a.status.localeCompare(b.status), render: (s: ReservationStatus) => renderStatusTag(s) },
    {
      title: 'Cancellation Policy', dataIndex: 'cancellationPolicy', key: 'cancellationPolicy', width: 180,
      render: (text: string) => <Tooltip title={text} overlayClassName="batch-folio-tooltip"><span className="cell-ellipsis-text">{text}</span></Tooltip>,
    },
    {
      title: 'Business Source', dataIndex: 'businessSource', key: 'businessSource', width: 170,
      render: (_: string, record: BatchFolioRecord) => (
        <div className="business-source-cell">
          <span className="business-source-main">{record.businessSource}</span>
          <span className="business-source-sub">{record.businessSourceCategory}</span>
        </div>
      ),
    },
    {
      title: 'Total Charges ($)', dataIndex: 'totalCharges', key: 'totalCharges', width: 160, align: 'right' as const,
      sorter: (a, b) => a.totalCharges - b.totalCharges,
      render: (val: number) => <span className="cell-text">{val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>,
    },
    {
      title: 'Balance ($)', dataIndex: 'balance', key: 'balance', width: 140, align: 'right' as const,
      sorter: (a, b) => a.balance - b.balance,
      render: (val: number) => {
        let cn = 'cell-text';
        if (val > 0) cn = 'cell-text balance-positive';
        if (val < 0) cn = 'cell-text balance-negative';
        return <span className={cn}>{val < 0 ? '-' : ''}{Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
      },
    },
  ];

  /* Filter columns by visibility (Reservation ID is always visible) */
  const visibleColumns = allColumns.filter(col => {
    const key = col.key as string;
    if (key === 'reservationId') return true;
    return isColumnVisible(key);
  });

  const printMenuItems = [
    { key: 'folio', label: 'Folio', onClick: () => handlePrintAction('Folio') },
    { key: 'detailed-folio', label: 'Detailed Folio', onClick: () => handlePrintAction('Detailed Folio') },
    { key: 'registration-form', label: 'Registration Form', onClick: () => handlePrintAction('Registration Form') },
  ];
  const emailMenuItems = [
    { key: 'folio', label: 'Folio', onClick: () => handleEmailAction('Folio') },
    { key: 'detailed-folio', label: 'Detailed Folio', onClick: () => handleEmailAction('Detailed Folio') },
    { key: 'registration-form', label: 'Registration Form', onClick: () => handleEmailAction('Registration Form') },
  ];

  return (
    <div className="batch-folio">
      {/* Success Alert */}
      {successAlert && (
        <div className="batch-folio-alert-wrapper">
          <Alert message={successAlert} type="success" showIcon closable onClose={() => setSuccessAlert(null)} />
        </div>
      )}

      {/* Loading Overlay */}
      {loadingOverlay.visible && (
        <div className="batch-folio-loading-overlay">
          <div className="batch-folio-loading-content">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 32, color: 'var(--color-primary)' }} spin />} />
            <span className="batch-folio-loading-text">{loadingOverlay.message}</span>
          </div>
        </div>
      )}

      <div className="batch-folio-title-row">
        <h1 className="batch-folio-title">Batch Folio</h1>
        <a
          className="batch-folio-time-machine-link"
          href="https://www.figma.com/design/KKdLhfxOAkTN7E1jsbIwpL/%F0%9F%92%BB-9.1-Front-Desk?node-id=9063-80666&t=QxQXxXi94eij3qjK-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Time Machine Notes (Batch Folio Hourly Reservations)
        </a>
      </div>

      {/* Toolbar */}
      <div className="batch-folio-toolbar">
        <div className="batch-folio-search">
          <Input.Search placeholder="Search for reservation ID, point of contact" enterButton={<SearchOutlined />} size="large" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} allowClear />
        </div>
        <div className="batch-folio-actions">
          <div className="batch-folio-toggle-group">
            <span className="batch-folio-toggle-label">Checked-Out Reservations</span>
            <Switch checked={showCheckedOut} onChange={setShowCheckedOut} size="default" />
          </div>
          <Badge dot={hasActiveFilters} offset={[-4, 4]}>
            <button className={`batch-folio-filter-btn${hasActiveFilters ? ' filter-active' : ''}`} onClick={handleOpenFilterDrawer} title="Filters"><FilterIcon style={{ fontSize: 18 }} /></button>
          </Badge>

          {/* Custom Columns Dropdown */}
          <div className="batch-folio-column-dropdown-wrapper">
            <button className="batch-folio-filter-btn" title="Customize Columns" onClick={() => setColumnDropdownOpen(!columnDropdownOpen)}>
              <ColumnIcon style={{ fontSize: 18 }} />
            </button>
            {columnDropdownOpen && (
              <>
                <div className="batch-folio-column-backdrop" onClick={() => setColumnDropdownOpen(false)} />
                <div className="batch-folio-column-dropdown">
                  <div className="column-dropdown-header">Customize Columns</div>
                  <div className="column-dropdown-list">
                    {columnConfig.map((col) => (
                      <div className="column-dropdown-item" key={col.key}>
                        <span className="column-grip-icon"><GripDotsIcon style={{ fontSize: 20 }} /></span>
                        <Checkbox checked={col.visible} onChange={() => toggleColumn(col.key)}>{col.label}</Checkbox>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Dropdown menu={{ items: printMenuItems }} trigger={['click']} placement="bottomRight" disabled={!hasBulkSelection}>
            <Button className={`batch-folio-action-btn${hasBulkSelection ? ' action-btn-active' : ''}`} icon={<PrinterOutlined />} disabled={!hasBulkSelection}>Print <DownOutlined style={{ fontSize: 10 }} /></Button>
          </Dropdown>
          <Dropdown menu={{ items: emailMenuItems }} trigger={['click']} placement="bottomRight" disabled={!hasBulkSelection}>
            <Button className={`batch-folio-action-btn${hasBulkSelection ? ' action-btn-active' : ''}`} icon={<MailOutlined />} disabled={!hasBulkSelection}>Email <DownOutlined style={{ fontSize: 10 }} /></Button>
          </Dropdown>
        </div>
      </div>

      {/* Table */}
      <div className="batch-folio-table">
        <Table
          rowSelection={{ selectedRowKeys, onChange: (keys: React.Key[]) => setSelectedRowKeys(keys) }}
          columns={visibleColumns}
          dataSource={filteredData}
          pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'], showTotal: (total) => `Total ${total} results`, size: 'default' }}
          size="middle"
          scroll={{ x: 'max-content' }}
        />
      </div>

      {/* ─── Filter Drawer ─── */}
      <Drawer open={filterDrawerOpen} onClose={handleFilterCancel} width={380} closable={false} className="batch-folio-filter-drawer filter-drawer"
        footer={<div className="drawer-footer"><Button className="drawer-cancel-btn" type="text" onClick={handleFilterCancel}>Cancel</Button><Button className="drawer-submit-btn" type="primary" onClick={handleApplyFilters} disabled={!hasUncommittedFilters && !hasActiveFilters}>Show {getPreviewCount()} Results</Button></div>}>
        <div className="drawer-custom-header">
          <div className="drawer-close-icon" onClick={handleFilterCancel} role="button" tabIndex={0}><CloseOutlined style={{ fontSize: 14 }} /></div>
          <h3 className="drawer-title">Filters</h3>
          <Button type="text" className="filter-clear-btn" onClick={handleClearAllFilters} icon={<BroomIcon style={{ fontSize: 14 }} />}>Clear All</Button>
        </div>
        <div className="drawer-form-content">
          <div className="filter-field-group">
            <label className="filter-field-label">Check-In — Check-Out Dates</label>
            <RangePicker className="filter-range-picker" placeholder={['Start date', 'End date']} value={filterDateRange} onChange={(dates) => setFilterDateRange(dates as [any, any] | null)} style={{ width: '100%' }} size="large" separator="→" />
          </div>
          <div className="filter-field-group">
            <label className="filter-field-label">Duration Type</label>
            <Select placeholder="Select duration type" value={filterDurationType} onChange={setFilterDurationType} allowClear style={{ width: '100%' }} size="large" options={durationTypeOptions} />
          </div>
          <div className="filter-field-group">
            <label className="filter-field-label">Status</label>
            <Select placeholder="Select status" value={filterStatus} onChange={setFilterStatus} allowClear style={{ width: '100%' }} size="large" options={statusOptions} />
          </div>
          <div className="filter-field-group">
            <label className="filter-field-label">Room/Space Type</label>
            <Select placeholder="Select room or space types" value={filterRoomType} onChange={setFilterRoomType} allowClear style={{ width: '100%' }} size="large" options={roomTypeOptions} />
          </div>
          <div className="filter-field-group">
            <label className="filter-field-label">Groups</label>
            <Select placeholder="Select groups" value={filterGroup} onChange={setFilterGroup} allowClear style={{ width: '100%' }} size="large" options={groupOptions} />
          </div>
          <div className="filter-field-group">
            <label className="filter-field-label">Business Sources</label>
            <Select placeholder="Select business sources" value={filterBusinessSource} onChange={setFilterBusinessSource} allowClear style={{ width: '100%' }} size="large" options={businessSourceOptions} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default BatchFolio;
