import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ImgregisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImgregisterProvider {

 /**
    * @name _READER
    * @type object
    * @private
    * @description              Creates a FileReader API object
    */
   private _READER : any  			=	new FileReader();



   /**
    * @name _REMOTE_URI
    * @type String
    * @private
    * @description              The URI for the remote PHP script that will handle the image upload/parsing
    */
   private _REMOTE_URI : string 	=	"http://127.0.0.1/webservice/setregisterphoto.php";



   constructor(public http: HttpClient)
   {}



   /**
    * @public
    * @method handleImageSelection
    * @param event  {any}     	The DOM event that we are capturing from the File input field
    * @description    			Uses the FileReader API to capture the input field event, retrieve
    *                 			the selected image and return that as a base64 data URL courtesy of
    *							an Observable
    * @return {Observable}
    */
   handleImproSelection(event : any) : Observable<any>
   {
      let file 		: any 		= event.target.files[0];

      this._READER.readAsDataURL(file);
      return Observable.create((observer) =>
      {
         this._READER.onloadend = () =>
         {
            observer.next(this._READER.result);
            observer.complete();
         }
      });
   }



   /**
    * @public
    * @method isCorrectFile
    * @param file  {String}     The file type we want to check
    * @description    			Uses a regular expression to check that the supplied file format
    *                 			matches those specified within the method
    * @return {any}
    */
   isCorrectFileType(file)
   {
      return (/^(gif|jpg|jpeg|png)$/i).test(file);
   }



   /**
    * @public
    * @method uploadImageSelection
    * @param file  		{String}    The file data to be uploaded
    * @param mimeType  	{String}    The file's MimeType (I.e. jpg, gif, png etc)
    * @param UserEMail  		{String}    The file data to be uploaded
    * @param UserName  		{String}    The file data to be uploaded
    * @param UsePassword  		{String}    The file data to be uploaded
    * @param UseFull  		{String}    The file data to be uploaded
    * @param UseLast  		{String}    The file data to be uploaded
    * @param UserB_day  		{String}    The file data to be uploaded
    * @param UserTel  		{String}    The file data to be uploaded
    * @param UserSex  		{String}    The file data to be uploaded
    * @description    				Uses the Angular HttpClient to post the data to a remote
    *                 				PHP script, returning the observable to the parent script
    * 								allowing that to be able to be subscribed to
    * @return {any}
    */
   uploadImaproSelection(file 		: string,mimeType 	: string,UserEMail:string,UserName:string,UsePassword:string,UseFull:string,UseLast:string,UserB_day:string,UserTel:string,UserSex:string) : Observable<any>
   {
    let headers 	: any		= new HttpHeaders({'Content-Type' : 'application/octet-stream'}),
    fileName  : any       = Date.now() + '.' + mimeType,
    options 	: any		= { "name" : fileName, "file" : file,"UserEMail" : UserEMail,"UserName" : UserName,"UsePassword" : UsePassword,"UseFull" : UseFull,"UseLast" : UseLast,"UserB_day" : UserB_day,"UserTel" : UserTel,"UserSex" : UserSex };
    console.log('เทสส',options);
return this.http.post(this._REMOTE_URI, JSON.stringify(options), headers);
   }

}
