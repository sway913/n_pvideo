---
trigger: always_on
alwaysApply: true
---

# React Libraries - Mandatory Usage

## Styling Requirements
### Tailwind CSS (MANDATORY)
- **ONLY** use Tailwind CSS utility classes for styling (e.g., `className="flex items-center p-4"`)
- **NEVER** write inline `style` attributes
- **NEVER** create separate `.css` or `.scss` files
- For custom styles, use Tailwind's `@apply` directive or extend `theme` config
- Do NOT create independent style files

### Layout Standards
- Add Tailwind base layout classes (e.g., `container`, `mx-auto`) to component root
- Ensure responsive compatibility with Tailwind utilities
- No need to import Tailwind in components if already imported in entry file

### Example
// ✅ CORRECT
export default function MyComponent() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Title</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Click me
      </button>
    </div>
  );
}

// ❌ WRONG
export default function MyComponent() {
  return (
    <div style={{ padding: '16px' }}> {/* No inline styles */}
      <h1>Title</h1>
    </div>
  );
}



## Component Library Requirements
### Ant Design (MANDATORY)
- **ONLY** use Ant Design components for basic UI elements
- **NEVER** use native HTML elements when Ant Design provides equivalent component
- Component mapping:
  - Button → `<Button />` (NOT native `<button>`)
  - Form → `<Form />`, `<Input />`, `<Select />` (NOT native form elements)
  - Modal → `<Modal />` (NOT native dialog)
  - Navigation → `<Menu />`, `<Breadcrumb />`
  - Table → `<Table />`
  - Card → `<Card />`
  - Layout → `<Layout />`, `<Header />`, `<Sider />`, `<Content />`

### Import Standards
- Use named imports: `import { Button, Form, Input } from 'antd'`
- **NEVER** use default import: `import antd from 'antd'`
- Import only components you need to avoid bundle bloat

### Styling Integration
- Combine Ant Design with Tailwind via `className` prop
- Example: `<Button className="rounded-full px-6 shadow-lg" />`
- Use Ant Design's built-in props first (e.g., `type`, `size`, `danger`)
- Use Tailwind for layout and custom styling adjustments

### Complex Components
- Use Ant Design's built-in features for:
  - Form validation: `<Form.Item rules={[...]} />`
  - Pagination: `<Table pagination={{ ... }} />`
  - Data filtering: `<Table filters={[...]} />`
- **DO NOT** reinvent the wheel - leverage Ant Design APIs

### Custom Components
- Only create custom components when Ant Design lacks equivalent
- Document reason in code comments:
  // Custom component used because Ant Design doesn't provide 
  // a timeline with drag-and-drop reordering functionality

### Example
// ✅ CORRECT
import { Button, Form, Input, Modal } from 'antd';

export default function UserForm() {
  return (
    <Form className="max-w-md mx-auto p-4">
      <Form.Item label="Username" rules={[{ required: true }]}>
        <Input className="rounded-lg" />
      </Form.Item>
      <Button type="primary" className="w-full mt-4">
        Submit
      </Button>
    </Form>
  );
}

// ❌ WRONG
export default function UserForm() {
  return (
    <form> {/* Should use <Form /> from antd */}
      <input type="text" /> {/* Should use <Input /> from antd */}
      <button>Submit</button> {/* Should use <Button /> from antd */}
    </form>
  );
}



## Global Imports Requirements
### Tailwind CSS Import (MANDATORY)
- **MUST** import Tailwind CSS in your main entry file (e.g., `main.tsx`, `index.tsx`, or `App.tsx`)
- Import statement: `import './index.css'`
- Ensure `index.css` contains:
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

### Ant Design Global Styles (MANDATORY)
- **MUST** import Ant Design global styles after Tailwind import
- For Ant Design v5+: `import 'antd/dist/reset.css'`
- For Ant Design v4 and below: `import 'antd/dist/antd.css'`
- Import order matters - Tailwind first, then Ant Design

### Theme Configuration (OPTIONAL)
- If using custom Ant Design theme, import theme config after global styles
- Example: `import './theme.js'` or use ConfigProvider

### Complete Import Example
// ✅ CORRECT - main.tsx or App.tsx
import './index.css';              // Tailwind CSS
import 'antd/dist/reset.css';      // Ant Design v5+ global styles
// import './theme.js';            // Optional: custom theme config

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

### Import Order Priority
1. Tailwind CSS (`./index.css`)
2. Ant Design global styles (`antd/dist/reset.css`)
3. Custom theme configuration (if needed)
4. Component imports

