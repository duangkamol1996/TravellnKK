import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ImgregisterProvider } from '../../providers/imgregister/imgregister';
import { Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  UserEMail : any;
  UserName : any;
  UsePassword : any;
  UseFull : any;
  UseLast : any;
  UserB_day : any;
  UserTel : any;
  UserSex : any;
  statuss:any =null;


    /**
   * @name image
   * @type String
   * @public
   * @description              Will store the selected image file data (in the form of a base64 data URI)
   */
  public image : string;



  /**
   * @name isSelected
   * @type Boolean
   * @public
   * @description              Used to switch DOM elements on/off depending on whether an image has been selected
   */
  public isSelected : boolean 		=	false;



  /**
   * @name _SUFFIX
   * @type String
   * @private
   * @description              Will store the selected image's MimeType
   */
  private _SUFFIX : string;

 constructor(public navCtrl: NavController, 
   public navParams: NavParams,
   private storage: Storage,
   public alertCtrl: AlertController,
   public events: Events,
   private _ALERT       : AlertController,
   private _IMAGES 		: ImgregisterProvider,) {

   }
   
  /**
    * @public
    * @method selectFileToUpload
    * @param event  {any}     	The DOM event that we are capturing from the File input field
    * @description    			Handles the selection of image files from the user's computer,
    *                 			validates they are of the correct file type and displays the
    *							selected image in the component template along with an upload
    * 							button
    * @return {none}
    */

   selectFileToUpload(event) : void
   {

      this.storage.set("sss","12345678");

      this.statuss = "1";

      this.storage.get("sss").then((val)=>{

         console.log('test',val);
      });

      this._IMAGES
      .handleImproSelection(event)
      .subscribe((res) =>
      {

         // Retrieve the file type from the base64 data URI string
         this._SUFFIX 			= res.split(':')[1].split('/')[1].split(";")[0];


         // Do we have correct file type?
         if(this._IMAGES.isCorrectFileType(this._SUFFIX))
         {

            // Hide the file input field, display the image in the component template
            // and display an upload button
            this.isSelected 	= true
            this.image 			= res;
         }

         // If we don't alert the user
         else
         {
            this.displayAlert('You need to select an image file with one of the following types: jpg, gif or png');
         }
      },
      (error) =>
      {
         console.dir(error);
         this.displayAlert(error.message);
      });
   }

   /**
    * @public
    * @method uploadFile
    * @description    			Handles uploading the selected image to the remote PHP script
    * @return {none}
    */
   uploadFile() : void
   {
    let UserEMail : any = this.UserEMail;
    let UserName : any = this.UserName;
    let UsePassword : any = this.UsePassword;
    let UseFull : any = this.UseFull;
    let UseLast : any = this.UseLast;
    let UserB_day : any = this.UserB_day;
    let UserTel : any = this.UserTel;
    let UserSex : any = this.UserSex;

     
         this._IMAGES
         .uploadImaproSelection(this.image,this._SUFFIX,UserEMail,UserName,UsePassword,UseFull,UseLast,UserB_day,UserSex,UserTel)
         .subscribe((res) =>
         {
            console.log("ทำการบันทึกเรียบร้อยแล้ว"); 
            this.image = null;
            this.UserEMail = null;
            this.UserName = null;
            this.UsePassword = null;
            this.UseFull = null;
            this.UseLast = null;
            this.UserB_day = null;
            this.UserTel = null;
            this.UserSex = null;
            /* this.displayAlert(res.message); */
            
         },
         (error : any) =>
         {
            console.log("ทำการบันทึกผิดพลาด");    
 /*            console.dir(error);
         this.displayAlert(error.message);  */       
         });
   }




   goToUser(){

    if(this.UseFull != null && this.UseLast != null && this.UserName != null && this.UserEMail != null && this.UsePassword != null && this.UserTel != null && this.UserSex != null && this.UserB_day != null && this.image != null){
    const prompt = this.alertCtrl.create({
    title: 'Message!',
    message: 'ท่านได้สมัครสมาชิก!',
    buttons: [
    {
    text: 'OK',
    handler: () => {
    console.log('Disagree clicked');
    }
    },
    ]
    });
    
    prompt.present();
    this.uploadFile();
    this.navCtrl.setRoot(LoginPage);
    }else{
    
    const prompt = this.alertCtrl.create({
    title: 'Message!',
    message: 'กรุณากรอกข้อมูลให้ครบ!',
    buttons: [
    {
    text: 'OK',
    handler: () => {
    console.log('Disagree clicked');
    }
    },
    ]
    });
    prompt.present();
    }
    }





   /**
    * @public
    * @method displayAlert
    * @param message  {string}  The message to be displayed to the user
    * @description    			Use the Ionic AlertController API to provide user feedback
    * @return {none}
    */
   displayAlert(message : string) : void
   {
      let alert : any   = this._ALERT.create({
         title 		: 'Heads up!',
         subTitle 	: message,
         buttons 	: ['Got it']
      });
      alert.present();
   }
 
  





















  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
}
