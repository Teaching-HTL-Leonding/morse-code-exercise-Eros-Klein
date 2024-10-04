import {Component, inject, signal} from '@angular/core';
import {CryptService} from "../crypt.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-decrypt',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './decrypt.component.html',
  styleUrl: './decrypt.component.css'
})
export class DecryptComponent {
  crypt : CryptService = inject(CryptService);

  readonly input = signal('');
  readonly output = signal('');

  constructor() {
  }

  decrypt(): void {
    this.output.set(this.crypt.decrypt(this.input().trim()));
    this.clear();
  }

  clear() {
    this.input.set('');
  }
}
