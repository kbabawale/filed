import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TrialComponent } from '../app/Pages/trial/trial.component';
import { StartComponent } from './Pages/start/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'trial', component: TrialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
