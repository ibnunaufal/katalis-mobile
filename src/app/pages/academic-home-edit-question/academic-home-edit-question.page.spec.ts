import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcademicHomeEditQuestionPage } from './academic-home-edit-question.page';

describe('AcademicHomeEditQuestionPage', () => {
  let component: AcademicHomeEditQuestionPage;
  let fixture: ComponentFixture<AcademicHomeEditQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicHomeEditQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicHomeEditQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
