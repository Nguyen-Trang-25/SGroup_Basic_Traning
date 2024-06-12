import express from 'express';
import UserController from './user.controller';
const route = express.Router();
// route.get('/users', UserController.getUsers);
// route.get('/admin', UserController.admin);
route.get('/', UserController.getAll);
route.get('/:id', UserController.getUserById);
route.post('/', UserController.postUser);
route.put('/:id', UserController.putUser);
route.delete('/:id', UserController.deleteUser);

export default route;