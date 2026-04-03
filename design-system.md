# Ant Design System 5.16 — Complete Variant Reference
> **Source:** [Figma — 👉 5.16 Ant Design System for Figma](https://www.figma.com/design/jq7RaqaL3tJfokDeGzPZ4o)  
> **Ant Design Docs:** https://ant.design/components/overview/  
> **Library Key:** `lk-b370930c...6807b605`

---

## Table of Contents

1. [Global Tokens](#1-global-tokens)
2. [Typography](#2-typography)
3. [Button](#3-button)
4. [Input](#4-input)
5. [Select](#5-select)
6. [Form](#6-form)
7. [Checkbox](#7-checkbox)
8. [Radio](#8-radio)
9. [Switch](#9-switch)
10. [Alert](#10-alert)
11. [Tag](#11-tag)
12. [Pagination](#12-pagination)
13. [Table](#13-table)
14. [Tree](#14-tree)
15. [Calendar](#15-calendar)
16. [Modal](#16-modal)
17. [Dropdown](#17-dropdown)
18. [Popover](#18-popover)
19. [Tour](#19-tour)
20. [Float Button](#20-float-button)
21. [Upload](#21-upload)
22. [Space](#22-space)
23. [Divider](#23-divider)

---

## 1. Global Tokens

### Color

| Token | Value | Used By |
|---|---|---|
| `colorPrimary` | `#3e4be0` | Button primary, Pagination active, Radio checked |
| `colorText` | `rgba(0,0,0,0.88)` | Default body text |
| `colorTextDisabled` | `rgba(0,0,0,0.25)` | Disabled states, placeholders |
| `colorBorder` | `#d9d9d9` | Input, Select, Table borders |
| `colorBgContainer` | `white` | Input/Select backgrounds |
| `colorError` | red | Error states |
| `colorWarning` | gold | Warning states |
| `colorSuccess` | green | Success states |
| `colorInfo` | blue | Info states |

### Typography

| Token | Value |
|---|---|
| `fontFamily` | `Source Sans 3` |
| `fontSize` | `14px` |
| `fontSizeLG` | `16px` |
| `fontSizeSM` | `12px` |
| `lineHeight` | `22px` |
| `fontWeightNormal` | `400` |
| `fontWeightStrong` | `600` |

### Spacing & Shape

| Token | Value |
|---|---|
| `marginXXS` | `4px` |
| `marginXS` | `8px` |
| `marginSM` | `12px` |
| `margin` | `16px` |
| `marginMD` | `20px` |
| `marginLG` | `24px` |
| `borderRadius` | `6px` |
| `borderRadiusSM` | `4px` |
| `borderRadiusLG` | `8px` |
| `lineWidth` | `1px` |
| `controlHeight` | `32px` |
| `controlHeightSM` | `24px` |
| `controlHeightLG` | `40px` |

### Shadow Styles

| Token | Applied to |
|---|---|
| `Component/Button/primaryShadow` | Primary button |
| `Component/Button/defaultShadow` | Default button |
| `Component/Button/dangerShadow` | Danger button |

---

## 2. Typography

**Docs:** https://ant.design/components/typography/  
**Node ID:** `1233:44605`

### Text Styles

| Style | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| `Text/Base/Normal` | Source Sans 3 Regular | `14px` | `400` | `22px` |
| `Text/Base/Strong` | Source Sans 3 SemiBold | `14px` | `600` | `22px` |

### Variants

| Variant Key | Props | Description |
|---|---|---|
| `Type=Default, Style=Default, Size=Base` | — | Plain text |
| `Type=Default, Style=Strong, Size=Base` | `strong` | Bold text |
| `Type=Default, Style=Underline, Size=Base` | `underline` | Underlined text |
| `Type=Default, Style=Delete, Size=Base` | `delete` | Strikethrough |
| `Type=Default, Style=Code, Size=Base` | `code` | Inline code |
| `Type=Default, Style=Mark, Size=Base` | `mark` | Highlighted text |
| `Type=Secondary` | `type="secondary"` | Muted text |
| `Type=Success` | `type="success"` | Green text |
| `Type=Warning` | `type="warning"` | Gold text |
| `Type=Danger` | `type="danger"` | Red text |
| `Type=Disabled` | `disabled` | Greyed text |
| `Size=Base` | — | 14px |
| `Size=Small` | — | 12px |
| `Size=Large` | — | 16px |

```jsx
import { Typography } from 'antd';
const { Text, Title, Paragraph, Link } = Typography;

<Text>Default</Text>
<Text strong>Bold</Text>
<Text type="secondary">Secondary</Text>
<Text type="success">Success</Text>
<Text type="warning">Warning</Text>
<Text type="danger">Danger</Text>
<Text disabled>Disabled</Text>
<Text underline>Underline</Text>
<Text delete>Delete</Text>
<Text code>inline code</Text>
<Text mark>Highlighted</Text>
<Title level={1}>h1</Title>
<Title level={2}>h2</Title>
<Title level={3}>h3</Title>
<Title level={4}>h4</Title>
<Title level={5}>h5</Title>
<Paragraph>Paragraph text</Paragraph>
<Link href="https://ant.design">Link</Link>
```

---

## 3. Button

**Docs:** https://ant.design/components/button/  
**Component Keys:** `Button ` → `729b3404`, `Button Close` → `62af406f`, `Button Group Compact` → `fa8f8617`

### Type Variants

| Variant | `type` Prop | Visual |
|---|---|---|
| `Type=Primary` | `type="primary"` | Solid fill `#3e4be0`, white text |
| `Type=Default` | `type="default"` (or omit) | White bg, `#d9d9d9` border, dark text |
| `Type=Dashed` | `type="dashed"` | White bg, dashed `#d9d9d9` border |
| `Type=Text` | `type="text"` | No border/bg, transparent |
| `Type=Link` | `type="link"` | Text styled as link `#3e4be0` |

### Size Variants

| Variant | `size` Prop | Height | Font | Padding H |
|---|---|---|---|---|
| `Size=Large` | `size="large"` | `40px` | `16px` | `15px` |
| `Size=Middle` | `size="middle"` (default) | `32px` | `14px` | `15px` |
| `Size=Small` | `size="small"` | `24px` | `14px` | `7px` |

### Danger Variants

| Variant | Props | Visual |
|---|---|---|
| `Type=Primary, Danger=True` | `type="primary" danger` | Red solid fill |
| `Type=Default, Danger=True` | `danger` | Red border + red text |
| `Type=Dashed, Danger=True` | `type="dashed" danger` | Red dashed border |
| `Type=Text, Danger=True` | `type="text" danger` | Red text, no border |
| `Type=Link, Danger=True` | `type="link" danger` | Red link text |

### Ghost Variants

| Variant | Props | Visual |
|---|---|---|
| `Type=Primary, Ghost=True` | `type="primary" ghost` | Transparent bg, `#3e4be0` border + text |
| `Type=Default, Ghost=True` | `ghost` | Transparent bg, white border + text |

### State Variants

| State | Prop/Condition |
|---|---|
| Default | — |
| Hover | Mouse over |
| Active / Pressed | Mouse down |
| Focus | Keyboard focus ring |
| `Disabled=True` | `disabled` |
| `Loading=True` | `loading` |

### Icon Variants

| Variant | Props |
|---|---|
| Icon + Text (left) | `icon={<SearchOutlined />}` |
| Icon only | `icon={<SearchOutlined />}` with no children |
| Icon + Text (right) | `iconPosition="end" icon={...}` |

### Shape Variants

| Variant | `shape` Prop |
|---|---|
| `Shape=Default` | (default rectangle) |
| `Shape=Circle` | `shape="circle"` |
| `Shape=Round` | `shape="round"` |

### Button Close Variants

| Variant | Props |
|---|---|
| `Size=Default` | Default 32px close button |
| `Size=Small` | 24px close button |
| `Size=Large` | 40px close button |
| `Disabled=True` | `disabled` |

### Button Group Compact

Groups adjacent buttons, merges inner borders.

```jsx
<Space.Compact>
  <Button>Left</Button>
  <Button>Middle</Button>
  <Button>Right</Button>
</Space.Compact>
```

### Design Tokens

| Token | Value |
|---|---|
| `Components/Button/Component/primaryColor` | white |
| `Components/Button/Component/defaultColor` | `rgba(0,0,0,0.88)` |
| `Components/Button/Component/defaultBg` | white |
| `Components/Button/Component/dangerColor` | error red |
| `Components/Button/Component/ghostBg` | transparent |
| `Components/Button/Component/textHoverBg` | light gray |
| `Components/Button/Component/linkHoverBg` | light blue |
| `Components/Button/Component/fontWeight` | `400` |
| `Components/Button/Global/colorText` | `rgba(0,0,0,0.88)` |
| `Components/Button/Global/colorLink` | `#3e4be0` |
| `Components/Button/Global/marginXS` | `8px` |
| `Components/Button/Global/paddingXS` | `8px` |

```jsx
import { Button, Space } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

// All types
<Button type="primary">Primary</Button>
<Button>Default</Button>
<Button type="dashed">Dashed</Button>
<Button type="text">Text</Button>
<Button type="link">Link</Button>

// Sizes
<Button size="large">Large</Button>
<Button size="middle">Middle</Button>
<Button size="small">Small</Button>

// Danger
<Button danger>Danger Default</Button>
<Button type="primary" danger>Danger Primary</Button>

// Ghost
<Button type="primary" ghost>Ghost</Button>

// Loading / disabled
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>

// Icon
<Button icon={<SearchOutlined />}>Search</Button>
<Button icon={<DownloadOutlined />} />

// Shape
<Button shape="circle" icon={<SearchOutlined />} />
<Button shape="round">Round</Button>

// Group
<Space.Compact>
  <Button>A</Button>
  <Button>B</Button>
  <Button>C</Button>
</Space.Compact>
```

---

## 4. Input

**Docs:** https://ant.design/components/input/  
**Node ID:** `515:39978`

### Status Variants

| Variant | `status` Prop | Visual |
|---|---|---|
| `Status=Default` | — | `#d9d9d9` border |
| `Status=Error` | `status="error"` | Red border |
| `Status=Warning` | `status="warning"` | Yellow border |

### Size Variants

| Variant | `size` Prop | Height | Padding X | Radius |
|---|---|---|---|---|
| `Size=Large` | `size="large"` | `40px` | `12px` | `6px` |
| `Size=Default` | — | `32px` | `12px` | `6px` |
| `Size=Small` | `size="small"` | `24px` | `8px` | `4px` |

### State Variants

| State | Description |
|---|---|
| `State=Default` | Resting state |
| `State=Hover` | Border turns `#3e4be0` hover |
| `State=Focus` | Blue border + shadow ring |
| `State=Disabled` | Gray bg, no interaction |
| `State=ReadOnly` | No border change, read-only |

### Affix / Addon Variants

| Variant | Props |
|---|---|
| Prefix icon | `prefix={<UserOutlined />}` |
| Suffix icon | `suffix={<InfoCircleOutlined />}` |
| Addon before | `addonBefore="http://"` |
| Addon after | `addonAfter=".com"` |
| Clear button | `allowClear` |
| Count | `showCount maxLength={100}` |

### Input Type Variants

| Variant | Component | Props |
|---|---|---|
| `Type=Default` | `<Input />` | — |
| `Type=TextArea` | `<Input.TextArea />` | `rows={4}` |
| `Type=Password` | `<Input.Password />` | — |
| `Type=Search` | `<Input.Search />` | `enterButton` |
| `Type=Number` | `<InputNumber />` | — |
| `Type=OTP` | `<Input.OTP />` | `length={6}` |

### Input Search Variants

| Variant | Key | Props |
|---|---|---|
| Without button | `bf8cff29...` | — |
| With button | — | `enterButton` |
| With custom button | — | `enterButton="Search"` |
| Loading | — | `loading` |

### Design Tokens

| Token | Value |
|---|---|
| `colorBgContainer` | white |
| `colorBorder` | `#d9d9d9` |
| `colorText` | `rgba(0,0,0,0.88)` |
| `colorTextPlaceholder` | `rgba(0,0,0,0.25)` |
| `borderRadius` | `6px` |
| `borderRadiusSM` | `4px` |
| `controlPaddingHorizontal` | `12px` |
| `controlPaddingHorizontalSM` | `8px` |
| `paddingBlock` | `4px` |
| `paddingBlockSM` | `0px` |

```jsx
import { Input } from 'antd';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';

// Sizes
<Input placeholder="Default" />
<Input size="large" placeholder="Large" />
<Input size="small" placeholder="Small" />

// Status
<Input status="error" placeholder="Error" />
<Input status="warning" placeholder="Warning" />

// Affixes
<Input prefix={<UserOutlined />} placeholder="Username" />
<Input suffix={<InfoCircleOutlined />} placeholder="Info" />
<Input addonBefore="http://" addonAfter=".com" placeholder="Domain" />
<Input allowClear placeholder="Clearable" />
<Input showCount maxLength={100} placeholder="With count" />

// Types
<Input.TextArea rows={4} placeholder="TextArea" />
<Input.Password placeholder="Password" />
<Input.Search placeholder="Search..." enterButton />
<Input.OTP length={6} />

// Disabled
<Input disabled placeholder="Disabled" />
```

---

## 5. Select

**Docs:** https://ant.design/components/select/  
**Node ID:** `1217:31707`

### Size Variants

| Variant | `size` Prop | Height | Padding X |
|---|---|---|---|
| `Size=Large` | `size="large"` | `40px` | `12px` |
| `Size=Default` | — | `32px` | `12px` |
| `Size=Small` | `size="small"` | `24px` | `8px` |

### Status Variants

| Variant | `status` Prop |
|---|---|
| `Status=Default` | — |
| `Status=Error` | `status="error"` |
| `Status=Warning` | `status="warning"` |

### State Variants

| State | Condition |
|---|---|
| Default | `Active=No` |
| Active/Open | `Active=Yes` — dropdown open |
| Disabled | `disabled` |

### Placement Variants

| Variant | `placement` Prop |
|---|---|
| `Placement=bottomLeft` | `placement="bottomLeft"` (default) |
| `Placement=bottomRight` | `placement="bottomRight"` |
| `Placement=topLeft` | `placement="topLeft"` |
| `Placement=topRight` | `placement="topRight"` |

### Mode Variants

| Variant | `mode` Prop | Description |
|---|---|---|
| Single | — | One value |
| `Mode=Multiple` | `mode="multiple"` | Multiple tags |
| `Mode=Tags` | `mode="tags"` | Free-form tags |
| `Mode=Combobox` | `mode="combobox"` | Input + dropdown |

### Design Tokens

| Token | Value |
|---|---|
| `colorBgContainer` | white |
| `colorBorder` | `#d9d9d9` |
| `colorText` | `rgba(0,0,0,0.88)` |
| `borderRadius` | `6px` |
| `controlPaddingHorizontal` | `12px` |
| `controlPaddingHorizontalSM` | `8px` |
| `lineWidth` | `1px` |

```jsx
import { Select } from 'antd';

// Basic
<Select defaultValue="lucy" style={{ width: 120 }}>
  <Select.Option value="jack">Jack</Select.Option>
  <Select.Option value="lucy">Lucy</Select.Option>
  <Select.Option value="disabled" disabled>Disabled</Select.Option>
</Select>

// Sizes
<Select size="large" />
<Select size="small" />

// Status
<Select status="error" />
<Select status="warning" />

// Modes
<Select mode="multiple" placeholder="Multiple" />
<Select mode="tags" placeholder="Tags" />

// Features
<Select showSearch placeholder="Searchable" optionFilterProp="label" />
<Select allowClear placeholder="Clearable" />
<Select disabled />
<Select loading />
```

---

## 6. Form

**Docs:** https://ant.design/components/form/  
**Component Keys:** `Form / Form Item / Vertical` → `b0bdd198`, `_Form / Form Item / Inline` → `516:42298`

### Layout Variants

| Variant | `layout` Prop | Description |
|---|---|---|
| `Layout=Vertical` | `layout="vertical"` | Label above field |
| `Layout=Horizontal` | `layout="horizontal"` | Label left of field |
| `Layout=Inline` | `layout="inline"` | All items in one row |

### Form Item Variants

| Variant | Props | Description |
|---|---|---|
| `Required=True` | `required` | Asterisk indicator |
| `Required=False` | — | No asterisk |
| `HasFeedback=True` | `hasFeedback` | Shows status icon |
| `ValidateStatus=Success` | `validateStatus="success"` | Green check |
| `ValidateStatus=Warning` | `validateStatus="warning"` | Yellow warning |
| `ValidateStatus=Error` | `validateStatus="error"` | Red error |
| `ValidateStatus=Validating` | `validateStatus="validating"` | Spinner |

### Label Alignment

| Variant | `labelAlign` Prop |
|---|---|
| `LabelAlign=Right` | `labelAlign="right"` (default) |
| `LabelAlign=Left` | `labelAlign="left"` |

### Design Tokens

| Token | Value |
|---|---|
| `Components/Form/Global/marginXS` | `8px` |
| `Components/Form/Component/labelColonMarginInlineStart` | `2px` |
| `Components/Form/Component/labelColonMarginInlineEnd` | `8px` |

```jsx
import { Form, Input, Button, Select, Checkbox } from 'antd';

// Vertical layout
<Form layout="vertical" onFinish={onFinish}>
  <Form.Item label="Username" name="username" rules={[{ required: true }]}>
    <Input />
  </Form.Item>
  <Form.Item label="Password" name="password" rules={[{ required: true }]}>
    <Input.Password />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">Submit</Button>
  </Form.Item>
</Form>

// Horizontal layout
<Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
  <Form.Item label="Username" name="username"><Input /></Form.Item>
</Form>

// Inline layout
<Form layout="inline">
  <Form.Item name="username"><Input placeholder="Username" /></Form.Item>
  <Form.Item name="password"><Input.Password placeholder="Password" /></Form.Item>
  <Form.Item><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
</Form>

// Validation states
<Form.Item hasFeedback validateStatus="success" label="Success">
  <Input defaultValue="Valid input" />
</Form.Item>
<Form.Item hasFeedback validateStatus="error" help="Error message" label="Error">
  <Input />
</Form.Item>
```

---

## 7. Checkbox

**Docs:** https://ant.design/components/checkbox/  
**Component Key:** `ffa04d68...`

### Checked State Variants

| Variant | Prop | Description |
|---|---|---|
| `Checked=False` | `checked={false}` | Unchecked |
| `Checked=True` | `checked={true}` | Checked (blue fill) |
| `Indeterminate=True` | `indeterminate={true}` | Partial check (dash) |

### Disabled Variants

| Variant | Prop |
|---|---|
| `Disabled=False` | — |
| `Disabled=True` | `disabled` |

### State Variants

| State |
|---|
| Default |
| Hover |
| Focus |
| Disabled unchecked |
| Disabled checked |
| Disabled indeterminate |

### Group Variants

| Variant | Component |
|---|---|
| Single checkbox | `<Checkbox>` |
| Checkbox.Group | `<Checkbox.Group options={...}>` |
| Checkbox.Group vertical | `<Checkbox.Group>` with vertical layout |

```jsx
import { Checkbox } from 'antd';

// Basic
<Checkbox onChange={onChange}>Checkbox</Checkbox>

// Checked / Unchecked
<Checkbox checked>Checked</Checkbox>
<Checkbox>Unchecked</Checkbox>

// Indeterminate
<Checkbox indeterminate>Partial</Checkbox>

// Disabled
<Checkbox disabled>Disabled unchecked</Checkbox>
<Checkbox disabled checked>Disabled checked</Checkbox>

// Group — array of options
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Pear', value: 'pear' },
  { label: 'Orange', value: 'orange' },
];
<Checkbox.Group options={options} defaultValue={['apple']} onChange={onChange} />

// Check All pattern
<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
  Check all
</Checkbox>
<Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange} />
```

---

## 8. Radio

**Docs:** https://ant.design/components/radio/  
**Component Keys:** `Radio` → `93dfb11b`, `Radio Group` → `4ae5ec5c`

### Radio Checked State Variants

| Variant | Prop |
|---|---|
| `Checked=False` | `checked={false}` |
| `Checked=True` | `checked={true}` |

### Radio Disabled Variants

| Variant | Prop |
|---|---|
| `Disabled=False` | — |
| `Disabled=True` | `disabled` |

### Radio State Variants

| State |
|---|
| Default |
| Hover |
| Focus |
| Disabled |

### Radio Group Style Variants

| Variant | `optionType` / `buttonStyle` Prop | Description |
|---|---|---|
| `Style=Default` | `optionType="default"` | Circle radio buttons |
| `Style=Button/Outline` | `optionType="button"` | Button-styled radio, outline |
| `Style=Button/Solid` | `optionType="button" buttonStyle="solid"` | Filled button when selected |

### Radio Group Size Variants (button style only)

| Variant | `size` Prop | Height |
|---|---|---|
| `Size=Large` | `size="large"` | `40px` |
| `Size=Default` | — | `32px` |
| `Size=Small` | `size="small"` | `24px` |

### Radio Group Disabled Variants

| Variant | Prop |
|---|---|
| `Disabled=False` | — |
| `Disabled=True` | `disabled` on group |

### Design Tokens

| Token | Value |
|---|---|
| `Components/Radio/Component/buttonBg` | white |
| `Components/Radio/Component/buttonColor` | `rgba(0,0,0,0.88)` |

```jsx
import { Radio } from 'antd';

// Basic
<Radio>Radio</Radio>
<Radio checked>Checked Radio</Radio>
<Radio disabled>Disabled</Radio>

// Group — default style
<Radio.Group onChange={onChange} value={value}>
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
  <Radio value="c">Option C</Radio>
</Radio.Group>

// Group — button outline style
<Radio.Group optionType="button" options={options} value={value} />

// Group — button solid style
<Radio.Group optionType="button" buttonStyle="solid" options={options} value={value} />

// Group sizes (button style)
<Radio.Group size="large" optionType="button" options={options} />
<Radio.Group size="small" optionType="button" options={options} />

// Group disabled
<Radio.Group disabled options={options} value={value} />
```

---

## 9. Switch

**Docs:** https://ant.design/components/switch/  
**Component Keys:** `Switch / Text and Icon` → `529c318d`

### Checked State Variants

| Variant | Prop | Visual |
|---|---|---|
| `Checked=False` | `checked={false}` | Gray track |
| `Checked=True` | `checked={true}` | Blue `#3e4be0` track |

### Size Variants

| Variant | `size` Prop | Track H | Handle |
|---|---|---|---|
| `Size=Default` | — | `22px` | `18px` circle |
| `Size=Small` | `size="small"` | `16px` | `12px` circle |

### Disabled Variants

| Variant | Prop |
|---|---|
| `Disabled=False` | — |
| `Disabled=True` | `disabled` |

### Content Variants (Text and Icon)

| Variant | Props | Description |
|---|---|---|
| No label | — | Plain toggle |
| `checkedChildren` / `unCheckedChildren` text | `checkedChildren="On"` | Label inside switch |
| `checkedChildren` icon | `checkedChildren={<CheckOutlined />}` | Icon inside switch |

### Loading Variant

| Variant | Prop |
|---|---|
| `Loading=True` | `loading` |

```jsx
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

// Basic
<Switch defaultChecked />
<Switch />

// Sizes
<Switch size="small" defaultChecked />

// With labels
<Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />

// Disabled
<Switch disabled />
<Switch disabled defaultChecked />

// Loading
<Switch loading defaultChecked />
<Switch loading />
```

---

## 10. Alert

**Docs:** https://ant.design/components/alert/  
**Component Key:** `907640985c...`  
**Updated:** 2026-03-24 (most recently updated component)

### Type Variants

| Variant | `type` Prop | Color | Icon |
|---|---|---|---|
| `Type=Success` | `type="success"` | Green | ✓ CheckCircleFilled |
| `Type=Info` | `type="info"` | Blue | ℹ InfoCircleFilled |
| `Type=Warning` | `type="warning"` | Gold | ⚠ ExclamationCircleFilled |
| `Type=Error` | `type="error"` | Red | ✕ CloseCircleFilled |

### Display Variants

| Variant | Props | Description |
|---|---|---|
| `ShowIcon=False` | — | Text only, no icon |
| `ShowIcon=True` | `showIcon` | Icon + text |
| `Banner=True` | `banner` | Full-width top banner style |
| `Closable=True` | `closable` | Shows close ✕ button |

### Description Variants

| Variant | Props |
|---|---|
| Title only | `message="Alert message"` |
| Title + description | `message="Title" description="Detail..."` |

### Action Variant

| Variant | Props |
|---|---|
| With action | `action={<Button size="small">...</Button>}` |

```jsx
import { Alert, Button } from 'antd';

// All types
<Alert message="Success!" type="success" />
<Alert message="Info" type="info" />
<Alert message="Warning" type="warning" />
<Alert message="Error" type="error" />

// With icon
<Alert message="Success!" type="success" showIcon />
<Alert message="Warning" type="warning" showIcon />

// With description
<Alert
  message="Success Title"
  description="Detailed description and advice about success situation."
  type="success"
  showIcon
/>

// Closable
<Alert message="Info" type="info" closable onClose={onClose} />

// Banner
<Alert message="Warning banner" type="warning" banner />

// With action
<Alert
  message="Error"
  type="error"
  showIcon
  action={<Button size="small" danger>Detail</Button>}
/>
```

---

## 11. Tag

**Docs:** https://ant.design/components/tag/  
**Component Keys:** `Tag/Basic` → `ac11db53`, `Tag/Colorful` → `1fafaf68`, `Tag/Status` → `8c0de584`, `Tag/Checkable` → `7ffd9397`, `Tag/Icon` → `e1688183`

### Tag / Basic Variants

| Variant | Props | Description |
|---|---|---|
| Default tag | `<Tag>` | Light gray bg |
| Closable | `closable` | Adds ✕ button |
| `Color=Default` | — | Gray |
| `Icon=True` | `icon={...}` | With leading icon |

### Tag / Colorful Variants (preset colors)

| Color | Prop |
|---|---|
| `magenta` | `color="magenta"` |
| `red` | `color="red"` |
| `volcano` | `color="volcano"` |
| `orange` | `color="orange"` |
| `gold` | `color="gold"` |
| `lime` | `color="lime"` |
| `green` | `color="green"` |
| `cyan` | `color="cyan"` |
| `blue` | `color="blue"` |
| `geekblue` | `color="geekblue"` |
| `purple` | `color="purple"` |
| Custom hex | `color="#87d068"` |

### Tag / Status Variants

| Variant | Description | Icon |
|---|---|---|
| `Status1` — Success | `color="success"` | CheckCircleOutlined |
| `Status2` — Processing | `color="processing"` | SyncOutlined (spin) |
| `Status3` — Default | `color="default"` | MinusCircleOutlined |
| `Status4` — Error | `color="error"` | CloseCircleOutlined |
| `Status5` — Warning | `color="warning"` | ExclamationCircleOutlined |
| `Status6` — Stop | `color="default"` + MinusCircleOutlined | Stop variant |

### Tag / Checkable Variants

| Variant | Prop | Description |
|---|---|---|
| `Checked=False` | `checked={false}` | Unselected state |
| `Checked=True` | `checked={true}` | Selected (blue bg) |

### Tag / Icon Variant

Custom-colored tags with social/brand icons (e.g., TwitterOutlined).

### Size (all tags)

Tags do not have a `size` prop — they are fixed-height inline elements (~22px default).

```jsx
import { Tag } from 'antd';
import {
  CheckCircleOutlined, SyncOutlined, CloseCircleOutlined,
  ExclamationCircleOutlined, MinusCircleOutlined, TwitterOutlined
} from '@ant-design/icons';

// Basic
<Tag>Default</Tag>
<Tag closable onClose={onClose}>Closable</Tag>

// Colorful presets
<Tag color="magenta">magenta</Tag>
<Tag color="red">red</Tag>
<Tag color="orange">orange</Tag>
<Tag color="green">green</Tag>
<Tag color="blue">blue</Tag>
<Tag color="purple">purple</Tag>

// Custom color
<Tag color="#2db7f5">#2db7f5</Tag>
<Tag color="#87d068">#87d068</Tag>

// Status
<Tag icon={<CheckCircleOutlined />} color="success">success</Tag>
<Tag icon={<SyncOutlined spin />} color="processing">processing</Tag>
<Tag icon={<CloseCircleOutlined />} color="error">error</Tag>
<Tag icon={<ExclamationCircleOutlined />} color="warning">warning</Tag>
<Tag icon={<MinusCircleOutlined />} color="default">stop</Tag>

// Icon (custom color)
<Tag icon={<TwitterOutlined />} color="#55acee">Twitter</Tag>

// Checkable
const { CheckableTag } = Tag;
<CheckableTag checked={checked} onChange={setChecked}>Checkable</CheckableTag>

// Dynamic add/remove
<Tag.CheckableTag>Tag</Tag.CheckableTag>
```

---

## 12. Pagination

**Docs:** https://ant.design/components/pagination/  
**Component Key:** `8c8bb90b...`  
**Node ID:** `415:211`

### Top-Level Variants

| Variant | Node ID | Props | Width |
|---|---|---|---|
| `Variant=Basic` | `415:207` | `defaultCurrent={1} total={50}` | `272px` |
| `Variant=Jumper` | `415:209` | `showQuickJumper total={500}` | `622px` |
| `Variant=Mini` | `415:208` | `size="small" total={50}` | `192px` |
| `Variant=Mini Jumper` | `415:210` | `size="small" showSizeChanger showQuickJumper` | `411px` |
| `Variant=More` | `415:205` | `showSizeChanger total={500}` | `590px` |
| `Variant=Simple` | `415:206` | `simple total={50}` | `184px` |
| `Variant=Prev and next` | `1728:44051` | text nav only | `302px` |

### Pagination Item / Number Sub-component

All 12 state combinations:

| Variant Name | Size | State | Disabled |
|---|---|---|---|
| `Size=Default, State=Default, Disabled=False` | 32px | Resting | No |
| `Size=Default, State=Default, Disabled=True` | 32px | Resting | Yes |
| `Size=Default, State=Hover, Disabled=False` | 32px | Hover | No |
| `Size=Default, State=Hover, Disabled=True` | 32px | Hover | Yes |
| `Size=Default, State=Active, Disabled=False` | 32px | Active (selected) | No |
| `Size=Default, State=Active, Disabled=True` | 32px | Active | Yes |
| `Size=Small, State=Default, Disabled=False` | 24px | Resting | No |
| `Size=Small, State=Default, Disabled=True` | 24px | Resting | Yes |
| `Size=Small, State=Hover, Disabled=False` | 24px | Hover | No |
| `Size=Small, State=Hover, Disabled=True` | 24px | Hover | Yes |
| `Size=Small, State=Active, Disabled=False` | 24px | Active | No |
| `Size=Small, State=Active, Disabled=True` | 24px | Active | Yes |

**Active token:** `border: 1px solid #3e4be0; background: white; color: #3e4be0; font-weight: 600`

### Pagination Item / Arrow Sub-component

18 variants:

| Type | Size | State | Direction |
|---|---|---|---|
| `Type=Arrow` | Default | Default | Left |
| `Type=Arrow` | Default | Hover | Left |
| `Type=Arrow` | Default | Disabled | Left |
| `Type=Arrow` | Small | Default | Left |
| `Type=Arrow` | Small | Hover | Left |
| `Type=Arrow` | Small | Disabled | Left |
| `Type=Arrow` | Default | Default | Right |
| `Type=Arrow` | Default | Hover | Right |
| `Type=Arrow` | Default | Disabled | Right |
| `Type=Arrow` | Small | Default | Right |
| `Type=Arrow` | Small | Hover | Right |
| `Type=Arrow` | Small | Disabled | Right |
| `Type=Text` | Default | Default | Left ("Previous") |
| `Type=Text` | Default | Hover | Left |
| `Type=Text` | Default | Disabled | Left |
| `Type=Text` | Default | Default | Right ("Next") |
| `Type=Text` | Default | Hover | Right |
| `Type=Text` | Default | Disabled | Right |

### Pagination Item / More Sub-component

4 variants:

| State | Direction |
|---|---|
| Default | Left |
| Hover | Left |
| Default | Right |
| Hover | Right |

### Design Tokens

| Token | Value |
|---|---|
| `colorPrimary` | `#3e4be0` |
| `colorText` | `rgba(0,0,0,0.88)` |
| `colorTextDisabled` | `rgba(0,0,0,0.25)` |
| `itemActiveBg` | white |
| `itemInputBg` | white |
| `borderRadius` | `6px` |
| `lineWidth` | `1px` |
| `marginXXS` | `4px` |
| `marginXS` | `8px` |
| `margin` | `16px` |
| `fontWeightStrong` | `600` |
| `fontSize` | `14px` |

```jsx
import { Pagination } from 'antd';

<Pagination defaultCurrent={1} total={50} />
<Pagination size="small" total={50} />
<Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
<Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
<Pagination simple defaultCurrent={2} total={50} />
<Pagination size="small" total={50} showTotal={t => `Total ${t} items`} showSizeChanger showQuickJumper />
<Pagination disabled defaultCurrent={1} total={50} />
<Pagination showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`} total={500} />
```

---

## 13. Table

**Docs:** https://ant.design/components/table/  
**Component Keys:** `Table` → `9616b0a8`, `Table/Table cell` → `9f601502`, `Table/Table Item/Header Item` → `046943b0`, `Table/Table Item/Dropdown Item` → `70f5abdb`

### Table Top-Level Variants

| Variant | `size` Prop | Description |
|---|---|---|
| `Size=Default` | — | Standard row height (`54px` body) |
| `Size=Middle` | `size="middle"` | Medium row height |
| `Size=Small` | `size="small"` | Compact row height |

### Table Cell Variants (`Table / Table cell`)

| Variant | Props | Description |
|---|---|---|
| `Type=Body/Text` | — | Plain text cell |
| `Type=Body/Custom` | — | Cell with custom content |
| `Type=Header` | — | Column header cell |
| `Selected=True` | `rowSelection` | Row selected (blue row bg) |
| `Selected=False` | — | Normal row |
| `Hovering=True` | (hover state) | Hover row highlight |
| `Ellipsis=True` | `ellipsis: true` in column def | Truncated text |
| `Align=Left` | `align: 'left'` | Left-aligned |
| `Align=Center` | `align: 'center'` | Center-aligned |
| `Align=Right` | `align: 'right'` | Right-aligned |
| `Width=Small` | narrow column | ~80px |
| `Width=Middle` | medium column | ~120px |
| `Width=Large` | wide column | ~200px |

### Table Header Item Variants (`Table Item / Header Item`)

| Variant | Description |
|---|---|
| `Default/True/No/No` | Sortable, no filter, no fixed |
| `Middle/True/No/No` | Sortable, middle size |
| `With filter` | `filters` + `onFilter` prop |
| `With sort` | `sorter` prop |
| `Fixed left` | `fixed: 'left'` |
| `Fixed right` | `fixed: 'right'` |

### Table Header Dropdown Item Variants

| Variant | Description |
|---|---|
| Sort Ascending | Arrow up icon |
| Sort Descending | Arrow down icon |
| Filter | Filter icon + dropdown |
| Clear filters | Reset option |

### Selection Variants

| Variant | `rowSelection.type` | Description |
|---|---|---|
| None | — | No selection |
| Checkbox | `type: 'checkbox'` | Multi-select |
| Radio | `type: 'radio'` | Single select |

### Expand Variants

| Variant | Props |
|---|---|
| Expandable row | `expandable={{ expandedRowRender }}` |
| Nested table | Nested `<Table>` in expandedRowRender |
| Tree data | `dataSource` with `children` key |

```jsx
import { Table } from 'antd';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: 'Age', dataIndex: 'age', key: 'age', align: 'right' },
  { title: 'Address', dataIndex: 'address', key: 'address', ellipsis: true },
  { title: 'Action', key: 'action', render: (_, record) => <a>Delete</a>, fixed: 'right' },
];

// Basic
<Table columns={columns} dataSource={data} rowKey="key" />

// Sizes
<Table size="middle" columns={columns} dataSource={data} />
<Table size="small" columns={columns} dataSource={data} />

// Row selection
<Table
  rowSelection={{ type: 'checkbox', onChange: onSelectChange }}
  columns={columns}
  dataSource={data}
/>

// Pagination
<Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />

// Expandable
<Table
  expandable={{ expandedRowRender: record => <p>{record.description}</p> }}
  columns={columns}
  dataSource={data}
/>

// Fixed columns + scroll
<Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
```

---

## 14. Tree

**Docs:** https://ant.design/components/tree/  
**Component Key:** `3c3b033f...`

### Feature Variants

| Variant | Prop | Description |
|---|---|---|
| Basic tree | — | Expandable tree |
| `Checkable=True` | `checkable` | Checkbox on each node |
| `ShowLine=True` | `showLine` | Vertical connector lines |
| `ShowLine=False` | — | No lines |
| Draggable | `draggable` | Drag-and-drop reorder |
| Directory | `<Tree.DirectoryTree>` | Folder-style icons |
| Virtual scroll | `virtual height={400}` | Large dataset |

### Node State Variants

| State | Description |
|---|---|
| Default | Collapsed leaf |
| Expanded | Open parent node |
| Selected | Active/clicked node |
| Checked | Checkbox checked |
| Indeterminate | Partial children checked |
| Disabled | `disableCheckbox` or `disabled` on node |
| Loading | Async data loading |

### Icon Variants

| Variant | Prop |
|---|---|
| Default (no icon) | — |
| Custom icon | `icon` in tree data node |
| Folder icons | `<Tree.DirectoryTree>` |
| Switch icon | `switcherIcon` prop |

```jsx
import { Tree } from 'antd';

const treeData = [
  {
    title: 'Parent 1', key: '0-0',
    children: [
      { title: 'Child 1-0', key: '0-0-0', disabled: true,
        children: [
          { title: 'Leaf', key: '0-0-0-0', disableCheckbox: true },
          { title: 'Leaf', key: '0-0-0-1' },
        ]
      },
      { title: 'Child 1-1', key: '0-0-1' },
    ],
  },
];

// Basic
<Tree
  defaultExpandedKeys={['0-0-0', '0-0-1']}
  defaultSelectedKeys={['0-0-0']}
  onSelect={onSelect}
  treeData={treeData}
/>

// Checkable
<Tree
  checkable
  defaultCheckedKeys={['0-0-0']}
  onCheck={onCheck}
  treeData={treeData}
/>

// With lines
<Tree showLine treeData={treeData} />

// Directory style
<Tree.DirectoryTree defaultExpandAll treeData={treeData} />

// Draggable
<Tree draggable onDrop={onDrop} treeData={treeData} />
```

---

## 15. Calendar

**Docs:** https://ant.design/components/calendar/  
**Component Key:** `011983d0...`

### Display Mode Variants

| Variant | `fullscreen` Prop | Description |
|---|---|---|
| `Fullscreen=True` | `fullscreen={true}` (default) | Full page calendar |
| `Fullscreen=False` (Card) | `fullscreen={false}` | Compact card calendar |

### View Mode Variants

| Variant | `mode` Prop |
|---|---|
| `Mode=Month` | `mode="month"` |
| `Mode=Year` | `mode="year"` |

### TimePicker Menu (sub-component)

| Variant | Key | Description |
|---|---|---|
| TimePicker Menu | `38e75ef4...` | Scrollable hour/minute/second picker |

```jsx
import { Calendar } from 'antd';

// Full calendar
<Calendar onPanelChange={(value, mode) => console.log(value.format('YYYY-MM-DD'), mode)} />

// Card calendar
<Calendar fullscreen={false} onPanelChange={onPanelChange} />

// Custom header with month/year selectors
<Calendar
  fullscreen={false}
  headerRender={({ value, type, onChange, onTypeChange }) => (
    <div style={{ padding: 8 }}>
      <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
        <Radio.Button value="month">Month</Radio.Button>
        <Radio.Button value="year">Year</Radio.Button>
      </Radio.Group>
      <Select size="small" value={value.year()} onChange={year => onChange(value.clone().year(year))} />
      <Select size="small" value={value.month()} onChange={month => onChange(value.clone().month(month))} />
    </div>
  )}
/>

// Cell customization
<Calendar
  dateCellRender={date => <ul>{getListData(date).map(item => <li key={item.content}>{item.content}</li>)}</ul>}
/>
```

---

## 16. Modal

**Docs:** https://ant.design/components/modal/  
**Component Keys:** `Modal/With Overlay` → `c40770cc`, `Modal/Confirmation` → `10188538`

### Modal Variants

| Variant | Key | Props | Description |
|---|---|---|---|
| `With Overlay` | `c40770cc...` | — | Standard dialog + backdrop |
| `Confirmation` | `10188538...` | `Modal.confirm()` | Confirm/cancel dialog |

### Modal Size Variants

| Variant | `width` Prop |
|---|---|
| Default | `520px` |
| Custom | `width={800}` |
| Full screen | `style={{ top: 0 }} width="100vw"` |

### Modal Position Variants

| Variant | Props |
|---|---|
| Centered | `centered` |
| Default (top 100px) | — |

### Modal Content Variants

| Variant | Props |
|---|---|
| Title only | `title="Title"` |
| Title + body | `title` + `children` |
| No close button | `closable={false}` |
| Custom footer | `footer={null}` or custom |
| Confirm type | `Modal.confirm()` |
| Info type | `Modal.info()` |
| Success type | `Modal.success()` |
| Warning type | `Modal.warning()` |
| Error type | `Modal.error()` |

### Confirmation Variants

| Variant | Usage |
|---|---|
| Confirm | `Modal.confirm({ title, onOk })` |
| Delete (danger) | `okType: 'danger'` |
| Async OK | `onOk: () => new Promise(...)` |
| Disabled OK | `okButtonProps: { disabled: true }` |

```jsx
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// Basic modal
const [open, setOpen] = useState(false);
<>
  <Button onClick={() => setOpen(true)}>Open</Button>
  <Modal title="Basic" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
    <p>Content...</p>
  </Modal>
</>

// Centered
<Modal centered open={open} onCancel={() => setOpen(false)}>...</Modal>

// No footer
<Modal footer={null} open={open}>...</Modal>

// Confirm dialog variants
Modal.confirm({ title: 'Confirm?', icon: <ExclamationCircleOutlined />, content: 'Details' });
Modal.confirm({ title: 'Delete?', okText: 'Yes', okType: 'danger', cancelText: 'No' });
Modal.info({ title: 'Info', content: 'Something...' });
Modal.success({ title: 'Success!', content: 'Done.' });
Modal.warning({ title: 'Warning', content: 'Be careful.' });
Modal.error({ title: 'Error', content: 'Something went wrong.' });
```

---

## 17. Dropdown

**Docs:** https://ant.design/components/dropdown/  
**Component Key:** `9cc752a3...`

### Trigger Variants

| Variant | `trigger` Prop |
|---|---|
| `Trigger=Hover` | `trigger={['hover']}` (default) |
| `Trigger=Click` | `trigger={['click']}` |
| `Trigger=ContextMenu` | `trigger={['contextMenu']}` |

### Placement Variants

| Variant | `placement` Prop |
|---|---|
| `bottomLeft` | `placement="bottomLeft"` (default) |
| `bottomCenter` | `placement="bottomCenter"` |
| `bottomRight` | `placement="bottomRight"` |
| `topLeft` | `placement="topLeft"` |
| `topCenter` | `placement="topCenter"` |
| `topRight` | `placement="topRight"` |

### Arrow Variants

| Variant | `arrow` Prop |
|---|---|
| `Arrow=False` | — (default) |
| `Arrow=True` | `arrow={true}` |
| Arrow centered | `arrow={{ pointAtCenter: true }}` |

### Disabled Variant

| Variant | Prop |
|---|---|
| `Disabled=True` | `disabled` |

### Menu Item Variants (Dropdown.Menu)

| Variant | `type` in item | Description |
|---|---|---|
| Normal item | — | Clickable menu item |
| Divider | `type: 'divider'` | Horizontal rule |
| Sub-menu | `children: [...]` | Nested menu |
| Danger item | `danger: true` | Red text |
| Disabled item | `disabled: true` | Grayed out |
| Item with icon | `icon: <MailOutlined />` | Leading icon |

### Button Dropdown Variant

`<Dropdown.Button>` — combines a main button with a dropdown trigger.

```jsx
import { Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const items = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2', icon: <MailOutlined /> },
  { type: 'divider' },
  { key: '3', label: 'Danger', danger: true },
  { key: '4', label: 'Disabled', disabled: true },
];

// Hover trigger (default)
<Dropdown menu={{ items }}><a>Hover me</a></Dropdown>

// Click trigger
<Dropdown menu={{ items }} trigger={['click']}>
  <Button>Click <DownOutlined /></Button>
</Dropdown>

// Context menu
<Dropdown menu={{ items }} trigger={['contextMenu']}>
  <div style={{ width: 200, height: 100, background: '#eee' }}>Right click here</div>
</Dropdown>

// With arrow
<Dropdown menu={{ items }} arrow><Button>Arrow</Button></Dropdown>

// Button dropdown
<Dropdown.Button menu={{ items }} onClick={handleButtonClick}>
  Main Action
</Dropdown.Button>

// Placements
<Dropdown menu={{ items }} placement="topLeft"><Button>Top Left</Button></Dropdown>
```

---

## 18. Popover

**Docs:** https://ant.design/components/popover/  
**Component Key:** `96d7ae86...`

### Placement Variants (12 total)

| Variant | `placement` Prop |
|---|---|
| `top` | `placement="top"` |
| `topLeft` | `placement="topLeft"` |
| `topRight` | `placement="topRight"` |
| `bottom` | `placement="bottom"` |
| `bottomLeft` | `placement="bottomLeft"` |
| `bottomRight` | `placement="bottomRight"` |
| `left` | `placement="left"` |
| `leftTop` | `placement="leftTop"` |
| `leftBottom` | `placement="leftBottom"` |
| `right` | `placement="right"` |
| `rightTop` | `placement="rightTop"` |
| `rightBottom` | `placement="rightBottom"` |

### Trigger Variants

| Variant | `trigger` Prop |
|---|---|
| Hover | `trigger="hover"` (default) |
| Click | `trigger="click"` |
| Focus | `trigger="focus"` |

### Content Variants

| Variant | Props |
|---|---|
| Title + content | `title="Title" content={<div>...</div>}` |
| Content only | `content={...}` |
| With close button | Custom content with close action |

```jsx
import { Popover, Button } from 'antd';

const content = <div><p>Content line 1</p><p>Content line 2</p></div>;

<Popover content={content} title="Title">
  <Button>Hover me</Button>
</Popover>

// Click trigger
<Popover content={content} title="Title" trigger="click">
  <Button>Click me</Button>
</Popover>

// All placements
<Popover placement="topLeft" content={content}><Button>TL</Button></Popover>
<Popover placement="top" content={content}><Button>Top</Button></Popover>
<Popover placement="bottom" content={content}><Button>Bottom</Button></Popover>
```

---

## 19. Tour

**Docs:** https://ant.design/components/tour/  
**Component Key:** `31b14038...`

### Step Variants

| Variant | Props | Description |
|---|---|---|
| With target | `target: () => ref.current` | Highlights element |
| Floating (no target) | `target: null` | Center-screen floating step |
| With cover image | `cover: <img>` | Image above title |
| With description | `description: "..."` | Text body |

### Indicator Variants

| Variant | `indicatorsRender` Prop |
|---|---|
| Default dots | — |
| Custom | `indicatorsRender={(current, total) => <span>{current + 1}/{total}</span>}` |

### Type Variants

| Variant | `type` Prop | Description |
|---|---|---|
| `Type=Default` | `type="default"` | Light bg |
| `Type=Primary` | `type="primary"` | Blue bg |

### Arrow Variant

| Variant | `arrow` Prop |
|---|---|
| With arrow | `arrow={true}` (default) |
| No arrow | `arrow={false}` |

```jsx
import { Tour, Button } from 'antd';
import { useRef, useState } from 'react';

const ref1 = useRef(null);
const ref2 = useRef(null);
const [open, setOpen] = useState(false);

const steps = [
  {
    title: 'Upload File',
    description: 'Put your files here.',
    cover: <img alt="cover" src="/cover.png" />,
    target: () => ref1.current,
  },
  {
    title: 'Save',
    description: 'Save your changes.',
    target: () => ref2.current,
    type: 'primary',
  },
  {
    title: 'Floating step (no target)',
    description: 'This floats in the center.',
    target: null,
  },
];

<>
  <Button ref={ref1} onClick={() => setOpen(true)}>Start Tour</Button>
  <Button ref={ref2}>Save</Button>
  <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
</>
```

---

## 20. Float Button

**Docs:** https://ant.design/components/float-button/  
**Component Keys:** `FloatButton` → `c58cf791`, `FloatButton Group` → `178ec46e`, `FloatButton Menu` → `40124700`

### Float Button Shape Variants

| Variant | `shape` Prop | Size |
|---|---|---|
| `Shape=Circle` | `shape="circle"` (default) | 40px diameter |
| `Shape=Square` | `shape="square"` | 40×40px |

### Float Button Type Variants

| Variant | `type` Prop | Visual |
|---|---|---|
| `Type=Default` | — | White bg, gray icon |
| `Type=Primary` | `type="primary"` | Blue `#3e4be0` bg, white icon |

### Float Button Content Variants

| Variant | Props |
|---|---|
| Icon only | `icon={<QuestionCircleOutlined />}` |
| Icon + description | `icon={...} description="Help"` |
| Back to top | `<FloatButton.BackTop />` |

### Float Button Group Variants

| Variant | `shape` | `trigger` | Description |
|---|---|---|---|
| Static circle group | `shape="circle"` | — | Always visible stack |
| Static square group | `shape="square"` | — | Square stack |
| Trigger click menu | any | `trigger="click"` | Expands on click |
| Trigger hover menu | any | `trigger="hover"` | Expands on hover |

### Float Button Menu Variants

| Variant | Key | Description |
|---|---|---|
| Click trigger | `40124700...` | `trigger="click"` + child buttons |
| Hover trigger | — | `trigger="hover"` + child buttons |

```jsx
import { FloatButton } from 'antd';
import { QuestionCircleOutlined, CustomerServiceOutlined, CommentOutlined } from '@ant-design/icons';

// Basic
<FloatButton icon={<QuestionCircleOutlined />} onClick={() => console.log('click')} />

// Primary
<FloatButton type="primary" icon={<QuestionCircleOutlined />} />

// Square shape
<FloatButton shape="square" description="HELP" icon={<QuestionCircleOutlined />} />

// Back to top
<FloatButton.BackTop />

// Static group
<FloatButton.Group shape="circle" style={{ right: 24 }}>
  <FloatButton icon={<QuestionCircleOutlined />} />
  <FloatButton />
  <FloatButton.BackTop visibilityHeight={0} />
</FloatButton.Group>

// Square group
<FloatButton.Group shape="square" style={{ right: 94 }}>
  <FloatButton icon={<QuestionCircleOutlined />} />
  <FloatButton />
</FloatButton.Group>

// Trigger menu (click)
<FloatButton.Group
  trigger="click"
  type="primary"
  icon={<CustomerServiceOutlined />}
>
  <FloatButton icon={<CommentOutlined />} />
  <FloatButton icon={<CustomerServiceOutlined />} />
</FloatButton.Group>

// Trigger menu (hover)
<FloatButton.Group trigger="hover" icon={<CustomerServiceOutlined />}>
  <FloatButton />
</FloatButton.Group>
```

---

## 21. Upload

**Docs:** https://ant.design/components/upload/  
**Component Keys:** `Upload/Button` → `638df545`, `Upload/Files List` → `cf3f6640`

### Upload Trigger Variants

| Variant | Component / Props | Description |
|---|---|---|
| `Upload/Button` | `<Upload><Button /></Upload>` | Click-to-upload button |
| Drag & Drop | `<Upload.Dragger>` | Full drag area |
| Avatar upload | `<Upload showUploadList={false} />` | Single image upload |
| Picture-card | `listType="picture-card"` | Grid of uploaded images |

### Upload List Type Variants

| Variant | `listType` Prop | Description |
|---|---|---|
| `listType=text` | `listType="text"` (default) | Text list with file names |
| `listType=picture` | `listType="picture"` | Thumbnail + text |
| `listType=picture-card` | `listType="picture-card"` | Card grid |
| `listType=picture-circle` | `listType="picture-circle"` | Circle card grid |

### Upload File State Variants (`Upload List Item`)

| State | Description |
|---|---|
| Uploading | Progress bar |
| Done | Checkmark |
| Error | Error message + retry |
| Removed | File removed |

### Upload List Item Sub-variants

| Variant | Key | Description |
|---|---|---|
| Picture/Large Img/Card | `7cb90d8c...` | Large image card variant |

### Disabled Variant

| Variant | Prop |
|---|---|
| `Disabled=True` | `disabled` |

### Multiple vs Single

| Variant | Props |
|---|---|
| Single file | — |
| Multiple files | `multiple` |
| Directory | `directory` |

```jsx
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const props = {
  action: 'https://httpbin.org/post',
  onChange({ file, fileList }) { console.log(file, fileList); },
  defaultFileList: [
    { uid: '1', name: 'file.png', status: 'done', url: '...' },
    { uid: '2', name: 'error.png', status: 'error' },
  ],
};

// Button upload
<Upload {...props}>
  <Button icon={<UploadOutlined />}>Upload</Button>
</Upload>

// Drag & Drop
<Upload.Dragger action="https://httpbin.org/post" multiple>
  <p><InboxOutlined /></p>
  <p>Click or drag file to this area to upload</p>
</Upload.Dragger>

// Picture card
<Upload action="..." listType="picture-card" fileList={fileList} onChange={onChange}>
  <button type="button"><UploadOutlined /><div>Upload</div></button>
</Upload>

// Disabled
<Upload disabled><Button icon={<UploadOutlined />}>Upload (Disabled)</Button></Upload>
```

---

## 22. Space

**Docs:** https://ant.design/components/space/  
**Component Key:** `0664fa4c...`

### Direction Variants

| Variant | `direction` Prop |
|---|---|
| `Direction=Horizontal` | `direction="horizontal"` (default) |
| `Direction=Vertical` | `direction="vertical"` |

### Size Variants

| Variant | `size` Prop | Gap |
|---|---|---|
| `Size=Small` | `size="small"` | `8px` |
| `Size=Middle` | `size="middle"` (default) | `16px` |
| `Size=Large` | `size="large"` | `24px` |
| Custom | `size={[8, 16]}` | Custom [h, v] |

### Wrap Variant

| Variant | `wrap` Prop |
|---|---|
| `Wrap=False` | — |
| `Wrap=True` | `wrap` |

### Align Variants

| Variant | `align` Prop |
|---|---|
| `Align=Start` | `align="start"` |
| `Align=End` | `align="end"` |
| `Align=Center` | `align="center"` |
| `Align=Baseline` | `align="baseline"` |

### Space.Compact

Merges borders of adjacent elements (buttons, inputs, selects).

```jsx
import { Space, Button, Input } from 'antd';

// Horizontal (default)
<Space>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>

// Vertical
<Space direction="vertical">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Space>

// Sizes
<Space size="small"><Button>A</Button><Button>B</Button></Space>
<Space size="large"><Button>A</Button><Button>B</Button></Space>

// Wrap
<Space wrap>
  {Array(10).fill(<Button>Item</Button>)}
</Space>

// Compact — merges inner borders
<Space.Compact>
  <Input defaultValue="https://ant.design" />
  <Button type="primary">Submit</Button>
</Space.Compact>

<Space.Compact direction="vertical">
  <Input placeholder="Username" />
  <Input.Password placeholder="Password" />
</Space.Compact>
```

---

## 23. Divider

**Docs:** https://ant.design/components/divider/  
**Component Key:** `ac1533af...`

### Orientation Variants

| Variant | `type` Prop |
|---|---|
| `Type=Horizontal` | `type="horizontal"` (default) |
| `Type=Vertical` | `type="vertical"` |

### Text Orientation Variants (horizontal only)

| Variant | `orientation` Prop |
|---|---|
| `Orientation=Left` | `orientation="left"` |
| `Orientation=Center` | `orientation="center"` (default) |
| `Orientation=Right` | `orientation="right"` |

### Text Margin Variants

| Variant | `orientationMargin` Prop | Description |
|---|---|---|
| Default margin | — | Standard spacing |
| Custom margin | `orientationMargin={0}` | Flush to edge |

### Dashed Variant

| Variant | `dashed` Prop |
|---|---|
| Solid | — (default) |
| `Dashed=True` | `dashed` |

### With/Without Text

| Variant | Props |
|---|---|
| Plain line | `<Divider />` |
| With text | `<Divider>Text</Divider>` |
| With plain text | `plain` (smaller font) |

```jsx
import { Divider } from 'antd';

// Horizontal
<Divider />
<Divider>With Text</Divider>
<Divider orientation="left">Left</Divider>
<Divider orientation="right">Right</Divider>
<Divider dashed />
<Divider dashed>Dashed with text</Divider>
<Divider plain>Plain style text</Divider>
<Divider orientation="left" orientationMargin={0}>No margin</Divider>

// Vertical (inline)
<span>Text</span>
<Divider type="vertical" />
<a>Link 1</a>
<Divider type="vertical" />
<a>Link 2</a>
```

---

## Component Index

| Component | Type | Key | Updated |
|---|---|---|---|
| Alert | Component Set | `907640985c...` | 2026-03-24 |
| Button | Component Set | `729b3404...` | 2025-11-10 |
| Button Close | Component Set | `62af406f...` | 2025-09-07 |
| Button Group Compact | Component Set | `fa8f8617...` | 2024-12-11 |
| Button Items | Component Set | `7e36918d...` | 2025-09-07 |
| Calendar / Card | Component Set | `011983d0...` | 2025-09-07 |
| Checkbox | Component Set | `ffa04d68...` | 2025-10-29 |
| Divider Vertical | Component | `ac1533af...` | 2025-08-18 |
| Dropdown | Component Set | `9cc752a3...` | 2025-09-07 |
| FloatButton | Component Set | `c58cf791...` | 2024-05-08 |
| FloatButton Group | Component Set | `178ec46e...` | 2024-12-11 |
| FloatButton Menu | Component Set | `40124700...` | 2024-12-11 |
| Form / Form Item / Vertical | Component Set | `b0bdd198...` | 2025-11-10 |
| Modal / Confirmation | Component | `10188538...` | 2024-12-11 |
| Modal / With Overlay | Component | `c40770cc...` | 2026-01-21 |
| Pagination | Component Set | `8c8bb90b...` | 2025-11-10 |
| Popover | Component Set | `96d7ae86...` | 2024-12-11 |
| Radio | Component Set | `93dfb11b...` | 2025-10-27 |
| Radio Group | Component Set | `4ae5ec5c...` | 2024-12-11 |
| Space | Component Set | `0664fa4c...` | 2024-09-13 |
| Switch / Text and Icon | Component Set | `529c318d...` | 2025-09-07 |
| Table | Component Set | `9616b0a8...` | 2025-08-05 |
| Table / Table cell | Component Set | `9f601502...` | 2025-10-31 |
| Table / Table Item / Header Item | Component Set | `046943b0...` | 2025-11-10 |
| Table / Table Item / Dropdown Item | Component Set | `70f5abdb...` | 2025-11-10 |
| Tag / Basic | Component Set | `ac11db53...` | 2025-11-10 |
| Tag / Checkable | Component Set | `7ffd9397...` | 2025-09-07 |
| Tag / Colorful | Component Set | `1fafaf68...` | 2025-11-10 |
| Tag / Icon | Component | `e1688183...` | 2024-08-09 |
| Tag / Status | Component Set | `8c0de584...` | 2025-08-09 |
| Tag / Status/Status6 | Component | `b6bcc51b...` | 2024-09-09 |
| TimePicker Menu | Component | `38e75ef4...` | 2024-12-11 |
| Tour | Component Set | `31b14038...` | 2024-12-11 |
| Tree | Component Set | `3c3b033f...` | 2024-12-11 |
| Upload / Button | Component Set | `638df545...` | 2025-03-05 |
| Upload / Files List | Component | `cf3f6640...` | 2025-03-05 |
| Upload List Item (Picture/Large) | Component | `7cb90d8c...` | 2024-12-11 |
| AutoComplete / With Button | Component Set | `ea3a71ae...` | 2026-01-20 |

---

*Generated from: Figma MCP — 👉 5.16 Ant Design System for Figma*  
*Design token namespace: `Components/*` and `Typography/*`*  
*Font: Source Sans 3 — Regular (400) and SemiBold (600)*
