import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-subtitle',
  templateUrl: './general-subtitle.component.html',
  styleUrls: ['./general-subtitle.component.scss']
})
export class GeneralSubtitleComponent implements OnInit {
  @Input() subtitleText: string = "";
  @Input() nbr!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
