//ประกาศตัวแปร
const container = document.getElementById('input-container');
const addButton = document.getElementById('add-button');
const calculateButton = document.getElementById('calculate-button');
const warningMessage = document.getElementById('message');
const limitMessage = document.getElementById('limit-message');
const popupOverlay = document.getElementById('popup-overlay');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const maxInputs = 6;  //จำนวณเทอมที่จำกัดไว้

function updateOrder() {
    const inputGroups = container.getElementsByClassName('input-group');
    for (let i = 0; i < inputGroups.length; i++) {
        const span = inputGroups[i].querySelector('span');
        span.textContent = `${i + 1}`;
    }
} //ไว้ทำอันดับตัวเลข

function calculate() {
    const inputGroups = container.getElementsByClassName('input-group');
    let numerator = 0;
    let denominator = 0;
    let hasEmptyField = false;

    for (let group of inputGroups) {
        const value1 = group.querySelector('.value1').value.trim();
        const value2 = group.querySelector('.value2').value.trim();

        if (value1 === '' || value2 === '') {
            hasEmptyField = true;
            break;
        }

        numerator += parseFloat(value1) * parseFloat(value2);
        denominator += parseFloat(value1);
    }

    if (hasEmptyField) {
        warningMessage.style.display = 'block';
        return;
    }

    warningMessage.style.display = 'none';
    const result = denominator > 0 ? numerator / denominator : 0;
    showPopup(`เกรดเฉลี่ยของคุณคือ ${result.toFixed(2)}`);
    resetInputs();
} //โค้ดคำนวณ

function showPopup(message) {
    popupMessage.textContent = message;
    popupOverlay.style.display = 'block';
    popup.style.display = 'block';
} //ป็อปอัพเด้ง

function closePopup() {
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
} //ปิดป็อปอัพ

function resetInputs() {
    const inputGroups = container.getElementsByClassName('input-group');
    for (let group of inputGroups) {
        group.querySelector('.value1').value = '';
        group.querySelector('.value2').value = '';
    }
} //reset เมื่อกดตกลง

function addInput() {
    const currentInputs = container.getElementsByClassName('input-group').length;
    if (currentInputs >= maxInputs) {
        limitMessage.style.display = 'block';
        return;
    } //จำกัดการเพิ่มช่อง
    limitMessage.style.display = 'none'; //ถ้าไม่มากกว่ากำหนดก็ไม่เกิดไรขึ้น

    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.innerHTML = `
        <span></span>
        <input type="number" class="value1" placeholder="ใส่หน่วยกิต" step="0.5" min="0.5">
        <input type="number" class="value2" placeholder="ใส่เกรด" step="0.01" min="0" max="4">
        <button type="button" class="remove" onclick="removeInput(this)">-</button>
    `;
    container.appendChild(inputGroup);
    updateOrder(); //ให้อัพเดตอันดับตลอด
} //จับกลุ่มที่จะก๊อป

function removeInput(button) {
    const inputGroup = button.parentElement;
    container.removeChild(inputGroup);
    updateOrder();
} //กดปุ่มแล้วช่องลด

addButton.addEventListener('click', addInput); //กดปุ่มแล้วช่องเพิ่ม
calculateButton.addEventListener('click', calculate); //กดปุ่มแล้วคำนวณ