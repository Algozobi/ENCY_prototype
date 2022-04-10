const book_meeting_checkbox = document.getElementById('book_meeting_checkbox_yes');
const questions = document.getElementById('questions');
const send_email_btn = document.getElementById("send_email_btn");

function booking_form() {
    date_input()
    if( send_email_btn.classList.contains("hide")) {
        questions.classList.toggle("hide");
    }
    else {
        send_email_btn.classList.add("hide")
        questions.classList.toggle("hide");
    }
}

function send_email() {
    if( questions.classList.contains("hide")) {
        send_email_btn.classList.toggle("hide");
    }
    else {
        questions.classList.add("hide")
        send_email_btn.classList.toggle("hide");
    }
}

function date_input() {
    const date = new Date().toISOString().slice(0, 10);
    var date_display = document.getElementById("date_input");
    var min_date = parseInt(date.slice(8, 10)) + 1
    
    date_display.value = date.slice(0,8) + min_date;
    date_display.min = date.slice(0,8) + min_date;
    console.log(date_display.value);
    console.log(date_display.min);
    
    var max_date = parseInt(date.slice(8, 10)) + 14
    date_display.max = date.slice(0,8) + max_date;
    console.log(date_display.max);
}

messages = []
function send_form() {
    const contact_name = document.getElementById("contact_name")
    const email = document.getElementById("email")
    const company = document.getElementById("company")
    const website = document.getElementById("website")
    const phone_no = document.getElementById("phone_no")
    const date_input = document.getElementById("date_input")
    const questions_field = document.getElementById("questions_field")

    let booking_info = {contact_name: contact_name.text, email: email.text, company: company.text, website: website.text, phone_no: phone_no.text, date_input: date_input.text, questions_field: questions_field.text}
    fetch("/booking", {
        headers : {'Content-Type': 'application/json'},
        method : 'POST',
        body   : JSON.stringify(booking_info)
    })
    .then(r => r.json())
    .then(r => {
        let ct_log = r
        end_display(ct_log)

    });


    // .then(r => r.json())
    // .then(r => {
    //     let msg_bot = {name: 'bot', message: r.bot}
    //     messages.push(msg_bot)
    //     write(messages)
    //     console.log(messages)
    // });
}

function end_display(ct_log) {

    const chat_log = document.getElementById("chat_log")
    const contact_log = document.getElementById("contact_log")
    const estimate_log = document.getElementById("estimate_log")
    const end = document.getElementById("end")

    
    end.classList.remove("hide")
    // chat_log.innerHTML = '<p class="right">Chat log</p>'
    contact_log.innerHTML = '<p class="right">' + toString(ct_log) + '</p>'
    // estimate_log.innerHTML = '<p class="right">estimate_log</p>'



}