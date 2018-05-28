import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChildren, QueryList } from '@angular/core';
import { Message } from "../../../app/classes/Message";
//---------------------------------
import { Platform, ToastController } from "ionic-angular";
import { CaptureError, MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { MapfreService } from '../../../services/mapfre.service';
import { ExternalsService } from "../../../services/externals.service";
import { ParteService } from "../../../services/parte.service";
import { ContextGateController } from "../../../services/context-gate-controller.service";

/**
 * Generated class for the MessageVideoIntentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-video-intent',
  templateUrl: 'message-video-intent.template.html'
})
export class MessageVideoIntentComponent implements OnInit {

  @ViewChildren('videoOutput') videoOuts: QueryList<any>;

  @Input() public message: Message;

  //This will emit the cancel event that will block the input in case we want it to happen
  @Output() private blockInput: EventEmitter<Object> = new EventEmitter(true);

  private fileName: string;
  private filePath: string;
  private isAllDone: boolean = false;
  private playing: boolean = false;
  private recording: boolean = false;
  public videoRetrieved: boolean = false;
  private locked: boolean;
  private fileURL: string;

  private mediaFile:MediaFile[];

  constructor(
    public toast:ToastController,
    private platform:Platform,
    private mediaCapture: MediaCapture,
    private storage: Storage,
    private file: File,
    private media: Media,
    private gate:ContextGateController,
    private parte:ParteService,
    private mapfre: MapfreService,
    private externals: ExternalsService
  ) { }

  ngOnInit(): void {
    this.toggleLock();
  }

  ngAfterViewInit(): void {
    this.videoOuts.changes.subscribe(videos => {
      if (this.fileName) {
        videos.toArray().forEach(element => {
          // For mock work
          const dataDirectory = this.file.dataDirectory || 'assets/Camera/';
          let path = dataDirectory + this.fileName;
          let url = path.replace(/^file:\/\//, '');
          let video = element.nativeElement;
          video.src = url;
        });
      }
    });
  }

  public getVideo() {
    this.recording = true;
    this.mediaCapture.captureVideo().then((data: MediaFile[]) => {
      this.mediaFile = data;
      let capturedFile = this.mediaFile[0];
      this.fileName = capturedFile.name;
      let dir = capturedFile['localURL'].split('/');
      dir.pop();
      let fromDirectory = dir.join('/');
      this.filePath = this.file.dataDirectory;

      this.file.copyFile(fromDirectory , this.fileName , this.filePath , this.fileName).then((res) => {
        this.recording = false;
        this.videoRetrieved = true;
      },err => {
        console.log('err: ', err);
      });
          },
    (err: CaptureError) => console.error(err));
  }

  public toggleLock() {
    this.locked = !this.locked;
    this.blockInput.emit({ lock: this.locked });
  }

  public repeatVideo(){
    this.videoRetrieved = false;
  }

  public presentToast(m: string, position: string, duration: number) {
    let toast = this.toast.create({
      message: m,
      duration: duration,
      position: position
    });

    toast.present();
  }

  sendVideo() {
    // this.parte.url_videoAccidente = this.fileURL;
    // this.parte.path_videoAccidente = this.filePath;
    this.isAllDone = true;
    this.toggleLock();
    this.presentToast('Video Enviado...', 'bottom' ,1000);
  }
}
