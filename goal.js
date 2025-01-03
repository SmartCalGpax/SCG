//ประกาศตัวแปร
const calculateButton = document.getElementById('calculate-button');
const warningMessage = document.getElementById('message');
const headerWarning = document.getElementById('header-warning');
const popupOverlay = document.getElementById('popup-overlay');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const headerInput = document.getElementById('header-input');

function validateHeaderInput() {
    const value = parseFloat(headerInput.value);
    if (value < 1.00 || value > 4.00 || isNaN(value)) {
        headerWarning.style.display = 'block';
        headerInput.value = '';
    } else {
        headerWarning.style.display = 'none';
    }
}
//ไม่ให้กรอกถ้าเป้าหมายมากกว่า 4 และน้อยกว่า 1

function calculate() {
    validateHeaderInput();
    if (headerInput.value === '') {
        return;
    }

    const headerValue = parseFloat(headerInput.value);
    const inputGroups = document.querySelectorAll('.input-group');
    let totalValue = 0;
    let missingFieldsCount = 0;

    inputGroups.forEach((group) => {
        const value1 = group.querySelector('.value1').value.trim();
        const val1 = value1 === '' ? 0 : parseFloat(value1);

        totalValue += val1;

        if (value1 === '') {
            missingFieldsCount++;
        }
    });
    //คำนวณหาผลรวมก็ทุกแถวและหาแทนค่าจำนวนแถวที่หายไปบวก 1

    // ไม่ใส่ข้อมูลจะเตือน
    if (missingFieldsCount === inputGroups.length) {
        warningMessage.style.display = 'block';
        return;
    }

    warningMessage.style.display = 'none';

    // สูตร: (เลขเป้าหมาย * 5 - ผลบวกของเกรดที่กรอกทั้งหมด) / (จำนวนแถวที่ไม่ได้กรอก + 1)
    let result = ((headerValue * 5) - totalValue) / (missingFieldsCount + 1);

    // ดูว่าเกรดมากกว่า 4 ไหม
    if (result > 4) {
        showPopup("ขอโทษนะ แต่ดูเหมือนว่าจะเป็นไปไม่ได้เพราะต้องใช้มากกว่าเกรด 4 ขึ้นไป :(");
    } else {
        showPopup(`คุณต้องทำเกรดในเทอมที่เหลือให้ได้ ${result.toFixed(2)} หรือมากกว่านั้นเพื่อให้ได้ตามเป้าหมาย สู้ๆนะคุณทำได้แน่ :D`);
    }

    resetInputs();
}

function showPopup(message) {
    popupMessage.textContent = message;
    popupOverlay.style.display = 'block';
    popup.style.display = 'block';
}
//โชว์ป็อปอัพหลังจากกดคำนวณ

function closePopup() {
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
}
//ปุ่มตกลง กดแล้วปิดป็อปอัพ

function resetInputs() {
    headerInput.value = '';
    const inputs = document.querySelectorAll('input.value1');
    inputs.forEach(input => {
        input.value = '';
    });
} 
//ปุ่มตกลงเหมือนกันแต่มีคำสั่งรึเซ็ท input

headerInput.addEventListener('input', validateHeaderInput);
calculateButton.addEventListener('click', calculate); //กดแล้วคำนวณ