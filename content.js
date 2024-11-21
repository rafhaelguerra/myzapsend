
watchMsgs = function () {

    // config
    const config_Aapp        = "privatepartners";
    const config_Channel     = "OneRafhael";
    const config_Chat_id     = "000001-ONE";
    const config_Chat_group  = "chat-private";


    // const reading = setInterval(() => {

        const endpoint  = "https://one-webhook-chat-hj57u.ondigitalocean.app/api/v1/one/web-whatsapp/webhook";
        const dadosMsg  = [];
        const localSave =  "ls_lastMSG";

        // typeof messages;

        const msgs = document.querySelectorAll('._amjv._aotl')
        dd('|| - lendo chat... - ||')
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
            // dd(dArr[index]);


            // verifica se eh aviso de conta empresarial
            if (dArr[index].querySelector('._amki') || dArr[index].querySelector('._amkg')) {
                dd('tem info inicial');
                continue;
            } else {


                // se tem a class declarada nem armazena
                if ( dArr[index].classList.contains('read_ok') ) {
                    continue;
                }else{

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
                        dd('img = ' + imgFile.image);

                    // VIDEO
                    } else if(dArr[index].querySelector('.x10l6tqk.x1hhq9f1.xo29wiw.x1vjfegm.x1okw0bk.xh8yej3.x5yr21d.x121ad3m.xop5d2z.x1qp9xe7.x1hilzlb.xztyhrg.x18d0r48.x127lhb5.x4afe7t.xa3vuyk.x10e4vud')){
                        dd('VÍDEO', 'blue', 'white');

                        objVideo = {
                            bgVideo     :  dArr[index].querySelector('.x10l6tqk.x1hhq9f1.xo29wiw.x1vjfegm.x1okw0bk.xh8yej3.x5yr21d.x121ad3m.xop5d2z.x1qp9xe7.x1hilzlb.xztyhrg.x18d0r48.x127lhb5.x4afe7t.xa3vuyk.x10e4vud').getAttribute('style'),
                            timeVideo   :  dArr[index].querySelector('.xx3o462.xuxw1ft.x78zum5.x6s0dn4.x1dxgm4b.x12lo8hy.x152skdk').textContent,
                        }

                        dd('video = ' + objVideo.bgVideo);
                        dd('tempo video = ' + objVideo.timeVideo);

                    } else if(dArr[index].querySelector('.icon-doc-generic')){
                        dd('DOWNLOAD', 'RED', 'white');

                        

                        // dd(objVideo);
                        
                        /*                 
                        dd(dArr[index]);
                        let nameZip = dArr[index].querySelector('div[role=button]').querySelector('.x13faqbe._ao3e').textContent;
                        dd('nome do zip', nameZip);
                        dd('tamanho do zip =  ', dArr[index].querySelector('.x1rg5ohu.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft.xwcf1sq').textContent); 
                        */
                        continue;

                    // AUDIO
                    } else if(dArr[index].querySelector('button span[data-icon=audio-play]')){
                        dd('ÁUDIO', 'blue', 'white');
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

                    dd('tipo de envio = ' + typeMessage == 'message-out' ? 'remetente' : 'destinatário');
                    dd('data mensagem = ' + timeMEssage);
                    dd('mensagem = ' + mensagem, typeMessage == 'message-out' ? 'purple' : 'pink', typeMessage == 'message-out' ? 'white' : 'black');
                    dd('id mensagem = '  + idMensagem);
                    dd('Tel destinatário = '  + idTelefoneDestinatario);
                    dd('___________________________________________________');

                    dadosMsg[index] = {
                        "message_id": idMensagem,
                        "message": mensagem,
                        "file": imgFile ? imgFile : null,
                        "video": objVideo ? objVideo : null,
                        "date": timeMEssage,
                        "direction": typeMessage == "message-out" ? 'OUTGOING' : 'INCOMING',
                        "name_to": "???",
                        "phone_to": idTelefoneDestinatario,
                        "name_from": typeMessage == 'message-out' ? 'Eu' : 'destinatário',
                        "phone_from": idTelefoneDestinatario,
                    };
                }

            }
            
        }

        // se houver mensagens continua para  gravar
        if (!!Object.values(dadosMsg).length) { 
            // json infos fixas
            const dados     = {
                "app"           : config_Aapp,
                "channel"       : config_Channel,
                "chat_id"       : config_Chat_id,
                "chat_group"    : config_Chat_group,
                "messages"      : dadosMsg
            };

            dd(dados);
            // dd(JSON.stringify(dados));

                // enviando para API
                fetch(endpoint,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dados)
                    })
                    .then(function (res) { 
                        // return res.json();
                        // dd(res);
                        dd("==========================");
                        dd("mensagem nova armazenada!");            
                        dd("==========================");
            
                        // adiciona  uma class para marcar como lido
                        for (var i = 0; i < msgs.length; ++i) {
                            msgs[i].classList.add('read_ok');
                        }
            
                    })
                    .catch((res) => dd('erro' + res)) 

        } else  {
            dd("==========================");
            dd("nenhuma mensagem nova...");            
            dd("==========================");
        }

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

const dd  = (str, bg='transparent',color='white') => {
    console.log('%c '+str+' ','color:'+color+';background-color:'+bg+';');
}