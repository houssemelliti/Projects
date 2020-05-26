import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './routes/home.component';
import { BasicComponent } from './routes/basic.component';
import { ContainedComponent } from './routes/contained.component';
import { AdvancedComponent } from './routes/advanced.component';


const animationRoutes: Routes = [
  {
    path: 'animation-home',
    component: HomeComponent,
    data: {
      animation: {
        value: 'home',
      }
    }
  },
  {
    path: 'animation-basics',
    component: BasicComponent,
    data: {
      animation: {
        value: 'basic',
      }
    }
  },
  {
    path: 'animation-contained',
    component: ContainedComponent,
    data: {
      animation: {
        value: 'contained',
      }
    }
  },
  {
    path: 'animation-advanced',
    component: AdvancedComponent,
    data: {
      animation: {
        value: 'advanced',
      }
    }
  },
  {
    path: '',
    redirectTo: '/animation-home',
    pathMatch: 'full',
    data: {
      animation: {
        value: 'home',
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(animationRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
