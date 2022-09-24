const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const DoctorModel = require("../Models/Doctor-Schema");
const PatientModel = require("../Models/Patient-Schema");
const AppointmentModel = require("../Models/Appointment-Schema");
const multer = require("multer");
const router = express.Router();


const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "public/uploads")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + Math.random().toString(32).slice(2, 13) + "-" + file.originalname)
        }
    }
);

const upload = multer({ storage: storage });


//ONBOARD-DOC
router.post('/onboard', upload.single('image'), async (request, response) => {
    const { email, time, days, qualification, speciality, hospital, experience, fee, city, country } = request.body;
    let uploadedFile = request.file;
    if (uploadedFile != undefined) {
        uploadedFile = uploadedFile.filename;
    }
    uploadedFile = 'uploads/' + uploadedFile;
    let imageUrl = process.env.BASE_URL + uploadedFile;
    //console.log(process.env.BASE_URL);
    //console.log(imageUrl);
    if (!time || !days || !qualification || !speciality || !experience || !fee || !hospital || !city || !country) {
        return response.status(400).json({ error: 'Input required!' });
    }
    try {
        await DoctorModel.updateOne({ email: email }, {
            "time": time,
            "days": days,
            "qualification": qualification,
            "speciality": speciality,
            "hospital": hospital,
            "experience": experience,
            "fee": fee,
            "city": city,
            "country": country,
            "imageUrl": imageUrl,
            "onboarded": true,
            "rating": 5,
            "appointments": [],
            "patients": [],
            "reviews": [],
        });
        const DOC = await DoctorModel.find({ email: email })
        return response.status(201).json(DOC);
    } catch (e) {
        return response.status(501).json({ error: e.message })
    }
});


//SHOW all DOC
router.get('/all', async (request, response) => {
    const DOC = await DoctorModel.find({})
        .populate("appointments")
        .populate("patients", "name")

    response.status(200).json(DOC);
});


//SHOW DOC by city
router.get('/city/:city', async (request, response) => {
    const cityID = request.params.city;
    const DOC = await DoctorModel.find({ city: cityID })
        .populate("appointments")
        .populate("patients", "name")

    response.status(200).json(DOC);
});


//SHOW DOC by speciality
router.get('/speciality/:speciality', async (request, response) => {
    const specialityID = request.params.speciality;
    const DOC = await DoctorModel.find({ speciality: specialityID })
        .populate("appointments")
        .populate("patients", "name")

    response.status(200).json(DOC);
});


//SHOW DOC by name
router.get('/name/:name', async (request, response) => {
    const nameID = request.params.name;
    const DOC = await DoctorModel.find({ name: nameID })
        .populate("appointments")
        .populate("patients", "name")

    response.status(200).json(DOC);
});






module.exports = router;