import sys

with open('src/app/dashboard/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<ArrowUpRight, CreditCard className="w-5 h-5" />', '<ArrowUpRight className="w-5 h-5" />')

if 'import { CreditCard }' not in content and 'CreditCard' not in content.split('import')[1]:
    content = content.replace('ArrowUpRight\n} from "lucide-react";', 'ArrowUpRight, CreditCard\n} from "lucide-react";')

with open('src/app/dashboard/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
