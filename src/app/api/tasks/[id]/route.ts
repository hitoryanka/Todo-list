import supabase from '@/app/supabase';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data: tasks, error } = await supabase
    .from('Tasks')
    .select()
    .eq('id', +params.id);
  if (error) {
    throw error;
  }

  return NextResponse.json(tasks[0]);
}
