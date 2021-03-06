import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DepartmentGuesser';
  public regions: any[];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.http.get('https://geo.api.gouv.fr/regions').subscribe((regions: any[]) => {
      this.regions = regions;
      this.regions = this.regions.filter(reg => +reg.code > 6);
    })
  }

  start(code: string) {
    console.log(code)
    this.router.navigate([`game`, code]);
  }
}
