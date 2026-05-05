import { useState, useEffect } from 'react';
import { getEvents } from './services/api';

function App() {
  const [events, setEvents] = useState([]);

  // Amikor az oldal betölt, lekérjük az eseményeket a backendről
  useEffect(() => {
    getEvents().then(data => setEvents(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center drop-shadow-sm">
          Eseménykezelő Portál
        </h1>
        
        {events.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-xl text-gray-500 font-medium">Jelenleg nincsenek elérhető események.</p>
            <p className="text-sm text-gray-400 mt-2">(Az adatbázisod még üres. Később készítünk egy űrlapot a feltöltéshez!)</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between border-t-4 border-indigo-500">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="text-sm text-gray-500 flex flex-col gap-1 mb-4">
                    <span className="flex items-center gap-2">📍 {event.location}</span>
                    <span className="flex items-center gap-2">📅 {new Date(event.date).toLocaleDateString('hu-HU')}</span>
                  </div>
                  <button className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    Jelentkezés
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;