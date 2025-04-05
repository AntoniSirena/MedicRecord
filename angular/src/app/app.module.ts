import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';

import { DatePipe } from '@angular/common';

import { MedicalCenterComponent } from './domain/medical-center/medical-center.component';
import { CreateMedicalCenterDialogComponent } from './domain/medical-center/create-medical-center/create-medical-center-dialog/create-medical-center-dialog.component';
import { EditMedicalCenterDialogComponent } from './domain/medical-center/edit-medical-center/edit-medical-center-dialog/edit-medical-center-dialog.component';

import { SymptomComponent } from './domain/symptom/symptom.component';
import { CreateSymptomDialogComponent } from './domain/symptom/create-symptom/create-symptom-dialog/create-symptom-dialog.component';
import { EditSymptomDialogComponent } from './domain/symptom/edit-symptom/edit-symptom-dialog/edit-symptom-dialog.component';

import { DiseaseComponent } from './domain/disease/disease.component';
import { CreateDiseaseDialogComponent } from './domain/disease/create-disease/create-disease-dialog/create-disease-dialog.component';
import { EditDiseaseDialogComponent } from './domain/disease/edit-disease/edit-disease-dialog/edit-disease-dialog.component';

import { PatientComponent } from './domain/patient/patient.component';
import { CreatePatientDialogComponent } from './domain/patient/create-patient/create-patient-dialog/create-patient-dialog.component';
import { EditPatientDialogComponent } from './domain/patient/edit-patient/edit-patient-dialog/edit-patient-dialog.component';

import { MedicalConsultComponent } from './domain/medical-consult/medical-consult.component';
import { CreateMedicalConsultComponent } from './domain/medical-consult/create-medical-consult/create-medical-consult.component';
import { EditMedicalConsultComponent } from './domain/medical-consult/edit-medical-consult/edit-medical-consult.component';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


@NgModule({
    declarations: [
        AppComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,

        MedicalCenterComponent,
        CreateMedicalCenterDialogComponent,
        EditMedicalCenterDialogComponent,

        SymptomComponent,
        CreateSymptomDialogComponent,
        EditSymptomDialogComponent,

        DiseaseComponent,
        CreateDiseaseDialogComponent,
        EditDiseaseDialogComponent,

        PatientComponent,
        CreatePatientDialogComponent,
        EditPatientDialogComponent,

        MedicalConsultComponent,
        CreateMedicalConsultComponent,
        EditMedicalConsultComponent,
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        ServiceProxyModule,
        NgxPaginationModule,
        SharedModule,
        AngularMultiSelectModule,
    ],
    providers: [
        DatePipe,
    ]
})
export class AppModule { }
