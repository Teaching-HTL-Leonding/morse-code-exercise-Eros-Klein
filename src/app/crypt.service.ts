import {Injectable} from '@angular/core';

type DictionaryEntry = {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class CryptService {
  morseCodeDictionary: DictionaryEntry[] = [
    {key: 'A', value: '.-'},
    {key: 'B', value: '-...'},
    {key: 'C', value: '-.-.'},
    {key: 'D', value: '-..'},
    {key: 'E', value: '.'},
    {key: 'F', value: '..-.'},
    {key: 'G', value: '--.'},
    {key: 'H', value: '....'},
    {key: 'I', value: '..'},
    {key: 'J', value: '.---'},
    {key: 'K', value: '-.-'},
    {key: 'L', value: '.-..'},
    {key: 'M', value: '--'},
    {key: 'N', value: '-.'},
    {key: 'O', value: '---'},
    {key: 'P', value: '.--.'},
    {key: 'Q', value: '--.-'},
    {key: 'R', value: '.-.'},
    {key: 'S', value: '...'},
    {key: 'T', value: '-'},
    {key: 'U', value: '..-'},
    {key: 'V', value: '...-'},
    {key: 'W', value: '.--'},
    {key: 'X', value: '-..-'},
    {key: 'Y', value: '-.--'},
    {key: 'Z', value: '--..'}
  ];

  constructor() {
  }

  encrypt(input: string): string {
    let output = '';
    for (let i = 0; i < input.length; i++) {
      let char = input[i].toUpperCase();
      let entry = this.morseCodeDictionary.find(e => e.key === char);
      if (entry) {
        output += entry.value + ' ';
      }
    }
    return output;
  }

  decrypt(input: string): string {
    let output = '';
    let words = input.split(' ');
    for (let i = 0; i < words.length; i++) {
      let entry = this.morseCodeDictionary.find(e => e.value === words[i]);
      if (entry) {
        output += entry.key;
      }
    }
    return output;
  }
}
