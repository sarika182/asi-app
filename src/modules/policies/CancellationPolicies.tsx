import React, { useState, useRef } from 'react';
import {
  Table,
  Input,
  Dropdown,
  Drawer,
  Form,
  Select,
  Radio,
  Checkbox,
  InputNumber,
  Button,
  Alert,
  Modal,
  Tooltip,
  Badge,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  InfoCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './CancellationPolicies.css';

const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;

/* ─── Custom SVG Icons ─── */
const FilterIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M2.39999 5.16373C2.39999 4.30123 3.10124 3.59998 3.96374 3.59998H20.0362C20.8987 3.59998 21.6 4.30123 21.6 5.16373C21.6 5.52373 21.4762 5.87248 21.2475 6.14998L15 13.8187V19.1887C15 19.8562 14.4562 20.4 13.7887 20.4C13.515 20.4 13.2487 20.3062 13.035 20.1375L9.56624 17.385C9.20624 17.1 8.99999 16.6687 8.99999 16.2112V13.8187L2.75249 6.14998C2.52374 5.87248 2.39999 5.52373 2.39999 5.16373ZM4.46249 5.39998L10.5975 12.93C10.7287 13.0912 10.8 13.29 10.8 13.5V16.065L13.2 17.97V13.5C13.2 13.2937 13.2712 13.0912 13.4025 12.93L19.5375 5.39998H4.46249Z" fill="currentColor" />
  </svg>
);

const QuestionIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M8.40001 8.4001C8.40001 6.7426 9.74251 5.4001 11.4 5.4001H12.6C14.2575 5.4001 15.6 6.7426 15.6 8.4001V8.5726C15.6 9.47635 15.15 10.3201 14.3963 10.8188L12.435 12.1276C11.6025 12.6826 11.1 13.6201 11.1 14.6251V14.7001C11.1 15.1988 11.5013 15.6001 12 15.6001C12.4988 15.6001 12.9 15.1988 12.9 14.7001V14.6251C12.9 14.2238 13.0988 13.8488 13.4325 13.6276L15.3938 12.3188C16.6463 11.4826 17.3963 10.0801 17.3963 8.57635V8.4001C17.3963 5.74885 15.2475 3.6001 12.5963 3.6001H11.4C8.74876 3.6001 6.60001 5.74885 6.60001 8.4001C6.60001 8.89885 7.00126 9.3001 7.50001 9.3001C7.99876 9.3001 8.40001 8.89885 8.40001 8.4001ZM12 20.4001C12.3183 20.4001 12.6235 20.2737 12.8485 20.0486C13.0736 19.8236 13.2 19.5184 13.2 19.2001C13.2 18.8818 13.0736 18.5766 12.8485 18.3516C12.6235 18.1265 12.3183 18.0001 12 18.0001C11.6817 18.0001 11.3765 18.1265 11.1515 18.3516C10.9264 18.5766 10.8 18.8818 10.8 19.2001C10.8 19.5184 10.9264 19.8236 11.1515 20.0486C11.3765 20.2737 11.6817 20.4001 12 20.4001Z" fill="currentColor" />
  </svg>
);

/* ─── Types ─── */
interface CancellationPolicy {
  key: string;
  name: string;
  type: string;
  typeValue: string;
  cancFeePreCutOff: string;
  cancFeePostCutOff: string;
  rateTypesLinked: string;
  description: string;
  isDefault: boolean;
  isHourly: boolean;
  cancellationFeeValue?: string;
  cutOffWindowValue?: number;
  feeBeforeCutOffValue?: string;
  feeAfterCutOffValue?: string;
}

/* ─── Data ─── */
const initialPolicies: CancellationPolicy[] = [
  {
    key: '1',
    name: 'Flexible',
    type: '24-Hour Cancellation',
    typeValue: '24-hour',
    cancFeePreCutOff: 'No Fee',
    cancFeePostCutOff: '100% of the booking amount',
    rateTypesLinked: '--',
    description: 'Allows free cancellation up to 24 hours before check-in.',
    isDefault: true,
    isHourly: false,
    cancellationFeeValue: '100-percent',
  },
  {
    key: '2',
    name: 'Hourly Cancellation',
    type: 'Non-Refundable',
    typeValue: 'non-refundable',
    cancFeePreCutOff: '100% of the booking amount',
    cancFeePostCutOff: '100% of the booking amount',
    rateTypesLinked: '--',
    description: 'This is a non-refundable policy for hourly bookings.',
    isDefault: true,
    isHourly: true,
    cancellationFeeValue: '100-percent',
  },
  {
    key: '3',
    name: 'Moderate',
    type: '48-Hour Cancellation',
    typeValue: '48-hour',
    cancFeePreCutOff: 'No Fee',
    cancFeePostCutOff: '1 night + tax',
    rateTypesLinked: '--',
    description: 'Allows free cancellation up to 48 hours before check-in.',
    isDefault: true,
    isHourly: false,
    cancellationFeeValue: '1-night-tax',
  },
  {
    key: '4',
    name: 'Non-Refundable',
    type: '72-Hour Cancellation',
    typeValue: '72-hour',
    cancFeePreCutOff: 'No Fee',
    cancFeePostCutOff: '50% of the booking amount',
    rateTypesLinked: '--',
    description: 'Allows free cancellation up to 72 hours before check-in.',
    isDefault: true,
    isHourly: false,
    cancellationFeeValue: '50-percent',
  },
  {
    key: '5',
    name: 'Strict',
    type: 'Non-Refundable',
    typeValue: 'non-refundable',
    cancFeePreCutOff: '100% of the booking amount',
    cancFeePostCutOff: '100% of the booking amount',
    rateTypesLinked: '--',
    description: 'No refund on cancellation. Full amount charged.',
    isDefault: true,
    isHourly: false,
    cancellationFeeValue: '100-percent',
  },
];

/* ─── Options ─── */
const allPolicyTypeOptions = [
  { value: '24-hour', label: '24-Hour Cancellation' },
  { value: '48-hour', label: '48-Hour Cancellation' },
  { value: '72-hour', label: '72-Hour Cancellation' },
  { value: 'non-refundable', label: 'Non-Refundable' },
  { value: 'custom', label: 'Custom' },
];

const hourlyPolicyTypeOptions = [
  { value: 'non-refundable', label: 'Non-Refundable' },
  { value: 'custom', label: 'Custom' },
];

const baseFeeOptions = [
  { value: 'no-fee', label: 'No Fee' },
  { value: 'flat-fee', label: 'Flat Fee' },
];

const nightFeeOptions = [
  { value: '1-night-tax', label: '1 night + tax' },
  { value: '2-nights-tax', label: '2 nights + tax' },
];

const percentageFeeOptions = [
  { value: '10-percent', label: '10% of the booking amount' },
  { value: '20-percent', label: '20% of the booking amount' },
  { value: '30-percent', label: '30% of the booking amount' },
  { value: '40-percent', label: '40% of the booking amount' },
  { value: '50-percent', label: '50% of the booking amount' },
  { value: '60-percent', label: '60% of the booking amount' },
  { value: '70-percent', label: '70% of the booking amount' },
  { value: '80-percent', label: '80% of the booking amount' },
  { value: '90-percent', label: '90% of the booking amount' },
  { value: '100-percent', label: '100% of the booking amount' },
];

const standardCancellationFeeOptions = [...baseFeeOptions, ...percentageFeeOptions];
const extendedCancellationFeeOptions = [...baseFeeOptions, ...nightFeeOptions, ...percentageFeeOptions];

/* Filter options */
const filterCancellationTypeOptions = [
  '24-Hour Cancellation',
  '48-Hour Cancellation',
  '72-Hour Cancellation',
  'Non-Refundable',
  'Custom Policy',
];

const filterRateTypeOptions = [
  'Standard Flex Rate',
  'Non-Refundable Saver',
  'Last-Minute Deal',
  'Early Bird Special',
];

/* ─── Helpers ─── */
const getFeeLabel = (value: string | undefined): string => {
  if (!value) return '--';
  const all = [...baseFeeOptions, ...nightFeeOptions, ...percentageFeeOptions];
  return all.find((o) => o.value === value)?.label ?? '--';
};

const getTypeLabel = (value: string | undefined): string => {
  if (!value) return '--';
  return allPolicyTypeOptions.find((o) => o.value === value)?.label ?? value;
};

/* ─── Component ─── */
const CancellationPolicies: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [policies, setPolicies] = useState<CancellationPolicy[]>(initialPolicies);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const alertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Drawer mode
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [editingPolicy, setEditingPolicy] = useState<CancellationPolicy | null>(null);

  // Form state
  const [isHourlyOnly, setIsHourlyOnly] = useState(false);
  const [policyType, setPolicyType] = useState<string | undefined>(undefined);
  const [policyName, setPolicyName] = useState('');
  const [description, setDescription] = useState('');
  const [cancellationFee, setCancellationFee] = useState<string | undefined>(undefined);
  const [cutOffWindow, setCutOffWindow] = useState<number | null>(null);
  const [cutOffUnit, setCutOffUnit] = useState<'hours' | 'mins' | 'days' | 'weeks'>('hours');
  const [feeBeforeCutOff, setFeeBeforeCutOff] = useState<string | undefined>(undefined);
  const [feeAfterCutOff, setFeeAfterCutOff] = useState<string | undefined>(undefined);

  // Form dirty-check snapshot
  const initialFormState = useRef<string>('');
  const isHourlyOnlyRef = useRef(isHourlyOnly);
  isHourlyOnlyRef.current = isHourlyOnly;
  const policyTypeRef = useRef(policyType);
  policyTypeRef.current = policyType;
  const policyNameRef = useRef(policyName);
  policyNameRef.current = policyName;
  const descriptionRef = useRef(description);
  descriptionRef.current = description;
  const cancellationFeeRef = useRef(cancellationFee);
  cancellationFeeRef.current = cancellationFee;
  const cutOffWindowRef = useRef(cutOffWindow);
  cutOffWindowRef.current = cutOffWindow;
  const feeBeforeCutOffRef = useRef(feeBeforeCutOff);
  feeBeforeCutOffRef.current = feeBeforeCutOff;
  const feeAfterCutOffRef = useRef(feeAfterCutOff);
  feeAfterCutOffRef.current = feeAfterCutOff;

  // Filter state
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterReservationType, setFilterReservationType] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterRateType, setFilterRateType] = useState<string[]>([]);
  const [appliedFilterReservationType, setAppliedFilterReservationType] = useState<string[]>([]);
  const [appliedFilterType, setAppliedFilterType] = useState<string[]>([]);
  const [appliedFilterRateType, setAppliedFilterRateType] = useState<string[]>([]);
  const hasActiveFilters = appliedFilterReservationType.length > 0 || appliedFilterType.length > 0 || appliedFilterRateType.length > 0;

  // Filter snapshot for dirty check
  const filterSnapshotRef = useRef<string>('');

  const hasFilterChanges = (): boolean => {
    return JSON.stringify({ filterReservationType, filterType, filterRateType }) !== filterSnapshotRef.current;
  };

  const getCurrentFormSnapshot = (): string => {
    return JSON.stringify({
      isHourlyOnly, policyType, policyName, description,
      cancellationFee, cutOffWindow, cutOffUnit, feeBeforeCutOff, feeAfterCutOff,
    });
  };

  const hasFormChanges = (): boolean => getCurrentFormSnapshot() !== initialFormState.current;

  /* ─── Success alert helper ─── */
  const showSuccessAlert = (name: string, action: 'created' | 'updated' | 'deleted') => {
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    setSuccessAlert(`${name} has been successfully ${action}.`);
    alertTimerRef.current = setTimeout(() => setSuccessAlert(null), 4000);
  };

  /* ─── Form helpers ─── */
  const resetForm = () => {
    form.resetFields();
    setIsHourlyOnly(false);
    setPolicyType(undefined);
    setPolicyName('');
    setDescription('');
    setCancellationFee(undefined);
    setCutOffWindow(null);
    setCutOffUnit('hours');
    setFeeBeforeCutOff(undefined);
    setFeeAfterCutOff(undefined);
    setEditingPolicy(null);
    setFormSubmitted(false);
    initialFormState.current = '';
  };

  const captureInitialSnapshot = (data: Record<string, any>) => {
    setTimeout(() => { initialFormState.current = JSON.stringify(data); }, 50);
  };

  const handleNewPolicy = () => {
    resetForm();
    setDrawerMode('create');
    setDrawerOpen(true);
    captureInitialSnapshot({
      isHourlyOnly: false, policyType: undefined, policyName: '',
      description: '', cancellationFee: undefined, cutOffWindow: null,
      cutOffUnit: 'hours', feeBeforeCutOff: undefined, feeAfterCutOff: undefined,
    });
  };

  const handleEditPolicy = (record: CancellationPolicy) => {
    resetForm();
    setDrawerMode('edit');
    setEditingPolicy(record);

    const hourly = record.isHourly;
    const typeVal = record.typeValue;
    const isNR = typeVal === 'non-refundable';
    const isCust = typeVal === 'custom';

    setIsHourlyOnly(hourly);
    setPolicyName(record.name);
    setDescription(record.description === '--' ? '' : record.description);
    setPolicyType(typeVal);

    if (isNR) {
      setCancellationFee('100-percent');
    } else if (isCust) {
      setCancellationFee(undefined);
      setCutOffWindow(record.cutOffWindowValue ?? null);
      setFeeBeforeCutOff(record.feeBeforeCutOffValue);
      setFeeAfterCutOff(record.feeAfterCutOffValue);
    } else {
      setCancellationFee(record.cancellationFeeValue);
    }

    form.setFieldsValue({
      reservationType: hourly ? 'hourly' : 'daily',
      policyName: record.name,
      description: record.description === '--' ? '' : record.description,
      policyType: typeVal,
      cancellationFee: isNR ? '100-percent' : (isCust ? undefined : record.cancellationFeeValue),
      cutOffWindow: isCust ? record.cutOffWindowValue : undefined,
      feeBeforeCutOff: isCust ? record.feeBeforeCutOffValue : undefined,
      feeAfterCutOff: isCust ? record.feeAfterCutOffValue : undefined,
    });

    setDrawerOpen(true);

    captureInitialSnapshot({
      isHourlyOnly: hourly, policyType: typeVal, policyName: record.name,
      description: record.description === '--' ? '' : record.description,
      cancellationFee: isNR ? '100-percent' : (isCust ? undefined : record.cancellationFeeValue),
      cutOffWindow: isCust ? (record.cutOffWindowValue ?? null) : null,
      cutOffUnit: 'hours',
      feeBeforeCutOff: isCust ? record.feeBeforeCutOffValue : undefined,
      feeAfterCutOff: isCust ? record.feeAfterCutOffValue : undefined,
    });
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    resetForm();
  };

  const handleCancelClick = () => {
    if (hasFormChanges()) {
      Modal.confirm({
        title: drawerMode === 'create' ? 'Cancel Cancellation Policy Creation?' : 'Cancel Cancellation Policy Edits?',
        icon: <InfoCircleFilled style={{ color: '#3E4BE0' }} />,
        content: 'Proceeding will erase newly entered data, and you will need to start over.',
        okText: 'Yes, Cancel',
        cancelText: 'No, Keep Editing',
        okButtonProps: { type: 'primary' },
        className: 'cancel-edit-modal',
        onOk: () => handleDrawerClose(),
      });
    } else {
      handleDrawerClose();
    }
  };

  const handleReservationTypeChange = (e: any) => {
    const checked = e.target.value === 'hourly';
    setIsHourlyOnly(checked);
    setPolicyType(undefined);
    setCancellationFee(undefined);
    setCutOffWindow(null);
    setCutOffUnit('hours');
    setFeeBeforeCutOff(undefined);
    setFeeAfterCutOff(undefined);
    form.setFieldsValue({
      policyType: undefined, cancellationFee: undefined,
      cutOffWindow: undefined, feeBeforeCutOff: undefined, feeAfterCutOff: undefined,
    });
  };

  const handlePolicyTypeChange = (value: string) => {
    setPolicyType(value);
    setCutOffWindow(null);
    setCutOffUnit('hours');
    setFeeBeforeCutOff(undefined);
    setFeeAfterCutOff(undefined);

    if (value === 'non-refundable') {
      setCancellationFee('100-percent');
      form.setFieldsValue({ cancellationFee: '100-percent', cutOffWindow: undefined, feeBeforeCutOff: undefined, feeAfterCutOff: undefined });
    } else {
      setCancellationFee(undefined);
      form.setFieldsValue({ cancellationFee: undefined, cutOffWindow: undefined, feeBeforeCutOff: undefined, feeAfterCutOff: undefined });
    }
  };

  const isNonRefundable = policyType === 'non-refundable';
  const isCustom = policyType === 'custom';
  const policyTypeOpts = isHourlyOnly ? hourlyPolicyTypeOptions : allPolicyTypeOptions;
  const getCustomFeeOptions = () => (isCustom && !isHourlyOnly) ? extendedCancellationFeeOptions : standardCancellationFeeOptions;
  const isPresetHourType = policyType === '24-hour' || policyType === '48-hour' || policyType === '72-hour';
  const getStandardFeeOptions = () => (!isHourlyOnly && isPresetHourType) ? extendedCancellationFeeOptions : standardCancellationFeeOptions;
  const isCancellationFeeDisabled = !policyType || isNonRefundable || isCustom;
  const isEditingDefault = editingPolicy ? editingPolicy.isDefault : false;
  const [formSubmitted, setFormSubmitted] = useState(false);

  /* ─── Field-level validation ─── */
  const allowedSpecialChars = /^[a-zA-Z0-9\s\-&_(),.']*$/;
  const startsWithSpace = /^\s/;

  const getPolicyNameError = (): string | null => {
    const trimmed = policyName;
    if (!trimmed || !trimmed.trim()) return 'This field is required.';
    if (startsWithSpace.test(trimmed)) return 'Spaces are not allowed at the beginning of the field.';
    if (!allowedSpecialChars.test(trimmed)) return "Special characters other than (-, &, _, (, ) and ,) are not allowed.";
    // Uniqueness check — skip current policy when editing
    const isDuplicate = policies.some(
      (p) => p.name.toLowerCase() === trimmed.trim().toLowerCase() && p.key !== editingPolicy?.key
    );
    if (isDuplicate) return 'This cancellation policy name must be unique.';
    return null;
  };

  const getDescriptionError = (): string | null => {
    if (description && startsWithSpace.test(description)) return 'Spaces are not allowed at the beginning of the field.';
    return null;
  };

  const getPolicyTypeError = (): string | null => {
    if (!policyType) return 'You must select a cancellation policy type.';
    return null;
  };

  const getCancellationFeeError = (): string | null => {
    if (!isCustom && !isNonRefundable && policyType && !cancellationFee) return 'You must select a cancellation fee.';
    return null;
  };

  const getCutOffWindowError = (): string | null => {
    if (isCustom && !cutOffWindow) return 'This field is required.';
    if (isCustom && cutOffWindow) {
      // Convert to minutes for unified validation
      let valueInMinutes = cutOffWindow;
      if (cutOffUnit === 'hours') valueInMinutes = cutOffWindow * 60;
      else if (cutOffUnit === 'days') valueInMinutes = cutOffWindow * 60 * 24;
      else if (cutOffUnit === 'weeks') valueInMinutes = cutOffWindow * 60 * 24 * 7;

      if (isHourlyOnly) {
        // Hourly: min 10 mins, max 5 hours (300 mins)
        if (valueInMinutes < 10) return 'Cut-Off Window must be at least 10 minutes.';
        if (valueInMinutes > 300) return 'Cut-Off Window cannot exceed maximum stay hours.';
      }
    }
    return null;
  };

  const getFeeBeforeError = (): string | null => {
    if (isCustom && !feeBeforeCutOff) return 'You must select a cancellation fee.';
    return null;
  };

  const getFeeAfterError = (): string | null => {
    if (isCustom && !feeAfterCutOff) return 'You must select a cancellation fee.';
    return null;
  };

  const hasValidationErrors = (): boolean => {
    return !!(getPolicyNameError() || getDescriptionError() || getPolicyTypeError() ||
      getCancellationFeeError() || getCutOffWindowError() || getFeeBeforeError() || getFeeAfterError());
  };

  // isFormValid is no longer used for disabling the button; validation errors are shown inline on submit

  /* ─── Build policy data ─── */
  const buildPolicyData = (): Omit<CancellationPolicy, 'key'> => {
    const typeLabel = getTypeLabel(policyType);
    let cancFeePreCutOff = '--';
    let cancFeePostCutOff = '--';

    if (isCustom) {
      cancFeePreCutOff = getFeeLabel(feeBeforeCutOff);
      cancFeePostCutOff = getFeeLabel(feeAfterCutOff);
    } else if (isNonRefundable) {
      cancFeePreCutOff = '100% of the booking amount';
      cancFeePostCutOff = '100% of the booking amount';
    } else {
      cancFeePreCutOff = 'No Fee';
      cancFeePostCutOff = getFeeLabel(cancellationFee);
    }

    return {
      name: policyName.trim(),
      type: typeLabel,
      typeValue: policyType!,
      cancFeePreCutOff,
      cancFeePostCutOff,
      rateTypesLinked: editingPolicy?.rateTypesLinked || '--',
      description: description.trim() || '--',
      isDefault: editingPolicy?.isDefault || false,
      isHourly: isHourlyOnly,
      cancellationFeeValue: isCustom ? undefined : (isNonRefundable ? '100-percent' : cancellationFee),
      cutOffWindowValue: isCustom ? (cutOffWindow ?? undefined) : undefined,
      feeBeforeCutOffValue: isCustom ? feeBeforeCutOff : undefined,
      feeAfterCutOffValue: isCustom ? feeAfterCutOff : undefined,
    };
  };

  const handleCreatePolicy = () => {
    setFormSubmitted(true);
    if (hasValidationErrors()) return;
    const data = buildPolicyData();
    const newPolicy: CancellationPolicy = { key: String(Date.now()), ...data, isDefault: false };
    setPolicies((prev) => [...prev, newPolicy].sort((a, b) => a.name.localeCompare(b.name)));
    showSuccessAlert(policyName.trim(), 'created');
    handleDrawerClose();
  };

  const handleUpdatePolicy = () => {
    setFormSubmitted(true);
    if (hasValidationErrors()) return;
    if (!editingPolicy) return;

    Modal.confirm({
      title: 'Update Cancellation Policy?',
      icon: <InfoCircleFilled style={{ color: '#3E4BE0' }} />,
      content: (
        <span>
          Proceeding will update the cancellation policy. This change will apply{' '}
          <strong>only to future reservations</strong> and will not affect any{' '}
          <strong>past</strong> or <strong>current reservations</strong>.
        </span>
      ),
      okText: 'Yes, Update',
      cancelText: 'No, Cancel',
      okButtonProps: { type: 'primary' },
      className: 'cancel-edit-modal',
      closable: true,
      onOk: () => {
        const data = buildPolicyData();
        setPolicies((prev) => prev.map((p) => p.key === editingPolicy.key ? { ...p, ...data } : p).sort((a, b) => a.name.localeCompare(b.name)));
        showSuccessAlert(policyName.trim(), 'updated');
        handleDrawerClose();
      },
    });
  };

  const handleDeletePolicy = (record: CancellationPolicy) => {
    Modal.confirm({
      title: 'Delete Cancellation Policy?',
      icon: <CloseCircleFilled style={{ color: '#E53E3E' }} />,
      content: (<span>Proceeding will permanently delete the <strong>{record.name}</strong>.</span>),
      okText: 'Yes, Delete',
      cancelText: 'No, Cancel',
      okButtonProps: { danger: true, type: 'primary' },
      className: 'delete-policy-modal',
      onOk: () => {
        setPolicies((prev) => prev.filter((p) => p.key !== record.key));
        showSuccessAlert(record.name, 'deleted');
      },
    });
  };

  /* ─── Filter logic ─── */
  const handleFilterOpen = () => {
    setFilterReservationType([...appliedFilterReservationType]);
    setFilterType([...appliedFilterType]);
    setFilterRateType([...appliedFilterRateType]);
    setFilterDrawerOpen(true);
    setTimeout(() => {
      filterSnapshotRef.current = JSON.stringify({ filterReservationType: appliedFilterReservationType, filterType: appliedFilterType, filterRateType: appliedFilterRateType });
    }, 50);
  };

  const handleFilterDrawerClose = () => {
    setFilterDrawerOpen(false);
  };

  const handleFilterCancel = () => {
    if (hasFilterChanges()) {
      Modal.confirm({
        title: 'Cancel Filter Changes?',
        icon: <InfoCircleFilled style={{ color: '#3E4BE0' }} />,
        content: 'Proceeding will discard your filter selections.',
        okText: 'Yes, Cancel',
        cancelText: 'No, Keep Editing',
        okButtonProps: { type: 'primary' },
        className: 'cancel-edit-modal',
        onOk: () => handleFilterDrawerClose(),
      });
    } else {
      handleFilterDrawerClose();
    }
  };

  const handleApplyFilters = () => {
    setAppliedFilterReservationType([...filterReservationType]);
    setAppliedFilterType([...filterType]);
    setAppliedFilterRateType([...filterRateType]);
    handleFilterDrawerClose();
  };

  const handleClearFilters = () => {
    setFilterReservationType([]);
    setFilterType([]);
    setFilterRateType([]);
  };

  // Compute filtered + searched policies
  const getFilteredPolicies = () => {
    let result = policies;

    // Search
    if (searchValue) {
      result = result.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()));
    }

    // Applied filters
    if (appliedFilterReservationType.length > 0) {
      result = result.filter((p) => {
        const appliesTo = p.isHourly ? 'Hourly' : 'Daily';
        return appliedFilterReservationType.includes(appliesTo);
      });
    }

    if (appliedFilterType.length > 0) {
      result = result.filter((p) => appliedFilterType.includes(p.type));
    }

    if (appliedFilterRateType.length > 0) {
      result = result.filter((p) => appliedFilterRateType.includes(p.rateTypesLinked));
    }

    return result;
  };

  const filteredPolicies = getFilteredPolicies();

  // Count of policies matching current (uncommitted) filter selections in the drawer
  const getPreviewCount = () => {
    let result = policies;
    if (searchValue) {
      result = result.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()));
    }
    if (filterReservationType.length > 0) {
      result = result.filter((p) => {
        const appliesTo = p.isHourly ? 'Hourly' : 'Daily';
        return filterReservationType.includes(appliesTo);
      });
    }
    if (filterType.length > 0) {
      result = result.filter((p) => filterType.includes(p.type));
    }
    if (filterRateType.length > 0) {
      result = result.filter((p) => filterRateType.includes(p.rateTypesLinked));
    }
    return result.length;
  };

  /* ─── Menu ─── */
  const handleMenuClick = (key: string, record: CancellationPolicy) => {
    if (key === 'edit') handleEditPolicy(record);
    else if (key === 'delete') handleDeletePolicy(record);
  };

  const getMenuProps = (record: CancellationPolicy) => ({
    onClick: ({ key }: { key: string }) => handleMenuClick(key, record),
    items: [
      { key: 'edit', label: 'Edit', icon: <EditOutlined /> },
      { key: 'delete', label: 'Delete', icon: <DeleteOutlined />, danger: true, disabled: record.name === 'Strict' },
    ],
  });

  /* ─── Table columns ─── */
  const renderWithTooltip = (text: string) => (
    <Tooltip title={text} placement="topLeft" overlayClassName="policy-tooltip">
      <span className="cell-ellipsis-text">{text}</span>
    </Tooltip>
  );

  const columns: ColumnsType<CancellationPolicy> = [
    {
      title: 'Cancellation Policy',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: { showTitle: false },
      render: (text: string) => (
        <Tooltip title={text} placement="topLeft" overlayClassName="policy-tooltip">
          <span className="cell-ellipsis-text policy-name-cell">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Applies To',
      key: 'appliesTo',
      ellipsis: { showTitle: false },
      sorter: (a, b) => {
        const aVal = a.isHourly ? 'Hourly' : 'Daily';
        const bVal = b.isHourly ? 'Hourly' : 'Daily';
        return aVal.localeCompare(bVal);
      },
      render: (_: unknown, record: CancellationPolicy) => {
        const label = record.isHourly ? 'Hourly' : 'Daily';
        return (
          <Tooltip title={label} placement="topLeft" overlayClassName="policy-tooltip">
            <span className="cell-ellipsis-text">{label}</span>
          </Tooltip>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      ellipsis: { showTitle: false },
      render: renderWithTooltip,
    },
    {
      title: 'Canc. Fee (Pre-Cut-Off)',
      dataIndex: 'cancFeePreCutOff',
      key: 'cancFeePreCutOff',
      sorter: true,
      ellipsis: { showTitle: false },
      render: renderWithTooltip,
    },
    {
      title: 'Canc. Fee (Post-Cut-...)',
      dataIndex: 'cancFeePostCutOff',
      key: 'cancFeePostCutOff',
      sorter: true,
      ellipsis: { showTitle: false },
      render: renderWithTooltip,
    },
    {
      title: 'Rate Types Linked',
      dataIndex: 'rateTypesLinked',
      key: 'rateTypesLinked',
      ellipsis: { showTitle: false },
      render: renderWithTooltip,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
      ellipsis: { showTitle: false },
      render: renderWithTooltip,
    },
    {
      title: '',
      key: 'actions',
      width: 48,
      render: (_, record) => (
        <Dropdown menu={getMenuProps(record)} trigger={['click']} placement="bottomRight">
          <div className="policy-actions-btn">
            <MoreOutlined style={{ fontSize: 16 }} />
          </div>
        </Dropdown>
      ),
    },
  ];

  const drawerTitle = drawerMode === 'create' ? 'Create a New Cancellation Policy' : `Edit ${editingPolicy?.name || ''}`;
  const submitBtnText = drawerMode === 'create' ? 'Create Cancellation Policy' : 'Update Cancellation Policy';
  const handleSubmit = drawerMode === 'create' ? handleCreatePolicy : handleUpdatePolicy;

  return (
    <div className="cancellation-policies">
      {/* Success Alert */}
      {successAlert && (
        <div className="cancellation-policies-alert-wrapper">
          <Alert
            message={successAlert}
            type="success"
            showIcon
            closable
            onClose={() => setSuccessAlert(null)}
          />
        </div>
      )}

      {/* Title row with dev notes link */}
      <div className="cancellation-policies-title-row">
        <h1 className="cancellation-policies-title">Cancellation Policies</h1>
        <a
          href="https://www.figma.com/design/hgev8v3eSEZW5doTW9Mka9/%F0%9F%92%BB-7.1-Policies-and-Strategies?node-id=5772-51178&t=LIcbkhKzHBp86INF-4"
          target="_blank"
          rel="noopener noreferrer"
          className="cancellation-policies-dev-notes-link"
        >
          Link to Dev Notes for Cancellation Policies
        </a>
      </div>

      {/* Toolbar */}
      <div className="cancellation-policies-toolbar">
        <div className="cancellation-policies-search">
          <Search
            placeholder="Search for cancellation policy name"
            onSearch={(v) => setSearchValue(v)}
            onChange={(e) => setSearchValue(e.target.value)}
            enterButton={<SearchOutlined />}
            size="large"
          />
        </div>

        <div className="cancellation-policies-actions">
          <Badge dot={hasActiveFilters} offset={[-4, 4]} color="#3E4BE0">
            <button
              className={`cancellation-policies-filter-btn ${hasActiveFilters ? 'filter-active' : ''}`}
              type="button"
              aria-label="Filter"
              onClick={handleFilterOpen}
            >
              <FilterIcon />
            </button>
          </Badge>

          <button className="cancellation-policies-new-btn" type="button" onClick={handleNewPolicy}>
            <PlusOutlined style={{ fontSize: 16 }} />
            New Cancellation Policy
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="cancellation-policies-table">
        <Table<CancellationPolicy>
          columns={columns}
          dataSource={filteredPolicies}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} results`,
            pageSizeOptions: ['10', '20', '50'],
          }}
          size="middle"
        />
      </div>

      {/* ─── Create / Edit Drawer ─── */}
      <Drawer
        title={null}
        placement="right"
        width={420}
        open={drawerOpen}
        onClose={handleCancelClick}
        closable={false}
        className="cancellation-policy-drawer"
        footer={
          <div className="drawer-footer">
            <Button type="text" size="large" onClick={handleCancelClick} className="drawer-cancel-btn">Cancel</Button>
            <Button type="primary" size="large" className="drawer-submit-btn" onClick={handleSubmit}>{submitBtnText}</Button>
          </div>
        }
      >
        <div className="drawer-custom-header">
          <div className="drawer-close-icon" onClick={handleCancelClick}><CloseOutlined style={{ fontSize: 20 }} /></div>
          <h3 className="drawer-title">{drawerTitle}</h3>
        </div>

        <div className="drawer-form-content">
          <Form form={form} layout="vertical" className="cancellation-policy-form">
            <Form.Item
              label="Apply To"
              name="reservationType"
              required
              className="form-item-field"
            >
              <Radio.Group
                value={isHourlyOnly ? 'hourly' : 'daily'}
                onChange={handleReservationTypeChange}
                disabled={drawerMode === 'edit' && isEditingDefault}
              >
                <Radio value="daily">Daily Reservations</Radio>
                <Radio value="hourly">Hourly Reservations</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Cancellation Policy Name"
              name="policyName"
              required
              className="form-item-field"
              validateStatus={formSubmitted && getPolicyNameError() ? 'error' : undefined}
              help={formSubmitted ? getPolicyNameError() : undefined}
            >
              <Input placeholder="Enter cancellation policy name" size="large" maxLength={30} showCount value={policyName} onChange={(e) => setPolicyName(e.target.value)} disabled={drawerMode === 'edit' && isEditingDefault} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              className="form-item-field"
              validateStatus={formSubmitted && getDescriptionError() ? 'error' : undefined}
              help={formSubmitted ? getDescriptionError() : undefined}
            >
              <TextArea placeholder="Enter description" rows={4} maxLength={150} showCount value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Cancellation Policy Type"
              name="policyType"
              required
              className="form-item-field"
              validateStatus={formSubmitted && getPolicyTypeError() ? 'error' : undefined}
              help={formSubmitted ? getPolicyTypeError() : undefined}
            >
              <Select placeholder="Select cancellation policy type" size="large" value={policyType} onChange={handlePolicyTypeChange} allowClear disabled={drawerMode === 'edit' && isEditingDefault}>
                {policyTypeOpts.map((opt) => (<Option key={opt.value} value={opt.value}>{opt.label}</Option>))}
              </Select>
            </Form.Item>

            {!isCustom && (
              <Form.Item
                label={<span>Cancellation Fee <span className="required-mark">*</span>{' '}<Tooltip title="Choose the charge for late cancellations or no-shows. This applies after the free cancellation period ends." overlayClassName="policy-tooltip"><span className="field-help-icon"><QuestionIcon /></span></Tooltip></span>}
                name="cancellationFee"
                className="form-item-field"
                validateStatus={formSubmitted && getCancellationFeeError() ? 'error' : undefined}
                help={formSubmitted ? getCancellationFeeError() : undefined}
              >
                <Select placeholder="Select cancellation fee" size="large" disabled={isCancellationFeeDisabled} value={cancellationFee} onChange={(val: string) => setCancellationFee(val)}>
                  {getStandardFeeOptions().map((opt) => (<Option key={opt.value} value={opt.value}>{opt.label}</Option>))}
                </Select>
              </Form.Item>
            )}

            {isCustom && (
              <>
                <Form.Item
                  label={<span>Cancellation Cut-Off Window <span className="required-mark">*</span>{' '}<Tooltip title="Define the period before check-in when cancellations are allowed. Guests canceling within this window will be charged the selected fee." overlayClassName="policy-tooltip"><span className="field-help-icon"><QuestionIcon /></span></Tooltip></span>}
                  name="cutOffWindow"
                  className="form-item-field"
                  validateStatus={formSubmitted && getCutOffWindowError() ? 'error' : undefined}
                  help={formSubmitted ? getCutOffWindowError() : undefined}
                >
                  <InputNumber
                    placeholder="Enter value"
                    size="large"
                    min={1}
                    precision={0}
                    className="cutoff-window-input"
                    addonAfter={
                      <Select
                        value={cutOffUnit}
                        onChange={(val: 'hours' | 'mins' | 'days' | 'weeks') => setCutOffUnit(val)}
                        style={{ width: 90 }}
                        size="large"
                      >
                        {isHourlyOnly ? (
                          <>
                            <Option value="hours">hours</Option>
                            <Option value="mins">mins</Option>
                          </>
                        ) : (
                          <>
                            <Option value="hours">hours</Option>
                            <Option value="days">days</Option>
                            <Option value="weeks">weeks</Option>
                          </>
                        )}
                      </Select>
                    }
                    value={cutOffWindow}
                    onChange={(val) => setCutOffWindow(val as number | null)}
                    onKeyDown={(e) => {
                      if (e.key === '.' || e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') e.preventDefault();
                      if (/[a-zA-Z]/.test(e.key) && e.key.length === 1) e.preventDefault();
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Cancellation Fee Before Cut-Off Window"
                  name="feeBeforeCutOff"
                  required
                  className="form-item-field"
                  validateStatus={formSubmitted && getFeeBeforeError() ? 'error' : undefined}
                  help={formSubmitted ? getFeeBeforeError() : undefined}
                >
                  <Select placeholder="Select cancellation fee" size="large" value={feeBeforeCutOff} onChange={(val: string) => setFeeBeforeCutOff(val)}>
                    {getCustomFeeOptions().map((opt) => (<Option key={opt.value} value={opt.value}>{opt.label}</Option>))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Cancellation Fee After Cut-Off Window"
                  name="feeAfterCutOff"
                  required
                  className="form-item-field"
                  validateStatus={formSubmitted && getFeeAfterError() ? 'error' : undefined}
                  help={formSubmitted ? getFeeAfterError() : undefined}
                >
                  <Select placeholder="Select cancellation fee" size="large" value={feeAfterCutOff} onChange={(val: string) => setFeeAfterCutOff(val)}>
                    {getCustomFeeOptions().map((opt) => (<Option key={opt.value} value={opt.value}>{opt.label}</Option>))}
                  </Select>
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </Drawer>

      {/* ─── Filter Drawer ─── */}
      <Drawer
        title={null}
        placement="right"
        width={380}
        open={filterDrawerOpen}
        onClose={handleFilterCancel}
        closable={false}
        className="cancellation-policy-drawer filter-drawer"
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
          <Button type="link" size="small" onClick={handleClearFilters} className="filter-clear-btn">Clear All</Button>
        </div>

        <div className="drawer-form-content">
          <Form layout="vertical" className="cancellation-policy-form">
            <Form.Item label="Application On Reservation Type" className="form-item-field">
              <Checkbox.Group
                value={filterReservationType}
                onChange={(vals) => setFilterReservationType(vals as string[])}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Checkbox value="Daily">Daily</Checkbox>
                  <Checkbox value="Hourly">Hourly</Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item label="Cancellation Type" className="form-item-field">
              <Select
                mode="multiple"
                placeholder="Select cancellation type"
                size="large"
                value={filterType}
                onChange={(vals: string[]) => setFilterType(vals)}
                allowClear
                maxTagCount="responsive"
              >
                {filterCancellationTypeOptions.map((opt) => (
                  <Option key={opt} value={opt}>{opt}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Rate Types Linked" className="form-item-field">
              <Select
                mode="multiple"
                placeholder="Select rate type"
                size="large"
                value={filterRateType}
                onChange={(vals: string[]) => setFilterRateType(vals)}
                allowClear
                maxTagCount="responsive"
              >
                {filterRateTypeOptions.map((opt) => (
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

export default CancellationPolicies;
