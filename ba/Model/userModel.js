import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        pictures: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Photo' 
            }
        ]
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password); 
    return isMatch;
};

export const User = mongoose.model('User', userSchema); 
