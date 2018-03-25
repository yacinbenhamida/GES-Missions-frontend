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
import { ThKeywordEdtComponent } from './th-keyword-edt/th-keyword-edt.component';
import { ThEditFctComponent } from './th-edit-fct/th-edit-fct.component';
import { ThEditZoneComponent } from './th-edit-zone/th-edit-zone.component';
import { ThCountriesEditComponent } from './th-countries-edit/th-countries-edit.component';
import { ThCategEditComponent } from './th-categ-edit/th-categ-edit.component';
import { ThGradeEditComponent } from './th-grade-edit/th-grade-edit.component';
import { ThClassesEditComponent } from './th-classes-edit/th-classes-edit.component';
import { ThProjectsEditComponent } from './th-projects-edit/th-projects-edit.component';
import { NotfoundcomponentComponent } from './notfoundcomponent/notfoundcomponent.component';
import { ThUserEditComponent } from './th-user-edit/th-user-edit.component';
import { ThDepartementEditComponent } from './th-departement-edit/th-departement-edit.component';
import { EntBudgyearinsertComponent } from './ent-budgyearinsert/ent-budgyearinsert.component';
import { ProjBudgyearinsertComponent } from './proj-budgyearinsert/proj-budgyearinsert.component';
import { ProjBudgyeareditComponent } from './proj-budgyearedit/proj-budgyearedit.component';
import { EntBudgyeareditComponent } from './ent-budgyearedit/ent-budgyearedit.component';
import { ThOrganisationsComponent } from './th-organisations/th-organisations.component';
import { ThOrganisEditComponent } from './th-organis-edit/th-organis-edit.component';
import { ConfirmbudgYearComponent } from './confirmbudg-year/confirmbudg-year.component';
import { MMissionairesComponent } from './m-missionaires/m-missionaires.component';
import { MMissionairesEditComponent } from './m-missionaires-edit/m-missionaires-edit.component';
import { MMissionsComponent } from './m-missions/m-missions.component';
import { MMissionsEditComponent } from './m-missions-edit/m-missions-edit.component';
import { MFraisdestComponent } from './m-fraisdest/m-fraisdest.component';

const appRoutes: Routes = [
   // missions
  { path : 'm-missionaires' , component : MMissionairesComponent,
        children:[
                    {path: 'editMissionaire/:id',component : MMissionairesEditComponent}
                ]
            },
    { path : 'm-fraisdest' , component : MFraisdestComponent},
    { path : 'm-missions' , component : MMissionsComponent },
    { path: 'm-editmissions' , component : MMissionsEditComponent},
  // end missions
  { path : 'th-users',component : ThUsersComponent,
        children:[
                {path : 'editUser/:id',component :ThUserEditComponent}
        ]
    },
  { path : 'home', component : HomepageComponent },
  { path: '', redirectTo: '/login',pathMatch: 'full'},
  { path : 'login' , component : LoginComponent},
  { path : 'th-countries' , component : ThCountriesComponent,
        children:[
                {path:'editCountry/:id',component:ThCountriesEditComponent}
                ]
        },
  { path : 'th-departements' , component : ThDepartementsComponent,
        children : [
            {path : 'editDep/:id',component : ThDepartementEditComponent}
        ]
    },
  { path : 'th-categories' , component : ThCategoriesComponent,
        children:[
                {path:'editCat/:id',component:ThCategEditComponent}
            ]
        },
  { path : 'th-keywords' , component : ThKeywordsComponent,
        children:[
            { path:'editTheme/:id',component:ThThemeEditComponent },
            { path:'editkeyWord/:id',component:ThKeywordEdtComponent }
            ]
        },
  { path : 'th-classes' , component : ThClassesComponent},
  { path : 'th-grade' , component : ThGradeComponent,
        children: [
                {path: 'editGrade/:id',component:ThGradeEditComponent}
            ]
        },
  { path : 'th-projects' , component : ThProjectsComponent,
        children : [
                {path : 'editProject/:id',component:ThProjectsEditComponent}
            ]
        },
  { path : 'th-typefrais' , component : ThTypefraisComponent},
  { path : 'th-changeAppointment' , component : ThChangappointmentComponent},
  { path : 'th-zone' , component : ThZonesComponent,
        children : [
            {path:'editZone/:id',component:ThEditZoneComponent}
        ]},
  { path : 'th-classes' , component : ThClassesComponent,
        children : [
                {path : 'editClass/:id',component : ThClassesEditComponent}
            ]
        },
  { path : 'th-fonct' , component : ThFonctionsComponent,
        children:[
               {path:'editFct/:id', component:ThEditFctComponent}
        ]
    },
  { path : 'th-org', component : ThOrganisationsComponent,
  children:[
      {path : 'editOrg/:id' , component : ThOrganisEditComponent}
  ] }, 
  { path : 'confirmbudg-year' , component : ConfirmbudgYearComponent},
  { path : 'insbud-org',component: EntBudgyearinsertComponent },
  { path :  'insbudg-proj', component : ProjBudgyearinsertComponent },
  { path :  'updbudg-proj', component :  ProjBudgyeareditComponent },
  { path : 'updbudg-org', component : EntBudgyeareditComponent },
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
    ThKeywordsComponent,ThCategoriesComponent,ThThemeEditComponent,ThKeywordEdtComponent,ThEditFctComponent,
    ThEditZoneComponent,ThCountriesEditComponent,ThCategEditComponent,ThGradeEditComponent,ThClassesEditComponent
    ,NotfoundcomponentComponent,ThProjectsEditComponent,ThUserEditComponent,ThDepartementEditComponent,EntBudgyearinsertComponent
    ,ProjBudgyearinsertComponent, ProjBudgyeareditComponent,EntBudgyeareditComponent,ThOrganisationsComponent,ThOrganisEditComponent
    ,ConfirmbudgYearComponent,MMissionairesComponent,MMissionairesEditComponent,MMissionsComponent
    ,MMissionsEditComponent,MFraisdestComponent
]