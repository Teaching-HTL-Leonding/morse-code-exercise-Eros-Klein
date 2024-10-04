import {Component, inject, signal} from '@angular/core';
import {CryptService} from "../crypt.service";
import {FormsModule} from "@angular/forms";
import {MorseCodePlayerService} from "../morse-code-player.service";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Component({
  selector: 'app-encrypt',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './encrypt.component.html',
  styleUrl: './encrypt.component.css'
})
export class EncryptComponent {
  input = signal('');
  output = signal('');
  crypt = inject(CryptService);
  audio = inject(MorseCodePlayerService);

  constructor() {
  }

  encrypt(): void {
    this.output.set(this.crypt.encrypt(this.input().trim()));
    this.clear();
  }

  clear() {
    this.input.set('');
  }

  async playResult(){
    for (const char of this.output().split('')) {
      if (char === '.') {
        await this.audio.playDot();
        await this.audio.sleep(this.audio.SYMBOL_BREAK);
      } else if (char === '-') {
        await this.audio.playDash();
        await this.audio.sleep(this.audio.SYMBOL_BREAK);
      } else if(char === '/') {
        await this.audio.sleep(this.audio.WORD_BREAK);
      } else if(char === ' '){
        await this.audio.sleep(this.audio.LETTER_BREAK);
      }
    }
  }

  inputIsInValid(): boolean {
    const matcher = this.input().match(/[^a-zA-Z\s]/g);
    if (matcher && matcher.length > 0) {
      return false;
    }
    return this.input().trim().length > 0;
  }
}
