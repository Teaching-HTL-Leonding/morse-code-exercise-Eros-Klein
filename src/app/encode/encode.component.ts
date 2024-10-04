import {Component, inject, signal} from '@angular/core';
import {CryptService} from "../crypt.service";
import {FormsModule} from "@angular/forms";
import {MorseCodePlayerService} from "../morse-code-player.service";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Component({
  selector: 'app-encode',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './encode.component.html',
  styleUrl: './encode.component.css'
})
export class EncodeComponent {
  input = signal('');
  output = signal('');
  coder = inject(CryptService);
  audio = inject(MorseCodePlayerService);
  error = signal(false);

  constructor() {
  }

  encrypt(): void {
    try{
      this.output.set(this.coder.encode(this.input().trim()));
      this.error.set(false);
    }
    catch (e) {
      this.error.set(true);
    }
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
