import { Component, OnInit } from '@angular/core';
import { WaypointService } from '../services/waypoint.service';
import { ObjectWaypoint } from '../models/waypoint';

@Component({
  selector: 'app-waypoint-editor',
  templateUrl: './waypoint-editor.component.html',
  styleUrls: ['./waypoint-editor.component.css']
})
export class WaypointEditorComponent implements OnInit {

  waypoints: ObjectWaypoint[] = [];
  waypoint!: ObjectWaypoint;
  Command: string = '';
  longitude: number = 0;
  latitude: number = 0;
  altitude: number = 0;
  frame: string = '';
  home: boolean = false;

  constructor(private waypointService : WaypointService) { }

  ngOnInit(): void {
    this.getWaypoints();
  }

  getWaypoints(){
    this.waypointService.getWaypoints()
      .subscribe(waypoints =>
        this.waypoints = waypoints);
  }

}
