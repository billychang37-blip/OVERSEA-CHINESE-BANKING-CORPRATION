import sys
import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add missing Lucide imports
imports = ["Menu", "Moon", "CreditCard", "User"]
for imp in imports:
    if imp not in content:
        content = content.replace('import {', f'import {{ {imp},')

# Replace Mobile Header
mobile_header_regex = re.compile(r'\{\/\* Mobile Header \*\/\}.*?<\/header>', re.DOTALL)
new_mobile_header = '''{/* Mobile Header */}
        <header className="md:hidden px-4 py-3 flex justify-between items-center bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6 text-gray-700 cursor-pointer" />
            <img src="/logo_main.png" alt="OCBC" className="w-[100px] h-auto object-contain cursor-pointer" onClick={() => router.push('/dashboard')} />
          </div>
          <div className="flex items-center space-x-3.5">
            <Moon className="w-5 h-5 text-gray-400" />
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-700" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E81C24] rounded-full flex items-center justify-center border-[1.5px] border-white">
                <span className="text-[8px] font-bold text-white leading-none">1</span>
              </div>
            </div>
            <div onClick={() => router.push('/dashboard/settings')} className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200 cursor-pointer">
               {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 opacity-80 text-gray-600" />
                )}
            </div>
          </div>
        </header>'''

content = mobile_header_regex.sub(new_mobile_header, content)

# Replace Mobile Fixed Bottom Nav
bottom_nav_regex = re.compile(r'\{\/\* Mobile Fixed Bottom Nav \*\/\}.*?<\/nav>', re.DOTALL)
new_bottom_nav = '''{/* Mobile Fixed Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A] px-6 py-3 flex justify-between items-center z-50">
          <div onClick={() => router.push('/dashboard')} className="flex flex-col items-center justify-center relative cursor-pointer w-12">
            <Home className="w-5 h-5 text-[#E81C24]" />
            <div className="absolute -bottom-2.5 w-1 h-1 bg-[#E81C24] rounded-full"></div>
          </div>
          <div className="flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-white w-12 transition-colors">
            <CreditCard className="w-5 h-5" />
          </div>
          <div onClick={() => router.push('/dashboard/transfer')} className="flex flex-col items-center justify-center cursor-pointer relative z-10 w-12">
            <div className="w-11 h-11 bg-[#E81C24] rounded-full flex items-center justify-center -mt-6 border-[3px] border-[#0F172A] shadow-lg">
               <ArrowRightLeft className="w-4 h-4 text-white" />
            </div>
          </div>
          <div onClick={() => router.push('/dashboard/soft-token')} className="flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-white w-12 transition-colors">
            <Lock className="w-5 h-5" />
          </div>
          <div onClick={() => router.push('/dashboard/settings')} className="flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-white w-12 transition-colors">
            <User className="w-5 h-5" />
          </div>
        </nav>'''

content = bottom_nav_regex.sub(new_bottom_nav, content)

# Update the content wrapper padding (so it doesn't crash with Smartsupp)
content = content.replace('pb-24 md:pb-0', 'pb-32 md:pb-0 bg-[#F8F9FA] md:bg-white')

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('layout.tsx updated')
