
watchMsgs = function () {

    // const reading = setInterval(() =>{

    console.log('looping lendo...');

    const endpoint  = "https://one-webhook-chat-hj57u.ondigitalocean.app/api/v1/one/web-whatsapp/webhook";
    const messages  = [];
    const dados     = [];
    const dadosMsg  = [];

    typeof messages;

    const msgs = document.querySelectorAll('._amjv._aotl')
    console.log('|| - lendo chat... - ||')
    const dArr = [...msgs];


    for (let index = 0; index < dArr.length; index++) {
        
        let typeMessage         = "";
        let mensagem            = "";
        let checkTypeMessage    = "";
        let timeMEssage         = "";
        checkTypeMessage = dArr[index].querySelector('div');

        // detectdando files
        //console.log(dArr[index]);

        // verifica se eh aviso de conta empresarial
        if (dArr[index].querySelector('._amki') || dArr[index].querySelector('._amkg')) {
            console.log('tem info inicial');
            continue;
        } else {

            if(dArr[index].querySelector('img')) {
                let imgFile     = dArr[index].querySelector('.x15kfjtz.x1c4vz4f.x2lah0s.xdl72j9.x14tgpju').getAttribute('src');
                let imgMime     = imgFile.split(':')[1].split('/')[1].split(';')[0]; // todos são .jpg...
                console.log('mime file = ', imgMime);
                console.log('é file', imgFile); //dArr[index].querySelector('.x1rg5ohu.x16dsc37')

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
                mensagem = dArr[index].querySelector("." + typeMessage).querySelector("span[dir]").querySelector("span").textContent 

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

            /* dados[index] = {
                "tipoMensagem"  : typeMessage == 'message-out' ? 'remetente' : 'destinatário', 
                "dataMsg"       : timeMEssage,
                "mensagem"      : mensagem,
                "idMdg"         : idMensagem,
                "tel"           : idTelefoneDestinatario,
            }; */

            dados[index] = {
                "app": "privatepartners",
                "chat_id": "00000fixo-ONE",
                "name_from": typeMessage == 'message-out' ? 'Eu' : 'destinatário',
                "phone_from": idTelefoneDestinatario,
                "messages": [
                    {
                        "message_id": idMensagem,
                        "message": mensagem,
                        "file": null,
                        "date": timeMEssage,
                        "direction": typeMessage == "message-out" ? 'OUTGOING' : 'INTGOING',
                        "name_to": "???",
                        "phone_to": idTelefoneDestinatario
                    }
                ]
            };

            /* 
            var data = new FormData();
            data.append("json", JSON.stringify(dados));

            fetch(endpoint,
                {
                    method: "POST",
                    body: data
                })
                .then(function (res) { 
                    // return res.json();
                    console.log(res); 
                })
                .catch(() => console.log('erro' + res)) 
            */

        }

        // console.log(dados);


        // dArr[index].querySelector('.message-out').textContent; // mensagem ok

    }

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

