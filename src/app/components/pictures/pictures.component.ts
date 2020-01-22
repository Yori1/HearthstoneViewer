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
      console.log(this.tref.nativeElement.textContent);
    } else {
      alert('getUserMedia() is not supported by your browser');
    }

    this.canvasRef.nativeElement.width=50;
  }


}
