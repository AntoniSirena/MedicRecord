import moment from "moment";

export interface IMedicalCenterDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserId: number | undefined;
    lastModificationTime: moment.Moment | undefined;
    lastModifierUserId: number | undefined;
    isDeleted: boolean;
    deleterUserId: number | undefined;
    deletionTime: moment.Moment | undefined;
    name: string | undefined;
    phoneNumber: string | undefined;
    schedule: string | undefined;
    address: string | undefined;
    tenantId: number | undefined;
}

export class MedicalCenterDto implements IMedicalCenterDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserId: number | undefined;
    lastModificationTime: moment.Moment | undefined;
    lastModifierUserId: number | undefined;
    isDeleted: boolean;
    deleterUserId: number | undefined;
    deletionTime: moment.Moment | undefined;
    name: string | undefined;
    phoneNumber: string | undefined;
    schedule: string | undefined;
    address: string | undefined;
    tenantId: number | undefined;

    constructor(data?: IMedicalCenterDto) {
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
            this.name = _data["name"];
            this.phoneNumber = _data["phoneNumber"];
            this.schedule = _data["schedule"];
            this.address = _data["address"];
            this.tenantId = _data["tenantId"];
        }
    }

    static fromJS(data: any): MedicalCenterDto {
        data = typeof data === 'object' ? data : {};
        let result = new MedicalCenterDto();
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
        data["name"] = this.name;
        data["phoneNumber"] = this.phoneNumber;
        data["schedule"] = this.schedule;
        data["address"] = this.address;
        data["tenantId"] = this.tenantId;
        return data;
    }

    clone(): MedicalCenterDto {
        const json = this.toJSON();
        let result = new MedicalCenterDto();
        result.init(json);
        return result;
    }
}


export interface IMedicalCenterPagedResultDto {
    items: MedicalCenterDto[] | undefined;
    totalCount: number;
}

export class MedicalCenterPagedResultDto implements IMedicalCenterPagedResultDto {
    items: MedicalCenterDto[] | undefined;
    totalCount: number;

    constructor(data?: IMedicalCenterPagedResultDto) {
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
                    this.items.push(MedicalCenterDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): MedicalCenterPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new MedicalCenterPagedResultDto();
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

    clone(): MedicalCenterPagedResultDto {
        const json = this.toJSON();
        let result = new MedicalCenterPagedResultDto();
        result.init(json);
        return result;
    }
}
