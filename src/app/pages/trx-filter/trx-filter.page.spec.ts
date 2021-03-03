import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrxFilterPage } from './trx-filter.page';

describe('TrxFilterPage', () => {
  let component: TrxFilterPage;
  let fixture: ComponentFixture<TrxFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrxFilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrxFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
