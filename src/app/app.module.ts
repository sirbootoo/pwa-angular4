import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialModule} from '@angular/material';
import { PostComponent } from './post/post.component';
import {HttpModule} from '@angular/http';
import {AppShellModule} from '@angular/app-shell';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule } from '@angular/router';

import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppShellModule.runtime(),
    HttpModule,
    NgxPaginationModule,
    RouterModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
