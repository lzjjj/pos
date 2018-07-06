'use strict';
//统计商品
function calculation(barcodeArray) {
    let uniqueArray = unique(barcodeArray)
    let resultArray = []
    for (let i = 0; i < uniqueArray.length; i++) {
        let itemObj = {
            barcode:uniqueArray[i], 
            num:0
        }
        for (let j = 0; j < barcodeArray.length; j++) {
            let index = barcodeArray[j].indexOf('-')
            if(uniqueArray[i]===barcodeArray[j] || uniqueArray[i]===barcodeArray[j].substring(0,index)){
                if(index > -1) {
                    itemObj.num = itemObj.num + parseFloat(barcodeArray[j].substring(index+1))
                } else {
                    itemObj.num = itemObj.num + 1
                }
            }
        }
        resultArray.push(itemObj)
    }
    return resultArray
}
// 数组去重
function unique(Array){
    const s = new Set()
    let tempArray = Array.concat()
    for(var i = 0; i <tempArray.length;i++){
        if(tempArray[i].includes('-')){
            let index = tempArray[i].indexOf('-')
            tempArray[i] = tempArray[i].substring(0,index)
        }
    }
    tempArray.forEach(x => s.add(x));
    let uniqueArray = [...s]
    return uniqueArray
}
//生成商品列表清单
function matchProductInfo(calculationArray, getAllGoodsFunc){
    let AllGoodsList = getAllGoodsFunc()
    for(let i of calculationArray){
        for(let j of AllGoodsList){
            if(i.barcode === j.barcode) {
                i = Object.assign(i,j);
                i.productDiscoultSum = countItemSum(i,loadPromotions,0)
                i.productNormalSum = countItemSum(i,loadPromotions,1)
            }
        }
    }
    return calculationArray
}
//计算某个商品总价
function countItemSum(itemObj, loadPromotions,key){ // key:0,表示计算折扣价格，key：1，计算正常价格
    let PromotionsObj = loadPromotions()
    let PromotionsArray = PromotionsObj[0].barcodes
    let productSum = 0
    if(key ===0){
        if (PromotionsArray.indexOf(itemObj.barcode) > -1){
            productSum = (itemObj.num - parseInt(itemObj.num/3)) * itemObj.price
        } else {
            productSum = itemObj.num * itemObj.price
        }
    } else if(key ===1){
        productSum = itemObj.num * itemObj.price
    }
    return productSum
}
//计算清单总价格
function totalMoney(productList, key){ // key:0,表示计算折扣价格，key：1，计算正常价格
    let sum = 0
    for (let obj of productList){
        if(key===0){
            sum+= obj.productDiscoultSum
        } else {
            sum+= obj.productNormalSum
        }
    }
    return sum
}
// 生成清单信息
    function buildReceiptMsg(goodsList,discountTotalMoney,saveMoney){
        let receiptListInfo = ''
        for(let obj of goodsList) {
            receiptListInfo = receiptListInfo + `\n  名称：${obj.name}，数量：${obj.num}${obj.unit}，单价：${obj.price.toFixed(2)}(元)，小计：${obj.productDiscoultSum.toFixed(2)}(元)`
        }
        let receiptMsg = `***<没钱赚商店>收据***${receiptListInfo}
  ----------------------
  总计：${discountTotalMoney.toFixed(2)}(元)
  节省：${saveMoney.toFixed(2)}(元)
  **********************`
        return receiptMsg
    }
// 输出清单函数
function printReceipt(productArray){
    let calculationArray = calculation(productArray) // 统计后的数组
    let goodsList = matchProductInfo(calculationArray,loadAllItems) // 信息匹配和计算总价后的数组
    let normalTotalMoney = totalMoney(goodsList, 1) //计算正常总价格
    let discountTotalMoney = totalMoney(goodsList, 0) //计算打折总价格
    let saveMoney = normalTotalMoney - discountTotalMoney // 打折后的价格
    let receiptMsg = buildReceiptMsg(goodsList,discountTotalMoney,saveMoney) // 生成清单信息
    console.info(receiptMsg)
    console.log(receiptMsg)
}
  