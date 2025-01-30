import { state } from '@/store';

const sidebarActions = {
    setSidebarOpen: (isOpen) => {
        state.isSidebarOpen = isOpen;
    },
};

export default sidebarActions;