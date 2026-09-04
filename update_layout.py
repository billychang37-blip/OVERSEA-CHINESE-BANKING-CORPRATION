import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    layout = f.read()

layout = layout.replace(
'''          <div 
            onClick={() => router.push('/dashboard/soft-token')}
            className={lex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors }
          >
            <Lock className="w-5 h-5" />
            <span className="text-[14px]">Soft Token</span>
          </div>''',
'''          {!profile?.soft_token && (
            <div 
              onClick={() => router.push('/dashboard/soft-token')}
              className={lex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors }
            >
              <Lock className="w-5 h-5" />
              <span className="text-[14px]">Soft Token</span>
            </div>
          )}'''
)

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout)

with open('src/app/dashboard/page.tsx', 'r', encoding='utf-8') as f:
    dash = f.read()

dash = dash.replace(
'''            <div onClick={() => router.push('/dashboard/soft-token')} className="bg-gray-50 hover:bg-red-50 transition-colors p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#E81C24] shadow-sm group-hover:scale-110 transition-transform">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">Soft Token</span>
            </div>''',
'''            {!profile?.soft_token && (
              <div onClick={() => router.push('/dashboard/soft-token')} className="bg-gray-50 hover:bg-red-50 transition-colors p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#E81C24] shadow-sm group-hover:scale-110 transition-transform">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">Soft Token</span>
              </div>
            )}'''
)

with open('src/app/dashboard/page.tsx', 'w', encoding='utf-8') as f:
    f.write(dash)

print('Hidden conditional links')
