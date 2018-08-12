import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeGeneratorComponent } from './theme-generator.component';

describe('ThemeGeneratorComponent', () => {
  let component: ThemeGeneratorComponent;
  let fixture: ComponentFixture<ThemeGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
