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


//ONBOARD-PAT
router.post('/onboard', upload.single('image'), async (request, response) => {
    const { email, age, gender, conditions, lookingfor, city, country } = request.body;
    let uploadedFile = request.file;
    if (uploadedFile != undefined) {
        uploadedFile = uploadedFile.filename;
    }
    uploadedFile = 'uploads/' + uploadedFile;
    let imageUrl = process.env.BASE_URL + uploadedFile;
    //console.log(process.env.BASE_URL);
    //console.log(imageUrl);
    if (!age || !gender || !conditions || !lookingfor || !city || !country) {
        return response.status(400).json({ error: 'Input required!' });
    }
    try {
        await PatientModel.updateOne({ email: email }, {
            "age": age,
            "gender": gender,
            "conditions": conditions,
            "lookingfor": lookingfor,
            "city": city,
            "country": country,
            "imageUrl": imageUrl,
            "onboarded": true,
            "appointments": [],
            "doctors": [],
            "reviews": [],
        });
        const PAT = await PatientModel.find({ email: email })
        return response.status(201).json(PAT);
    } catch (e) {
        return response.status(501).json({ error: e.message })
    }
});



module.exports = router;