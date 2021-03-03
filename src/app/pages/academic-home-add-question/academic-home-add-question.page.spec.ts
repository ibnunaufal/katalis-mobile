import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcademicHomeAddQuestionPage } from './academic-home-add-question.page';

describe('AcademicHomeAddQuestionPage', () => {
  let component: AcademicHomeAddQuestionPage;
  let fixture: ComponentFixture<AcademicHomeAddQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicHomeAddQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicHomeAddQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
