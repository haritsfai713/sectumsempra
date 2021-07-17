import 'ol/ol.css';
import Tile from 'ol/layer/Tile';
import Map from 'ol/Map' ;
import Overlay from 'ol/Overlay';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import {Icon} from 'ol/style';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public map: Map | undefined;
  constructor() { }

  ngOnInit(): void {
    this.initmap();
  }
  initmap() {
    console.log("calling initmap");
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
        //MapLayer
      ],
      view: new View({
        center:fromLonLat([107.5721,-6.9823]),
        zoom: 7,
        enableRotation: false
      })

    });
  }
}

