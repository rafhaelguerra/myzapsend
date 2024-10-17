
watchMsgs = function () {
    const msgs  = document.querySelectorAll('._amjv._aotl')
    console.log('lendo chat')
    const div_array = [...msgs];
    
    div_array.forEach(div => {
        console.log(div)
        // console.log(div.textContent); // texto
    });
    
}


//lista de conversas

// buscando elemento para click
const timer = setInterval(()=>{

    // add bt header
    const header = document.querySelector('.x1qlqyl8.x1pd3egz.xcgk4ki');

    if(header){        
        // clearInterval(timer);

        const button = document.createElement('button');
        button.innerHTML = 'reading...';
        button.classList.add('bt-reading');

        // button.addEventListener('click', () => {
        watchMsgs();
        // });

        header.appendChild(button);

    }



},10000)

