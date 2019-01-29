import { Component,ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings, ImageCropper } from "ngx-img-cropper";

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cropperSettings: CropperSettings;
  data:any;
  parentImage: any;
  imagePath: string;

  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;

  constructor() {
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.canvasWidth = 1024;
      this.cropperSettings.canvasHeight = 1024;
      this.cropperSettings.showCenterMarker = true;
      this.cropperSettings.preserveSize = true;
      this.cropperSettings.noFileInput = true;
      this.data = {};
  }

  fileChangeListener($event) {
      var image:any = new Image();
      var file:File = $event.target.files[0];
      var myReader:FileReader = new FileReader();
      var that = this;
      myReader.onloadend = function (loadEvent:any) {
          image.src = loadEvent.target.result;
          that.parentImage = image;
          that.cropper.setImage(image);
      };
      myReader.readAsDataURL(file);
  }

  onEditClicked() {
    // this.cropper.imageSet.emit(false);
    this.cropperSettings.width = 750;
    this.cropperSettings.height = 600;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropper.cropper = new ImageCropper(this.cropperSettings);
    this.cropper.cropper.prepare(this.cropper.cropcanvas.nativeElement);
    this.cropper.setImage(this.parentImage);
  }

  onImageCrop() {
    this.imagePath = this.data.image;
    console.log(this.imagePath);
  }
}
