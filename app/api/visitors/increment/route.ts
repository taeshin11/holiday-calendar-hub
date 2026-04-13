import { NextResponse } from 'next/server';

// Simple in-memory visitor store shared across modules
// In production, use Vercel KV: import { kv } from '@vercel/kv';
const visitorStore = {
  total: 12547,
  todayDate: '',
  today: 0,
};

export async function POST() {
  const today = new Date().toISOString().split('T')[0];
  if (visitorStore.todayDate !== today) {
    visitorStore.todayDate = today;
    visitorStore.today = 0;
  }

  visitorStore.today += 1;
  visitorStore.total += 1;

  return NextResponse.json({
    today: visitorStore.today,
    total: visitorStore.total,
  });
}
