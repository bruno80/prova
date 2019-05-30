import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContatoModalPage } from '../contato-modal/contato-modal.page';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public modalController: ModalController,
    private storage: Storage) {
    this.storage.get(this.CONTATOS_KEY).then((data) => {
      if (data) {
        this.contatos = data
      }
    })
  }

  contatos = [];
  CONTATOS_KEY = 'contatos';


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
    this.contatos.push(contato);
    this.storage.set(this.CONTATOS_KEY, this.contatos)

  }

  async delete(contato) {
    var i = this.contatos.indexOf(contato);
    this.contatos.splice(i, 1);
    this.storage.set(this.CONTATOS_KEY, this.contatos)
  }


}
