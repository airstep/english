import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TestsPage } from './tests';

@NgModule({
  declarations: [
    TestsPage,
  ],
  imports: [
    IonicPageModule.forChild(TestsPage),
    TranslateModule.forChild()
  ],
})
export class TestsPageModule {}
