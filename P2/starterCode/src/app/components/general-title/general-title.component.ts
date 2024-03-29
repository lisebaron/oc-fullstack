import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-title',
  templateUrl: './general-title.component.html',
  styleUrls: ['./general-title.component.scss']
})
export class GeneralTitleComponent implements OnInit {
  @Input() titleText: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
