import supabase from '@/app/supabase';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json('Provided subtask id is invalid');
  }

  const { error } = await supabase.from('Subtasks').delete().eq('id', id);
  if (error) {
    return NextResponse.json(error.message);
  }
  return NextResponse.json({ message: `Subtask with id=${id} was deleted` });
}

export async function PATCH(request: Request) {
  const { id, title, done } = await request.json();

  if (!id) {
    return NextResponse.json('id not provided');
  }
  if ((!title && done === undefined) || (title && done !== undefined)) {
    return NextResponse.json(
      { error: 'both title and status or none are provided' },
      { status: 400 }
    );
  }
  const { error, data } = await supabase
    .from('Subtasks')
    .update({
      [title ? 'title' : 'done']: title || done,
    })
    .eq('id', id)
    .select();
  if (error) {
    return NextResponse.json(error.message);
  }
  return NextResponse.json(data);
}
