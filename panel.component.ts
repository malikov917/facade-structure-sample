import { Component, OnInit } from '@angular/core';
import { PanelState } from "./panel.state";
import {PanelFacade} from "./panel.facade";

@Component({
    selector: 'panel-portal',
    templateUrl: 'panel.component.html'
})
export class PanelComponent implements OnInit {

    user: PortalModel;

    constructor( private panelFacade: PanelFacade ) { }

    ngOnInit() {
        this.panelFacade.getPortalMember()
            .subscribe((member: PortalMember) => this.user = member);
    }

    ngAfterViewInit(): void {
    	this.panelFacade.checkCardError();
    }

}
