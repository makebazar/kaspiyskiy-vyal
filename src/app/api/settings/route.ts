import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/storage';

export async function GET() {
  const settings = getSettings();
  // do not leak adminPin to public GET request
  const { adminPin, ...publicSettings } = settings;
  return NextResponse.json(publicSettings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin, newSettings } = body;
    const currentSettings = getSettings();

    if (pin !== currentSettings.adminPin) {
      return NextResponse.json({ error: 'Неверный PIN-код доступа' }, { status: 401 });
    }

    const updated = {
      ...currentSettings,
      ...newSettings,
      adminPin: newSettings.adminPin || currentSettings.adminPin,
    };

    saveSettings(updated);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error('API settings error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
