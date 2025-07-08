// Exemple d'utilisation du package publié sur npm

import { formatDate } from '@spiderbanana/date-smart-formatter';
// Si tu testes localement avant publication, tu peux utiliser :
// import { formatDate } from '../dist';
// après avoir fait `npm run build`

console.log('=== Exemples basiques ===');
const now = new Date();
console.log('Maintenant:', formatDate(now));
console.log('Hier:', formatDate(new Date(Date.now() - 86400000)));
console.log('Demain:', formatDate(new Date(Date.now() + 86400000)));

console.log('\n=== Formats personnalisés ===');
console.log(
  'Format français:',
  formatDate(now, { format: 'DD MMMM YYYY', locale: 'fr-FR' }),
);
console.log(
  'Format anglais:',
  formatDate(now, { format: 'MMMM DD, YYYY', locale: 'en-US' }),
);
console.log(
  'Format allemand:',
  formatDate(now, { format: 'DD. MMMM YYYY', locale: 'de-DE' }),
);

console.log('\n=== Sans smart labels ===');
console.log(
  "Aujourd'hui sans label:",
  formatDate(now, { useSmartLabels: false, format: 'DD/MM/YYYY' }),
);

console.log('\n=== Différents fuseaux horaires ===');
console.log(
  'Paris:',
  formatDate(now, { timezone: 'Europe/Paris', format: 'DD/MM/YYYY HH:mm' }),
);
console.log(
  'New York:',
  formatDate(now, { timezone: 'America/New_York', format: 'DD/MM/YYYY HH:mm' }),
);
console.log(
  'Tokyo:',
  formatDate(now, { timezone: 'Asia/Tokyo', format: 'DD/MM/YYYY HH:mm' }),
);

console.log('\n=== Parsing de différents formats ===');
console.log('Date string DD/MM/YYYY:', formatDate('15/01/2024'));
console.log('ISO string:', formatDate('2024-01-15T14:30:00Z'));
console.log('Timestamp:', formatDate(1705334400000));

console.log('\n=== Smart labels multilingues ===');
console.log(
  "FR - Aujourd'hui:",
  formatDate(new Date(), { useSmartLabels: true, locale: 'fr-FR' }),
);
console.log(
  'EN - Today:',
  formatDate(new Date(), { useSmartLabels: true, locale: 'en-US' }),
);
console.log(
  'DE - Heute:',
  formatDate(new Date(), { useSmartLabels: true, locale: 'de-DE' }),
);

console.log('\n=== Templates avancés ===');
console.log(
  'Date complète:',
  formatDate(now, { format: 'dddd DD MMMM YYYY à HH:mm:ss' }),
);
console.log('Format 12h:', formatDate(now, { format: 'DD/MM/YYYY h:mm A' }));
console.log('Format court:', formatDate(now, { format: 'D/M/YY' }));
