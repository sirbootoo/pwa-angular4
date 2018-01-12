import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as RssFeedEmitter from 'rss-feed-emitter';
import swal from 'sweetalert2';

import { PostService } from "../services/post.service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  posts: Observable<[Post]>;
  feeder = new RssFeedEmitter();

  rssFeeds: any[];

  proxyUrl = "https://cors-anywhere.herokuapp.com/";

  index = 1;
  pageTotal;
  pageSize = 20;
  loading;

  public onlineOffline: boolean = navigator.onLine;

  constructor(private http: Http,
    private postService: PostService) {
    this.feeder.add({
      url: this.proxyUrl + 'http://punchng.com/feed/'
    });
    this.feeder.add({
      url: this.proxyUrl + 'https://www.myjobmag.com/jobsxml.xml'
    });
    this.feeder.add({
      url: this.proxyUrl + 'http://saharareporters.com/feeds/latest/feed'
    });
    this.feeder.add({
      url: this.proxyUrl + 'https://ngcareers.com/feed'
    });

    window.addEventListener('online', () => { this.onlineOffline = true });
    window.addEventListener('offline', () => { this.onlineOffline = false });


  }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(response => this.posts = response.json() as Observable<[Post]>);

    this.loadList();
  }

  loadList() {
    let arr = [];

    this.feeder.on('new-item', (item) => {
      arr.push(item);
      let newArr = this.shuffle(arr);
      this.rssFeeds = newArr;
      //this.postService.changeMessage(newArr)
    });

    /* this.postService.currentMessage.subscribe(message => 
      {
        console.log(message);
        this.paginate(message, this.pageSize, this.index);
      }
    ); */

  }

  ngOnDestroy() {
    navigator.serviceWorker.getRegistration().then(function (r) { r.unregister(); });
  }

  /* goTo(url:string){
    this.loading = true;
    if(this.onlineOffline === true){
      this.router.navigateByUrl(url).then(()=>{
        this.loading = false;
      });
    }else{
      swal('Oops...', 'Something went wrong! You appear to be offline', 'error');
    }
  } */

  shuffle(input: any[]) {
    for (var i = input.length - 1; i >= 0; i--) {

      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemAtIndex = input[randomIndex];

      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
    }
    return input;
  }

  paginate(arr, perPage, page) {
    const basePage = page * perPage;

    console.log(basePage, arr);

    (page < 0 || perPage < 1 || basePage >= arr.length) ? this.rssFeeds = []
      : this.rssFeeds = arr.slice(basePage, basePage + perPage);

    console.log(this.rssFeeds);
  }

  paginator(arr) {

    this.rssFeeds = arr.slice(this.index * this.pageSize, (this.index + 1) * this.pageSize);
  }


}
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
