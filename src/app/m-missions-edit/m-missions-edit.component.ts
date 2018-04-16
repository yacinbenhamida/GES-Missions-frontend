import { Component, OnInit } from '@angular/core';
import { Mission } from '../model/mission';
import { OrdreMission } from '../model/ordremission';
import { Missionaire } from '../model/missionaire';
import { MissionService } from '../model/mission.service';
import { MissionaireServices } from '../model/missionaire.service';
import { OrdreMissionService } from '../model/ordremission.service';
import { Departement } from '../model/departement';
import { MotCle } from '../model/motcle';
import { ThemeService } from '../model/theme.service';
import { MotCleService } from '../model/motcle.service';
import { MFraisdestComponent } from "../m-fraisdest/m-fraisdest.component";
import { DatePipe } from '@angular/common';
import { Concerne } from '../model/concerne';
import { ConcerneServices } from '../model/concerne.service';
import { AvoirFraisService } from '../model/avoirfrais.service';
@Component({
  selector: 'app-m-missions-edit',
  templateUrl: './m-missions-edit.component.html',
  styleUrls: ['./m-missions-edit.component.css']
})
export class MMissionsEditComponent implements OnInit {
  frais:boolean = true;
  missions:boolean = true;
  edmission:boolean = true;
  missionaires:boolean = true;
  showmodif:boolean = false;
  modal:boolean = false;
  modaledit:boolean = false;
  part1:boolean = true;
  part2:boolean = false;

  missionairesAff:Missionaire[] = []
  tabmissions:Mission[] = [];
  tabOrdresMiss:OrdreMission[] = [];
  tabMissionaires:Missionaire[] = [];
  searchString:string;
  missionmodif:Mission = new Mission();
  motcles:MotCle[] = [];
  duree:number = 0;
  dep:Departement = JSON.parse(localStorage.getItem("org"));
  choosenMc:MotCle = new MotCle();
  n:string = '';
  duree2:number = 0;
  ordre:OrdreMission = new OrdreMission();
  missionconcernee:Mission = new Mission();
  ordremiss:OrdreMission = new OrdreMission();
  editedordre:OrdreMission = new OrdreMission();
  
  constructor(public missionsservice:MissionService, public missionaireService:MissionaireServices,
    public ordMService:OrdreMissionService,public thServ:ThemeService,public mocserv:MotCleService,
  public consServ:ConcerneServices,public fraisServ:AvoirFraisService) {
      missionsservice.getAllMissionsOfDep(this.dep.codeDep).subscribe(d=>this.tabmissions=d);
      mocserv.getAllMC().subscribe(d=>this.motcles=d);
     }

  ngOnInit() {}
  toggleMiss(){
    this.missions = !this.missions;
  }
  toggleMissio(){
    this.missionaires = ! this.missionaires;
  }

  toggleEdMissio(){
    this.edmission = ! this.edmission;
  }
  toggleF(){
    this.frais = !this.frais;
  }
  toggleModal(){
    this.n = '';
    this.ordre = null;
    this.ordre = new OrdreMission();
    this.modal = !this.modal;
  }
  numordConv(n:number):string{
    if(n<10) return "0"+n;
  }
  disp(){
    let canadd:boolean = true;


    this.ordre.mission = this.missionmodif;
    this.ordre.dateDepP = this.missionmodif.dateDepartP;
    this.ordre.dateArrP = this.missionmodif.dateArriveP;
    this.missionaireService.getMissionaireByCin(Number(this.n.substr(this.n.indexOf(":")+2,8)))
    .subscribe(d=>{
      for (let index = 0; index < this.tabOrdresMiss.length; index++) {
        if(this.tabOrdresMiss[index].missionaire.idMissionaire == d.idMissionaire){
            canadd = false;
          }
        }
    if(canadd == false){
      this.n= '';
      alert("وقع تعيين المنتفع سابقا");
      return;
    }   
    else this.ordre.missionaire = d;
    });

  }
  editMiss(u:Mission){
    this.missionsservice.findMissionByNum(u.numMission).subscribe(m=>{
      this.missionmodif = m;
      for (let index = 0; index < this.motcles.length; index++) {
        if(this.motcles[index].theme.idtheme==m.theme.idtheme){
          this.choosenMc = this.motcles[index];
          this.missionmodif.objectifMissionAr = this.choosenMc.libMcAr;
          this.missionmodif.objectifMissionFr = this.choosenMc.libMcFr;
        }
        this.calculDuree();
        this.missionaireService.getAllMissionaireNHAM(u.dateDepartP,u.dateArriveP,this.dep.codeDep).subscribe(d=>{
          this.missionairesAff = d;
           
        });
    }
    });
    this.ordMService.getAllOrdMissionsOfMiss(u.numMission).subscribe(t=>this.tabOrdresMiss=t);   
    this.showmodif = true;
  }
  fetchTheme(){
    this.thServ.getTheme(this.choosenMc.theme.idtheme).subscribe(r=>this.missionmodif.theme = r);
    this.missionmodif.objectifMissionAr = this.choosenMc.libMcAr;
    this.missionmodif.objectifMissionFr = this.choosenMc.libMcFr;
  }
  calculDuree(){
    if(new Date(this.missionmodif.dateDepartP).getTime() > new Date(this.missionmodif.dateArriveP).getTime() )
    {
      alert("تاريخ الذهاب يجب ان يكون اقل من تاريخ الإياب");}
      else  if(this.missionmodif.dateArriveP!=undefined && this.missionmodif.dateDepartP !=undefined && this.duree >=0){
      let date1 = new Date(this.missionmodif.dateArriveP).getTime();
      let date2 = new Date(this.missionmodif.dateDepartP).getTime();
      var diff = Math.abs(date2 - date1);
      this.duree = Math.ceil(diff / (1000 * 3600 * 24));
      this.duree2 = this.duree
    }
    else { this.duree = 0;}
  }
  editord(u:OrdreMission){
    this.editedordre = u;
    this.ordMService.getOrdMission(u.numOrdre,this.missionmodif.numMission).subscribe(ord=>{this.ordre=ord;
      for (let index = 0; index < this.missionairesAff.length; index++) {

          if(this.missionairesAff[index].idMissionaire==ord.missionaire.idMissionaire){
            this.missionairesAff[index] = ord.missionaire;
            this.n =   this.missionairesAff[index].cin +" : "+ this.missionairesAff[index].nomAr +" "+ this.missionairesAff[index].prenomAr;
            this.ordre.missionaire = this.missionairesAff[index];
            this.ordre.dateDepP = this.missionmodif.dateDepartP;
            this.ordre.dateArrP = this.missionmodif.dateArriveP;
          }
        }
      });
    this.toggleModalEdit();
  }

  addMissionaire(){
        if(this.tabOrdresMiss.length==0){
          this.ordre.numOrdre = 1;
          this.ordre.mission.numMission = Number(this.missionmodif.numMission); 
          this.ordre.avance = (this.ordre.missionaire.groupe.taux.valTaux) * Number(this.calcduree(this.ordre.dateDepP,this.ordre.dateArrP));   
          this.ordMService.insertOrdMission(this.ordre).then(x=>{
            x.dateArrP = this.ordre.dateArrP;
            x.dateDepP = this.ordre.dateDepP;
            this.tabOrdresMiss.push(x);      
            const index:number = this.tabOrdresMiss.indexOf(this.ordre);
                if(index!==-1){
                  this.n='';
                  this.tabOrdresMiss.splice(index,1);
                  this.ordre = new OrdreMission();
                }
          });
          this.toggleModal();
        }
        else {
          this.ordMService.getLatestORDMISS(Number(this.missionmodif.numMission)).subscribe(
            x=>{
              this.ordre.numOrdre = Number(x)+1;
              this.ordre.mission.numMission = Number(this.missionmodif.numMission);
              this.ordre.avance = (this.ordre.missionaire.groupe.taux.valTaux) * Number(this.calcduree(this.ordre.dateDepP,this.ordre.dateArrP));   
              this.ordMService.insertOrdMission(this.ordre).then(x=>{
                x.dateArrP = this.ordre.dateArrP;
                x.dateDepP = this.ordre.dateDepP;
                this.tabOrdresMiss.push(x);  
                const index:number = this.tabOrdresMiss.indexOf(this.ordre);
                if(index!==-1){
                  this.n='';
                  this.tabOrdresMiss.splice(index,1);
                  this.ordre = new OrdreMission();
                }
              });
              this.toggleModal();
            }
          )
        }
  }

affdur(dateArr:Date,dateDep:Date){
  let date1 = new Date(dateArr).getTime();
  let date2 = new Date(dateDep).getTime();
  var diff = Math.abs(date1 - date2);
  return Math.ceil(diff / (1000 * 3600 * 24)) + " يوم ";
}
calcduree(d1:Date,d2:Date){
  let diff =  Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
}
  deleteOrd(u:OrdreMission){
    if(confirm(" هل انت متأكد من إزالة  الامر عدد "+u.numOrdre+" ?")){
      this.ordMService.deleteOrdMission(u).then(()=>{
        this.tabOrdresMiss = this.tabOrdresMiss.filter(h=>h!==u);  });
      }
  }

  convDur(){
    if(this.ordre.dateDepP!=undefined && this.ordre.dateArrP!=undefined){
        if (this.ordre.dateDepP==this.ordre.dateArrP) this.duree2 =  0;
        else {
          let diff =  Math.abs(new Date(this.ordre.dateArrP).getTime() - new Date(this.ordre.dateDepP).getTime());
            this.duree2 =  Math.ceil(diff / (1000 * 3600 * 24));
          }
    }
    else this.duree2 = 0;
  }
  update(){
    this.missionmodif.departement = this.dep;
    this.missionsservice.updateMission(this.missionmodif).then(x=>null);
  }
  updateMissionaire(){
    let index:number = this.tabOrdresMiss.indexOf(this.editedordre);  
    this.ordre.avance = (this.ordre.missionaire.groupe.taux.valTaux) * Number(this.calcduree(this.ordre.dateDepP,this.ordre.dateArrP));   
    this.ordMService.updateOrdMission(this.ordre).subscribe(t=>{
      if(index!=-1){   
      //this.tabOrdresMiss = this.tabOrdresMiss.filter(h=>{h!==this.ordre;});
      t.dateArrP = this.ordre.dateArrP;
      t.dateDepP = this.ordre.dateDepP;
      this.tabOrdresMiss[index] = t;
     // this.tabOrdresMiss.push(t);
      }
    });  
    alert("تم تغيير العون !");
    this.toggleModalEdit();
  }
  toggleModalEdit(){
    this.modaledit = !this.modaledit;
  }
  getBack(){
    this.part2 = false;
    this.part1 = true;
  }
  gotodepenses(u:OrdreMission){
    this.part1 = false;
    this.part2 = true;
    this.ordremiss = u;
    this.missionconcernee = u.mission;
    
  }
  print(u:OrdreMission){
    let printContents, popupWin;
    //printContents = document.getElementById('print-section').innerHTML;
    let destination:string = "";
    let moytransport: string ="";
    this.consServ.getAllConcerneOfORDRE(u.idOrdre).subscribe(a=>{
      //u.concerne = a;
      for (let index = 0; index < a.length; index++) {
        if(a.length==1){
          destination += a[index].pays.libPaysAr 
          moytransport += a[index].moyTransport;
        }
        else {
          destination += a[index].pays.libPaysAr + " - "
          moytransport += a[index].moyTransport +" - "
        }
      }
      let supfraismiss:string = "";
      let supfraislogement:string ="";
      let supfraispartic:string ="";
      let supfraistransport:string ="";
      let fraistransp:number = 0.000;
      let fraismiss:number = 0.000;
      let timbre:number = 0.000;
      let fraislogementtot:number = 0.000;
      let fraislogement:number = 0.000;
      let fraisdivers:number = 0.000;
      this.fraisServ.getAllFraisOfOrdre(u.idOrdre).subscribe(f=>{
        for (let i = 0; i < f.length; i++) {
          if (f[i].typeFrai.codeTypefr == "0808"){ // frais missions
            if(f[i].support.codeSupport=="J"){ // org hote et org parrain
              supfraismiss =" تحمل مشترك بين "+ f[i].nomOrgAr + " و " + u.mission.departement.libDepAr ;
            }
            else if(f[i].support.codeSupport=="M"){ // ORG Hote et projet
              supfraismiss =" تحمل مشترك بين "+ f[i].nomOrgAr + " و " + f[i].projet.libProjAr ;

            }
            else if(f[i].support.codeSupport=="P"){ // compte perso
              supfraismiss ="الحساب الخاص " ;

            }
            else if(f[i].support.codeSupport=="E"){  //org hote (etranger)
              supfraismiss = f[i].nomOrgAr ;

            }
            else if(f[i].support.codeSupport=="A"){ // projet
              supfraismiss = f[i].projet.libProjAr ;

            }
            else if (f[i].support.codeSupport=="I"){
              supfraismiss = u.mission.departement.libDepAr ;
            }
            supfraislogement = supfraismiss;
            fraismiss = f[i].valeurPrevue;
          }
          else if(f[i].typeFrai.codeTypefr == "0606"){ //frais transport 
              if(f[i].support.codeSupport=="J"){ // org hote et org parrain
                supfraistransport =" تحمل مشترك بين "+ f[i].nomOrgAr + " و " + u.mission.departement.libDepAr ;
              }
              else if(f[i].support.codeSupport=="M"){ // ORG Hote et projet
                supfraistransport =" تحمل مشترك بين "+ f[i].nomOrgAr + " و " + f[i].projet.libProjAr ;
  
              }
              else if(f[i].support.codeSupport=="P"){ // compte perso
                supfraistransport ="الحساب الخاص " ;
              }
              else if(f[i].support.codeSupport=="E"){  //org hote (etranger)
                supfraistransport = f[i].nomOrgAr ;
              }
              else if(f[i].support.codeSupport=="A"){ // projet
                supfraistransport = f[i].projet.libProjAr ;
              }
              else if (f[i].support.codeSupport=="I"){
                supfraistransport = u.mission.departement.libDepAr ;
              }
              fraistransp = f[i].valeurPrevue;
          }
          else if(f[i].typeFrai.codeTypefr == "0303" || f[i].typeFrai.codeTypefr == "0707" ||f[i].typeFrai.codeTypefr == "0404" ||f[i].typeFrai.codeTypefr == "0202" || f[i].typeFrai.codeTypefr == "0101"){ //frais participation 
            if (f[i].typeFrai.codeTypefr == "0101"){
              timbre = f[i].valeurPrevue;
            }
            if(f[i].support.codeSupport=="J"){ // org hote et org parrain
              supfraispartic =" تحمل مشترك بين "+ f[i].nomOrgAr + " و " + u.mission.departement.libDepAr ;
            }
            else if(f[i].support.codeSupport=="M"){ // ORG Hote et projet
              supfraispartic =" تحمل مشترك بين "+ f[i].nomOrgAr + " و " + f[i].projet.libProjAr ;
            }
            else if(f[i].support.codeSupport=="P"){ // compte perso
              supfraispartic ="الحساب الخاص " ;
            }
            else if(f[i].support.codeSupport=="E"){  //org hote (etranger)
              supfraispartic = f[i].nomOrgAr ;
            }
            else if(f[i].support.codeSupport=="A"){ // projet
              supfraispartic = f[i].projet.libProjAr ;
            }
            else if (f[i].support.codeSupport=="I"){
              supfraispartic = u.mission.departement.libDepAr ;
            }
            else supfraispartic = " " ;
          }           
        }

        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html dir="rtl" lang="ar" >
            <head>
              <title>طباعة الأمر </title>
              <meta charset="utf-8">
              <link rel="stylesheet" href="../../styles.css">
              <style>
              table, th, td {
                margin-right:50px;
                border: 1px solid black;
                border-collapse: collapse;
                text-align:center;
            }
              </style>
            </head>
        <body onload="window.print();window.close()">
        <h1 style="text-align:center;">
        بطاقة تجميد وطلب تسبقة  <br/> بعنوان مأمورية بالخارج
        </h1>
        <p>
        أمر بالمأمورية عدد : &emsp; ${u.numOrdre > 10 ? u.numOrdre : '0' + u.numOrdre }  / ${u.mission.numMission} / ${u.mission.departement.codeDep}
        </p>
        <p>
          المعرف الوحيد :&emsp;  ${u.missionaire.matricule}
        </p>
        <p>
        الأسم واللقب : &emsp; ${u.missionaire.nomAr}  ${u.missionaire.prenomAr}
        </p>
        <p>
        الرتبة : ${u.missionaire.grade.libGradeAr} &emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp; 
        الصنف أو السلك :  ${u.missionaire.classe.libClasseAr} &emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp; 
        مستوى التأجير : ${u.missionaire.groupe.taux.valTaux} 
        </p>
        <p>
        الخطة الوظيفية : &emsp; ${u.missionaire.fonction.libFctAr}
        </p>
        <p>
        مكان المأمورية : &emsp; ${destination}
        </p>
        <p>
        مدتها : ${this.calcduree(u.dateDepP,u.dateArrP)} أيام &emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;  
        من : ${u.dateDepP} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp; &emsp;&emsp;&emsp; 
        إلى : ${u.dateArrP} 
        </p>
        <p>
        موضوع المأمورية : &emsp; ${u.mission.objectifMissionAr  !=null ? u.mission.objectifMissionAr : ''}
        </p>
        <p>
        تحمل مصاريف المأمورية على : &emsp; ${supfraismiss  !=null ? supfraismiss : ''}
        </p>
        <p>
        تحمل مصاريف السكن على : &emsp; ${supfraislogement  !=null ? supfraislogement : ''}
        </p>
        <p>
        تحمل مصاريف المشاركة على : &emsp; ${supfraispartic !=null ? supfraispartic : ''}
        </p>
        <p>
        تحمل مصاريف النقل على : &emsp; ${supfraistransport!=null ? supfraistransport : ''}
        </p>
        <p>
        وسيلة النقل :  &emsp;  ${moytransport!=null ? moytransport : ''}
        <p>
        <p> 
        مصاريف النقل :  &emsp; ${fraistransp} دينار 
        </p>
        &emsp;
        <table>
        <tr>
          <th> الاعتمادات <br/> (د)</th>
          <th> الاعتمادات المخصصة<br/> (د)</th>
          <th> الاعتمادات المجمدة<br/> (د)</th>
          <th> الاعتمادات المتبقية  <br/> (د)</th>
          <th> تقدير مصاريف المأمورية <br/> (د)</th>
        </tr>
        <tr>
          <td> مصاريف المأمورية</td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> ${fraismiss}</td>
        </tr>
        <tr>
          <td>مصاريف النقل</td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td>${fraistransp} </td>
        </tr>
        <tr>

        <td colspan='3' style='visibility:hidden;'> </td>
        <td style='border:0px;'> المجموع</td>
        <th>${fraistransp + fraismiss} </th>
        </tr>
        </table>
        <h3>بيان حول مصاريف المأمورية بإستثناء مصاريف النقل : </h3>
        &emsp;
        <table>
          <tr>
            <th> المدة</th>
            <th> المنحة اليومية <br/> (د) </th>
            <th> المنحة الجملية <br/> للمأمورية</th>
            <th> منحة السكن  <br/> اليومية</th>
            <th> المصاريف الجملية <br/> للسكن</th>
            <th> الطابع الجبائي <br/> (د)</th>
            <th> مصاريف أخرى <br/> (د)</th>
            <th> مبلغ التسبقة  <br/> (د)</th>
          </tr>
          <tr>
            <td>${this.calcduree(u.dateDepP,u.dateArrP)} </td>
            <td>${u.missionaire.groupe.taux.valTaux}</td>
            <td>${this.calcduree(u.dateDepP,u.dateArrP) * u.missionaire.groupe.taux.valTaux}</td>
            <td>${fraislogement}</td>
            <td>${fraislogementtot}</td>
            <td>${timbre}</td>
            <td>${fraisdivers}</td>
            <td>${u.avance}</td>
          </tr>
        </table>
        <p> ملاحظات :  </p>
        <p> حرر ب &emsp;&emsp;&emsp;&emsp; في  </p> 
        <br/>
        <p>&emsp;&emsp;&emsp;&emsp; آمر بالصرف 
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        سلطة الإشراف
        </p>
        </body>
          </html>`
        );
        popupWin.document.close();

      })
      
    });
   
  }
}
