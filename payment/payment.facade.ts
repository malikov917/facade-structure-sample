import {Injectable} from '@angular/core';
import {PanelState} from "../panel.state";
import cloneDeep from "lodash/cloneDeep";
import {UpdateStripeCard} from "../../model";
import {PanelFacade} from "../panel.facade";
import {PortalUserService} from "../../services/portal-user.service";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class PaymentFacade {

	constructor(
		private panelState: PanelState, private panelFacade: PanelFacade,
		private portalUserService: PortalUserService
		) {
	}
	
	isUpdating$() {
		return this.panelState.isUpdating$();
	}

	getEnumService$() {
		return this.panelState.getEnumService$();
	}

	getPortalMember$() {
		return this.panelState.getPortalMember$();
	}
	
	getPaymentProcess$() {
		return this.panelState.getPaymentProcess$();
	}

	checkCardError() {
		this.panelFacade.checkCardError();
	}

	setDefaultPaymentProcess() {
		this.panelState.setPaymentProcess({
			editMode: false,
			copy: {...cloneDeep(this.panelState.portalMemberValue.Payment)}
		});
	};

	editModeEnable() {
		this.panelState.setPaymentProcess({
			editMode: true,
			copy: cloneDeep(this.panelState.portalMemberValue.Payment)
		})
	}

	private async createPaymentMethod(card, stripe): Promise<any> {
		return await stripe.createPaymentMethod({
			type: 'card',
			card: card
		});
	}

	private async confirmPaymentMethod(stripe, data): Promise<any> {
		return await stripe.confirmCardPayment(data.clientSecret)
	}
	
	async updateStripeCard(card: any, stripe: any, stripeCustomerId: string) {
		this.panelState.setUpdating(true);
		try {
			const pm = await this.createPaymentMethod(card, stripe);
			if (Boolean(pm.error)) throw pm.error.message;

			const model: UpdateStripeCard = { PaymentMethodId: pm.paymentMethod.id, StripeCustomerId: stripeCustomerId };
			const response: UpdateStripeCard = await this.portalUserService.updateStripeCard(model).toPromise();

			if (response.PaymentMethodId !== pm.paymentMethod.id) throw 'something went wrong, please contact an administrator';
			if (response.RequiresAction) {
				await this.confirmPaymentMethod(stripe, { clientSecret: response.ClientSecret });
			}
			this.editModeDisable();
			if (Boolean(this.panelState.portalMemberValue.ErrorCardReason)) await this.finishFixingCardError(stripeCustomerId).toPromise();
			this.panelFacade.refreshPortalMember();
		} catch (e) {
			// todo refactor that getelementbyid code
			var el = document.getElementById('card-errors');
			if (Boolean(e.error)) e = e.error.ExceptionMessage;
			el.textContent = e;
			this.panelState.setUpdating(false);
		}
		this.panelState.setUpdating(false);
	}
	
	finishFixingCardError(stripeCustomerId: string): Observable<void> {
		return this.portalUserService.finishFixingCardError(stripeCustomerId);
	}

	getClientSecretFromPaymentIntent(model: UpdateStripeCard): Observable<UpdateStripeCard> {
		return this.portalUserService.getClientSecretFromPaymentIntent(model);
	}

	async verifyCard(stripe: any, stripeCustomerId: string) {
		this.panelState.setUpdating(true);
		const model: UpdateStripeCard = { StripeCustomerId: stripeCustomerId };
		const response: UpdateStripeCard = await this.getClientSecretFromPaymentIntent(model).toPromise();
		const confirmation = await this.confirmPaymentMethod(stripe, { clientSecret: response.ClientSecret });
		if (Boolean(confirmation.paymentIntent.id)) await this.finishFixingCardError(stripeCustomerId).toPromise();
		this.panelState.setUpdating(false);
		this.panelFacade.refreshPortalMember();
	}

	
}
