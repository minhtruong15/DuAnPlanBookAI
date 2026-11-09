import { useState, useEffect } from 'react';

// Hook giúp trì hoãn việc gọi API tìm kiếm khi Giáo viên đang gõ phím liên tục
// Ví dụ: Chờ giáo viên ngừng gõ 400ms mới bắt đầu lọc câu hỏi Hóa học
export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Đặt hẹn giờ cập nhật giá trị sau khoảng thời gian delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nếu người dùng gõ tiếp trước khi hết giờ, xóa hẹn giờ cũ đi
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}