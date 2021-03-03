import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonationDetailPage } from './donation-detail.page';

describe('DonationDetailPage', () => {
  let component: DonationDetailPage;
  let fixture: ComponentFixture<DonationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
