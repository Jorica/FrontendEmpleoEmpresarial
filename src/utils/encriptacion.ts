import * as CryptoJS from 'crypto-js';

// Función para encriptar texto
export function encrypt(text: string, key: string): string {
  return CryptoJS.AES.encrypt(text, key).toString();
}

export function decrypt(text: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);

}