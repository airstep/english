import { FeedProvider } from './../../providers/feed';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser'

@IonicPage()
@Component({
  selector: 'page-rss',
  templateUrl: 'rss.html',
  providers: [FeedProvider, InAppBrowser]
})
export class RssPage {

  json: any
  title: string = "Feed"
  items: any
  link: string
  isLoading: boolean

  private options: InAppBrowserOptions = {
    location: 'no', // addressbar
    hardwareback: 'yes',
    useWideViewPort: 'yes',
    enableViewportScale: 'yes',
    toolbar: 'no',
    zoom: 'no',
    presentationstyle: 'pagesheet'
  }

  constructor(
    private iab: InAppBrowser,
    public navCtrl: NavController, 
    public zone: NgZone,
    public navParams: NavParams, 
    private feed: FeedProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RssPage');
    this.refresh()
  }

  async refresh() {
    this.isLoading = true
    this.json = await this.feed.getJson('https://truththeory.com/feed')
    this.title = this.json.rss.channel.title
    this.items = this.json.rss.channel.item
    this.link = this.json.rss.channel.link
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].index = i
      this.items[i].image = this.getImage(this.items[i])
      this.items[i].video = this.getVideo(this.items[i])
    }  
    this.isLoading = false
  }

  getVideo(item) {
    try {
      var tmpElement = document.createElement('div');
      tmpElement.innerHTML = item.encoded;
      let elements = tmpElement.getElementsByTagName('iframe')
      if (elements && elements.length > 0) {
        var src = elements[0].src;
        return src;
      }
    } catch(err) {
      console.log(err)
    }
    return ''
  }

  getImage(item) {
    let regexp = '(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))'
    let results = item.description.match(regexp)
    if (results.length > 0)
      return results[0]
    return ''
  }

  open(item) {
    let browser: InAppBrowserObject = this.iab.create(
      item.link,
      "_self",
      this.options
    )
    browser.show()
  }

  openVideo(item) {
    if (item.video) {
      let browser: InAppBrowserObject = this.iab.create(
        item.video,
        "_self",
        this.options
      )
      browser.show()
    } else { 
      this.open(item)
    }
  }
}
