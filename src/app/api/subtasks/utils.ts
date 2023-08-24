import supabase from '@/app/supabase';
import { Status } from '@/lib/initialTasks';
import { NextResponse } from 'next/server';

export default async function handlePatch(
  id: number,
  property: string | Status | boolean
) {
  const { error, data } = await supabase
    .from('Tasks')
    .update({
      [property.toString()]: property,
    })
    .eq('id', id)
    .select();
  if (error) {
    return NextResponse.json(error.message);
  }
  return NextResponse.json(data);
}
