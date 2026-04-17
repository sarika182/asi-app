import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Select, Button, Input, DatePicker, Alert, Tooltip, Modal } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import './RateAdjustmentPanel.css';
import RangeRateDrawer from './RangeRateDrawer';
import type { RangeRateFormData } from './RangeRateDrawer';

/* ─── Custom SVG Icons from @Icons/outline ─── */
const IconLink: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.7612 12.4199C23.8687 10.3124 23.8687 6.89616 21.7612 4.78866C19.755 2.78241 16.5337 2.67366 14.3962 4.54491L14.1675 4.74741C13.7925 5.07366 13.755 5.64366 14.0812 6.01866C14.4075 6.39366 14.9775 6.43116 15.3525 6.10491L15.5812 5.90241C17.0062 4.65741 19.1513 4.72866 20.49 6.06741C21.8925 7.46991 21.8925 9.74616 20.49 11.1524L16.2413 15.3974C14.8387 16.7999 12.5588 16.7999 11.1562 15.3974C9.8175 14.0587 9.74625 11.9137 10.9913 10.4887L11.1675 10.2862C11.4937 9.91116 11.4563 9.34491 11.0813 9.01491C10.7063 8.68491 10.14 8.72616 9.81 9.10116L9.63375 9.30366C7.76625 11.4412 7.875 14.6624 9.88125 16.6687C11.9887 18.7762 15.405 18.7762 17.5125 16.6687L21.7612 12.4199ZM2.23875 11.5799C0.13125 13.6874 0.13125 17.1037 2.23875 19.2074C4.24875 21.2174 7.47 21.3224 9.6075 19.4512L9.83625 19.2487C10.2112 18.9224 10.2487 18.3524 9.9225 17.9774C9.59625 17.6024 9.02625 17.5649 8.65125 17.8912L8.4225 18.0937C6.9975 19.3387 4.8525 19.2674 3.51375 17.9287C2.11125 16.5262 2.11125 14.2499 3.51375 12.8437L7.7625 8.60241C9.165 7.19991 11.4412 7.19991 12.8475 8.60241C14.1862 9.94116 14.2575 12.0862 13.0125 13.5112L12.81 13.7399C12.4838 14.1149 12.5212 14.6812 12.8962 15.0112C13.2712 15.3412 13.8375 15.2999 14.1675 14.9249L14.37 14.6962C16.2413 12.5587 16.1325 9.33741 14.1263 7.32741C12.0188 5.21991 8.6025 5.21991 6.495 7.32741L2.23875 11.5799Z" fill="currentColor"/>
  </svg>
);


const IconCircleInfo: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.20002C14.0687 4.20002 16.0527 5.02181 17.5154 6.48459C18.9782 7.94738 19.8 9.93134 19.8 12C19.8 14.0687 18.9782 16.0527 17.5154 17.5155C16.0527 18.9782 14.0687 19.8 12 19.8C9.93132 19.8 7.94736 18.9782 6.48458 17.5155C5.02179 16.0527 4.20001 14.0687 4.20001 12C4.20001 9.93134 5.02179 7.94738 6.48458 6.48459C7.94736 5.02181 9.93132 4.20002 12 4.20002ZM12 21.6C14.5461 21.6 16.9879 20.5886 18.7882 18.7882C20.5886 16.9879 21.6 14.5461 21.6 12C21.6 9.45395 20.5886 7.01215 18.7882 5.2118C16.9879 3.41145 14.5461 2.40002 12 2.40002C9.45393 2.40002 7.01213 3.41145 5.21178 5.2118C3.41144 7.01215 2.40001 9.45395 2.40001 12C2.40001 14.5461 3.41144 16.9879 5.21178 18.7882C7.01213 20.5886 9.45393 21.6 12 21.6ZM10.5 15C10.0013 15 9.60001 15.4013 9.60001 15.9C9.60001 16.3988 10.0013 16.8 10.5 16.8H13.5C13.9988 16.8 14.4 16.3988 14.4 15.9C14.4 15.4013 13.9988 15 13.5 15H13.2V11.7C13.2 11.2013 12.7988 10.8 12.3 10.8H10.5C10.0013 10.8 9.60001 11.2013 9.60001 11.7C9.60001 12.1988 10.0013 12.6 10.5 12.6H11.4V15H10.5ZM12 9.60002C12.3183 9.60002 12.6235 9.4736 12.8485 9.24855C13.0736 9.02351 13.2 8.71828 13.2 8.40002C13.2 8.08176 13.0736 7.77654 12.8485 7.5515C12.6235 7.32645 12.3183 7.20002 12 7.20002C11.6817 7.20002 11.3765 7.32645 11.1515 7.5515C10.9264 7.77654 10.8 8.08176 10.8 8.40002C10.8 8.71828 10.9264 9.02351 11.1515 9.24855C11.3765 9.4736 11.6817 9.60002 12 9.60002Z" fill="currentColor"/>
  </svg>
);

const IconArrowsRotate: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.925 9.41635C6.93 7.05385 9.27375 5.4001 12 5.4001C13.4888 5.4001 14.9175 5.9926 15.9713 7.04635L17.9288 9.0001H15.9C15.4013 9.0001 15 9.40135 15 9.9001C15 10.3988 15.4013 10.8001 15.9 10.8001H20.1C20.5988 10.8001 21 10.3988 21 9.9001V5.7001C21 5.20135 20.5988 4.8001 20.1 4.8001C19.6013 4.8001 19.2 5.20135 19.2 5.7001V7.72885L17.2463 5.77135C15.855 4.3801 13.9688 3.6001 12 3.6001C8.5275 3.6001 5.54625 5.7076 4.2675 8.71135C4.0725 9.16885 4.28625 9.6976 4.74375 9.8926C5.20125 10.0876 5.73 9.87385 5.925 9.41635ZM19.725 15.3038C19.92 14.8463 19.71 14.3176 19.2525 14.1226C18.795 13.9276 18.2663 14.1376 18.0712 14.5951C17.0625 16.9538 14.7225 18.6001 12 18.6001C10.5113 18.6001 9.0825 18.0076 8.02875 16.9538L6.07125 15.0001H8.1C8.59875 15.0001 9 14.5988 9 14.1001C9 13.6013 8.59875 13.2001 8.1 13.2001H3.9C3.40125 13.2001 3 13.6013 3 14.1001V18.3001C3 18.7988 3.40125 19.2001 3.9 19.2001C4.39875 19.2001 4.8 18.7988 4.8 18.3001V16.2713L6.75375 18.2251C8.145 19.6201 10.0313 20.4001 12 20.4001C15.4688 20.4001 18.4425 18.3001 19.725 15.3038Z" fill="currentColor"/>
  </svg>
);

const IconMoneyBill: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.66667 7.22222C3.66667 6.91667 3.91667 6.66667 4.22222 6.66667H19.7778C20.0833 6.66667 20.3333 6.91667 20.3333 7.22222V16.1111C20.3333 16.4167 20.0833 16.6667 19.7778 16.6667H4.22222C3.91667 16.6667 3.66667 16.4167 3.66667 16.1111V7.22222ZM4.22222 5C2.99653 5 2 5.99653 2 7.22222V16.1111C2 17.3368 2.99653 18.3333 4.22222 18.3333H19.7778C21.0035 18.3333 22 17.3368 22 16.1111V7.22222C22 5.99653 21.0035 5 19.7778 5H4.22222ZM14.357 9.30964C13.7319 8.68452 12.8841 8.33333 12 8.33333C11.1159 8.33333 10.2681 8.68452 9.64298 9.30964C9.01786 9.93477 8.66667 10.7826 8.66667 11.6667C8.66667 12.5507 9.01786 13.3986 9.64298 14.0237C10.2681 14.6488 11.1159 15 12 15C12.8841 15 13.7319 14.6488 14.357 14.0237C14.9821 13.3986 15.3333 12.5507 15.3333 11.6667C15.3333 10.7826 14.9821 9.93477 14.357 9.30964Z" fill="currentColor"/>
  </svg>
);

const IconCircleMinus: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.1999C14.0687 4.1999 16.0527 5.02169 17.5154 6.48447C18.9782 7.94725 19.8 9.93121 19.8 11.9999C19.8 14.0686 18.9782 16.0526 17.5154 17.5153C16.0527 18.9781 14.0687 19.7999 12 19.7999C9.93131 19.7999 7.94735 18.9781 6.48457 17.5153C5.02179 16.0526 4.2 14.0686 4.2 11.9999C4.2 9.93121 5.02179 7.94725 6.48457 6.48447C7.94735 5.02169 9.93131 4.1999 12 4.1999ZM12 21.5999C14.5461 21.5999 16.9879 20.5885 18.7882 18.7881C20.5886 16.9878 21.6 14.546 21.6 11.9999C21.6 9.45382 20.5886 7.01203 18.7882 5.21168C16.9879 3.41133 14.5461 2.3999 12 2.3999C9.45392 2.3999 7.01213 3.41133 5.21178 5.21168C3.41143 7.01203 2.4 9.45382 2.4 11.9999C2.4 14.546 3.41143 16.9878 5.21178 18.7881C7.01213 20.5885 9.45392 21.5999 12 21.5999ZM9.3 11.0999C8.80125 11.0999 8.4 11.5012 8.4 11.9999C8.4 12.4987 8.80125 12.8999 9.3 12.8999H14.7C15.1988 12.8999 15.6 12.4987 15.6 11.9999C15.6 11.5012 15.1988 11.0999 14.7 11.0999H9.3Z" fill="currentColor"/>
  </svg>
);

const IconCircleDollarToSlot: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.1999C13.5913 4.1999 15.1174 4.83204 16.2426 5.95726C17.3679 7.08248 18 8.6086 18 10.1999C18 11.7912 17.3679 13.3173 16.2426 14.4425C15.1174 15.5678 13.5913 16.1999 12 16.1999C10.4087 16.1999 8.88257 15.5678 7.75735 14.4425C6.63213 13.3173 5.99999 11.7912 5.99999 10.1999C5.99999 8.6086 6.63213 7.08248 7.75735 5.95726C8.88257 4.83204 10.4087 4.1999 12 4.1999ZM12 17.9999C14.0687 17.9999 16.0526 17.1781 17.5154 15.7153C18.9782 14.2526 19.8 12.2686 19.8 10.1999C19.8 8.13121 18.9782 6.14725 17.5154 4.68447C16.0526 3.22169 14.0687 2.3999 12 2.3999C9.93131 2.3999 7.94735 3.22169 6.48456 4.68447C5.02178 6.14725 4.19999 8.13121 4.19999 10.1999C4.19999 12.2686 5.02178 14.2526 6.48456 15.7153C7.94735 17.1781 9.93131 17.9999 12 17.9999ZM4.79999 15.5999C3.47624 15.5999 2.39999 16.6762 2.39999 17.9999V19.1999C2.39999 20.5237 3.47624 21.5999 4.79999 21.5999H19.2C20.5237 21.5999 21.6 20.5237 21.6 19.1999V17.9999C21.6 16.6762 20.5275 15.5999 19.2 15.5999C18.69 16.2824 18.0825 16.8862 17.4 17.3999H19.2C19.53 17.3999 19.8 17.6699 19.8 17.9999V19.1999C19.8 19.5299 19.53 19.7999 19.2 19.7999H4.79999C4.46999 19.7999 4.19999 19.5299 4.19999 19.1999V17.9999C4.19999 17.6699 4.46999 17.3999 4.79999 17.3999H6.59999C5.91749 16.8862 5.31374 16.2824 4.79999 15.5999ZM12.75 6.2999C12.75 5.8874 12.4125 5.5499 12 5.5499C11.5875 5.5499 11.25 5.8874 11.25 6.2999V6.8249C10.965 6.88865 10.68 6.9899 10.4175 7.14365C9.89625 7.4549 9.44624 7.99865 9.44999 8.7899C9.45374 9.55115 9.89999 10.0312 10.3762 10.3162C10.7887 10.5637 11.3025 10.7212 11.7112 10.8412L11.775 10.8599C12.2475 11.0024 12.5925 11.1149 12.825 11.2612C13.0162 11.3812 13.0425 11.4637 13.0462 11.5687C13.05 11.7562 12.9787 11.8687 12.825 11.9624C12.6375 12.0787 12.3412 12.1499 12.0225 12.1387C11.6062 12.1237 11.2162 11.9924 10.7062 11.8199C10.62 11.7899 10.53 11.7599 10.4362 11.7299C10.0425 11.5987 9.61874 11.8124 9.48749 12.2024C9.35624 12.5924 9.56999 13.0199 9.95999 13.1512C10.0312 13.1737 10.11 13.1999 10.1887 13.2299C10.5 13.3387 10.86 13.4624 11.2462 13.5449V14.0999C11.2462 14.5124 11.5837 14.8499 11.9962 14.8499C12.4087 14.8499 12.7462 14.5124 12.7462 14.0999V13.5824C13.0462 13.5187 13.3462 13.4137 13.6162 13.2449C14.1525 12.9112 14.5575 12.3412 14.5462 11.5574C14.535 10.7962 14.1075 10.3049 13.6237 9.9974C13.1925 9.7274 12.6525 9.5624 12.2325 9.4349L12.2062 9.4274C11.7262 9.28115 11.385 9.17615 11.145 9.03365C10.95 8.9174 10.9462 8.8499 10.9462 8.7824C10.9462 8.64365 10.9987 8.53865 11.1787 8.43365C11.3812 8.31365 11.6887 8.2424 11.985 8.24615C12.345 8.2499 12.7425 8.32865 13.155 8.44115C13.5562 8.54615 13.965 8.3099 14.0737 7.90865C14.1825 7.5074 13.9425 7.09865 13.5412 6.9899C13.2975 6.92615 13.0275 6.8624 12.75 6.81365V6.2999Z" fill="currentColor"/>
  </svg>
);

/* Legend SVG Shapes */
const LegendToday: React.FC = () => (
  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="12" rx="2" fill="#3E4BE0"/>
  </svg>
);

const LegendPastDates: React.FC = () => (
  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="23" height="11" rx="1.5" fill="black" fillOpacity="0.04"/>
    <rect x="0.5" y="0.5" width="23" height="11" rx="1.5" stroke="#D9D9D9"/>
  </svg>
);

const IconInfo: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.20002C14.0687 4.20002 16.0527 5.02181 17.5154 6.48459C18.9782 7.94738 19.8 9.93134 19.8 12C19.8 14.0687 18.9782 16.0527 17.5154 17.5155C16.0527 18.9782 14.0687 19.8 12 19.8C9.93132 19.8 7.94736 18.9782 6.48458 17.5155C5.02179 16.0527 4.20001 14.0687 4.20001 12C4.20001 9.93134 5.02179 7.94738 6.48458 6.48459C7.94736 5.02181 9.93132 4.20002 12 4.20002ZM12 21.6C14.5461 21.6 16.9879 20.5886 18.7882 18.7882C20.5886 16.9879 21.6 14.5461 21.6 12C21.6 9.45395 20.5886 7.01215 18.7882 5.2118C16.9879 3.41145 14.5461 2.40002 12 2.40002C9.45393 2.40002 7.01213 3.41145 5.21178 5.2118C3.41144 7.01215 2.40001 9.45395 2.40001 12C2.40001 14.5461 3.41144 16.9879 5.21178 18.7882C7.01213 20.5886 9.45393 21.6 12 21.6ZM10.5 15C10.0013 15 9.60001 15.4013 9.60001 15.9C9.60001 16.3988 10.0013 16.8 10.5 16.8H13.5C13.9988 16.8 14.4 16.3988 14.4 15.9C14.4 15.4013 13.9988 15 13.5 15H13.2V11.7C13.2 11.2013 12.7988 10.8 12.3 10.8H10.5C10.0013 10.8 9.60001 11.2013 9.60001 11.7C9.60001 12.1988 10.0013 12.6 10.5 12.6H11.4V15H10.5ZM12 9.60002C12.3183 9.60002 12.6235 9.4736 12.8485 9.24855C13.0736 9.02351 13.2 8.71828 13.2 8.40002C13.2 8.08176 13.0736 7.77654 12.8485 7.5515C12.6235 7.32645 12.3183 7.20002 12 7.20002C11.6817 7.20002 11.3765 7.32645 11.1515 7.5515C10.9264 7.77654 10.8 8.08176 10.8 8.40002C10.8 8.71828 10.9264 9.02351 11.1515 9.24855C11.3765 9.4736 11.6817 9.60002 12 9.60002Z" fill="currentColor"/>
  </svg>
);

const IconFlagPennant: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.4 3.2999C5.4 2.80115 4.99875 2.3999 4.5 2.3999C4.00125 2.3999 3.6 2.80115 3.6 3.2999V3.5999V5.3999V13.7999V15.5999V20.6999C3.6 21.1987 4.00125 21.5999 4.5 21.5999C4.99875 21.5999 5.4 21.1987 5.4 20.6999V15.5587L19.8337 10.4024C20.1712 10.2824 20.4 9.9599 20.4 9.5999C20.4 9.2399 20.175 8.9174 19.8337 8.7974L5.4 3.64115V3.2999ZM5.4 5.55365L16.7287 9.5999L5.4 13.6462V5.55365Z" fill="currentColor"/>
  </svg>
);


const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;

/* ─── Sample Data ─── */

const dateRangePresets = [
  { value: 'next-7', label: 'Next 7 days', days: 7 },
  { value: 'next-14', label: 'Next 14 days', days: 14 },
  { value: 'next-30', label: 'Next 30 days', days: 30 },
];

const ratePlanGroups = [
  {
    label: 'Daily',
    options: [
      { value: 'best-available', label: 'Best Available' },
      { value: 'rack', label: 'RACK' },
    ],
  },
  {
    label: 'Hourly',
    options: [
      { value: 'best-hourly', label: 'Best Hourly' },
      { value: 'hourly-rate', label: 'Hourly Rate' },
      { value: 'independent-hourly', label: 'Independent Hourly' },
    ],
  },
  {
    label: 'Weekly',
    options: [
      { value: 'weekly-bumper', label: 'Weekly Bumper' },
    ],
  },
];

/* ─── Rate Type Binding Config ─── */
// "Hourly Rate" is bound to "Best Hourly" with these adjustments per occupancy type
interface RateTypeBinding {
  boundTo: string;       // rate plan value it derives from
  boundToLabel: string;  // display label
  adjustments: Record<string, { type: 'fixed' | 'percent'; value: number }>;
}

const rateTypeBindings: Record<string, RateTypeBinding> = {
  'hourly-rate': {
    boundTo: 'best-hourly',
    boundToLabel: 'Best Hourly',
    adjustments: {
      'Base': { type: 'fixed', value: 10 },
      'Extra Adult': { type: 'percent', value: 30 },
      'Extra Child': { type: 'fixed', value: 10 },
      'Pet Fee': { type: 'fixed', value: 11 },
    },
  },
};

const roomTypeOptions = [
  { value: 'std', label: '(STD) Standard' },
  { value: 'dks', label: '(DKS) Double Bed King Smoking' },
  { value: 'dns', label: '(DNS) Double Beds Non-Smoking' },
  { value: 'kns', label: '(KNS) King Non-Smoking' },
  { value: 'ks', label: '(KS) King Smoking' },
];

const allRoomTypeValues = roomTypeOptions.map((o) => o.value);

const occupancyTypes = ['Base', 'Extra Adult', 'Extra Child', 'Pet Fee'];

interface RoomTypeData {
  key: string;
  code: string;
  name: string;
  boundTo?: string;
  derived?: string;
  occupancies: {
    type: string;
    label: string;
    maxOccupancy?: string;
    rates: Record<string, number>;
  }[];
}

interface DateColumn {
  key: string;
  dayName: string;
  date: string;
  isWeekend: boolean; // Fri=5, Sat=6
  isToday: boolean;
  hasEvent: boolean;
}

const generateDates = (numDays: number, startDate?: Date): DateColumn[] => {
  const result: DateColumn[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = startDate || today;

  for (let i = 0; i < numDays; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    d.setHours(0, 0, 0, 0);
    const dayIdx = d.getDay();
    result.push({
      key: `d${i}`,
      dayName: dayNames[dayIdx],
      date: `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
      isWeekend: dayIdx === 5 || dayIdx === 6, // Fri and Sat
      isToday: d.getTime() === today.getTime(),
      hasEvent: dayIdx === 3 || dayIdx === 4 || dayIdx === 5,
    });
  }
  return result;
};

// Base rates per room type per occupancy for "Best Hourly"
const bestHourlyBaseRates: Record<string, Record<string, number>> = {
  std:  { 'Base': 100, 'Extra Adult': 50, 'Extra Child': 50, 'Pet Fee': 20 },
  dks:  { 'Base': 110, 'Extra Adult': 55, 'Extra Child': 55, 'Pet Fee': 20 },
  dns:  { 'Base': 110, 'Extra Adult': 55, 'Extra Child': 55, 'Pet Fee': 20 },
  kns:  { 'Base': 100, 'Extra Adult': 50, 'Extra Child': 50, 'Pet Fee': 20 },
  ks:   { 'Base': 50, 'Extra Adult': 50, 'Extra Child': 50, 'Pet Fee': 20 },
};

const applyRateTypeAdjustment = (baseValue: number, adjustment: { type: 'fixed' | 'percent'; value: number }): number => {
  if (adjustment.type === 'fixed') return baseValue + adjustment.value;
  if (adjustment.type === 'percent') return baseValue + (baseValue * adjustment.value / 100);
  return baseValue;
};

const buildRoomData = (dates: DateColumn[]): RoomTypeData[] => [
  {
    key: 'std',
    code: 'STD',
    name: 'Standard',
    occupancies: occupancyTypes.map((type) => ({
      type,
      label: type,
      maxOccupancy: type === 'Base' ? 'Base Occupancy: 3' : type === 'Pet Fee' ? 'Max Occupancy: 1' : type === 'Extra Child' ? 'Max Occupancy: --' : 'Max Occupancy: 3',
      rates: dates.reduce((acc, d) => { acc[d.key] = bestHourlyBaseRates.std[type]; return acc; }, {} as Record<string, number>),
    })),
  },
  {
    key: 'dks',
    code: 'DKS',
    name: 'Double Bed King Smoking',
    boundTo: 'Bound with STD',
    derived: '+10%',
    occupancies: occupancyTypes.map((type) => ({
      type,
      label: type,
      maxOccupancy: type === 'Base' ? 'Base Occupancy: 3' : type === 'Pet Fee' ? 'Max Occupancy: 1' : type === 'Extra Child' ? 'Max Occupancy: --' : 'Max Occupancy: 3',
      rates: dates.reduce((acc, d) => { acc[d.key] = bestHourlyBaseRates.dks[type]; return acc; }, {} as Record<string, number>),
    })),
  },
  {
    key: 'dns',
    code: 'DNS',
    name: 'Double Beds Non-Smoking',
    boundTo: 'Bound with STD',
    derived: '+10%',
    occupancies: occupancyTypes.map((type) => ({
      type,
      label: type,
      maxOccupancy: type === 'Base' ? 'Base Occupancy: 3' : type === 'Pet Fee' ? 'Max Occupancy: 1' : type === 'Extra Child' ? 'Max Occupancy: --' : 'Max Occupancy: 3',
      rates: dates.reduce((acc, d) => { acc[d.key] = bestHourlyBaseRates.dns[type]; return acc; }, {} as Record<string, number>),
    })),
  },
  {
    key: 'kns',
    code: 'KNS',
    name: 'King Non-Smoking',
    occupancies: occupancyTypes.map((type) => ({
      type,
      label: type,
      maxOccupancy: type === 'Base' ? 'Base Occupancy: 3' : type === 'Pet Fee' ? 'Max Occupancy: 1' : type === 'Extra Child' ? 'Max Occupancy: --' : 'Max Occupancy: 3',
      rates: dates.reduce((acc, d) => { acc[d.key] = bestHourlyBaseRates.kns[type]; return acc; }, {} as Record<string, number>),
    })),
  },
  {
    key: 'ks',
    code: 'KS',
    name: 'King Smoking',
    occupancies: occupancyTypes.map((type) => ({
      type,
      label: type,
      maxOccupancy: type === 'Base' ? 'Base Occupancy: 3' : type === 'Pet Fee' ? 'Max Occupancy: 1' : type === 'Extra Child' ? 'Max Occupancy: --' : 'Max Occupancy: 3',
      rates: dates.reduce((acc, d) => { acc[d.key] = bestHourlyBaseRates.ks[type]; return acc; }, {} as Record<string, number>),
    })),
  },
];

/* ─── Legend bar items ─── */
const legendItems = [
  { label: 'Today', type: 'today-rect' as const },
  { label: 'Past Dates', type: 'past-rect' as const },
  { label: 'Restrictions', type: 'icon-circle-minus' as const },
  { label: 'Bound Room Type', type: 'icon-link' as const },
  { label: 'Bound Rate Type', type: 'icon-money-bill' as const },
];

/* ─── Duration Dropdown Component ─── */
interface DurationDropdownProps {
  selectedPreset: string;
  onSelect: (preset: string, numDays: number, customRange?: [Date, Date]) => void;
  onClose: () => void;
}

const DurationDropdown: React.FC<DurationDropdownProps> = ({ selectedPreset, onSelect, onClose }) => {
  const [customRange, setCustomRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handlePresetClick = (preset: typeof dateRangePresets[0]) => {
    onSelect(preset.value, preset.days);
    onClose();
  };

  const handleCustomRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setCustomRange(dates);
    }
  };

  const handleApply = () => {
    if (customRange[0] && customRange[1]) {
      const diffDays = customRange[1].diff(customRange[0], 'day') + 1;
      onSelect('custom', diffDays, [customRange[0].toDate(), customRange[1].toDate()]);
      onClose();
    }
  };

  const handleReset = () => {
    setCustomRange([null, null]);
  };

  return (
    <div className="rap-duration-dropdown" ref={dropdownRef}>
      <div className="rap-duration-body">
        <RangePicker
          value={customRange}
          onChange={handleCustomRangeChange}
          placeholder={['Start date', 'End date']}
          style={{ width: '100%' }}
          size="small"
        />

        {dateRangePresets.map((preset) => (
          <div
            key={preset.value}
            className={`rap-duration-option ${selectedPreset === preset.value ? 'active' : ''}`}
            onClick={() => handlePresetClick(preset)}
          >
            {preset.label}
          </div>
        ))}
      </div>
      <div className="rap-duration-footer">
        <button className="rap-duration-btn rap-duration-btn-reset" onClick={handleReset}>Reset</button>
        <button
          className="rap-duration-btn rap-duration-btn-apply"
          onClick={handleApply}
          disabled={!customRange[0] || !customRange[1]}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

/* ─── Rate Validation ─── */
const RATE_MIN = 100;
const RATE_MAX = 3000;
const RATE_RANGE_TOOLTIP = `Rate should be in the range of: $${RATE_MIN.toFixed(2)} - $${RATE_MAX.toFixed(2)}`;

/* ─── Main Component ─── */
const RateAdjustmentPanel: React.FC = () => {
  const [dateRangePreset, setDateRangePreset] = useState('next-7');
  const [dateRangeLabel, setDateRangeLabel] = useState('Next 7 Days');
  const [numDays, setNumDays] = useState(7);
  const [customStart, setCustomStart] = useState<Date | undefined>(undefined);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [ratePlan, setRatePlan] = useState('best-hourly');
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([...allRoomTypeValues]);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const [rangeRateDrawerOpen, setRangeRateDrawerOpen] = useState(false);
  const [cellErrors, setCellErrors] = useState<Record<string, boolean>>({});
  const alertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSuccessAlert = (msg: string) => {
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    setSuccessAlert(msg);
    alertTimerRef.current = setTimeout(() => setSuccessAlert(null), 4000);
  };

  const handleRangeRateApply = (data: RangeRateFormData) => {
    setRangeRateDrawerOpen(false);

    const selectedDays = new Set(data.daysOfWeek);
    const startDayjs = dayjs(data.startDate); // ISO format from drawer
    const endDayjs = dayjs(data.endDate);

    setRateData((prev) =>
      prev.map((room) => {
        // room.key matches drawer roomType values directly ('std', 'dks', etc.)
        if (!data.roomTypes.includes(room.key)) return room;

        return {
          ...room,
          occupancies: room.occupancies.map((occ) => {
            // occ.type matches drawer occupancy keys directly ('Base', 'Extra Adult', etc.)
            const rateEntry = data.rates[room.key]?.[occ.type];
            if (!rateEntry) return occ;

            const newRates = { ...occ.rates };
            for (const dateCol of dates) {
              if (!selectedDays.has(dateCol.dayName)) continue;

              // Use dayjs for reliable cross-browser date parsing
              const colDayjs = dayjs(dateCol.date, 'MMM D, YYYY');
              if (!colDayjs.isValid()) continue;

              if (
                (colDayjs.isSame(startDayjs, 'day') || colDayjs.isAfter(startDayjs, 'day')) &&
                (colDayjs.isSame(endDayjs, 'day') || colDayjs.isBefore(endDayjs, 'day'))
              ) {
                const currentVal = newRates[dateCol.key] ?? 0;
                switch (rateEntry.extension) {
                  case '=$': newRates[dateCol.key] = rateEntry.value; break;
                  case '+$': newRates[dateCol.key] = currentVal + rateEntry.value; break;
                  case '-$': newRates[dateCol.key] = Math.max(0, currentVal - rateEntry.value); break;
                  case '+%': newRates[dateCol.key] = currentVal * (1 + rateEntry.value / 100); break;
                  case '-%': newRates[dateCol.key] = currentVal * (1 - rateEntry.value / 100); break;
                  default: newRates[dateCol.key] = rateEntry.value;
                }
                newRates[dateCol.key] = Math.round(newRates[dateCol.key] * 100) / 100;
              }
            }

            return { ...occ, rates: newRates };
          }),
        };
      }),
    );

    showSuccessAlert('Range rate operations have been applied successfully.');
  };

  const dates = useMemo(() => generateDates(numDays, customStart), [numDays, customStart]);
  const [rateData, setRateData] = useState<RoomTypeData[]>(() => buildRoomData(generateDates(7)));

  const handleDurationSelect = (preset: string, days: number, customRange?: [Date, Date]) => {
    setDateRangePreset(preset);
    setNumDays(days);
    if (preset === 'custom' && customRange) {
      setCustomStart(customRange[0]);
      const startStr = dayjs(customRange[0]).format('MMM D');
      const endStr = dayjs(customRange[1]).format('MMM D, YYYY');
      setDateRangeLabel(`${startStr} - ${endStr}`);
      setRateData(buildRoomData(generateDates(days, customRange[0])));
    } else {
      setCustomStart(undefined);
      const found = dateRangePresets.find((p) => p.value === preset);
      setDateRangeLabel(found?.label || preset);
      setRateData(buildRoomData(generateDates(days)));
    }
  };

  const applyRateChange = (roomKey: string, occType: string, dateKey: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const cellId = `${roomKey}-${occType}-${dateKey}`;
    const isOutOfRange = occType === 'Base' && (numValue < RATE_MIN || numValue > RATE_MAX);

    setRateData((prev) =>
      prev.map((room) => {
        if (room.key !== roomKey) return room;
        return {
          ...room,
          occupancies: room.occupancies.map((occ) => {
            if (occ.type !== occType) return occ;
            return { ...occ, rates: { ...occ.rates, [dateKey]: numValue } };
          }),
        };
      })
    );

    if (isOutOfRange) {
      setCellErrors((prev) => ({ ...prev, [cellId]: true }));
    } else {
      setCellErrors((prev) => {
        const next = { ...prev };
        delete next[cellId];
        return next;
      });
      showSuccessAlert('The rate has been successfully updated.');
    }
  };

  const handleRateChange = (roomKey: string, occType: string, dateKey: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const oldValue = rateData.find((r) => r.key === roomKey)?.occupancies.find((o) => o.type === occType)?.rates[dateKey] ?? 0;

    if (oldValue > 0) {
      const pctChange = ((numValue - oldValue) / oldValue) * 100;
      const isStdBase = roomKey === 'std' && occType === 'Base';

      let content: React.ReactNode = null;
      if (pctChange < -10) {
        content = isStdBase
          ? <span>Proceeding will apply a <strong>rate reduction greater than 10%</strong>. This action could impact revenue and pricing strategy. Any affected rates (for bound room types) exceeding their thresholds will be adjusted to the <strong>minimum or maximum permissible value</strong>. Do you wish to continue?</span>
          : <span>Proceeding will apply a <strong>rate reduction greater than 10%</strong>. This action could impact revenue and pricing strategy. Do you wish to update?</span>;
      } else if (pctChange > 50) {
        content = isStdBase
          ? <span>Proceeding will apply a <strong>rate increase greater than 50%</strong>. This action could impact revenue and pricing strategy. Any affected rates (for bound room types) exceeding their thresholds will be adjusted to the <strong>minimum or maximum permissible value</strong>. Do you wish to continue?</span>
          : <span>Proceeding will apply a <strong>rate increase greater than 50%</strong>. This action could impact revenue and pricing strategy. Do you wish to update?</span>;
      }

      if (content) {
        Modal.confirm({
          title: 'Update Rate?',
          icon: <InfoCircleFilled style={{ color: '#3E4BE0' }} />,
          content,
          okText: 'Yes, Update',
          cancelText: 'No, Cancel',
          centered: true,
          okButtonProps: { style: { backgroundColor: '#3e4be0', borderColor: '#3e4be0' } },
          onOk: () => applyRateChange(roomKey, occType, dateKey, value),
        });
        return;
      }
    }

    applyRateChange(roomKey, occType, dateKey, value);
  };

  const handleCellClick = (cellId: string, isBound: boolean) => {
    if (!isBound) {
      setEditingCell(cellId);
    }
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const filteredRoomTypes = rateData.filter((rt) => selectedRoomTypes.includes(rt.key));
  const lastSyncTime = 'Last synced at 07:10 PM (Jan 12, 2025)';

  // Rate type binding: check if selected rate plan is bound to another
  const rateTypeBinding = rateTypeBindings[ratePlan];
  const isRateTypeBound = !!rateTypeBinding;

  // Check if the selected rate plan belongs to the Hourly group
  const isHourlyRate = ratePlanGroups
    .find((g) => g.label === 'Hourly')
    ?.options.some((o) => o.value === ratePlan) ?? false;

  // Build binding banner text
  const bindingBannerText = isRateTypeBound
    ? `Selected Rate Type is bound with ${rateTypeBinding.boundToLabel} (${Object.entries(rateTypeBinding.adjustments).map(([occ, adj]) =>
        `${occ}: ${adj.type === 'fixed' ? `+$${adj.value}` : `+${adj.value}%`}`
      ).join(', ')})`
    : '';

  // Compute displayed rate for room-type-bound rooms (e.g. DKS = STD × 1.10)
  // Pet Fee is always the room's own stored value (it's independently editable)
  const getRoomDerivedRate = (room: RoomTypeData, occType: string, dateKey: string): number => {
    if (!room.boundTo || !room.derived || occType === 'Pet Fee') {
      const occ = room.occupancies.find((o) => o.type === occType);
      return occ?.rates[dateKey] ?? 0;
    }
    // 'Bound with STD' → 'std', 'Bound with KNS' → 'kns', etc.
    const parentCode = room.boundTo.split(' ').pop()?.toLowerCase() ?? '';
    const parentRoom = rateData.find((r) => r.key === parentCode);
    if (!parentRoom) {
      const occ = room.occupancies.find((o) => o.type === occType);
      return occ?.rates[dateKey] ?? 0;
    }
    const parentOcc = parentRoom.occupancies.find((o) => o.type === occType);
    const parentRate = parentOcc?.rates[dateKey] ?? 0;
    // Parse '+10%' → multiply by 1.10; '-10%' → multiply by 0.90
    const derivedPct = parseFloat(room.derived.replace(/[^0-9.]/g, '')) || 0;
    const multiplier = room.derived.startsWith('+')
      ? 1 + derivedPct / 100
      : 1 - derivedPct / 100;
    return Math.round(parentRate * multiplier * 100) / 100;
  };

  // Compute displayed rates: handle rate-type binding and room-type binding
  const getDisplayRate = (room: RoomTypeData, occType: string, dateKey: string): number => {
    const isRoomBound = !!room.derived && !!room.boundTo && occType !== 'Pet Fee';
    // Base rate: derive from parent room if room is bound, otherwise use stored rate
    const baseRate = isRoomBound
      ? getRoomDerivedRate(room, occType, dateKey)
      : (room.occupancies.find((o) => o.type === occType)?.rates[dateKey] ?? 0);
    // Apply rate-type adjustment on top (e.g. Hourly Rate = Best Hourly + $10)
    if (isRateTypeBound && rateTypeBinding.adjustments[occType]) {
      return applyRateTypeAdjustment(baseRate, rateTypeBinding.adjustments[occType]);
    }
    return baseRate;
  };

  return (
    <div className="rate-adjustment-panel">
      {/* Success Alert */}
      {successAlert && (
        <div className="rap-alert-wrapper">
          <Alert
            message={successAlert}
            type="success"
            showIcon
            closable
            onClose={() => setSuccessAlert(null)}
          />
        </div>
      )}

      <div className="rap-title-row">
        <h1 className="rap-title">Rate Adjustment Panel</h1>
        <a
          href="https://www.figma.com/design/1M50CwfrbTXpcot61CZh0r/%F0%9F%92%BB-4.2-RM---Rates---Restrictions?node-id=7108-134525&t=PhXHZu7P5lPgxJzh-4"
          target="_blank"
          rel="noopener noreferrer"
          className="rap-dev-notes-link"
        >
          Link to Dev Notes
        </a>
      </div>

      {/* Filter and Actions Bar */}
      <div className="rap-toolbar">
        <div className="rap-filters">
          {/* Date Range - Custom Dropdown */}
          <div className="rap-duration-trigger-wrapper">
            <div
              className="rap-duration-trigger"
              onClick={() => setShowDurationDropdown(!showDurationDropdown)}
            >
              <span>{dateRangeLabel}</span>
              <span className="rap-duration-trigger-arrow">&#9662;</span>
            </div>
            {showDurationDropdown && (
              <DurationDropdown
                selectedPreset={dateRangePreset}
                onSelect={handleDurationSelect}
                onClose={() => setShowDurationDropdown(false)}
              />
            )}
          </div>

          {/* Rate Plan — grouped */}
          <Select
            value={ratePlan}
            onChange={setRatePlan}
            size="large"
            className="rap-filter-select"
            style={{ minWidth: 160 }}
          >
            {ratePlanGroups.map((group) => (
              <OptGroup key={group.label} label={group.label}>
                {group.options.map((opt) => (
                  <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                ))}
              </OptGroup>
            ))}
          </Select>

          {/* Room Types Multi-Select with Select All */}
          <Select
            mode="multiple"
            value={selectedRoomTypes}
            onChange={(values: string[]) => {
              if (values.includes('select-all')) {
                if (selectedRoomTypes.length === allRoomTypeValues.length) {
                  setSelectedRoomTypes([]);
                } else {
                  setSelectedRoomTypes([...allRoomTypeValues]);
                }
              } else {
                setSelectedRoomTypes(values.filter((v) => v !== 'select-all'));
              }
            }}
            size="large"
            className="rap-filter-select rap-room-types-select"
            style={{ minWidth: 280 }}
            maxTagCount={2}
            maxTagTextLength={10}
            placeholder="Select room types"
          >
            <Option key="select-all" value="select-all">
              <span style={{ fontWeight: 600 }}>
                {selectedRoomTypes.length === allRoomTypeValues.length ? 'Deselect All' : 'Select All'}
              </span>
            </Option>
            {roomTypeOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </div>

        <div className="rap-actions">
          <Button size="large" icon={<IconArrowsRotate style={{ fontSize: 16 }} />} className="rap-sync-btn">
            Sync
          </Button>
          <Button type="primary" size="large" icon={<IconCircleDollarToSlot style={{ fontSize: 16 }} />} className="rap-range-rate-btn" onClick={() => setRangeRateDrawerOpen(true)}>
            Range Rate Operations
          </Button>
        </div>
      </div>

      {/* Legend Bar */}
      <div className="rap-legend-bar">
        <div className="rap-legend-items">
          {legendItems.map((item) => (
            <div className="rap-legend-item" key={item.label}>
              {item.type === 'today-rect' && <LegendToday />}
              {item.type === 'past-rect' && <LegendPastDates />}
              {item.type === 'icon-circle-minus' && <IconCircleMinus className="rap-legend-icon" style={{ color: '#D69E2E', fontSize: 16 }} />}
              {item.type === 'icon-link' && <IconLink className="rap-legend-icon" style={{ color: 'rgba(0,0,0,0.25)', fontSize: 16 }} />}
              {item.type === 'icon-money-bill' && <IconMoneyBill className="rap-legend-icon" style={{ color: '#805AD5', fontSize: 16 }} />}
              <span className="rap-legend-label">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="rap-last-sync">{lastSyncTime}</div>
      </div>

      {/* Hourly Rate Note (merges binding info when applicable) */}
      {isHourlyRate && (
        <Alert
          type="info"
          showIcon
          icon={<IconInfo style={{ fontSize: 20, color: '#3e4be0' }} />}
          className="rap-info-alert"
          message={
            <span>
              <strong>Note:</strong> The selected rate is an <strong>hourly rate type</strong>. All charges below are applied on a <strong>per-hour basis</strong>.
              {isRateTypeBound && (
                <>
                  {' '}This rate type is bound to <strong>{rateTypeBinding.boundToLabel}</strong> ({Object.entries(rateTypeBinding.adjustments).map(([occ, adj]) =>
                    `${occ}: ${adj.type === 'fixed' ? `+$${adj.value}` : `+${adj.value}%`}`
                  ).join(', ')}).
                </>
              )}
            </span>
          }
        />
      )}

      {/* Rate Type Binding Banner — only for non-hourly bound rates */}
      {isRateTypeBound && !isHourlyRate && (
        <Alert
          type="info"
          showIcon
          icon={<IconInfo style={{ fontSize: 20, color: '#3e4be0' }} />}
          message={bindingBannerText}
          className="rap-info-alert"
        />
      )}

      {/* Rate Grid */}
      <div className="rap-grid-wrapper">
        <table className="rap-grid">
          <thead>
            <tr>
              <th className="rap-th-room-type">Room Type</th>
              <th className="rap-th-occupancy">Occupancy Type</th>
              {dates.map((d) => (
                <th
                  key={d.key}
                  className={`rap-th-date ${d.isWeekend ? 'weekend' : ''} ${d.isToday ? 'today' : ''}`}
                >
                  <div className={`rap-date-header ${d.isToday ? 'today' : ''} ${d.isWeekend ? 'weekend' : ''}`}>
                    <div className="rap-date-day-row">
                      <span className="rap-date-day">{d.dayName}</span>
                      {d.hasEvent && <span className="rap-date-event-dot" />}
                    </div>
                    <span className="rap-date-full">{d.date}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRoomTypes.map((room) => (
              <React.Fragment key={room.key}>
                {room.occupancies.map((occ, occIdx) => (
                  <tr key={`${room.key}-${occ.type}`} className={`rap-row ${occIdx === 0 ? 'rap-row-first' : ''}`}>
                    {occIdx === 0 && (
                      <td className="rap-td-room-type" rowSpan={room.occupancies.length}>
                        <div className="rap-room-info">
                          {room.boundTo
                            ? <IconLink className="rap-bound-icon" />
                            : room.key === 'std'
                              ? <span className="rap-std-flag-wrap"><IconFlagPennant className="rap-std-flag" /></span>
                              : null
                          }
                          <div>
                            <span className="rap-room-name">
                              ({room.code}) {room.name}
                            </span>
                            {room.boundTo && (
                              <span className="rap-room-bound">{room.boundTo}</span>
                            )}
                          </div>
                        </div>
                      </td>
                    )}

                    <td className="rap-td-occupancy">
                      <div className="rap-occ-info">
                        <span className="rap-occ-label">
                          {occ.label}
                          {room.derived && occ.type !== 'Pet Fee' && (
                            <span className="rap-derived-badge">{room.derived}</span>
                          )}
                        </span>
                        {occ.maxOccupancy && (
                          <span className="rap-occ-meta">{occ.maxOccupancy}</span>
                        )}
                      </div>
                    </td>

                    {dates.map((d) => {
                      const isRoomBound = !!room.derived && !!room.boundTo;
                      const isCellNonEditable = isRoomBound || isRateTypeBound;
                      const cellId = `${room.key}-${occ.type}-${d.key}`;
                      const isEditing = editingCell === cellId;
                      const hasError = !isCellNonEditable && !!cellErrors[cellId];
                      const displayRate = (isRateTypeBound || (isRoomBound && occ.type !== 'Pet Fee'))
                        ? getDisplayRate(room, occ.type, d.key)
                        : (occ.rates[d.key] ?? 0);

                      return (
                        <td
                          key={d.key}
                          className={`rap-td-rate ${d.isWeekend ? 'weekend' : ''} ${d.isToday ? 'today' : ''} ${hasError ? 'has-error' : ''}`}
                          onClick={() => handleCellClick(cellId, isCellNonEditable)}
                        >
                          <div className="rap-rate-cell-wrapper">
                            {isRateTypeBound && (
                              <IconMoneyBill className="rap-bound-rate-icon" style={{ color: '#805AD5' }} />
                            )}
                            {isCellNonEditable ? (
                              <span className="rap-rate-derived">{displayRate.toFixed(2)}</span>
                            ) : isEditing ? (
                              <Input
                                className="rap-rate-input"
                                size="small"
                                autoFocus
                                defaultValue={displayRate.toFixed(2)}
                                onBlur={(e) => {
                                  handleRateChange(room.key, occ.type, d.key, e.target.value);
                                  handleCellBlur();
                                }}
                                onPressEnter={(e) => {
                                  handleRateChange(room.key, occ.type, d.key, (e.target as HTMLInputElement).value);
                                  handleCellBlur();
                                }}
                              />
                            ) : hasError ? (
                              <>
                                <span className="rap-rate-readonly rap-rate-error-value">{displayRate.toFixed(2)}</span>
                                <Tooltip
                                  title={RATE_RANGE_TOOLTIP}
                                  placement="top"
                                >
                                  <span className="rap-rate-error-icon" onClick={(e) => e.stopPropagation()}>
                                    <IconCircleInfo style={{ color: '#ff4d4f', fontSize: 14 }} />
                                  </span>
                                </Tooltip>
                              </>
                            ) : (
                              <span className="rap-rate-readonly">{displayRate.toFixed(2)}</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Range Rate Operations Drawer */}
      <RangeRateDrawer
        open={rangeRateDrawerOpen}
        onClose={() => setRangeRateDrawerOpen(false)}
        onApply={handleRangeRateApply}
        currentRatePlan={ratePlan}
      />

    </div>
  );
};

export default RateAdjustmentPanel;
