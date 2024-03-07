const infoForm = document.getElementById('infoForm');
const surveySection = document.getElementById('survey');
const resultSection = document.getElementById('result');
const questionList = document.getElementById('question--list');
const infoBox = document.getElementById('info--box');

infoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Hiển thị phần khảo sát
    surveySection.classList.remove('hidden');

    // Gửi dữ liệu thông tin cá nhân lên server (nếu cần)

    // Tạo câu hỏi khảo sát (demo)
    createSurveyQuestions();
});

function createSurveyQuestions() {
    // Xóa các câu hỏi cũ (nếu có)
    // surveySection.innerHTML = '';

    // Tạo câu hỏi demo
    for (let i = 1; i <= 10; i++) {
        const question = document.createElement('div');
        question.classList.add('question');
        question.innerHTML = `
            <p>Câu hỏi ${i}: Đây là câu hỏi demo ${i}</p>
            <div class = "answer">
                <label>
                    <input type="radio" name="question${i}" value="true"> Đúng
                </label>
            </div>

            <div class = "answer">
                <label>
                    <input type="radio" name="question${i}" value="false"> Sai
                </label>
            </div>
        `;
        questionList.appendChild(question);
    }

    for (let i = 11; i <= 20; i++) {
        const question = document.createElement('div');
        question.classList.add('question');
        question.innerHTML = `
            <p>Câu hỏi ${i}: Đây là câu hỏi demo ${i}</p>
            <div class = "answer">
                <label>
                    <input type="radio" name="question${i}" value="a"> Đáp án A
                </label>
            </div>
            <div class = "answer">
                <label>
                    <input type="radio" name="question${i}" value="b"> Đáp án B
                </label>
            </div>
            <div class = "answer">
                <label>
                    <input type="radio" name="question${i}" value="c"> Đáp án C
                </label>
            </div>
            <div class = "answer">
                <label>
                    <input type="radio" name="question${i}" value="d"> Đáp án D
                </label>
            </div>
            
        `;
        questionList.appendChild(question);
    }

    for (let i = 21; i <= 30; i++) {
        const question = document.createElement('div');
        question.classList.add('question');
        question.innerHTML = `
            <p>Câu hỏi ${i}: Đây là câu hỏi demo ${i}</p>
            <div class = "answer">
                <label>
                    <input type="checkbox" name="question${i}[]" value="a"> Đáp án A
                </label>
            </div>
            <div class = "answer">
                <label>
                    <input type="checkbox" name="question${i}[]" value="b"> Đáp án B
                </label>
            </div>
            <div class = "answer">
                <label>
                    <input type="checkbox" name="question${i}[]" value="c"> Đáp án C
                </label>
            </div>
            <div class = "answer">
                <label>
                    <input type="checkbox" name="question${i}[]" value="d"> Đáp án D
                </label>
            </div>
        `;
        questionList.appendChild(question);
    }

    for (let i = 31; i <= 40; i++) {
        const question = document.createElement('div');
        question.classList.add('question');
        question.innerHTML = `
            <p>Câu hỏi ${i}: Đây là câu hỏi demo ${i}</p>
            <textarea name="answer${i}" rows="4" cols="50" placeholder="Nhập câu trả lời của bạn"></textarea>
        `;
        questionList.appendChild(question);
    }
}

document.getElementById('submitSurvey').addEventListener('click', function() {
    // Hiển thị kết quả
    resultSection.classList.remove('hidden');
    surveySection.classList.add('hidden');
    infoBox.classList.add('hidden');

    const personalInfo = {};
    personalInfo.fullName = document.getElementById('fullName').value;
    personalInfo.dob = document.getElementById('dob').value;
    personalInfo.cccd = document.getElementById('cccd').value;
    personalInfo.address = document.getElementById('address').value;

    // Hiển thị kết quả thông tin cá nhân
    displayPersonalInfo(personalInfo);
    // Lặp qua từng thẻ question
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        const questionText = question.querySelector('p').innerText;
        const answerInputs = question.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked, textarea');
        let answer = "Trống";
        if (answerInputs.length > 0) {
            answer = "";
            answerInputs.forEach(input => {
                if (input.type === 'textarea') {
                    answer += input.value;
                } else {
                    answer += input.value + ", ";
                }
            });
            // Loại bỏ dấu phẩy cuối cùng nếu có
            answer = answer.replace(/,\s*$/, "");
        }

        // Hiển thị kết quả
        const result = document.createElement('p');
        result.classList.add("answer-select")
        result.innerHTML = `<p>${questionText}</p><strong>Câu trả lời:</strong> ${answer}`;
        resultSection.appendChild(result);
    });
});

function displayPersonalInfo(info) {
    // Hiển thị thông tin cá nhân
    resultSection.innerHTML += '<h3 class = "info-result-heading">Thông tin cá nhân</h3>';
    resultSection.innerHTML += `<p class = "info-result-name"><strong>Họ và tên:</strong> ${info.fullName}</p>`;
    resultSection.innerHTML += `<p class = "info-result-date"><strong>Ngày tháng năm sinh:</strong> ${info.dob}</p>`;
    resultSection.innerHTML += `<p class = "info-result-cccd"><strong>CCCD:</strong> ${info.cccd}</p>`;
    resultSection.innerHTML += `<p class = "info-result-address"><strong>Địa chỉ thường trú:</strong> ${info.address}</p>`;
}