import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes,CanActivate  } from '@angular/router';
import { AppComponent } from './app.component';
import { ThUsersComponent } from './th-users/th-users.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ThCountriesComponent } from "./th-countries/th-countries.component";
import { ThFonctionsComponent } from './th-fonctions/th-fonctions.component';
import { ThGradeComponent } from './th-grade/th-grade.component';
import { ThClassesComponent } from './th-classes/th-classes.component';
import { ThDepartementsComponent } from './th-departements/th-departements.component';
import { ThCategoriesComponent } from './th-categories/th-categories.component';
import { ThProjectsComponent } from './th-projects/th-projects.component';
import { ThTypefraisComponent } from './th-typefrais/th-typefrais.component';
import { ThKeywordsComponent } from './th-keywords/th-keywords.component';
import { ThZonesComponent } from './th-zones/th-zones.component';
import { ThThemeEditComponent } from './th-theme-edit/th-theme-edit.component';
import { NotfoundcomponentComponent } from './notfoundcomponent/notfoundcomponent.component';
import { EntBudgyearinsertComponent } from './ent-budgyearinsert/ent-budgyearinsert.component';
import { ProjBudgyearinsertComponent } from './proj-budgyearinsert/proj-budgyearinsert.component';
import { ProjBudgyeareditComponent } from './proj-budgyearedit/proj-budgyearedit.component';
import { EntBudgyeareditComponent } from './ent-budgyearedit/ent-budgyearedit.component';
import { ThOrganisationsComponent } from './th-organisations/th-organisations.component';
import { ConfirmbudgYearComponent } from './confirmbudg-year/confirmbudg-year.component';
import { MMissionairesComponent } from './m-missionaires/m-missionaires.component';
import { MMissionsComponent } from './m-missions/m-missions.component';
import { MMissionsEditComponent } from './m-missions-edit/m-missions-edit.component';
import { MFraisdestComponent } from './m-fraisdest/m-fraisdest.component';
import { MConfirmMissionsComponent } from './m-confirm-missions/m-confirm-missions.component';
import { ThGroupesComponent } from './th-groupes/th-groupes.component';
import { SMainpanelComponent } from './s-mainpanel/s-mainpanel.component';
import { MAutoriMissionsComponent } from './m-autori-missions/m-autori-missions.component';
import { MConfirmavanceComponent } from './m-confirmavance/m-confirmavance.component';
import { AuthGuardService as AuthGuard } from './authguards/auth-guard.service';
import {  RoleGuardService as RoleGuard } from './authguards/roleguard.service';
import { ThChangappointmentComponent } from './th-changappointment/th-changappointment.component';

const appRoutes: Routes = [
    // suivit
    {path : 'suivi' , component : SMainpanelComponent,canActivate : [RoleGuard],data: {roles :["O","OM"]}},
    //end suivit
   // missions
  { path : 'm-missionaires' , component : MMissionairesComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]}},
    { path : 'm-fraisdest' , component : MFraisdestComponent,canActivate: [AuthGuard]},
    { path : 'm-missions' , component : MMissionsComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]} },
    { path : 'm-editmissions' , component : MMissionsEditComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]}},
    { path : 'm-confirmmiss' , component : MConfirmMissionsComponent,canActivate:[RoleGuard],data: {roles :["O","OM"]}},
    { path : 'm-confirmavance' , component : MConfirmavanceComponent ,canActivate: [RoleGuard],data: {roles :["P"]}},
    // end missions
  { path : 'th-users',component : ThUsersComponent,canActivate: [RoleGuard],data: {roles :["A"]}},
  { path : 'home', component : HomepageComponent,canActivate: [AuthGuard] },
  { path : '', redirectTo: '/login',pathMatch: 'full'},
  { path : 'login' , component : LoginComponent},
  { path : 'th-countries' , component : ThCountriesComponent,canActivate: [RoleGuard],data: {roles :"A"} },
  { path : 'th-departements' , component : ThDepartementsComponent,canActivate: [RoleGuard],data: {roles :"A"}},
  { path : 'th-categories' , component : ThCategoriesComponent,canActivate: [RoleGuard],data: {roles :["A"]}},
  { path : 'th-keywords' , component : ThKeywordsComponent,canActivate: [RoleGuard],data: {roles :["A"]}},
  { path : 'th-grade' , component : ThGradeComponent,canActivate: [RoleGuard],data: {roles :["A"]}},
  { path : 'th-projects' , component : ThProjectsComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]} },
  { path : 'th-typefrais' , component : ThTypefraisComponent,canActivate: [RoleGuard],data: {roles :["A"]}},
  { path : 'th-zone' , component : ThZonesComponent,canActivate: [RoleGuard],data: {roles :["A"]}},
  { path : 'th-classes' , component : ThClassesComponent,canActivate: [RoleGuard],data: {roles :["A"]}},
  { path : 'th-fonct' , component : ThFonctionsComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]}},
  { path : 'th-org', component : ThOrganisationsComponent,canActivate: [RoleGuard],data: {roles :["OM"]} },
  { path : 'th-groupes' , component : ThGroupesComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]}}, 
  { path : 'th-affectation', component : ThChangappointmentComponent, canActivate : [RoleGuard],data: {roles :["A"]}},
  { path : 'confirmbudg-year' , component : ConfirmbudgYearComponent,canActivate:[RoleGuard],data: {roles :["OM"]}},
  { path : 'insbud-org',component: EntBudgyearinsertComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]} },
  { path :  'insbudg-proj', component : ProjBudgyearinsertComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]} },
  { path :  'updbudg-proj', component :  ProjBudgyeareditComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]} },
  { path : 'updbudg-org', component : EntBudgyeareditComponent,canActivate: [RoleGuard],data: {roles :["O","OM"]}},
  { path : 'confirmmissions', component : MAutoriMissionsComponent,canActivate: [RoleGuard],data: {roles :["OM"]}},
  { path : 'error',component : NotfoundcomponentComponent},
  { path : '**', redirectTo: 'error' },
  { path : '404', redirectTo: 'error' },
  { path :'#' , redirectTo : ''}
];

@NgModule({
    imports: [
            RouterModule.forRoot(appRoutes)
        ],    
    exports : [ RouterModule
    ]
})
export class AppRoutingModule{}
export const routingComponents = [ThUsersComponent,HomepageComponent,LoginComponent,ThCountriesComponent,
    ThFonctionsComponent,ThGradeComponent,ThDepartementsComponent,ThProjectsComponent,ThZonesComponent
    ,ThClassesComponent,ThTypefraisComponent,ThZonesComponent,ThChangappointmentComponent,
    ThKeywordsComponent,ThCategoriesComponent,ThThemeEditComponent
    ,NotfoundcomponentComponent,EntBudgyearinsertComponent
    ,ProjBudgyearinsertComponent, ProjBudgyeareditComponent,EntBudgyeareditComponent,ThOrganisationsComponent
    ,ConfirmbudgYearComponent,MMissionairesComponent,MMissionsComponent,MAutoriMissionsComponent
    ,MMissionsEditComponent,MFraisdestComponent,MConfirmMissionsComponent,ThGroupesComponent,SMainpanelComponent,MConfirmavanceComponent
]