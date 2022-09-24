const mongoose = require("mongoose");

const DOCTOR_SCHEMA = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    onboarded: {
        type: Boolean,
        default: false,
    },
    imageURL: {
        type: String,
    },
    time: [{
        type: String,
    }],
    days: [{
        type: String,
    }],
    education: {
        type: String,
    },
    specialty: {
        type: String,
    },
    experience: {
        type: Number,
    },
    fee: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
    }],
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const DoctorModel = mongoose.model("Doctor", DOCTOR_SCHEMA);
module.exports = DoctorModel;