import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BroadcastDetailPage } from './broadcast-detail.page';

describe('BroadcastDetailPage', () => {
  let component: BroadcastDetailPage;
  let fixture: ComponentFixture<BroadcastDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
