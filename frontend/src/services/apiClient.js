// Nhập thư viện axios - công cụ giúp gửi HTTP Request (GET, POST, PUT, DELETE) xuống Backend
import axios from 'axios';

// Khởi tạo một cấu hình Axios dùng chung cho toàn bộ dự án PlanbookAI
const apiClient = axios.create({
  // Lấy địa chỉ Backend từ biến môi trường (.env), nếu không có thì mặc định gọi cổng 5000
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  // Khai báo dữ liệu gửi đi mặc định ở định dạng JSON
  headers: {
    'Content-Type': 'application/json',
  },
});

// CHỐT CHẶN TRƯỚC KHI GỬI ĐI (Request Interceptor):
// Tự động chạy trước mọi API để kiểm tra xem người dùng đã đăng nhập chưa
apiClient.interceptors.request.use(
  (config) => {
    // Lấy chuỗi JWT Token đã lưu trong trình duyệt lúc đăng nhập thành công
    const token = localStorage.getItem('pba_token');
    
    // Nếu có token, tự động đính kèm vào Header Authorization theo chuẩn Bearer Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Cho phép gói tin tiếp tục gửi xuống Backend
  },
  (error) => Promise.reject(error) // Nếu có lỗi cấu hình thì báo lỗi ngay
);

// CHỐT CHẶN KHI NHẬN KẾT QUẢ VỀ (Response Interceptor):
// Tự động kiểm tra phản hồi từ Backend trả về
apiClient.interceptors.response.use(
  // Nếu API thành công (mã 200, 201), trả thẳng phần dữ liệu (response.data) cho gọn
  (response) => response.data,
  (error) => {
    // Nếu Backend báo lỗi 401 (Chưa đăng nhập hoặc Token đã hết hạn)
    if (error.response && error.response.status === 401) {
      // Xóa sạch token và thông tin cũ bị hỏng trong trình duyệt
      localStorage.removeItem('pba_token');
      localStorage.removeItem('pba_user');
    }
    // Trả lỗi về để màn hình (như LoginPage) hiển thị thông báo cho người dùng biết
    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;