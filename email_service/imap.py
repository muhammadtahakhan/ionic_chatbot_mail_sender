import imaplib
import base64
import os
import email
import smtplib
import time
import mailparser
import json
from time import sleep

#email_user = input('Email: ')
#email_pass = input('Password: ')
mail = imaplib.IMAP4_SSL("imap.gmail.com", 993)
#print(mail)
#mail.select( "INBOX" , False )
mail.login('email', 'password')
mail.select('INBOX', False)
# print(mail)
type, data = mail.search(None, 'ALL')
latest_email_uid = data[0].split()[-1]
print ('last id is ->', latest_email_uid)
# result, data = mail.uid('fetch', latest_email_uid, '(RFC822)')


typ, data = mail.fetch(latest_email_uid, '(RFC822)' )
print ('result ->', typ)
raw_email = data[0][1]
mail = mailparser.parse_from_bytes(raw_email)
print (mail.from_)
print (mail.subject)


# # print( data)
# print("=====================")

# -------------------------------------------------
#
# Utility to read email from Gmail Using Python
#
# ------------------------------------------------

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
        print(id_list)
      
        # for i in reversed(range(first_email_id, latest_email_id)):
        email = []
        
        for idx, i in enumerate(id_list):
            # print('iiiii========================', i)
            typ, data = mail.fetch(i, '(RFC822)' )
            raw_email = data[0][1]
            raw_email = str(raw_email, 'utf-8')
            mail_data = mailparser.parse_from_string(raw_email)
            data = {'subject':mail_data.subject, 'from':mail_data.from_, 'body':mail_data.body}
            email.insert(idx, data)
            if idx == 10:
                break
           
        print(email)
    except Exception as e:
        print (e)

read_email_from_gmail()
