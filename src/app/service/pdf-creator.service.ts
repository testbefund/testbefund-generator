import {Injectable} from '@angular/core';
// @ts-ignore
import * as QRCode from 'easyqrcodejs';
import jsPDF from 'jspdf';
import {TestContainer} from '@api/model/testContainer';
import {CalculatedSheetItem, LabelSheetCalculatorService, TbfRenderConfig} from './label-sheet-calculator.service';
import {LabelSize} from '../store/app.types';


const config70x50: TbfRenderConfig = {
  leftOffset: 5,
  topOffset: 8.5,
  itemsPerRow: 5,
  height: 70,
  xSpacing: 2.5,
  width: 50,
  rowsPerPage: 14
};

const config20x20: TbfRenderConfig = {
  leftOffset: 15,
  topOffset: 8.5,
  itemsPerRow: 9,
  height: 20,
  xSpacing: 2,
  width: 18,
  rowsPerPage: 14
};

@Injectable({
  providedIn: 'root'
})
export class PdfCreatorService {

  constructor(private labelSheetCalculatorService: LabelSheetCalculatorService) {
  }

  private static resolveConfig(size: LabelSize): TbfRenderConfig {
    if (size === '20x20') {
      return config20x20;
    }
    if (size === '70x50') {
      return config70x50;
    }
    throw new Error('Unmapped size ' + size);
  }

  async createAndDownloadPdf(results: TestContainer[], size: LabelSize): Promise<TestContainer[]> {
    // Default iS A4, portrait mode, 210mm width, 297mm height
    const date = new Date();
    const pdf = new jsPDF({unit: 'mm', format: 'a4'});
    const calculatedSheetItems = this.labelSheetCalculatorService.calculateSheet(results, PdfCreatorService.resolveConfig(size));
    const pagesToCreate = Math.ceil(calculatedSheetItems.length / 126) - 1;
    // PDFs always have one page after creation. Add one page for each partition, minus first page
    [...Array(pagesToCreate).keys()].forEach(() => pdf.addPage('a4', 'p'));
    for (const item of calculatedSheetItems) {
      // Using await here so pages don't get mixed up in case something happens concourrently
      // Important because we are using setTimeout further down.
      await this.renderSheetItem(item, pdf);
    }
    pdf.save(`QR_Codes_${date.toISOString()}.pdf`);
    return Promise.all(results);
  }

  private renderSheetItem(sheetItem: CalculatedSheetItem, pdf: jsPDF): Promise<jsPDF> {
    // Options
    const options = {
      text: sheetItem.value,
      title: sheetItem.title,
      titleHeight: 40,
      width: 300,
      height: 300,
    };
    return this.renderQrCode(options)
      .then(imageContent => {
        // Remove the 'data:image/png;base64,' from image content.
        const base64PNG = imageContent.substring(22, imageContent.length);
        pdf.setPage(sheetItem.page + 1); // page is index-1 based. Our pages are zero-index based.
        pdf.addImage(base64PNG, 'PNG', sheetItem.xPos, sheetItem.yPos, sheetItem.width, sheetItem.height);
        return pdf;
      });
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
