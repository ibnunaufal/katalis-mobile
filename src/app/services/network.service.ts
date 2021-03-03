import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
const { Network } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  networkListerner: PluginListenerHandle;
  networkStatus: NetworkStatus;
  constructor(public platform: Platform, private toast: ToastController) {

  }

  destroy(): void {
    this.networkListerner.remove();
  }
  async getStatus() {
    this.networkListerner = Network.addListener('networkStatusChange', async status => {
      console.log('hao')
      console.log('network status change', status);
      this.networkStatus = status;
      this.networkStatus = await Network.getStatus();
      if (this.networkStatus.connected == true) {
        const success = await this.toast.create({
          message: 'Network is online',
          duration: 2500,
          position: "bottom",
          color: "success",
        });
        // await success.present();
        console.log('network status change', status);

      } else {
        const toast = await this.toast.create({
          message: 'Network is offline',
          duration: 2500,
          position: "bottom",
          color: "danger",
        });
        await toast.present();
      }
    })
  }

}
