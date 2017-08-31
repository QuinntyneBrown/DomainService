import {Component,Input,Output,EventEmitter} from "@angular/core";

@Component({
    templateUrl: "./domain-list-item.component.html",
    styleUrls: [
        "../../styles/list-item.css",
        "./domain-list-item.component.css"
    ],
    selector: "ce-domain-list-item"
})
export class DomainListItemComponent {  
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();		
    }
      
    @Input()
    public domain: any = {};
    
    @Output()
    public edit: EventEmitter<any>;

    @Output()
    public delete: EventEmitter<any>;        
}
