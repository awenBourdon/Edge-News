import { NextResponse } from "next/server"; // Pour créer des réponses HTTP dans les routes API
import { ConnectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";
const fs = require("fs"); // API pour interagir avec le systême de fichiers

// Connexion à la base de données
const LoadDB = async () => {
    await ConnectDB();
};
LoadDB();

// Fonction pour faire une requête GET et obtenir tous les articles
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    } else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({blogs});
    }
};

// Fonction pour ajouter un article via une requête POST
export async function POST(request) {
    try {
        const formData = await request.formData(); // Pour récupérer les données du formulaire envoyé
        const timestamp = Date.now();

        const image = formData.get("image"); // Récupère l'image du formulaire
        const imageByteData = await image.arrayBuffer(); // Convertit l'image en tableau d'octets
        const buffer = Buffer.from(imageByteData); // Crée un objet qui récupère la séquence d'octets
        const path = `./public/${timestamp}_${image.name}`; // Chemin où sera enregistrée l'image sur le serveur
        await writeFile(path, buffer); // Enregistre le fichier image sur le système local

        const imgUrl = `/${timestamp}_${image.name}`; // URL de l'image enregistrée
        console.log(imgUrl); // Affiche l'URL de l'image dans la console du serveur

        // Une fois l'image enregistrée, crée un objet blogData qui rassemble les autres données du formulaire associées à l'article
        // ainsi que l'URL de l'image enregistrée.
        const blogData = {
            title: `${formData.get("title")}`,
            description: `${formData.get("description")}`,
            category: `${formData.get("category")}`,
            author: `${formData.get("author")}`,
            image: `${imgUrl}`,
            authorImg: `${formData.get("authorImg")}`
        };

        await BlogModel.create(blogData); // Instancie l'article sur le modèle de BlogModel une fois que celui-ci est créé
        console.log("Article sauvegardé");

        return NextResponse.json({ success: true, message: "Article créé" }); // Indique que la création s'est passée avec succès (200) et renvoie un message
    } catch (error) {
        console.error("Problême lors de la requête:", error);
        return NextResponse.json({ success: false, error: "Problême lors de la connection avec le serveur" }, { status: 500 });
    }
};

// Fonction pour supprimer un article via une requête DELETE
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get("id"); // Cherche l'id dans l'Url
    const blog  = await BlogModel.findById(id); // Cherche l'id correspondant dans le modèle blog
    fs.unlink(`./public${blog.image}`, ()=>{}); // Supprime l'image dans les fichiers et fait une fonction de rappel vide, si il y a une erreur lors de la suppression elle ne sera pas traitée ou enregistrée
    await BlogModel.findByIdAndDelete(id); // Trouve le blog avec l'id correspondant et le supprime
    return NextResponse.json({message:"Article supprimé"}); // Retourne un message pour valider la suppression
}