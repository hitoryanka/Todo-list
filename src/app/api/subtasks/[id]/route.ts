import supabase from '@/app/supabase';
import { NextRequest, NextResponse } from 'next/server';

// TODO check for parrent idl;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const parsedId = +params.id;
  if (!parsedId) {
    return NextResponse.json('Provided id is invalid');
  }

  const { data } = await supabase
    .from('Subtasks')
    .select()
    .eq('parentId', parsedId);
  return NextResponse.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title } = await request.json();
  const parsedId = +params.id;

  if (!parsedId) {
    return NextResponse.json('Provided Task id is invalid');
  }

  if (!title) {
    return NextResponse.json({ message: 'Title required' });
  }

  const { data, error } = await supabase
    .from('Subtasks')
    .insert([
      {
        title,
        parentId: parsedId,
        done: false,
      },
    ])
    .select();

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(data[0]);
}
