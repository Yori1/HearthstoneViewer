import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  @ViewChild("tref", {read: ElementRef, static: true}) tref: ElementRef;
  @ViewChild("canvasRef", {read: ElementRef, static: true}) canvasRef: ElementRef;
  @ViewChild("videoRef", {read: ElementRef, static: true}) videoRef: ElementRef;
  @ViewChild("imageRef", {read: ElementRef, static: true}) imageRef: ElementRef;

  constructor() { }

  hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }



  ngOnInit() {
    if (this.hasGetUserMedia()) {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).
  then((stream) => {
      this.videoRef.nativeElement.srcObject = stream});
      this.videoRef.nativeElement.width = 300;
    } else {
      alert('Either getUserMedia() is not supported by your browser, or you accessed the site using http. Try putting https before the url instead of http.');
    }


  }

  drawImage() {
    this.canvasRef.nativeElement.width = this.videoRef.nativeElement.videoWidth;
  this.canvasRef.nativeElement.height = this.videoRef.nativeElement.videoHeight;
  this.canvasRef.nativeElement.getContext('2d').drawImage(this.videoRef.nativeElement, 0, 0);
  // Other browsers will fall back to image/png
  this.imageRef.nativeElement.src = this.canvasRef.nativeElement.toDataURL('image/webp');
  this.imageRef.nativeElement.width = this.videoRef.nativeElement.width;
  }


}
