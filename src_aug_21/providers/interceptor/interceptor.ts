import { AlertController } from 'ionic-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../api/api'
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError, tap} from 'rxjs/operators';
/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterceptorProvider {

  constructor(private storage: Storage, private alertCtrl: AlertController, private ApiProvider:ApiProvider) {
    // console.log('Hello InterceptorProvider Provider');
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = JSON.parse(localStorage.getItem('x-access-token'));
    // console.log('x-access-token',authToken)
    if(authToken==undefined){
      const authReq = req.clone({
        headers: req.headers.set('x-access-token', '')
      });  
      return next.handle(authReq).pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {

            if(evt.body.status==false){
               try{
                // this.toastrService.error(evt.body.message);
                alert(evt.body.message);

            }catch(error){
              console.log(error)
            }
            }
           
          }
        })
      )
    }else{
      const authReq = req.clone({
        headers: req.headers.set('x-access-token', authToken)
      });  
      return next.handle(authReq).pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {
            // console.log('------response----------------------------------------------------------')
            if(evt.body.status==false){
               try{
                // this.toastrService.error(evt.body.message);
                alert(evt.body.message);
            }catch(error){
              // console.log(error)
            }
            }
           
          }
        })
      )
    }
    
  }

}
