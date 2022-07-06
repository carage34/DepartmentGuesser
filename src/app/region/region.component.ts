import {Component, HostListener, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Region} from "../model/region.model"

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  @Input() idRegion: string;

  public listRegion = Region
  public input: string = "";
  public id = 0;
  public dpt : any[] = null;
  public isSubmit = false;
  constructor(private http: HttpClient) { }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.input = this.input.substring(0, this.input.length - 1)
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(Number.isInteger(+event.key)) {
      this.bouton(+event.key);
    }
    if(event.key === 'Backspace') this.input = this.input.substring(0, this.input.length - 1);
    if(event.key === 'Enter') {
      if(!this.isSubmit){
        this.isSubmit = true;
      } else {
        this.isSubmit = false;
        this.id++;
        this.input = '';
      }
    }
  }

  ngOnInit(): void {
    console.log(this.idRegion)
    this.http.get(`https://geo.api.gouv.fr/regions/${this.idRegion}/departements?fields=code`).subscribe((departement: any[]) => {
      this.dpt = departement;
    })
  }

  bouton(nb: number) {
    this.input = `${this.input}${nb}`;
  }

  next() {
    this.isSubmit = false;
    this.id++;
  }
}
