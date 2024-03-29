import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import Olympic from 'src/app/core/models/Olympic';
import Participation from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id!: number;
  currentOlympic!: Olympic;
  // TODO: add "Number of entries", "Total number medals" and "Total number of athletes" subtitles
  
  // chart options
  view : [number, number] = [700, 400];
  legendTitle = "Dates";
  legendPosition = LegendPosition.Below;
  results: any;
  colorScheme = {
    name: "scheme",
    selectable: true,
    group: ScaleType.Linear,
    domain: ["#793D52", "#89A1DB", "#9780A1", "#BFE0F1", "#B8CBE7", "#956065"]
  };
  // colorScheme = "vivid";
  
  constructor(private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getOlympic();
    });
  }

  getOlympic() {
    this.olympicService.getOlympicById(this.id).subscribe((olympic) => {
      if (olympic !== undefined) {
        this.currentOlympic = olympic;
        this.buildDatas(); // TODO passer olympic et enlever this.currentOlympic
      } else {
        console.log(olympic);
      }
    });
    
  }

  buildDatas() {
    this.results = [{
      "name": this.currentOlympic.country,
      "series":
        this.currentOlympic.participations.map((participation: Participation) => {
          return {
            "name": participation.year.toString(),
            "value": participation.medalsCount
          }
        })
    }];
  }

  //TODO Add return button to home
}
