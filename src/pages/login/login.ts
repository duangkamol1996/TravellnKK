import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  datalist: any;
  
  UserEMail: any;
  UsePassword : any;
  userData=null;
  isUserLoggedIn : any =false;
  userInfo: any ={};
  constructor(public navCtrl: NavController,public fb: Facebook, public navParams: NavParams,public http: Http,private storage: Storage,public alertCtrl: AlertController) {
  }

  getLogin(){

    let headers = new Headers({'Content-Type':'application/json'});
    let options = new ResponseOptions({headers:headers});
    let body = {UserEMail:this.UserEMail,UsePassword:this.UsePassword};
    this.http.post("http://127.0.0.1/webservice/getLogin.php",body,options)
    .subscribe(data=>{
      console.log("User  : " + data.json()[0].UserEMail);
    if(data.json()[0].UserEMail!=null){      
      this.storage.set("UserEMail",data.json()[0].UserEMail);
      this.storage.set("UserImg",data.json()[0].UserImg);
      this.navCtrl.setRoot(HomePage)
      
    }else{
     console.log("ข้อมูลไม่มา")
    this.showAlert();
    }
    },error=>{
    console.log("เชื่อมไม่ได้จ้าาาา");
    })
    }

  GoToRegisterPage(){
    this.navCtrl.setRoot(RegisterPage)
  }
 
  
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'ผิดพลาด!',
      subTitle: 'กรุณากรอกข้อมูลให้ครบ!',
      buttons: ['OK']
    });
    alert.present();
  }
  loginAction()
  {
      // Login with permissions
      this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
      .then( (response: FacebookLoginResponse) => {
  
         
              this.fb.api("me?fields=id,name,email,picture.(720).height(720).as(picture_large)", []).then(profile => {
      this.userData={email:profile['email'],first_mame: profile['first_mame'],picture:profile['picture_large']['data']['url'],username:profile['name']};
                  
                  
  
              })
  
          
      
          
  
      })
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
