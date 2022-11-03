import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatefotosPage } from './createfotos.page';

const routes: Routes = [
  {
    path: '',
    component: CreatefotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatefotosPageRoutingModule {}
