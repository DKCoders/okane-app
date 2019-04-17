/* eslint-disable no-console */
import 'moment/locale/es';
import moment from 'moment';
import es from './files/es';

let activeFile = null;
let activeKey = null;
class TranslateService {
  static t(str) {
    if (!activeFile) {
      return str;
    }
    if (!activeFile[str]) {
      console.log('Missing translation:', str);
      return str;
    }
    return activeFile[str];
  }

  static setLanguage(key) {
    activeKey = key;
    if (key === 'es') {
      activeFile = es;
    } else {
      activeFile = null;
    }
    moment.locale(key || 'en');
  }

  static getLanguage() {
    return activeKey;
  }
}

export default TranslateService;
