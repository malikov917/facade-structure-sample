import {Injectable} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {tap} from "rxjs/operators";
import {PanelState} from "./panel.state";
import {UpdateCardPopupComponent} from "./payment/update-card/update-card.component";
import {MatDialog} from "@angular/material";

@Injectable({
	providedIn: 'root'
})
export class PanelFacade {

	constructor(private authService: AuthService, private panelState: PanelState, private dialog: MatDialog) {
	}

	getPortalMember(): Observable<PortalMember> {
		return this.panelState.getPortalMember$();
	}

	refreshPortalMember(): void {
		this.authService.getPortalUser()
			.pipe(tap(portalMember => this.panelState.setPortalMember(portalMember)))
			.subscribe();
	}

	checkCardError() {
		const cardError = this.panelState.portalMemberValue.Customer.CardError;
		if (!Boolean(cardError)) return;
		const errorCardReason = this.panelState.enumServiceValue.creditCardErrorText[cardError];
		this.panelState.setPortalMember({ErrorCardReason: errorCardReason, ...this.panelState.portalMemberValue});
		const dialogRef = this.dialog.open(UpdateCardPopupComponent, {data: {errorCardReason: errorCardReason}});
		dialogRef.afterClosed().subscribe();
	}
}
