import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('KeyRound\n}', 'KeyRound,\n  Copy\n}')

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed imports')
