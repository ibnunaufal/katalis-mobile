import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmartAccessPage } from './smart-access.page';

describe('SmartAccessPage', () => {
  let component: SmartAccessPage;
  let fixture: ComponentFixture<SmartAccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartAccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmartAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
