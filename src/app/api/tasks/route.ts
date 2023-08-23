import supabase from '@/app/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data: tasks, error } = await supabase.from('Tasks').select();
  if (error) {
    throw error;
  }

  return NextResponse.json(tasks);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ message: 'Task id required' });
  }

  const response = await supabase.from('Tasks').delete().eq('id', id);
  console.log(response.data);
  return NextResponse.json({ message: `Task with id=${id} was deleted` });
}

export async function POST(request: Request) {
  const { title } = await request.json();

  if (!title) {
    return NextResponse.json({ message: 'Title required' });
  }

  const response = await supabase
    .from('Tasks')
    .insert([
      {
        title,
        important: false,
      },
    ])
    .select();

  if (response.error) {
    return NextResponse.json(response.error);
  }

  return NextResponse.json(response.data[0]);
}

export async function PATCH(request: Request) {
  const { id, title, status } = await request.json();

  if (!id) {
    return NextResponse.json('id not provided');
  }

  if (title) {
    const { error, data } = await supabase
      .from('Tasks')
      .update({
        title,
      })
      .eq('id', id)
      .select();
    if (error) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json(data);
  } else if (status) {
    const { error, data } = await supabase
      .from('Tasks')
      .update({
        status,
      })
      .eq('id', id)
      .select();
    if (error) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json(data);
  }
}
