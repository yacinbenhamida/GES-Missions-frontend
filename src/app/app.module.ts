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

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    routingComponents,
    HomepageComponent,
    FilterPipe,
    FilterPipeObj,
    NavbarComponent
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    PopupModule.forRoot(),
    NgxPaginationModule,
    LoadingAnimateModule.forRoot()
  ],
  providers: [NavbarService,AppService,UtilisateurService,
    DepartementService,CategorieService,ClasseService,FonctionService,GradeService
  ,ZonePaysService,ThemeService,ProjetService,MotCleService,PaysService,BudgetService,
  MissionaireServices,OrdreMissionService,MissionService,ConcerneServices,AvoirFraisService,
  PaysService,TypeFraisServices,TauxGroupeServices,LoadingAnimateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
