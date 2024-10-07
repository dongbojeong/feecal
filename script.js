let selectedRate = 0.0025;

function formatNumber(input) {
    let value = input.value.replaceAll(",", "");
    if (!isNaN(value)) {
        input.value = Number(value).toLocaleString('ko-KR');
    }
}

function selectRate(rate) {
    selectedRate = rate;
    document.querySelectorAll('#rateOptions button').forEach(button => {
        button.style.backgroundColor = '#007bff';
    });
    event.target.style.backgroundColor = '#0056b3';
}

function calculateFee() {
    let contractAmountStr = document.getElementById("contractAmount").value.replace(/,/g, '');
    let contractAmount = parseFloat(contractAmountStr);
    
    if (isNaN(contractAmount)) {
        alert("계약금액을 올바르게 입력해 주세요.");
        return;
    }
    
    let fee = contractAmount * selectedRate;
    let truncatedFee = Math.floor(fee);
    
    let result = `
        계약금액 ${contractAmount.toLocaleString('ko-KR')}원을 기준으로 아래 계산에 따라<br>
        ${contractAmount.toLocaleString('ko-KR')} * ${selectedRate} = ${fee.toFixed(3)}<br>
        최수수료: ${truncatedFee.toLocaleString('ko-KR')}원
    `;
    
    document.getElementById("calculationResult").innerHTML = result;
}
