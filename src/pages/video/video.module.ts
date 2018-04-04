import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPage } from './video';

@NgModule({
  declarations: [
    VideoPage
  ],
  imports: [
    IonicPageModule.forChild(VideoPage),
    HttpModule,
    HttpClientModule
  ],
})
export class VideoPageModule {}
