import { PrismaClient } from '@prisma/client';

// Khởi tạo đối tượng PrismaClient để kết nối trực tiếp tới Cơ sở dữ liệu MySQL
const prisma = new PrismaClient();

export default prisma;