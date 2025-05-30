import { Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwithesPageComponent } from './pages/swithes-page/swithes-page.component';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'basic',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'dynamic',
        component: DynamicPageComponent,
      },
      {
        path: 'switches',
        title: 'switches',
        component: SwithesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
