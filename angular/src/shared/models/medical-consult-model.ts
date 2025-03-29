import moment from "moment";
import { PatientDto } from "./patient-model";
import { State } from './common-model';

export interface IMedicalConsultDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserId: number | undefined;
    lastModificationTime: moment.Moment | undefined;
    lastModifierUserId: number | undefined;
    isDeleted: boolean;
    deleterUserId: number | undefined;
    deletionTime: moment.Moment | undefined;
    patientId: number | undefined;
    medicalAgeId: number | undefined;
    stateId: number | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    nextDate: Date | undefined;
    size: number | undefined;
    weight: number | undefined;
    headCircumference: number | undefined;
    note: string | undefined;
    reasonConsult: string | undefined;
    isActive: boolean | undefined;
    tenantId: number | undefined;
    patient: PatientDto;
    state: State;
}

export class MedicalConsultDto implements IMedicalConsultDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserId: number | undefined;
    lastModificationTime: moment.Moment | undefined;
    lastModifierUserId: number | undefined;
    isDeleted: boolean;
    deleterUserId: number | undefined;
    deletionTime: moment.Moment | undefined;
    patientId: number | undefined;
    medicalAgeId: number | undefined;
    stateId: number | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    nextDate: Date | undefined;
    size: number | undefined;
    weight: number | undefined;
    headCircumference: number | undefined;
    note: string | undefined;
    reasonConsult: string | undefined;
    isActive: boolean | undefined;
    tenantId: number | undefined;
    patient: PatientDto;
    state: State;

    constructor(data?: IMedicalConsultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
            this.creatorUserId = _data["creatorUserId"];
            this.lastModificationTime = _data["lastModificationTime"] ? moment(_data["lastModificationTime"].toString()) : <any>undefined;
            this.lastModifierUserId = _data["lastModifierUserId"];
            this.isDeleted = _data["isDeleted"];
            this.deleterUserId = _data["deleterUserId"];
            this.deletionTime = _data["deletionTime"] ? moment(_data["deletionTime"].toString()) : <any>undefined;
            this.patientId = _data["patientId"];
            this.medicalAgeId = _data["medicalAgeId"];
            this.stateId = _data["stateId"];
            this.startDate = _data["startDate"];
            this.endDate = _data["endDate"];
            this.nextDate = _data["nextDate"];
            this.size = _data["size"];
            this.weight = _data["weight"];
            this.headCircumference = _data["headCircumference"];
            this.reasonConsult = _data["reasonConsult"];
            this.note = _data["note"];
            this.isActive = _data["isActive"];
            this.tenantId = _data["tenantId"];
            this.patient = _data["patient"];
            this.state = _data["state"];
        }
    }

    static fromJS(data: any): MedicalConsultDto {
        data = typeof data === 'object' ? data : {};
        let result = new MedicalConsultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["creatorUserId"] = this.creatorUserId;
        data["lastModificationTime"] = this.lastModificationTime ? this.lastModificationTime.toISOString() : <any>undefined;
        data["lastModifierUserId"] = this.lastModifierUserId;
        data["isDeleted"] = this.isDeleted;
        data["deleterUserId"] = this.deleterUserId;
        data["deletionTime"] = this.deletionTime ? this.deletionTime.toISOString() : <any>undefined;
        data["patientId"] = this.patientId;
        data["medicalAgeId"] = this.medicalAgeId;
        data["stateId"] = this.stateId;
        data["startDate"] = this.startDate;
        data["endDate"] = this.endDate;
        data["nextDate"] = this.nextDate;
        data["size"] = this.size;
        data["weight"] = this.weight;
        data["headCircumference"] = this.headCircumference;
        data["note"] = this.note;
        data["reasonConsult"] = this.reasonConsult;
        data["isActive"] = this.isActive;
        data["tenantId"] = this.tenantId;
        data["patient"] = this.patient;
        data["state"] = this.state;
        return data;
    }

    clone(): MedicalConsultDto {
        const json = this.toJSON();
        let result = new MedicalConsultDto();
        result.init(json);
        return result;
    }
}


export interface IMedicalConsultPagedResultDto {
    items: MedicalConsultDto[] | undefined;
    totalCount: number;
}

export class MedicalConsultPagedResultDto implements IMedicalConsultPagedResultDto {
    items: MedicalConsultDto[] | undefined;
    totalCount: number;

    constructor(data?: IMedicalConsultPagedResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items.push(MedicalConsultDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): MedicalConsultPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new MedicalConsultPagedResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        data["totalCount"] = this.totalCount;
        return data;
    }

    clone(): MedicalConsultPagedResultDto {
        const json = this.toJSON();
        let result = new MedicalConsultPagedResultDto();
        result.init(json);
        return result;
    }
}