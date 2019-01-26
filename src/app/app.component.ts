import { Component } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'insider-image-portal';
  uploadNew: boolean = false;
  data: any;
  cropperSettings: CropperSettings;

  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.showCenterMarker = false;

    this.data = {};
  }

  onFileChosen(e) {
    window.URL = window.URL;
    // Get input file
    var file = (<HTMLInputElement>document.getElementById("fileInput"));

    if (file && file.files.length > 0) {
      var img = new Image();

      // assign url to image
      img.src = window.URL.createObjectURL( file.files[0] );
      img.onload = function() {
          var width = img.naturalWidth,
              height = img.naturalHeight;

        console.log ("Image Width: " + width);
        console.log ("Image Height: " +height);
        if(width == 1024 && height == 1024) {
          AppComponent.generateSeperatedImages();
        } else {
          console.log("NO WRONG MEASUREMENTS");
        }
      };
    }
  }

  /* Life cycle methods of our own? to render onInit and onChange */


  // Static method to render All previews once
  static generateSeperatedImages() {
    //crop images from (0,0) and paste in each div
    var input = $('#fileInput')[0];
    AppComponent.previewImage(input);

    //Also fill into some DS...the object to be posted to cloud

  }

  static previewImage(input) {

    console.log(input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#mainPreview')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
  }
}
