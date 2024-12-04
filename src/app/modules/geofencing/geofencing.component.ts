import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FeatureGroup, featureGroup } from 'leaflet';
import * as L from 'leaflet';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { ToastService } from 'app/services';
import { MatDialog } from '@angular/material/dialog';
import { AddPolygonDialogComponent } from './add-polygon-dialog/add-polygon-dialog.component';
import { GeofencingService } from 'app/core/services/geofencing.service';
import { AddEntityComponent } from './add-entity/add-entity.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-geofencing',
  templateUrl: './geofencing.component.html',
  styleUrls: ['./geofencing.component.css'],
})
export class GeofencingComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;

  public constructor(
    private store: Store<AppState>, private toast : ToastService, public dialog: MatDialog,
    private geofencingService: GeofencingService,
    public permissionService: PermissionService
    ) { }
  style = {
    'hover': {
      'color': 'white',
      'background': '#138742'
    }
  }
  cities: any = [];
  zones: any = [];
  sectors: any = [];
  filter: FormGroup;
  addZoneDisabled = true;
  addSectorDisabled = true;
  zoneDisabled = true;
  sectorDisabled = true;
  mapDisabled = true;
  showSaveBtn = false;
  disableMap = false;
  polygons: any = [];
  selectedCity: any;
  selectedZone: any;
  selectedSector: any;
  polygonsToApi: any = {
    'CITY': {},
    'ZONE': {},
    'SECTOR': {},
  };
  editedPolygons: any = [];
  newLayers: any = [];
  drawnItems: FeatureGroup = featureGroup();
  map: L.Map;
  drawOptions = {
    position: 'topright',
    draw: {
      marker: {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl:
          'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
          iconRetinaUrl:
          'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
          shadowUrl:
          'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png',
        }),
      },
      polyline: false,
      circle: false,
      circlemarker: false,
      rectangle: false,
    },
    edit: {
      featureGroup: this.drawnItems,
    },
  };

  baseLayers = {
    'Classique': L.tileLayer('https://mt.google.com/vt/lyrs=m&gl=ma&x={x}&y={y}&z={z}', {
                            attribution: 'Google Maps'
                          }),
    'Hybride': L.tileLayer('https://mt.google.com/vt/lyrs=y&gl=ma&x={x}&y={y}&z={z}', {
                            attribution: 'Google Maps'
                          }),
  }

  options = {
    layers: [
      L.tileLayer(
        // h = roads only
        // m = standard roadmap
        // p = terrain
        // r = somehow altered roadmap
        // s = satellite only
        // t = terrain only
        // y = hybrid
        'https://mt.google.com/vt/lyrs=m&gl=ma&x={x}&y={y}&z={z}',
        // 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png',
        {
          // maxZoom: 18,
          attribution: 'Google Maps',
        }
        ),
      ],
      zoom: 9,
      center: L.latLng(33.573, -7.639),
    };

    ngOnInit(): void {
      this.setForm();
      this.store.select(selectAllCity).subscribe((res) => {
        this.cities = JSON.parse(JSON.stringify(res));
        console.log(' cities========>', this.cities);
      });
    }

    setForm() {
      this.filter = new FormGroup({
        city_id: new FormControl('', Validators.required),
        zone_id: new FormControl('', Validators.required),
        sector_id: new FormControl('', Validators.required),
      });
    }


    async drawCityPolygons():Promise<boolean>{
      return new Promise((resolve, reject) => {
        if(this.selectedCity.polygons){
          this.selectedCity.polygons.coordinates.forEach((element, index) => {
            this.addPolygonToDrawnItems('CITY', element, index, '#FFA500', this.selectedCity.name, this.selectedCity.id, null, 'city-'+this.selectedCity.id.toString(), index)
          });
        }
        this.addZoneDisabled = false;
        this.zoneDisabled = false;
        if(this.zones.length){
          this.zones.forEach(zone => {
            if(zone.polygons){
                this.selectedZone = zone
                zone.polygons.coordinates.forEach((element, index) => {
                this.addPolygonToDrawnItems('ZONE', element, index, '#3388ff', zone.name, this.selectedCity.id, zone.id, 'zone-'+zone.id.toString(), index)
              });
            }
          });
        }
        this.selectedZone = null;
        this.selectedSector = null;
        resolve(true);

        });
    }

    onMapReady(map: L.Map) {
        this.map = map;
        L.control.layers(this.baseLayers, null, {collapsed: false,position: 'bottomleft'}).addTo(this.map);
        this.map.off('zoomend')
        setTimeout(() => {
          this.hideShowDrawControl(), 2000
        }, 100)
    }

    hideShowDrawControl(){
      let toolbarElement = document.getElementsByClassName("leaflet-draw")[0] as HTMLElement || null;
      if(!this.selectedCity && !this.selectedZone){
        if(toolbarElement) toolbarElement.style.display = "none";
        return false;
      }
      if((this.selectedCity && this.selectedZone) || (this.selectedCity && !this.selectedZone)){
        if(toolbarElement) toolbarElement.style.display = "inherit";
        return true;
      }
    }

    initZonesPolygon(){
      this.drawnItems.clearLayers()
      this.polygons.forEach(p => {
        this.drawnItems.addLayer(p.polygon);
      });
    }

    addPolygonToDrawnItems(entity, coordinates, i, color, title, city_id, zone_id = null, className, index = 0, isNew = '0'){

        let polygon = new L.Polygon(coordinates, {color: color, className: className});
        let id = entity+'-'+(index+1).toString()+'-'+isNew;
        this.drawnItems.addLayer(new L.Polygon(coordinates, {color: color, className: className}).bindTooltip(title, {permanent: false, direction:"center"}))
       this.drawnItems.getLayers()[this.drawnItems.getLayers().length - 1]['id'] = id;

        this.searchPolygon(polygon, entity, false, index);
        return polygon;
    }
    addMarkerToDrawnItems(coordinates){
      let marker = new L.Marker(coordinates)
      this.drawnItems.addLayer(marker)
      return marker;
    }

    openDialogForPolygon(polygon, city, polygon_coordinates){
      const dialogRef = this.dialog.open(AddPolygonDialogComponent, {
        width: '811px',
        data: {
          type : (city.polygon) ? 'ZONE' : 'CITY',
          city_name: city.name,
          zones: this.zones
        } ,
      });
      dialogRef.afterClosed().subscribe((data) => {
        if(data == "CLOSE")
          this.drawnItems.removeLayer(polygon)
        else{
          this.geofencingService.addPolygon(this.polygonObjectToApi(polygon_coordinates, data)).subscribe(res => {
            if(res.success){
              this.toast.success('Polygon bien ajouté', 1500)
              this.cities.find(c => c.id == res.response.id).polygon = res.response.polygon
            }
          })
        }
      });
    }

    openDialogForMarker(marker, city, marker_coordinates){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '811px',
        data: {
          type: 'MARKER',
          city_name: city.name,
        } ,
      });
      dialogRef.afterClosed().subscribe((data) => {
        if(data == "CLOSE")
          this.drawnItems.removeLayer(marker)
        else{
          this.geofencingService.addCentre(this.markerObjectToApi(marker_coordinates, data)).subscribe(res => {
            if(res.success) this.toast.success('la ville est bien positioneé', 1500)
            this.cities.find(c => c.id == res.response.id).centre = res.response.centre
            this.addZoneDisabled = false;
            this.zoneDisabled = false;
          })
        }
      });
    }

    polygonObjectToApi(polygon_coordinates, data){
      return {
        type: (data.zoneOrCity == 'CITY') ? 'CITY' : 'ZONE',
        polygon: polygon_coordinates[0],
        id: (data.zoneOrCity == 'CITY') ? this.selectedCity.id : data.zone_id,
        name: data.zone_name,
        code: data.zone_code,
        city_id: this.selectedCity.id,
        typeRequest: data.typeRequest
      }
    }
    markerObjectToApi(marker_coordinates, data){
      return {
        marker: marker_coordinates,
        id: this.selectedCity.id,
      }
    }


    isMarkerInsidePolygons(marker, polygons) {
      var inside = false;
      var x = marker.getLatLng().lat, y = marker.getLatLng().lng;
      polygons.forEach(poly => {
        for (var ii=0;ii<poly.getLatLngs().length;ii++){
          var polyPoints = poly.getLatLngs()[ii];
          for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
              var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
              var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

              var intersect = ((yi > y) != (yj > y))
                  && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
              if (intersect) inside = !inside;
          }
      }
      });
      if(!inside){
        this.toast.error('Merci de positionner le centre dedans le polygon', 2000)
        this.drawnItems.removeLayer(marker)
      }

      return inside;
    };

    isPolygonInsidePolygonForDelete(innerPolygon, outerPolygon){
      let inside = false;
      let innerGeoJSON = L.geoJSON(innerPolygon.toGeoJSON());
          let outerGeoJSON = L.geoJSON(outerPolygon.toGeoJSON());
          if (outerGeoJSON.getBounds().contains(innerGeoJSON.getBounds())) {
            inside = true;
          }

      return inside;
    }

    isPolygonInsidePolygons(innerPolygon, entity){
      let inside = false;
      let innerGeoJSON = L.geoJSON(innerPolygon.toGeoJSON());

      if(entity == 'SECTOR'){
        this.polygonsToApi.ZONE.polygons.forEach(element => {
          let outerPolygon = L.polygon(element);
          let outerGeoJSON = L.geoJSON(outerPolygon.toGeoJSON());
          if (outerGeoJSON.getBounds().contains(innerGeoJSON.getBounds())) {
            inside = true;
          }
        });

        return inside;
      }


      if(!this.polygonsToApi.CITY.polygons) return inside;
      this.polygonsToApi.CITY.polygons.forEach(element => {
        let outerPolygon = L.polygon(element);
        let outerGeoJSON = L.geoJSON(outerPolygon.toGeoJSON());
        if (outerGeoJSON.getBounds().contains(innerGeoJSON.getBounds())) {
          inside = true;
        }
      });

      return inside;
    }


    openDialogAddEntity(type){
      const addEntityDialog = this.dialog.open(AddEntityComponent, {
        disableClose: true,
        width: '611px',
        data: {
          type:type,
          city_id: (this.selectedCity) ? this.selectedCity.id : '',
          zone_id: (this.selectedZone)  ? this.selectedZone.id : '',
        } ,
      });

      addEntityDialog.afterClosed().subscribe((data) => {
        if(data !== "CLOSE"){
          this.geofencingService.addEntity(data).subscribe(res => {
            if(res.success){
              if(data.entity == 'CITY'){
                // CITY
                this.toast.success('Ville bien ajoutée', 1500)
                let city = res.response;
                city.zones = []
                this.cities.push(city);
                this.filter.get('city_id').setValue(res.response.id);
                this.zones = [];
                this.searchComponents.toArray()[0].selectObject(city)
                return
              }
              if(data.entity == 'ZONE'){
                // ZONE
                this.toast.success('Zone bien ajoutée', 1500)
                let zone = res.response
                zone.sectors = [];
                this.zones.push(zone);
                this.filter.get('zone_id').setValue(res.response.id);
                this.sectors = [];
                this.searchComponents.toArray()[1].selectObject(zone)
                return
              }
              if(data.entity == 'SECTOR'){
                // ZONE
                this.toast.success('Secteur bien ajoutés', 1500)
                this.sectors.push(res.response);
                this.filter.get('sector_id').setValue(res.response.id);
                this.searchComponents.toArray()[2].selectObject(res.response)
                return
              }

            }
          })
        }
      });

    }

    onCityChange(event){
      this.zones = [];
      this.sectors = [];
      this.polygonsToApi = {
        'CITY': {},
        'ZONE': {},
        'SECTOR': {},
      };
      this.addSectorDisabled = true;
      this.zoneDisabled = true;
      this.sectorDisabled = true;
      this.addZoneDisabled = true;
      this.selectedZone = null;
      this.selectedSector = null;
      this.filter.get('zone_id').setValue("");
      this.filter.get('sector_id').setValue("");
      this.drawnItems.clearLayers();
      if(!event || event == ''){
        this.addZoneDisabled = true;
        this.selectedCity = null;
        return
      }
      this.selectedCity = this.cities.find(city => city.id == event.id)
      this.hideShowDrawControl();
      this.zones = this.selectedCity.zones;

      if(!this.selectedCity.centre){
        this.toast.warn("Ville inconnue, merci de positionner le centre de la ville sur la carte", 5000)
        return
      }

      this.drawCityPolygons().then(() => {
        this.map.flyTo(this.selectedCity.centre.coordinates, 12, {
          animate: true,
          duration: 3,
          easeLinearity: 0.6
      });
      })
      if(!this.zones.length){
        this.toast.error('Aucune zone trouvée dans cette ville');
        return;
      }

    }


    onZoneChange(event){
      this.polygonsToApi.ZONE = {}
      this.polygonsToApi.SECTOR = {}
      this.sectors = [];
      this.filter.get('sector_id').setValue("");
      this.sectorDisabled = true
      this.addSectorDisabled = true;
      this.selectedSector = null;
      this.drawZonePolygons(event)
      if(!event || event == ''){
        this.addSectorDisabled = true;
        this.selectedZone = null;
        return
      }
      this.selectedZone = this.zones.find(zone => zone.id == event.id)
      this.sectors = this.selectedZone.sectors;
      if(!this.selectedZone.polygons){
        this.toast.warn('Merci de tracer le polygon pour cette zone')
        return
      }
      this.addSectorDisabled = false;
      if(!this.sectors.length){
        this.toast.error('Aucun secteur trouvé dans cette zone');
        return;
      }
      if(this.sectors.length) this.sectorDisabled = false
      this.sectors.forEach(sector => {
        if(sector.polygons){
            this.selectedSector = sector
            sector.polygons.coordinates.forEach((element, index) => {
            this.addPolygonToDrawnItems('SECTOR', element, index, '#000000', sector.name, this.selectedCity.id, this.selectedZone.id, 'sector-'+sector.id.toString(), index)
           });
        }
      });
      this.selectedSector = null;
    }

    onSectorChange(event){
      this.polygonsToApi.SECTOR = {}

      this.drawSectorPolygons(event)
      if(!event || event == ''){
        this.selectedSector = null;
        return
      }
      this.selectedSector = this.sectors.find(sector => sector.id == event.id)
      if(!this.selectedSector.polygons){
        this.toast.warn('Merci de tracer le polygon pour ce secteur')
        return
      }
    }
    onDrawDeleteStart(e: any) {
      console.log('DELEEETE', e);
    }
    onDrawDeleted(e: any) {
      this.showSaveBtn = true;
      var layers = e.layers;
      // let polygons = []
      layers.eachLayer((layer) => {
          let polygonID = layer['id'].split('-')[1];
          let isNew = layer['id'].split('-')[2];
          let entity = layer.options.className.split('-')[0];
          let entity_id = layer.options.className.split('-')[1];
          if(entity == 'city'){
            this.polygonsToApi.CITY.polygons.splice(polygonID - 1, 1);
            this.polygonsToApi.CITY.polygons_id.splice(polygonID - 1, 1);
          }
          if(entity == 'zone'){
            this.polygonsToApi.ZONE.polygons.splice(polygonID - 1, 1);
            this.polygonsToApi.ZONE.polygons_id.splice(polygonID - 1, 1);
          }
          if(entity == 'sector'){
            this.polygonsToApi.SECTOR.polygons.splice(polygonID - 1, 1);
            this.polygonsToApi.SECTOR.polygons_id.splice(polygonID - 1, 1);
          }
          let coordinates = layer._latlngs[0];
          let elementsToRemove = {'zone': [], 'sector': []}
            this.drawnItems.eachLayer(l => {
              if(l instanceof L.Polygon){
                if(this.isPolygonInsidePolygonForDelete(L.polygon(l.getLatLngs()), L.polygon(coordinates))){
                  this.drawnItems.removeLayer(l)
                  let innerId = l['id'].split('-')[1]
                  let innerEntity = l['id'].split('-')[0]
                  console.log('INNER ID', innerId)
                  console.log('INNER ENTIY', innerEntity.toLowerCase())
                  switch (innerEntity.toLowerCase()) {
                    case 'zone':
                      elementsToRemove.zone.push(parseInt(innerId) - 1)
                    case 'sector':
                      elementsToRemove.sector.push(parseInt(innerId) - 1)
                      break;
                      default:
                        break;
                      }
                    }
                  }
                })
                if(this.polygonsToApi.ZONE && this.polygonsToApi.ZONE.polygons){
                  this.polygonsToApi.ZONE.polygons = this.polygonsToApi.ZONE.polygons.filter((elem, index) => !elementsToRemove.zone.includes(index))
                  this.polygonsToApi.ZONE.polygons_id = this.polygonsToApi.ZONE.polygons_id.filter((elem, index) => !elementsToRemove.zone.includes(index))
                }
                if(this.polygonsToApi.SECTOR && this.polygonsToApi.SECTOR.polygons){
                  this.polygonsToApi.SECTOR.polygons = this.polygonsToApi.SECTOR.polygons.filter((elem, index) => !elementsToRemove.sector.includes(index))
                  this.polygonsToApi.SECTOR.polygons_id = this.polygonsToApi.SECTOR.polygons_id.filter((elem, index) => !elementsToRemove.sector.includes(index))
                }
                console.log(this.polygonsToApi)
                return
        });

    }
    onDrawEditStart(e: any){
    }
    onDrawEdited(e: any) {
      this.showSaveBtn = true;
      var layers = e.layers;
      // let polygons = []
      layers.eachLayer((layer) => {
          let polygonID = layer['id'].split('-')[1];
          let isNew = layer['id'].split('-')[2];
          let entity = layer.options.className.split('-')[0];
          let entity_id = layer.options.className.split('-')[1];
          if(entity == 'city'){
            this.polygonsToApi.CITY.polygons[polygonID - 1] = layer._latlngs[0];
          }
          if(entity == 'zone'){
            this.polygonsToApi.ZONE.polygons[polygonID - 1] = layer._latlngs[0];
          }
          if(entity == 'sector'){
            this.polygonsToApi.SECTOR.polygons[polygonID - 1] = layer._latlngs[0];
          }
      });

    }

    onDrawCreated(e: any) {
      const type = (e as any).layerType, layer = (e as any).layer
        if (type === 'polygon') {
          const coordinates = layer._latlngs;
          if(coordinates[0].length <= 3){
            this.toast.warn('Le polygon doit etre avoir au minimum 4 points', 5000)
            return
          }
          this.showSaveBtn = true;

          let polygon;
          if(!this.selectedSector && !this.selectedZone){
            // CITY
            if(this.isPolygonInsidePolygons(L.polygon(coordinates), 'CITY')){
              this.toast.warn('Ce polygon est pris en charge');
              return
            }
            if(!this.polygonsToApi.CITY.polygons_id) this.polygonsToApi.CITY.polygons_id = [];
            polygon = this.addPolygonToDrawnItems('CITY', coordinates, this.selectedCity.polygons ? this.selectedCity.polygons.coordinates.length : 0, '#FFA500', this.selectedCity.name, this.selectedCity.id, null, 'city-'+this.selectedCity.id.toString(), Math.max(...this.polygonsToApi.CITY.polygons_id, 0), '1')
            this.newLayers.push(polygon);

            console.log('API POLYGONS', this.polygonsToApi)
            return
          }
          if(!this.selectedSector && this.selectedZone){
            // ZONE
            if(!this.isPolygonInsidePolygons(L.polygon(coordinates), 'ZONE')){
              this.toast.warn('Merci de tracer la zone dedans la ville');
              return
            }
            if(!this.polygonsToApi.ZONE.polygons_id) this.polygonsToApi.ZONE.polygons_id = [];
            polygon = this.addPolygonToDrawnItems('ZONE', coordinates, this.selectedZone.polygons ? this.selectedZone.polygons.coordinates.length : 0, '#3388ff', this.selectedZone.name, this.selectedCity.id, this.selectedZone.id, 'zone-'+this.selectedCity.id.toString(), Math.max(...this.polygonsToApi.ZONE.polygons_id, 0), '1')
            this.newLayers.push(polygon);
            console.log('API POLYGONS', this.polygonsToApi)
            return
          }
          if(this.selectedSector){
            // SECTOR
            if(!this.isPolygonInsidePolygons(L.polygon(coordinates), 'SECTOR')){
              this.toast.warn('Merci de tracer le secteur dedans la zone');
              return
            }
            if(!this.polygonsToApi.SECTOR.polygons_id) this.polygonsToApi.SECTOR.polygons_id = [];
            polygon = this.addPolygonToDrawnItems('SECTOR', coordinates,this.selectedSector.polygons ? this.selectedSector.polygons.coordinates.length : 0, '#000000', this.selectedSector.name, this.selectedCity.id, this.selectedZone.id, 'sector-'+this.selectedSector.id.toString(), Math.max(...this.polygonsToApi.SECTOR.polygons_id, 0), '1')
            this.newLayers.push(polygon);
            // this.searchPolygon(coordinates, 'SECTOR', true);
            console.log('API POLYGONS', this.polygonsToApi)
            return
          }

        }
        if(type == 'marker'){
          if(!this.selectedCity.polygons){
            this.toast.warn('Merci de tracer la ville avant de positionner le centre', 5000)
            return
          }
          let marker;
          const coordinates = layer._latlng;
          marker = this.addMarkerToDrawnItems(coordinates)
          let polygons = [];
          this.selectedCity.polygons.coordinates.forEach(element => {
            polygons.push(new L.Polygon(element));
          });
          if(!this.isMarkerInsidePolygons(marker, polygons)) return
          this.openDialogForMarker(marker, this.selectedCity, coordinates);
        }
    }

    saveGeo(){
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        width: '811px',
        data: {
          polygonsToApi:this.polygonsToApi,
          type: 'POLYGON'
        } ,
      });
      confirmDialog.afterClosed().subscribe((data) => {
        let request;
        if(data !== "CLOSE"){
          this.disableMap = true;
          request = (!this.selectedSector && !this.selectedZone)
          ? this.polygonsToApi.CITY
          : (!this.selectedSector && this.selectedZone) ? this.polygonsToApi.ZONE : this.polygonsToApi.SECTOR

          this.geofencingService.addPolygon({'data':this.polygonsToApi}).subscribe(res => {
            if(res.success){
              this.toast.success('Polygon bien enregistré', 1500)
              this.showSaveBtn = false
              this.disableMap = false
              this.polygonsToApi = {
                'CITY': {},
                'ZONE': {},
                'SECTOR': {},
              };

              if(res.response['CITY']){
                res.response['CITY'].forEach(city => {
                  this.cities.find(c => c.id == city.id).polygons = city.polygons
                  city.polygons.coordinates.forEach((element, index) => {
                    this.searchPolygon(new L.Polygon(element), 'CITY', false, index);
                  });
                });

              }
              if(res.response['ZONE']){
                res.response['ZONE'].forEach(zone => {
                  this.zones.find(c => c.id == zone.id).polygons = zone.polygons
                  this.selectedZone = zone
                  if(zone.polygons){
                    zone.polygons.coordinates.forEach((element, index) => {
                      this.searchPolygon(new L.Polygon(element), 'ZONE', false, index);
                    });
                  }
                });
                this.selectedZone = null;
              }
              if(res.response['SECTOR']){
                res.response['SECTOR'].forEach(sector => {
                  this.sectors.find(c => c.id == sector.id).polygons = sector.polygons
                  this.selectedSector = sector
                  if(sector.polygons){
                    sector.polygons.coordinates.forEach((element, index) => {
                      this.searchPolygon(new L.Polygon(element), 'SECTOR', false, index);
                    });
                  }
                });
                this.selectedSector = null;
              }



              // res.response.polygons.coordinates.forEach((element, index) => {
              //   this.searchPolygon(new L.Polygon(element), 'CITY', false, index);
              // });
              // if(!this.selectedSector && !this.selectedZone)
              //   this.cities.find(c => c.id == res.response.id).polygons = res.response.polygons
              //   if(!this.selectedSector && this.selectedZone){
              //   res.response.polygons.coordinates.forEach((element, index) => {
              //     this.searchPolygon(new L.Polygon(element), 'ZONE', false, index);
              //   });
              //   this.addSectorDisabled = false;
              //   this.sectorDisabled = false;
              //   this.zones.find(z => z.id == res.response.id).polygons = res.response.polygons
              // }
              // if(this.selectedSector){
              //     res.response.polygons.coordinates.forEach((element, index) => {
              //       this.searchPolygon(new L.Polygon(element), 'SECTOR', false, index);
              //     });
              //     this.sectors.find(s => s.id == res.response.id).polygons = res.response.polygons
              // }
            }
          })
        }else{
          this.newLayers.forEach(element => {
            this.drawnItems.removeLayer(element)
          });
        }
      });
    }

    searchPolygon(polygon, entity, isNew=false, index){
      let exist = false;
        switch (entity) {
          case 'CITY':
            if(this.polygonsToApi.CITY && this.polygonsToApi.CITY.city_id == this.selectedCity.id){
              this.polygonsToApi.CITY.polygons.push(polygon.getLatLngs()[0])
              this.polygonsToApi.CITY.polygons_id.push(index+1)
              exist = true;
            }
            if(!exist)  this.polygonsToApi.CITY = {"entity": "CITY", "city_id": this.selectedCity.id, "polygons": polygon.getLatLngs(), "polygons_id": [index+1]}
            break;
          case 'ZONE':
            if(this.polygonsToApi.ZONE && this.polygonsToApi.ZONE.zone_id == this.selectedZone.id){
              this.polygonsToApi.ZONE.polygons.push(polygon.getLatLngs()[0])
              this.polygonsToApi.ZONE.polygons_id.push(index+1)
              exist = true;
            }
            if(!exist)  this.polygonsToApi.ZONE = {"entity": "ZONE", "zone_id": this.selectedZone.id, "polygons": polygon.getLatLngs(), "polygons_id": [index+1]}
            break;
          case 'SECTOR':
            if(this.polygonsToApi.SECTOR && this.polygonsToApi.SECTOR.sector_id == this.selectedSector.id){
              this.polygonsToApi.SECTOR.polygons.push(polygon.getLatLngs()[0])
              this.polygonsToApi.SECTOR.polygons_id.push(index+1)
              exist = true;
            }
            if(!exist)  this.polygonsToApi.SECTOR = {"entity": "SECTOR", "sector_id": this.selectedSector.id, "polygons": polygon.getLatLngs(), "polygons_id": [index+1]}
            break;

          default:
            break;
        }

    }

    drawZonePolygons(zone){
      this.drawnItems.eachLayer(layer => {
        if (layer instanceof L.Polygon && (layer.options.color === '#3388ff' || layer.options.color === '#000000')) {
          this.drawnItems.removeLayer(layer);
        }
      })
      if(!zone || zone.id == ''){
        this.zones.forEach(zone => {
          if(zone.polygons){
            this.selectedZone = zone;
              zone.polygons.coordinates.forEach((element, index) => {
              this.addPolygonToDrawnItems('ZONE', element, index, '#3388ff', zone.name, this.selectedCity.id, zone.id, 'zone-'+zone.id.toString())
             });
          }
        });
        this.selectedZone = null;
      }else{
        // this.zones.forEach(zone => {
          if(zone.polygons){
              this.selectedZone = zone
              zone.polygons.coordinates.forEach((element, index) => {
              this.addPolygonToDrawnItems('ZONE', element, index, '#3388ff', zone.name, this.selectedCity.id, zone.id, 'zone-'+zone.id.toString(), index)
             });
          }
        // });
      }

    }
    drawSectorPolygons(sector){

      this.drawnItems.eachLayer(layer => {
        if (layer instanceof L.Polygon && layer.options.color === '#000000') {
          this.drawnItems.removeLayer(layer);
        }
      })
      if(!sector || sector.id == '' || sector == null){
        console.log('SECTOOOOOORS1', sector)
        this.sectors.forEach(sector => {
          if(sector.polygons){
            this.selectedSector = sector
              sector.polygons.coordinates.forEach((element, index) => {
              this.addPolygonToDrawnItems('SECTOR',element, index, '#000000', sector.name, this.selectedCity.id, this.selectedZone.id, 'sector-'+sector.id.toString())
             });
          }
        });
        this.selectedSector = null;
      }else{
        console.log('SECTOOOOOORS', sector)
        // this.selectedZone.sectors.forEach(sector => {
          if(sector.polygons){
              this.selectedSector = sector
              sector.polygons.coordinates.forEach((element, index) => {
              this.addPolygonToDrawnItems('SECTOR', element, index, '#000000', sector.name, this.selectedCity.id, this.selectedZone.id, 'sector-'+sector.id.toString(), index)
             });
          }
        // });
      }

    }

  }
