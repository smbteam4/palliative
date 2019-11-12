import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform , ActionSheetController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { AppPluginProvider } from '../../providers/app-plugin/app-plugin';
import { Crop } from '@ionic-native/crop';
import { AppSettings } from '../../app/app.settings'
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { AppCropperPage } from '../app-cropper/app-cropper'
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public profile_Details:any;
  public profileForm:FormGroup;
  public image:any;
  public baseUrl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder,  public apiProvider:ApiProvider, public AppPluginProvider:AppPluginProvider, private crop: Crop,public platform:Platform,public actionSheetCtrl: ActionSheetController) {
    this.profile_Details = JSON.parse(localStorage.getItem('user'));
    this.baseUrl = AppSettings.api_url;
    this.profileForm = fb.group({
      first_name:['',Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        last_name: ['', Validators.required]
        // age: ['value', *validation function goes here*, *asynchronous validation function goes here*]
    });
    this.image = '';

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
    this.setProfile();
  }

  setProfile(){
    this.profileForm.patchValue({
      first_name:this.profile_Details.first_name,
      last_name:this.profile_Details.last_name,
      email:this.profile_Details.email
    })
  }


  updateProfile(){
    // console.log(this.profileForm.valid,'validddddddddddddddd');
   
    if(this.image == '') {
     
      if(this.profileForm.valid){
        this.apiProvider.showLoader();
        this.apiProvider.common_post_withToken('saveUser',this.profileForm.value).subscribe((result)=>{
          if(result.body.status == true) {
            this.image = '';
            // this.profile_Details.profileImage = result.body.prof_image;
            this.profile_Details.first_name = this.profileForm.value.first_name;
            this.profile_Details.last_name =this.profileForm.value.last_name;
            this.profile_Details.email = this.profileForm.value.email;
            localStorage.setItem('user',JSON.stringify(this.profile_Details));
            this.apiProvider.hideLoader();
            this.apiProvider.showLongToast(result.body.message);
           
          } else {
            this.apiProvider.hideLoader();
            this.apiProvider.showLongToast(result.body.message);
          }
        })
      }
    } else {
      
      if(this.profileForm.valid){
        let data = {
          prof_image:this.image,
          email:this.profileForm.value.email,
          first_name:this.profileForm.value.first_name,
          last_name:this.profileForm.value.last_name
        }
        this.apiProvider.showLoader();
        this.apiProvider.common_post_withToken('saveUser',data).subscribe((result)=>{
          if(result.body.status == true) {
            this.image = '';
            this.profile_Details.profileImage = result.body.prof_image;
            this.profile_Details.first_name = data.first_name;
            this.profile_Details.last_name = data.last_name;
            this.profile_Details.email = data.email;
            localStorage.setItem('user',JSON.stringify(this.profile_Details));
            this.apiProvider.hideLoader();
            this.apiProvider.showLongToast(result.body.message);
          } else {
            this.apiProvider.hideLoader();
            this.apiProvider.showLongToast(result.body.message);
          }
      })
      }
      
    }
   
  }

  editPic() {
    // this.AppPluginProvider.showActionSheet()
    // .then((sheetIndex: number)=> this.actionSheetSuccess(sheetIndex))
    // .catch((error)=> this.actionError(error));
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Source',
      buttons: [
        {
          text: 'Open Gallery',
          icon:'md-images',
          handler: () => {
            this.actionSheetSuccess(2);
          }
        },{
          text: 'Camera',
          icon:'md-camera',
          handler: () => {
            this.actionSheetSuccess(1);
          }
        },{
          text: 'Cancel',
          role: 'destructive',
          icon:'md-close-circle',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  actionError(err){
    console.log(err);
    this.apiProvider.hideLoader();
  }

  actionSheetSuccess(sheetIndex: number){ 
    this.apiProvider.showLoader();   
    this.AppPluginProvider.getImage(sheetIndex)
    .then((fileUrl)=>this.imageCaptureSuccess(fileUrl))
    .catch((error)=> this.actionError(error));
  }

  imageCaptureSuccess(fileUrl){
    // console.log(fileUrl,'dddddddddddddddddddddddddddd')
    let dataUrl = 'data:image/jpeg;base64,'+ fileUrl;
    this.image = dataUrl;
    this.profile_Details.profileImage= dataUrl;
    this.apiProvider.hideLoader();
    // this.apiProvider.common_post_withToken()
    // console.log(dataUrl,'dataurlllllllllllllllllllllllllllllll');
    // let dataUrl = 'data:image/jpeg;base64,'+ fileUrl;
    // let aspect_ratio= 16 / 10;
    //   if(this.platform.is('android') || this.platform.is('ios') ){
    //     // setTimeout(() =>{
    //       this.navCtrl.push(AppCropperPage, {fileUrl: dataUrl,aspect_ratio: aspect_ratio});
    //     // },10)
        
    //   }
  }
  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
}
