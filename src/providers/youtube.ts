import { Video } from '../models/video';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {
 Injectable,
 OnInit,
 ElementRef,
 EventEmitter,
 Inject
} from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/timeout'

@Injectable()
export class YouTubeService {
  YOUTUBE_API_KEY: string = 'AIzaSyDv19L5ZLOtPENT_VmGvJ78M8KSXN21c_k';
  YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';

  nextPageToken: string
  queryUrl: string 

  constructor(public http: Http) {}
 
  async nextPage() {
    let nextPageURL = this.queryUrl + "&pageToken=" + this.nextPageToken
    console.log(nextPageURL)
    return this.getSearchResult(nextPageURL).toPromise()
  }

  search(query: string): Observable<Video[]> {
    let lang = this.getDeviceDefaultLang()
    let params: string = [
      `q=${query}`,
      `key=${this.YOUTUBE_API_KEY}`,
      `part=snippet`,
      `type=video`,
      `maxResults=30`,
      `regionCode=${lang}`,
      `relevanceLanguage=${lang}`
    ].join('&');
    
    this.queryUrl = `${this.YOUTUBE_API_URL}?${params}`;

    return this.getSearchResult(this.queryUrl)
  }

  getDeviceDefaultLang() {
    if (window.navigator.language) {
      let lang = window.navigator.language;
      if (lang.indexOf('-') != -1) {
        let v = lang.split('-');
        if (v.length > 0) {
          let currentDeviceLang = v[0].toLowerCase();
          
          if (currentDeviceLang === 'ru' ||
              currentDeviceLang === 'uk') 
              return currentDeviceLang;
        }
      }
    }
    return 'en';
  }

  getSearchResult(url) {
    return this.http.get(url)
    .map((response: Response) => {
      let json = (<any>response.json())
      this.nextPageToken = json.nextPageToken
      return json.items.map(item => {
        return new Video({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      });
    }).catch(this.catchError)
  }

  catchError(error: Response | any){
    let errMsg: string
    let result: Error
    if (error instanceof Response) {
      let err = ''
      if (error.text() && error.text().indexOf('<html') === -1) {
        const body = error.json() || ''
        err = body.error || JSON.stringify(body)
        if (body) result = body;
      } else {
        //err = error.text()
      }
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    console.error(errMsg)
    return Observable.throw(result ? result : errMsg)
  }
}