import { Routes } from '@angular/router';
import {EncryptComponent} from "./encrypt/encrypt.component";
import {DecryptComponent} from "./decrypt/decrypt.component";

export const routes: Routes = [
  { path: '', redirectTo: '/encrypt', pathMatch: 'full' },
  { path: 'encrypt', component: EncryptComponent },
  { path: 'decrypt', component: DecryptComponent }
];
