# Documentation API - Données de Formulaire pour Génération de Devis

## Vue d'ensemble

Ce document décrit la structure des données JSON qui seront transmises à l'équipe d'automatisation pour la génération automatique de devis. Les données proviennent d'un formulaire multi-étapes collectant les informations nécessaires pour différents types de projets d'urbanisme.

## Structure Générale des Données

### Types de Projets Supportés

```typescript
enum Option {
  PERMIS_CONSTRUIRE = "permis-construire",
  DECLARATION_PREALABLE = "declaration-prealable",
  DOSSIER_ERP = "dossier-erp",
  CERTIFICAT_URBANISME = "certificat-urbanisme",
  PLAN_UNITE = "plan-unite",
  ETUDE_RE2020 = "etude-re2020",
  ETUDE_SISMIQUE = "etude-sismique",
  AIDE_CONCEPTION = "aide-conception",
}
```

## Description Détaillée des Champs

### 1. Informations de Localisation (Étape 1)

| Champ                                 | Type   | Description                                   | Obligatoire |
| ------------------------------------- | ------ | --------------------------------------------- | ----------- |
| `address`                             | string | Adresse complète formatée                     | ✅          |
| `addressDetails`                      | object | Détails géographiques et cadastraux           | ✅          |
| `addressDetails.coordinates`          | object | Coordonnées GPS                               | ❌          |
| `addressDetails.coordinates.lat`      | number | Latitude                                      | ❌          |
| `addressDetails.coordinates.lng`      | number | Longitude                                     | ❌          |
| `addressDetails.formattedAddress`     | string | Adresse formatée Google Places                | ❌          |
| `addressDetails.parcelNumber`         | string | Numéro de parcelle cadastrale (ex: "AK 0084") | ❌          |
| `addressDetails.urbanZone`            | string | Zone d'urbanisme (ex: "UA")                   | ❌          |
| `addressDetails.city`                 | string | Ville/Commune                                 | ❌          |
| `addressDetails.placeId`              | string | ID Google Places                              | ❌          |
| `addressDetails.difficultyEstimation` | number | Estimation de difficulté (1-5)                | ❌          |

### 2. Type de Projet (Étape 2)

| Champ    | Type   | Description                                   | Obligatoire |
| -------- | ------ | --------------------------------------------- | ----------- |
| `option` | string | Type de projet sélectionné (voir enum Option) | ✅          |

### 3. Détails du Projet (Étape 3)

#### Champs Communs

| Champ               | Type    | Description                    | Obligatoire |
| ------------------- | ------- | ------------------------------ | ----------- |
| `isArchitectNeeded` | boolean | Nécessité d'un architecte      | ❌          |
| `pluVerification`   | boolean | Vérification du PLU (180€ TTC) | ❌          |
| `expressDelivery`   | boolean | Livraison express (90€ TTC)    | ❌          |

#### Spécifiques au Permis de Construire

| Champ                                             | Type    | Description                            | Obligatoire |
| ------------------------------------------------- | ------- | -------------------------------------- | ----------- |
| `hasMultipleRealizationsOnSameConstructionPermit` | boolean | Plusieurs réalisations sur même permis | ❌          |
| `realizationsOnSameConstructionPermitNumber`      | number  | Nombre de sous-projets                 | ❌          |
| `rdcPlanVerification`                             | boolean | Vérification plan RDC                  | ❌          |
| `rdcPlanNumber`                                   | number  | Nombre de plans RDC                    | ❌          |
| `bbioStudy`                                       | boolean | Étude Bbio                             | ❌          |
| `seismicStudy`                                    | boolean | Étude sismique                         | ❌          |

#### Spécifiques à la Déclaration Préalable

| Champ                                      | Type    | Description                                 | Obligatoire |
| ------------------------------------------ | ------- | ------------------------------------------- | ----------- |
| `hasMultipleRealizationsOnSameDeclaration` | boolean | Plusieurs réalisations sur même déclaration | ❌          |
| `realizationsOnSameDeclarationNumber`      | number  | Nombre de sous-projets                      | ❌          |
| `displayPanel`                             | boolean | Panneau d'affichage                         | ❌          |

#### Spécifiques au Certificat d'Urbanisme

| Champ                                              | Type    | Description                                | Obligatoire |
| -------------------------------------------------- | ------- | ------------------------------------------ | ----------- |
| `hasMultipleRealizationsOnSameUrbanismCertificate` | boolean | Plusieurs réalisations sur même certificat | ❌          |
| `realizationsOnSameUrbanismCertificateNumber`      | number  | Nombre de sous-projets                     | ❌          |

#### Spécifiques aux Plans à l'Unité

| Champ                                      | Type     | Description                             | Obligatoire |
| ------------------------------------------ | -------- | --------------------------------------- | ----------- |
| `hasMultipleRealizationsOnSamePlanRequest` | boolean  | Plusieurs réalisations sur même demande | ❌          |
| `realizationsOnSamePlanRequestNumber`      | number   | Nombre de sous-projets                  | ❌          |
| `neededPlans`                              | string[] | Types de plans nécessaires              | ❌          |
| `shouldMakeRDCPlan`                        | boolean  | Création de plan RDC                    | ❌          |
| `rdcPlanCount`                             | number   | Nombre de plans RDC                     | ❌          |
| `shouldMake3dRender`                       | boolean  | Création de rendu 3D                    | ❌          |
| `renderCount3d`                            | number   | Nombre de rendus 3D                     | ❌          |

### 4. Informations Client (Étape 5)

| Champ             | Type   | Description         | Obligatoire |
| ----------------- | ------ | ------------------- | ----------- |
| `clientFirstName` | string | Prénom du client    | ✅          |
| `clientLastName`  | string | Nom du client       | ✅          |
| `clientPhone`     | string | Téléphone du client | ✅          |
| `clientEmail`     | string | Email du client     | ✅          |

### 5. Champs de Validation (Internes)

| Champ                | Type    | Description        |
| -------------------- | ------- | ------------------ |
| `isStepOneChecked`   | boolean | Validation étape 1 |
| `isStepTwoChecked`   | boolean | Validation étape 2 |
| `isStepThreeChecked` | boolean | Validation étape 3 |
| `isStepFourChecked`  | boolean | Validation étape 4 |
| `isStepFiveChecked`  | boolean | Validation étape 5 |
| `isStepSixChecked`   | boolean | Validation finale  |

## Tarification des Options

### Services Payants

- **Vérification PLU** : 180€ TTC
- **Livraison Express** : 90€ TTC
- **Étude Bbio** : Prix variable selon projet
- **Étude Sismique** : Prix variable selon projet

## Notes Importantes

1. **Validation** : Tous les champs marqués comme obligatoires doivent être présents et non vides
2. **Conditionnalité** : Certains champs ne sont pertinents que selon le type de projet sélectionné
3. **Géolocalisation** : Les coordonnées GPS permettent une estimation plus précise de la difficulté
4. **Estimation de Difficulté** : Calculée automatiquement (1=facile, 5=très difficile) basée sur la localisation
5. **Formats** :
   - Téléphone : Format français (10 chiffres)
   - Email : Format email valide
   - Coordonnées : Décimales (WGS84)

## Exemples JSON

### Exemple 1 : Permis de Construire Complet

```json
{
  "address": "16 rue Latapie, 33650 La Brède, France",
  "addressDetails": {
    "coordinates": {
      "lat": 44.6833,
      "lng": -0.5167
    },
    "formattedAddress": "16 rue Latapie, 33650 La Brède, France",
    "parcelNumber": "AK 0084",
    "urbanZone": "UA",
    "city": "La Brède",
    "placeId": "ChIJd7ZrVvW_VQ0RmSfRtbha0-k",
    "difficultyEstimation": 3
  },
  "option": "permis-construire",
  "isArchitectNeeded": true,
  "hasMultipleRealizationsOnSameConstructionPermit": false,
  "realizationsOnSameConstructionPermitNumber": null,
  "pluVerification": true,
  "rdcPlanVerification": true,
  "rdcPlanNumber": 2,
  "bbioStudy": true,
  "seismicStudy": false,
  "expressDelivery": true,
  "displayPanel": false,
  "clientFirstName": "Nicolas",
  "clientLastName": "DUPONT",
  "clientPhone": "0606060606",
  "clientEmail": "nicolasdupont@gmail.com",
  "isStepOneChecked": true,
  "isStepTwoChecked": true,
  "isStepThreeChecked": true,
  "isStepFourChecked": true,
  "isStepFiveChecked": true,
  "isStepSixChecked": true
}
```

### Exemple 2 : Déclaration Préalable Simple

```json
{
  "address": "25 Avenue des Champs-Élysées, 75008 Paris, France",
  "addressDetails": {
    "coordinates": {
      "lat": 48.8698,
      "lng": 2.3076
    },
    "formattedAddress": "25 Avenue des Champs-Élysées, 75008 Paris, France",
    "parcelNumber": "AB 0156",
    "urbanZone": "UG",
    "city": "Paris",
    "placeId": "ChIJLU7jZClu5kcR4PcOOO6p3I0",
    "difficultyEstimation": 5
  },
  "option": "declaration-prealable",
  "isArchitectNeeded": false,
  "hasMultipleRealizationsOnSameDeclaration": true,
  "realizationsOnSameDeclarationNumber": 3,
  "pluVerification": true,
  "expressDelivery": false,
  "displayPanel": true,
  "clientFirstName": "Marie",
  "clientLastName": "MARTIN",
  "clientPhone": "0123456789",
  "clientEmail": "marie.martin@email.com",
}
```

### Exemple 3 : Plan à l'Unité avec Rendu 3D

```json
{
  "address": "12 Rue de la Paix, 69001 Lyon, France",
  "addressDetails": {
    "coordinates": {
      "lat": 45.764,
      "lng": 4.8357
    },
    "formattedAddress": "12 Rue de la Paix, 69001 Lyon, France",
    "parcelNumber": "CD 0089",
    "urbanZone": "UC",
    "city": "Lyon",
    "placeId": "ChIJMVd4MymL9EcRUFphTWsO-ow",
    "difficultyEstimation": 4
  },
  "option": "plan-unite",
  "hasMultipleRealizationsOnSamePlanRequest": false,
  "realizationsOnSamePlanRequestNumber": null,
  "neededPlans": ["plan-masse", "plan-facade", "plan-coupe"],
  "shouldMakeRDCPlan": true,
  "rdcPlanCount": 1,
  "shouldMake3dRender": true,
  "renderCount3d": 2,
  "pluVerification": false,
  "expressDelivery": true,
  "clientFirstName": "Pierre",
  "clientLastName": "BERNARD",
  "clientPhone": "0456789123",
  "clientEmail": "pierre.bernard@gmail.com",
  "isStepOneChecked": true,
  "isStepTwoChecked": true,
  "isStepThreeChecked": true,
  "isStepFourChecked": true,
  "isStepFiveChecked": true,
  "isStepSixChecked": true
}
```

## Logique Métier Importante

### Calcul de l'Estimation de Difficulté

L'estimation de difficulté (1-5) est calculée automatiquement selon :

- **Zone d'urbanisme** : UA/UB = +1, UC/UD = +2, autres = +0
- **Grandes villes** : Paris/Lyon/Marseille = +2
- **Minimum garanti** : 3 (jamais en dessous)

### Règles de Conditionnalité

1. **Architecte obligatoire** : Si superficie > 150m²
2. **Champs spécifiques** : Selon le type de projet sélectionné
3. **Nombres de réalisations** : Seulement si "hasMultiple..." = true
4. **Plans nécessaires** : Seulement pour "plan-unite"

### Validation des Étapes

Chaque étape doit être validée (`isStep...Checked: true`) pour que le formulaire soit considéré comme complet.

## Endpoint API Recommandé

```
POST /api/devis/generate
Content-Type: application/json

{
  // Structure JSON complète comme dans les exemples
}
```

## Gestion des Erreurs

- **400 Bad Request** : Champs obligatoires manquants
- **422 Unprocessable Entity** : Formats invalides ou types incorrects
- **500 Internal Server Error** : Erreur de traitement côté serveur

## Contact Technique

Pour toute question sur l'intégration ou la structure des données, contactez l'équipe de développement frontend.

---

**Version du document** : 1.0
**Dernière mise à jour** : Décembre 2024
**Équipe** : Frontend & Automatisation
