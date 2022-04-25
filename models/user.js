import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema  = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxLength: 15
    },
    lastName:{
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        maxLength: 15
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        minLength: 6,
        maxLength: 25
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique:true,
        lowercase: true,
        validate: [validator.isEmail, 'Email is invalid']
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        trim: true,
        validate(value) {
            if (validator.isStrongPassword(value)>=30) {
                throw new Error('password not strong enough');
            }
        }
    },
    admin:{
        type: Boolean,
        default: false
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }],
},{
   timestamps: true 
});


userSchema.methods.makeToken = function () {
    const token = jwt.sign({_id: this._id.toString()}, 'secret_key');
    this.tokens = this.tokens.concat({ token });
    return token;
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.statics.login = async function({email, password}){
    const user = await User.findOne({ 
        $or: [
            {username:email},
            {email:email.toLowerCase()}
        ]
    });
    if (!user) {
        throw new Error('invalid email.');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('worng password.');
    }
    return user;
};


const User = mongoose.model('Users', userSchema);
export default User;
