import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public isLoading: LoaderService,
    private metaTagService: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.metaTagService.addTags([
      { name: 'og:site_name', content: environment.siteName },
    ]);
    this.title.setTitle(environment.siteName);
  }
}
