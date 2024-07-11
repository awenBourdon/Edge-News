"use client"
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";  // Importation de la bibliothèque de toasts
import 'react-toastify/dist/ReactToastify.css';  // Styles CSS pour react-toastify

const page = () => {

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
  };

  // Pour supprimer un article
  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: { id: mongoId }
      });
      toast.success("Article supprimé avec succès");
      fetchBlogs(); // Fais un fetch directement pour actualiser la liste
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
      toast.error("Une erreur est survenue lors de la suppression de l'article");
    }
  };

  useEffect(() => {
    fetchBlogs();
  },[])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>Tous Les Articles</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto border border-gray-400 scrollbar-hide" >
      <table className="w-full text-sm text-gray-500">
        <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
          <tr>
            <th scope="col" className="hidden sm:block px-6 py-3">
              Auteur
            </th>
            <th scope="col" className="px-6 py-3">
              Titre
            </th>
            <th scope="col" className="px-6 py-3">
              Date de Publication
            </th>
            <th scope="col" className="px-2 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
           {/* Pour convertir chaque objet de blogs en componsants, il faut préciser tous les attributs pour que ce soit fonctionnel !! */}
          {blogs.map((item,index) => {
            return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteBlog={deleteBlog} /> // DeleteBlog est envoyé pour qu'on puisse l'éxécuter apres dans BlogTableItem
          })}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default page