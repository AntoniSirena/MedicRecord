import moment from "moment";

export interface ISymptomDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserId: number | undefined;
    lastModificationTime: moment.Moment | undefined;
    lastModifierUserId: number | undefined;
    isDeleted: boolean;
    deleterUserId: number | undefined;
    deletionTime: moment.Moment | undefined;
    code: string | undefined;
    name: string | undefined;
    description: string | undefined;
    isActive: boolean | undefined;
    tenantId: number | undefined;
}

export class SymptomDto implements ISymptomDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserId: number | undefined;
    lastModificationTime: moment.Moment | undefined;
    lastModifierUserId: number | undefined;
    isDeleted: boolean;
    deleterUserId: number | undefined;
    deletionTime: moment.Moment | undefined;
    code: string | undefined;
    name: string | undefined;
    description: string | undefined;
    isActive: boolean | undefined;
    tenantId: number | undefined;

    constructor(data?: ISymptomDto) {
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
            this.code = _data["code"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.isActive = _data["isActive"];
            this.tenantId = _data["tenantId"];
        }
    }

    static fromJS(data: any): SymptomDto {
        data = typeof data === 'object' ? data : {};
        let result = new SymptomDto();
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
        data["code"] = this.code;
        data["name"] = this.name;
        data["description"] = this.description;
        data["isActive"] = this.isActive;
        data["tenantId"] = this.tenantId;
        return data;
    }

    clone(): SymptomDto {
        const json = this.toJSON();
        let result = new SymptomDto();
        result.init(json);
        return result;
    }
}


export interface ISymptomPagedResultDto {
    items: SymptomDto[] | undefined;
    totalCount: number;
}

export class SymptomPagedResultDto implements ISymptomPagedResultDto {
    items: SymptomDto[] | undefined;
    totalCount: number;

    constructor(data?: ISymptomPagedResultDto) {
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
                    this.items.push(SymptomDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): SymptomPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new SymptomPagedResultDto();
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

    clone(): SymptomPagedResultDto {
        const json = this.toJSON();
        let result = new SymptomPagedResultDto();
        result.init(json);
        return result;
    }
}
