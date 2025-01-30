import axiosInstance from "../plugins/axios";


const projectService = {

    getAllNames: async () => {
        try {
            const {data} = await axiosInstance.get(`/project/all_names`);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    getProjectByName: async (project_name) => {
        try {
            const {data} = await axiosInstance.get(`/project/get_by_name/${project_name}`);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },
};

export default projectService;
