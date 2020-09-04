import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const RESOURCES = require('./external-strings/resources');

i18n.use(initReactI18next).init({
	interpolation: { escapeValue: false },
	lng: 'en',
	defaultNS: 'Common',
	resources: RESOURCES,
});

export default i18n;
