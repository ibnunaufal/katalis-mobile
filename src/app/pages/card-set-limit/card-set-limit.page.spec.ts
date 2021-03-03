import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardSetLimitPage } from './card-set-limit.page';

describe('CardSetLimitPage', () => {
  let component: CardSetLimitPage;
  let fixture: ComponentFixture<CardSetLimitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSetLimitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardSetLimitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
