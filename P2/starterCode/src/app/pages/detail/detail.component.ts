import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import Olympic from 'src/app/core/models/Olympic';
import Participation from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import LineResultData from 'src/app/core/models/LineResultData';
import SingleResultData from 'src/app/core/models/SingleResultData';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  currentOlympic!: Olympic;
  entriesNbr: number = 0;
  totalMedalNbr: number = 0;
  totalAthletesNbr: number = 0;
  
  //chart options
  view : [number, number] = [700, 400];
  legendTitle = "Dates";
  legendPosition = LegendPosition.Below;
  results: LineResultData[] = [];
  colorScheme = {
    name: "scheme",
    selectable: true,
    group: ScaleType.Linear,
    domain: ["#793D52", "#89A1DB", "#9780A1", "#BFE0F1", "#B8CBE7", "#956065"]
  };
  
  constructor(private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getOlympic(params["id"]);
    });
  }

  getOlympic(id: number) {
    this.olympicService.getOlympicById(id).subscribe((olympic) => {
      if (olympic !== undefined) {
        this.currentOlympic = olympic;
        this.buildDatas(olympic);
      } else {
        this.navigateTo("not-found");
      }
    });
  }

  buildDatas(olympic: Olympic) {
    this.results = [{
      "name": olympic.country,
      "series":
        olympic.participations.map((participation: Participation) => {
          return {
            "name": participation.year.toString(),
            "value": participation.medalsCount
          } as SingleResultData;
        })
    }];

    this.entriesNbr = olympic.participations.length;
    olympic.participations.map((participation: Participation) => {
      this.totalMedalNbr += participation.medalsCount;
      this.totalAthletesNbr += participation.athleteCount;
    });
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
}
