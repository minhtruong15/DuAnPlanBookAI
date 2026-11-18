# Sử dụng hệ điều hành Linux Alpine siêu nhẹ tích hợp sẵn Node.js phiên bản 20
FROM node:20-alpine

# Thiết lập thư mục làm việc bên trong Container Frontend
WORKDIR /app

# Sao chép file khai báo thư viện vào trước để tận dụng bộ nhớ đệm (Cache) của Docker
COPY package*.json ./

# Cài đặt toàn bộ các thư viện Frontend (React, React Router, Axios, Lucide)
RUN npm install

# Sao chép toàn bộ mã nguồn của thư mục frontend vào trong Container
COPY . .

# Mở cổng 5173 để trình duyệt truy cập vào giao diện Vite React
EXPOSE 5173

# Khởi chạy máy chủ giao diện ở chế độ mở cổng mạng (--host 0.0.0.0)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]