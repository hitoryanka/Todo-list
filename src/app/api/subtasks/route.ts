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

  if (title) {
    const { error, data } = await supabase
      .from('Subtasks')
      .update({
        title,
      })
      .eq('id', id)
      .select();
    if (error) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json(data);
  } else if (done) {
    const { error, data } = await supabase
      .from('Subtasks')
      .update({
        done,
      })
      .eq('id', id)
      .select();
    if (error) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json(data);
  }
}
