
import { AsscoiatedPart } from './../models/associated-part';
import { Injectable } from '@angular/core';


@Injectable()
export class RefPreviewService {

    private associatedParts: AsscoiatedPart[] = [
        { name: 'BAV100', url: 'http://www.google.com' },
        { name: 'BAV10', url: 'http://www.google.com' },
        { name: 'BAV1', url: 'http://www.google.com' },
        { name: 'BAV99', url: 'http://www.google.com' },
        { name: 'BAV', url: 'http://www.google.com' },
        { name: 'BAV1', url: 'http://www.google.com' },
        { name: 'BAV10', url: 'http://www.google.com' },
        { name: 'BAV50', url: 'http://www.google.com' },
        { name: 'BAV20', url: 'http://www.google.com' },
        { name: 'BAV16', url: 'http://www.google.com' },
    ];

    public getAssociateParts(pdfId: string) {

        return this.associatedParts;

    }

}