import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Olympic from "src/app/core/models/Olympic";
import Participation from "src/app/core/models/Participation";
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$ = new Observable<Olympic[]>;
  public olympicList : Olympic[] = [];
  // TODO: add "number of JOs" and "number of countries" subtitles

  // chart options
  view : [number, number] = [700, 400];
  showLabels: boolean = true;
  legendPosition = LegendPosition.Below;
  results: any;
  colorScheme = {
    name: "scheme",
    selectable: true,
    group: ScaleType.Linear,
    domain: ["#793D52", "#89A1DB", "#9780A1", "#BFE0F1", "#B8CBE7", "#956065"]
  };

  constructor(private olympicService: OlympicService,
              private router: Router) {}
  
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getOlympics();
  }

  getOlympics() {
    this.olympics$.subscribe((olympics: Olympic[]) => {
      if (olympics) {
        this.olympicList = olympics;
        this.buildDatas(olympics);
      }
    })
  }

  buildDatas(olympics: Olympic[]) {
    this.results = olympics.map(olympic => {
      let totalMedalNbr = 0;
      olympic.participations.forEach((participation: Participation) => {
        totalMedalNbr += participation.medalsCount;
      });
      return {
        "name": olympic.country,
        "value": totalMedalNbr
      }
    });
  }
  
  onSelect(data: {label: string, name: string, value: number}): void {
    let foundOlympic = this.olympicList.find(o => o.country === data.name) as Olympic;
    
    this.router.navigate(["/detail", foundOlympic.id]);
  }
}
