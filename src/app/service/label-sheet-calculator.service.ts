import {Injectable} from '@angular/core';
import {TestContainer} from '../generated/testbefund-api';
import {environment} from '../../environments/environment';


/**
 * Rendering config for a single sheet of A4 paper.
 */
export interface TbfRenderConfig {
  // offset in mm from the left edge
  leftOffset: number;
  // offset in mm from the top edge
  topOffset: number;
  // Spacing extends the width of an item.
  // e.g. spacing = 2, width = 18, total = 20
  // each side gets spacing / 2 mm
  xSpacing: number;
  // Width of the tile
  width: number;
  // height of the tile
  height: number;
  // Items in one row
  itemsPerRow: number;
  // Rows per page
  rowsPerPage: number;
}

export interface CalculatedSheetItem {
  page: number;
  // Position on x-axis, starting on the left edge
  xPos: number;
  // Position on the y-axis, starting on the top edge
  yPos: number;
  width: number;
  height: number;
  title: string;
  value: string;
}

interface ContainerToRender {
  type: 'read' | 'write';
  container: TestContainer;
}

function labTitle(writeId: string): string {
  const firstFive = writeId.slice(0, 4);
  return `Labor Code (#${firstFive})`;
}

function patientTitle(readId: string): string {
  const firstFive = readId.slice(0, 4);
  return `Patienten Code (#${firstFive})`;
}


@Injectable({
  providedIn: 'root'
})
export class LabelSheetCalculatorService {

  constructor() {
  }


  calculateSheet(containers: TestContainer[], config: TbfRenderConfig): CalculatedSheetItem[] {
    return containers.map(container => this.expandedContainer(container))
      .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
      .map((container, index) => this.mapContainer(container, config, index));
  }

  private expandedContainer(container: TestContainer): ContainerToRender[] {
    return [
      {container, type: 'read'},
      {container, type: 'read'},
      {container, type: 'write'},
      {container, type: 'write'},
    ];
  }

  private mapContainer(container: ContainerToRender, config: TbfRenderConfig, index: number): CalculatedSheetItem {
    const itemsPerPage = config.itemsPerRow * config.rowsPerPage;
    const page = Math.floor(index / itemsPerPage);
    const indexInRow = index % config.itemsPerRow;
    const row = Math.floor(index / config.itemsPerRow);
    const pageOffset = page * (297 - config.topOffset - config.topOffset); // DIN-A4 height in mm
    const isRead = container.type === 'read';
    const widthWithSpacing = config.width + config.xSpacing;
    return {
      page,
      height: config.height,
      width: config.width,
      title: isRead ? patientTitle(container.container.readId) : labTitle(container.container.writeId),
      value: isRead ? `${environment.testbefundPatientUrl}?readId=${container.container.readId}` : container.container.writeId,
      xPos: config.leftOffset + (indexInRow * widthWithSpacing) + (config.xSpacing / 2),
      yPos: config.topOffset + (row * config.height) - pageOffset,
    };
  }
}
