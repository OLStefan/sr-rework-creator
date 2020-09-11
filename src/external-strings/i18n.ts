import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const all_en = require('./en/all.json');

i18n.use(initReactI18next).init({
	lng: 'en',
	defaultNS: 'All',
	resources: {
		en: { All: all_en },
	},
});

export default i18n;
