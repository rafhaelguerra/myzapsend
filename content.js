
watchMsgs = function () {

    // config
    // const config_Aapp        = "patiobrasil"; //preencher
    // const config_Channel     = "OneAna123"; //preencher
    const config_Aapp        = "privatepartners"; //preencher
    const config_Channel     = "OneRafhael"; //preencher
    // const config_Chat_id     = "000001-ONE"; //dinamico
    const config_Chat_group  = "chat-private";

        console.log('|| - lendo chat... - ||');

        const endpoint  = "https://one-webhook-chat-hj57u.ondigitalocean.app/api/v1/one/web-whatsapp/webhook";
        const dadosMsg  = [];

        var msgs        = document.querySelectorAll('._amjv._aotl');
        var nameTo      = document.querySelectorAll('#main header .x1iyjqo2');
        var nameTo      = nameTo[0].innerHTML;
        const dArr      = [...msgs];
        
        for (let index = 0; index < dArr.length; index++) {
            
            let mensagem            = "";
            let typeMessage         = "";
            let checkTypeMessage    = "";
            let timeMEssage         = "";
            let imgFile             = {};
            let objVideo            = {};
            checkTypeMessage        = dArr[index].querySelector('div');

            // verifica se eh aviso de conta empresarial
            if ( dArr[index].querySelector('._amki') 
                || dArr[index].querySelector('._amkg') 
                || dArr[index].querySelector('._amk4._aqjf._amkb') 
                || dArr[index].querySelector('._amk4._amkg._amkb') 
                || dArr[index].querySelector('._amk1')) 
            {
                console.log('tem info inicial');
                continue;
            } else {

                //verifica se remetende ou destinatario
                if (checkTypeMessage.classList.contains('message-out')) {
                    typeMessage = 'message-out'; // remetente
                } else {
                    typeMessage = 'message-in'; // destinatario
                }

                // se tem a class declarada nem armazena
                if ( !dArr[index].classList.contains('read_ok') ) {

                    // IMAGEM
                    if(dArr[index].querySelector('img')) {

                        // imagem  de anexo
                        if(dArr[index].querySelector('img').classList.contains('x15kfjtz')) {
                            dd('IMAGEM  ANEXO', 'orange', 'white');

                            let imagesArr = [];
                            dArr[index].querySelectorAll('img').forEach(element => {
                                imagesArr.push(element.getAttribute('src'));
                            }); 
    
                            imgFile = {
                                'image'     : imagesArr,
                                // 'image2'    : dArr[index].querySelector('.x15kfjtz.x1c4vz4f.x2lah0s.xdl72j9.x127lhb5.x4afe7t.xa3vuyk.x10e4vud').getAttribute('src')
                            }
                            console.log('img = ' + imgFile.image);
                        }
                        
                        if(dArr[index].querySelector('img').classList.contains('x1n2onr6')) {
                            dd('IMAGEM  AVATAR', 'orange', 'white');

                            // verifica se tem texto, senao pode ser áudio ou outra extensão
                            if(dArr[index].querySelector("." + typeMessage).querySelector("span[dir].copyable-text")){

                                mensagem = getText(dArr[index], typeMessage);
                                console.log('mensagem com avatar ',dArr[index].querySelector("." + typeMessage));

                            } else if(dArr[index].querySelector('button span[data-icon=audio-play]')){
                                console.log('ÁUDIO EM MENSAGEM INDIVIDUAL', 'blue', 'white');
                                /* if(){
                                    // querySelector('._ak8w').textContent
                                } */
        
        
                            } else {
                                console.log('não sei o q é');
                                continue;
                            }

                        }
   

                    // VIDEO
                    } else if(dArr[index].querySelector('.x10l6tqk.x1hhq9f1.xo29wiw.x1vjfegm.x1okw0bk.xh8yej3.x5yr21d.x121ad3m.xop5d2z.x1qp9xe7.x1hilzlb.xztyhrg.x18d0r48.x127lhb5.x4afe7t.xa3vuyk.x10e4vud')){
                        console.log('VÍDEO', 'blue', 'white');

                        objVideo = {
                            bgVideo     :  dArr[index].querySelector('.x10l6tqk.x1hhq9f1.xo29wiw.x1vjfegm.x1okw0bk.xh8yej3.x5yr21d.x121ad3m.xop5d2z.x1qp9xe7.x1hilzlb.xztyhrg.x18d0r48.x127lhb5.x4afe7t.xa3vuyk.x10e4vud').getAttribute('style'),
                            timeVideo   :  dArr[index].querySelector('.xx3o462.xuxw1ft.x78zum5.x6s0dn4.x1dxgm4b.x12lo8hy.x152skdk').textContent,
                        }

                        console.log('video = ' + objVideo.bgVideo);
                        console.log('tempo video = ' + objVideo.timeVideo);

                    } else if(dArr[index].querySelector('.icon-doc-generic')){
                        dd('DOWNLOAD', 'RED', 'white');

                        

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
                        console.log('ÁUDIO', 'blue', 'white');
                        /* if(){
                            // querySelector('._ak8w').textContent
                        } */


                    } else {

                        /* //verifica se remetende ou destinatario
                        if (checkTypeMessage.classList.contains('message-out')) {
                            typeMessage = 'message-out'; // remetente
                        } else {
                            typeMessage = 'message-in'; // destinatario
                        } */

                        timeMEssage = dArr[index].querySelector('.copyable-text').getAttribute('data-pre-plain-text').split('[')[1].split(']')[0]; // 12:38, 19/11/2024
                        timeMEssage = timeMEssage.replace(/\s/g, '');
                        timeMEssage = timeMEssage.split(',');
                        let strDate = timeMEssage[1].split('/');  
                        strDate = `${strDate[2]}-${strDate[1]}-${strDate[0]}`;
                        let strHour = timeMEssage[0]+":00";

                        timeMEssage = strDate + " " +strHour;

                        dArr[index].querySelector("." + typeMessage).querySelector("span[dir]").querySelectorAll("span").forEach(element => {
                            mensagem +=  element.textContent;
                        }); 

                    }

                    //let timeMEssage = dArr[index].querySelector('.copyable-text').getAttribute('data-pre-plain-text').split('[')[1].split(']')[0];
                    let idMensagem = dArr[index].getAttribute('data-id');
                    let idTelefoneDestinatario = dArr[index].getAttribute('data-id').split('_')[1].split('@')[0];

                    console.log('tipo de envio = ' + typeMessage == 'message-out' ? 'remetente' : 'destinatário');
                    console.log('data mensagem = ' + timeMEssage);
                    dd('mensagem = ' + mensagem, typeMessage == 'message-out' ? 'purple' : 'pink', typeMessage == 'message-out' ? 'white' : 'black');
                    console.log('id mensagem = '  + idMensagem);
                    console.log('Tel destinatário = '  + idTelefoneDestinatario);
                    console.log('name to = '  + nameTo);
                    console.log('___________________________________________________');

                    dadosMsg[index] = {
                        "message_id": idMensagem,
                        "message": mensagem,
                        "file": imgFile ? imgFile : null,
                        "video": objVideo ? objVideo : null,
                        "date": timeMEssage,
                        "direction": typeMessage == "message-out" ? 'OUTGOING' : 'INCOMING',
                        "name_to": nameTo,
                        "phone_to": idTelefoneDestinatario,
                        "name_from": typeMessage == 'message-out' ? 'Eu' : 'destinatário',
                        "phone_from": 'phone_from',
                    };

                    // json infos fixas
                    const dados     = {
                        "app"           : config_Aapp,
                        "channel"       : config_Channel,
                        "chat_id"       : dadosMsg[index].message_id.split('_')[1].split('@')[0]+"-"+config_Aapp,
                        "chat_group"    : config_Chat_group,
                        "messages"      : [dadosMsg[index]]
                    };

                    console.log(dados);
                    // dd(JSON.stringify(dados));

                    // enviando para API
                    fetch(endpoint,
                        {
                            method: 'POST',
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(dados)
                        })
                        .then(function (res) { 
                            // return res.json();
                            // dd(res);
                            console.log("==========================");
                            console.log("mensagem nova armazenada!");            
                            console.log("==========================");
                
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

            }
        }
               
        
        /* setTimeout(() => {
            watchMsgs();
        }, 10000); */

}



// envio para API
/* async function sendAPI(endpoint,dados) {
    const resultApi = await 
    fetch(endpoint,
        {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
        .then(function (res) { 
            // return res.json();
            // dd(res);
            console.log("==========================");
            console.log("mensagem nova armazenada!");            
            console.log("==========================");

            // adiciona  uma class para marcar como lido
            for (var i = 0; i < msgs.length; ++i) {
                msgs[i].classList.add('read_ok');
            }

        })
        .catch((res) => dd('erro' + res)) 
} */

// pega textos da  conversa
const getText = (elArr, typeMsg) => {
    let newMsg = "";
    elArr.querySelector("." + typeMsg).querySelector("span[dir].copyable-text").querySelectorAll("span").forEach(element => {
        newMsg +=  element.textContent;
    });
    console.log(newMsg);
    // debugger;
    return newMsg;
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