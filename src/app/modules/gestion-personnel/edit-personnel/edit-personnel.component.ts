import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'app/services';
import { ActivatedRoute } from '@angular/router';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { PersonelService } from '../../../core/services/personel.service';
import { TypeServiceService } from '../../../core/services/type-service.service';
import { environment } from 'environments/environment';
import {RessouresService} from '../../../../app/core/services/ressoures.service';
import { Observable } from 'rxjs';
import { RoleState, StateEnum } from 'app/core/store/role/role.reducer';
import { loadRoles } from 'app/core/store/role/role.actions';
import { selectEnvPayloadAgence } from 'app/core/store/agence/agence.selectors';
import { PHONE_REGEX } from 'app/shared/validators/validators';

@Component({
  selector: 'app-edit-personnel',
  templateUrl: './edit-personnel.component.html',
  styleUrls: ['./edit-personnel.component.css'],
})
export class EditPersonnelComponent implements OnInit {
  tonnages : any = [];
  status :any= [
    {
    value:true,
    name : 'active'
  },
  {
    value:false,
    name : 'Inactive'
  }
    ];
  personnel_tonnages : any = [];
  zonnes :any=[];
  parcs : any = [];
  isCommerciale:boolean = false;
  f = new FormGroup({});
  image_src: any;
  isLoding: boolean = true;
  picture_name: string;
  showEndDate: boolean = false;
  steInterimShow: boolean = false;
  display_img: boolean = false;
  isaddConatct: boolean = false;
  files: any;
  personnelFormGroup : FormGroup;
  Conducteur: boolean = false;
  caissier: boolean = false;
  cities: any;
  isLoading: boolean = false;
  uuid: any;
  personnel!: any;
  services: any;
  alert_config: {
    title: 'le personnel a été ajouté avec succès';
    icon: 'success';
    confirmBtn: "D'acoords";
  };
  agencies = [];

  role$: Observable<RoleState> = this.store.select(state => state.role);
  roles = [];
  tempRoles = [];

  constructor(
    private formbuilder: FormBuilder,
    private personelservice: PersonelService,
    private typeServiceService: TypeServiceService,
    private _router: Router ,
    private boGridService: BoGridService,
    private _toast: ToastService,
    private route: ActivatedRoute,
    private ressouresService: RessouresService,
    private store: Store<AppState>,
  ) {
    this.f = this.formbuilder.group({
      matricule: [''],
      cin: [''],
      end_date_cin: [''],
      first_name: [''],
      last_name: [''],
      birth_date: [''],
      birth_place: [''],
      town: [''],
      family_situation: [''],
      children_number: [''],
      adress: [''],
      cnss_number: [''],
      gsm_personnel: [''],
      email: [''],
      direction: [''],
      departement: [''],
      service_id: [''],
      parc: [''],
      entry_date: [''],
      contract_type: [''],
      interim_company: [''],
      code: [''],
      function: [''],
      role_id: [''],
      affectation: [''],
      agency_id :[''],
      statut: [''],
      dirver_licence_numero: [''],
      dirver_licence_type: [''],
      dirver_licence_validity_date: [''],
      contact_contact_1: [''],
      contact_1_gsm: [''],
      contact_contact_2: [''],
      contact_2_gsm: [''],
      experience_studies_level: [''],
      experience_pro_experience: [''],
      experience_diplome: [''],
      experience_former_job: [''],
      fixe_professionnel: [''],
      gsm_professionnel: [''],
      date_end_contrart: [''],
    });

  }

  ngOnInit(): void {
    this.store.dispatch(loadRoles());

    // this.getParcs()
    this.store.select(selectEnvparcPayload).subscribe((res) => {
      // console.log(" parc========>", res)
      this.parcs = res
    });

    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.agencies = res;
    });

    this.getTonnage()
    this.getPersonnel()
    this.getServices()
    this.getAllZonnes()
    this.role$.subscribe(
      (resp) => {
        if(resp.rolesState == StateEnum.SUCCESS) {
          this.roles = resp.roles;
        }
      }
    )
    
  }
  imgInputChange(fileInputEvent: any) {
    this.files = fileInputEvent.target.files[0];
    this.picture_name = this.files.name;
    var reader = new FileReader();
    reader.readAsDataURL(fileInputEvent.target.files[0]);
    reader.onload = (event: any) => {
      this.image_src = event.target.result;
      this.display_img = true;
    };
  }
  start_time : any;
  setDateDebut(e){
    console.log("DATE DEBUT", e)
    this.start_time= e;
  }
  submit() {
    this.isLoading = true;
    var formData = new FormData();
    formData.append('uuid', this.uuid);
    formData.append('profile_picture_url', this.files);
    formData.append('matricule', this.f.value.matricule);
    formData.append('cin', this.f.value.cin);
    formData.append('end_date_cin', this.convert(this.f.value.end_date_cin));
    formData.append('first_name', this.f.value.first_name);
    formData.append('last_name', this.f.value.last_name);
    formData.append('birth_date', this.convert(this.f.value.birth_date));
    formData.append('birth_place', this.f.value.birth_place);
    formData.append('town', this.f.value.town);
    formData.append('children_number', this.f.value.children_number);
    formData.append('adress', this.f.value.adress);
    formData.append('cnss_number', this.f.value.cnss_number);
    formData.append('gsm_personnel', this.f.value.gsm_personnel);
    formData.append('email', this.f.value.email);
    formData.append('direction', this.f.value.direction);
    formData.append('departement', this.f.value.departement);
    formData.append('service', this.f.value.service);
    formData.append('parc', this.f.value.parc);
    formData.append('entry_date', this.convert(this.f.value.entry_date));
    formData.append('service_id', this.f.value.service_id);
    formData.append('contract_type', this.f.value.contract_type);
    formData.append('interim_company', this.f.value.interim_company);
    formData.append('code', this.f.value.code);
    formData.append('function', this.f.value.function);
    formData.append('role_id', this.f.value.role_id);
    formData.append('agency_id', this.f.value.agency_id);
    formData.append('assignment', this.f.value.affectation);
    formData.append('statut', this.f.value.statut);
    formData.append('fixe_professionnel', this.f.value.fixe_professionnel);
    formData.append('cart_pro_num', this.f.value.cart_pro_num);
    formData.append(
      'dirver_licence_numero',
      this.f.value.dirver_licence_numero
    );
    formData.append('dirver_licence_type', this.f.value.dirver_licence_type);
    formData.append(
      'dirver_licence_validity_date',
      this.convert(this.f.value.dirver_licence_validity_date)
    );
    formData.append('contact_contact_1', this.f.value.contact_contact_1);
    formData.append('contact_1_gsm', this.f.value.contact_1_gsm);
    formData.append('contact_contact_2', this.f.value.contact_contact_2);
    formData.append('contact_2_gsm', this.f.value.contact_contact_2);
    formData.append(
      'experience_studies_level',
      this.f.value.experience_studies_level
    );
    formData.append(
      'experience_pro_experience',
      this.f.value.experience_pro_experience
    );

    formData.append(
      'experience_former_job',
      this.f.value.experience_former_job
    );
    formData.append('experience_diplome', this.f.value.experience_diplome);
    formData.append('gsm_professionnel', this.f.value.gsm_professionnel);
    formData.append('gsm_personnel', this.f.value.gsm_personnel);
    formData.append('family_situation', this.f.value.family_situation);
    formData.append('date_end_contrart', this.f.value.date_end_contrart);
    this.personelservice.EditPersonnel(formData).subscribe(
       (res) => {
      this.isLoading = false;
      this._toast.success(' le personnel a été bien modifié ');
     this._router.navigate(['gestionpersonnel']);
    },
    (err)=>{
      this._toast.error("vous n'avez pas rempli tous les champs");
      this.isLoading = false;
    }
    )
  }
  convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  villeSelectedForBirthplace($event){
    var birth_place = this.cities.find(city => city.name == $event.option.value).name;

    this.f.controls['birth_place'].setValue(birth_place);

  }
  villeSelectedForTown($event){
    console.log($event)
    var town = this.cities.find(city => city.name == $event.option.value).name;
    console.log(town)
    this.f.controls['town'].setValue(town);

  }
  filterCity(event : any){
    if(event.target.value.length > 2){
      this.boGridService.citiesFilter(event.target.value.toUpperCase()).subscribe((data) => {
        this.cities = data;
      },
      (error) => {
        console.log('error', error);
      });
    }
  }
  filterCityForTown(event){
    console.log(event)
    if(event.target.value.length > 2){
      this.boGridService.citiesFilter(event.target.value.toUpperCase()).subscribe((data) => {
        this.cities = data;
      },
      (error) => {
        console.log('error', error);
      });
    }
  }
  typeOfContrartChange(event) {
    console.log(this.showEndDate)
    if (  event.value === 'cdd') {
      this.showEndDate = true;
      this.steInterimShow= false ;
    }
    else if(event.value === 'Interim'){
      this.steInterimShow= true ;
      this.showEndDate = true;
    }
    else {
      this.showEndDate = false;
      this.steInterimShow= false ;
    }
  }
  addConatct(){
    this.isaddConatct = true
  }
  getFonction(event){
    if( event.value =="Conducteur"){
      this.Conducteur = true
      this.isCommerciale = false
    }
    else if( event.value =="Commerciale") {
      this.isCommerciale = true
      console.log(this.isCommerciale)
    }
    else {
      if(event.value == 'CAISSIER' || event.value == 'SEUPERVISORCAISSIER') {
        this.caissier = true;
      }
      this.Conducteur = false
      this.isCommerciale = false
    }
    this.tempRoles = this.roles.filter(r => r.function == event.value)
  }
  getTonnage(){
    this.personelservice.getTonnage().subscribe((res:any)=>{
      this.tonnages = res.response
    })
  }
  // getParcs(){
  //   this.personelservice.getParc().subscribe((res:any)=>{
  //     this.parcs = res
  //   })
  // }
  getPersonnel(){
    this.uuid = this.route.snapshot.params.uuid;
     var tonnage_of_personnel = []
     var service_of_personnel = []
     var zonne_of_personnel = []
    this.personelservice.getPersonnelByUiid(this.uuid).subscribe((res:any) => {
      this.personnel = res.response
      res.response.tonnages.forEach(element => {
        tonnage_of_personnel.push(element.id)
      });
      res.response.service.forEach(element => {
        service_of_personnel.push(element.id)
      });
      res.response.zonnes.forEach(element => {
        zonne_of_personnel.push(element.id)
      });

      this.tempRoles = this.roles.filter(r => r.function == this.personnel.function)

      this.f = new FormGroup({
        matricule: new FormControl(this.personnel.matricule ===null ? '' :this.personnel.matricule, Validators.required),
        cin: new FormControl(this.personnel.cin ===null ? '': this.personnel.cin, Validators.required),
        end_date_cin: new FormControl(this.personnel.end_date_cin===null? ' ' : this.personnel.end_date_cin, Validators.required ),
        first_name: new FormControl(this.personnel.first_name ===null ? ' ' : this.personnel.first_name, Validators.required),
        last_name: new FormControl(this.personnel.last_name ===null ? ' ' : this.personnel.last_name, Validators.required),
        direction: new FormControl(this.personnel.direction ==null ? ' ' : this.personnel.direction ,Validators.required),
        departement: new FormControl(this.personnel.departement == null ? ' ':this.personnel.departement,Validators.required ),
        parc: new FormControl(this.personnel.parc_id==null ? ' ' : this.personnel.parc_id, Validators.required),
        contract_type: new FormControl(this.personnel.contract_type ==null ? ' ':  this.personnel.contract_type,Validators.required),
        affectation : new FormControl(tonnage_of_personnel, Validators.required),
        service_id: new FormControl(service_of_personnel, Validators.required),
        function : new FormControl(this.personnel.function == null ? ' ' : this.personnel.function, Validators.required),
        role_id : new FormControl(this.personnel.role_id, Validators.required),
        email: new FormControl(JSON.parse(this.personnel.contact)?.email == null ? '' : JSON.parse(this.personnel.contact)?.email, Validators.required),
        gsm_personnel: new FormControl(JSON.parse(this.personnel.contact)?.gsm_personnel == null ? '': JSON.parse(this.personnel.contact)?.gsm_personnel, [Validators.required, Validators.pattern(PHONE_REGEX)]),
        gsm_professionnel : new FormControl(JSON.parse(this.personnel.contact)?.gsm_professionnel == null ? ' ' : JSON.parse(this.personnel.contact)?.gsm_professionnel, [Validators.required, Validators.pattern(PHONE_REGEX)]),
        dirver_licence_validity_date : new FormControl(JSON.parse(this.personnel.driver_lisence)===null ? ' ':JSON.parse(this.personnel.driver_lisence)?.validity_date),
        dirver_licence_numero : new FormControl(JSON.parse(this.personnel.driver_lisence) ===null ?'' : JSON.parse(this.personnel.driver_lisence)?.numero ),
        birth_date: new FormControl(this.personnel.birth_date===null ? '' : this.personnel.birth_date),
        family_situation: new FormControl(this.personnel.family_situation ===null ? '': this.personnel.family_situation),
        children_number: new FormControl(this.personnel.children_number ===null ? ' ' : this.personnel.children_number),
        adress: new FormControl(this.personnel.adress === null ? ' ' : this.personnel.adress),
        cnss_number: new FormControl(this.personnel.cnss_number== null ?' ' : this.personnel.cnss_number),
        fixe_professionnel: new FormControl(this.personnel.fixe_professionnel ==null ? '' : this.personnel.fixe_professionnel),
        zonne: new FormControl(zonne_of_personnel),
        entry_date: new FormControl(this.personnel.entry_date==null ? ' ' : this.personnel.entry_date),
        code: new FormControl(this.personnel.code ==null ? ' ' : this.personnel.code),
        interim_company: new FormControl(this.personnel.interim_company==null ? ' ': this.personnel.interim_company),
        date_end_contrart: new FormControl(this.personnel.date_end_contrart=="NaN-aN-aN" ? ' ': this.personnel.date_end_contrart),
        cart_pro_num: new FormControl(this.personnel.cart_pro_num==null ? ' ': this.personnel.cart_pro_num),
        agency_id : new FormControl(this.personnel.agency_id),
        statut :  new FormControl(this.personnel.statut),
        dirver_licence_type : new FormControl(JSON.parse(this.personnel.driver_lisence)?.types == null ? '': JSON.parse(this.personnel.driver_lisence)?.types.split(",")),
        contact_contact_1 : new FormControl(JSON.parse(this.personnel.contact)?.contact_1 == null ? '': JSON.parse(this.personnel.contact)?.contact_1),
        contact_1_gsm : new FormControl(JSON.parse(this.personnel.contact)?.contact_1_gsm == null ? ' ' : JSON.parse(this.personnel.contact)?.contact_1_gsm),
        contact_contact_2 : new FormControl(JSON.parse(this.personnel.contact)?.contact_2==null ? ' ' : JSON.parse(this.personnel.contact)?.contact_ ),
        contact_2_gsm : new FormControl(JSON.parse(this.personnel.contact)?.contact_2_gsm == null ? ' ' : JSON.parse(this.personnel.contact)?.contact_2_gsm),
        experience_studies_level : new FormControl(JSON.parse(this.personnel.experience)?.studies_level == null ? ' ' : JSON.parse(this.personnel.experience)?.studies_level ),
        experience_diplome : new FormControl(JSON.parse(this.personnel.experience)?.diplome ==null ? ' ' : JSON.parse(this.personnel.experience)?.diplome),
        experience_pro_experience : new FormControl(JSON.parse(this.personnel.experience)?.pro_experience ==null ? ' ' : JSON.parse(this.personnel.experience)?.pro_experience ),
        experience_former_job : new FormControl(JSON.parse(this.personnel.experience)?.former_job == null   ? '' : JSON.parse(this.personnel.experience)?.former_job),
        town : new FormControl(this.personnel.town == null ? ' ' : this.personnel.town),
        birth_place : new FormControl(this.personnel.birth_place == null ? ' ' : this.personnel.birth_place),
      })
      this.start_time = this.personnel?.entry_date
      if(this.personnel.contract_type==='Interim'){
        this.steInterimShow= true ;
        this.showEndDate = true;
      }
       if( this.personnel.function ==="Conducteur"){
      this.Conducteur = true
    }
    if( this.personnel.function ==="Commerciale"){
      this.isCommerciale = true
    }
    if( this.personnel.function ==="CAISSIER" || this.personnel.function ==="SEUPERVISORCAISSIER"){
      this.caissier = true
    }
      if(this.personnel?.profile_picture_url?.includes("public")){
      var img_src = this.personnel?.profile_picture_url?.replace("public/","")
      this.image_src = environment.STORAGE + '/'+ img_src
      }
      else {
        this.image_src = environment.STORAGE +'/uploads/personnel/profile_picture' + this.personnel.id + '/' + this.personnel.profile_picture_url
      }
      this.isLoding = false
    })
  }
  getServices(){
    this.typeServiceService.getAllServices().subscribe((res) => {
      this.services = res;
    });
  }
  setForm(){
    this.f = new FormGroup({
      matricule: new FormControl('', Validators.required),
      cin: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      birth_date: new FormControl('', Validators.required),
      email: new FormControl('',Validators.required),
      direction: new FormControl('', Validators.required),
      departement: new FormControl('', Validators.required),
      service_id: new FormControl('', Validators.required),
      parc: new FormControl('', Validators.required),
      entry_date: new FormControl('', Validators.required),
      contract_type: new FormControl('', Validators.required),
      gsm_professionnel: new FormControl('', [Validators.required, Validators.pattern(PHONE_REGEX)]),
      gsm_personnel: new FormControl('', [Validators.required, Validators.pattern(PHONE_REGEX)]),
      function: new FormControl('', Validators.required),
      role_id: new FormControl('', Validators.required),
      code: new FormControl(''),
      affectation: new FormControl(''),
      birth_place: new FormControl(''),
      town: new FormControl(''),
      end_date_cin: new FormControl(''),
      family_situation: new FormControl(''),
      children_number: new FormControl(''),
      adress: new FormControl(''),
      cnss_number: new FormControl(''),
      interim_company: new FormControl(''),
      agency_id: new FormControl(''),
      statut: new FormControl(''),
      dirver_licence_numero: new FormControl(''),
      dirver_licence_type: new FormControl(''),
      dirver_licence_validity_date: new FormControl(''),
      contact_contact_1: new FormControl(''),
      contact_1_gsm: new FormControl(''),
      contact_contact_2: new FormControl('', ),
      contact_2_gsm: new FormControl('', ),
      experience_studies_level: new FormControl(''),
      experience_pro_experience: new FormControl(''),
      experience_diplome: new FormControl(''),
      experience_former_job: new FormControl(''),
      fixe_professionnel: new FormControl(''),
      date_end_contrart: new FormControl(''),
      cart_pro_num : new FormControl(''),
    })
  }
  getAllZonnes(){
    this.ressouresService.getZones().subscribe((response:any)=>{
      this.zonnes = response
    })
  }
}
