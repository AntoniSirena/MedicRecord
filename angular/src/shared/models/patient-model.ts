import moment from "moment";
import { MedicalCenterDto } from "./medical-center-model";

export interface IPatientDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserId: number | undefined;
    lastModificationTime: moment.Moment | undefined;
    lastModifierUserId: number | undefined;
    isDeleted: boolean;
    deleterUserId: number | undefined;
    deletionTime: moment.Moment | undefined;
    isActive: boolean | undefined;
    tenantId: number | undefined;

    recordNumber: number;
    firstName: string;
    secondName: string;
    firstSurname: string;
    secondSurname: string;
    motherNames: string;
    motherSurnames: string;
    fatherNames: string;
    fatherSurnames: string;
    motherIDNumber: number;
    birthDate: Date;
    size: number;
    weight: number;
    headCircumference: number;
    bloodTypeId: number;
    medicalCenterId: number;
    medicalCenter: MedicalCenterDto;
}

export class PatientDto implements IPatientDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserId: number | undefined;
    lastModificationTime: moment.Moment | undefined;
    lastModifierUserId: number | undefined;
    isDeleted: boolean;
    deleterUserId: number | undefined;
    deletionTime: moment.Moment | undefined;
    isActive: boolean | undefined;
    tenantId: number | undefined;

    recordNumber: number;
    firstName: string;
    secondName: string;
    firstSurname: string;
    secondSurname: string;
    motherNames: string;
    motherSurnames: string;
    fatherNames: string;
    fatherSurnames: string;
    motherIDNumber: number;
    birthDate: any;
    size: number;
    weight: number;
    headCircumference: number;
    bloodTypeId: number;
    medicalCenterId: number;
    medicalCenter: MedicalCenterDto;

    constructor(data?: IPatientDto) {
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
            this.isActive = _data["isActive"];
            this.tenantId = _data["tenantId"];

            this.recordNumber = _data["recordNumber"];
            this.firstName = _data["firstName"];
            this.secondName = _data["secondName"];
            this.firstSurname = _data["firstSurname"];
            this.secondSurname = _data["secondSurname"];
            this.motherNames = _data["motherNames"];
            this.motherSurnames = _data["motherSurnames"];
            this.fatherNames = _data["fatherNames"];
            this.fatherSurnames = _data["fatherSurnames"];
            this.motherIDNumber = _data["motherIDNumber"];
            this.birthDate = _data["birthDate"];
            this.size = _data["size"];
            this.weight = _data["weight"];
            this.headCircumference = _data["headCircumference"];
            this.bloodTypeId = _data["bloodTypeId"];
            this.medicalCenterId = _data["medicalCenterId"];
            this.medicalCenter = _data["medicalCenter"];
        }
    }

    static fromJS(data: any): PatientDto {
        data = typeof data === 'object' ? data : {};
        let result = new PatientDto();
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
        data["isActive"] = this.isActive;
        data["tenantId"] = this.tenantId;

        data["recordNumber"] = this.recordNumber;
        data["firstName"] = this.firstName;
        data["secondName"] = this.secondName;
        data["firstSurname"] = this.firstSurname;
        data["secondSurname"] = this.secondSurname;
        data["motherNames"] = this.motherNames;
        data["motherSurnames"] = this.motherSurnames;
        data["fatherNames"] = this.fatherNames;
        data["fatherSurnames"] = this.fatherSurnames;
        data["motherIDNumber"] = this.motherIDNumber;
        data["birthDate"] = this.birthDate;
        data["size"] = this.size;
        data["weight"] = this.weight;
        data["headCircumference"] = this.headCircumference;
        data["bloodTypeId"] = this.bloodTypeId;
        data["medicalCenterId"] = this.medicalCenterId;
        data["medicalCenter"] = this.medicalCenter;

        return data;
    }

    clone(): PatientDto {
        const json = this.toJSON();
        let result = new PatientDto();
        result.init(json);
        return result;
    }
}


export interface IPatientPagedResultDto {
    items: PatientDto[] | undefined;
    totalCount: number;
}

export class PatientPagedResultDto implements IPatientPagedResultDto {
    items: PatientDto[] | undefined;
    totalCount: number;

    constructor(data?: IPatientPagedResultDto) {
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
                    this.items.push(PatientDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): PatientPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new PatientPagedResultDto();
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

    clone(): PatientPagedResultDto {
        const json = this.toJSON();
        let result = new PatientPagedResultDto();
        result.init(json);
        return result;
    }
}
