document.getElementById('contractAmount').addEventListener('input', function (e) {
    let value = e.target.value.replace(/,/g, ''); // 기존 입력값에서 콤마 제거
    if (!isNaN(value) && value.length > 0) {
        e.target.value = parseFloat(value).toLocaleString('ko-KR'); // 천 단위로 표시
    } else {
        e.target.value = ''; // 숫자가 아닐 경우 빈 값 처리
    }
});

let selectedFeeType = 'A';

function setFeeType(type) {
    selectedFeeType = type;
}

document.getElementById('feeCalculator').addEventListener('submit', function (e) {
    e.preventDefault();

    const contractAmount = parseFloat(document.getElementById('contractAmount').value.replace(/,/g, ''));
    let rate = 0;

    const rates = {
        'A': 0.004,
        'B': 0.0035,
        'C': 0.003,
        'D': 0.002
    };

    rate = rates[selectedFeeType];

    let fee = contractAmount * rate;

    const formattedFee = fee.toFixed(3); // 소수점 3자리까지 표시
    const finalFee = Math.floor(fee / 10) * 10; // 마지막 자리는 절삭

    document.getElementById('result').innerHTML = `
        계약 금액: ${contractAmount.toLocaleString('ko-KR')}원<br>
        수수료 (${selectedFeeType} Type): ${formattedFee}원<br>
        최종 수수료: ${finalFee.toLocaleString('ko-KR')}원
    `;
});
