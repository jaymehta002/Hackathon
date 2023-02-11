const router = require('express').Router();
const Doctor = require('../model/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
    try {
        const {fullName, hospitalName, phone, email, password} = req.body;

        if(!(fullName && hospitalName && phone && email && password)){
            res.status(400).send("All fields required");
        }
        const old = await Doctor.findOne({email});

        if (old) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const doctor = new Doctor({
            fullName,
            hospitalName, 
            phone,
            email,
            password: encryptedPassword
        });
        doctor.save();
        const token = jwt.sign(
            { doctor_id: doctor._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "12h",
            }
          );
          doctor.token = token;
          res.status(201).json(doctor);
    } catch (error) {
        console.log(error);
    }
});


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      
      const doctor = await Doctor.findOne({ email });
  
      if (doctor && (await bcrypt.compare(password, doctor.password))) {
        const token = jwt.sign(
          { doctor_id: doctor._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "24h",
          }
        );
        res.setHeader('x-access-token',token);
        doctor.token = token;
        res.status(200).json(doctor);
      } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
      console.log(err);
    }
  });
  router.use('/welcome', auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

module.exports = router;
