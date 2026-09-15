import { NextResponse } from 'next/server';
import { getProducts, saveProducts, getSettings } from '../../../lib/storage';
import { Product } from '../../../types/product';

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin, action, product, productId } = body;
    const settings = getSettings();

    if (pin !== settings.adminPin) {
      return NextResponse.json({ error: 'Неверный PIN-код доступа' }, { status: 401 });
    }

    let products = getProducts();

    if (action === 'create') {
      const newProduct: Product = {
        ...product,
        id: 'prod-' + Date.now(),
        createdAt: new Date().toISOString(),
      };
      products.unshift(newProduct);
      saveProducts(products);
      return NextResponse.json({ success: true, product: newProduct });
    } else if (action === 'update') {
      products = products.map((p) => (p.id === product.id ? { ...p, ...product } : p));
      saveProducts(products);
      return NextResponse.json({ success: true, product });
    } else if (action === 'delete') {
      products = products.filter((p) => p.id !== productId);
      saveProducts(products);
      return NextResponse.json({ success: true, deletedId: productId });
    }

    return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 });
  } catch (error) {
    console.error('API products error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
