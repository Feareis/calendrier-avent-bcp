import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie"; // Import de la bibliothèque pour les cookies
import "./App.css";

const Calendar = () => {
  const today = new Date().getDate(); // Jour actuel
  const [opened, setOpened] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");

  const surprises = [
    "🎁 Surprise 1 : 5x Bouteille d'eau",
    "🎄 Surprise 2 : 5.000 $",
    "🍫 Surprise 3 : 2x kit atm",
    "📚 Surprise 4 : 100 Jus de cerise",
    "🚀 Surprise 5 : 10.000 $",
    "🌟 Surprise 6 : 5x kit atm",
    "🎨 Surprise 7 : 3x kit de crochetage",
    "🎉 Surprise 8 : 100 bouteille d'eau (matière première)",
    "🏞 Surprise 9 : Reduction du quota de 200 bières",
    "🍩 Surprise 10 : 15.000 $",
    "🎶 Surprise 11 : Rien...",
    "💡 Surprise 12 : -5% sur l'altmarket (seulement ce jour-ci)",
    "🎤 Surprise 13 : Bijouterie : Reprise des bijoux à 180 (peut importe la quantité)",
    "🎯 Surprise 14 : 1x Boombox",
    "🎹 Surprise 15 : 20.000 $",
    "🍕 Surprise 16 : 40x cigarette de contrebande",
    "🎬 Surprise 17 : 250 Jus de cerise",
    "🎲 Surprise 18 : Rien...",
    "🎮 Surprise 19 : -10% sur l'altmarket (seulement ce jour-ci)",
    "📷 Surprise 20 : 25.000 $",
    "🎷 Surprise 21 : -15% sur l'altmarket (seulement ce jour-ci)",
    "🍔 Surprise 22 : Rien...",
    "🍷 Surprise 23 : Reduction du quota de 350 bières",
    "🎅 Surprise 24 : -20% sur l'altmarket (seulement ce jour-ci)",
    "🌟 Joyeux Noël ! : Déco et vas profiter de ta famille, tes amis ou qui tu veut...",
  ];

  // Restaurer l'état des jours ouverts depuis les cookies au chargement
  useEffect(() => {
    const savedOpened = Cookies.get("openedDays");
    if (savedOpened) {
      setOpened(JSON.parse(savedOpened));
    }
  }, []);

  // Sauvegarder les jours ouverts dans les cookies
  useEffect(() => {
    Cookies.set("openedDays", JSON.stringify(opened), { expires: 30 }); // Expiration dans 30 jours
  }, [opened]);

  // Fonction pour calculer le temps restant jusqu'à minuit
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    const nextDay = new Date();
    nextDay.setDate(today + 1);
    nextDay.setHours(0, 0, 0, 0);

    const diff = nextDay - now;

    if (diff <= 0) return "00h 00m 00s";

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  }, [today]);

  // Mettre à jour le temps restant chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer); // Nettoyage du timer
  }, [calculateTimeRemaining]);

  const handleOpen = (day) => {
    if (day <= today && !opened.includes(day)) {
      setOpened([...opened, day]);
      setSelectedDay(day);
    }
  };

  return (
    <div className="page-container">
      <div className="title-container">
        <h1 className="page-title">Brasserie de Cayo - Calendrier de l'Avent</h1>
        <p className="time-remaining">Prochain Cadeau : {timeRemaining}</p>
      </div>
      <div className="house-container">
        <div className="calendar-container">
          {[...Array(24).keys()].map((_, index) => {
            const day = index + 1;
            return (
              <div
                key={day}
                className={`day ${
                  opened.includes(day)
                    ? "opened"
                    : day <= today
                    ? "active"
                    : "inactive"
                }`}
                onClick={() => handleOpen(day)}
              >
                {day}
              </div>
            );
          })}
          <div
            className={`day day-25 ${
              today >= 25 ? "active" : "inactive"
            }`}
            onClick={() => handleOpen(25)}
          >
            25
          </div>
        </div>
      </div>

      {selectedDay !== null && (
        <div className="surprise">{surprises[selectedDay - 1]}</div>
      )}

      {/* Footer */}
      <footer className="footer">Feareis - 2024</footer>
    </div>
  );
};

export default Calendar;
