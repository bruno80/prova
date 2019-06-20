import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContatoModalPage } from '../contato-modal/contato-modal.page';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  contatos: any;
  CONTATOS_KEY = 'contatos';

  constructor(
    public modalController: ModalController, private storage: Storage, private http: HttpClient, public loadingController: LoadingController) {
    this.contatos = []

    this.loadingController.create({
      message: 'Loading'
    }).then((loader) => {
      loader.present();
      this.http.get('http://5d0ab6c4c5896f0014e86dcb.mockapi.io/contact').subscribe(
        (data) => {
          this.contatos = data;
          loader.dismiss();
        }
      )
    });
  }

  async modal() {
    const modal = await this.modalController.create({
      component: ContatoModalPage
    });
    modal.onDidDismiss().then((contato) => {
      this.add(contato.data)

    })
    await modal.present();
  }

  async add(contato) {
    this.loadingController.create({
      message: 'Loading'
    }).then((loader) => {
      loader.present();
    this.http.post('http://5d0ab6c4c5896f0014e86dcb.mockapi.io/contact', contato).subscribe(
      (data) => {
        this.contatos.push(data);
        loader.dismiss();
      }
    )
  });
}

  async delete(contato) {
    this.loadingController.create({
      message: 'Loading'
    }).then((loader) => {
      loader.present();
    this.http.delete('http://5d0ab6c4c5896f0014e86dcb.mockapi.io/contact/' + contato.id).subscribe(
      (data) => {
        var i = this.contatos.indexOf(contato);
        this.contatos.splice(i, 1);
        loader.dismiss();
      }
    )
  });
}

}
