import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException } from '@shared/service-proxies/service-proxies';



//#region Servicio Common Lookup ComboBoxes
@Injectable()
export class CommonLookupComboBoxService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "";
    }
    
/**
     * @param body (optional) 
     * @return Success
     */
    
getComboBoxes(): Observable<CommonComboBoxOutputDto> {        
    let url_ = this.baseUrl + "/api/services/app/CommonComboBox/GetComboBoxes";
    url_ = url_.replace(/[?&]$/, "");

    let options_ : any = {
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
            "Content-Type": "application/json-patch+json",
            "Accept": "text/plain"
        })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        return this.processGetComboBoxes(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processGetComboBoxes(response_ as any);
            } catch (e) {
                return _observableThrow(e) as any as Observable<CommonComboBoxOutputDto>;
            }
        } else
            return _observableThrow(response_) as any as Observable<CommonComboBoxOutputDto>;
    }));
}
protected processGetComboBoxes(response: HttpResponseBase): Observable<CommonComboBoxOutputDto> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
    if (status === 200) {
        return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CommonComboBoxOutputDto.fromJS(resultData200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf(null as any);
}
    
}

export class CommonComboBoxOutputDto implements ICommonComboBoxOutputDto {    
    bloodTypes: ComboboxItemDto[];
    medicalCenters: ComboboxItemDto[];
    
    constructor(data?: ICommonComboBoxOutputDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {            
           
            this.bloodTypes = _data["bloodTypes"];
            this.medicalCenters = _data["medicalCenters"];
        }
    }

    static fromJS(data: any): CommonComboBoxOutputDto {
        data = typeof data === 'object' ? data : {};
        let result = new CommonComboBoxOutputDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};        
      
        data["bloodTypes"] = this.bloodTypes;
        data["medicalCenters"] = this.medicalCenters;
       
        return data;
    }

    clone(): CommonComboBoxOutputDto {
        const json = this.toJSON();
        let result = new CommonComboBoxOutputDto();
        result.init(json);
        return result;
    } 

}
export interface ICommonComboBoxOutputDto {   
    bloodTypes: ComboboxItemDto[];
    medicalCenters: ComboboxItemDto[];
}
export interface ComboboxItemDto{
    id:number;
    displayText: string;
}



export class CommonComboBoxInputDto implements ICommonComboBoxInputDto {
    entityName: string;   
    constructor(data?: ICommonComboBoxInputDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(_data?: any) {
        if (_data) {
            
            this.entityName = _data["entityName"];
        }
    }
    static fromJS(data: any): CommonComboBoxInputDto {
        data = typeof data === 'object' ? data : {};
        let result = new CommonComboBoxInputDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        
        data["entityName"] = this.entityName;
       
        return data;
    }
    clone(): CommonComboBoxInputDto {
        const json = this.toJSON();
        let result = new CommonComboBoxInputDto();
        result.init(json);
        return result;
    }
}

export interface ICommonComboBoxInputDto{
    entityName:string
}
//#endregion CommonLooupComboBoxes

