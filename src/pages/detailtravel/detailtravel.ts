import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ImagesProvider } from '../../providers/images/images';
import { Events } from 'ionic-angular';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-detailtravel',
  templateUrl: 'detailtravel.html',
})
export class DetailtravelPage {
   TourAttID : any;
   detail :any;
   TourAttName :any;
   TourAttInt : any;
   TourAttMap : any;
   TourAttImg : any;
   com_comment : any;
   com_photo : any;
   UserEMail : any;
   UserImg : any;
   datalistcom : any;
   rate : any;
   rateshow : any;
   getrate : any;
 
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
    public http: Http,
    private storage: Storage,
    public alertCtrl: AlertController,
    public events: Events,
    private _ALERT       : AlertController,
    private _IMAGES 		: ImagesProvider,) {

      events.subscribe('star-rating:changed', (starRating) => {console.log(starRating)});
      this.TourAttID=this.navParams.get("valid");
      console.log("ค่าที่ส่งมา "+this.TourAttID)
   
    }

      /* setupcomment(){
      let headers = new Headers({'Content-Type':'application/json'});
      let options = new ResponseOptions({headers:headers});
      let body = {com_comment:this.com_comment,TourAttName:this.TourAttName,UserEMail:this.UserEMail,UserImg:this.UserImg};
      if(this.com_comment!=null,this.UserEMail!=null){
      this.http.post("http://127.0.0.1/webservice/upcomment.php",body,options)
      .subscribe(data=>{
      console.log("apistatus:"+data.json()[0].apistatus);
      this.getComment();
      this.com_comment = null;
      },error=>{
      console.log("เชื่อมไม่ได้");
      })
      }else{
         this.showAlert();
      }
      } */
      
      getlocalstorage(){
      this.storage.get("UserEMail").then((val)=>{
      this.UserEMail = val
      console.log("ค่า : "+val); 
      });
      this.storage.get("UserImg").then((val)=>{
         this.UserImg = val
         console.log("ค่า : "+val); 
         });
      }
      
      showAlert() {
      if(this.UserEMail!=null){
      console.log("ทำการล็อคอินเรียบร้อยแล้ว"); 
      }else{
      const alert = this.alertCtrl.create({
      title: 'ผิดพลาด',
      subTitle: 'กรุณาทำการล็อดอินก่อน',
      buttons: [
      {
      text: 'ตกลง',
      handler: () => {
      console.log('ตกลง clicked');
      this.navCtrl.setRoot(LoginPage)
      }
      },
      {
      text: 'ยกเลิก',
      handler: () => {
      console.log('ยกเลิก clicked');
      }
      }
      ]
      });
      alert.present();
      }
      }
/* --------------------คะแนน---------------------- */
      
onModelChange(event){
   this.rate = event;
   if(this.rate == 5){
     this.rate = 5;
     this.rateshow = 'ดีมาก';
   }else if (this.rate == 4){
     this.rate = 4;
     this.rateshow = 'ดี';
   }else if (this.rate == 3){
     this.rate = 3;
     this.rateshow = 'ปานกลาง';
   }else if (this.rate == 2){
     this.rate = 2; 
     this.rateshow = 'พอใช้'; 
   }else if (this.rate == 1){
     this.rate = 1;
     this.rateshow = 'ปรับปรุง';
   } else  {
     this.rate = ''; 
   }  
     console.log(event);
     this.setpoint();     

/*      if(this.getrate!=null){

      console.log('UPDATE');

      this.setupdatepoint(); //ไม่เอา
     }else{


         console.log('INSERT');

         this.setpoint();
     
   } */
}



setpoint(){
   if(this.UserEMail!=null){
   console.log('INSERT');
   let headers = new Headers({'Content-Type':'application/json'});
   let options = new ResponseOptions({headers:headers});
   let body = {Poi_Star:this.rate,UserEMail:this.UserEMail,TourAttName:this.TourAttName};
   this.http.post("http://127.0.0.1/webservice/setpoint.php",body,options)
   .subscribe(data=>{
   console.log("apistatus:"+data.json()[0].apistatus);
   
   },error=>{
   console.log("error");
   })
}else{
   console.log("error");
}
}

/* setupdatepoint(){



   console.log('UPDATE2');
   let headers = new Headers({'Content-Type':'application/json'});
   let options = new ResponseOptions({headers:headers});
   let body = {Poi_Star:this.rate,UserEMail:this.UserEMail,TourAttName:this.TourAttName};
   this.http.post("http://127.0.0.1/webservice/updatepoint.php",body,options)
   .subscribe(data=>{
   console.log("apistatus:"+data.json()[0].apistatus);
   },error=>{
   console.log("error");
   })



} */



/* getpoint(){
   let headers = new Headers({'Content-Type':'application/json'});
      let options = new ResponseOptions({headers:headers});
      let body = {UserEMail:this.UserEMail,TourAttName:this.TourAttName};
   this.http.post("http://127.0.0.1/webservice/getpoint.php",body,options).subscribe(data=>{

      if(data.json()[0].apistatus=="1"){
         this.getrate = data.json()[1].dbresult; 
         console.log("มีข้อมูล");
       }else if(data.json()[0].apistatus=="0"){
          this.getrate = null;
          console.log("ไม่มีข้อมูล");
       }

   },error=>{
      console.log("error"); 
   })
   } */


/* ----------------------คะแนน---------------------------- */
      
      /* ...............................................................GET................................................................................. */
      
      getdata(){
      
      let headers = new Headers({'Content-Type':'application/json'});
      let options = new ResponseOptions({headers:headers});
      let body = {TourAttID:this.TourAttID};
      
      //console.log("สถานที่ท่องเที่ยวในหน้า detail" + this.TourAttID);
      this.http.post('http://127.0.0.1/webservice/gettourattdetail.php',body,options).subscribe(data =>{
      this.detail = data.json();
      /* this.TourAttImg = data.json()[0].TourAttName;
      console.log("รูปสถานที่ " + data.json()[0].TourAttName); */
      this.TourAttName = data.json()[0].TourAttName;
      console.log("ชื่อสถานที่ " + data.json()[0].TourAttName);
      this.TourAttInt = data.json()[0].TourAttInt;
      this.getlocalstorage();
      this.getComment();
     
      /* this.TourAttMap = data.json()[0].TourAttMap;
      console.log("แผนที่" + data.json()[0].TourAttName); */
      
   },error=>{
      console.log("error"); 
   })
      
      }
      
      getComment(){
      let headers = new Headers({'Content-Type':'application/json'});
      let options = new ResponseOptions({headers:headers});
      let body = {TourAttName:this.TourAttName};
      this.http.post('http://127.0.0.1/webservice/getcommentTT.php',body,options).subscribe(data=>{
      if(data.json()[0].com_comment=="0"){
         console.log("ไม่มีความคิดเห็น");
      }else{
         this.datalistcom = data.json();
      }
     
   },error=>{
      console.log("error"); 
   })
      }


/* ------------------------------------------------------------------------------------------- */

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
      .handleImageSelection(event)
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


      let UserEMail:any=this.UserEMail;
      let TourAttName:any=this.TourAttName;
      let UserImg:any=this.UserImg;
      let com_comment:any=this.com_comment;
     
      
      if(this.UserEMail!=null){
         this._IMAGES
         .uploadImageSelection(this.image,this._SUFFIX,TourAttName,UserEMail,UserImg,com_comment,this.statuss)
         .subscribe((res) =>
         {
            console.log("ทำการบันทึกเรียบร้อยแล้ว"); 
            this.image = null;
            this.com_comment = null;
            this.getComment();
            
         },
         (error : any) =>
         {
            console.log("ทำการบันทึกเรียบแล้ว");
            this.image = null;
            this.com_comment = null;
            this.getComment();
            
         });
      }else{
         this.showAlert();
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
   this.getdata();
   
   
   
  }



}
