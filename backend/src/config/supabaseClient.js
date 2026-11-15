import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Khởi tạo kết nối tới đám mây Supabase Storage (lưu trữ ảnh phiếu trả lời trắc nghiệm OCR)
// Nếu chưa điền khóa thật trong .env thì trả về null để hệ thống dùng đường dẫn ảnh cục bộ
export const supabase =
  supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project')
    ? createClient(supabaseUrl, supabaseKey)
    : null;