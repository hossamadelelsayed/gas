import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,AlertController,LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";
import {TranslateService} from "@ngx-translate/core";
import {MainPage} from "../main/main";
import {Image} from "../../models/image";
import { Storage } from '@ionic/storage';
import {NativeStorage} from '@ionic-native/native-storage';
import{HistoryPage} from "../history/history";
@Component({
  selector: 'page-teamregister',
  templateUrl: 'teamregister.html',
})
export class TeamregisterPage {
  public email;
  public password ;
  public name ;
  public Image=Image;
  public profileimage:Image=null;
  public backimage:Image=null;
  public frontimage:Image=null;
  public phone ;
  
  constructor(public translateService : TranslateService,
              public alertCtrl: AlertController,
              private toastCtrl:ToastController,
              private camera: Camera,
              public navCtrl: NavController,
              public navParams: NavParams ,
              private auth : AuthServiceProvider,
              private storage: Storage,
              public nativeStorage:NativeStorage,
              public loadingCtrl: LoadingController) {

              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamregisterPage');
  }
createImage(Type:number,image:string,ImgSRC:string){
if(Type==Image.Profile){
this.profileimage=new Image(Type,image,ImgSRC)
}
 else if (Type==Image.Front){
  this.frontimage=new Image(Type,image,ImgSRC)
}
else{
  this.backimage=new Image(Type,image,ImgSRC)
}
}

  openCamera(TypeName:number){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    
     this.createImage(TypeName,imageData,'data:image/jpeg;base64,'+imageData);
     
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
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.createImage(TypeName,imageData,'data:image/jpeg;base64,'+imageData);
      
    }, (err) => {
      console.log(err);
    });
  }
  galleryOrCamera(Type:number) {
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
  DownloadImage(){}
  gotoconfirm()
  {
    this.auth.register("distributors",this.email,this.password,this.name,this.phone)
    .then(()=>{

      this.storage.set('type','distributors');

      this.nativeStorage.setItem('phone',this.phone);
      this.nativeStorage.setItem('password',this.password);
      console.log("img str",this.profileimage.Image);

      let promises : Promise<boolean>[] = [] ;
      let loading = this.loadingCtrl.create({
        content:'Please wait...'
      });
      let promise = new Promise((resolve, reject) => {
        loading.present();  
        promises.push(this.auth.joinTeamImgUpload(this.profileimage.Image,this.Image.Profile));
        promises.push(this.auth.joinTeamImgUpload(this.frontimage.Image,this.Image.Front));
        promises.push(this.auth.joinTeamImgUpload(this.backimage.Image,this.Image.Back));
        Promise.all(promises).then(()=>{
          resolve(true);
          loading.dismiss();
        }).catch((err)=>reject(err));
      })

      // this.auth.joinTeamImgUpload(this.profileimage.Image,this.Image.Profile).then((sta)=>{
      //   this.presentToast(sta.state);
      // }).catch( (err)=>{console.log(err);
      //   this.translateAndToast(err.message+"err");
      // });
      // this.auth.joinTeamImgUpload(this.frontimage.Image,this.Image.Front).then((sta)=>{
      //   this.presentToast(sta.state+"err");
      // });
      // this.auth.joinTeamImgUpload(this.backimage.Image,this.Image.Back).then((sta)=>{
      //   this.presentToast(sta.state+"err");
      // });
      this.translateAndToast("Registration done");
         this.navCtrl.push(HistoryPage);
      
      })
    .catch(
      (err)=>{console.log(err);
        this.translateAndToast(err.message+"err");
      }
  );
    
  }

  presentToast(txt:any) {
    
      let toast = this.toastCtrl.create({
        message: txt,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
    
    translateAndToast(word : string)
    {
      this.translateService.get(word).subscribe(
        value => {
          // value is our translated string
          this.presentToast(value);
        }
      );
    }
    gotohome(){
      this.navCtrl.push(HomePage);
    }
}
