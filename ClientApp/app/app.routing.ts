import {Routes, RouterModule} from '@angular/router';

import { DOMAIN_ROUTES } from "./domains/domains.module";
import { HOME_ROUTES } from "./home/home.module";
import { TENANT_ROUTES } from "./tenants/tenants.module";
import { USER_ROUTES } from "./users/users.module";

export const RoutingModule = RouterModule.forRoot([
    ...DOMAIN_ROUTES,
    ...HOME_ROUTES,
    ...TENANT_ROUTES,
    ...USER_ROUTES
]);