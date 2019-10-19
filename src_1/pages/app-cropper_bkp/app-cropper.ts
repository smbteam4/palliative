import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppSettings } from '../../app/app.settings';
import Cropper from 'cropperjs';
/**
 * Generated class for the AppCropperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-cropper',
  templateUrl: 'app-cropper.html',
})
export class AppCropperPage  implements AfterViewInit{
  
  cropper: any;
  randNumber: number =  Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  imageType: any = this.navParams.get('image_type');
  public baseUrl:string = AppSettings.api_url;
  constructor(public navCtrl: NavController, public navParams: NavParams,) {
    
  }

  ngAfterViewInit() {
    
        let targetImage = document.getElementById("image") as HTMLImageElement;
        targetImage.src = this.navParams.get('fileUrl');
       
        let image = document.getElementById('image');
        console.log(image ,'image');
        this.cropper = new Cropper(targetImage, {
          viewMode: 1,
          zoomable: false,
          zoomOnTouch: false,
          zoomOnWheel: false,
          aspectRatio: this.navParams.get('aspect_ratio')
        });
  
   
  }

  cropImage() {
    // setTimeout(() => {
     
     
      let cropped_image = this.cropper.getCroppedCanvas().toDataURL();
      let new_cropped = cropped_image.split(',')[1];
      let url: string = '', data: any;
        console.log(cropped_image,'croped image')
        

    // }, 200);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppCropperPage');
  }

}
