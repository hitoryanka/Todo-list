import supabase from '@/app/supabase';
import { NextResponse } from 'next/server';

// TODO add response status on fail

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

  const { error } = await supabase.from('Tasks').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error });
  }

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
  const { task: partialTask } = await request.json();
  if (!partialTask.id) {
    return NextResponse.json('id not provided');
  }

  const { data: fetchedTask, error: fetchedTaskError } = await supabase
    .from('Tasks')
    .select()
    .eq('id', partialTask.id);

  if (fetchedTaskError) {
    return NextResponse.json({ error: fetchedTaskError });
  } else if (!fetchedTask[0]) {
    return NextResponse.json({ error: "Task with such id doesn't exist" });
  }

  const { data, error } = await supabase
    .from('Tasks')
    .update({ ...partialTask })
    .eq('id', partialTask.id)
    .select();

  if (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json(data[0]);
}
