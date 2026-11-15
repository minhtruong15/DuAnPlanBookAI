import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Lấy khóa GEMINI_API_KEY từ biến môi trường (.env)
const apiKey = process.env.GEMINI_API_KEY;

// Khởi tạo đối tượng GoogleGenerativeAI nếu đã cấu hình API Key thật
export const genAI = apiKey && apiKey !== 'your_google_gemini_api_key_here'
  ? new GoogleGenerativeAI(apiKey)
  : null;

// Hàm lấy mô hình Gemini 2.5 Flash (Hỗ trợ cả sinh văn bản Hóa học và đọc ảnh Vision OCR)
export const getGeminiModel = (modelName = 'gemini-2.5-flash') => {
  if (!genAI) return null;
  return genAI.getGenerativeModel({ model: modelName });
};