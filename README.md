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
npm install @votre-nom-npm/date-smart-formatter
```

## 📖 Usage

### Usage basique

```typescript
import { formatDate } from '@votre-nom-npm/date-smart-formatter';

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
} from '@votre-nom-npm/date-smart-formatter';

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
- `options`: `FormatOptions` - Options de formatage

**Options :**

- `locale?: string` - Locale (défaut: 'fr-FR')
- `timezone?: string` - Fuseau horaire (défaut: 'Europe/Paris')
- `format?: string` - Template de formatage (défaut: 'DD/MM/YYYY')
- `useSmartLabels?: boolean` - Utiliser les smart labels (défaut: true)

### Fonctions utilitaires

- `parseDate(input)` - Parse une date depuis différents formats
- `getSmartLabel(date, locale)` - Obtient un smart label si applicable
- `localizeDate(date, locale)` - Localise les composants d'une date
- `formatTemplate(template, components, date)` - Applique un template
- `handleTimezone(date, timezone)` - Convertit vers un fuseau horaire

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

## 📝 Licence

MIT License

Copyright (c) 2024 [Votre Nom]
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
