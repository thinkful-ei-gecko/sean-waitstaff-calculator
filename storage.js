'use strict';

const storage = (function (bmp, tr, tp){
    //console.log(bmp);
    let mealObject = {
        'baseMeal' : bmp,
        'taxRate': tr,
        'tipPercent': tp,
    };

    let dataArray = [];

    function pushData (bmp, tr, tp) {
        mealObject.baseMeal = bmp;
        mealObject.taxRate = tr;
        mealObject.tipPercent = tp;
        dataArray.push(mealObject);
        data.calculate(bmp, tr, tp);
    }
    
    function resetDataArray() {
        dataArray =[];
    }

    return {
       pushData,
       resetDataArray
    }

}());