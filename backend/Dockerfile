# Sử dụng hệ điều hành Linux Alpine tích hợp sẵn Node.js phiên bản 20
FROM node:20-alpine

# Thiết lập thư mục làm việc bên trong Container Backend
WORKDIR /app

# Sao chép file package.json và thư mục prisma vào trước
COPY package*.json ./
COPY prisma ./prisma/

# Cài đặt toàn bộ thư viện Backend (Express, Prisma, JWT, Bcrypt, Gemini AI, Supabase)
RUN npm install

# Tự động sinh bộ mã kết nối Prisma Client từ file schema.prisma
RUN npx prisma generate

# Sao chép toàn bộ mã nguồn trong backend/src vào Container
COPY . .

# Mở cổng 5000 cho dịch vụ RESTful API
EXPOSE 5000

# Khởi chạy máy chủ Backend Express
CMD ["npm", "start"]