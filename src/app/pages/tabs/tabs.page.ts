import { Component } from '@angular/core';
import { HomePage } from '../home/home.page';
import { InfoPage } from '../info/info.page';
import { InboxPage } from '../inbox/inbox.page';
import { ProfilePage } from '../profile/profile.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = InfoPage;
  tab3Root: any = InboxPage;
  tab4Root: any = ProfilePage;
  activeHomepage = false;
  activeInfo = false;
  activeNotification = false;
  activeProfile = false;

  constructor(private statusBar: StatusBar) {

    this.statusBar.backgroundColorByHexString('#ffffff');
    this.activeHomepage = true;
  }

  changeIcon(page) {
    if (page == 'home') {
      this.activeHomepage = true;
      this.activeProfile = false;
      this.activeNotification = false;
      this.activeInfo = false;
    } else if (page == 'info') {
      this.activeHomepage = false;
      this.activeProfile = false;
      this.activeNotification = false;
      this.activeInfo = true;

    } else if (page == 'inbox') {
      this.activeHomepage = false;
      this.activeProfile = false;
      this.activeNotification = true;
      this.activeInfo = false;
    }
    else {
      this.activeHomepage = false;
      this.activeProfile = true;
      this.activeNotification = false;
      this.activeInfo = false;
    }

  }
}
