import {Component, inject, signal} from '@angular/core';
import {CoderService} from "../coder.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-decode',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './decode.component.html',
  styleUrl: './decode.component.css'
})
export class DecodeComponent {
  coder : CoderService = inject(CoderService);

  readonly input = signal('');
  readonly output = signal('');
  readonly error = signal(false);

  constructor() {
  }

  decrypt(): void {
    try{
      this.output.set(this.coder.decode(this.input().trim()));
      this.error.set(false);
    }
    catch {
      this.error.set(true);
    }
    this.clear();
  }

  clear() {
    this.input.set('');
  }
}
