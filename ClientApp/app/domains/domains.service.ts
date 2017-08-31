import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Domain } from "./domain.model";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../shared/services/error.service";

@Injectable()
export class DomainsService {
    constructor(
        private _errorService: ErrorService,
        private _httpClient: HttpClient)
    { }

    public addOrUpdate(options: { domain: Domain, correlationId: string }) {
        return this._httpClient
            .post(`${this._baseUrl}/api/domains/add`, options)
            .catch(this._errorService.catchErrorResponse);
    }

    public get(): Observable<{ domains: Array<Domain> }> {
        return this._httpClient
            .get<{ domains: Array<Domain> }>(`${this._baseUrl}/api/domains/get`)
            .catch(this._errorService.catchErrorResponse);
    }

    public getById(options: { id: number }): Observable<{ domain:Domain}> {
        return this._httpClient
            .get<{domain: Domain}>(`${this._baseUrl}/api/domains/getById?id=${options.id}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public remove(options: { domain: Domain, correlationId: string }) {
        return this._httpClient
            .delete(`${this._baseUrl}/api/domains/remove?id=${options.domain.id}&correlationId=${options.correlationId}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public get _baseUrl() { return ""; }
}
