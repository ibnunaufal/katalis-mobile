import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupportAppPage } from './support-app.page';

describe('SupportAppPage', () => {
  let component: SupportAppPage;
  let fixture: ComponentFixture<SupportAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
