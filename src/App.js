import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie"; // Gestion des cookies
import "./App.css";

const Calendar = () => {
  const today = new Date().getDate(); // Jour actuel
  const [opened, setOpened] = useState([]); // Jours ouverts
  const [selectedDay, setSelectedDay] = useState(null); // Jour sélectionné
  const [timeRemaining, setTimeRemaining] = useState(""); // Temps restant pour le prochain jour

  const surprises = [
    "🎁 Surprise 1",
    "🎄 Surprise 2",
    "🍫 Surprise 3",
    "📚 Surprise 4",
    "🚀 Surprise 5",
    "🌟 Surprise 6",
    "🎨 Surprise 7",
    "🎉 Surprise 8",
    "🏞 Surprise 9",
    "🍩 Surprise 10",
    "🎶 Surprise 11",
    "💡 Surprise 12",
    "🎤 Surprise 13",
    "🎯 Surprise 14",
    "🎹 Surprise 15",
    "🍕 Surprise 16",
    "🎬 Surprise 17",
    "🎲 Surprise 18",
    "🎮 Surprise 19",
    "📷 Surprise 20",
    "🎷 Surprise 21",
    "🍔 Surprise 22",
    "🍷 Surprise 23",
    "🎅 Surprise 24",
    "🌟 Joyeux Noël !",
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
    // Empêcher de cliquer sur les jours passés
    if (day < today) {
      alert("Vous ne pouvez pas réclamer un jour passé !");
      return;
    }

    // Ouvrir le jour si ce n'est pas déjà fait
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
                  day < today
                    ? "past" // Jour passé
                    : opened.includes(day)
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
        <div className="surprise">Surprise du jour : {surprises[selectedDay - 1]}</div>
      )}

      <footer className="footer">Feareis - 2024</footer>
    </div>
  );
};

export default Calendar;
