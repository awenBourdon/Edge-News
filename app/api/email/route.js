import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await ConnectDB();
};
LoadDB();

// Fonction pour extraire l'email du formulaire et l'envoyé dans la base de données via le modèle "email"
export async function POST(request){
    const formData = await request.formData();
    const emailData = {
        email:`${formData.get("email")}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({success:true,  message:"Email enregistré"})
};

// Fonction pour faire une requête GET et obtenir tous les emails inscrits
export async function GET(request) {

    const emailId = request.nextUrl.searchParams.get("id");
    if (emailId) {
        const email = await EmailModel.findById(emailId);
        return NextResponse.json(email);
    } else {
        const emails = await EmailModel.find({});
        return NextResponse.json({emails});
    }
};

// Fonction pour supprimer un email via une requête DELETE
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get("id"); // Sélectionnne le ID dans l'Url
    await EmailModel.findByIdAndDelete(id); // Trouve le mail avec l'id correspondant et le supprime
    return NextResponse.json({success:true, message:"Email supprimé"}); // Retourne un message pour valider la suppression
}