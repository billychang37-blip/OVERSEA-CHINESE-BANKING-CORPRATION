"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { 
  Bell, User, LogOut, ChevronDown, Search, Menu, Home, Briefcase, 
  ArrowRightLeft, Landmark, Gift, Lock, Grid, FileText, MoreHorizontal, Settings, Send, ArrowUpCircle, PiggyBank
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      if (profileData) {
        setProfile(profileData);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [router]);

  const getPageTitle = () => {
    if (pathname === '/dashboard') return { title: `Hello, ${profile?.first_name || 'User'}`, sub: 'Good morning!' };
    if (pathname === '/dashboard/deposit') return { title: 'Deposit Options', sub: 'Select a funding method' };
    if (pathname.includes('/dashboard/deposit/bank')) return { title: 'Bank Transfer', sub: 'Add funds via local bank' };
    if (pathname.includes('/dashboard/deposit/crypto')) return { title: 'Cryptocurrency', sub: 'Deposit digital assets' };
    if (pathname.includes('/dashboard/gift-card')) return { title: 'Gift Card', sub: 'Instant deposit' };
    if (pathname === '/dashboard/transfer') return { title: 'Transfer Options', sub: 'Send money instantly' };
    if (pathname.includes('/dashboard/transfer/internal')) return { title: 'Internal Transfer', sub: 'Transfer to OCBC users' };
    if (pathname.includes('/dashboard/transfer/domestic')) return { title: 'Domestic Transfer', sub: 'Transfer to local banks' };
    if (pathname.includes('/dashboard/transfer/international')) return { title: 'International Transfer', sub: 'Global wire transfer' };
    if (pathname.includes('/dashboard/transfer/crypto')) return { title: 'Crypto Transfer', sub: 'Send digital assets' };
    if (pathname.includes('/dashboard/savings')) return { title: 'Savings', sub: 'Grow your wealth' };
    if (pathname.includes('/dashboard/soft-token')) return { title: 'Soft Token', sub: 'Secure authentication' };
    if (pathname.includes('/dashboard/connect-web3')) return { title: 'Connect (Web3)', sub: 'Decentralized assets' };
    if (pathname.includes('/dashboard/kyc')) return { title: 'KYC Verification', sub: 'Identity verification' };
    if (pathname.includes('/dashboard/transactions')) return { title: 'Transaction History', sub: 'View your recent activity' };
    if (pathname.includes('/dashboard/settings')) return { title: 'Settings', sub: 'Manage your preferences' };
    return { title: 'Dashboard', sub: 'Manage your account' };
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isDashboardHome = pathname === '/dashboard';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <svg className="animate-spin w-10 h-10 text-[#E81C24]" viewBox="0 0 50 50">
          <circle className="opacity-100" cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="90 150" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  const pageInfo = getPageTitle();

  return (
    <div className="font-sans selection:bg-[#E81C24] selection:text-white bg-[#F4F6F8] min-h-screen flex flex-col md:flex-row overflow-hidden">
      
      {/* ========================================================================= */}
      {/*                               DESKTOP SIDEBAR                             */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex w-[280px] bg-white border-r border-gray-100 flex-col h-screen shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
        <div className="h-28 flex items-center justify-between px-6 border-b border-gray-50">
          <img src="/logo_main.png" alt="OCBC Logo" className="w-[180px] h-auto object-contain cursor-pointer" onClick={() => router.push('/dashboard')} />
          <Menu className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 ml-2 shrink-0" />
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
          <div onClick={() => router.push('/dashboard')} className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname === '/dashboard' ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
            <Home className="w-5 h-5" />
            <span className="text-[14px]">Dashboard</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/transfer/internal')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/transfer/internal') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <ArrowRightLeft className="w-5 h-5" />
            <span className="text-[14px]">Internal Transfer</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/loan')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/loan') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Landmark className="w-5 h-5" />
            <span className="text-[14px]">Loan</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/deposit')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/deposit') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <ArrowUpCircle className="w-5 h-5" />
            <span className="text-[14px]">Deposit</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/savings')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/savings') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <PiggyBank className="w-5 h-5" />
            <span className="text-[14px]">Savings</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/gift-card')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/gift-card') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Gift className="w-5 h-5" />
            <span className="text-[14px]">Deposit Gift Card</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/soft-token')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/soft-token') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Lock className="w-5 h-5" />
            <span className="text-[14px]">Soft Token</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/connect-web3')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/connect-web3') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Grid className="w-5 h-5" />
            <span className="text-[14px]">Connect (Web3)</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/kyc')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/kyc') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[14px]">KYC</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/transactions')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/transactions') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[14px]">Transaction History</span>
          </div>
          <div 
            onClick={() => router.push('/dashboard/settings')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/settings') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[14px]">Settings</span>
          </div>
        </div>

        <div className="p-4 border-t border-gray-50">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-600 hover:bg-gray-50 hover:text-[#E81C24] rounded-xl font-semibold transition-colors">
            <LogOut className="w-5 h-5 opacity-80" />
            <span className="text-[14px]">Log Out</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/*                               MAIN CONTENT AREA                           */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Desktop Header */}
        <header className="hidden md:flex px-10 h-24 items-center justify-between sticky top-0 z-[100] bg-[#F4F6F8]/90 backdrop-blur-md">
          {isDashboardHome ? (
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">
                Hello, {profile?.first_name || 'Amanda'}
              </h1>
              <p className="text-gray-500 text-sm font-medium mt-0.5">Good morning!</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-500 font-semibold text-[13px] tracking-wide cursor-pointer hover:text-gray-700 transition-colors">
              DASHBOARD OVERVIEW <ChevronDown className="w-4 h-4" />
            </div>
          )}
          
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-white border-none rounded-full py-2.5 pl-10 pr-6 text-[13px] w-64 shadow-sm focus:ring-2 focus:ring-[#E81C24] outline-none text-gray-700"
              />
            </div>
            <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
              <Bell className="w-6 h-6 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E81C24] rounded-full flex items-center justify-center border-2 border-[#F4F6F8]">
                <span className="text-[9px] font-bold text-white leading-none">1</span>
              </div>
            </div>
            <div className="relative" id="profile-dropdown-container">
              <div 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className={`flex items-center gap-3 cursor-pointer group bg-white px-3 py-1.5 rounded-full border transition-all ${isProfileDropdownOpen ? 'border-gray-300 shadow-sm' : 'border-transparent hover:shadow-sm'}`}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 overflow-hidden border border-gray-200">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 opacity-80" />
                  )}
                </div>
                <span className="text-[13px] font-bold text-gray-800">
                  {profile?.full_name || (profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : 'User')}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isProfileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                  ></div>
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 overflow-hidden shrink-0">
                        {profile?.avatar_url ? (
                          <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 opacity-80" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[14px] font-bold text-gray-900 truncate">
                          {profile?.full_name || profile?.first_name || 'User'}
                        </p>
                        <p className="text-[12px] font-medium text-gray-500 truncate">
                          {profile?.email || 'User Account'}
                        </p>
                      </div>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          router.push('/dashboard/settings');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[13.5px] font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-400" /> Account Settings
                      </button>
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          router.push('/login');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[13.5px] font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" /> Add Another Account
                      </button>
                    </div>
                    <div className="p-2 border-t border-gray-100 bg-gray-50/30">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[13.5px] font-bold text-[#E81C24] hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden px-6 pt-12 pb-4 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-40">
          <img src="/logo_main.png" alt="OCBC" className="w-[140px] h-auto object-contain cursor-pointer" onClick={() => router.push('/dashboard')} />
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-700" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E81C24] rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-[9px] font-bold text-white leading-none">1</span>
              </div>
            </div>
            <button onClick={handleLogout} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <LogOut className="w-4 h-4 text-gray-600 ml-0.5" />
            </button>
          </div>
        </header>

        {/* Page Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 md:pb-0 relative">
          {children}
        </div>

        {/* Mobile Fixed Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 pb-6 shadow-[0_-10px_20px_rgba(0,0,0,0.04)] flex justify-between items-center z-50">
          <div onClick={() => router.push('/dashboard')} className="flex flex-col items-center justify-center relative cursor-pointer w-16">
            <Home className="w-6 h-6 text-[#E81C24] mb-1" />
            <span className="text-[10px] font-bold text-[#E81C24]">Home</span>
            <div className="absolute -bottom-2 w-8 h-1 bg-[#E81C24] rounded-t-md"></div>
          </div>
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-50 w-16">
            <Briefcase className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-[10px] font-medium text-gray-600">Account</span>
          </div>
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-50 w-16">
            <Send className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-[10px] font-medium text-gray-600 whitespace-nowrap">Transfer</span>
          </div>
          <div onClick={() => router.push('/dashboard/deposit')} className="flex flex-col items-center justify-center cursor-pointer opacity-50 w-16">
            <ArrowUpCircle className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-[10px] font-medium text-gray-600">Deposit</span>
          </div>
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-50 w-16">
            <Settings className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-[10px] font-medium text-gray-600">Settings</span>
          </div>
        </nav>

      </main>
    </div>
  );
}
