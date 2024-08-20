import express from 'express';

import studentController from '../controllers/studentController';



const route = express.Router();

route.get('/students', studentController.getAllstudents);
route.get('/students/:id', studentController.getStudent);
route.post('/students', studentController.createStudent);
route.put('/students/:id', studentController.updateStudent);
route.delete('/students/:id', studentController.deleteStudent);

export default route;