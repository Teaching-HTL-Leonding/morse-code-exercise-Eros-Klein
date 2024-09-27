import {Component, inject, signal} from '@angular/core';
import {CryptService} from "../crypt.service";
import {FormsModule} from "@angular/forms";

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

  constructor() {
  }

  encrypt(): void {
    this.output.set(this.crypt.encrypt(this.input()));
  }

  clear() {
    this.input.set('');
    this.output.set('');
  }
}
