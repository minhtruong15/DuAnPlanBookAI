// File: frontend/src/main.jsx
// Chức năng: Điểm khởi động ứng dụng React và nạp tệp CSS định dạng toàn cục index.css

import React from 'react';
import ReactDOM from 'react-dom/client';
// Bắt buộc phải có dòng này để kích hoạt nền #f0f4f8, .glass-panel, .sidebar và .top-header
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);