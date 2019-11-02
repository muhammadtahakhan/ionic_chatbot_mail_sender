from flask import Flask, jsonify, request
import imaplib
import base64
import os
import email
import json
import mailparser
import smtplib



app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
@app.route("/send")
def send_email():
    try:
        args = request.args
        gmail_user = args['email']
        gmail_password = args['password']
        text = args['message']
        to = args['to']

        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(gmail_user, gmail_password)
        server.sendmail(gmail_user, to, text)
        server.quit()
        return 'sended'
    except Exception as e:
        return jsonify({'success':'false', 'message':'some thing is wrong with login credentials'})
 

@app.route("/fetch_mail")
def read_email_from_gmail():
    try:
        args = request.args
       
        mail = imaplib.IMAP4_SSL("imap.gmail.com", 993)
        mail.login(args['email'], args['password'])
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
            data = {'id':mail_data.message_id, 'subject':mail_data.subject, 'from':mail_data.from_, 'body':mail_data.body}
            email.insert(idx, data)
            if idx == 10:
                break
           
        return jsonify(email) 
    except Exception as e:
        return jsonify({'success':'false', 'message':'some thing is wrong with login credentials'})
 


if __name__ == '__main__':
    app.run(debug=True)
