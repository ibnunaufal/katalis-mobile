import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcademicHomeAddPage } from './academic-home-add.page';

describe('AcademicHomeAddPage', () => {
  let component: AcademicHomeAddPage;
  let fixture: ComponentFixture<AcademicHomeAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicHomeAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicHomeAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
