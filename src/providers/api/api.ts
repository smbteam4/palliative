import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap} from 'rxjs/operators';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { AppSettings } from '../../app/app.settings'
import { JwtHelperService } from '@auth0/angular-jwt';
// import { of } from 'rxjs';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  private jwtHelper = new JwtHelperService();
  private baseUrl = AppSettings.api_url+'users/'; 
  // private s3_url = environment.s3_upload;

  constructor( private http: HttpClient) { }


  protected setTokens(headers) {

    if (headers.get('Authtoken')) {
      // localStorage.setItem('x-access-token', headers.get('x-access-token')).subscribe(() => { }, () => { });
      localStorage.setItem('Authtoken', headers.get('Authtoken'));
    }
      

    if (headers.get('refreshtoken')) {
      // localStorage.setItem('refresh-token', headers.get('refresh-token')).subscribe(() => { }, () => { });
      localStorage.setItem('refreshtoken', headers.get('refreshtoken'));
    }
     
  }
/**
 * Get request handler
 * @param token 
 * @param refresh_token 
 * @param url 
 * @param params 
 */
  protected getRequestHandler(token, refresh_token, url, params) {

    const httpOptions2 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','source':'web' })
    };
    // if (refresh_token && token){
    if (token){
      httpOptions2.headers = httpOptions2.headers.append('Authtoken', token);
      if (this.jwtHelper.isTokenExpired(token)) {
      httpOptions2.headers = httpOptions2.headers.append('refreshtoken', refresh_token);
      }// if (token)
    }
   
    return this.http.get(url,httpOptions2);
  }

/**
 * Refresh token fetcher (link  --> getRequestHandler)
 * @param url 
 * @param data 
 * @param token 
 */
  protected makeGetRequest(url, params, token) {

    return  this.getRequestHandler(token, localStorage.getItem('Authtoken'), url, params);
  }

/**
 * Consolidated get request
 * @param url 
 * @param params 
 */
  // public _get(url: string, params: any) : Observable<any> {

  //   url = this.baseUrl + url;
  //   // localStorage.getItem('x-access-token').subscribe(res=>(console.log("INS",res)))
  //   return this.makeGetRequest(url, params, localStorage.getItem('Authtoken')).pipe(tap((response) => {
  //     if (response['Authentication'] == false && response['invalidToken'] == true) {
  //       // this.loaderService.stopAll();
  //       // this.auth.logout();
  //     }
  //       if(response['Authtoken']){
  //         localStorage.setItem('Authtoken',response['Authtoken'])
  //       }
  //       if(response['refreshtoken'])
  //       {
  //         localStorage.setItem('refreshtoken',response['refreshtoken'])
  //       }
  //       return response;
  //     }),
  //      catchError(this.handleError('GET'+url, { status: false, message: 'Network Error!' }))
  //     );
  // }

/**
 * Post handler
 * @param token 
 * @param refresh_token 
 * @param url 
 * @param data 
 */
  protected postRequestHandler(token, refresh_token, url, data) {
    const httpOptions2 = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','source':'web' })
    };
    // if (refresh_token && token){
    if (token){
      httpOptions2.headers = httpOptions2.headers.append('Authtoken', token);
      if (this.jwtHelper.isTokenExpired(token)) {
      httpOptions2.headers = httpOptions2.headers.append('refreshtoken', refresh_token);
      }// if (token)
    }
    return this.http.post<any>(url, data, httpOptions2);
  }
/**
 * Refresh token fetcher (link  --> postRequestHandler)
 * @param url 
 * @param data 
 * @param token 
 */
  protected makePostRequest(url, data, token) {
    return this.postRequestHandler(token, localStorage.getItem('refreshtoken'), url, data);
  }

/**
 * Consolidate for post
 * @param url 
 * @param data 
 */
  public _post(url: string, data: any) : Observable<any> {

    url = this.baseUrl + url;
    return this.makePostRequest(url, data, localStorage.getItem('Authtoken')).pipe(tap((response) => {
        if (response['Authentication'] == false && response['invalidToken'] == true) {
          // this.loaderService.stopAll();
          // this.auth.logout();
        }
        if(response['Authtoken']){
          localStorage.setItem('Authtoken',response['Authtoken'])
        }
        if(response['refreshtoken'])
        {
          localStorage.setItem('refreshtoken',response['refreshtoken'])
        }
        return response;
      }),
      // catchError(this.handleError('POST'+ url, { status: false, message: 'Network Error!' }))
      )
    };
/**
 * Refresh token fetcher (link  --> postFileHandler)
 * @param url 
 * @param data 
 * @param token 
 */
protected makeFilePost(url, data, token) {
  return this.postFileHandler(token, localStorage.getItem('refreshtoken'), url, data);
}
/**
 * Post file handler
 * @param token 
 * @param refresh_token 
 * @param url 
 * @param data 
 */
protected postFileHandler(token, refresh_token, url, formData) {
  const httpOptions12 = {
    headers: new HttpHeaders()
  };
  if (refresh_token && token){
    httpOptions12.headers = httpOptions12.headers.append('Authtoken', token);
    if (this.jwtHelper.isTokenExpired(token))
    {
    httpOptions12.headers = httpOptions12.headers.append('refershtoken', refresh_token);
  }// if (token)
  }
  return this.http.post<any>(url, formData, httpOptions12);
}
/**
 * Consolidate for post
 * @param url 
 * @param data 
 */
public _postWithFile(url: string, formData: any) : Observable<any> {
  url = this.baseUrl + url;
  return this.makeFilePost(url, formData, localStorage.getItem('Authtoken')).pipe(tap((response) => {
      if (response['statusCode'] == 'TokenExpired' || response['statusCode'] == 'TokenInvalid') {
        // this.auth.logout();
      }
      return response;
    }),
    // catchError(this.handleError('POST'+ url, { status: false, message: 'Network Error!' }))
    )
  };
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     console.log("API ERROR!")
  //     // this.tostr.error('Unexpected Error!')
      
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }


    

  // public getAddress(lat: any,long:any) {
    
  //     return this.http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+long+','+lat+'.json?access_token='+environment.mapbox.accessToken);
  // }

  // fileEvent(fileInput: any): Promise<any> {
  //   const contentType = fileInput.type;
    
  //   return new Promise((resolve, reject) => {
  //     this.http.post(this.s3_url,fileInput).subscribe((result)=>{
  //       console.log(result)
  //       resolve(result)
  //     })

  //   })
  // }

   /**
   * @param files for passing fildata
   * @param restObj for passing object which has to be pass with form data
   * @param uploadUrl for specifying api url to which the data to be passed
   * 
   */
  // public fileEvent(files): Promise<any> {
  //   console.log(files);
  //   const options = {} as any; // Set any options you like
  //   const formData = new FormData();
  //   formData.append("file", files);
  //   formData.append("imagename",files.name);

  //   return new Promise((resolve, reject) => {
  //     let requestUrl = this.s3_url;
  //     let token = '';
  //       this.http.post(requestUrl, formData )
  //         .subscribe((response: any) => {
  //           if(response.status) {
  //             resolve(response.data);
  //           } else {
  //             reject(response.message);
  //           }
            
  //         }
  //         );
  //     })
  //   }
  
}
