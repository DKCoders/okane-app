import { useMemo } from 'react';
import TranslateService from './service';

export const useTranslation = () => useMemo(() => ({ t: TranslateService.t }), []);

export const useLanguage = () => useMemo(() => ({ getLanguage: TranslateService.getLanguage }), []);
