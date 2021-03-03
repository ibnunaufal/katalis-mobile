import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcademicHomeAddStudentPage } from './academic-home-add-student.page';

describe('AcademicHomeAddStudentPage', () => {
  let component: AcademicHomeAddStudentPage;
  let fixture: ComponentFixture<AcademicHomeAddStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicHomeAddStudentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicHomeAddStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
