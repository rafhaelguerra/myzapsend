
watchMsgs = function () {

    const messages = [];
    typeof messages;

    const msgs  = document.querySelectorAll('._amjv._aotl')
    console.log('|| - lendo chat... - ||')
    const dArr = [...msgs];
    
    // dArr.forEach(div => {
    //     console.log(div)
    //     // console.log(div.textContent); // texto
    //     messages.destinatario
    // });
    // console.log('dArr tot = ' + dArr.length);

    for (let index = 0; index < dArr.length; index++) {
        let typeMessage         = '';
        
        // verifica se eh aviso de conta empresarial
        if(dArr[index].querySelector('._amki')) {
            console.log('tem info de  empresa');
            continue;
        } else {
            
            let checkTypeMessage    = dArr[index].querySelector('div');
            let timeMEssage         = dArr[index].querySelector('.copyable-text').getAttribute('data-pre-plain-text').split('[')[1].split(']')[0];
            let idMensagem          = dArr[index].getAttribute('data-id');
            let idTelefoneDestinatario = dArr[index].getAttribute('data-id').split('_')[1].split('@')[0];
            let mensagem            = ""; // mensagem ok

            //verifica se remetende ou destinatario
            if(checkTypeMessage.classList.contains('message-out')) {
                typeMessage = 'message-out'; // remetente
            } else {
                typeMessage = 'message-in'; // destinatario
            }
    
            mensagem = dArr[index].querySelector("."+typeMessage).textContent
    
            console.log('tipo de envio = ', typeMessage == 'message-out' ? 'remetente' : 'destinatário');
            console.log('data mensagem = ', timeMEssage);
            console.log('mensagem = ', mensagem);
            console.log('id mensagem = ', idMensagem);
            console.log('Tel destinatário = ', idTelefoneDestinatario);

        }



        // dArr[index].querySelector('.message-out').textContent; // mensagem ok
        
    }
    
}


//lista de conversas

// buscando elemento para click
const timer = setInterval(()=>{

    // add bt header
    const header = document.querySelector('.x1qlqyl8.x1pd3egz.xcgk4ki');

    if(header){        
        clearInterval(timer);

        const button = document.createElement('button');
        button.innerHTML = 'reading...';
        button.classList.add('bt-reading');

        button.addEventListener('click', () => {
        watchMsgs();
        });

        header.appendChild(button);

    }



},10000)

