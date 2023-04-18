import * as usersDao from '../dao/users/users-dao.js'

const findAllUser = async (req, res) => {
    const users = await usersDao.findAllUsers()
    console.log("findAllUser", users)
    res.json(users);
}


const findUser = async (req, res) => {
    console.log("findUser", req.params.uid)
    const userId = req.params.uid;
    const user = await usersDao.findUserById(userId)
    res.json(user);
}

const createUser = async (req, res) => {
    const newuser = req.body;
    newuser.endorsements = 0;
    newuser.role = "user";
    newuser.following = [];
    newuser.posts = [];
    newuser.dateJoined = new Date().toLocaleDateString();

    const inserteduser = await usersDao
        .createUser(newuser);
    res.json(inserteduser);
}

const deleteUser = async (req, res) => {
    const userIdToDelete = req.params.uid;
    const status = await usersDao
        .deleteUser(userIdToDelete);

    res.json(status);
}

const updateUser = async (req, res) => {
    const userIdToUpdate = req.params.uid;
    const updates = req.body;


    const status = await usersDao
        .updateUser(userIdToUpdate,
            updates);
    res.json(status);
}
export default (app) => {
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUser);
    app.get('/api/users/:uid', findUser);
    app.put('/api/users/:uid', updateUser);
    app.delete('/api/users/:uid', deleteUser);
}
