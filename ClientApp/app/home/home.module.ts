import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { TenantGuardService } from "../shared/guards/tenant-guard.service";
import { AuthGuardService } from "../shared/guards/auth-guard.service";
import { EventHubConnectionGuardService } from "../shared/guards/event-hub-connection-guard.service";
import { HomePageComponent } from "./home-page.component";
import { RouterModule } from "@angular/router";

const declarables = [HomePageComponent];
const providers = [];

export const HOME_ROUTES = [
    {
        path: '',
        component: HomePageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService,
            EventHubConnectionGuardService
        ]
    }
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(HOME_ROUTES), SharedModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers,
    entryComponents: []
})
export class HomeModule { }
