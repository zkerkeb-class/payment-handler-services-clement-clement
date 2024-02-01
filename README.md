# WEB SERVICE (Ynov) - Service de gestion des paiements

## Description du service

**Objectif** : Construire un service pour gérer les transactions financières, y compris les paiements, les remboursements et la facturation.

**Fonctionnalités clés** :

- Intégration avec des systèmes de paiement comme Stripe ou PayPal.
- Gestion sécurisée des informations de paiement et des transactions.
- Support pour les paiements récurrents et la gestion des abonnements.

> Ce services gèrera les interactions avec l’api Stripe ou paypal, et il interagira avec le service dédié aux operation en base de donnée pour changer le statut de l’utilisateur (Date de fin d’abonnement, type d’abo etc.). Ce service devra envoyer la facture via le service mail, il devra également envoyer des mails de notification (debut d’abo, fin d’abo, notif de non paiement, etc)

## Project members

- Clément DUFOUR-LAMARTINIE
- Clément WALSH DE SERRANT

## Installation and configuration

Run `npm install`

Create `.env` file

.env configuration :

 <pre>
PORT=3005
 </pre>

## Run project

Run `npm run dev`
