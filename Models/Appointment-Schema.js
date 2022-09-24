const mongoose = require("mongoose");

const APPOINTMENT_SCHEMA = mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    problem: {
        type: String,
    },
    presciption: {
        type: String,
    },
    cost: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AppointmentModel = mongoose.model("Appointment", APPOINTMENT_SCHEMA);
module.exports = AppointmentModel;