import { Injectable } from "@angular/core";
import { MedicalConsultDto } from "@shared/models/medical-consult-model";


@Injectable({
    providedIn: 'root'
})

export class LocalDataService {

    constructor() { }

    setLastMedicalConsult(input: MedicalConsultDto){
        localStorage.setItem('medicalConsult', JSON.stringify(input));
    }

    getLastMedicalConsult(): MedicalConsultDto{
        let result: MedicalConsultDto = JSON.parse(localStorage.getItem('medicalConsult') || '{}');
        return result;
    }

}