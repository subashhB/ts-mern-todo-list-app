import { ConflictError, Unauthorized } from "../components/errors/http_error";
import { Task } from "../models/task";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit){
    const res = await fetch(input, init);
    if(res.ok){
        return res;
    }else{
        const errorBody = await res.json();
        const errorMessage = errorBody.error;

        if(res.status === 401){
            throw new Unauthorized(errorMessage);
        }else if(res.status === 409){
            throw new ConflictError(errorMessage);
        }else{
            throw Error("Request failed with staus code: " + res.status + "Message: "+errorMessage);
        }
    }
}

export async function getLoggedInUser(): Promise<User>{
    const res = await fetchData("/api/users/", {method: "GET"});
    return res.json();
}

export interface SignUpCredentials{
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User>{
    const res = await fetchData("/api/users/signup",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
    return res.json();
}

export interface LoginCredentials{
    username: string,
    password: string,
}

export async function login(credentails: LoginCredentials): Promise<User>{
    const res = await fetchData("/api/users/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentails),
    })

    return res.json();
}

export async function logout(){
    await fetchData("/api/users/logout", { method: "POST" });
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

export async function updateTask(taskId: string, task: TaskInput): Promise<Task>{
    const res = await fetchData("/api/tasks/" + taskId,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    return res.json();
}

export async function deleteTask(taskId: string){
    await fetchData("/api/tasks/" + taskId, { method: "DELETE" });
}

export async function completeTask(taskId: string){
    await fetchData("/api/tasks/complete/" + taskId, {
        method: "PATCH"
    });
}