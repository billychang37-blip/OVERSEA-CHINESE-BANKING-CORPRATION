"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminKycPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (data && !error) {
      // Filter out users who haven't uploaded anything or have empty kyc_status
      // For now, let's just show all for the skeleton
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ kyc_status: newStatus })
      .eq('id', userId);
      
    if (!error) {
      alert(`KYC status updated to ${newStatus}`);
      fetchUsers();
    } else {
      alert(`Error updating status: ${error.message}`);
    }
  };

  if (loading) return <div>Loading KYC submissions...</div>;

  return (
    <div className="w-full animate-in fade-in duration-300">
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden mb-8">
        <div className="bg-[#3498db] text-white px-4 py-3 border-b-4 border-black">
          <h3 className="font-bold tracking-widest text-sm uppercase">Manage KYC Applications</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EAEAEA] border-b border-gray-300 text-xs uppercase tracking-widest text-gray-700">
                <th className="p-3 border-r border-white font-bold">User</th>
                <th className="p-3 border-r border-white font-bold">ID Document</th>
                <th className="p-3 border-r border-white font-bold">Current Status</th>
                <th className="p-3 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500 text-sm">No KYC applications found.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-sm font-medium border-r border-gray-100">
                      {user.first_name} {user.last_name} <br/>
                      <span className="text-gray-500 text-xs">{user.email}</span>
                    </td>
                    <td className="p-3 text-sm border-r border-gray-100">
                      {user.id_document_url ? (
                        <a href={user.id_document_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Document</a>
                      ) : (
                        <span className="text-gray-400 italic">Not Uploaded</span>
                      )}
                    </td>
                    <td className="p-3 text-sm border-r border-gray-100">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        user.kyc_status === 'approved' ? 'bg-green-100 text-green-700' : 
                        user.kyc_status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.kyc_status || 'pending'}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleUpdateStatus(user.id, 'approved')}
                          className="bg-[#2ecc71] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#27ae60] transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(user.id, 'rejected')}
                          className="bg-[#e74c3c] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#c0392b] transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
