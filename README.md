# MarketShop - Version React Native

**Développé par :** prenom-nom
**Technologie :** React Native avec Expo

## Description
MarketShop est une application de mini e-commerce qui permet de parcourir un catalogue de produits via l'API FakeStore, d'ajouter des articles à un panier, de passer commande et de consulter son historique.

## Fonctionnalités implémentées
- [x] Écran Catalogue (Grille 2 colonnes, API, Filtres, Chargement)
- [x] Écran Détail Produit (Affichage complet, Sélecteur quantité, Ajout panier)
- [x] Écran Panier (Liste locale, Modification, Suppression, Total, Commande)
- [x] Écran Commande (Formulaire validé, Sauvegarde locale, Redirection)
- [x] Écran Historique (Liste locale des commandes passées)
- [x] Écran Profil (Infos utilisateur, Mode Sombre, Suppression de données)

## Bibliothèques utilisées
- `axios` (Appels API)
- `@react-navigation/native` & `@react-navigation/bottom-tabs` (Navigation)
- `@react-native-async-storage/async-storage` (Persistance locale)
- `React Context` (Gestion d'état)

## Captures d'écran
*(Ajoutez ici 3 captures d'écran de l'application)*
1. ![Catalogue](./screenshots/catalogue.png)
2. ![Panier](./screenshots/panier.png)
3. ![Historique](./screenshots/historique.png)

## Difficultés rencontrées
La configuration de la navigation par onglets avec une pile de navigation imbriquée a été complexe au début. J'ai dû m'assurer que les écrans comme "Checkout" ne sont pas visibles dans les onglets principaux, en structurant correctement les StackNavigators dans le TabNavigator.

## Améliorations possibles
Avec plus de temps, j'aurais ajouté l'utilisation de `Zustand` ou `Redux` pour une gestion d'état plus robuste, et j'aurais implémenté un système de mise en cache des images pour optimiser le chargement lors du défilement du catalogue.

## Lien vers la version Flutter
[Dépôt Flutter](https://github.com/votre-compte/marketshop-flutter-prenom-nom)
