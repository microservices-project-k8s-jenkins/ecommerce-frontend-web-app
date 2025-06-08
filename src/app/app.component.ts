import { Component, OnInit } from '@angular/core';
import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.loadConfig();
  }
}
