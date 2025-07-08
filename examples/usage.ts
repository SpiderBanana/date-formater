import {
  formatDate,
  formatTemplate,
  localizeDate,
  parseDate,
  getSmartLabel,
  handleTimezone,
  getAvailableTokens,
} from '@spiderbanana/date-smart-formatter';

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
  formatDate(now, {
    useSmartLabels: false,
    timezone: 'Europe/Paris',
    format: 'DD/MM/YYYY HH:mm',
  }),
);
console.log(
  'New York:',
  formatDate(now, {
    useSmartLabels: false,
    timezone: 'America/New_York',
    format: 'DD/MM/YYYY HH:mm',
  }),
);
console.log(
  'Tokyo:',
  formatDate(now, {
    useSmartLabels: false,
    timezone: 'Asia/Tokyo',
    format: 'DD/MM/YYYY HH:mm',
  }),
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
  formatDate(now, {
    useSmartLabels: false,
    format: 'dddd DD MMMM YYYY à HH:mm:ss',
  }),
);
console.log(
  'Format 12h:',
  formatDate(now, { useSmartLabels: false, format: 'DD/MM/YYYY h:mm A' }),
);
console.log(
  'Format court:',
  formatDate(now, { useSmartLabels: false, format: 'D/M/YY' }),
);

console.log('\n=== Utilisation directe de formatTemplate ===');
const sampleDate = new Date('2024-07-08T14:30:45.123Z');
const localizedComponents = localizeDate(sampleDate, 'fr-FR');

console.log(
  'Template basique:',
  formatTemplate('DD/MM/YYYY', localizedComponents, sampleDate),
);
console.log(
  'Template avec heure:',
  formatTemplate('DD MMMM YYYY à HH:mm:ss', localizedComponents, sampleDate),
);
console.log(
  'Template jour de la semaine:',
  formatTemplate('dddd, DD MMMM YYYY', localizedComponents, sampleDate),
);
console.log(
  'Template 12h avec AM/PM:',
  formatTemplate('DD/MM/YYYY h:mm A', localizedComponents, sampleDate),
);
console.log(
  'Template avec millisecondes:',
  formatTemplate('HH:mm:ss.SSS', localizedComponents, sampleDate),
);
console.log(
  'Template timestamp Unix:',
  formatTemplate('X (Unix timestamp)', localizedComponents, sampleDate),
);

console.log('\n=== Utilisation directe de localizeDate ===');
const dateToLocalize = new Date('2024-12-25T09:15:30Z');

console.log('Localisation FR:', localizeDate(dateToLocalize, 'fr-FR'));
console.log('Localisation EN:', localizeDate(dateToLocalize, 'en-US'));
console.log('Localisation DE:', localizeDate(dateToLocalize, 'de-DE'));
console.log('Localisation ES:', localizeDate(dateToLocalize, 'es-ES'));

console.log('\n=== Utilisation directe de parseDate ===');
try {
  console.log('Parse date ISO:', parseDate('2024-01-15T14:30:00.000Z'));
  console.log('Parse date DD/MM/YYYY:', parseDate('15/01/2024'));
  console.log('Parse timestamp:', parseDate(1705334400000));
  console.log('Parse Date object:', parseDate(new Date('2024-01-15')));
  console.log('Parse format US MM/DD/YYYY:', parseDate('01/15/2024'));
} catch (error) {
  console.error(
    'Erreur de parsing:',
    error instanceof Error ? error.message : String(error),
  );
}

console.log('\n=== Utilisation directe de getSmartLabel ===');
const testDates = [
  { name: "Aujourd'hui", date: new Date() },
  { name: 'Hier', date: new Date(Date.now() - 86400000) },
  { name: 'Demain', date: new Date(Date.now() + 86400000) },
  { name: 'Il y a 3 jours', date: new Date(Date.now() - 3 * 86400000) },
  { name: 'Dans 1 semaine', date: new Date(Date.now() + 7 * 86400000) },
  {
    name: 'Le mois prochain',
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15),
  },
];

testDates.forEach(({ name, date }) => {
  const smartLabelFR = getSmartLabel(date, 'fr-FR');
  const smartLabelEN = getSmartLabel(date, 'en-US');
  console.log(`${name}:`, {
    FR: smartLabelFR || 'Pas de label smart',
    EN: smartLabelEN || 'No smart label',
  });
});

console.log('\n=== Utilisation directe de handleTimezone ===');
const utcDate = new Date('2024-07-08T12:00:00Z');

console.log('Date UTC originale:', utcDate.toISOString());
console.log('Paris (Europe/Paris):', handleTimezone(utcDate, 'Europe/Paris'));
console.log(
  'New York (America/New_York):',
  handleTimezone(utcDate, 'America/New_York'),
);
console.log('Tokyo (Asia/Tokyo):', handleTimezone(utcDate, 'Asia/Tokyo'));
console.log(
  'Londres (Europe/London):',
  handleTimezone(utcDate, 'Europe/London'),
);
console.log(
  'Los Angeles (America/Los_Angeles):',
  handleTimezone(utcDate, 'America/Los_Angeles'),
);
console.log(
  'Sydney (Australia/Sydney):',
  handleTimezone(utcDate, 'Australia/Sydney'),
);

console.log('\n=== Tokens disponibles ===');
const availableTokens = getAvailableTokens();
console.log('Catégories de tokens disponibles:', Object.keys(availableTokens));
console.log('Exemple - Tokens de jour:', availableTokens.day);
console.log("Exemple - Tokens d'heure:", availableTokens.hour);

console.log('\n=== Comparaison des formats par locale ===');
const testDate = new Date('2024-12-25T15:30:45Z');
const locales = ['fr-FR', 'en-US', 'de-DE', 'es-ES'];

locales.forEach((locale) => {
  const localized = localizeDate(testDate, locale);
  console.log(`${locale}:`, {
    weekday: localized.weekday,
    monthName: localized.monthName,
    formatted: formatTemplate('dddd DD MMMM YYYY', localized, testDate),
  });
});
