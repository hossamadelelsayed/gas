import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {Image} from "../../models/image";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {TranslateService} from "@ngx-translate/core";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";


@Component({
  selector: 'page-editaccountdis',
  templateUrl: 'editaccountdis.html',
})
export class EditaccountdisPage {
  public password ;
  public name;
  public Image=Image;
  public profileimage:Image;
  public backimage:Image;
  public frontimage:Image;
  public phone ;
  public sta;
  public sta2;
  public sta3;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private camera: Camera,
     public alertCtrl: AlertController,
     private toastCtrl:ToastController,
     public translateService : TranslateService,
     private fireAuth : AuthServiceProvider) {
      this.downloadImage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaccountdisPage');
    
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
          mediaType: this.camera.MediaType.PICTURE
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
          targetWidth: 1000 ,
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
      //dowinload image
     downloadImage(){
      this.fireAuth.joinTeamImgDownload(this.Image.Profile).then((sta)=>{
        this.presentToast(sta.state);
        this.sta=sta;
      }).catch( (err)=>{console.log(err);
        this.translateAndToast(err.message+"err");
      });
      this.fireAuth.joinTeamImgDownload(this.Image.Front).then((sta2)=>{
        this.presentToast(sta2.state);
        this.sta2=sta2;
      }).catch( (err)=>{console.log(err);
        this.translateAndToast(err.message+"err");
      });
      this.fireAuth.joinTeamImgDownload(this.Image.Back).then((sta3)=>{
        this.presentToast(sta3.state);
        this.sta3=sta3;
      }).catch( (err)=>{console.log(err);
        this.translateAndToast(err.message+"err");
      });
     }
      gotoconfirm() {
        //Editname
        this.fireAuth.editdistributorName(this.name).then((res) => {
          console.log(res);
          console.log(this.name);
            this.translateAndToast("Edit Name done");   
           })
           //edit phone
        this.fireAuth.editDistributorsPhoneNo(this.phone).then((res)=>{
            console.log(res)
            console.log(this.phone);
            this.translateAndToast("Edit Phone done");  
          }) 
          //edit password
        this.fireAuth.editPassword(this.password).then((res)=>{
          console.log(res);
          console.log(this.password);
          this.translateAndToast("Edit Password done");
        })
        //upload profile image
        this.fireAuth.joinTeamImgUpload(this.profileimage.Image,this.Image.Profile).then((sta)=>{
          this.presentToast(sta.state);
        }) 
        //upload front image
        this.fireAuth.joinTeamImgUpload(this.frontimage.Image,this.Image.Front).then((sta)=>{
          this.presentToast(sta.state);
        }) 
        //upload back image
        this.fireAuth.joinTeamImgUpload(this.backimage.Image,this.Image.Back).then((sta)=>{
          this.presentToast(sta.state);
        }) 

          .catch((err)=>{
            console.log(err.message);
            console.log(err);
            this.translateAndToast(err.message);
          });
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

}
