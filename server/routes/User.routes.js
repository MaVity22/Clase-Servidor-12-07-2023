const UserController = require('../controllers/User.controller');
const { protect } = require('../middlewares/autenticationMiddleware');

module.exports = function(app){
    app.post('/api/user/new', UserController.createUser);
    app.get('/api/users', protect, UserController.getAllUsers);
    app.get('/api/user/:id', UserController.getUser);
    app.put('/api/user/:id', UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);
    app.post('/api/login', UserController.loginUser)
}