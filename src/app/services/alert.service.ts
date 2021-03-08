import { Injectable } from "@angular/core";
import { ToastController, AlertController, PopoverController } from "@ionic/angular";
import { PopoverComponentPage } from "../pages/popover-component/popover-component.page";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private popover: PopoverController,
  ) { }

  async alert(message: any) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: message,
      buttons: ["OK"],
      mode: 'ios'
    });

    await alert.present();
  }

  async toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom",
      mode: 'ios'
    });

    await toast.present();
  }

  async toastSuccess(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom",
      color: "success",
      mode: 'ios'
    });

    await toast.present();
  }

  async toastError(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: "bottom",
      color: "danger",
      mode: 'ios'
    });

    await toast.present();
  }

  async popoverSuccess(title: any, message: any) {
    this.popover.create({
      component: PopoverComponentPage,
      componentProps: { title: title, message: message, type: "success" },
      showBackdrop: true,
      animated: true,
      mode: "ios"
    }).then((popoverElement) => {
      popoverElement.present();
    })
  }

  async popoverError(title: any, message: any) {
    this.popover.create({
      component: PopoverComponentPage,
      componentProps: { title: title, message: message, type: "error" },
      showBackdrop: true,
      animated: true,
      mode: "ios"
    }).then((popoverElement) => {
      popoverElement.present();
    })
  }
}
