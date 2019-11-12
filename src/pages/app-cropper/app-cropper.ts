import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
//import Cropper from 'cropperjs';





@IonicPage()
@Component({
  selector: 'page-app-cropper',
  templateUrl: 'app-cropper.html',
})
export class AppCropperPage implements AfterViewInit  {

  cropper: any;
  randNumber: number =  Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  imageType: any = this.navParams.get('image_type');

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public events: Events ) {
    
  }

  ngAfterViewInit() {
    
        let targetImage = document.getElementById("image") as HTMLImageElement;
        targetImage.src = this.navParams.get('fileUrl');
       
        let image = document.getElementById('image')as HTMLImageElement;
       
        // this.cropper = new Cropper(image, {
        //   viewMode: 1,
        //   zoomable: false,
        //   zoomOnTouch: false,
        //   zoomOnWheel: false,
        //   aspectRatio: this.navParams.get('aspect_ratio')
        // });
       // console.log(this.cropper);
  
   
  }

  cropImage() {
    setTimeout(() => {
     
      let cropped_image = this.cropper.getCroppedCanvas().toDataURL();
      let new_cropped = cropped_image.split(',')[1];
      let url: string = '', data: any;
       

    }, 200);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppCropperPage');
  }

}