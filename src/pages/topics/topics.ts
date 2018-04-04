import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-topics',
  templateUrl: 'topics.html'
})
export class TopicsPage {
  selectedItem: any;
  topics: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.topics = [
      "Irregular verbs", 
      "Present Simple", 
      "Past Simple", 
      "Future Simple", 
      "Present Continuous", 
      "Past Continuous", 
      "Participles", 
      "Present Perfect", 
      "Past Perfect", 
      "Phrasal verbs"
    ];
  }

  itemTapped(event, item) {
    this.navCtrl.push('VideoPage', {
      topic: item
    });
  }
}
