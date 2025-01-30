import {Button, Input} from "@nextui-org/react";
import {useFormik} from "formik";
import tasksActions from "@/actions/tasks";
import {TaskSchema} from "@/schemas/task";

export const CheckLink = ({task_id, reward, setCompleteTask, completeTask}) => {

    const taskForm = useFormik({
        initialValues: {
            task_id: task_id,
            taskLink: undefined,
            reward: reward,
        },
        onSubmit: (values) => handleCompleteTasks(values),
        validationSchema: TaskSchema,
        validateOnChange: false,
    });


    const handleCompleteTasks = (values) => {
        setCompleteTask(true)
        tasksActions.completeTask(values).then()
    }

    return (
        <div className={"flex flex-col gap-4 p-4"}>
            <div className={"text-base leading-6"}>Прикрепите ссылку, чтобы мы смогли проверить выполнение вашего
                задания:
            </div>
            <div className={"flex flex-col md:flex-row gap-2 h-full"}>
                <Input
                    type={'text'}
                    variant={"bordered"}
                    value={taskForm.values.taskLink}
                    onChange={(e) =>
                        taskForm.setFieldValue('taskLink', e.target.value)
                    }
                    isInvalid={!!taskForm.errors.taskLink}
                    errorMessage={
                        taskForm.errors.taskLink && <a>{taskForm.errors.taskLink}</a>
                    }
                />
                <Button variant={"faded"} isDisabled={completeTask}
                        className={"btn text-white border-black  border-solid bg-[#E17777] text-wrap"}
                        onClick={() => taskForm.submitForm()}>
                    <div className={"p-2 text-white"}>
                        Отправить на проверку
                    </div>
                </Button>
            </div>
        </div>
    )
}
