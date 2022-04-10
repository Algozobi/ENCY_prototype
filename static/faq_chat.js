function height_value(val) {
    document.getElementById('textInput_height').value=val; 
}
function width_value(val) {
    document.getElementById('textInput_width').value=val; 
}
function depth_value(val) {
    document.getElementById('textInput_depth').value=val; 
}

messages = []
function estimate() {
    const estimater_window1 = document.getElementById("estimater_window1")
    // estimater_window1.classList.add("hide")
    const chat_window1 = document.getElementById("chat_window1")
    // chat_window1.classList.remove("hide")

    const height = document.getElementById("height")
    const width = document.getElementById("width")
    const depth = document.getElementById("depth")

    let variables = {height: height.value, width: width.value, depth: depth.value}
    fetch("/estimate", {
        headers : {'Content-Type': 'application/json'},
        method : 'POST',
        body   : JSON.stringify(variables)
    })
    .then(r => r.json())
    .then(r => {
        let msg_bot = {name: 'bot', message: r.bot}
        messages.push(msg_bot)
        write(messages)
        console.log(messages)
    });
}


const chat_input = document.getElementById("chat_bot_input")
chat_input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("chat_submit_btn").click();
    }
});

const text_input = document.getElementById("chat_bot_input")
const text_window = document.getElementById("text_window")

function chat(){
    let text = text_input.value
    console.log(text);
    let msg_user = {name: 'user', message: text}
    messages.push(msg_user)
    write(messages)

    fetch("/chat", {
        headers : {'Content-Type': 'application/json'},
        method : 'POST',
        body   : JSON.stringify({ message: text })
    })
    .then(r => r.json())
    .then(r => {
        let msg_bot = {name: 'bot', message: r.bot}
        messages.push(msg_bot)
        write(messages)
        console.log(messages)
    });
}
function write(messages) {
    var html = '';
    messages.slice().reverse().forEach(function(key, value){
        if (key.name == 'bot' ) 
        {
            html += '<p class="right">' + key.message + '</p>'
        }
        else if (key.name == 'button')
        {
            html = key.message
        }
        else
        {
            html += '<p class="left">'+ key.message + '</p>'
        }
    });
    // messages.push(html)
    console.log(messages)
    text_window.innerHTML = html;
    text_input.value = '' 
}
