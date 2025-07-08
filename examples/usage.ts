import { formatDate, getSmartLabel, localizeDate } from '../src/index';

// Exemples d'utilisation du formateur de date intelligent

console.log('=== Exemples basiques ===');
const now = new Date();
console.log('Maintenant:', formatDate(now));
console.log('Hier:', formatDate(new Date(Date.now() - 86400000)));
console.log('Demain:', formatDate(new Date(Date.now() + 86400000)));

console.log('\n=== Formats personnalisés ===');
console.log('Format français:', formatDate(now, { format: 'DD MMMM YYYY à HH:mm', locale: 'fr-FR' }));
console.log('Format anglais:', formatDate(now, { format: 'MMMM DD, YYYY at h:mm A', locale: 'en-US' }));
console.log('Format allemand:', formatDate(now, { format: 'DD. MMMM YYYY um HH:mm', locale: 'de-DE' }));

console.log('\n=== Sans smart labels ===');
console.log('Aujourd\'hui sans label:', formatDate(now, { useSmartLabels: false, format: 'DD/MM/YYYY' }));

console.log('\n=== Différents fuseaux horaires ===');
console.log('Paris:', formatDate(now, { timezone: 'Europe/Paris', format: 'DD/MM/YYYY HH:mm' }));
console.log('New York:', formatDate(now, { timezone: 'America/New_York', format: 'DD/MM/YYYY HH:mm' }));
console.log('Tokyo:', formatDate(now, { timezone: 'Asia/Tokyo', format: 'DD/MM/YYYY HH:mm' }));

console.log('\n=== Parsing de différents formats ===');
console.log('ISO string:', formatDate('2024-01-15T14:30:00Z'));
console.log('Date française:', formatDate('15/01/2024'));
console.log('Timestamp:', formatDate(1705334400000));

console.log('\n=== Smart labels multilingues ===');
const testDates = [
  new Date(),
  new Date(Date.now() - 86400000),
  new Date(Date.now() + 86400000)
];

const locales = ['fr-FR', 'en-US', 'es-ES', 'de-DE'];

testDates.forEach((date, i) => {
  const labels = ['Aujourd\'hui', 'Hier', 'Demain'][i];
  console.log(`\n${labels}:`);
  locales.forEach(locale => {
    const label = getSmartLabel(date, locale);
    console.log(`  ${locale}: ${label || 'Pas de label'}`);
  });
});
