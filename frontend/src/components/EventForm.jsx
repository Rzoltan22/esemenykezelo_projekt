import { useState } from 'react';

export default function EventForm({ onEventAdded }) {
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({ title: '', description: '', date: '', location: '' }); // Űrlap ürítése
        onEventAdded(); // Szólunk a főoldalnak, hogy frissítse a listát
      }
    } catch (error) {
      console.error('Hiba:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Új esemény meghirdetése</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required type="text" placeholder="Esemény címe" className="p-2 border rounded"
          value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <input required type="text" placeholder="Helyszín" className="p-2 border rounded"
          value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
        <input required type="datetime-local" className="p-2 border rounded"
          value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        <input type="text" placeholder="Rövid leírás" className="p-2 border rounded"
          value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
      </div>
      <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">
        Esemény Létrehozása
      </button>
    </form>
  );
}