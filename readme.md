# Port Russell - Backend Express/MongoDB

## Description

Port Russell est une application de gestion pour un port. Elle permet de gérer :

- Les **utilisateurs**
- Les **catways**
- Les **réservations** de catways pour des clients et leurs bateaux

L'application dispose d’un tableau de bord, d’une interface web avec EJS, et d’une **API documentée avec Swagger**.

---

## Fonctionnalités

- Authentification avec JWT
- CRUD complet pour :
  - Utilisateurs
  - Catways
  - Réservations
- Tableau de bord avec statistiques des réservations par catway
- Documentation API disponible via Swagger (`/api-docs`)

---

## Technologies utilisées

- **Node.js** & **Express**
- **MongoDB Atlas** avec **Mongoose**
- **EJS** pour le rendu côté serveur
- **Bootstrap 5** pour le design
- **Chart.js** pour les graphiques
- **Swagger** pour la documentation de l’API
- **dotenv** pour la configuration des variables d'environnement

---

## Installation

## Cloner le projet :

```bash
git clone <url_du_repo>
cd api-port-russel-hamdi-mohamed


## Installer les dépendances :
npm install
## .env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=<votre_jwt_secret>

## Lancer le serveur en local :

npm start

## Structure du projet
```txt
api-port-russel-hamdi-mohamed/
│
├── backend/
│   ├── config/        # Configuration DB
│   ├── middleware/    # Middleware auth, logger, etc.
│   ├── models/        # Schémas Mongoose
│   ├── routes/        # Routes Express
│   ├── swagger/       # Swagger configuration
│   └── views/         # Templates EJS
├── package.json
└── server.js          # Point d'entrée de l'application


##  Documentation API

http://localhost:5000/api-docs



## Auteur

Projet réalisé par Mohamed Hamdi
Formation Développeur Web / Full Stack
