import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Last30MutationPage } from './last30-mutation.page';

describe('Last30MutationPage', () => {
  let component: Last30MutationPage;
  let fixture: ComponentFixture<Last30MutationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Last30MutationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Last30MutationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
