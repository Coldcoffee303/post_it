const mongoose = require('mongoose');
const { isEmail} = require('validator');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        unique: true,
        lowercase: true,
        validator: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        minLength: [7, 'Minimum password length is 7 characters'],
    },
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
       throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
}


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const User = mongoose.model('user', userSchema);


module.exports = {User};