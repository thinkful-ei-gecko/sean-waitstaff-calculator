'use strict';

const data = (function (bmp, tr, tp){

    let count = 0;
    let tipTotal = 0;
    let avgTip = 0;
    let num, num2, num3, num4, num5, num6;

    function render () {
        $('.container-one').html(`<h2>Enter the Meal Details</h2>
        <form>
        <p> Base Meal Price: $ </p> <input type="number" step="0.01" name="baseMealPrice" id="bmp" value="" required></input>
        <p> Tax Rate: % </p> <input type="number" step="0.01" name="taxRate" id="tr" value="" required></input>
        <p> Tip Percentage: % </p> <input type="number" step="0.01" name="tipPercentage" value="" id="tp"></input></br>
        <input type="submit" name="Submit"></input>
        <button type="button" name ="Cancel" id="cancelButton">Cancel</button>
        <input type="reset" value="Reset" name="reset" id="reset"></input>
        </form>`);
        $('.container-two').html(`<h2>Customer Charges</h2>
        <p> Subtotal:  </p> <span id="subtotalSpan" name="subtotalSpan"></span></br>
        <p> Tip:  </p> <span id="tipSpan"></span></br>
        <p> Total:  </p><span id="totalSpan"></span>`); 
        $('.container-three').html(`<h2>My Earnings Info</h2>
        <p>Tip Total: $ </p> <span id="tipTotalSpan"></span>
        <p>Meal Count: </p>  <span id="mealCountSpan"></span>
        <p>Average Tip Per Meal: $<p>   <span id="avgTipSpan"></span>
        `);
    }

    function handleSubmit () {
        $('form').on('submit', event => {
            event.preventDefault();
            let baseMealPrice = parseFloat(document.getElementById('bmp').value);
            let taxRate = (parseFloat(document.getElementById('tr').value)/100);
            let tipPercent = (parseFloat(document.getElementById('tp').value)/100);
            storage.pushData(baseMealPrice, taxRate, tipPercent);
            $('input[name=baseMealPrice').val('');
            $('input[name=taxRate').val('');
            $('input[name=tipPercentage').val('');
        });
    }

    function calculate (bmp, tr, tp) {
        let sub = bmp * tr;
        sub = sub + bmp;
        let tip = sub*tp;
        let total = sub + tip;
        console.log(sub);
        updateSubtotal(sub);
        updateTip(tip);
        updateTotal(total);
        myEarnings(tip);
        return;
    }
    
    function updateSubtotal (sub) {
        num = (sub).toFixed(2);
        $('#subtotalSpan').html(`<p>$ ${num}</p>`);
    }

    function updateTip(tip) {
        num2 = Number.parseFloat(tip).toFixed(2);
        $('#tipSpan').html(`<p>$${num2}</p>`);
    }

    function updateTotal(total) {
        num3 = Number.parseFloat(total).toFixed(2);
        $('#totalSpan').html(`<p>$${num3}</p>`);
    }

    function myEarnings(tip) {
        count++;
        tipTotal = tipTotal+tip;
        avgTip = tipTotal/count;
        num4 = Number.parseFloat(tipTotal).toFixed(2);
        $('#tipTotalSpan').html(`<p>$${num4}</p>`);
        num5 = Number.parseFloat(count).toFixed(0);
        $('#mealCountSpan').html(`<p>${num5}</p>`);
        num6 = Number.parseFloat(avgTip).toFixed(2);
        $('#avgTipSpan').html(`<p>$${num6}</p>`);
    }

    function onCancel() {
        $('#cancelButton').click (() => {
           $('input[name=baseMealPrice').val('');
           $('input[name=taxRate').val('');
           $('input[name=tipPercentage').val('');
           $('span[name=subTotalSpan').val('');
           console.log('cancel registered');
        });
    }

    function onReset() {
        $('#reset').click (() => {
            console.log("ive been clicked");
            count= 0; 
            tipTotal = 0;
            avgTip = 0;
            storage.resetDataArray();
            num=0;
            render();
        });    
    }

    function bindEventHandlers() {
        onCancel();
        onReset();
        handleSubmit();
    }

    return {
        render,
        handleSubmit,
        calculate,
        bindEventHandlers,
    };

})();