import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { Camera, CameraOptions } from '@ionic-native/camera';
/*
  Generated class for the AppPluginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppPluginProvider {
  actionSheetOptons: ActionSheetOptions = {
    title: "Choose your action",
    buttonLabels: ['Photo', "Gallery"],
    addCancelButtonWithLabel: 'Cancel',
    androidTheme: 1
  };
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    allowEdit: true,
    correctOrientation: true,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth:100,
    targetHeight:100
  }
  constructor(public http: HttpClient,private actionSheet: ActionSheet, private camera: Camera) {
    // console.log('Hello AppPluginProvider Provider');
  }

  showActionSheet(){
    let promise = this.actionSheet.show(this.actionSheetOptons);
    return promise;
  }

  hideActionSheet(){
    return this.actionSheet.hide();
  }


  getImage(sheetIndex) { 

    if(sheetIndex == 1) this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;

    if(sheetIndex == 2) this.cameraOptions.sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;

    return this.camera.getPicture(this.cameraOptions)
  }

}
