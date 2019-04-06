import { useMemo } from 'react';
import TranslateService from './service';

const useTranslation = () => useMemo(() => ({ t: TranslateService.t }), []);

export default useTranslation;
