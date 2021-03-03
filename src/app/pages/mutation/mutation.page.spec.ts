import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MutationPage } from './mutation.page';

describe('MutationPage', () => {
  let component: MutationPage;
  let fixture: ComponentFixture<MutationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MutationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
