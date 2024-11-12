
watchMsgs = function () {

    // const reading = setInterval(() =>{

    console.log('looping lendo...');

    const endpoint  = "https://one-webhook-chat-hj57u.ondigitalocean.app/api/v1/one/web-whatsapp/webhook";
    const dadosMsg  = [];

    // typeof messages;

    const msgs = document.querySelectorAll('._amjv._aotl')
    console.log('|| - lendo chat... - ||')
    const dArr = [...msgs];


    for (let index = 0; index < dArr.length; index++) {
        
        let typeMessage         = "";
        let mensagem            = "";
        let checkTypeMessage    = "";
        let timeMEssage         = "";
        let imgFile             = {};
        checkTypeMessage = dArr[index].querySelector('div');

        // detectdando files
        //console.log(dArr[index]);

        // verifica se eh aviso de conta empresarial
        if (dArr[index].querySelector('._amki') || dArr[index].querySelector('._amkg')) {
            console.log('tem info inicial');
            continue;
        } else {

            if(dArr[index].querySelector('img')) {
                imgFile = {
                    'image'     : dArr[index].querySelector('.x15kfjtz.x1c4vz4f.x2lah0s.xdl72j9.x14tgpju').getAttribute('src'),
                    'image2'    : dArr[index].querySelector('.x15kfjtz.x1c4vz4f.x2lah0s.xdl72j9.x127lhb5.x4afe7t.xa3vuyk.x10e4vud').getAttribute('src')
                }
                /* console.log('img1 = ', imgFile.image);
                console.log('img2 = ', imgFile.image2); */

            } else if(dArr[index].querySelector('div[role=button]')){
                console.log('eh arquivo de baixar');
                
/*                 console.log(dArr[index]);
                let nameZip = dArr[index].querySelector('div[role=button]').querySelector('.x13faqbe._ao3e').textContent;
                console.log('nome do zip', nameZip);
                console.log('tamanho do zip =  ', dArr[index].querySelector('.x1rg5ohu.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft.xwcf1sq').textContent); */
                continue;
            }else {

                //verifica se remetende ou destinatario
                if (checkTypeMessage.classList.contains('message-out')) {
                    typeMessage = 'message-out'; // remetente
                } else {
                    typeMessage = 'message-in'; // destinatario
                }

                timeMEssage = dArr[index].querySelector('.copyable-text').getAttribute('data-pre-plain-text').split('[')[1].split(']')[0];   
                dArr[index].querySelector("." + typeMessage).querySelector("span[dir]").querySelectorAll("span").forEach(element => {
                    mensagem +=  element.textContent;
                }); 

            }

            //let timeMEssage = dArr[index].querySelector('.copyable-text').getAttribute('data-pre-plain-text').split('[')[1].split(']')[0];
            let idMensagem = dArr[index].getAttribute('data-id');
            let idTelefoneDestinatario = dArr[index].getAttribute('data-id').split('_')[1].split('@')[0];

            /* console.log('tipo de envio = ', typeMessage == 'message-out' ? 'remetente' : 'destinatário');
            console.log('data mensagem = ', timeMEssage);
            console.log('mensagem = ', mensagem);
            console.log('id mensagem = ', idMensagem);
            console.log('Tel destinatário = ', idTelefoneDestinatario);
            console.log('___________________________________________________'); */

            dadosMsg[index] = {
                "message_id": idMensagem,
                "message": mensagem,
                "file": imgFile ? imgFile : null,
                "date": timeMEssage,
                "direction": typeMessage == "message-out" ? 'OUTGOING' : 'INTGOING',
                "name_to": "???",
                "phone_to": idTelefoneDestinatario,
                "name_from": typeMessage == 'message-out' ? 'Eu' : 'destinatário',
                "phone_from": idTelefoneDestinatario,
            };

        }
        
    }
    
    // json infos fixas
    const dados     = {
        "app": "privatepartners",
        "chat_id": "000001-ONE",
        "chat_group": "chat-private",
        "messages": JSON.stringify(dadosMsg)
    };

    console.log(dados);

    fetch(endpoint,
        {
            method: "POST",
            body: JSON.stringify(dados)
        })
        .then(function (res) { 
            // return res.json();
            console.log(res); 
        })
        .catch(() => console.log('erro' + res)) 

    // },10000);

}


//lista de conversas

// buscando elemento para click
const timer = setInterval(() => {

    // add bt header
    const header = document.querySelector('.x1qlqyl8.x1pd3egz.xcgk4ki');

    if (header) {
        clearInterval(timer);

        const button = document.createElement('button');
        button.innerHTML = 'Iniciar';
        button.classList.add('bt-reading');

        button.addEventListener('click', () => {
            button.innerHTML = 'reading...';
            watchMsgs();
        });

        header.appendChild(button);
    }

}, 5000)

