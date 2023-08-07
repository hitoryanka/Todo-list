import { Isubtask, Itask, Status, initialTasks } from '@/lib/initialTasks';
import { createSlice } from '@reduxjs/toolkit';

interface IAddSubtask {
  type: string;
  payload: {
    id: string;
    subtask: Isubtask;
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
  payload: Omit<Itask, 'id'>;
}

interface IDeleteTask {
  type: string;
  // payload contains ID of a task
  payload: string;
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

export const taskSlice = createSlice({
  name: 'Tasks',
  initialState: initialTasks,
  reducers: {
    addTask(state, action: IAddTask) {
      const newTask = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.push(newTask);

      return state;
    },

    deleteTask(state, action: IDeleteTask) {
      return state.filter((task) => task.id !== action.payload);
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
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );
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
});

export const {
  addTask,
  deleteTask,
  updateTaskTitle,
  updateImportantTask,
  updateTaskDescription,
  updateTaskStatus,
  addSubtask,
  updateSubtaskStatus,
  upadteSubtaskTitle,
} = taskSlice.actions;

export default taskSlice.reducer;
