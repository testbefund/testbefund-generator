import {Injectable} from '@angular/core';
// @ts-ignore
import * as QRCode from 'easyqrcodejs';
import jsPDF from 'jspdf';
import {environment} from '../../environments/environment';
import {TestContainer} from '@api/model/testContainer';


function labTitle(writeId: string): string {
  const firstFive = writeId.slice(0, 4);
  return `Labor Code (#${firstFive})`;
}

function patientTitle(readId: string): string {
  const firstFive = readId.slice(0, 4);
  const r = `Patienten Code (#${firstFive})`;
  console.log('code ' + r);
  return r;
}

@Injectable({
  providedIn: 'root'
})
export class PdfCreatorService {

  constructor() {
  }

  createAndDownloadPdf(results: TestContainer[]): void {
    // Default iS A4, portrait mode, 210mm width, 297mm height
    // Each QR code sticker will be 50mm width and 70mm height
    // QR codes will have a margin of 2.5mm on each side, resulting in
    // QR code image width of 45mm
    // left and right margin are 5mm
    // top and bottom margin are 8.5mm
    // x = left to right
    // y = top to bottom
    const date = new Date();
    const pdf = new jsPDF({unit: 'mm', format: 'a4'});
    const promises = results.map((result, index) => this.renderContainer(pdf, result, index));
    Promise.all(promises)
      .then(() => pdf.save(`QR_Codes_${date.toISOString()}.pdf`));
  }

  private renderContainer(pdf: jsPDF, result: TestContainer, row: number): Promise<jsPDF> {
    return this.renderRow(pdf, result, row);
  }

  private renderRow(p: jsPDF, result: TestContainer, row: number): Promise<jsPDF> {
    const readUrl = `${environment.testbefundPatientUrl}?readId=${result.readId}`;
    const leftOffset = 5;
    const topOffset = (row * 70) + 8.5;
    const firstColOffset = leftOffset + 2.5;
    const secondColOffset = firstColOffset + 50;
    const thirdColOffset = secondColOffset + 50;
    const fourthColOffset = thirdColOffset + 50;
    return this.addQrCodeToPdf(p, readUrl, patientTitle(result.readId), firstColOffset, topOffset)
      .then(pdf => this.addQrCodeToPdf(pdf, readUrl, patientTitle(result.readId),  secondColOffset, topOffset))
      .then(pdf => this.addQrCodeToPdf(pdf, result.writeId, labTitle(result.readId), thirdColOffset, topOffset))
      .then(pdf => this.addQrCodeToPdf(pdf, result.writeId, labTitle(result.readId), fourthColOffset, topOffset));
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
        // width:height factor = 0,881316
        const factor = 0.881316;
        const width = 45;
        pdfDocument.addImage(base64PNG, 'PNG', x, y, width, width / factor);
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
