import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';

export class AES {
  static crypt(text: string): string {
    return CryptoJS.AES.encrypt(text, 'environment.cryptoKey');
  }
  static decrypt(text: string): string {
    return CryptoJS.AES.decrypt(text, 'environment.cryptoKey').toString(
      CryptoJS.enc.Utf8
    );
  }
}
