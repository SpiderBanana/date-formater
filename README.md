# 📅 date-smart-formatter

Un formateur de dates intelligent avec support multi-locales et smart labels (Aujourd'hui, Hier, etc.).

## ✨ Fonctionnalités

- 🌍 **Support multi-langues** : Français, Anglais, Espagnol, Allemand
- 🔮 **Smart Labels** : "Aujourd'hui", "Hier", "Demain", etc.
- 🌐 **Gestion des fuseaux horaires**
- 📝 **Templates personnalisables** avec tokens flexibles
- 🔧 **Parser intelligent** pour différents formats d'entrée
- 📦 **TypeScript** avec types complets

## 🚀 Installation

```bash
npm install @spiderbanana/date-smart-formatter
```

## 📖 Usage

### Usage basique

```typescript
import { formatDate } from '@spiderbanana/date-smart-formatter';

// Format par défaut (français)
formatDate(new Date()); // "08/07/2025"
formatDate('2024-01-15'); // "15/01/2024"

// Avec smart labels
formatDate(new Date()); // "Aujourd'hui"
formatDate(new Date(Date.now() - 86400000)); // "Hier"
```

### Options avancées

```typescript
// Format personnalisé
formatDate(new Date(), {
  format: 'DD MMMM YYYY à HH:mm',
  locale: 'fr-FR',
}); // "08 juillet 2025 à 14:30"

// Locales différentes
formatDate(new Date(), {
  format: 'MMMM DD, YYYY',
  locale: 'en-US',
}); // "July 08, 2025"

// Gestion des fuseaux horaires
formatDate(new Date(), {
  timezone: 'America/New_York',
  format: 'DD/MM/YYYY HH:mm',
}); // Date convertie vers New York

// Désactiver les smart labels
formatDate(new Date(), {
  useSmartLabels: false,
  format: 'DD/MM/YYYY',
}); // "08/07/2025" (même si c'est aujourd'hui)
```

### Templates de formatage

| Token  | Description            | Exemple           |
| ------ | ---------------------- | ----------------- |
| `DD`   | Jour (2 chiffres)      | 01, 15, 31        |
| `D`    | Jour                   | 1, 15, 31         |
| `MMMM` | Nom du mois complet    | janvier, February |
| `MMM`  | Nom du mois court      | jan, Feb          |
| `MM`   | Mois (2 chiffres)      | 01, 12            |
| `M`    | Mois                   | 1, 12             |
| `YYYY` | Année complète         | 2024              |
| `YY`   | Année (2 chiffres)     | 24                |
| `HH`   | Heure 24h (2 chiffres) | 00, 14, 23        |
| `H`    | Heure 24h              | 0, 14, 23         |
| `hh`   | Heure 12h (2 chiffres) | 01, 02, 12        |
| `h`    | Heure 12h              | 1, 2, 12          |
| `mm`   | Minutes (2 chiffres)   | 00, 30, 59        |
| `m`    | Minutes                | 0, 30, 59         |
| `ss`   | Secondes (2 chiffres)  | 00, 30, 59        |
| `s`    | Secondes               | 0, 30, 59         |
| `A`    | AM/PM                  | AM, PM            |
| `a`    | am/pm                  | am, pm            |

### Smart Labels supportés

| Français            | Anglais    | Espagnol         | Allemand     |
| ------------------- | ---------- | ---------------- | ------------ |
| Aujourd'hui         | Today      | Hoy              | Heute        |
| Hier                | Yesterday  | Ayer             | Gestern      |
| Demain              | Tomorrow   | Mañana           | Morgen       |
| Cette semaine       | This week  | Esta semana      | Diese Woche  |
| La semaine dernière | Last week  | La semana pasada | Letzte Woche |
| Ce mois-ci          | This month | Este mes         | Diesen Monat |

### Utilisation avancée

```typescript
import {
  parseDate,
  getSmartLabel,
  localizeDate,
  formatTemplate,
  handleTimezone,
} from '@spiderbanana/date-smart-formatter';

// Parser une date
const parsed = parseDate('15/01/2024');

// Obtenir un smart label
const label = getSmartLabel(new Date(), 'fr-FR');

// Localiser les composants d'une date
const components = localizeDate(new Date(), 'fr-FR');
console.log(components.monthName); // "juillet"

// Formater avec un template
const formatted = formatTemplate('DD MMMM', components, new Date());

// Gérer les fuseaux horaires
const parisTime = handleTimezone(new Date(), 'Europe/Paris');
```

## 🔧 API

### `formatDate(input, options?)`

Fonction principale pour formater une date.

**Paramètres :**

- `input`: `string | Date | number` - Date à formater
  ```typescript
  formatDate(new Date());                    // Objet Date
  formatDate('2024-01-15');                  // String ISO
  formatDate('15/01/2024');                  // String locale
  formatDate(1705276800000);                 // Timestamp
  ```

- `options`: `FormatOptions` - Options de formatage
  ```typescript
  formatDate(new Date(), {
    locale: 'en-US',
    timezone: 'America/New_York',
    format: 'MMMM DD, YYYY at HH:mm',
    useSmartLabels: false
  });
  ```

**Options :**

- `locale?: string` - Locale (défaut: 'fr-FR')
  ```typescript
  formatDate(date, { locale: 'fr-FR' });  // "15 janvier 2024"
  formatDate(date, { locale: 'en-US' });  // "January 15, 2024"
  formatDate(date, { locale: 'es-ES' });  // "15 enero 2024"
  formatDate(date, { locale: 'de-DE' });  // "15. Januar 2024"
  ```

- `timezone?: string` - Fuseau horaire (défaut: 'Europe/Paris')
  ```typescript
  formatDate(date, { timezone: 'Europe/Paris' });       // "15/01/2024 14:30"
  formatDate(date, { timezone: 'America/New_York' });   // "15/01/2024 08:30"
  formatDate(date, { timezone: 'Asia/Tokyo' });         // "15/01/2024 22:30"
  formatDate(date, { timezone: 'UTC' });                // "15/01/2024 13:30"
  ```

- `format?: string` - Template de formatage (défaut: 'DD/MM/YYYY')
  ```typescript
  formatDate(date, { format: 'DD/MM/YYYY' });           // "15/01/2024"
  formatDate(date, { format: 'MMMM DD, YYYY' });        // "janvier 15, 2024"
  formatDate(date, { format: 'DD MMMM YYYY à HH:mm' }); // "15 janvier 2024 à 14:30"
  formatDate(date, { format: 'h:mm A' });               // "2:30 PM"
  ```

- `useSmartLabels?: boolean` - Utiliser les smart labels (défaut: true)
  ```typescript
  // Avec smart labels (défaut)
  formatDate(new Date(), { useSmartLabels: true });     // "Aujourd'hui"
  formatDate(yesterday, { useSmartLabels: true });      // "Hier"
  
  // Sans smart labels
  formatDate(new Date(), { useSmartLabels: false });    // "08/07/2025"
  formatDate(yesterday, { useSmartLabels: false });     // "07/07/2025"
  ```

### Fonctions utilitaires

- `parseDate(input)` - Parse une date depuis différents formats
  ```typescript
  import { parseDate } from '@spiderbanana/date-smart-formatter';
  
  parseDate('2024-01-15');           // Date ISO
  parseDate('15/01/2024');           // Format français
  parseDate('01/15/2024');           // Format américain
  parseDate(1705276800000);          // Timestamp
  parseDate(new Date());             // Objet Date existant
  ```

- `getSmartLabel(date, locale)` - Obtient un smart label si applicable
  ```typescript
  import { getSmartLabel } from '@spiderbanana/date-smart-formatter';
  
  getSmartLabel(new Date(), 'fr-FR');                    // "Aujourd'hui"
  getSmartLabel(new Date(), 'en-US');                    // "Today"
  getSmartLabel(yesterday, 'fr-FR');                     // "Hier"
  getSmartLabel(nextWeek, 'fr-FR');                      // null (pas de label)
  ```

- `localizeDate(date, locale)` - Localise les composants d'une date
  ```typescript
  import { localizeDate } from '@spiderbanana/date-smart-formatter';
  
  const components = localizeDate(new Date(), 'fr-FR');
  // {
  //   day: '08',
  //   month: '07',
  //   year: '2025',
  //   monthName: 'juillet',
  //   monthShort: 'jul',
  //   hour24: '14',
  //   minute: '30',
  //   ...
  // }
  ```

- `formatTemplate(template, components, date)` - Applique un template
  ```typescript
  import { formatTemplate, localizeDate } from '@spiderbanana/date-smart-formatter';
  
  const components = localizeDate(new Date(), 'fr-FR');
  formatTemplate('DD MMMM YYYY', components, new Date());     // "08 juillet 2025"
  formatTemplate('HH:mm:ss', components, new Date());         // "14:30:45"
  formatTemplate('DD/MM/YY à h:mm A', components, new Date()); // "08/07/25 à 2:30 PM"
  ```

- `handleTimezone(date, timezone)` - Convertit vers un fuseau horaire
  ```typescript
  import { handleTimezone } from '@spiderbanana/date-smart-formatter';
  
  const utcDate = new Date('2025-07-08T12:00:00Z');
  handleTimezone(utcDate, 'Europe/Paris');       // Date à 14:00 (UTC+2)
  handleTimezone(utcDate, 'America/New_York');   // Date à 08:00 (UTC-4)
  handleTimezone(utcDate, 'Asia/Tokyo');         // Date à 21:00 (UTC+9)
  ```

## 🌍 Locales supportées

- `fr-FR` - Français (France)
- `en-US` - Anglais (États-Unis)
- `es-ES` - Espagnol (Espagne)
- `de-DE` - Allemand (Allemagne)

## 🕐 Fuseaux horaires

Supporte tous les fuseaux horaires IANA, par exemple :

- `Europe/Paris`
- `America/New_York`
- `Asia/Tokyo`
- `UTC`

## 🧪 Tests

```bash
npm test
```

## 🏗️ Build

```bash
npm run build
```

## 🧹 Développement

```bash
# Installer les dépendances
npm install

# Build du projet
npm run build

# Lancer les tests
npm run test

# Linter le code
npm run lint

# Formater le code
npm run format

# Test en mode watch
npm run test:watch
```

## 📦 Scripts disponibles

- `npm run build` - Compile TypeScript vers JavaScript
- `npm run test` - Lance tous les tests
- `npm run lint` - Vérifie la qualité du code
- `npm run format` - Formate le code avec Prettier
- `npm run clean` - Nettoie le dossier de build

## 📝 Licence

MIT
