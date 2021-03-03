import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamDataPage } from './exam-data.page';

describe('ExamDataPage', () => {
  let component: ExamDataPage;
  let fixture: ComponentFixture<ExamDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
