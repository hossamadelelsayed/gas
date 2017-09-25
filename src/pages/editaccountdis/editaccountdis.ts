import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController,LoadingController } from 'ionic-angular';
import {Image} from "../../models/image";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {TranslateService} from "@ngx-translate/core";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {CommonServiceProvider} from "../../providers/common-service/common-service";


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
  public userid:any;
  public email:string;
  public myname:string;
  public myphone:number;
  public myemail:string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
              public commonService:CommonServiceProvider,

     private camera: Camera,
     public alertCtrl: AlertController,
     private toastCtrl:ToastController,
     public translateService : TranslateService,
     private fireAuth : AuthServiceProvider,
     public loadingCtrl: LoadingController) {
      this.downloadImage();
      this.userid=this.fireAuth.getUserId();
      console.log(this.userid);
      this.userInfo();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaccountdisPage');

  }
  createImage(Type:number,image:string,ImgSRC:string){
    if(Type==Image.Profile){
      this.sta=ImgSRC;
    this.profileimage=new Image(Type,image,ImgSRC)
    }
     else if (Type==Image.Front){
       this.sta2=ImgSRC;
      this.frontimage=new Image(Type,image,ImgSRC)
    }
    else{
      this.sta3=ImgSRC;
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
        //  this.sta = base64Image;

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
          // this.sta='data:image/jpeg;base64,'+imageData;
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
      this.commonService.presentLoading("Please Wait ...")
        //Editname
        this.fireAuth.editdistributorName(this.name).then((res) => {
          console.log(res);
          console.log(this.name);
            this.translateAndToast('Name updated');
<<<<<<< HEAD
          this.commonService.dismissLoading();
this.commonService.dismissLoading()
        })
        this.commonService.presentLoading('Please Wait...')

        //edit phone
=======
           })
           //edit phone
>>>>>>> ff8edbadb769e22c9f87933fe460f88d15b23a2a
        // this.fireAuth.editDistributorsPhoneNo(this.phone).then((res)=>{
        //     console.log(res)
        //     console.log(this.phone);
        //     this.translateAndToast('Phone updated');
        //   })
          //edit password
        this.fireAuth.editPassword(this.password).then((res)=>{
          this.commonService.dismissLoading()

          console.log(res);
          console.log(this.password);
          this.translateAndToast("Password updated");
        })
        //edit email
        this.commonService.presentLoading("Please Wait...")

        this.fireAuth.editEmail('distributors',this.userid,this.email,this.phone,this.password).then((res)=>{
          this.commonService.dismissLoading()

          console.log(res);
          console.log(this.email);
          this.translateAndToast("Email updated");
        })
        .catch((err)=>{

          console.log(err.message);
            console.log(err);
          this.commonService.dismissLoading()
            this.translateAndToast(err.message);
          });
          let promises : Promise<boolean>[] = [] ;
<<<<<<< HEAD
        this.commonService.presentLoading("Please Wait...")

        let promise = new Promise((resolve, reject) => {
=======
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          let promise = new Promise((resolve, reject) => {
            loading.present();
>>>>>>> ff8edbadb769e22c9f87933fe460f88d15b23a2a
            promises.push(this.fireAuth.joinTeamImgUpload(this.profileimage.Image,this.Image.Profile));
            promises.push(this.fireAuth.joinTeamImgUpload(this.frontimage.Image,this.Image.Front));
            promises.push(this.fireAuth.joinTeamImgUpload(this.backimage.Image,this.Image.Back));
            Promise.all(promises).then(()=>{
              resolve(true);
              this.commonService.dismissLoading()
            }).catch((err)=>reject(err));
          this.commonService.dismissLoading()

          })
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

userInfo(){
  this.fireAuth.getUserInfo(this.userid,'distributors').then((res)=>{
    this.myname=res.name;
    this.myphone=res.phoneNo;
    this.myemail=res.email;
    console.log(res);
  }).catch((err)=>{
    console.log('err',err);
  });
}
presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 5000);
}

}
