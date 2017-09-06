import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";
import {MainPage} from "../main/main";
import {Image} from "../../models/image";

@Component({
  selector: 'page-teamregister',
  templateUrl: 'teamregister.html',
})
export class TeamregisterPage {
  public  email ;
  public password ;
  public name ;
  public images : Image[] = [];
  public phone ;
  constructor(private camera: Camera,public navCtrl: NavController, public navParams: NavParams ,
              private auth : AuthServiceProvider,public alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamregisterPage');
  }


  openCamera(TypeName:any){
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
     this.images.push({ Image: "data:image/jpeg;base64," + imageData, Type: TypeName });
     
    }, (err) => {
      console.log(err);
    });
  }
  pickPicture(TypeName:any) {
    //noinspection TypeScriptUnresolvedVariable
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL ,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY ,
      allowEdit: true ,
      targetWidth: 1000 ,
      targetHeight: 1000
    }).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.images.push({ Image: "data:image/jpeg;base64," + imageData, Type: TypeName });
      
    }, (err) => {
      console.log(err);
    });
  }
  galleryOrCamera(Type:string) {
    let confirm = this.alertCtrl.create({
      title:  'Choose method',
      message: 'Choose picture from gallery or camera ?',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.pickPicture(Type);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.openCamera(Type);
          }
        }
      ]
    });
    confirm.present();
  }
  gotoconfirm()
  {
    this.auth.register("distributors",this.email,this.password,this.name,this.phone).then(()=>{
        this.navCtrl.push(MainPage);
    }).catch((err)=>console.log(err));
  }
}
