import {state} from "@/store";
import tasksService from "@/services/tasks";


const tasksActions = {
    getAll: async () => {
        const [tasks, error] = await tasksService.getAll();
        if (error) {
            throw new Error(error);
        }
        tasksActions.setAllTask(tasks)
    },

    completeTask: async (obj) => {
        const [tasks, error] = await tasksService.completeTask(obj);
        if (error) {
            throw new Error(error);
        }
    },

    getCompletedTasksId: async (str) => {
        const [tasks, error] = await tasksService.getCompletedTasksId();
        if (error) {
            throw new Error(error);
        }
        tasksActions.setCompletedTasksId(tasks)
    },

    setCompletedTasksId: (tasks) => {
        state.completedTaskIdList = tasks;
    },

    setAllTask: (tasks) => {
        state.tasks = tasks;
    },
};

export default tasksActions;
