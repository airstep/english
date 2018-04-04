import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser'

@IonicPage()
@Component({
  selector: 'page-tests',
  templateUrl: 'tests.html',
  providers: [InAppBrowser]
})
export class TestsPage {

  tests: Array<{title: string, url: string}>

  private options: InAppBrowserOptions = {
    location: 'no', // addressbar
    hardwareback: 'yes',
    useWideViewPort: 'yes',
    enableViewportScale: 'yes',
    toolbar: 'no',
    zoom: 'no',
    presentationstyle: 'pagesheet'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    this.tests = [
      {title: "Englisch Hilfen", url: "https://www.englisch-hilfen.de/en/exercises_list/test.htm"},
      {title: "English Grammar ego4u", url: "https://www.ego4u.com/en/cram-up/grammar"},
      {title: "ESL English Grammar", url: "https://www.learnenglishfeelgood.com/esl-english-grammar-exercises.html"},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  open(test) {
    let browser: InAppBrowserObject = this.iab.create(
      test.url,
      "_self",
      this.options
    )
    browser.show()
  }
}
