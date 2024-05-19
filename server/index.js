const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const userModel=require('./models/users')
const MembreModel = require('./models/membre')
const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud1")
//post
app.post("/createuser", (req, res) => {
    userModel.create(req.body) // Utilisez req.body pour créer un nouvel utilisateur avec toutes les données envoyées
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

//get
app.get("/", (req, res) => {
    userModel.find({}) // Utilisez req.body pour créer un nouvel utilisateur avec toutes les données envoyées
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

//getbyid
app.get("/getuser/:id", (req, res) => {
    const id = req.params.id;
    userModel.findById({ _id: id }) 
        .then(users => {
            if (!users) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(users);
        })
        .catch(err => res.status(500).json({ message: "Internal server error", error: err }));
});


//update
app.put("/updateuser/:id", (req, res) => {
    const id = req.params.id;
    userModel.findOneAndUpdate(
        { _id: id },
        {
            name: req.body.name,
            email: req.body.email,
            education: req.body.education,
            personalProject: req.body.personalProject,
            softwareSkillsFaible: req.body.softwareSkillsFaible,
            softwareSkillsMoyen: req.body.softwareSkillsMoyen,
            softwareSkillsFort: req.body.softwareSkillsFort,
            hardwareSkillsFaible: req.body.hardwareSkillsFaible,
            hardwareSkillsMoyen: req.body.hardwareSkillsMoyen,
            hardwareSkillsFort: req.body.hardwareSkillsFort,
            languages: req.body.languages,
            certificates: req.body.certificates,
            jobDescription: req.body.jobDescription,
         
        },
        { new: true } // Pour renvoyer le document mis à jour plutôt que l'ancien
    )
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

//delete
app.delete("/deleteuser/:id", (req, res) => {
    const id = req.params.id;
    userModel.findByIdAndDelete(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted successfully" });
        })
        .catch(err => res.status(500).json({ message: "Internal server error" }));
});
//login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    MembreModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Si l'utilisateur existe et que le mot de passe correspond, stockez l'ID de l'utilisateur dans le localStorage
                
                    res.json("success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.status(400).json({ error: err.message }));
});


app.post('/register', (req, res) => {
    MembreModel.create(req.body)
        .then(membres => res.json(membres))
        .catch(err => res.status(400).json({ error: err.message }));
});






app.listen(3001,()=>
{
    console.log("server is running")
})

