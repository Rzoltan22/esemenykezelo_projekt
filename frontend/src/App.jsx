import { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import { getEvents, registerForEvent, deleteEvent, updateEvent } from './services/api';

function App() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null); // Ez tárolja, hogy épp melyiket szerkesztjük

  const loadEvents = () => {
    getEvents().then(data => setEvents(data));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleRegister = async (eventId) => {
    const name = window.prompt("Jelentkezés: Kérlek, add meg a nevedet!");
    if (!name) return;
    const email = window.prompt("Jelentkezés: Kérlek, add meg az e-mail címedet!");
    if (!email) return;

    const result = await registerForEvent(eventId, { name, email });
    if (result) alert(`Sikeresen jelentkeztél, ${name}!`);
    else alert("Hiba történt a jelentkezés során.");
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Biztosan törölni szeretnéd ezt az eseményt?")) {
      await deleteEvent(eventId);
      loadEvents(); // Újratöltjük a listát
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await updateEvent(editingEvent.id, editingEvent);
    setEditingEvent(null); // Kilépünk a szerkesztő módból
    loadEvents();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center drop-shadow-sm">
          Eseménykezelő Portál
        </h1>
        
        <EventForm onEventAdded={loadEvents} />

        {events.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-xl text-gray-500 font-medium">Jelenleg nincsenek elérhető események.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              // Ha ezt az eseményt szerkesztjük, egy űrlapot mutatunk
              editingEvent?.id === event.id ? (
                <form key={event.id} onSubmit={handleUpdateSubmit} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500 flex flex-col gap-3">
                  <h3 className="font-bold text-gray-700">Szerkesztés</h3>
                  <input required type="text" className="border p-2 rounded" value={editingEvent.title} onChange={e => setEditingEvent({...editingEvent, title: e.target.value})} />
                  <input required type="text" className="border p-2 rounded" value={editingEvent.location} onChange={e => setEditingEvent({...editingEvent, location: e.target.value})} />
                  <input required type="datetime-local" className="border p-2 rounded" value={editingEvent.date.slice(0, 16)} onChange={e => setEditingEvent({...editingEvent, date: e.target.value})} />
                  <textarea className="border p-2 rounded" value={editingEvent.description} onChange={e => setEditingEvent({...editingEvent, description: e.target.value})} />
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded w-full hover:bg-green-600">Mentés</button>
                    <button type="button" onClick={() => setEditingEvent(null)} className="bg-gray-400 text-white px-3 py-1 rounded w-full hover:bg-gray-500">Mégse</button>
                  </div>
                </form>
              ) : (
                // Ha nem szerkesztjük, a normál kártyát mutatjuk
                <div key={event.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between border-t-4 border-indigo-500">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingEvent(event)} className="text-yellow-600 hover:text-yellow-800" title="Szerkesztés">✏️</button>
                        <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-800" title="Törlés">🗑️</button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  </div>
                  <div className="mt-4 border-t pt-4">
                    <div className="text-sm text-gray-500 flex flex-col gap-1 mb-4">
                      <span className="flex items-center gap-2">📍 {event.location}</span>
                      <span className="flex items-center gap-2">📅 {new Date(event.date).toLocaleDateString('hu-HU')}</span>
                    </div>
                    <button onClick={() => handleRegister(event.id)} className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                      Jelentkezés
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;