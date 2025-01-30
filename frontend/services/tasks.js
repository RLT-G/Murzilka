import axiosInstance from "../plugins/axios";


const tasksService = {

    getAll: async () => {
        try {
            const {data} = await axiosInstance.get(`/task/all`);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    completeTask: async (obj) => {
        try {
            const config = {headers: {'Content-Type': 'application/json'}};
            const {data} = await axiosInstance.post(`/task/complete`, obj, config);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    getCompletedTasksId: async () => {
        try {
            const {data} = await axiosInstance.get('/task/get_completed_tasks');
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

};

export default tasksService;
