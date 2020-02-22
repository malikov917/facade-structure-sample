import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {PortalModel} from "../model";
import {PaymentProcessModel} from "../model/portalMember.model";
import {enumService} from "./payment/enumService";

@Injectable({
	providedIn: 'root'
})
export class PanelState {
	private portalMember$ = new BehaviorSubject<PortalModel>(null);
	private paymentProcess$ = new BehaviorSubject<PaymentProcessModel>(null);
	private updating$ = new BehaviorSubject<boolean>(false);
	private cardType$ = new BehaviorSubject<string>('');
	private enumService$ = new BehaviorSubject<any>(enumService);
	
	isUpdating$(): Observable<boolean> {
		return this.updating$.asObservable();
	}
	
	setUpdating(isUpdating: boolean) {
		this.updating$.next(isUpdating);
	}

	get cardTypeValue(): string {
		return this.cardType$.getValue();
	}
	
	getPortalMember$(): Observable<PortalModel> {
		return this.portalMember$.asObservable();
	}
	
	getEnumService$(): Observable<any> {
		return this.enumService$.asObservable();
	}

	get enumServiceValue(): any {
		return this.enumService$.getValue();
	}
	
	get portalMemberValue() {
		return this.portalMember$.getValue();
	}
	
	setPortalMember(portalMember: PortalModel) {
		this.portalMember$.next(portalMember);
	}

	getPaymentProcess$(): Observable<PaymentProcessModel> {
		return this.paymentProcess$.asObservable();
	}
	
	get paymentProcessValue(): PaymentProcessModel {
		return this.paymentProcess$.getValue();
	}

	setPaymentProcess(paymentProcess: PaymentProcessModel) {
		this.paymentProcess$.next(paymentProcess);
	}
}
