import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    grade: {
        type: String,
        required: true
    }
},{timestamps: true});

export const studentModel = mongoose.model('Student', studentSchema);