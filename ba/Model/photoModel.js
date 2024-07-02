import mongoose, { Schema } from 'mongoose';

const photoSchema = new Schema({
    photoFiles: {
        type: [String], // Array of strings to store multiple photo URLs
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model for ownership
        required: true
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

export const Photo = mongoose.model('Photo', photoSchema);
