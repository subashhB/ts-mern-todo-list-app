import { Task } from "../models/task";

async function fetchData(input: RequestInfo, init?: RequestInit){
    const res = await fetch(input, init);
    if(res.ok){
        return res;
    }else{
        const errorBody = await res.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchTasks(): Promise<Task[]> {
    const res = await fetchData("/api/tasks", {method: "GET"});
    return res.json();
}

export interface TaskInput{
    title: string,
    description?: string,
}

export async function createTask(task: TaskInput): Promise<Task>{
    const res = await fetchData("/api/tasks", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    })
    return res.json();
} 

export async function deleteTask(taskId: string){
    await fetchData("/api/tasks/" + taskId, { method: "DELETE" });
}