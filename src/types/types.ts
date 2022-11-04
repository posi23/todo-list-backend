export type EditTaskType = {
    id: number,
    taskName: string,
    description: string,
    completed: boolean,
}

export type Task = {
    id: number,
    taskName: string,
    description: string,
    completed: boolean,
    dueDate: string,
    created_at: string,
    updated_at: string,
    assignees: number[],
}

export type UserTask = {
    uid: number,
    taskId: number,
    created_at: string,
    updated_at: string,
}