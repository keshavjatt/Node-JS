const bcrypt = require('bcrypt');
const { User } = require('../models/userSchema');
const { validateUser } = require('../validators/userValidator');

const register = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ message: 'Incorrect Email ID', code: 'Invalid Input' });
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(199).json({ message: 'User already available in Database', code: 'User-Already-Exist' });
        }

        user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        res.status(200).json({ message: 'User registered successfully', code: '200' });
    } catch (error) {
        console.error('Error occurred during registration:', error);
        res.status(500).json({ message: 'Internal Server Error', code: 'Server-Error' });
    }
};

const AccountController = { register };
module.exports = AccountController;
