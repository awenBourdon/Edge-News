"use client";
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem'; 
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const Page = () => {

    const [emails, setEmails] = useState([]); // Déclare un état local 'emails' avec useState pour stocker les emails

    // Récuperer tous les emails
    const fetchEmails = async () => {
        try {
            const response = await axios.get("/api/email"); 
            setEmails(response.data.emails); // Met à jour l'état 'emails' avec les données reçues depuis l'API
        } catch (error) {
            console.error('Erreur lors de la récupération des emails :', error);
        }
    };

    // Supprimer
    const deleteEmail = async (mongoId) => {
      const response = await axios.delete("/api/email", {
        params:{
          id:mongoId
        }
      })
      if (response.data.success) {
        toast.success("Email supprimé");
        fetchEmails();
      } else {
        toast.error("Erreur lors de la Suppression");
      }
    }

    // Hook useEffect pour exécuter fetchEmails une fois après le premier rendu du composant
    useEffect(() => {
        fetchEmails(); // Appelle fetchEmails pour charger les emails lors du premier rendu du composant
    }, []); // Le tableau vide [] signifie que useEffect ne s'exécute qu'une seule fois après le montage initial du composant

    return (
        <div className="flex-1 pt-5 sm:pt-12 sm:pl-16">
            <h1>Toutes les Inscriptions</h1>
            <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-6">
                                Email
                            </th>
                            <th scope="col" className="hidden sm:block px-6 py-6">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping à travers le tableau 'emails' pour afficher chaque élément dans SubsTableItem */}
                        {emails.map((item, index) => {
                            return <SubsTableItem key={index} mongoId={item._id} email={item.email} date={item.date} deleteEmail={deleteEmail} />;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
