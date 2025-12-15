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
git clone https://github.com/medyou21/api-port-russel-hamdi-mohamed.git
cd api-port-russel-hamdi-mohamed


## Installer les dépendances :
npm install
## .env
PORT=5000
MONGO_URI=mongodb+srv://Mohamed:Youssef2016@projet-api.fexuybr.mongodb.net/?appName=Projet-API
JWT_SECRET=monSuperSecretJWT123
JWT_EXPIRES_IN=1h

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
│
├── .env               # Variables d'environnement
├── package.json
└── server.js          # Point d'entrée de l'application


##  Documentation API

http://localhost:5000/api-docs

## Compte de démonstration
Email : admin@example.com
Mot de passe : admin123

## Auteur

Projet réalisé par Mohamed Hamdi
Formation Développeur Web / Full Stack
