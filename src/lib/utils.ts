import { Isubtask } from '@/redux-toolkit/features/api/tasksApiSlice';
import checkedPNG from '../app/images/checked.png';

export function handleDropDown(
  type: string,
  ref: React.RefObject<HTMLElement>
) {
  if (!ref?.current) {
    return;
  }
  if (type === 'mouseenter') {
    ref.current.style.opacity = '1';
  } else if (type === 'mouseleave') {
    ref.current.style.opacity = '0';
  } else {
    ref.current.style.opacity = ref.current.style.opacity === '1' ? '0' : '1';
  }

  if (ref.current.style.opacity === '1') {
    ref.current.style.pointerEvents = 'auto';
  } else {
    ref.current.style.pointerEvents = 'none';
  }
}

export function updateCheckboxStyle(
  ref: React.RefObject<HTMLLabelElement>,
  isDone: boolean
) {
  if (ref?.current) {
    if (isDone) {
      ref.current.style.background = 'rgb(253 224 71)';
      ref.current.style.backgroundImage = `url('${checkedPNG.src}')`;
      ref.current.style.backgroundSize = 'contain';
    } else {
      ref.current.style.background = 'rgb(209 213 219)';
    }
  }
}

export function calculateProgress(subtasks: Isubtask[]): string {
  const progress =
    +(
      subtasks.filter((subtask) => subtask.done).length / subtasks.length
    ).toFixed(2) * 100;

  return progress.toString();
}
