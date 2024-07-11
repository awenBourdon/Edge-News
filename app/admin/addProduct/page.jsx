"use client";
import { assets } from "@/Assets/assets";  // Importation des ressources d'assets
import axios from "axios";  // Importation du client HTTP axios
import Image from "next/image";  // Importation de l'élément Image de Next.js
import React, { useState } from "react";  // Importation de React et useState pour gérer l'état local
import { toast } from "react-toastify";  // Importation de la bibliothèque de toasts
import 'react-toastify/dist/ReactToastify.css';  // Styles CSS pour react-toastify

const Page = () => {
  const [image, setImage] = useState(null);  // Pour gérer l'image sélectionnée
  const [data, setData] = useState({  // Pour gérer les données du formulaire
    title: "",
    description: "",
    category: "Design",
    author: "Administrateur",
    authorImg: "/blogImages/author_img.svg",
  });

  // Changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      console.log(`Image téléchargée: ${URL.createObjectURL(file)}`);
    }
  };

  // Changement de champ du formulaire
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.title && data.description && image) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      try {
        // Envoi de la requête POST avec axios vers l'API backend
        const response = await axios.post("../api/blog", formData);
        if (response.data.success) {
          // Affichage d'un toast de succès si l'ajout a réussi
          toast.success("Article ajouté avec succès");
          // Réinitialisation de l'état local pour l'image et les données du formulaire
          setImage(null);
          setData({
            title: "",
            description: "",
            category: "Design",
            author: "Administrateur",
            authorImg: "/blogImages/author_img.svg",
          });
        } else {
          // Affichage d'un toast d'erreur si l'ajout a échoué
          toast.error("Erreur lors de l'ajout de l'article");
        }
      } catch (error) {
        // Gestion des erreurs lors de la requête POST
        toast.error("Erreur lors de la soumission du formulaire");
        console.error(error);
      }
    } else {
      // Affichage d'un toast si tous les champs requis ne sont pas remplis
      toast.error("Tous les champs ne sont pas remplis");
    }
  };

  return (
    <>
      {/* Formulaire pour ajouter un nouvel article */}
      <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={handleSubmit}>
        <p className="text-xl">Télécharger Image</p>
        <label htmlFor="image">
          <Image
            className="mt-4 cursor-pointer"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            width={140}
            height={140}
            alt="Upload Area"
          />
        </label>
        <input onChange={handleImageChange} type="file" id="image" hidden required />
        <p className="text-xl mt-4">Titre</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Écrire le titre ici"
          required
        />
        <p className="text-xl mt-4">Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="Votre contenu"
          required
        />
        <p className="text-xl mt-4">Catégorie</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Design">Design</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          Ajouter
        </button>
      </form>
    </>
  );
};

export default Page;
