import UserService from './user.service';
import fs from 'fs';

class UserController {
    getAll(req, res, next) {
        // return res.send("hello");
        const users = UserService.getUsers();
        console.log("vao day controller");
        return res.json(users);
    }
    
    getUserById(req, res, next) {
        const users = UserService.getUsers();
        
        // Kiểm tra xem users có phải là một mảng không
        if (!Array.isArray(users)) {
          return res.status(500).send('Internal server error');
        }
      
        const userId = parseInt(req.params.id, 10);
        const user = users.find(u => u.id === userId);
        
        if (user) {
          res.json(user);
        } else {
          res.status(404).send('User not found');
        }
    }
    
    postUser(req, res) {
        const users = UserService.getUsers();
        const newUser = {
            id: users[users.length-1].id + 1,
            ...req.body
        };
        console.log(newUser);
        users.push(newUser);
        fs.writeFileSync('./data.json', JSON.stringify(users));
        res.json(newUser);
    }
    
    putUser(req, res) {
        const users = UserService.getUsers();
        const userId = parseInt(req.params.id, 10);
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            users[userIndex] = { id: userId, ...req.body };
            res.json(users[userIndex]);
            fs.writeFileSync('./data.json', JSON.stringify(users));
        } else {
            res.status(404).send('User not found');
        }
    }
    
    deleteUser(req, res) {
        const users = UserService.getUsers();
        const userId = parseInt(req.params.id, 10);
        console.log(`Deleting user with id: ${userId}`);
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            // console.log(users)
            res.status(204).send();
            fs.writeFileSync('./data.json', JSON.stringify(users));
        } else {
            res.status(404).send('User not found');
        }
    }
}

export default UserController = new UserController();
