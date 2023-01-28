// @ts-nocheck
import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpEventType } from "@angular/common/http";
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  
  constructor(private http: HttpClient) { }

  //user: Array<Playlist> = null;
  ngOnInit(): void {
    /*let options = new RequestOptions({ headers: headers, withCredentials: true });
  this.http.get("http://localhost:5000/user/account",options).subscribe((data) => {
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
        });*/
          document.getElementById("username").value = "hh" ;
          document.getElementById("email").value = "hh";
          document.getElementById("genre").value = "jj";
      //});
  }


}
