// Hàm định dạng số tiền sang chuẩn Việt Nam Đồng (Ví dụ: 299000 -> "299.000 ₫")
export const formatCurrencyVND = (amount) => {
  if (amount === undefined || amount === null) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

// Hàm định dạng ngày tháng năm sang chuẩn Việt Nam (Ví dụ: "2026-11-09" -> "09/11/2026")
export const formatDateVN = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};