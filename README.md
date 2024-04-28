# MovieAPI

## Description du projet
Ce projet est une API réaliser avec l'aide de [ExpressJS](https://expressjs.com/fr/), elle permet de lire, supprimer, modifier et créer des films (CRUD).

## Prérequi
1. NodeJS en version **LST 20.12.2** qui peut être téléchargé [ici](https://nodejs.org/dist/v20.12.2/node-v20.12.2-x64.msi)

## Installation
1. Cloner le projet `https://github.com/RayZiaX/MovieAPI.git`.

2. Dans le projet `MovieAPI` renommer le fichier `.env.sqlite.exemple` par `.env`.

3. Fournissez les informations pour la base de données <u>sqlite ne prend pas de non d'utilisateur, de mot de passe et d'hôte</u>. Ajout un port (si rien de renseigner alors c'est le port 5000 qui est pris) de l'api.

4. Gràce à l'invite de commande vous naviguer jusqu'à la racine du projet `./MovieAPI`.

5. Dans le terminal de commande (ou l'invite de commande) executer la commande `npm install` pour récupérer les différentes dépendance du projet.

6. Dans le terminal de commande  executer `npm run test`.

## Utilisation

Pour utiliser l'api, il 2 choix, le swagger (sur un port fixe le port 5000) ou postman.
### Swagger (ou Open API)
Il est disponible à l'adresse suivante lorsque l'api fonctionne: `http://localhost:5000/api/v1/swagger` ou `http://127.0.0.1:5000/api/v1/swagger`

### Postman
Est un logiciel gratuit pour réaliser différentes requête sur une API afin de la testé.</br>
il est disponible sur:  
- [Windows](https://dl.pstmn.io/download/latest/win64)
- [Mac OS X](https://dl.pstmn.io/download/latest/osx_arm64)
- [Linux](https://dl.pstmn.io/download/latest/linux_64)

### Un exemple de requête et sa réponse

GET

Récupération d'un seul films </br>
`http://localhost:{port}/api/v1/movie/5` ou `http://127.0.0.1:{port}/api/v1/movie/5`

Voici un exemple de réponse en ```application/json```
```
{
    "data": {
        "id_movie": 5,
        "name": "Star Wars, épisode IV : Un nouvel espoir",
        "description": "La guerre civile fait rage entre l'Empire galactique et l'Alliance rebelle.",
        "date": "1977-10-19"
    },
    "error": {},
    "meta": "2024-04-23T00:53:50.208Z"
}
```

Pour plus d'information sur les différentes routes veuillez consulter le swagger de cette dernière ici:</br> `http://localhost:5000/api/v1/swagger` ou `http://127.0.0.1:5000/api/v1/swagger`