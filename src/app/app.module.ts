import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { StarRatingModule } from 'ionic3-star-rating';
import { IonicRatingModule } from 'ionic-rating';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StartPage } from '../pages/start/start';
import { DetailtravelPage } from '../pages/detailtravel/detailtravel';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { ImagesProvider } from '../providers/images/images';
import { ImgregisterProvider } from '../providers/imgregister/imgregister';
import { Facebook  } from '@ionic-native/facebook/ngx';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    StartPage,
    DetailtravelPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StarRatingModule,
    IonicRatingModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    StartPage,
    DetailtravelPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagesProvider,
   
    ImgregisterProvider,
    Facebook
  ]
})
export class AppModule {}
