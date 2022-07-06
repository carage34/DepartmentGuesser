import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public regions: any[];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.http.get('https://geo.api.gouv.fr/regions').subscribe((regions: any[]) => {
      this.regions = regions;
      console.log(+this.regions[0].code)
      this.regions = this.regions.filter(reg => +reg.code > 6);
      console.log(this.regions);
    })
  }

  start(code: string) {
    console.log(code)
    this.router.navigate([`game`, code]);
  }

}
