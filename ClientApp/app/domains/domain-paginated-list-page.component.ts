import {Component, ChangeDetectorRef} from "@angular/core";
import {DomainsService} from "./domains.service";
import {Router} from "@angular/router";
import {pluckOut} from "../shared/utilities/pluck-out";
import {EventHub} from "../shared/services/event-hub";
import {Subscription} from "rxjs/Subscription";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./domain-paginated-list-page.component.html",
    styleUrls: ["./domain-paginated-list-page.component.css"],
    selector: "ce-domain-paginated-list-page"   
})
export class DomainPaginatedListPageComponent {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _domainsService: DomainsService,
        private _correlationIdsList: CorrelationIdsList,
        private _eventHub: EventHub,
        private _router: Router
    ) {
        this.subscription = this._eventHub.events.subscribe(x => {      
            
            if (this._correlationIdsList.hasId(x.payload.correlationId) && x.type == "[Domains] DomainAddedOrUpdated") {
                this._domainsService.get().toPromise().then(x => {
                    this.unfilteredDomains = x.domains;
                    this.domains = this.filterTerm != null ? this.filteredDomains : this.unfilteredDomains;
                    this._changeDetectorRef.detectChanges();
                });
            } else if (x.type == "[Domains] DomainAddedOrUpdated") {
                
            }
        });      
    }
    
    public async ngOnInit() {
        this.unfilteredDomains = (await this._domainsService.get().toPromise()).domains;   
        this.domains = this.filterTerm != null ? this.filteredDomains : this.unfilteredDomains;       
    }

    public tryToDelete($event) {        
        const correlationId = this._correlationIdsList.newId();

        this.unfilteredDomains = pluckOut({
            items: this.unfilteredDomains,
            value: $event.detail.domain.id
        });

        this.domains = this.filterTerm != null ? this.filteredDomains : this.unfilteredDomains;
        
        this._domainsService.remove({ domain: $event.detail.domain, correlationId }).subscribe();
    }

    public tryToEdit($event) {
        this._router.navigate(["domains", $event.detail.domain.id]);
    }

    public handleDomainsFilterKeyUp($event) {
        this.filterTerm = $event.detail.value;
        this.pageNumber = 1;
        this.domains = this.filterTerm != null ? this.filteredDomains : this.unfilteredDomains;        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }

    private subscription: Subscription;
    public _domains: Array<any> = [];
    public filterTerm: string;
    public pageNumber: number;

    public domains: Array<any> = [];
    public unfilteredDomains: Array<any> = [];
    public get filteredDomains() {
        return this.unfilteredDomains.filter((x) => x.email.indexOf(this.filterTerm) > -1);
    }
}
