import { NextResponse } from 'next/server';
import { getSettings } from '../../../../lib/storage';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const settings = getSettings();

    if (pin && pin === settings.adminPin) {
      return NextResponse.json({ success: true, settings });
    }

    return NextResponse.json({ success: false, error: 'Неверный PIN-код' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
