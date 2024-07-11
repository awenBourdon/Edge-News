import React, { useEffect, useState } from 'react';

// Composant ProgressBar qui prend une prop 'className'
const ProgressBar = ({ className }) => {
  // Déclaration de l'état pour stocker la position de défilement
  const [scrollPosition, setScrollPosition] = useState(0);

  // Fonction pour gérer le défilement
  const handleScroll = () => {
    // Calculer la hauteur totale du document moins la hauteur de la fenêtre
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    // Obtenir la position de défilement à partir du haut
    const scrollFromTop = window.scrollY;
    // Calculer la position de défilement en pourcentage
    const scrollPosition = (scrollFromTop / totalHeight) * 100;
    // Mettre à jour l'état avec la nouvelle position de défilement
    setScrollPosition(scrollPosition);
  };

  // Utiliser useEffect pour ajouter un écouteur d'événement de défilement lorsque le composant est monté
  useEffect(() => {
    // Ajouter l'écouteur d'événement de défilement
    window.addEventListener('scroll', handleScroll);
    // Nettoyer l'écouteur d'événement lorsque le composant est démonté
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rendu du composant ProgressBar
  return (
    <div className={`${className}`}>
      <div
        // Appliquer le style de largeur basé sur la position de défilement
        style={{ width: `${scrollPosition}%` }}
        className="h-2 bg-purple-300"
      ></div>
    </div>
  );
};

export default ProgressBar;
