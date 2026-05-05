const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware-ek beállítása
app.use(cors()); // Engedélyezi, hogy a frontend (másik porton) kommunikáljon a backenddel
app.use(express.json()); // Képes lesz feldolgozni a bejövő JSON adatokat

// --- API VÉGPONTOK ---

// 1. Összes esemény lekérdezése (GET /api/events)
app.get('/api/events', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      // Opcionális: Visszaadjuk az eseményhez tartozó jelentkezéseket is
      include: { registrations: true } 
    });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt az események lekérdezésekor' });
  }
});

// 2. Új esemény létrehozása (POST /api/events) - Opcionális funkcióhoz!
app.post('/api/events', async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date), // A stringként kapott dátumot Date objektummá alakítjuk
        location
      }
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba az esemény létrehozásakor' });
  }
});

// 3. Jelentkezés egy konkrét eseményre (POST /api/events/:id/register)
app.post('/api/events/:id/register', async (req, res) => {
  const eventId = parseInt(req.params.id);
  const { name, email } = req.body;
  
  try {
    const registration = await prisma.registration.create({
      data: {
        name,
        email,
        eventId
      }
    });
    res.status(201).json(registration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba a jelentkezés során' });
  }
});

// Szerver elindítása
app.listen(PORT, () => {
  console.log(`🚀 A backend szerver fut a http://localhost:${PORT} címen`);
});