import { Http, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import X2JS from 'x2js';

import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/timeout'

@Injectable()
export class FeedProvider {
  constructor(public http: Http) {
    console.log('Hello FeedProvider Provider');
  }

  async getJson(url) {
	  return this.http.get(url)
      .map(this.extractData)
      .do(this.logResponse)
      .catch(this.catchError)
      .toPromise()
  }

  private catchError(error: Response | any) {
	  console.log(error);
	  return Observable.throw(error.json().error || "Server error!");
  }
  
  private logResponse(res) {
		console.log(res);
  }
  
  private extractData(res: Response){
    let xml =  (<any>res.text());
    console.log(xml)
    let parser = new X2JS();
    let result = parser.xml2js(xml);
    console.log(result)
		return result;
	}
}
