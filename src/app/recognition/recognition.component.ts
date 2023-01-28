// @ts-nocheck

import { Component, ViewChild, ElementRef } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Playlist } from "../playlist";
import { Mood } from "../mood";
@Component({
  selector: "app-recognition",
  templateUrl: "./recognition.component.html",
  styleUrls: ["./recognition.component.scss"],
})
export class RecognitionComponent {
  constructor(private http: HttpClient) { }

  url = "../../assets/face-id-glitch.gif";

  selectedFile: File = null;
  filebase64: string = null;
  mood: string = null;
  playlists: Array<Playlist> = {};
  //pour tester j'ai essayé d'initialiser la playlist
  // playlists = [
  //   new Playlist(
  //     1,
  //     "titre1",
  //     Mood,
  //     "playlist/6Fbvmc7cfthnhhPq68a09E",
  //     "ee",
  //     "genre1"
  //   ),
  //   new Playlist(
  //     2,
  //     "titre2",
  //     Mood,
  //     "playlist/37i9dQZF1DXa9wYJr1oMFq",
  //     "ee",
  //     "genre2"
  //   ),
  //   new Playlist(
  //     3,
  //     "titre3",
  //     Mood,
  //     "playlist/6Fbvmc7cfthnhhPq68a09E",
  //     "ee",
  //     "genre3"
  //   ),
  // ];
  playlist: Array<Playlist> = null;
  indiceplaylist: int = 0;
  totalplaylist: int = 0;

  camera: boolean;
  WIDTH = 420;
  HEIGHT = 290;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  error: any;

  isCaptured: boolean;
  // button upload photo pour selectionner une photo qui existe dans le systeme
  onselectFile(e) {
    this.filebase64 = null;
    this.camera = false;
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.selectedFile = e.target.files[0];
        this.url = event.target.result;
        this.filebase64 = reader.result.substring(23);
      };
    }
  }

  //pour envoyer la photo au backend (button recognition)
  onUpload() {
    const fd = {
      image: this.filebase64,
    };
    this.http
      .post("http://localhost:5000/mood/rec", fd, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(
            "upload progress :" +
            Math.round(event.loaded / event.total) * 100 +
            "%"
          );
        } else if (event.type === HttpEventType.Response) {
          this.mood = event.body.detectedMood;
          //document.getElementById("result").innerHTML = this.mood;
          console.log(this.mood);
          switch (this.mood) {
            case 'happy':
              this.url = "../../assets/happy.jpg";
              break;
            case 'sad':
              this.url = "../../assets/sad.jpg";
              break;
            case 'neutral':
              this.url = "../../assets/neutral.jpg";
              break;
            case 'angry':
              this.url = "../../assets/angry.jpg";
              break;
            case 'disgusted':
              this.url = "../../assets/disgusted.jpg";
              break;
            case 'fearful':
              this.url = "../../assets/fearful.jpg";
              break;
            case 'surprised':
              this.url = "../../assets/surprised.jpg";
              break;
            default:
              this.url = "../../assets/noface.jpg";
              break;
          }
        }
      });



  }
  //pour demander l'accées au camera (button open camera)
  async setupDevices() {
    //this.opencam= false;

    this.camera = true;
    this.isCaptured = false;
    this.filebase64 = null;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }
  //pour prendre une capture d'ecran
  capture() {
    //this.opencam=true;
    this.camera = true;
    this.drawImageToCanvas(this.video.nativeElement);
    this.filebase64 = this.canvas.nativeElement.toDataURL("image/jpeg").split(";base64,")[1];
    this.isCaptured = true;
    //setTimeout(() => (this.isCaptured = false), 1000);
  }

  removecurrent() {
    this.isCaptured = false;
    this.camera=false;
    this.url="../../assets/face-id-glitch.gif";
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  // pour approver le resultat
  onResult() {
    this.http
      .get("http://localhost:5000/music/rec/" + this.mood)
      .subscribe((data) => {
        console.log(data.playlists);
        this.playlists = data.playlists.map((playlist: Playlist) => {
          new Playlist(
            playlist.id,
            playlist.title,
            new Mood(
              playlist.mood.id,
              playlist.mood.title,
              playlist.mood.description
            ),
            playlist.uri,
            playlist.description,
            playlist.genre.title
          );
        });
        this.playlists = data.playlists;
        this.indiceplaylist = 0;
        console.log(this.playlists);
        this.totalplaylist = this.playlists.length;
        document.getElementById("idgenre").innerHTML =
          this.playlists[this.indiceplaylist].genre.title;
        document.getElementById("idtitle").innerHTML =
          this.playlists[this.indiceplaylist].title;
        document.getElementById("spotifyurl").src =
          "https://open.spotify.com/embed/" +
          this.playlists[this.indiceplaylist].uri;
        console.log(document.getElementById("spotifyurl").src);
      });
  }

  nextlist() {
    if (this.indiceplaylist < this.totalplaylist) {
      //send data to html
      this.indiceplaylist = (this.indiceplaylist + 1) % this.playlists.length;
      document.getElementById("idgenre").innerHTML =
        this.playlists[this.indiceplaylist].genre.title;
      document.getElementById("idtitle").innerHTML =
        this.playlists[this.indiceplaylist].title;
      document.getElementById("spotifyurl").src =
        "https://open.spotify.com/embed/" +
        this.playlists[this.indiceplaylist].uri;
    }
  }
  backlist() {
    //if (this.indiceplaylist-1 < 0) {
    //send data to html
    this.indiceplaylist--;
    document.getElementById("idgenre").innerHTML =
      this.playlists[this.indiceplaylist].genre.substring();
    document.getElementById("idtitle").innerHTML =
      this.playlists[this.indiceplaylist].title.substring();
    document.getElementById("spotifyurl").src =
      "https://open.spotify.com/embed/" +
      this.playlists[this.indiceplaylist].uri;
    //}
  }
}
