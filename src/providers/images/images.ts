import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ImagesProvider {



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

   private _REMOTE_URI : string 	=	"http://127.0.0.1/webservice/setcommentphoto.php";

  
   options:any;
   headers:any;
   fileName:any;
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
   handleImageSelection(event : any) : Observable<any>
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
    * @param TourAttName  		{String}    The file data to be uploaded
    * @param UserEMail  		{String}    The file data to be uploaded
    * @param UserImg  		{String}    The file data to be uploaded
    *  @param com_comment  		{String}    The file data to be uploaded
    * @description    				Uses the Angular HttpClient to post the data to a remote
    *                 				PHP script, returning the observable to the parent script
    * 								allowing that to be able to be subscribed to
    * @return {any}
    */
   uploadImageSelection(file : string,mimeType 	: string, TourAttName:string,UserEMail:string,UserImg:string,com_comment:string,status:any) : Observable<any>
   {

      /* console.log('TEST',status); */
      
      this.fileName   = Date.now() + '.' + mimeType
     

     
         this.headers = new HttpHeaders({'Content-Type' : 'application/octet-stream'})
         
         if(file == null){

            this.options  = {"name" : '00', "TourAttName" : TourAttName,"UserEMail" : UserEMail,"UserImg" : UserImg,"com_comment" : com_comment };
          
            
         }else{
            

            this.options  = { "name" : this.fileName, "file" : file,"TourAttName" : TourAttName,"UserEMail" : UserEMail,"UserImg" : UserImg,"com_comment" : com_comment };

         }

         console.log('chek',this.options);
         return this.http.post(this._REMOTE_URI, JSON.stringify(this.options), this.headers);
   }

}