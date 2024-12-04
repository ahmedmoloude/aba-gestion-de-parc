import { DialogPlanifieComponent } from './dialog-planifie/dialog-planifie.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { PermissionService } from 'app/core/services/permission.service';

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

@Component({
  selector: 'app-passage-planifie',
  templateUrl: './passage-planifie.component.html',
  styleUrls: ['./passage-planifie.component.css'],
})
export class PassagePlanifieComponent implements OnInit {
  p: number = 1;
  spinner: boolean = false;
  passages: any;
  clients: any;
  adresse: any;
  links : any = [];
  constructor(
    public dialog: MatDialog,
    private boGridService: BoGridService,
    private _toast: ToastService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.spinner = true;
    this.boGridService.getCustomer().subscribe(
      (data) => {
        this.clients = data['response'];
        console.log('allClient', this.clients);
        let adresses = [];
        for (var i = 0; i < this.clients.length; i++) {
          for (var j = 0; j < this.clients[i]['pick_up_adresses'].length; j++) {
            //console.log(this.clients[i]["pick_up_adresses"][j])
            adresses.push(this.clients[i]['pick_up_adresses'][j]);
          }
        }
        this.adresse = adresses;
      },
      (error) => {
        console.log('error', error);
      }
    );

    this.boGridService.getAllPassagePlanified().subscribe(
      (data) => {
        console.log('passages retourné ', data);
        this.passages = data['response'].data;
        this.links = data['response'].links 
        /*var clients = [];
        for(var i=0; i<this.passages.length; i++){
          console.log("aaaaaa");
          console.log("client", this.passages[i]["customer"])
          clients.push(this.passages[i]["customer"])
        }
        console.log(clients)
        this.clients = [];
        this.clients = clients;
        console.log(this.clients)*/

        this.passages.forEach((element) => {
          let times = [];
          element.planified_passages_time.forEach((time) => {
            if (!times.find((e) => e.day == time.day)) {
              time.hours = [];
              time.hours.push(time.hour);
              times.push(time);
            } else {
              times.find((t) => t.day == time.day).hours.push(time.hour);
            }
          });
          element.planified_passages_time = times;
          times = [];
        });
        console.log('passages ', this.passages);
        this.spinner = false;
      },
      (error) => {
        //console.log('error', error);
        this._toast.error(
          'Une erreur est survenue lors de la récupération des passages !'
        );
      }
    );
  }

  clientChange($event) {
    if (this.clients.length > 0) {
      var client = this.clients.find((client) => client.id == $event);
      return client;
    } else {
      return;
    }
  }

  addresseChange($event) {
    if (this.adresse.length > 0) {
      var addresse = this.adresse.find((ad) => ad.id == $event);
      return addresse;
    } else {
      return;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPlanifieComponent, {
      disableClose: true,
      width: '1039px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get apres create', data);
        this.passages.unshift(data['response']);
        // console.log(this.tasks)
      }
    });
  }
  getTheNext(event){
    this.spinner = true;
    this.boGridService.getAllPassagePlanified(event).subscribe(
      (data) => {
        console.log('passages retourné ', data);
        this.passages = data['response'].data;
        this.links = data['response'].links 
        /*var clients = [];
        for(var i=0; i<this.passages.length; i++){
          console.log("aaaaaa");
          console.log("client", this.passages[i]["customer"])
          clients.push(this.passages[i]["customer"])
        }
        console.log(clients)
        this.clients = [];
        this.clients = clients;
        console.log(this.clients)*/

        this.passages.forEach((element) => {
          let times = [];
          element.planified_passages_time.forEach((time) => {
            if (!times.find((e) => e.day == time.day)) {
              time.hours = [];
              time.hours.push(time.hour);
              times.push(time);
            } else {
              times.find((t) => t.day == time.day).hours.push(time.hour);
            }
          });
          element.planified_passages_time = times;
          times = [];
        });
        console.log('passages ', this.passages);
        this.spinner = false;
      },
      (error) => {
        //console.log('error', error);
        this._toast.error(
          'Une erreur est survenue lors de la récupération des passages !'
        );
      }
    );
  }
}
