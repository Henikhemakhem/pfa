const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    education: String,
    personalProject: String,
    softwareSkillsFaible:String,
    softwareSkillsMoyen:String,
    softwareSkillsFort:String,
   hardwareSkillsFaible:String,
    hardwareSkillsMoyen:String,
    hardwareSkillsFort:String,
    languages: String,
    certificates: String,
    jobDescription: String
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
