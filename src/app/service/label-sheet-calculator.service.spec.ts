import {LabelSheetCalculatorService, TbfRenderConfig} from './label-sheet-calculator.service';
import {TestbefundTestContainer} from '@api/model/testbefundTestContainer';

describe('LabelSheetCalculatorService', () => {
  let service: LabelSheetCalculatorService;
  let config: TbfRenderConfig;
  let containers: TestbefundTestContainer[] = [];

  beforeEach(() => {
    service = new LabelSheetCalculatorService();
    config = {
      height: 20,
      width: 20,
      itemsPerRow: 9,
      xSpacing: 0,
      leftOffset: 15,
      topOffset: 8.5,
      rowsPerPage: 14
    };
    containers = [{readId: 'read-1234', writeId: 'write-1234'}];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should render the first item into the first available slot', () => {
    const result = service.calculateSheet(containers, config);
    // With 20mm width and 20mm height, it should be at page 1, both offsets.
    expect(result.length).toBeGreaterThan(0);
    const firstItem = result[0];
    expect(firstItem.page).toBe(0);
    expect(firstItem.xPos).toBe(15); // left offset
    expect(firstItem.yPos).toBe(8.5); // top offset
  });

  it('should rendert the second item ', () => {
    const result = service.calculateSheet(containers, config);
    expect(result.length).toBeGreaterThan(1);
    const secondItem = result[1];
    expect(secondItem.page).toEqual(0);
    expect(secondItem.xPos).toEqual(15 + 20); // offset + width of first item
    expect(secondItem.yPos).toEqual(8.5);
  });

  it('should render the last item in a row', () => {
    containers = [
      {readId: 'read-1', writeId: 'write-1'},
      {readId: 'read-2', writeId: 'write-2'},
      {readId: 'read-3', writeId: 'write-3'},
    ];
    const result = service.calculateSheet(containers, config);
    expect(result.length).toBeGreaterThan(8);
    // On position 9 (last item, first row) we want the read ID of the third container.
    const lastItemInRow = result[8];
    expect(lastItemInRow.yPos).toEqual(8.5);
    expect(lastItemInRow.xPos).toEqual(175); // 210mm - 15mm - 20mm (label width)
    expect(lastItemInRow.page).toEqual(0);
    expect(lastItemInRow.value).toEqual('www.example.com?readId=read-3');
  });

  it('should render the first item in the second row', () => {
    containers = [
      {readId: 'read-1', writeId: 'write-1'},
      {readId: 'read-2', writeId: 'write-2'},
      {readId: 'read-3', writeId: 'write-3'},
    ];
    const result = service.calculateSheet(containers, config);
    expect(result.length).toBeGreaterThan(8);
    // On position 10 (first item, second row) we want the read ID of the third container.
    const lastItemInRow = result[9];
    expect(lastItemInRow.yPos).toEqual(8.5 + 20);
    expect(lastItemInRow.xPos).toEqual(15);
    expect(lastItemInRow.page).toEqual(0);
    expect(lastItemInRow.value).toEqual('www.example.com?readId=read-3');
  });

  function generateContainers(num: number): TestbefundTestContainer[] {
    const res: TestbefundTestContainer[] = [];
    for (let i = 0; i < num; i++) {
      res.push({readId: `read-${i + 1}`, writeId: `write-${i + 1}`});
    }
    return res;
  }

  it('should render the first item of the second page', () => {
    containers = generateContainers(32);
    const result = service.calculateSheet(containers, config);
    expect(result.length).toBeGreaterThan(31);
    // 126 items per page
    // container 32 (indx 31) has it's first write ID on page 2
    const lastItemInRow = result[126];
    expect(lastItemInRow.value).toEqual('write-32');
    expect(lastItemInRow.yPos).toEqual(8.5);
    expect(lastItemInRow.xPos).toEqual(15);
    expect(lastItemInRow.page).toEqual(1);
  });

  it('should add x-spacing to each item', () => {
    config = {
      height: 20,
      width: 18,
      itemsPerRow: 9,
      xSpacing: 2,
      leftOffset: 15,
      topOffset: 8.5,
      rowsPerPage: 14
    };
    const result = service.calculateSheet(containers, config);
    const itemA = result[0];
    const itemB = result[1];
    expect(itemA.xPos).toEqual(15 + 1);
    expect(itemB.xPos).toEqual(15 + 1 + 18 + 1 + 1); // left + spacingA + A + spacingA + spacingB
  });
});
