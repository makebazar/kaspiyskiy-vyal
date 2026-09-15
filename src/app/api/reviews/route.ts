import { NextRequest, NextResponse } from 'next/server';
import { getReviews, saveReviews, getSettings } from '../../../lib/storage';
import { Review } from '../../../types/product';

export const dynamic = 'force-dynamic';

export async function GET() {
  const reviews = getReviews();
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pin, action, review, reviewId, reviews: updatedReviews } = body;

    const settings = getSettings();
    if (!pin || pin !== settings.adminPin) {
      return NextResponse.json({ error: 'Неверный PIN-код' }, { status: 401 });
    }

    let currentReviews = getReviews();

    if (action === 'create' && review) {
      const newReview: Review = {
        ...review,
        id: review.id || `rev-${Date.now()}`,
        rating: review.rating || 5,
        date: review.date || 'Только что',
        verified: review.verified !== undefined ? review.verified : true,
      };
      currentReviews = [newReview, ...currentReviews];
      saveReviews(currentReviews);
      return NextResponse.json({ success: true, reviews: currentReviews });
    }

    if (action === 'update' && review && review.id) {
      currentReviews = currentReviews.map((r) => (r.id === review.id ? { ...r, ...review } : r));
      saveReviews(currentReviews);
      return NextResponse.json({ success: true, reviews: currentReviews });
    }

    if (action === 'delete' && reviewId) {
      currentReviews = currentReviews.filter((r) => r.id !== reviewId);
      saveReviews(currentReviews);
      return NextResponse.json({ success: true, reviews: currentReviews });
    }

    if (action === 'bulk_update' && Array.isArray(updatedReviews)) {
      saveReviews(updatedReviews);
      return NextResponse.json({ success: true, reviews: updatedReviews });
    }

    return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 });
  } catch (error) {
    console.error('Error handling reviews API:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
