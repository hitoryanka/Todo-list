'use client';

import { Isubtask, Itask, Status, initialTasks } from '@/lib/initialTasks';
import { createSlice } from '@reduxjs/toolkit';

interface IAddSubtask {
  type: string;
  payload: {
    id: string;
    subtask: Isubtask;
  };
}
interface IRemoveSubtask {
  type: string;
  payload: {
    id: string;
    subtaskId: string;
  };
}

interface ISort {
  type: string;
  payload: {
    sortType: string;
  };
}

interface ISortSubtasks {
  type: string;
  payload: {
    id: string;
    sortType: string;
  };
}

interface IUpadteSubtaskTitle {
  type: string;
  payload: {
    id: string;
    subtaskId: string;
    title: string;
  };
}

interface IupdateImprotantTask {
  type: string;
  payload: {
    id: string;
    important: boolean;
  };
}

interface IUpadteSubtaskStatus {
  type: string;
  payload: {
    id: string;
    subtaskId: string;
    done: boolean;
  };
}

interface IAddTask {
  type: string;
  payload: {
    title: string;
  };
}

interface IDeleteTask {
  type: string;
  // payload contains ID of a task
  payload: {
    id: string;
  };
}

interface IUpdateTitle {
  type: string;
  payload: {
    id: string;
    title: string;
  };
}

interface IUpdateTaskDescription {
  type: string;
  payload: {
    id: string;
    description: string;
  };
}

interface IUpdateTaskStatus {
  type: string;
  payload: {
    id: string;
    status: Status;
  };
}

// bro write a fucking server already
function getInitialTasks() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const tasks: Itask[] = JSON.parse(localStorage.getItem('tasks') || '{}');
    return Array.isArray(tasks) ? tasks : [];
  }

  return [];
}

export const taskSlice = createSlice({
  name: 'Tasks',
  initialState: getInitialTasks(),
  reducers: {
    addTask(state, action: IAddTask) {
      const date = Date.now().toString();
      const newTask = {
        id: date,
        title: action.payload.title,
        date,
        description: '',
        important: false,
        status: Status.inProcess,
        subtasks: Array<Isubtask>(),
      };
      state.push(newTask);

      return state;
    },

    deleteTask(state, action: IDeleteTask) {
      return state.filter((task) => task.id !== action.payload.id);
    },

    updateTaskTitle(state, action: IUpdateTitle) {
      const task = state.find((t) => t.id === action.payload.id);
      if (!task) {
        throw new Error('Task not found');
      }
      task.title = action.payload.title;
      return state;
    },

    updateImportantTask(state, action: IupdateImprotantTask) {
      const task = state.find((t) => t.id === action.payload.id);
      if (task) {
        task.important = action.payload.important;
      } else {
        throw new Error('task not found');
      }

      return state;
    },

    updateTaskDescription(state, action: IUpdateTaskDescription) {
      return [
        ...state.map((task) =>
          task.id === action.payload.id
            ? { ...task, description: action.payload.description }
            : task
        ),
      ];
    },

    updateTaskStatus(state, action: IUpdateTaskStatus) {
      const task = state.find((t) => t.id === action.payload.id);
      if (!task) {
        throw new Error('task not found');
      }
      task.status = action.payload.status;
      if (task.status === Status.done) {
        task.subtasks.forEach((t) => (t.done = true));
      }

      return state;
    },

    addSubtask(state, action: IAddSubtask) {
      return [
        ...state.map((task) =>
          task.id === action.payload.id
            ? { ...task, subtasks: [...task.subtasks, action.payload.subtask] }
            : task
        ),
      ];
    },
    removeSubtask(state, action: IRemoveSubtask) {
      const task = state.find((t) => t.id === action.payload.id);
      if (!task) {
        throw new Error("task doesn't exist");
      }
      task.subtasks = task.subtasks.filter(
        (t) => t.id !== action.payload.subtaskId
      );
      return state;
    },
    sortTasks(state, action: ISort) {
      state.sort((t1, t2) => {
        if (action.payload.sortType === 'done') {
          if (t1.status === Status.done && t2.status === Status.done) {
            return +t1.id - +t2.id;
          } else {
            return t1.status === Status.done
              ? -1
              : t2.status === Status.done
              ? 1
              : 0;
          }
        } else if (action.payload.sortType === 'pending') {
          if (t1.status !== Status.done && t2.status !== Status.done) {
            return +t1.id - +t2.id;
          } else {
            return t2.status === Status.done
              ? t1.status === Status.done
                ? 0
                : -1
              : 1;
          }
        } else if (action.payload.sortType === 'important') {
          if (t1.important) {
            if (t2.important) {
              return +t1.id - +t2.id;
            } else {
              return -1;
            }
          } else {
            if (t2.important) {
              return 1;
            } else {
              return +t1.id - +t2.id;
            }
          }
        } else {
          return +t2.id - +t1.id;
        }
      });

      return state;
    },
    // TODO simplify sorting
    sortSubtasks(state, action: ISortSubtasks) {
      const task = state.find((t) => t.id === action.payload.id);
      if (!task) {
        throw new Error("task doesn't exist");
      }
      task.subtasks.sort((t1, t2) => {
        if (action.payload.sortType === 'done') {
          if (t1.done && t2.done) {
            return +t1.id - +t2.id;
          } else {
            return t1.done ? -1 : t2.done ? 1 : 0;
          }
        } else if (action.payload.sortType === 'pending') {
          if (!t1.done && !t2.done) {
            return +t1.id - +t2.id;
          } else {
            return t2.done ? (t1.done ? 0 : -1) : 1;
          }
        } else {
          return +t2.id - +t1.id;
        }
      });
      return state;
    },

    upadteSubtaskTitle(state, action: IUpadteSubtaskTitle) {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.subtasks = task.subtasks.map((subtask) =>
          subtask.id === action.payload.subtaskId
            ? { ...subtask, description: action.payload.title }
            : subtask
        );
      }
      return state;
    },

    updateSubtaskStatus(state, action: IUpadteSubtaskStatus) {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.subtasks = task.subtasks.map((subtask) =>
          subtask.id === action.payload.subtaskId
            ? { ...subtask, done: action.payload.done }
            : subtask
        );
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.startsWith('Tasks'),
      (state) => localStorage.setItem('tasks', JSON.stringify(state))
    );
  },
});

export const {
  addTask,
  deleteTask,
  sortTasks,
  sortSubtasks,
  updateTaskTitle,
  updateImportantTask,
  updateTaskDescription,
  updateTaskStatus,
  addSubtask,
  removeSubtask,
  updateSubtaskStatus,
  upadteSubtaskTitle,
} = taskSlice.actions;

export default taskSlice.reducer;
