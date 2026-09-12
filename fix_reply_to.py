import re

with open('src/app/api/auth/welcome/route.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("reply_to: 'support@corecoin.co',", "replyTo: 'support@corecoin.co',")

with open('src/app/api/auth/welcome/route.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed replyTo typo in Resend API")
