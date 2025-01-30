import {state} from "@/store";
import projectService from "@/services/project";


const projectActions = {
    getAllNames: async () => {
        const [names, error] = await projectService.getAllNames();
        if (error) {
            throw new Error(error);
        }
        projectActions.setAllNames(names)
        return names;
    },

    getProjectByName: async (project_name) => {
        const [project, error] = await projectService.getProjectByName(project_name);
        if (error) {
            throw new Error(error);
        }

        projectActions.setProject(project)
    },

    setAllNames: (names) => {
        state.allNames = names;
    },
    setProject: (names) => {
        state.project = names;
    },

};

export default projectActions;
