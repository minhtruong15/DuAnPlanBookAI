// Nhập thư viện React cốt lõi
import React from 'react';
// Nhập công cụ ReactDOM để vẽ giao diện React lên trình duyệt web
import ReactDOM from 'react-dom/client';
// Nhập file App.jsx (nơi chứa các trang Login, Register và phân quyền 4 Roles)
import App from './App.jsx';

// Tìm thẻ <div id="root"> trong file index.html và gắn toàn bộ ứng dụng <App /> vào đó
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);