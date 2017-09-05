import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";
import {MainPage} from "../main/main";

@Component({
  selector: 'page-teamregister',
  templateUrl: 'teamregister.html',
})
export class TeamregisterPage {
  public  email ;
  public password ;
  public name ;
  public phone ;
  constructor(private camera: Camera,public navCtrl: NavController, public navParams: NavParams ,
              private auth : AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamregisterPage');
  }


  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {

    });
  }
  gotoconfirm()
  {
    this.auth.register("distributors",this.email,this.password,this.name,this.phone).then(()=>{
        this.navCtrl.push(MainPage);
    }).catch((err)=>console.log(err));
  }
}
