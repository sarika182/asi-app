import React, { useMemo, useState } from 'react';
import { Select } from 'antd';
import { SearchOutlined, FileTextOutlined } from '@ant-design/icons';
import { reportCategories, reportLookup } from './reportsConfig';
import RevenueByRoomTypeReport from './RevenueByRoomTypeReport';
import './Reports.css';

/* Maps a report key to the component that renders it.
 * Reports without an entry show "Report not available". */
const reportComponents: Record<string, React.FC> = {
  'revenue-by-room-type': RevenueByRoomTypeReport,
};

const Reports: React.FC = () => {
  const [activeReportKey, setActiveReportKey] = useState<string>('crs-booking-summary');

  const activeReport = reportLookup[activeReportKey];

  const selectOptions = useMemo(
    () =>
      reportCategories.map((cat) => ({
        label: cat.label,
        title: cat.label,
        options: cat.reports.map((r) => ({
          value: r.key,
          label: (
            <span className="report-option">
              <FileTextOutlined className="report-option-icon" />
              <span className="report-option-label">{r.label}</span>
            </span>
          ),
          searchLabel: r.label,
        })),
      })),
    []
  );

  const ReportComponent = reportComponents[activeReportKey];

  return (
    <div className="reports-page">
      <div className="reports-card">
        <div className="reports-header-row">
          <div className="reports-header-text">
            <h1 className="reports-title">{activeReport?.label ?? 'Select a report'}</h1>
            <p className="reports-category">{activeReport?.categoryLabel ?? ''}</p>
          </div>

          <div className="reports-search">
            <Select
              className="reports-search-select"
              popupClassName="reports-search-dropdown"
              showSearch
              value={activeReportKey}
              onChange={(key) => setActiveReportKey(key)}
              options={selectOptions}
              suffixIcon={<SearchOutlined />}
              filterOption={(input, option) => {
                const label = (option as any)?.searchLabel as string | undefined;
                return !!label && label.toLowerCase().includes(input.toLowerCase());
              }}
              placeholder="Search reports"
              size="large"
            />
          </div>
        </div>

        <div className="reports-content">
          {ReportComponent ? (
            <ReportComponent />
          ) : (
            <p className="reports-not-available">Report not available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
