import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routingComponents} from './app-routing.module';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { ThUsersComponent } from './th-users/th-users.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import {NavbarComponent } from './navbar/navbar.component';
import {NavbarService} from './navbar/navbar.service';
import { AppService } from './app.service';
import {UtilisateurService} from './model/utilisateur.service';
import {DepartementService} from './model/departement.service';
import { CategorieService } from "./model/categorie.service";
import { ClasseService } from "./model/classe.service";
import { FonctionService } from "./model/fonction.service";
import { GradeService } from "./model/grade.service";
import { ZonePaysService } from './model/zonepays.service';
import { ThemeService } from './model/theme.service';
import { ProjetService } from './model/projet.service';
import { MotCleService } from './model/motcle.service';
import { PaysService } from './model/pays.service';
import { BudgetService } from './model/Budget.service';
import { PopupModule } from "ng2-opd-popup";
import { FilterPipe } from "./pipes/filter.pipe";
import { AffectMissDep } from './model/affectmission';
import { MissionaireServices } from "./model/missionaire.service";
import { FilterPipeObj } from './pipes/filterobject.pipe';
import { OrdreMissionService } from "./model/ordremission.service";
import { MissionService } from "./model/mission.service";
import {NgxPaginationModule} from "ngx-pagination";
import { ConcerneServices } from './model/concerne.service';
import { TypeFraisServices } from './model/typefrais.service';
import { LoadingAnimateModule, LoadingAnimateService } from 'ng2-loading-animate';
import { AvoirFraisService } from './model/avoirfrais.service';
import { TauxGroupeServices } from './model/tauxgroupe.service';
import { ReportService } from './model/reporting.service';
import { SDistribpaysComponent } from './s-distribpays/s-distribpays.component';
import {SelectModule} from 'ng2-select';
import { AuthService } from './authguards/auth.service';
import { AuthGuardService } from './authguards/auth-guard.service';
import { Http } from '@angular/http';
import { RoleGuardService } from './authguards/roleguard.service';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    routingComponents,
    HomepageComponent,
    FilterPipe,
    FilterPipeObj,
    NavbarComponent,
    SDistribpaysComponent
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    PopupModule.forRoot(),
    NgxPaginationModule,
    SelectModule,
    HttpModule,
    ChartsModule,
    LoadingAnimateModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPBMTBJoxcLGULqtT-9Y-Ev8H-Ilu0ShM'
    })
  ],
  providers: [NavbarService,AppService,UtilisateurService,
    DepartementService,CategorieService,ClasseService,FonctionService,GradeService
  ,ZonePaysService,ThemeService,ProjetService,MotCleService,PaysService,BudgetService,
  MissionaireServices,OrdreMissionService,MissionService,ConcerneServices,AvoirFraisService,
  PaysService,TypeFraisServices,TauxGroupeServices,LoadingAnimateService,ReportService,AuthService,
  AuthGuardService,RoleGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
