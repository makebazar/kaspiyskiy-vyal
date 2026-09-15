import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSettings } from '../../../../lib/storage';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pin = formData.get('pin') as string;
    const file = formData.get('file') as File | null;

    const settings = getSettings();
    if (pin !== settings.adminPin) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: 'Файл не выбран' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name) || '.jpg';
    const cleanFileName = `fish_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(uploadsDir, cleanFileName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${cleanFileName}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Ошибка при сохранении файла' }, { status: 500 });
  }
}
