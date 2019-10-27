from flask import Flask
import imaplib
import base64
import os
import email
import json


app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/fetch_mail")
def fetch():
    mail = imaplib.IMAP4_SSL("imap.gmail.com", 993)
    mail.login('muhammadtahakhan222@gmail.com', 'wglfquvpxfspafno')
    mail.select('INBOX', False)
    type, data = mail.search(None, 'ALL')
    mail_ids = data[0]
    id_list = mail_ids.split()
    # return type(data)
    # mytuple = ("python", "json", "mysql")
    # return json.dumps(id_list)
    # print(data[0][0])
    items = []
    for response_part in data:
        item = {}
        if isinstance(response_part, tuple):
            msg = email.message_from_string(response_part[1].decode('utf-8'))
            print(msg)
            item['subject'] = msg['subject']
            item['from'] = msg['from']
            #item['body'] = mes['body']
            items.append(item)
    return {'datas': items}
            # print ('From : ' + email_from + '\n')
            # print ('Subject : ' + email_subject + '\n')
            # print(msg.get_payload(decode=True))
    


if __name__ == '__main__':
    app.run(debug=True)
