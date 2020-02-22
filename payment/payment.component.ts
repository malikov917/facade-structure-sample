import {Component, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from '../../../language.service';
import {AuthService} from '../../services/auth.service';
import {PaymentProcessModel, PortalModel} from '../../model/portalMember.model';
import {StripeData} from "../../stripe-payments/stripe-data.interface";
import {PaymentFacade} from "./payment.facade";
import {Observable} from "rxjs";
import { PaymentMethod } from '../../model/paymentMethod.enum';

@Component({
	selector: 'payment-portal',
	templateUrl: 'payment.component.html'
})

export class PaymentComponent {
	stripeData: StripeData;
	stripeCardValid;
	PaymentMethod = PaymentMethod;

	isUpdating$: Observable<boolean>;
	user$: Observable<PortalModel>;
	enumService$: Observable<any>;
	paymentProcess$: Observable<PaymentProcessModel>;

	language: any;

	constructor(
		private paymentFacade: PaymentFacade
	) {
		this.user$ = this.paymentFacade.getPortalMember$();
		this.enumService$ = this.paymentFacade.getEnumService$();
		this.paymentProcess$ = this.paymentFacade.getPaymentProcess$();
		this.isUpdating$ = this.paymentFacade.isUpdating$();
		this.paymentFacade.setDefaultPaymentProcess();
	}

	showCardError() {
		this.paymentFacade.checkCardError();
	}

	updateStripeCard(card: any, stripe: any, StripeCustomerId: string) {
		this.paymentFacade.updateStripeCard(card, stripe, StripeCustomerId);
	}

	edit() {		
		this.paymentFacade.editModeEnable();
	}

	verifyCard(stripe: any, StripeCustomerId: string) {
		this.paymentFacade.verifyCard(stripe, StripeCustomerId);
	}

	getCardType() {
		return this.paymentFacade.getCardType();
	}

	hasBillingAddress() {
		return this.paymentFacade.hasBillingAddress();
	}
}
