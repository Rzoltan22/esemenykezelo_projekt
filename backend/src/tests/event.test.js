const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Teszt környezet inicializálása
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// A szerver funkcióit (routert) közvetlenül ide másoljuk a teszthez
app.get('/api/events', async (req, res) => {
  const events = await prisma.event.findMany();
  res.json(events);
});

app.post('/api/events', async (req, res) => {
  const { title, description, date, location } = req.body;
  const newEvent = await prisma.event.create({
    data: { title, description, date: new Date(date), location }
  });
  res.status(201).json(newEvent);
});

describe('Eseménykezelő API Tesztek', () => {
  
  // Teszt 1: Tudunk-e új eseményt létrehozni (POST)
  it('Létre kell hoznia egy új eseményt', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({
        title: 'Teszt Esemény',
        description: 'Ez egy teszt leírás',
        date: '2025-10-10T10:00:00Z',
        location: 'Budapest'
      });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Teszt Esemény');
  });

  // Teszt 2: Lekérdezi-e az eseményeket (GET)
  it('Le kell kérdeznie az események listáját', async () => {
    const res = await request(app).get('/api/events');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0); // Mivel az előző tesztben már létrehoztunk egyet
  });

});
