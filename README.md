# Eseménykezelő Webalkalmazás

Ez a projekt egy teljes értékű (Full-Stack) webalkalmazás, amely események kezelésére és az azokra való jelentkezésre szolgál. A projekt eleget tesz a modern webfejlesztési elvárásoknak, beleértve a reszponzív dizájnt, a relációs adatbázis-kezelést, az API alapú kommunikációt és az automatizált tesztelést.

## 🛠️ Alkalmazott Technológiák

- **Kliensoldal (Frontend):** React.js (Vite), Tailwind CSS (reszponzív dizájn)
- **Szerveroldal (Backend):** Node.js, Express.js
- **Adatbázis & ORM:** SQLite (relációs adatbázis), Prisma ORM
- **Tesztelés:** Jest, Supertest
- **Verziókezelés:** Git

## 📂 Az alkalmazás felépítése

A projekt "monorepo" megközelítést alkalmaz, a kliens és a szerver egy repository-ban, de külön mappában helyezkedik el:

- `/backend`: Tartalmazza a Node.js API szervert, a Prisma adatbázis sémát és az integrációs teszteket.
- `/frontend`: Tartalmazza a React alapú, Tailwind CSS-el formázott felhasználói felületet.

## 🚀 Konfiguráció és Futtatás (Helyi környezetben)

### Előfeltételek
- Node.js (LTS verzió) telepítése
- Git telepítése

### 1. Backend indítása
1. Lépj be a backend mappába: `cd backend`
2. Telepítsd a függőségeket: `npm install`
3. Hozd létre az adatbázist: `npx prisma migrate dev --name init`
4. Indítsd el a szervert: `npm start` (vagy fejlesztői módban: `npx nodemon src/index.js`)
*A szerver a `http://localhost:3000` címen fog futni.*

### 2. Frontend indítása
1. Nyiss egy új terminált, és lépj a frontend mappába: `cd frontend`
2. Telepítsd a függőségeket: `npm install`
3. Indítsd el a kliensoldalt: `npm run dev`
*Az alkalmazás elérhető a `http://localhost:5173` címen.*

### 3. Tesztek futtatása
A backend API végpontok működésének ellenőrzéséhez lépj a `/backend` mappába, és futtasd az alábbi parancsot:
```bash
npm test

🌐 API Végpontok Leírása
- A backend az alábbi RESTful API végpontokat biztosítja a kliens számára:

- Események lekérdezése
- URL: /api/events

- Metódus: GET

- Leírás: Visszaadja az adatbázisban tárolt összes eseményt egy JSON tömbben.

- Új esemény létrehozása
- URL: /api/events

- Metódus: POST

- Leírás: Új eseményt rögzít az adatbázisban.

- Törzs (JSON): title, description, date, location

- Esemény szerkesztése
- URL: /api/events/:id

- Metódus: PUT

- Leírás: Egy meglévő esemény adatait frissíti a megadott azonosító (id) alapján.

- Törzs (JSON): title, description, date, location

- Esemény törlése
- URL: /api/events/:id

- Metódus: DELETE

- Leírás: Véglegesen törli a megadott azonosítójú (id) eseményt az adatbázisból.

- Jelentkezés eseményre
- URL: /api/events/:id/register

- Metódus: POST

- Leírás: Új jelentkezőt rögzít egy adott eseményhez.

- Törzs (JSON): name, email