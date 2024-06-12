import fs from 'fs';

class UserService {
    getUsers() {
        // read user.json with fs
        console.log("vao day service");
        const users = fs.readFileSync("./data.json", 'utf-8');
        // console.log("users " , users);
        return JSON.parse(users);
    }
}

export default new UserService();