import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RssPage } from './rss';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RssPage,
  ],
  imports: [
    IonicPageModule.forChild(RssPage),
    HttpModule,
    HttpClientModule
  ],
})
export class RssPageModule {}
