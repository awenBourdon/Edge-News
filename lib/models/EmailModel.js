import mongoose from "mongoose";

// Définie la structure du model email sur MongoDB
const Schema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

//  Assigne soit un modèle de email existant, soit il en créé un
const EmailModel = mongoose.models.email || mongoose.model("email", Schema);

export default EmailModel;