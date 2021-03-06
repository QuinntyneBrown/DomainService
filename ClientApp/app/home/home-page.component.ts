import {Component, ElementRef} from "@angular/core";
import {PopoverService} from "../shared/services/popover.service";

@Component({
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"],
    selector: "ce-home-page"
})
export class HomePageComponent {
    constructor(
        private _elementRef: ElementRef,
        private _popoverService: PopoverService) { }

    ngOnInit() {

    }
}
