<h1 align="center">
  Smart Study API
</h1>

<p align="center">
  Ce présent README est un guide pour l'installation et l'utilisation de l'API Smart Study.
<p align="center">

## Prérequis

Vous devez avoir installé sur votre machine :
- [Node.js](https://nodejs.org/en/download/) (version 18 ou supérieure)
- [Docker](https://docs.docker.com/get-docker/)
- [npm](https://www.npmjs.com/get-npm) 
- [PostgreSQL](https://www.postgresql.org/download/)
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (pour les tests de paiement)
- [Doppler CLI](https://docs.doppler.com/docs/enclave-installation) (pour la gestion des variables d'environnement)

## Installation

Vous devez tout d'abord cloner le projet sur votre machine :

```bash
# Veillez à avoir une clé SSH configurée sur votre machine pour votre compte GitHub
$ git clone git@github.com:unkobweb/smart-study-api.git
```

Puis installer les dépendances du projet :

```bash
$ npm install
```

Vous devez créer une base de données PostgreSQL pour le projet puis renseigner les informations de connexion à cette dernière dans un .env (basez-vous sur le .env.example)

Pour ce qui est des autres variables d'environnement, vous devez les récupérer depuis Doppler 
  
```bash
$ doppler setup
```

## Lancer l'application et ses dépendances

Lancement du conteneur MeiliSearch (service utilisé pour la recherche de cours/métiers) :

⚠️ Si sous Windows, lancer avec PowerShell
```powershell
docker run -it --rm -p 7700:7700 -e MEILI_MASTER_KEY='Y_sKAls5iPB5I8bWA4g0mWNhPAiL2QGDXNPP61w-tLQ' -v ${pwd}/meili_data:/meili_data getmeili/meilisearch:v1.3
```

Lancement du l'écouteur de Stripe :

```bash
$ stripe login # Se connecter à votre compte Stripe
$ stripe listen --forward-to localhost:8080/purchase/webhook
```

## Lancer l'application

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```