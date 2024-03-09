import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Olympic from "src/app/core/models/Olympic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$ = new Observable<Olympic[]>;
  public olympicList : Olympic[] = [];

  constructor(private olympicService: OlympicService) {}
  
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getOlympics();
  }

  async getOlympics() {
    await this.olympics$.subscribe((olympics) => {
      if (olympics) {
        this.olympicList = olympics;
        // console.log(this.olympicList);
      }
    })
  }
  
}
