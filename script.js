document.getElementById('feeCalculator').addEventListener('submit', function (e) {
    e.preventDefault();

    const contractAmount = parseFloat(document.getElementById('contractAmount').value);
    const institutionType = document.getElementById('institutionType').value;
    const feeType = document.getElementById('feeType').value;
    
    let rate = 0;

    // 요율표 (PDF에 기반한 데이터)
    const ratesNational = {
        'A': [0.004, 0.003, 0.0015, 0.0007, 0.0006],
        'B': [0.0035, 0.0025, 0.0012, 0.0006, 0.0005],
        'C': [0.003, 0.002, 0.001, 0.0005, 0.00045],
        'D': [0.002, 0.001, 0.0005, 0.0002, 0.00015]
    };

    const ratesLocal = {
        'A': [0.003, 0.0015, 0.0007, 0.0004, 0.00035],
        'B': [0.0025, 0.0012, 0.0006, 0.0003, 0.00025],
        'C': [0.002, 0.001, 0.0005, 0.0002, 0.00015],
        'D': [0.001, 0.0005, 0.0002, 0.0001, 0.0001]
    };

    let applicableRates = institutionType === 'national' ? ratesNational : ratesLocal;

    // 금액 구간에 따라 요율 적용
    if (contractAmount <= 10000000000) {
        rate = applicableRates[feeType][0];
    } else if (contractAmount <= 50000000000) {
        rate = applicableRates[feeType][1];
    } else if (contractAmount <= 100000000000) {
        rate = applicableRates[feeType][2];
    } else if (contractAmount <= 500000000000) {
        rate = applicableRates[feeType][3];
    } else {
        rate = applicableRates[feeType][4];
    }

    const fee = contractAmount * rate;
    const formattedAmount = contractAmount.toLocaleString();
    const formattedFee = fee.toLocaleString();

    document.getElementById('result').innerHTML = `
        계약 금액: ${formattedAmount}원, 
        수수료 (${feeType} Type): ${formattedFee}원<br>
        이 프로그램은 계약조건에 따라 수수료가 변경될 수도 있습니다.
    `;
});
