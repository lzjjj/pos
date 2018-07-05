'use strict';

describe('pos', () => {
  //测试数组去重unique（）
  it('you pass unique test', () => {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const uniqueArray =  JSON.stringify(unique(tags))
    const expectText = JSON.stringify(['ITEM000001','ITEM000003','ITEM000005']);
    expect(uniqueArray).toBe(expectText);
  });
  // 统计商品测试calculation()
  it('you pass calculation test', () => {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001-3.8',
      'ITEM000001',
      'ITEM000003-6.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const calculationArray =  JSON.stringify(calculation(tags))
    const expectText = JSON.stringify(
      [
        {barcode:'ITEM000001',num:7.8},
        {barcode:'ITEM000003',num:6.5},
        {barcode:'ITEM000005',num:3}]
    );
    expect(calculationArray).toBe(expectText);
  });
  //   it('should print text', () => {

  //     const tags = [
  //       'ITEM000001',
  //       'ITEM000001',
  //       'ITEM000001',
  //       'ITEM000001',
  //       'ITEM000001',
  //       'ITEM000003-2.5',
  //       'ITEM000005',
  //       'ITEM000005-2',
  //     ];

  //     spyOn(console, 'log');

  //     printReceipt(tags);

  //     const expectText = `***<没钱赚商店>收据***
  // 名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
  // 名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
  // 名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
  // ----------------------
  // 总计：58.50(元)
  // 节省：7.50(元)
  // **********************`;

  //     expect(console.log).toHaveBeenCalledWith(expectText);
  //   });
});
