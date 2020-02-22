import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {PortalModel} from '../model/portalMember.model';
import {flatMap} from "rxjs/operators";
import {PanelState} from "../panel/panel.state";
import {of} from "rxjs";

@Injectable()
export class AuthUserResolve implements Resolve<PortalModel> {
	constructor(private authService: AuthService, private panelState: PanelState) {
	}

	resolve(route: ActivatedRouteSnapshot) {
		return this.authService.getPortalUser().pipe(flatMap(portalMember => {
			this.panelState.setPortalMember(portalMember);
			return of(portalMember);
		}));
	}
}
