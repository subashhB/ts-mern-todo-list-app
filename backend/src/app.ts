import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import taskRoutes from "./routes/task";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json())
app.use('/api/tasks', taskRoutes)

app.use((req,res,next)=>{  
    next(Error("Endpoint doesnot exists"))
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{
    console.error(error);
    let errorMessage = 'An internal error has occured';
    if(error instanceof Error) errorMessage = error.message;
    res.status(500).json({error: errorMessage})
});

export default app;