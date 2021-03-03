import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InboxDetailPage } from './inbox-detail.page';

describe('InboxDetailPage', () => {
  let component: InboxDetailPage;
  let fixture: ComponentFixture<InboxDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InboxDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
