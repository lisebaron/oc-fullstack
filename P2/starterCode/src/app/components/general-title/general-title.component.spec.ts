import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTitleComponent } from './general-title.component';

describe('GeneralTitleComponent', () => {
  let component: GeneralTitleComponent;
  let fixture: ComponentFixture<GeneralTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
