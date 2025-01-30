import {proxy, useSnapshot} from 'valtio';
import cloneDeep from 'lodash.clonedeep';


export const INITIAL_STATE = {
    isDemo: false,
    profile: {
        id: 0,
        wallet: "",
        totalStaked: 0,
        totalPics: 0
    },
    history: [
        {
            id: 0,
            profileId: 0,
            activity: "",
            numberOfMzk: 0,
            createDate: "2024-09-10T17:52:14.216214Z"
        },
    ],
    isSidebarOpen: false,
    allNames: [
        {
            id: 0,
            name: ""
        }
    ],
    project: [
        {
            id: 0,
            name: "",
            description: "",
            endEvent: "",
            startEvent: "",
            logoUrl: "",
            websiteUrl: "",
            whitepaperUrl: "",
            token: "",
            status: "",
        }
    ],
    tasks: [
        {
            id: 0,
            title: "",
            description: "",
            reward: 0,
            checkType: ""
        }
    ],
    completedTaskIdList: []
};

export const state = proxy(INITIAL_STATE);

export function useProfile() {
    return useSnapshot(state).profile;
}

export function useCompletedTasksId() {
    return useSnapshot(state).completedTaskIdList;
}

export function useSidebarOpen() {
    return useSnapshot(state).isSidebarOpen;
}

export function useAllProjectNames() {
    return useSnapshot(state).allNames;
}

export function useProject() {
    return useSnapshot(state).project;
}

export function useTasks() {
    return useSnapshot(state).tasks;
}

export function useHistory() {
    return useSnapshot(state).history;
}

export function resetStore() {
    state.obj = cloneDeep(INITIAL_STATE);
}
