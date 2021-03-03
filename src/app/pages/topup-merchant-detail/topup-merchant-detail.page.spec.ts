import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopupMerchantDetailPage } from './topup-merchant-detail.page';

describe('TopupMerchantDetailPage', () => {
  let component: TopupMerchantDetailPage;
  let fixture: ComponentFixture<TopupMerchantDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupMerchantDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopupMerchantDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
