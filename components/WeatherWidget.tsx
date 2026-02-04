import React, { useState, useEffect } from "react";

// Coordenadas exactas de Zuheros
const LAT = 37.5441;
const LON = -4.3161;
// 15 minutos es el intervalo ideal para no saturar
const REFRESH_INTERVAL = 15 * 60 * 1000;

const WeatherWidget: React.FC = () => {
  const [temp, setTemp] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    try {
      // Open-Meteo no pide Keys y es ultra rápida
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`,
      );
      const data = await response.json();

      if (
        data.current_weather &&
        data.current_weather.temperature !== undefined
      ) {
        setTemp(Math.round(data.current_weather.temperature));
        setError(false);
      }
    } catch (err) {
      console.error("Error obteniendo clima:", err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchWeather();
    const timer = setInterval(fetchWeather, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-4 px-6 py-4 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl text-center flex items-center gap-4 transition-transform active:scale-95">
      {/* Icono de termómetro (puedes usar el tuyo o un emoji para probar rápido) */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/10844/10844554.png"
        alt="Termómetro"
        className="w-20 invert"
      />

      <div className="text-left">
        <div className="text-6xl font-black text-white tabular-nums leading-none">
          {temp !== null ? `${temp}°C` : error ? "--" : "..."}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
