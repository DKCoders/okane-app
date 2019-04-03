/* eslint-disable no-console */
import es from './files/es';

let activeFile = {};
class TranslateService {
  static t(str) {
    if (!activeFile[str]) {
      console.log('Missing translation:', str);
      return str;
    }
    return activeFile[str];
  }

  static setLanguage(key) {
    if (key === 'es') {
      activeFile = es;
    } else {
      activeFile = {};
    }
  }
}

export default TranslateService;
