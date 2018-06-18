import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseinfoAddComponent } from './courseinfo-add.component';

describe('CourseinfoAddComponent', () => {
  let component: CourseinfoAddComponent;
  let fixture: ComponentFixture<CourseinfoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseinfoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseinfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
