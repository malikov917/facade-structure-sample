
@NgModule({
    imports: [
        ...modules
    ],
    exports: [],
    declarations: [
        ...components
    ],
    providers: [
        GoogleGeocodeService,
		PaymentFacade,
		PanelFacade
    ]
})
export class PanelModule { }
