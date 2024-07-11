import { useState } from "react"; // Import de useState pour gérer l'état local
import axios from "axios"; // Import d'axios pour effectuer des requêtes HTTP
import { toast } from 'react-toastify'; // Import de react-toastify pour afficher des notifications
import 'react-toastify/dist/ReactToastify.css'; // Import du CSS de react-toastify

const Newsletter = () => {

    const [email, setEmail] = useState(""); // État local pour l'adresse email

  // Fonction pour gérer la soumission du formulaire
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    try {
      const formData = new FormData(); // Création d'un objet FormData pour envoyer les données
      formData.append("email", email); // Ajout de l'adresse email à FormData

      // Envoi de la requête POST vers l'API /api/email avec les données du formulaire
      const response = await axios.post("/api/email", formData);

      // Vérification de la réponse de l'API
      if (response.data.success) {
        toast.success("Bienvenue sur la Newsletter !"); // Notification de succès si l'inscription est réussie
        setEmail(""); // Efface l'adresse email du formulaire après succès
      } else {
        toast.error("Erreur lors de l'inscription sur la Newsletter"); // Notification d'erreur si l'inscription échoue
      }
    } catch (error) {
      console.error("Erreur lors de la requête POST :", error); // Affiche l'erreur dans la console en cas d'échec de la requête
      toast.error("Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard."); // Notification d'erreur générique pour l'utilisateur
    }
  };

  return (
<>
<span className="flex m-auto items-center py-10 max-w-[80vw]">
         <span className="pr-6 text-5xl font-bold">NEWSLETTER</span>
            <span className="h-2 flex-1 bg-black"></span>
        </span>
<section className="relative flex flex-wrap lg:h-[80vh] lg:items-center">
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold sm:text-5xl">Soyez toujours le premier au courant</h1>

      <p className="mt-4 text-gray-500">
      Votre média incontournable pour les dernières tendances et innovations. Des actus percutantes, des analyses pointues, et une perspective unique sur le monde. Restez à la pointe de l'information avec Edge News
      </p>
    </div>

    <form onSubmit={onSubmitHandler} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Votre Email"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      
      <div className="flex items-center justify-center">

        <button
          type="submit"
          className="inline-block rounded-full  px-10 py-1 text-2xl font-medium border-2 border-[#111] text-[#111]"
        >
          S'inscrire
        </button>
      </div>
    </form>
  </div>

  <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
    <img
      alt=""
      src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</section>
</>

  )
}

export default Newsletter;