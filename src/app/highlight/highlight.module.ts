import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HighlightPageRoutingModule } from './highlight-routing.module';

import { HighlightPage } from './highlight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HighlightPageRoutingModule
  ],
  declarations: [HighlightPage]
})
export class HighlightPageModule {}
