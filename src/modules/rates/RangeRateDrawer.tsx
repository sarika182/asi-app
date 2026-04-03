import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Drawer, DatePicker, Select, Button, InputNumber, Modal, Alert } from 'antd';
import { CloseOutlined, InfoCircleFilled } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import './RangeRateDrawer.css';

/* Info circle icon — matches rap-info-alert icon used in RateAdjustmentPanel */
const IconInfo: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm1.75 9.75h-3.5a.75.75 0 0 1 0-1.5h.875v-3.5H10.25a.75.75 0 0 1 0-1.5h1.5c.414 0 .75.336.75.75v4.25h.875a.75.75 0 0 1 0 1.5z" fill="currentColor"/>
  </svg>
);

/* Flag pennant icon for base room type */
const IconFlagPennant: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.4 3.2999C5.4 2.80115 4.99875 2.3999 4.5 2.3999C4.00125 2.3999 3.6 2.80115 3.6 3.2999V3.5999V5.3999V13.7999V15.5999V20.6999C3.6 21.1987 4.00125 21.5999 4.5 21.5999C4.99875 21.5999 5.4 21.1987 5.4 20.6999V15.5587L19.8337 10.4024C20.1712 10.2824 20.4 9.9599 20.4 9.5999C20.4 9.2399 20.175 8.9174 19.8337 8.7974L5.4 3.64115V3.2999ZM5.4 5.55365L16.7287 9.5999L5.4 13.6462V5.55365Z" fill="currentColor"/>
  </svg>
);

/* Copy icon for "Copy to All" hover action */
const IconCopy: React.FC = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/>
  </svg>
);

/* Undo icon for "Undo" hover action */
const IconUndo: React.FC = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" fill="currentColor"/>
  </svg>
);

/* Today's date for the system */
const TODAY = dayjs('2026-03-30');

const { Option, OptGroup } = Select;

/* ─── Types ─── */

export interface RangeRateFormData {
  startDate: string;
  endDate: string;
  daysOfWeek: string[];
  rateType: string;
  roomTypes: string[];
  rates: Record<string, Record<string, { value: number; extension: string }>>;
}

export interface RangeRateDrawerProps {
  open: boolean;
  onClose: () => void;
  onApply: (data: RangeRateFormData) => void;
  currentRatePlan?: string;
}

/* ─── Static Data (mirrored from RateAdjustmentPanel) ─── */

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

const roomTypeOptions = [
  { value: 'std', code: 'STD', label: 'Standard', boundTo: undefined as string | undefined, derived: undefined as string | undefined },
  { value: 'dks', code: 'DKS', label: 'Double Bed King Smoking', boundTo: 'STD', derived: '+10%' },
  { value: 'dns', code: 'DNS', label: 'Double Beds Non-Smoking', boundTo: 'STD', derived: '+10%' },
  { value: 'kns', code: 'KNS', label: 'King Non-Smoking', boundTo: undefined as string | undefined, derived: undefined as string | undefined },
];

const allRoomTypeValues = roomTypeOptions.map((o) => o.value);

const occupancyColumns = ['Base', 'Extra Adult', 'Extra Child', 'Pet Fee'];

const extensionOptions = [
  { value: '=$', label: '=$' },
  { value: '+$', label: '+$' },
  { value: '-$', label: '-$' },
  { value: '+%', label: '+%' },
  { value: '-%', label: '-%' },
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayLabels: Record<string, string> = {
  Mon: 'Mon',
  Tue: 'Tue',
  Wed: 'Wed',
  Thu: 'Thu',
  Fri: 'Fri',
  Sat: 'Sat',
  Sun: 'Sun',
};

/* Hourly Rate binding config — bound to Best Hourly */
const hourlyRateBindings: Record<string, { type: 'fixed' | 'percent'; value: number; label: string }> = {
  Base: { type: 'fixed', value: 10, label: '+$10' },
  'Extra Adult': { type: 'percent', value: 30, label: '+30%' },
  'Extra Child': { type: 'fixed', value: 10, label: '+$10' },
  'Pet Fee': { type: 'fixed', value: 11, label: '+$11' },
};

/* ─── Helper: get days present in date range ─── */
function getDaysInRange(start: Dayjs, end: Dayjs): string[] {
  const daysSet = new Set<string>();
  let current = start.startOf('day');
  const endDay = end.startOf('day');

  while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
    daysSet.add(dayNames[current.day()]);
    if (daysSet.size === 7) break; // All days covered
    current = current.add(1, 'day');
  }

  // Return in Mon-Sun order
  const ordered = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return ordered.filter((d) => daysSet.has(d));
}

/* ─── Component ─── */

const RangeRateDrawer: React.FC<RangeRateDrawerProps> = ({ open, onClose, onApply }) => {
  // Form state
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [rateType, setRateType] = useState<string | undefined>(undefined);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Rates state: Record<roomTypeValue, Record<occupancyColumn, { value, extension }>>
  const [rates, setRates] = useState<Record<string, Record<string, { value: number; extension: string }>>>({});
  // Per-cell: tracks which cells received values via Copy to All (for Undo)
  const [copiedCells, setCopiedCells] = useState<Record<string, boolean>>({});
  // Per-cell history before Copy to All (for per-cell Undo)
  const [cellHistory, setCellHistory] = useState<Record<string, { value: number; extension: string }>>({});
  // Tracks which occupancy columns have any updates (for column Reset icon)
  const [updatedColumns, setUpdatedColumns] = useState<Record<string, boolean>>({});

  // Dirty tracking — true if user has changed any field
  const [isDirty, setIsDirty] = useState(false);

  // Apply confirmation modal state (for Best Hourly + DKS/DNS warnings)
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [pendingApplyData, setPendingApplyData] = useState<RangeRateFormData | null>(null);

  // Tracks which table cell (roomType-occ) is currently hovered for hover actions
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  // Tracks which cells were the SOURCE of a "Copy to All" — shows "Undo" on source until value changes
  const [sourceCopiedCells, setSourceCopiedCells] = useState<Record<string, boolean>>({});

  // Reset form when drawer opens
  useEffect(() => {
    if (open) {
      setStartDate(null);
      setEndDate(null);
      setDaysOfWeek([]);
      setRateType(undefined);
      setSelectedRoomTypes([]);
      setRates({});
      setCopiedCells({});
      setCellHistory({});
      setUpdatedColumns({});
      setFormSubmitted(false);
      setIsDirty(false);
      setShowApplyModal(false);
      setPendingApplyData(null);
      setHoveredCell(null);
      setSourceCopiedCells({});
    }
  }, [open]);

  // Available days based on date range
  const availableDays = useMemo(() => {
    if (!startDate || !endDate) return [];
    return getDaysInRange(startDate, endDate);
  }, [startDate, endDate]);

  // When date range changes, filter out days no longer available
  useEffect(() => {
    if (availableDays.length > 0) {
      setDaysOfWeek((prev) => prev.filter((d) => availableDays.includes(d)));
    } else {
      setDaysOfWeek([]);
    }
  }, [availableDays]);

  // Initialize rates for newly selected room types
  useEffect(() => {
    setRates((prev) => {
      const next = { ...prev };
      for (const rt of selectedRoomTypes) {
        if (!next[rt]) {
          next[rt] = {};
          for (const occ of occupancyColumns) {
            next[rt][occ] = { value: 0, extension: '=$' };
          }
        }
      }
      // Remove room types no longer selected
      for (const key of Object.keys(next)) {
        if (!selectedRoomTypes.includes(key)) {
          delete next[key];
        }
      }
      return next;
    });
  }, [selectedRoomTypes]);

  const isHourlyRate = rateType === 'hourly-rate';
  const isIndependentHourly = rateType === 'independent-hourly';

  // Room type handling with Select All
  const handleRoomTypeChange = useCallback((values: string[]) => {
    setIsDirty(true);
    if (values.includes('select-all')) {
      if (selectedRoomTypes.length === allRoomTypeValues.length) {
        setSelectedRoomTypes([]);
      } else {
        setSelectedRoomTypes([...allRoomTypeValues]);
      }
    } else {
      setSelectedRoomTypes(values.filter((v) => v !== 'select-all'));
    }
  }, [selectedRoomTypes]);

  // Rate value change
  const handleRateValueChange = useCallback((roomType: string, occ: string, value: number | null) => {
    setIsDirty(true);
    setUpdatedColumns((prev) => ({ ...prev, [occ]: true }));
    // Any edit to a source cell reverts it back to "Copy to All" state
    setSourceCopiedCells((prev) => { const next = { ...prev }; delete next[`${roomType}-${occ}`]; return next; });
    setRates((prev) => ({
      ...prev,
      [roomType]: {
        ...prev[roomType],
        [occ]: { ...prev[roomType]?.[occ], value: value ?? 0 },
      },
    }));
  }, []);

  // Extension change
  const handleExtensionChange = useCallback((roomType: string, occ: string, ext: string) => {
    setIsDirty(true);
    setUpdatedColumns((prev) => ({ ...prev, [occ]: true }));
    // Any edit to a source cell reverts it back to "Copy to All" state
    setSourceCopiedCells((prev) => { const next = { ...prev }; delete next[`${roomType}-${occ}`]; return next; });
    setRates((prev) => ({
      ...prev,
      [roomType]: {
        ...prev[roomType],
        [occ]: { ...prev[roomType]?.[occ], extension: ext },
      },
    }));
  }, []);

  // Check if a cell is editable (defined early so action handlers can use it)
  const isCellEditable = useCallback((roomTypeValue: string, occ: string): boolean => {
    if (isHourlyRate) return false;
    const roomDef = roomTypeOptions.find((r) => r.value === roomTypeValue);
    if (!roomDef) return false;
    if (isIndependentHourly) return !roomDef.boundTo;
    if (roomDef.boundTo) return occ === 'Pet Fee';
    return true;
  }, [isHourlyRate, isIndependentHourly]);

  // ─── Table Action Handlers ───

  // Copy value from one cell to all other editable cells in same occupancy column
  const handleCellCopyToAll = useCallback((fromRoomType: string, occ: string) => {
    const sourceVal = rates[fromRoomType]?.[occ];
    if (!sourceVal) return;
    setIsDirty(true);
    setUpdatedColumns((prev) => ({ ...prev, [occ]: true }));
    const newCopiedCells: Record<string, boolean> = {};
    const newHistory: Record<string, { value: number; extension: string }> = {};
    setRates((prev) => {
      const next = { ...prev };
      for (const rt of selectedRoomTypes) {
        if (rt === fromRoomType) continue;
        if (!isCellEditable(rt, occ)) continue;
        const cellKey = `${rt}-${occ}`;
        newHistory[cellKey] = { ...(prev[rt]?.[occ] ?? { value: 0, extension: '=$' }) };
        newCopiedCells[cellKey] = true;
        next[rt] = { ...next[rt], [occ]: { ...sourceVal } };
      }
      return next;
    });
    setCopiedCells((prev) => ({ ...prev, ...newCopiedCells }));
    setCellHistory((prev) => ({ ...prev, ...newHistory }));
    // Mark the source cell — its button flips to "Undo" until the value changes
    setSourceCopiedCells((prev) => ({ ...prev, [`${fromRoomType}-${occ}`]: true }));
  }, [rates, selectedRoomTypes, isCellEditable]);

  // Undo the copy for a specific destination cell — restores its pre-copy value
  const handleCellUndo = useCallback((roomType: string, occ: string) => {
    const cellKey = `${roomType}-${occ}`;
    const history = cellHistory[cellKey];
    if (!history) return;
    setIsDirty(true);
    setRates((prev) => ({
      ...prev,
      [roomType]: { ...prev[roomType], [occ]: { ...history } },
    }));
    setCopiedCells((prev) => { const next = { ...prev }; delete next[cellKey]; return next; });
    setCellHistory((prev) => { const next = { ...prev }; delete next[cellKey]; return next; });
  }, [cellHistory]);

  // Undo triggered from the SOURCE cell — restores ALL destination cells in that column
  const handleSourceCellUndo = useCallback((fromRoomType: string, occ: string) => {
    setIsDirty(true);
    setRates((prev) => {
      const next = { ...prev };
      for (const rt of selectedRoomTypes) {
        if (rt === fromRoomType) continue;
        const cellKey = `${rt}-${occ}`;
        const history = cellHistory[cellKey];
        if (history) {
          next[rt] = { ...next[rt], [occ]: { ...history } };
        }
      }
      return next;
    });
    setCopiedCells((prev) => {
      const next = { ...prev };
      for (const rt of selectedRoomTypes) delete next[`${rt}-${occ}`];
      return next;
    });
    setCellHistory((prev) => {
      const next = { ...prev };
      for (const rt of selectedRoomTypes) delete next[`${rt}-${occ}`];
      return next;
    });
    setSourceCopiedCells((prev) => {
      const next = { ...prev };
      delete next[`${fromRoomType}-${occ}`];
      return next;
    });
  }, [selectedRoomTypes, cellHistory]);

  // Reset entire column — clears all editable values, copy markers, and history for that column
  const handleColumnReset = useCallback((occ: string) => {
    setIsDirty(true);
    setRates((prev) => {
      const next = { ...prev };
      for (const rt of selectedRoomTypes) {
        if (!isCellEditable(rt, occ)) continue;
        next[rt] = { ...next[rt], [occ]: { value: 0, extension: '=$' } };
      }
      return next;
    });
    setCopiedCells((prev) => {
      const next = { ...prev };
      for (const rt of selectedRoomTypes) delete next[`${rt}-${occ}`];
      return next;
    });
    setCellHistory((prev) => {
      const next = { ...prev };
      for (const rt of selectedRoomTypes) delete next[`${rt}-${occ}`];
      return next;
    });
    setSourceCopiedCells((prev) => {
      const next = { ...prev };
      for (const rt of selectedRoomTypes) delete next[`${rt}-${occ}`];
      return next;
    });
    setUpdatedColumns((prev) => { const next = { ...prev }; delete next[occ]; return next; });
  }, [selectedRoomTypes, isCellEditable]);

  // Validation
  const errors = useMemo(() => {
    if (!formSubmitted) return {};
    const e: Record<string, string> = {};
    if (!startDate) e.startDate = 'You must select a start date.';
    if (!endDate) e.endDate = 'You must select an end date.';
    if (daysOfWeek.length === 0) e.daysOfWeek = 'You must select at least one day of the week.';
    if (!rateType) e.rateType = 'You must select a rate type.';
    if (selectedRoomTypes.length === 0) e.roomTypes = 'You must select at least one room type.';
    return e;
  }, [formSubmitted, startDate, endDate, daysOfWeek, rateType, selectedRoomTypes]);

  const isFormValid = startDate && endDate && daysOfWeek.length > 0 && rateType && selectedRoomTypes.length > 0;

  // Cancel with confirmation if dirty
  const handleCancel = useCallback(() => {
    if (isDirty) {
      Modal.confirm({
        title: 'Cancel Range Rate Operations?',
        icon: <InfoCircleFilled style={{ color: '#3e4be0' }} />,
        content: 'Proceeding will erase newly entered data, and you will need to start over.',
        okText: 'Yes, Cancel',
        cancelText: 'No, Keep Editing',
        centered: true,
        okButtonProps: { style: { backgroundColor: '#3e4be0', borderColor: '#3e4be0' } },
        onOk: onClose,
      });
    } else {
      onClose();
    }
  }, [isDirty, onClose]);

  // Determine which apply-confirmation modal variant to show
  const getApplyModalVariant = (): 'dks' | 'dns' | 'both' | null => {
    if (rateType !== 'best-hourly') return null;
    const hasDks = selectedRoomTypes.includes('dks');
    const hasDns = selectedRoomTypes.includes('dns');
    if (hasDks && hasDns) return 'both';
    if (hasDks) return 'dks';
    if (hasDns) return 'dns';
    return null;
  };

  const handleApply = () => {
    setFormSubmitted(true);
    if (!isFormValid) return;

    const formData: RangeRateFormData = {
      startDate: startDate!.format('YYYY-MM-DD'),
      endDate: endDate!.format('YYYY-MM-DD'),
      daysOfWeek,
      rateType: rateType!,
      roomTypes: selectedRoomTypes,
      rates,
    };

    const variant = getApplyModalVariant();
    if (variant) {
      // Show warning confirmation before applying
      setPendingApplyData(formData);
      setShowApplyModal(true);
    } else {
      onApply(formData);
    }
  };

  const handleConfirmApply = () => {
    setShowApplyModal(false);
    if (pendingApplyData) {
      onApply(pendingApplyData);
      setPendingApplyData(null);
    }
  };

  // Get display label for non-editable bound cells
  const getBoundCellLabel = (roomTypeValue: string, occ: string): string => {
    if (isHourlyRate) {
      const binding = hourlyRateBindings[occ];
      return binding ? binding.label : '--';
    }

    const roomDef = roomTypeOptions.find((r) => r.value === roomTypeValue);
    if (roomDef?.derived && occ !== 'Pet Fee') {
      return roomDef.derived;
    }

    return '--';
  };

  // Selected room type data for table
  const selectedRoomData = useMemo(() => {
    return selectedRoomTypes
      .map((val) => roomTypeOptions.find((r) => r.value === val))
      .filter(Boolean) as typeof roomTypeOptions;
  }, [selectedRoomTypes]);

  return (
    <>
    <Drawer
      title={null}
      placement="right"
      width={1030}
      open={open}
      onClose={handleCancel}
      closable={false}
      className="range-rate-drawer"
      destroyOnClose
      footer={
        <div className="rrd-footer">
          <Button type="text" size="large" onClick={handleCancel} className="rrd-cancel-btn">
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            className="rrd-apply-btn"
            onClick={handleApply}
            disabled={formSubmitted ? !isFormValid : false}
          >
            Apply Range Rate Operations
          </Button>
        </div>
      }
    >
      {/* Header */}
      <div className="rrd-header">
        <div className="rrd-close-icon" onClick={handleCancel}>
          <CloseOutlined style={{ fontSize: 20 }} />
        </div>
        <h3 className="rrd-title">Range Rate Operations</h3>
      </div>

      {/* Form Content */}
      <div className="rrd-form-content">
        <div className="rrd-form">
          {/* Start Date & End Date */}
          <div className="rrd-date-row">
            <div className="ant-form-item" style={{ flex: 1 }}>
              <div className="ant-form-item-label">
                <label className="ant-form-item-required">Start Date <span className="rrd-label-required">*</span></label>
              </div>
              <div className={`ant-form-item-control ${formSubmitted && errors.startDate ? 'ant-form-item-has-error' : ''}`}>
                <DatePicker
                  size="large"
                  placeholder="Select start date"
                  value={startDate}
                  onChange={(date) => {
                    setIsDirty(true);
                    setStartDate(date);
                    // If end date is before or same as new start date, clear it
                    if (endDate && date && (endDate.isBefore(date, 'day') || endDate.isSame(date, 'day'))) {
                      setEndDate(null);
                    }
                  }}
                  disabledDate={(current) => current.isBefore(TODAY, 'day')}
                  style={{ width: '100%' }}
                  status={formSubmitted && errors.startDate ? 'error' : undefined}
                />
                {formSubmitted && errors.startDate && (
                  <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert">{errors.startDate}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="ant-form-item" style={{ flex: 1 }}>
              <div className="ant-form-item-label">
                <label className="ant-form-item-required">End Date <span className="rrd-label-required">*</span></label>
              </div>
              <div className={`ant-form-item-control ${formSubmitted && errors.endDate ? 'ant-form-item-has-error' : ''}`}>
                <DatePicker
                  size="large"
                  placeholder="Select end date"
                  value={endDate}
                  onChange={(date) => { setIsDirty(true); setEndDate(date); }}
                  disabledDate={(current) => {
                    if (!startDate) return current.isBefore(TODAY, 'day');
                    return current.isBefore(startDate, 'day') || current.isSame(startDate, 'day');
                  }}
                  style={{ width: '100%' }}
                  status={formSubmitted && errors.endDate ? 'error' : undefined}
                />
                {formSubmitted && errors.endDate && (
                  <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert">{errors.endDate}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Days of the Week */}
          <div className="ant-form-item">
            <div className="ant-form-item-label">
              <label className="ant-form-item-required">Days of the Week <span className="rrd-label-required">*</span></label>
            </div>
            <div className={`ant-form-item-control ${formSubmitted && errors.daysOfWeek ? 'ant-form-item-has-error' : ''}`}>
              <Select
                mode="multiple"
                size="large"
                placeholder="Select days of the week"
                value={daysOfWeek}
                onChange={(val: string[]) => { setIsDirty(true); setDaysOfWeek(val); }}
                style={{ width: '100%' }}
                disabled={!startDate || !endDate}
                status={formSubmitted && errors.daysOfWeek ? 'error' : undefined}
              >
                {availableDays.map((day) => (
                  <Option key={day} value={day}>{dayLabels[day]}</Option>
                ))}
              </Select>
              {formSubmitted && errors.daysOfWeek && (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                  <div role="alert">{errors.daysOfWeek}</div>
                </div>
              )}
            </div>
          </div>

          {/* Rate Type */}
          <div className="ant-form-item">
            <div className="ant-form-item-label">
              <label className="ant-form-item-required">Rate Type <span className="rrd-label-required">*</span></label>
            </div>
            <div className={`ant-form-item-control ${formSubmitted && errors.rateType ? 'ant-form-item-has-error' : ''}`}>
              <Select
                size="large"
                placeholder="Select rate type"
                value={rateType}
                onChange={(val: string) => { setIsDirty(true); setRateType(val); }}
                style={{ width: '100%' }}
                status={formSubmitted && errors.rateType ? 'error' : undefined}
              >
                {ratePlanGroups.map((group) => (
                  <OptGroup key={group.label} label={group.label}>
                    {group.options.map((opt) => (
                      <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
              {formSubmitted && errors.rateType && (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                  <div role="alert">{errors.rateType}</div>
                </div>
              )}
            </div>
          </div>

          {/* Room Types */}
          <div className="ant-form-item">
            <div className="ant-form-item-label">
              <label className="ant-form-item-required">Room Types <span className="rrd-label-required">*</span></label>
            </div>
            <div className={`ant-form-item-control ${formSubmitted && errors.roomTypes ? 'ant-form-item-has-error' : ''}`}>
              <Select
                mode="multiple"
                size="large"
                placeholder="Select room types"
                value={selectedRoomTypes}
                onChange={handleRoomTypeChange}
                style={{ width: '100%' }}
                maxTagCount={3}
                maxTagTextLength={20}
                status={formSubmitted && errors.roomTypes ? 'error' : undefined}
                optionLabelProp="label"
              >
                <Option key="select-all" value="select-all" label="Select All">
                  <span style={{ fontWeight: 600 }}>
                    {selectedRoomTypes.length === allRoomTypeValues.length ? 'Deselect All' : 'Select All'}
                  </span>
                </Option>
                {roomTypeOptions.map((opt) => (
                  <Option key={opt.value} value={opt.value} label={`(${opt.code}) ${opt.label}`}>
                    <div className="rrd-room-option">
                      <span className="rrd-room-option-label">({opt.code}) {opt.label}</span>
                      {opt.boundTo && (
                        <span className="rrd-room-option-subtitle">Bound to {opt.boundTo}</span>
                      )}
                    </div>
                  </Option>
                ))}
              </Select>
              {formSubmitted && errors.roomTypes && (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                  <div role="alert">{errors.roomTypes}</div>
                </div>
              )}
            </div>
          </div>

          {/* Selected Room Types Table */}
          {selectedRoomData.length > 0 && (
            <div className="rrd-selected-section">
              <h4 className="rrd-selected-heading">Selected Room Types</h4>

              {isHourlyRate && (
                <Alert
                  type="info"
                  showIcon
                  icon={<IconInfo style={{ fontSize: 18, color: '#3e4be0' }} />}
                  className="rrd-binding-alert"
                  style={{ marginBottom: 16 }}
                  message={
                    <span>
                      {'Selected Rate Type is bound with '}
                      <strong>Best Hourly</strong>
                      {' (Base : +$10, Adult : +30%, Child : +$10, Pet : +$11)'}
                    </span>
                  }
                />
              )}

              <table className="rrd-rate-table">
                <thead>
                  <tr>
                    <th>Room Type</th>
                    {occupancyColumns.map((col) => (
                      <th key={col} className="rrd-th-col">
                        <span className="rrd-th-col-label">{col}</span>
                        {updatedColumns[col] && (
                          <button
                            className="rrd-col-reset-btn"
                            title={`Reset all ${col} values`}
                            onClick={() => handleColumnReset(col)}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.925 9.41635C6.93 7.05385 9.27375 5.4001 12 5.4001C13.4888 5.4001 14.9175 5.9926 15.9713 7.04635L17.9288 9.0001H15.9C15.4013 9.0001 15 9.40135 15 9.9001C15 10.3988 15.4013 10.8001 15.9 10.8001H20.1C20.5988 10.8001 21 10.3988 21 9.9001V5.7001C21 5.20135 20.5988 4.8001 20.1 4.8001C19.6013 4.8001 19.2 5.20135 19.2 5.7001V7.72885L17.2463 5.77135C15.855 4.3801 13.9688 3.6001 12 3.6001C8.5275 3.6001 5.54625 5.7076 4.2675 8.71135C4.0725 9.16885 4.28625 9.6976 4.74375 9.8926C5.20125 10.0876 5.73 9.87385 5.925 9.41635ZM19.725 15.3038C19.92 14.8463 19.71 14.3176 19.2525 14.1226C18.795 13.9276 18.2663 14.1376 18.0712 14.5951C17.0625 16.9538 14.7225 18.6001 12 18.6001C10.5113 18.6001 9.0825 18.0076 8.02875 16.9538L6.07125 15.0001H8.1C8.59875 15.0001 9 14.5988 9 14.1001C9 13.6013 8.59875 13.2001 8.1 13.2001H3.9C3.40125 13.2001 3 13.6013 3 14.1001V18.3001C3 18.7988 3.40125 19.2001 3.9 19.2001C4.39875 19.2001 4.8 18.7988 4.8 18.3001V16.2713L6.75375 18.2251C8.145 19.6201 10.0313 20.4001 12 20.4001C15.4688 20.4001 18.4425 18.3001 19.725 15.3038Z" fill="currentColor"/>
                            </svg>
                          </button>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedRoomData.map((room) => (
                    <tr key={room.value}>
                      <td>
                        <div className="rrd-room-cell">
                          <span className="rrd-room-cell-name">
                            {room.value === 'std' && <IconFlagPennant className="rrd-base-flag" />}
                            ({room.code}) {room.label}
                          </span>
                          {room.boundTo && (
                            <span className="rrd-room-cell-bound">Bound to {room.boundTo}</span>
                          )}
                        </div>
                      </td>
                      {occupancyColumns.map((occ) => {
                        const editable = isCellEditable(room.value, occ);
                        const cellKey = `${room.value}-${occ}`;
                        const isHovered = hoveredCell === cellKey;
                        const isCopied = copiedCells[cellKey];
                        const isSource = sourceCopiedCells[cellKey];
                        const hasValue = (rates[room.value]?.[occ]?.value ?? 0) !== 0;
                        return (
                          <td
                            key={occ}
                            onMouseEnter={() => editable ? setHoveredCell(cellKey) : undefined}
                            onMouseLeave={() => setHoveredCell(null)}
                          >
                            {editable ? (
                              <div className="rrd-rate-cell rrd-rate-cell--hoverable">
                                <div className="rrd-rate-input-group">
                                  <InputNumber
                                    size="small"
                                    min={0}
                                    precision={2}
                                    controls={false}
                                    value={rates[room.value]?.[occ]?.value ?? 0}
                                    onChange={(val) => handleRateValueChange(room.value, occ, val)}
                                    className="rrd-rate-input"
                                  />
                                  <div className="rrd-rate-divider" />
                                  <Select
                                    size="small"
                                    value={rates[room.value]?.[occ]?.extension ?? '=$'}
                                    onChange={(ext) => handleExtensionChange(room.value, occ, ext)}
                                    popupMatchSelectWidth={false}
                                    className="rrd-rate-ext-select"
                                    variant="borderless"
                                  >
                                    {extensionOptions.map((eo) => (
                                      <Option key={eo.value} value={eo.value}>{eo.label}</Option>
                                    ))}
                                  </Select>
                                </div>
                                {/* Hover actions: driven by React state on <td> — no CSS :hover gap issue */}
                                {isHovered && (
                                  (isCopied || isSource) ? (
                                    <div className="rrd-cell-hover-action">
                                      <Button
                                        size="small"
                                        icon={<IconUndo />}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          isSource
                                            ? handleSourceCellUndo(room.value, occ)
                                            : handleCellUndo(room.value, occ);
                                        }}
                                      >
                                        Undo
                                      </Button>
                                    </div>
                                  ) : hasValue ? (
                                    <div className="rrd-cell-hover-action">
                                      <Button
                                        size="small"
                                        icon={<IconCopy />}
                                        onClick={(e) => { e.stopPropagation(); handleCellCopyToAll(room.value, occ); }}
                                      >
                                        Copy to All
                                      </Button>
                                    </div>
                                  ) : null
                                )}
                              </div>
                            ) : (
                              <div className="rrd-rate-cell">
                                <div className="rrd-rate-input-group rrd-rate-input-group--bound">
                                  <span className="rrd-cell-bound-value">{getBoundCellLabel(room.value, occ)}</span>
                                  <div className="rrd-rate-divider" />
                                  <span className="rrd-cell-bound-ext">=$</span>
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Drawer>

    {/* Apply Confirmation Modal (Best Hourly + DKS/DNS warning) */}
    <Modal
      open={showApplyModal}
      onCancel={() => setShowApplyModal(false)}
      closable={true}
      centered
      width={480}
      className="rrd-cancel-modal rrd-apply-confirm-modal"
      footer={
        <div className="rrd-modal-footer">
          <Button size="large" onClick={() => setShowApplyModal(false)}>
            No, Cancel
          </Button>
          <Button type="primary" size="large" className="rrd-apply-btn" onClick={handleConfirmApply}>
            Yes, Update
          </Button>
        </div>
      }
    >
      <div className="rrd-modal-content">
        <InfoCircleFilled style={{ color: '#3e4be0', fontSize: 22, flexShrink: 0, marginTop: 2 }} />
        <div style={{ flex: 1 }}>
          <div className="rrd-modal-title">Apply Range Rate Operations?</div>
          <div className="rrd-modal-desc">
            {getApplyModalVariant() === 'dks' && (
              <span>
                Proceeding will update the rates for the selected room types those bound to base. If the base value of the new{' '}
                <strong>rate exceeds the maximum limit, it will be capped.</strong>{' '}
                Any negative adult, child, or pet rates will be reset to 0. You can modify these limits in Property Configuration.
              </span>
            )}
            {getApplyModalVariant() === 'dns' && (
              <span>
                Proceeding will update the rates for the selected room types those bound to base. If the base value of the new{' '}
                <strong>rate fall below the minimum limit, it will be set to the minimum.</strong>{' '}
                Any negative adult, child, or pet rates will be reset to 0. You can modify these limits in Property Configuration.
              </span>
            )}
            {getApplyModalVariant() === 'both' && (
              <span>
                Proceeding will update the rates for the selected room types those bound to base. If the base value of the new rate{' '}
                <strong>falls below the minimum</strong>{' '}or{' '}
                <strong>exceeds the maximum limit, it will be adjusted to the nearest permissible value.</strong>{' '}
                Any negative adult, child, or pet rates will be reset to 0. You can modify these limits in Property Configuration.
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
    </>
  );
};

export default RangeRateDrawer;
