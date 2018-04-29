import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ThChangappointmentComponent } from './th-changappointment/th-changappointment.component';
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

const appRoutes: Routes = [
    // suivit
    {path : 'suivi' , component : SMainpanelComponent},
    //end suivit
   // missions
  { path : 'm-missionaires' , component : MMissionairesComponent},
    { path : 'm-fraisdest' , component : MFraisdestComponent},
    { path : 'm-missions' , component : MMissionsComponent },
    { path: 'm-editmissions' , component : MMissionsEditComponent},
    { path : 'm-confirmmiss' , component : MConfirmMissionsComponent},
  // end missions
  { path : 'th-users',component : ThUsersComponent},
  { path : 'home', component : HomepageComponent },
  { path: '', redirectTo: '/login',pathMatch: 'full'},
  { path : 'login' , component : LoginComponent},
  { path : 'th-countries' , component : ThCountriesComponent, },
  { path : 'th-departements' , component : ThDepartementsComponent},
  { path : 'th-categories' , component : ThCategoriesComponent},
  { path : 'th-keywords' , component : ThKeywordsComponent},
  { path : 'th-grade' , component : ThGradeComponent},
  { path : 'th-projects' , component : ThProjectsComponent },
  { path : 'th-typefrais' , component : ThTypefraisComponent},
  { path : 'th-changeAppointment' , component : ThChangappointmentComponent},
  { path : 'th-zone' , component : ThZonesComponent},
  { path : 'th-classes' , component : ThClassesComponent},
  { path : 'th-fonct' , component : ThFonctionsComponent},
  { path : 'th-org', component : ThOrganisationsComponent },
  { path : 'th-groupes' , component : ThGroupesComponent}, 
  { path : 'confirmbudg-year' , component : ConfirmbudgYearComponent},
  { path : 'insbud-org',component: EntBudgyearinsertComponent },
  { path :  'insbudg-proj', component : ProjBudgyearinsertComponent },
  { path :  'updbudg-proj', component :  ProjBudgyeareditComponent },
  { path : 'updbudg-org', component : EntBudgyeareditComponent },
  { path : 'confirmmissions', component : MAutoriMissionsComponent},
  { path: 'error',component : NotfoundcomponentComponent},
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
    ,ThChangappointmentComponent,ThClassesComponent,ThTypefraisComponent,ThZonesComponent,
    ThKeywordsComponent,ThCategoriesComponent,ThThemeEditComponent
    ,NotfoundcomponentComponent,EntBudgyearinsertComponent
    ,ProjBudgyearinsertComponent, ProjBudgyeareditComponent,EntBudgyeareditComponent,ThOrganisationsComponent
    ,ConfirmbudgYearComponent,MMissionairesComponent,MMissionsComponent,MAutoriMissionsComponent
    ,MMissionsEditComponent,MFraisdestComponent,MConfirmMissionsComponent,ThGroupesComponent,SMainpanelComponent
]