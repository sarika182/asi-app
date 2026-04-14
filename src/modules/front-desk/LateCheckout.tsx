import React, { useMemo, useState, useRef } from 'react';
import { Table, Input, Tooltip, Modal, Alert, Checkbox, Dropdown, Drawer, Form, Select, DatePicker, Button, Badge } from 'antd';
import { SearchOutlined, InfoCircleOutlined, InfoCircleFilled, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import vipCrownIcon from '../../assets/icons/vip-crown.svg';
import checkoutWarningIcon from '../../assets/icons/checkout-warning.svg';
import './LateCheckout.css';

const { Search } = Input;
const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;

/* ─── Icons ─── */
const FilterIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.39999 5.16373C2.39999 4.30123 3.10124 3.59998 3.96374 3.59998H20.0362C20.8987 3.59998 21.6 4.30123 21.6 5.16373C21.6 5.52373 21.4762 5.87248 21.2475 6.14998L15 13.8187V19.1887C15 19.8562 14.4562 20.4 13.7887 20.4C13.515 20.4 13.2487 20.3062 13.035 20.1375L9.56624 17.385C9.20624 17.1 8.99999 16.6687 8.99999 16.2112V13.8187L2.75249 6.14998C2.52374 5.87248 2.39999 5.52373 2.39999 5.16373ZM4.46249 5.39998L10.5975 12.93C10.7287 13.0912 10.8 13.29 10.8 13.5V16.065L13.2 17.97V13.5C13.2 13.2937 13.2712 13.0912 13.4025 12.93L19.5375 5.39998H4.46249Z" fill="currentColor" />
  </svg>
);

const ColumnsIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const ClearAllIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.40001 3.6001H18.6C19.2628 3.6001 19.8 4.13735 19.8 4.8001V6.0001C19.8 6.6001 19.3875 7.1251 18.8438 7.3126L14.4 16.2001V19.8001C14.4 20.4629 13.8628 21.0001 13.2 21.0001H10.8C10.1372 21.0001 9.60001 20.4629 9.60001 19.8001V16.2001L5.15626 7.3126C4.61251 7.1251 4.20001 6.6001 4.20001 6.0001V4.8001C4.20001 4.13735 4.73726 3.6001 5.40001 3.6001Z" fill="currentColor"/>
  </svg>
);

/* ─── Types ─── */
type DurationType = 'Non-Hourly' | 'Hourly';
type GuestCategory = 'Regular' | 'VIP' | 'Corporate' | 'Government';

interface BusinessSource {
  name: string;
  subtitle: string;
  isVIP?: boolean;
  hasInfo?: boolean;
  infoText?: string;
}

interface LateCheckoutRow {
  key: string;
  reservationId: string;
  checkoutWarning?: string;
  guest: { name: string; email: string };
  pointOfContact: { name: string; email: string };
  roomSpaceName: string;
  roomSpaceType: string;
  checkIn: { date: string; time: string };
  checkOut: { date: string; time: string };
  durationType: DurationType;
  overstayDuration: string;
  totalCharges: number;
  balance: number;
  businessSource: BusinessSource;
  guestCategory: GuestCategory;
}

/* ─── Filter options ─── */
const roomSpaceTypeOptions = [
  'Standard (STD)', 'King Smoking (KS)', 'Suite (SUIT)',
  'Double Bed King Smoking (DBKS)', 'Double Bed Queen (DBQ)',
  'Banquet', 'Conference Hall',
];
const durationTypeOptions: DurationType[] = ['Non-Hourly', 'Hourly'];
const loyaltyStatusOptions = ['Genius'];
const guestCategoryOptions: GuestCategory[] = ['Regular', 'VIP', 'Corporate', 'Government'];
const businessSourceGroups = [
  { group: 'Direct Billing', items: ['Corporate Direct Billing'] },
  { group: 'Travel Agent', items: ['Amora Travels', 'Byway Travels'] },
  { group: 'Walk-In', items: ['Direct Walk-In'] },
  { group: 'Web Reservation', items: ['Booking.com', 'Expedia', 'ASI WebRes'] },
];

/* ─── Sample Data ─── */
const data: LateCheckoutRow[] = [
  {
    key: '1',
    reservationId: '23456723',
    checkoutWarning: 'Reservation consists of an Authorized Payment',
    guest: { name: 'Ashish Patel', email: 'ashish.patel@gmail.com' },
    pointOfContact: { name: 'Ashish Patel', email: 'ashish.patel@gmail.com' },
    roomSpaceName: '101',
    roomSpaceType: 'STD',
    checkIn: { date: 'Jan 21 (Wed)', time: '03:00 PM' },
    checkOut: { date: 'Jan 23 (Fri)', time: '11:00 AM' },
    durationType: 'Non-Hourly',
    overstayDuration: '8 hours',
    totalCharges: 105.0,
    balance: 105.0,
    businessSource: { name: 'ASI WebRes', subtitle: 'Web Reservation', hasInfo: true },
    guestCategory: 'Regular',
  },
  {
    key: '2',
    reservationId: '23456734',
    checkoutWarning: 'Reservation consists of an Deposit Payment',
    guest: { name: 'Charles Darwin', email: 'c.darwin@outlook.com' },
    pointOfContact: { name: 'Charles Darwin', email: 'c.darwin@outlook.com' },
    roomSpaceName: '102',
    roomSpaceType: 'DBKS',
    checkIn: { date: 'Jan 22 (Thu)', time: '03:00 PM' },
    checkOut: { date: 'Jan 23 (Fri)', time: '11:00 AM' },
    durationType: 'Non-Hourly',
    overstayDuration: '5 hours',
    totalCharges: 105.0,
    balance: 0,
    businessSource: { name: 'Booking.com', subtitle: 'Web Reservation', isVIP: true, hasInfo: true },
    guestCategory: 'VIP',
  },
  {
    key: '3',
    reservationId: '23456745',
    guest: { name: 'John Doe', email: 'john.doe@yahoo.com' },
    pointOfContact: { name: 'John Doe', email: 'john.doe@yahoo.com' },
    roomSpaceName: 'Main Banquet',
    roomSpaceType: 'Banquet',
    checkIn: { date: 'Jan 20 (Tue)', time: '03:00 PM' },
    checkOut: { date: 'Jan 23 (Fri)', time: '11:00 AM' },
    durationType: 'Non-Hourly',
    overstayDuration: '6 hours',
    totalCharges: 80.0,
    balance: -25.5,
    businessSource: { name: 'Expedia', subtitle: 'Web Reservation', hasInfo: true },
    guestCategory: 'Corporate',
  },
  {
    key: '4',
    reservationId: '23456712',
    checkoutWarning: 'Balance is not zero',
    guest: { name: 'Dave Cruz', email: 'dave.cruz@hotmail.com' },
    pointOfContact: { name: 'Dave Cruz', email: 'dave.cruz@hotmail.com' },
    roomSpaceName: '205',
    roomSpaceType: 'STD',
    checkIn: { date: 'Jan 21 (Wed)', time: '03:00 PM' },
    checkOut: { date: 'Jan 23 (Fri)', time: '11:00 AM' },
    durationType: 'Non-Hourly',
    overstayDuration: '3 hours',
    totalCharges: 72.0,
    balance: 72.0,
    businessSource: { name: 'Amora Travels', subtitle: 'Travel Agent' },
    guestCategory: 'Government',
  },
  {
    key: '5',
    reservationId: '23456542',
    guest: { name: 'Arvind Panchal', email: 'arvind.p@gmail.com' },
    pointOfContact: { name: 'Arvind Panchal', email: 'arvind.p@gmail.com' },
    roomSpaceName: '310',
    roomSpaceType: 'DBKS',
    checkIn: { date: 'Jan 23 (Fri)', time: '04:00 PM' },
    checkOut: { date: 'Jan 24 (Sat)', time: '11:00 AM' },
    durationType: 'Non-Hourly',
    overstayDuration: '2 hours',
    totalCharges: 52.0,
    balance: 52.0,
    businessSource: { name: 'ASI WebRes', subtitle: 'Web Reservation', hasInfo: true },
    guestCategory: 'Regular',
  },
  {
    key: '6',
    reservationId: '23456542',
    checkoutWarning: 'Balance is not zero; Reservation consists of an Deposit Payment',
    guest: { name: 'Shruti Pahuja', email: 'shruti.pahuja@corp.in' },
    pointOfContact: { name: 'Shruti Pahuja', email: 'shruti.pahuja@corp.in' },
    roomSpaceName: '318',
    roomSpaceType: 'DBKS',
    checkIn: { date: 'Jan 21 (Wed)', time: '03:00 PM' },
    checkOut: { date: 'Jan 24 (Sat)', time: '11:30 AM' },
    durationType: 'Non-Hourly',
    overstayDuration: '7.5 hours',
    totalCharges: 75.0,
    balance: -15.0,
    businessSource: { name: 'Booking.com', subtitle: 'Web Reservation', hasInfo: true },
    guestCategory: 'VIP',
  },
  {
    key: '7',
    reservationId: '23456542',
    guest: { name: 'Yutika Pahuja', email: 'yutika.p@gmail.com' },
    pointOfContact: { name: 'Yutika Pahuja', email: 'yutika.p@gmail.com' },
    roomSpaceName: '444',
    roomSpaceType: 'KNS',
    checkIn: { date: 'Apr 13 (Mon)', time: '11:00 AM' },
    checkOut: { date: 'Apr 13 (Mon)', time: '04:00 PM' },
    durationType: 'Hourly',
    overstayDuration: '2 hours',
    totalCharges: 42.0,
    balance: 0,
    businessSource: { name: 'Direct Walk-In', subtitle: 'Walk-In' },
    guestCategory: 'Regular',
  },
  {
    key: '8',
    reservationId: '23456723',
    checkoutWarning: 'Balance does not fall in the range set in the property settings',
    guest: { name: 'Reese W', email: 'reese.w@company.com' },
    pointOfContact: { name: 'Reese W', email: 'reese.w@company.com' },
    roomSpaceName: '454',
    roomSpaceType: 'KNS',
    checkIn: { date: 'Apr 13 (Mon)', time: '09:00 AM' },
    checkOut: { date: 'Apr 13 (Mon)', time: '05:00 PM' },
    durationType: 'Hourly',
    overstayDuration: '2 hours',
    totalCharges: 22.0,
    balance: 22.0,
    businessSource: { name: 'Direct Walk-In', subtitle: 'Walk-In' },
    guestCategory: 'Corporate',
  },
  {
    key: '9',
    reservationId: '23456984',
    checkoutWarning: 'Reservation consists of an Authorized Payment',
    guest: { name: 'Walden H', email: 'walden.h@proton.me' },
    pointOfContact: { name: 'Walden H', email: 'walden.h@proton.me' },
    roomSpaceName: '555',
    roomSpaceType: 'KNS',
    checkIn: { date: 'Apr 13 (Mon)', time: '10:30 AM' },
    checkOut: { date: 'Apr 13 (Mon)', time: '02:30 PM' },
    durationType: 'Hourly',
    overstayDuration: '30 minutes',
    totalCharges: 62.0,
    balance: 62.0,
    businessSource: { name: 'Direct Walk-In', subtitle: 'Walk-In' },
    guestCategory: 'Government',
  },
  {
    key: '10',
    reservationId: '23453467',
    guest: { name: 'Meera Kapoor', email: 'meera.kapoor@icloud.com' },
    pointOfContact: { name: 'Meera Kapoor', email: 'meera.kapoor@icloud.com' },
    roomSpaceName: '556',
    roomSpaceType: 'KNS',
    checkIn: { date: 'Apr 13 (Mon)', time: '12:00 PM' },
    checkOut: { date: 'Apr 13 (Mon)', time: '06:00 PM' },
    durationType: 'Hourly',
    overstayDuration: '20 minutes',
    totalCharges: 70.0,
    balance: -10.0,
    businessSource: { name: 'Direct Walk-In', subtitle: 'Walk-In' },
    guestCategory: 'VIP',
  },
];

/* ─── All column keys for column customization ─── */
const allColumnKeys = [
  { key: 'reservationId', label: 'Reservation ID', fixed: true },
  { key: 'guest', label: 'Guest' },
  { key: 'pointOfContact', label: 'Point of Contact' },
  { key: 'roomSpaceName', label: 'Room/Space Name' },
  { key: 'roomSpaceType', label: 'Room/Space Type' },
  { key: 'checkIn', label: 'Check-In' },
  { key: 'checkOut', label: 'Check-Out' },
  { key: 'durationType', label: 'Duration Type' },
  { key: 'overstayDuration', label: 'Overstay Duration' },
  { key: 'totalCharges', label: 'Total Charges ($)' },
  { key: 'balance', label: 'Balance ($)' },
  { key: 'businessSource', label: 'Business Source' },
  { key: 'guestCategory', label: 'Guest Category' },
];

/* ─── Helpers ─── */
const formatMoney = (v: number): string => {
  const abs = Math.abs(v).toFixed(2);
  return v < 0 ? `-${abs}` : abs;
};

const balanceClass = (v: number): string => {
  if (v === 0) return 'zero';
  return v > 0 ? 'positive' : 'negative';
};

/* ─── Component ─── */
const LateCheckout: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const alertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allColumnKeys.filter((c) => !c.fixed).map((c) => c.key)
  );
  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);

  // Filter drawer state
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterRoomType, setFilterRoomType] = useState<string[]>([]);
  const [filterDurationType, setFilterDurationType] = useState<string[]>([]);
  const [filterDateRange, setFilterDateRange] = useState<[any, any] | null>(null);
  const [filterBusinessSource, setFilterBusinessSource] = useState<string[]>([]);
  const [filterLoyaltyStatus, setFilterLoyaltyStatus] = useState<string[]>([]);
  const [filterGuestCategory, setFilterGuestCategory] = useState<string[]>([]);

  // Applied filters (only applied on "Show Results")
  const [appliedFilters, setAppliedFilters] = useState({
    roomType: [] as string[],
    durationType: [] as string[],
    dateRange: null as [any, any] | null,
    businessSource: [] as string[],
    loyaltyStatus: [] as string[],
    guestCategory: [] as string[],
  });

  const hasActiveFilters =
    appliedFilters.roomType.length > 0 ||
    appliedFilters.durationType.length > 0 ||
    appliedFilters.dateRange !== null ||
    appliedFilters.businessSource.length > 0 ||
    appliedFilters.loyaltyStatus.length > 0 ||
    appliedFilters.guestCategory.length > 0;

  // Search + filter logic
  const filtered = useMemo(() => {
    let result = data;

    // Text search
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      result = result.filter(
        (r) =>
          r.reservationId.toLowerCase().includes(q) ||
          r.guest.name.toLowerCase().includes(q) ||
          r.guest.email.toLowerCase().includes(q) ||
          r.pointOfContact.name.toLowerCase().includes(q) ||
          r.roomSpaceName.toLowerCase().includes(q)
      );
    }

    // Applied filters
    if (appliedFilters.roomType.length > 0) {
      result = result.filter((r) => appliedFilters.roomType.some((t) => t.includes(r.roomSpaceType)));
    }
    if (appliedFilters.durationType.length > 0) {
      result = result.filter((r) => appliedFilters.durationType.includes(r.durationType));
    }
    if (appliedFilters.businessSource.length > 0) {
      result = result.filter((r) => appliedFilters.businessSource.includes(r.businessSource.name));
    }
    if (appliedFilters.guestCategory.length > 0) {
      result = result.filter((r) => appliedFilters.guestCategory.includes(r.guestCategory));
    }

    return result;
  }, [searchValue, appliedFilters]);

  /* ─── Success alert helper ─── */
  const showSuccessAlert = () => {
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    setSuccessAlert('Reservation(s) have been successfully checked-out.');
    alertTimerRef.current = setTimeout(() => setSuccessAlert(null), 4000);
  };

  /* ─── Checkout flow ─── */
  const handleCheckoutClick = () => {
    Modal.confirm({
      title: 'Check-Out Guest(s)?',
      icon: <InfoCircleFilled style={{ color: '#3E4BE0' }} />,
      content: (
        <span>
          Proceeding will check out all the guests linked to this reservation. Please ensure all
          outstanding dues are settled and all required information has been recorded. This action
          will update the reservation status Checked-Out.
        </span>
      ),
      okText: 'Yes, Check-Out',
      cancelText: 'No, Cancel',
      okButtonProps: { type: 'primary' },
      className: 'late-checkout-confirm-modal',
      closable: true,
      onOk: () => {
        const selectedRows = data.filter((r) => selectedRowKeys.includes(r.key));
        const hasWarnings = selectedRows.some((r) => r.checkoutWarning);

        if (hasWarnings) {
          Modal.confirm({
            title: 'Unable to Perform Check-Out',
            icon: <InfoCircleFilled style={{ color: '#3E4BE0' }} />,
            content: (
              <span>
                Some selected reservations cannot be checked-out because they do not meet the
                property's check-out requirements. Please review and update them before proceeding.
              </span>
            ),
            okText: 'Close',
            okButtonProps: { type: 'primary' },
            cancelButtonProps: { style: { display: 'none' } },
            className: 'late-checkout-confirm-modal',
            closable: true,
          });
        } else {
          showSuccessAlert();
          setSelectedRowKeys([]);
        }
      },
    });
  };

  /* ─── Filter drawer handlers ─── */
  const handleFilterOpen = () => {
    setFilterRoomType([...appliedFilters.roomType]);
    setFilterDurationType([...appliedFilters.durationType]);
    setFilterDateRange(appliedFilters.dateRange);
    setFilterBusinessSource([...appliedFilters.businessSource]);
    setFilterLoyaltyStatus([...appliedFilters.loyaltyStatus]);
    setFilterGuestCategory([...appliedFilters.guestCategory]);
    setFilterDrawerOpen(true);
  };

  const handleFilterCancel = () => {
    setFilterDrawerOpen(false);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      roomType: filterRoomType,
      durationType: filterDurationType,
      dateRange: filterDateRange,
      businessSource: filterBusinessSource,
      loyaltyStatus: filterLoyaltyStatus,
      guestCategory: filterGuestCategory,
    });
    setFilterDrawerOpen(false);
  };

  const handleClearFilters = () => {
    setFilterRoomType([]);
    setFilterDurationType([]);
    setFilterDateRange(null);
    setFilterBusinessSource([]);
    setFilterLoyaltyStatus([]);
    setFilterGuestCategory([]);
  };

  const getPreviewCount = (): number => {
    let result = data;
    if (filterRoomType.length > 0) {
      result = result.filter((r) => filterRoomType.some((t) => t.includes(r.roomSpaceType)));
    }
    if (filterDurationType.length > 0) {
      result = result.filter((r) => filterDurationType.includes(r.durationType));
    }
    if (filterBusinessSource.length > 0) {
      result = result.filter((r) => filterBusinessSource.includes(r.businessSource.name));
    }
    if (filterGuestCategory.length > 0) {
      result = result.filter((r) => filterGuestCategory.includes(r.guestCategory));
    }
    return result.length;
  };

  /* ─── Column toggle ─── */
  const handleColumnToggle = (colKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(colKey) ? prev.filter((k) => k !== colKey) : [...prev, colKey]
    );
  };

  const columnDropdownContent = (
    <div className="late-checkout-column-dropdown">
      <div className="late-checkout-column-dropdown-header">
        <span>Customize Columns</span>
        <CloseOutlined
          className="late-checkout-column-dropdown-close"
          onClick={() => setColumnDropdownOpen(false)}
        />
      </div>
      <div className="late-checkout-column-dropdown-list">
        {allColumnKeys.map((col) => (
          <label key={col.key} className="late-checkout-column-dropdown-item">
            <Checkbox
              checked={col.fixed || visibleColumns.includes(col.key)}
              disabled={col.fixed}
              onChange={() => handleColumnToggle(col.key)}
            />
            <span>{col.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  /* ─── Column definitions ─── */
  const allColumns: ColumnsType<LateCheckoutRow> = [
    {
      title: 'Reservation ID',
      dataIndex: 'reservationId',
      key: 'reservationId',
      sorter: (a, b) => a.reservationId.localeCompare(b.reservationId),
      width: 170,
      fixed: 'left',
      render: (_, record) => (
        <div className="late-checkout-resid-cell">
          <span>{record.reservationId}</span>
          {record.checkoutWarning && (
            <Tooltip title={record.checkoutWarning} placement="top">
              <img
                src={checkoutWarningIcon}
                alt="Checkout warning"
                className="late-checkout-warning-icon"
              />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'Guest',
      key: 'guest',
      width: 200,
      render: (_, record) => (
        <div className="late-checkout-guest-cell">
          <span className="late-checkout-guest-name">{record.guest.name}</span>
          <span className="late-checkout-guest-email">{record.guest.email}</span>
        </div>
      ),
    },
    {
      title: 'Point of Contact',
      key: 'pointOfContact',
      sorter: (a, b) => a.pointOfContact.name.localeCompare(b.pointOfContact.name),
      width: 200,
      render: (_, record) => (
        <div className="late-checkout-guest-cell">
          <span className="late-checkout-guest-name">{record.pointOfContact.name}</span>
          <span className="late-checkout-guest-email">{record.pointOfContact.email}</span>
        </div>
      ),
    },
    {
      title: 'Room/Space Name',
      dataIndex: 'roomSpaceName',
      key: 'roomSpaceName',
      sorter: (a, b) => a.roomSpaceName.localeCompare(b.roomSpaceName),
      width: 160,
    },
    {
      title: 'Room/Space Type',
      dataIndex: 'roomSpaceType',
      key: 'roomSpaceType',
      width: 150,
    },
    {
      title: 'Check-In',
      key: 'checkIn',
      width: 160,
      render: (_, record) => (
        <div className="late-checkout-date-cell">
          <span className="late-checkout-date-main">{record.checkIn.date}</span>
          <span className="late-checkout-date-sub">{record.checkIn.time}</span>
        </div>
      ),
    },
    {
      title: 'Check-Out',
      key: 'checkOut',
      width: 170,
      render: (_, record) => (
        <div className="late-checkout-date-cell">
          <span className="late-checkout-date-main">{record.checkOut.date}</span>
          <span className="late-checkout-date-sub">{record.checkOut.time}</span>
        </div>
      ),
    },
    {
      title: 'Duration Type',
      key: 'durationType',
      width: 130,
      render: (_, record) => (
        <span
          className={`late-checkout-tag ${
            record.durationType === 'Hourly' ? 'tag-hourly' : 'tag-non-hourly'
          }`}
        >
          {record.durationType}
        </span>
      ),
    },
    {
      title: 'Overstay Duration',
      dataIndex: 'overstayDuration',
      key: 'overstayDuration',
      width: 170,
    },
    {
      title: 'Total Charges ($)',
      key: 'totalCharges',
      width: 140,
      align: 'right' as const,
      sorter: (a, b) => a.totalCharges - b.totalCharges,
      render: (_, record) => (
        <span className="late-checkout-charges">{record.totalCharges.toFixed(2)}</span>
      ),
    },
    {
      title: 'Balance ($)',
      key: 'balance',
      width: 120,
      align: 'right' as const,
      sorter: (a, b) => a.balance - b.balance,
      render: (_, record) => (
        <span className={`late-checkout-balance ${balanceClass(record.balance)}`}>
          {formatMoney(record.balance)}
        </span>
      ),
    },
    {
      title: 'Business Source',
      key: 'businessSource',
      width: 200,
      render: (_, record) => (
        <div className="late-checkout-bs-cell">
          <div className="late-checkout-bs-text">
            <span className="late-checkout-bs-name">
              {record.businessSource.name}
              {record.businessSource.isVIP && (
                <img src={vipCrownIcon} alt="VIP" className="late-checkout-crown-icon" />
              )}
            </span>
            <span className="late-checkout-bs-sub">{record.businessSource.subtitle}</span>
          </div>
          {record.businessSource.hasInfo && (
            <Tooltip title={record.businessSource.infoText || 'Additional booking details'}>
              <InfoCircleOutlined className="late-checkout-bs-info" />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'Guest Category',
      dataIndex: 'guestCategory',
      key: 'guestCategory',
      width: 150,
    },
  ];

  const columns = allColumns.filter(
    (col) => col.key === 'reservationId' || visibleColumns.includes(col.key as string)
  );

  return (
    <div className="late-checkout">
      {/* Success Alert */}
      {successAlert && (
        <div className="late-checkout-alert-wrapper">
          <Alert
            message={successAlert}
            type="success"
            showIcon
            closable
            onClose={() => setSuccessAlert(null)}
          />
        </div>
      )}

      {/* Title */}
      <div className="late-checkout-title-row">
        <h1 className="late-checkout-title">Late Check-Out</h1>
        <a
          href="https://www.figma.com/design/KKdLhfxOAkTN7E1jsbIwpL/%F0%9F%92%BB-9.1-Front-Desk?node-id=9053-69613&t=QxQXxXi94eij3qjK-4"
          target="_blank"
          rel="noopener noreferrer"
          className="late-checkout-dev-notes-link"
        >
          Time-machine notes for Hourly Reservations
        </a>
      </div>

      {/* Toolbar */}
      <div className="late-checkout-toolbar">
        <div className="late-checkout-search">
          <Search
            placeholder="Search for reservation ID, guest, point of contact, room/space name"
            onSearch={(v) => setSearchValue(v)}
            onChange={(e) => setSearchValue(e.target.value)}
            enterButton={<SearchOutlined />}
            size="large"
          />
        </div>

        <div className="late-checkout-actions">
          <Badge dot={hasActiveFilters} offset={[-4, 4]} color="#3E4BE0">
            <button
              className={`late-checkout-icon-btn ${hasActiveFilters ? 'filter-active' : ''}`}
              type="button"
              aria-label="Filter"
              onClick={handleFilterOpen}
            >
              <FilterIcon />
            </button>
          </Badge>
          <Dropdown
            open={columnDropdownOpen}
            onOpenChange={setColumnDropdownOpen}
            trigger={['click']}
            popupRender={() => columnDropdownContent}
            placement="bottomRight"
          >
            <button className="late-checkout-icon-btn" type="button" aria-label="Columns">
              <ColumnsIcon />
            </button>
          </Dropdown>
          <button
            className="late-checkout-checkout-btn"
            type="button"
            disabled={selectedRowKeys.length === 0}
            onClick={handleCheckoutClick}
          >
            Check-Out
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="late-checkout-table">
        <Table<LateCheckoutRow>
          columns={columns}
          dataSource={filtered}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} results`,
            pageSizeOptions: ['10', '20', '50'],
          }}
          size="middle"
          scroll={{ x: 2200 }}
        />
      </div>

      {/* ─── Filter Drawer ─── */}
      <Drawer
        title={null}
        placement="right"
        width={380}
        open={filterDrawerOpen}
        onClose={handleFilterCancel}
        closable={false}
        className="late-checkout-filter-drawer"
        footer={
          <div className="drawer-footer">
            <Button type="text" size="large" onClick={handleFilterCancel} className="drawer-cancel-btn">Cancel</Button>
            <Button type="primary" size="large" className="drawer-submit-btn" onClick={handleApplyFilters}>
              Show {getPreviewCount()} Results
            </Button>
          </div>
        }
      >
        <div className="drawer-custom-header">
          <div className="drawer-close-icon" onClick={handleFilterCancel}><CloseOutlined style={{ fontSize: 20 }} /></div>
          <h3 className="drawer-title">Filters</h3>
          <Button type="link" size="small" onClick={handleClearFilters} className="filter-clear-btn">
            <ClearAllIcon /> Clear All
          </Button>
        </div>

        <div className="drawer-form-content">
          <Form layout="vertical" className="late-checkout-filter-form">
            <Form.Item label="Room/Space Type" className="form-item-field">
              <Select
                mode="multiple"
                placeholder="Select room/space type"
                size="large"
                value={filterRoomType}
                onChange={(vals: string[]) => setFilterRoomType(vals)}
                allowClear
                maxTagCount="responsive"
                showSearch
              >
                {roomSpaceTypeOptions.map((opt) => (
                  <Option key={opt} value={opt}>{opt}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Duration Type" className="form-item-field">
              <Select
                mode="multiple"
                placeholder="Select duration type"
                size="large"
                value={filterDurationType}
                onChange={(vals: string[]) => setFilterDurationType(vals)}
                allowClear
                maxTagCount="responsive"
              >
                {durationTypeOptions.map((opt) => (
                  <Option key={opt} value={opt}>{opt}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Duration" className="form-item-field">
              <RangePicker
                size="large"
                style={{ width: '100%' }}
                value={filterDateRange}
                onChange={(dates) => setFilterDateRange(dates as [any, any] | null)}
              />
            </Form.Item>

            <Form.Item label="Business Source" className="form-item-field">
              <Select
                mode="multiple"
                placeholder="Select business source"
                size="large"
                value={filterBusinessSource}
                onChange={(vals: string[]) => setFilterBusinessSource(vals)}
                allowClear
                maxTagCount="responsive"
                showSearch
              >
                {businessSourceGroups.map((group) => (
                  <OptGroup key={group.group} label={group.group}>
                    {group.items.map((item) => (
                      <Option key={item} value={item}>{item}</Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Loyalty Status" className="form-item-field">
              <Select
                mode="multiple"
                placeholder="Select loyalty status"
                size="large"
                value={filterLoyaltyStatus}
                onChange={(vals: string[]) => setFilterLoyaltyStatus(vals)}
                allowClear
                maxTagCount="responsive"
              >
                {loyaltyStatusOptions.map((opt) => (
                  <Option key={opt} value={opt}>{opt}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Guest Category" className="form-item-field">
              <Select
                mode="multiple"
                placeholder="Select guest category"
                size="large"
                value={filterGuestCategory}
                onChange={(vals: string[]) => setFilterGuestCategory(vals)}
                allowClear
                maxTagCount="responsive"
              >
                {guestCategoryOptions.map((opt) => (
                  <Option key={opt} value={opt}>{opt}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default LateCheckout;
