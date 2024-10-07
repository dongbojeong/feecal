document.addEventListener('DOMContentLoaded', function () {
    const feeCalculator = document.getElementById('feeCalculator');
    const result = document.getElementById('result');
    let selectedType = '';

    // Event listeners for the type buttons
    document.querySelectorAll('.type-buttons button').forEach(button => {
        button.addEventListener('click', function () {
            selectedType = this.getAttribute('data-type');
            calculateFee();
        });
    });

    feeCalculator.addEventListener('submit', function (e) {
        e.preventDefault();
        calculateFee();
    });

    function calculateFee() {
        const contractAmount = parseFloat(document.getElementById('contractAmount').value.replace(/,/g, ''));
        const institutionType = document.getElementById('institutionType').value;

        if (!contractAmount || !selectedType) {
            result.innerHTML = '계약 금액과 요율 타입을 입력해주세요.';
            return;
        }

        let rate = 0;
        const rates = {
            national: {
                A: [0.004, 0.003, 0.0015, 0.0007, 0.0006],
                B: [0.0035, 0.0025, 0.0012, 0.0006, 0.0005],
                C: [0.003, 0.002, 0.001, 0.0005, 0.00045],
                D: [0.002, 0.001, 0.0005, 0.0002, 0.00015]
            },
            local: {
                A: [0.003, 0.0015, 0.0007, 0.0004, 0.00035],
                B: [0.0025, 0.0012, 0.0006, 0.0003, 0.00025],
                C: [0.002, 0.001, 0.0005, 0.0002, 0.00015],
                D: [0.001, 0.0005, 0.0002, 0.0001, 0.0001]
            }
        };

        const applicableRates = rates[institutionType][selectedType];

        if (contractAmount <= 10000000000) {
            rate = applicableRates[0];
        } else if (contractAmount <= 50000000000) {
            rate = applicableRates[1];
        } else if (contractAmount <= 100000000000) {
            rate = applicableRates[2];
        } else if (contractAmount <= 500000000000) {
            rate = applicableRates[3];
        } else {
            rate = applicableRates[4];
        }

        const fee = contractAmount * rate;
        const formattedFee = Math.floor(fee).toLocaleString('ko-KR');

        result.innerHTML = `계약 금액: ${contractAmount.toLocaleString('ko-KR')}원, 수수료 (${selectedType} Type): ${formattedFee}원<br>
                            이 프로그램은 계약조건에 따라 수수료가 변경될 수도 있습니다.`;
    }
});
