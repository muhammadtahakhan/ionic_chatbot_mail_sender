from flask import Flask
import imaplib
import base64
import os
import email
import json
import mailparser


app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/fetch_mail")
def read_email_from_gmail():
    try:
        mail = imaplib.IMAP4_SSL("imap.gmail.com", 993)
        mail.login('muhammadtahakhan222@gmail.com', 'wglfquvpxfspafno')
        mail.list()
        mail.select('inbox')
        
        type, data = mail.search(None, '(UNSEEN)')
        mail_ids = data[0]

        id_list = mail_ids.split()   
        first_email_id = int(id_list[0])
        latest_email_id = int(id_list[-1])
        # print(id_list)
      
        # for i in reversed(range(first_email_id, latest_email_id)):
        email = []
        
        for idx, i in enumerate(id_list):
            # print('iiiii========================', i)
            typ, data = mail.fetch(i, '(RFC822)' )
            raw_email = data[0][1]
            raw_email = str(raw_email, 'utf-8')
            mail_data = mailparser.parse_from_string(raw_email)
            data = {'subject':mail_data.subject, 'from':mail_data.from_}
            email.insert(idx, data)
            if idx == 10:
                break
           
        return json.dumps(email) 
    except Exception as e:
        print (e)
 


if __name__ == '__main__':
    app.run(debug=True)
