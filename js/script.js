// Hàm tính toán thuế thu nhập cá nhân và hiển thị kết quả
function calculateTax() {
    let salary = parseFloat(document.getElementById('salary').value.replace(/,/g, ''));
    let region = document.getElementById('region').value;
    let dependents = parseInt(document.getElementById('dependents').value);

    if (isNaN(salary) || salary <= 0 || isNaN(dependents) || dependents < 0) {
        alert('Vui lòng nhập các giá trị hợp lệ.');
        return;
    }

    // Tính bảo hiểm
    let socialInsurance = salary * 0.08;
    let healthInsurance = salary * 0.015;
    let unemploymentInsurance = salary * 0.01;

    // Tính thu nhập trước thuế
    let beforeTax = salary - socialInsurance - healthInsurance - unemploymentInsurance;

    // Giảm trừ gia cảnh
    let personalDeduction = 11000000; // Giảm trừ gia cảnh bản thân
    let dependentDeduction = 4400000 * dependents; // Giảm trừ gia cảnh người phụ thuộc (4.4 triệu/người)

    // Tính thu nhập chịu thuế
    let taxableIncome = beforeTax - personalDeduction - dependentDeduction;

    // Thuế thu nhập cá nhân: Tính thuế theo thu nhập chịu thuế (Ví dụ 5% cho đến một mức thu nhập nhất định)
    let tax = taxableIncome <= 0 ? 0 : calculatePersonalTax(taxableIncome);

    // Cập nhật kết quả vào bảng
    document.getElementById('grossSalary').textContent = formatCurrency(salary);
    document.getElementById('insuranceSocial').textContent = formatCurrency(socialInsurance);
    document.getElementById('insuranceHealth').textContent = formatCurrency(healthInsurance);
    document.getElementById('insuranceUnemployment').textContent = formatCurrency(unemploymentInsurance);
    document.getElementById('beforeTax').textContent = formatCurrency(beforeTax);
    document.getElementById('personalDeduction').textContent = formatCurrency(personalDeduction);
    document.getElementById('dependentDeduction').textContent = formatCurrency(dependentDeduction);
    document.getElementById('taxableIncome').textContent = formatCurrency(taxableIncome);
    document.getElementById('tax').textContent = formatCurrency(tax);
}

// Hàm tính thuế thu nhập cá nhân
function calculatePersonalTax(income) {
    let taxRate = 0.05; // Thuế 5% cho thu nhập chịu thuế
    return income * taxRate;
}

// Hàm định dạng số tiền với dấu phẩy và đơn vị tiền tệ
function formatCurrency(amount) {
    let formattedAmount;

    // Định dạng theo triệu, nghìn hoặc đồng
    if (amount >= 1000000) {
        formattedAmount = (amount / 1000000).toFixed(2) + " triệu";
    } else if (amount >= 1000) {
        formattedAmount = (amount / 1000).toFixed(0) + " nghìn";
    } else {
        formattedAmount = amount.toFixed(0) + " đồng";
    }

    return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Hàm tự động thêm dấu phẩy khi nhập vào số tiền
function formatSalaryInput(event) {
    let input = event.target;
    let value = input.value.replace(/[^\d]/g, ''); // Chỉ giữ lại các chữ số
    let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    input.value = formattedValue;
}
