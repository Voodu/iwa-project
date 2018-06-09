import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestStudentListComponent } from './guest-student-list.component';

describe('GestStudentListComponent', () => {
  let component: GestStudentListComponent;
  let fixture: ComponentFixture<GestStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
