import { PanelComponent } from './panel.component';
import { PaymentComponent } from './payment/payment.component';

const panelRoutes: Routes = [
    {
        path: '',
        component: PanelComponent,
        children: [
            { path: 'bezahldaten', component: PaymentComponent }
        ],
        resolve: {
            portalMember: AuthUserResolve
        }
    }
];

@NgModule({
    ...
})
export class PanelRoutingModule { }