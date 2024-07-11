import mongoose from "mongoose"

// Pour définir la structure des articles dans MongoDB
const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    authorImg:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now(),
    }
});

//  Assigne soit un modèle d'article existant, soit il en créé un
const BlogModel = mongoose.models.blog || mongoose.model("blog", Schema);

export default BlogModel;