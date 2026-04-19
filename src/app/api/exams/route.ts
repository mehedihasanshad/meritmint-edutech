import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

type ExamRow = { id: number; title: string; total_marks: number };

export async function GET() {
  const rows = await query<ExamRow>(
    'SELECT id, title, total_marks FROM exams ORDER BY id'
  );
  return NextResponse.json(rows);
}
