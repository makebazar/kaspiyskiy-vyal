import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, productName, quantity, messengerPreference, comment, items, totalAmount } = body;

    if (!customerPhone) {
      return NextResponse.json({ error: 'Укажите номер телефона' }, { status: 400 });
    }

    const order = {
      id: 'ord-' + Date.now(),
      createdAt: new Date().toISOString(),
      customerName: customerName || 'Клиент',
      customerPhone,
      productName: productName || 'Заказ рыбы',
      quantity: quantity || 1,
      totalAmount: totalAmount || 0,
      items: items || [],
      messengerPreference: messengerPreference || 'telegram',
      comment: comment || '',
      status: 'new',
    };


    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    let orders = [];
    if (fs.existsSync(ORDERS_FILE)) {
      try {
        orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
      } catch (e) {
        orders = [];
      }
    }
    orders.unshift(order);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Order error:', error);
    return NextResponse.json({ error: 'Ошибка при сохранении заявки' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
      return NextResponse.json(orders);
    }
    return NextResponse.json([]);
  } catch (e) {
    return NextResponse.json([]);
  }
}
