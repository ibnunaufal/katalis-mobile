import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.page.html',
  styleUrls: ['./popover-component.page.scss'],
})
export class PopoverComponentPage implements OnInit {
  title;
  message;
  type
  constructor(private popover: PopoverController,
    private navParams: NavParams) {

    this.title = this.navParams.get('title');
    this.message = this.navParams.get('message');
    this.type = this.navParams.get('type');

  }

  ngOnInit() {
  }

  ClosePopover() {
    this.popover.dismiss();
  }
}
