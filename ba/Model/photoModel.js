import mongoose, { Schema } from 'mongoose';

const photoSchema = new Schema({
    photoFiles: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true 
});

export const Photo = mongoose.model('Photo', photoSchema);
