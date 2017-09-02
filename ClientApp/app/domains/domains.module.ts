import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { UsersModule } from "../users/users.module";

import { AuthGuardService } from "../shared/guards/auth-guard.service";
import { TenantGuardService } from "../shared/guards/tenant-guard.service";
import { EventHubConnectionGuardService } from "../shared/guards/event-hub-connection-guard.service";
import { CurrentUserGuardService } from "../users/current-user-guard.service";

import { DomainsService } from "./domains.service";

import { DomainEditComponent } from "./domain-edit.component";
import { DomainEditPageComponent } from "./domain-edit-page.component";
import { DomainListItemComponent } from "./domain-list-item.component";
import { DomainPaginatedListComponent } from "./domain-paginated-list.component";
import { DomainPaginatedListPageComponent } from "./domain-paginated-list-page.component";
import { DomainsLeftNavComponent } from "./domains-left-nav.component";

export const DOMAIN_ROUTES: Routes = [{
    path: 'domains',
    component: DomainPaginatedListPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'domains/create',
    component: DomainEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'domains/:id',
    component: DomainEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
}];

const declarables = [
    DomainEditComponent,
    DomainEditPageComponent,
    DomainListItemComponent,
    DomainPaginatedListComponent,
    DomainPaginatedListPageComponent,
    DomainsLeftNavComponent
];

const providers = [DomainsService];

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(DOMAIN_ROUTES), SharedModule, UsersModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class DomainsModule { }
