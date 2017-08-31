import {Component} from "@angular/core";
import {DomainsService} from "./domains.service";
import {Router,ActivatedRoute} from "@angular/router";
import {guid} from "../shared/utilities/guid";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./domain-edit-page.component.html",
    styleUrls: ["./domain-edit-page.component.css"],
    selector: "ce-domain-edit-page"
})
export class DomainEditPageComponent {
    constructor(private _domainsService: DomainsService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _correlationIdsList: CorrelationIdsList
    ) { }

    public async ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"]) {            
            this.domain = (await this._domainsService.getById({ id: this._activatedRoute.snapshot.params["id"] }).toPromise()).domain;
        }
    }

    public tryToSave($event) {
        const correlationId = this._correlationIdsList.newId();
        this._domainsService.addOrUpdate({ domain: $event.detail.domain, correlationId }).subscribe();
        this._router.navigateByUrl("/domains");
    }

    public domain = {};
}
