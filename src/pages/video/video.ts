import { Video } from './../../models/video';
import { YouTubeService } from './../../providers/youtube';
import { Component, NgZone, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BehaviorSubject, Observable, Subscription, Subject, Subscriber } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
  providers: [YouTubeService, YoutubeVideoPlayer]
})
export class VideoPage {

  searching: boolean
  searchPattern: BehaviorSubject<any>
  searchSubscription: Subscription
  
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: Video[]
  isLoading: boolean
  topic: string
  
  infiniteScrolling: Subject<any>;
  scrollSubscription: Subscription
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public zone: NgZone,
    public youtube: YouTubeService,
    private player: YoutubeVideoPlayer
  ) {
    this.topic = navParams.get('topic')
    this.searchPattern = new BehaviorSubject(undefined)
    this.infiniteScrolling = new Subject()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  ngOnInit() {
    this.loading.subscribe(val => {
      this.isLoading = val
    })
    this.observeSearchBar();
    
    this.scrollSubscription = Observable.from(this.infiniteScrolling)
    .subscribe(scroller => {
      if (!this.isLoading) {
        this.getNextPage(scroller)
      }
    })
  }

  async getNextPage(scroller) {
    let res = await this.youtube.nextPage()
    this.loading.next(false);
    res.forEach(item => {
      this.results.push(item)
    });
    if (scroller)
      scroller.complete();
  }

  showList(type) {
    this.navCtrl.push('VideoListPage', {type: type})
  }

  updateAssignByQuery(newValue) {
    this.zone.run(() => {
      this.searchPattern.next(newValue);
    });
  }

  observeSearchBar(): void {
    this.searchSubscription = this.searchPattern.asObservable()
    .debounceTime(250)                         
    .do(() => this.loading.next(true))         
    .map(() => this.youtube.search(this.searchPattern.getValue() ? this.searchPattern.getValue() : this.topic))
    .switch()
    .subscribe(
      (results) => {
        console.log(results)
        this.loading.next(false);
        this.results = results
      },
      (err: any) => {
        console.log(err);
        this.loading.next(false);
      },
      () => {
        this.loading.next(false);
      }
    );
  }

  open(video) {
    this.player.openVideo(video.id);
  }
}
