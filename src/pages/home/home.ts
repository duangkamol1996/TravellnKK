import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http,ResponseOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailtravelPage } from "../detailtravel/detailtravel";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  touratt : any;
  data :any;

  constructor(public navCtrl: NavController,public http: Http) {
    this.getTravel();
  }

  getTravel(){
    this.http.post('http://127.0.0.1/webservice/gettouratt.php',null,null).subscribe(data =>{
      this.touratt = data.json();
    })
   }
 
   getdata(){
     var url ='http://http://127.0.0.1/webservice/gettouratt.php';
     this.data = this.http.get(url);
     this.data.subscribe(data =>{
       console.log(this.data);
     });
   } 
   getdetail( valid : any){
     console.log("สถานที่ท่องเที่ยว" + valid);
     this.navCtrl.push(DetailtravelPage,{"valid" : valid});
 
 
   }


}
