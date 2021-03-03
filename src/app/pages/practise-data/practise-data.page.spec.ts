import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PractiseDataPage } from './practise-data.page';

describe('PractiseDataPage', () => {
  let component: PractiseDataPage;
  let fixture: ComponentFixture<PractiseDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractiseDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PractiseDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
