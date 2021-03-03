import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OlderMutationPage } from './older-mutation.page';

describe('OlderMutationPage', () => {
  let component: OlderMutationPage;
  let fixture: ComponentFixture<OlderMutationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlderMutationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OlderMutationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
