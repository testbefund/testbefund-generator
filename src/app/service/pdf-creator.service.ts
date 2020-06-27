import {Injectable} from '@angular/core';
// @ts-ignore
import * as QRCode from 'easyqrcodejs';
import jsPDF from 'jspdf';
import {environment} from '../../environments/environment';
import {TestContainer} from '@api/model/testContainer';


@Injectable({
  providedIn: 'root'
})
export class PdfCreatorService {

  constructor() {
  }

  createAndDownloadPdf(result: TestContainer): void {
    // Default iS A4, portrait mode, 210mm width, 297mm height
    // Each QR code will be 90x90mm
    const readUrl = `${environment.testbefundPatientUrl}?readId=${result.readId}`;
    const date = new Date();
    this.addQrCodeToPdf(new jsPDF({unit: 'mm', format: 'a4'}), readUrl, 'Patient Code (1)', 10, 10)
      .then(pdf => this.addQrCodeToPdf(pdf, readUrl, 'Patient Code (2)', 110, 10))
      .then(pdf => this.addQrCodeToPdf(pdf, result.writeId, 'Labor Code (1)', 10, 185))
      .then(pdf => this.addQrCodeToPdf(pdf, result.writeId, 'Labor Code (2)', 110, 185))
      .then(pdf => pdf.save(`QR_Codes_${date.toISOString()}.pdf`));
  }

  private renderQrCode(options: any): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        const element = document.createElement('div', {});
        // Don't display the element; Img-src will be set even with display: none.
        // Don't clutter the UI with images that will be removed shortly after.
        element.style.display = 'none';
        // tslint:disable-next-line:no-unused-expression
        new QRCode(element, options);
        // Wait for image to render
        this.tryResolveImage(element, 0, resolve, reject);
      }
    );
  }

  private addQrCodeToPdf(pdfDocument: jsPDF, value: string, title: string, x: number, y: number): Promise<jsPDF> {
    // Options
    const options = {
      text: value,
      title,
      titleHeight: 40,
      width: 300,
      height: 300,
    };
    return this.renderQrCode(options)
      .then(imageContent => {
        // Remove the 'data:image/png;base64,' from image content.
        const base64PNG = imageContent.substring(22, imageContent.length);
        console.log({base64PNG, imageContent, x, y});
        pdfDocument.addImage(base64PNG, 'PNG', x, y, 90, 102.12);
        return pdfDocument;
      });
  }

  private tryResolveImage(element: HTMLElement, currentTry, resolve, reject): void {
    // Needs to happen async because the rendering paint seems to be async. ImageElement.src is not always filled right away.
    // We simply wait up to 100ms in 5ms steps
    setTimeout(() => {
      const imgElement = (element.children[1] as HTMLImageElement);
      const content = imgElement.src;
      if (content !== '') {
        // Our element is temporary, we remove it after we extracted the content
        element.remove();
        resolve(content);
      } else if (currentTry <= 20) {
        this.tryResolveImage(element, currentTry + 1, resolve, reject);
      } else {
        // Our element is temporary, we remove it after failed resolving
        element.remove();
        reject('Failed to resolve image. Image ' + imgElement + ' did not contain image data. Please try again!');
      }
    }, 5);
  }

}
