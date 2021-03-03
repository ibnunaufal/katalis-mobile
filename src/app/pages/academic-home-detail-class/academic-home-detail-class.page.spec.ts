import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcademicHomeDetailClassPage } from './academic-home-detail-class.page';

describe('AcademicHomeDetailClassPage', () => {
  let component: AcademicHomeDetailClassPage;
  let fixture: ComponentFixture<AcademicHomeDetailClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicHomeDetailClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicHomeDetailClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
