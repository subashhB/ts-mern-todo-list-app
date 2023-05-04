import { InferSchemaType, Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    completed:{
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task", taskSchema);