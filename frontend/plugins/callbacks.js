import profileActions from "@/actions/profile";
import tasksActions from "@/actions/tasks";

export const CheckCookieCallback = async () => {
    await profileActions.checkCookie()
        .then( (cookie) => {
            if (cookie) {
                tasksActions.getCompletedTasksId().then()
                profileActions.getCurrentProfile().catch(r=>console.log(r, "callbacks"))
            }
        })
}
