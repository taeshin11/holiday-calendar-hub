import { NextResponse } from 'next/server';

// Simple in-memory visitor store (resets on server restart)
// For production, use Vercel KV or a database
const visitorStore = {
  total: 12547,
  todayDate: '',
  today: 0,
};

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  if (visitorStore.todayDate !== today) {
    visitorStore.todayDate = today;
    visitorStore.today = 0;
  }

  return NextResponse.json({
    today: visitorStore.today,
    total: visitorStore.total,
  });
}
