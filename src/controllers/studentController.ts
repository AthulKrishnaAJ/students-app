import {Request, Response} from 'express';
import {studentModel} from '../model/studentModel';

class studentController {

    public async getAllstudents (request: Request, response: Response): Promise<Response> {
        try {
            const students = await studentModel.find();
            return response.status(200).json({data: students})
        } catch (error: any) {
            console.log('Error in fetching students: ', error);
            return response.status(500).json({message: "An error occured while getting all students", error: error.message})

        }
    }


    public async getStudent (request: Request, response: Response): Promise<Response> {
        try {
            const {id} = request.params as {id: string}
            const student = await studentModel.findById(id);
            return response.status(200).json({data: student});
        } catch (error: any) {
            console.log('Error in fetching a specific student: ', error);
            return response.status(500).json({message: 'An error occured while getting a student', error: error.message});
        }
    }


    public async createStudent (request: Request, response: Response): Promise<Response> {
        try {
            const {name, age, email, grade} = request.body;
            const newStundent = new studentModel({
                name: name,
                age: age,
                email: email,
                grade: grade
            });
            await newStundent.save();
            return response.status(201).json({message: "Student created", data: newStundent});
        } catch (error: any) {
            console.log('Error in creating student: ', error.message)
            return response.status(500).json({message: "An error occured while creating a student", error: error.message});
        }
    }


    public async updateStudent (request: Request, response: Response): Promise<Response> {
        try{
            const {id} = request.params as {id: string}
            const {name, age, email, grade} = request.body;

            const isUpdate = await studentModel.findByIdAndUpdate(
                id, 
                {name: name, age: age, email: email, grade: grade}, 
                {new: true});

            if(!isUpdate){
                return response.status(404).json({error: 'Student not found'});
            }

            return response.status(200).json({message: 'Student updated', data: isUpdate});

        }catch(error: any){
            console.log('Error in updating a student: ', error);
            return response.status(500).json({message: "An error occured while updateing a student", error: error.message});
        }
    }


    public async deleteStudent (request: Request, response: Response): Promise<Response> {
        try{
            const {id} = request.params as {id: string}
            const isDelete = await studentModel.findByIdAndDelete(id);

            if(!isDelete){
                return response.status(404).json({error: "Student not found"});
            }

            return response.status(200).json({message: "Student deleted"});
        }catch(error: any){
            console.log('Error in while deleting a student: ', error)
            return response.status(500).json({message: "An error occured while deleting a student", error: error.message});
        }
    }
}


export default new studentController();






