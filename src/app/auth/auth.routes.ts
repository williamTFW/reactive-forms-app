import { Routes } from '@angular/router';
import { SignUpPageComponent } from './pages/signUp-page/signUp-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        component: SignUpPageComponent,
      },
      {
        path: '**',
        redirectTo: 'sign-up',
      },
    ],
  },
];

export default authRoutes;
