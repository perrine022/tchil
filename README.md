# Tchil App - Prototype Web Mobile

Prototype navigable de l'application mobile Tchil App V1, conçu pour une démonstration client via une URL de test.

## 🎯 Objectif

Ce prototype simule l'application mobile Tchil App sous forme de site web responsive mobile-first. Il permet de démontrer les fonctionnalités principales de l'application sans backend complet, avec des données mockées et une navigation fluide.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement local

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
npm run build
npm start
```

## 📱 Fonctionnalités implémentées

### Onboarding & Authentification
- Page d'accueil avec choix "Créer un compte" / "Se connecter"
- Choix du type de compte (Particulier / Créateur / Professionnel)
- Sous-types pour Particulier (Mineur / Adulte)
- Méthodes de connexion : Email, Téléphone (OTP), Social (Apple/Google)
- Écran de consentement RGPD

### Vérification & Conformité
- Page de vérification d'identité avec upload mock
- Documents requis selon le type de compte :
  - Particulier : CNI/Passeport (+ autorisation parentale si mineur)
  - Professionnel : KBIS + CNI
  - Créateur : CNI/Passeport
- Statut "Essentiel" pour comptes non vérifiés

### Shell App
- Navigation bottom tab avec 5 onglets :
  1. Fil
  2. Rencontres
  3. Événements
  4. Check-in
  5. Profil

### Fil d'actualité
- Scroll vertical avec publications mockées
- Cards avec photo/vidéo placeholder, auteur, likes, commentaires
- Tabs "Pour toi" / "Abonnements"
- Interactions : like, commenter, s'abonner

### Rencontres
- Interface type swipe (Tinder-like)
- Cartes avec drag gesture (ou boutons Like/Nope)
- Géolocalisation simulée (distance et ville)
- Filtres : distance, âge min/max

### Messagerie
- Liste de conversations
- Conversation 1-1 (texte, emoji, média placeholder)
- Limitations selon le plan (Basic : limité aux matchs)

### Événements & Agenda
- Liste d'événements (public/privé)
- Page détail avec participation
- Création d'événement (formulaire)
- Invitations et rappels (UI)

### Géolocalisation & Check-in QR
- Page "Carte" : liste de lieux partenaires
- Page "Scanner QR" : simulation de scan via input texte
- Limites appliquées : 3/jour et 10/semaine
- Messages d'erreur/état selon les limites

### Boutique Pro
- Accessible à tous types d'utilisateurs
- Barre de recherche
- Liste de produits mockés
- Panier avec badge de notification

### Profil
- Profil utilisateur avec photo placeholder, bio
- Onglets : Publications / Médias / Amis
- Modération : Signaler, Bloquer

### TchilCoins
- Wallet avec solde (toggle afficher/masquer)
- Historique de transactions mock
- Onglets : Gains / Dépenses / Conversion
- Gains : parrainage, check-in QR, abonnements
- Conversion créateurs/pro (UI)

### Abonnements
- Plans Particuliers : Essentiel (0€), Basic (4.99€), Gold (9.99€), Infinity (14.99€)
- Plans Pro : Pro (39.99€), Pro+ (49.99€)
- Description des capacités de chaque plan
- Impact sur l'UI selon le plan sélectionné

### Modération & Sécurité
- Bouton "Signaler" sur profil/contenu/message
- Modal avec motifs de signalement
- Blocage d'utilisateur (UI)

## 🎨 Design

- **Style** : Ultra minimal, strictement noir & blanc
- **Mobile-first** : Optimisé pour iPhone 12/13 (390x844)
- **Desktop** : Device frame centré (max-width 420px)
- **Accessibilité** : Contrastes, focus states, tailles de touch targets (min 44x44px)
- **Micro-interactions** : Transitions simples, skeleton loaders

## 🏗️ Architecture

### Structure des routes

```
/app
  /auth
    /register
    /login
  /verify
  /demo
  /(app)
    /feed
    /dating
    /events
      /[id]
    /checkin
    /messages
      /[id]
    /profile
      /settings
    /shop
      /cart
    /wallet
    /subscriptions
```

### Composants réutilisables

- `BottomNav` : Navigation bottom tab
- `Header` : Header avec titre, bouton retour, actions
- `Modal` : Modal réutilisable
- `Badge` : Badge de statut
- `Tabs` : Système d'onglets

### State Management

- **Zustand** avec persistance localStorage
- Store principal : `lib/store.ts`
- Données persistées : user, modules, checkInLimits, cart, tchilCoins

### Données mockées

- `data/mockUsers.json` : Utilisateurs de démo
- `data/mockPosts.json` : Publications
- `data/mockEvents.json` : Événements
- `data/mockProducts.json` : Produits boutique
- `data/mockMessages.json` : Conversations
- `data/mockConversations.json` : Messages détaillés
- `data/mockPlaces.json` : Lieux pour check-in

## 🎭 Mode Démo

Le prototype inclut un **Mode Démo** accessible depuis la page d'accueil :

1. Cliquez sur "Mode Démo"
2. Sélectionnez un compte de démonstration :
   - Particulier (Mineur/Adulte)
   - Créateur
   - Professionnel
3. Chaque compte a un statut de vérification et un plan différents

### Module Switcher

Dans **Paramètres > Gérer les modules**, vous pouvez activer/désactiver les modules :
- Fil
- Rencontres
- Événements
- Check-in
- Messages
- Boutique
- Wallet

Les modules désactivés affichent un message indiquant qu'ils sont désactivés.

### Changer de compte démo

Dans **Paramètres > Mode Démo**, vous pouvez :
- Changer le type de compte (Particulier / Créateur / Professionnel)
- Basculer entre "Vérifié" / "Non vérifié"

## 🚢 Déploiement sur Vercel

### Prérequis

1. Compte Vercel (gratuit) : [vercel.com](https://vercel.com)
2. Repository Git (GitHub, GitLab, ou Bitbucket)

### Étapes de déploiement

1. **Préparer le projet**
   ```bash
   npm run build
   ```
   Vérifiez qu'il n'y a pas d'erreurs de build.

2. **Connecter à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Importez votre repository Git
   - Vercel détectera automatiquement Next.js

3. **Configuration**
   - Framework Preset : Next.js (détecté automatiquement)
   - Build Command : `npm run build` (par défaut)
   - Output Directory : `.next` (par défaut)
   - Install Command : `npm install` (par défaut)

4. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez la fin du build
   - Votre site sera accessible via une URL Vercel (ex: `tchil-app.vercel.app`)

5. **Domaines personnalisés (optionnel)**
   - Dans les paramètres du projet Vercel
   - Ajoutez votre domaine personnalisé

### Variables d'environnement

Aucune variable d'environnement n'est requise pour ce prototype (données mockées).

### Déploiement continu

Vercel déploie automatiquement à chaque push sur la branche principale.

## 📋 Parcours de démonstration recommandé

1. **Accueil** → Cliquez sur "Mode Démo"
2. **Sélection** → Choisissez un compte (ex: "Alice Martin - Particulier vérifié")
3. **Fil** → Explorez les publications, likez, commentez
4. **Rencontres** → Swipez sur les profils, testez les filtres
5. **Événements** → Consultez les événements, créez-en un
6. **Check-in** → Testez le scanner QR (entrez un code comme "QR-TCHIL-CAFE-001")
7. **Messages** → Consultez les conversations
8. **Profil** → Explorez les onglets, testez "Signaler" et "Bloquer"
9. **Boutique** → Ajoutez des produits au panier
10. **Wallet** → Consultez les TchilCoins, gains, dépenses
11. **Abonnements** → Changez de plan, observez l'impact sur l'UI
12. **Paramètres** → Testez le Module Switcher et le Mode Démo

## 🔧 Technologies utilisées

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Zustand** (state management)
- **localStorage** (persistance)

## 📝 Notes importantes

- Ce prototype utilise des **données mockées** : aucune authentification réelle, pas de backend
- Les uploads de fichiers sont **simulés** (alertes)
- Les paiements sont **simulés** (alertes)
- Les interactions sociales sont **mockées** (pas de vraie base de données)
- Le design est **strictement noir & blanc** comme spécifié
- Le prototype est **mobile-first** avec device frame sur desktop

## 🐛 Problèmes connus / Limitations

- Les gestes de swipe sur mobile peuvent nécessiter des ajustements selon le navigateur
- Les données mockées sont statiques (pas de mise à jour en temps réel)
- Les uploads de fichiers ne fonctionnent pas réellement (simulation)

## 📄 Licence

Ce prototype est créé pour une démonstration client. Tous droits réservés.

---

**Créé avec ❤️ pour Tchil App**
# tchil
