from flask import Flask, request, jsonify

app = Flask(__name__)

# 수수료율에 따른 계산 함수
def calculate_fee(amount, institution_type=None):
    if institution_type == '국가기관':
        # 국가기관에 대한 수수료 계산 로직
        pass
    elif institution_type == '자치단체':
        # 자치단체에 대한 수수료 계산 로직
        pass
    else:
        # 기본 수수료 계산 (품대 기준)
        if amount <= 20000000:
            fee = 210000
        elif amount <= 50000000:
            fee = 530000
        else:
            fee = 530000 + (amount - 50000000) * 0.003  # 체감적용 예시
        return fee

# 품대 입력에 따른 수수료 계산 엔드포인트
@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    amount = data['amount']
    institution_type = data.get('institution_type')
    fee = calculate_fee(amount, institution_type)
    return jsonify({'fee': fee})

if __name__ == '__main__':
    app.run(debug=True)
