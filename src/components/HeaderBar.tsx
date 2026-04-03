import React from 'react';
import { Input, Tooltip, Dropdown, Menu, Avatar } from 'antd';
import {
  SearchOutlined,
  FileSearchOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
} from '@ant-design/icons';
import './HeaderBar.css';

const { Search } = Input;

interface HeaderBarProps {
  sidebarCollapsed?: boolean;
  onSearch?: (value: string) => void;
}

const ProfileMenu = (
  <Menu
    items={[
      { key: 'profile', label: 'My Profile' },
      { key: 'settings', label: 'Settings' },
      { key: 'logout', label: 'Logout' },
    ]}
  />
);

const NewReservationMenu = (
  <Menu
    items={[
      { key: 'room', label: 'Create Room Reservation' },
      { key: 'space', label: 'Create Space Reservation' },
    ]}
  />
);

const HeaderBar: React.FC<HeaderBarProps> = ({
  sidebarCollapsed = false,
  onSearch,
}) => {
  const handleSearch = (value: string) => {
    onSearch?.(value);
  };

  return (
    <div className={`header-bar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-bar-search">
        <Search
          placeholder="Search"
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
          size="middle"
        />
      </div>

      <div className="header-bar-actions">
        <div className="header-bar-action-group">
          <Tooltip title="Audit">
            <div className="header-bar-action-btn default">
              <FileSearchOutlined style={{ fontSize: 16 }} />
            </div>
          </Tooltip>

          <Tooltip title="Calendar View">
            <div className="header-bar-action-btn default">
              <CalendarOutlined style={{ fontSize: 16 }} />
            </div>
          </Tooltip>

          <Tooltip title="Unposted Reservations">
            <div className="header-bar-action-btn default">
              <ExclamationCircleOutlined style={{ fontSize: 16 }} />
            </div>
          </Tooltip>

          <Dropdown dropdownRender={() => NewReservationMenu} placement="bottomRight" trigger={['click']}>
            <Tooltip title="New Reservation">
              <div className="header-bar-action-btn primary">
                <CalendarOutlined style={{ fontSize: 16 }} />
              </div>
            </Tooltip>
          </Dropdown>
        </div>

        <div className="header-divider" />

        <Dropdown dropdownRender={() => ProfileMenu} placement="bottomRight" trigger={['click']}>
          <div className="profile-section">
            <Avatar
              size={32}
              src="/avatar.png"
              style={{ borderRadius: 8, border: '1px solid #d9d9d9' }}
            />
            <DownOutlined className="profile-chevron" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderBar;
