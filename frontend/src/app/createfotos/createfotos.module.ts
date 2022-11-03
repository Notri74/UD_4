import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatefotosPageRoutingModule } from './createfotos-routing.module';

import { CreatefotosPage } from './createfotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatefotosPageRoutingModule,
  ],
  declarations: [CreatefotosPage],
})
export class CreatefotosPageModule {}
