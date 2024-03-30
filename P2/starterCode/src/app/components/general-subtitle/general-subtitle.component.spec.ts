import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSubtitleComponent } from './general-subtitle.component';

describe('GeneralSubtitleComponent', () => {
  let component: GeneralSubtitleComponent;
  let fixture: ComponentFixture<GeneralSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralSubtitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
