
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
        let objVideo            = {};
        checkTypeMessage = dArr[index].querySelector('div');

        // detectdando files
        console.log(dArr[index]);

        // verifica se eh aviso de conta empresarial
        if (dArr[index].querySelector('._amki') || dArr[index].querySelector('._amkg')) {
            console.log('tem info inicial');
            continue;
        } else {

            // IMAGEM
            if(dArr[index].querySelector('img')) {

                let imagesArr = [];
                dArr[index].querySelectorAll('img').forEach(element => {
                    imagesArr.push(element.getAttribute('src'));
                }); 

                imgFile = {
                    'image'     : imagesArr,
                    // 'image2'    : dArr[index].querySelector('.x15kfjtz.x1c4vz4f.x2lah0s.xdl72j9.x127lhb5.x4afe7t.xa3vuyk.x10e4vud').getAttribute('src')
                }
                console.log('img = ', imgFile.image);

            } else if(dArr[index].querySelector('div[role=button]')){
                const _parent = dArr[index].querySelector('div[role=button]');
                console.log('eh arquivo de baixar');

                // VIDEO
                if(_parent.querySelector('span[data-icon=msg-video]')){
                    console.log('arquivo de  video');
                    let textInfosVideo = [];
                    _parent.querySelector('.x78zum5.x6s0dn4.x10l6tqk.xy1j3rs.xi8xln7.x11uqc5h.xx3o462.x1ncwhqj.x152skdk.x1dxgm4b').querySelectorAll('span').forEach(el => {
                        textInfosVideo.push(el.textContent)
                    });

                    // console.log(textInfosVideo);

                    objVideo = {
                        bgVideo :  _parent.querySelector('.x10l6tqk.x1hhq9f1.xo29wiw.x1vjfegm.x1okw0bk.xh8yej3.x5yr21d.x121ad3m.xop5d2z.x1qp9xe7.x1hilzlb.xztyhrg.x18d0r48.x14tgpju').getAttribute('style'),
                        bgVideo2 :  _parent.querySelector('.x10l6tqk.x1hhq9f1.xo29wiw.x1vjfegm.x1okw0bk.xh8yej3.x5yr21d.x121ad3m.xop5d2z.x1qp9xe7.x1hilzlb.xztyhrg.x18d0r48.x127lhb5.x4afe7t.xa3vuyk.x10e4vud').getAttribute('style'),
                        timeVideo :  textInfosVideo[1],
                    }
                }

                // console.log(objVideo);
                
                /*                 
                console.log(dArr[index]);
                let nameZip = dArr[index].querySelector('div[role=button]').querySelector('.x13faqbe._ao3e').textContent;
                console.log('nome do zip', nameZip);
                console.log('tamanho do zip =  ', dArr[index].querySelector('.x1rg5ohu.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft.xwcf1sq').textContent); 
                */
                continue;

            // AUDIO
            } else if(dArr[index].querySelector('button span[data-icon=audio-play]')){
                console.log('é audio');
                /* if(){
                    // querySelector('._ak8w').textContent
                } */


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
                "video": objVideo ? objVideo : null,
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

    console.log(JSON.stringify(dados));
    /*

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
    */

    // },15000);

}


//lista de conversas

// buscando elemento para click
const timer = setInterval(() => {

    const modoAuto = false;

    // add bt header
    const header = document.querySelector('.x1qlqyl8.x1pd3egz.xcgk4ki');

    if (header) {
        clearInterval(timer);

        if(!modoAuto) {
            const button = document.createElement('button');
            button.innerHTML = 'Iniciar';
            button.classList.add('bt-reading');
    
            button.addEventListener('click', () => {
                button.innerHTML = 'reading...';
                watchMsgs();
            });
            header.appendChild(button); 

        } else {
            watchMsgs();
        }



    }

}, 5000)

