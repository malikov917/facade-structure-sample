import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LanguageService} from "../../../../language.service";
import {OptOutModel} from "../../../model";

@Component({
	selector: 'udpate-card',
    templateUrl: './update-card.component.html',
    styleUrls: ['./update-card.style.scss']
})

export class UpdateCardPopupComponent {

    language: any;
	errorCardReason: any;

    constructor(
        @Optional() public dialogRef: MatDialogRef<UpdateCardPopupComponent>,
		@Inject(MAT_DIALOG_DATA) private data,
        private languageService: LanguageService
    ) {
        this.language = languageService.Locale;
        this.errorCardReason = data.errorCardReason;
    }

    close(){
        this.dialogRef.close();
    }
}
