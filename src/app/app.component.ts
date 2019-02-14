import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {TrackEmployeeService} from './track-employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public employee = {
    name: '',
    image: {}
  }
  public showWebcam = true;
  public reset = true;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(private service: TrackEmployeeService) {};
  title = 'employee-tracker';

  ngOnInit() {
  }

  public triggerSnapshot(event): void {
    this.trigger.next(); 
    event.preventDefault();
    this.service.sendImage(this.employee)
    .subscribe(
      data => {
        console.log("sdsadasdsadsadsa")
      }
    )
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.employee.image = this.webcamImage;
  }

  public trackEmployee(type) {
    this.reset = false;
    if (type == 'record') {
      this.service.trackEmployee(this.employee.name)
      .subscribe(
        data => {
          window.location.href = '../../CamSight/output.avi';
          window.location.href = '../../CamSight/Frame.jpg';
          this.reset = true;
        }
      )
    } else if (type == 'stream') {
      this.service.streamVideo()
      .subscribe(
        data => {
          this.reset = true;
        }
      )
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
