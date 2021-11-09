// import from ol
import 'ol/ol.css';
import Tile from 'ol/layer/Tile';
import Map from 'ol/Map' ;
import Overlay from 'ol/Overlay';
import { toLonLat } from 'ol/proj.js';
import { fromLonLat } from 'ol/proj.js';
import View from 'ol/View';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ';
import BingMaps from 'ol/source/BingMaps';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Icon, Stroke, Style } from 'ol/style';

//import from angular
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';


//import from local
import { WaypointService } from '../services/waypoint.service';
import { MavlinkService } from '../services/mavlink.service';
import { FlightDataService } from '../services/flight-data.service';
import { ObjectWaypoint } from '../models/waypoint';
import LineString from 'ol/geom/LineString';
import { WebSocketService } from '../services/web-socket.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input("isMap") public isMap: any;



  public map: Map | undefined;
  constructor(private waypointService: WaypointService,
    private MavlinkService: MavlinkService,
    private flightDataService: FlightDataService,
    private websocketService : WebSocketService) {
      this.MavlinkService.Init()
     }

  ngOnInit(): void {
    this.initmap(this.waypointService, this.MavlinkService, this.flightDataService,this.isMap);
  }
  initmap(waypointService:any, MavlinkService:any, flightDataService:any,OnMission:any) {
    console.log("calling initmap");
    var lenAwal = -1; //buar pas diinisialisasi dia pasti salah dan masuk ke refresh mission

    //untuk icon pesawat
    var planeFeature = new Feature({
      geometry : new Point(fromLonLat([107.5721, -6.9823]))
    });

    planeFeature.setStyle(new Style({
      image : new Icon(({
        src: 'assets/plane.svg',
        imgSize: [600, 600],
        scale: 0.1,
        rotation : MavlinkService.getyaw()
      }))
    }));

    var planeSource = new VectorSource({
      features: [planeFeature]
    });

    var planeLayer = new VectorLayer({
      source : planeSource
    });

    //untuk waypoint
    var wpFeature:any = []
    var waypointSource = new VectorSource({
      features : wpFeature
    });

    var waypointLayer = new VectorLayer({
      source : waypointSource
    });

    //untuk line antar waypoint
    var lineFeature:any = []
    var lineSource = new VectorSource({
      features : lineFeature
    });

    var lineLayer = new VectorLayer({
      source : lineSource
    });


    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new BingMaps({
            key : 'AvVs4gAIu8ElkHO0rJ8kMyBr4I-dpi5JuAibjlzz_jq3wJsKRzAuMbgdrbOC4hO8',
            imagerySet: 'AerialWithLabelsOnDemand'
          // source: new OSM()
          // source: new XYZ({
          //   //google map: satelite
          //   url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
          //   //google map: roadmap
          //   // url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'
          })

        }),
        planeLayer,
        lineLayer,
        waypointLayer
        //MapLayer
      ],
      view: new View({
        center:fromLonLat([107.5721,-6.9823]),
        zoom: 15,
        enableRotation: false
      })

    });
    this.map.on('singleclick', function (evt){
      if (OnMission){
        var Coordinate = toLonLat(evt.coordinate); //coordinate openlayer to coordinate
        var longitude = Coordinate[0];
        var latitude = Coordinate[1];

        /* CODINGAN AFIF */
        // Kumpulin kordinat nanti baru dikirim lewat fungsi collectWaypoint
        //collectionCordinate.push({latitude, longitude});
        /* ------------- */
        //console.log(collectionCordinate);
        waypointService.add(new ObjectWaypoint('Waypoint',longitude,latitude,100,'Relative',false)); // nambah wp ke service
        //refreshMission()
      }
    })

    setInterval(function refreshPlane() {
      //console.log("getmission : ",flightDataService.getMission())
      planeSource.clear()
      var temp_planeFeature = new Feature({
        // geometry : new Point(fromLonLat(MavlinkService.getCoordinate()))//masi pake data dummy
        geometry : new Point(fromLonLat(MavlinkService.getCoordinate()))//masi pake data dummy
      });

      temp_planeFeature.setStyle(new Style({
          image : new Icon(({
          src: 'assets/plane.svg',
          imgSize: [600, 600],
          scale: 0.1,
          // rotation : flightDataService.getFlightRecords().yaw
          rotation: MavlinkService.getyaw()
        }))
      }));
      planeSource.addFeature(temp_planeFeature)
      //cek misi beda atau ngga
        if (!(lenAwal == waypointService.getCoordinateArray().length)){
          //console.log("refreshing Mission")
          refreshMission()
        }
      lenAwal = waypointService.getCoordinateArray().length
    },100)


    function refreshMission() {

      var len = waypointService.getCoordinateArray().length;
      for(var i = 0; i< len; i++){
        //console.log(waypointService.getCoordinateArray()[i])
        var temp_waypoint = new Feature({
          geometry : new Point(fromLonLat(waypointService.getCoordinateArray()[i]))
        }); // bikin feature baru dengan wp dari service
        temp_waypoint.setStyle(new Style({
          image : new Icon(({
          color: '#00FF2B',
          crossOrigin: 'anonymous',
          src: 'assets/vectorpoint.svg',
          imgSize: [50, 50],
          scale : 0.5
          }))
        })); //style wp nya

        wpFeature.push(
          temp_waypoint
        );//push feature ke list feature
      };
      if (len > 1){ //cek dulu apakah sudah ada lebih dari 1 wp
        for (var j = 1 ; j < len; j++){
          //console.log('j',j)
            var lineCoordinate1 = fromLonLat(waypointService.getCoordinateArray()[j-1])
            //var lineCoordinate1 = fromLonLat([107.57358558756334, -6.9793586630298705])
            var lineCoordinate2 = fromLonLat(waypointService.getCoordinateArray()[j])
            //var line = new LineString([lineCoordinate1,lineCoordinate2])
            //console.log('make a line between',lineCoordinate1,lineCoordinate2)
            var line = new LineString(
              [lineCoordinate1,lineCoordinate2]
            )
            var templineFeature = new Feature({
              geometry : line
            });
            templineFeature.setStyle(
              new Style({
                stroke: new Stroke({
                  color: '#00FF2B',
                  width: 3
                })
              })
            );
            //console.log("templineFeature",templineFeature)
            lineFeature.push(
              templineFeature
            );
            //console.log("lineFeature",lineFeature)
            //bikin arrow
            var arrowCoordinate = [lineCoordinate1[0] + (lineCoordinate2[0] - lineCoordinate1[0])/2,lineCoordinate1[1] + (lineCoordinate2[1] - lineCoordinate1[1])/2]
            var arrow = new Point(arrowCoordinate)
            var arrowFeature = new Feature({
              geometry : arrow
            })
            arrowFeature.setStyle(new Style({
              image : new Icon(({
              color: '#00FF2B',
              crossOrigin: 'anonymous',
              src: 'assets/arrow1.svg',
              imgSize: [400, 300],
              scale : 0.07,
              rotation : Math.atan2((lineCoordinate2[0] - lineCoordinate1[0]),(lineCoordinate2[1] - lineCoordinate1[1]))
              }))
            }));
            lineFeature.push(
              arrowFeature
            );
          };
      }

      //refresh source line
      lineSource.clear()

      lineSource.addFeatures(lineFeature)
      lineFeature = []

      //refresh source wp
      waypointSource.clear();

      waypointSource.addFeatures(wpFeature);
      wpFeature = [];
    };
  }
}

