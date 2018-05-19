import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicStudentDataComponent } from './basic-student-data.component';

describe('BasicStudentDataComponent', () => {
  let component: BasicStudentDataComponent;
  let fixture: ComponentFixture<BasicStudentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicStudentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
