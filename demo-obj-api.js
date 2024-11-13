demo1:

{
    "5511993175172@c.us": [
        {
            "MessageId": "3EB04AB4BEF88E092D48B1",
            "Message": "ok2",
            "Chatid": "5511993175172@c.us",
            "File": null,
            "Ack": 2,
            "Datetime": 1730837194000,
            "Date": "2024-11-05T20:06:34.000Z",
            "Direction": "OUTGOING",
            "SentById": "5511987351726@c.us",
            "ChannelName": "Eu",
            "ChannelId": "1:1",
            "SentByNumber": "5511987351726",
            "sentByUserId": "5511987351726@c.us",
            "CreatedByUser": "5511987351726",
            "senderName": "Eu"
        }
    ],
    "app": "eazybe-private-yuri"
}

---------------------------------------------------------------------------------------
demo 2 e mais  limpo

{
    "app": "privatepartners",
    "chat_id": "5511987351726-one",
    "name_from": "Eu",
    "phone_from": "5511987351726",
    "messages":[
        {
            "message_id": "3EB04AB4BEF88E092D48B1",
            "message": "ok2",
            "file": null,
            "date": "2024-11-05T20:06:34.000Z",
            "direction": "OUTGOING",
            "name_to": "Fernando",
            "phone_to": "5511993175172"
        },
        {
            "message_id": "3EB04AB4BEF88E092D48B2",
            "message": "ok3",
            "file": null,
            "date": "2024-11-05T20:06:34.000Z",
            "direction": "INTGOING",
            "name_to": "Fernando",
            "phone_to": "5511993175172"
        },
        {
            "message_id": "3EB04AB4BEF88E092D48B3",
            "message": "ok4",
            "file": null,
            "date": "2024-11-05T20:06:34.000Z",
            "direction": "OUTGOING",
            "name_to": "Fernando",
            "phone_to": "5511993175172"
        }
    ]
}


endpoint : https://one-webhook-chat-hj57u.ondigitalocean.app/api/v1/one/web-whatsapp/webhook

ai vc tem uma opção.. ou me manda no corpo do json igual te mandei ali em cima o 

app: privatepartners
ou me manda na url via get  ?app=privatepartners (ultimo caso)
