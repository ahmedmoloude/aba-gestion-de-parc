import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvRemplacementPayload, selectEnvRemplacementIsLoading, selectEnvRemplacementStatus } from 'app/core/store/remplacement/remplacement.selectors';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-detail-remplacement',
  templateUrl: './detail-remplacement.component.html',
  styleUrls: ['./detail-remplacement.component.css']
})
export class DetailRemplacementComponent implements OnInit {

  uuid :any;
  remplacements : any;
  spinner : boolean;
  url = environment.STORAGE + '/vehicule/';
  images = [];
  oldimages = [];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.params.uuid;
    // console.log('uuid', this.uuid);

    this.store.select(selectEnvRemplacementPayload).subscribe((res) => {
      this.remplacements = res.data?.find(r => r.uuid == this.uuid);
      console.log(' remplacements ========>', this.remplacements);
      this.remplacements?.old?.images?.forEach((image) => {
        this.oldimages.push(this.url + this.remplacements?.old?.id + '/' + image.file);
      });
      this.remplacements?.new?.images?.forEach((image) => {
        this.images.push(this.url + this.remplacements?.new?.id + '/' + image.file);
      });
    });

    this.store.select(selectEnvRemplacementIsLoading).subscribe((res) => {
      this.spinner = res;
      console.log(res);
    });

  }

}
