// File: frontend/src/layouts/AuthLayout.jsx
// Chức năng: Khung bố cục căn giữa nền #f0f4f8 với hộp .glass-panel bo tròn 24px giống hệt Login.jsx/Register.jsx của PlanbookAI-main

import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: 20,
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 440,
          padding: 40,
          borderRadius: 24,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}