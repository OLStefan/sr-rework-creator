import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAll from './en/all.json';

i18next.use(initReactI18next).init({
	lng: 'en',
	defaultNS: 'All',
	resources: {
		en: { All: enAll },
	},
});

export default i18next;
