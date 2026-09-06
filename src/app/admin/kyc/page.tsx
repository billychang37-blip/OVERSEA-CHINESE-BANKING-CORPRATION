"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle, XCircle, Search, FileText, Image as ImageIcon } from "lucide-react";

export default function AdminKycPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/admin/kyc');
      if (res.ok) {
        const data = await res.json();
        if (data.requests) {
          setRequests(data.requests);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleAction = async (transactionId: string, userId: string, action: 'approve' | 'reject') => {
    if (!window.confirm(`Are you sure you want to ${action} this KYC request?`)) return;
    
    setProcessing(transactionId);
    
    try {
      const res = await fetch('/api/admin/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId, userId, action })
      });
      if (res.ok) {
        fetchRequests();
      } else {
        alert("Action failed.");
      }
    } catch (err) {
      alert("Error processing action.");
    }
    
    setProcessing(null);
  };

  if (loading) return <div className="p-10">Loading KYC requests...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">KYC Applications</h1>
          <p className="text-gray-500">Review user identity verification requests</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="py-4 px-6 font-semibold">User</th>
                <th className="py-4 px-6 font-semibold">Document Type</th>
                <th className="py-4 px-6 font-semibold">Document Preview</th>
                <th className="py-4 px-6 font-semibold">Date Submitted</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.length === 0 ? (
                <tr><td colSpan={6} className="py-10 text-center text-gray-500">No KYC requests found.</td></tr>
              ) : (
                requests.map((req) => {
                  let docType = "Unknown";
                  let docData = "";
                  try {
                    const parsed = JSON.parse(req.description);
                    docType = parsed.documentType;
                    docData = parsed.documentData;
                  } catch (e) {}
                  
                  return (
                    <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900">{req.profiles?.first_name} {req.profiles?.last_name}</div>
                        <div className="text-sm text-gray-500">{req.profiles?.email}</div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 capitalize">
                        {docType.replace('_', ' ')}
                      </td>
                      <td className="py-4 px-6">
                        {docData ? (
                          <div className="w-16 h-12 rounded border bg-gray-100 overflow-hidden cursor-pointer" onClick={() => window.open(docData)}>
                            <img src={docData} className="w-full h-full object-cover" alt="Document" />
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm flex items-center gap-1"><ImageIcon className="w-4 h-4"/> No Image</div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {new Date(req.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          req.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          req.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {req.status === 'completed' ? 'Approved' : req.status === 'failed' ? 'Rejected' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {req.status === 'pending' && (
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleAction(req.id, req.user_id, 'approve')}
                              disabled={processing === req.id}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Approve"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleAction(req.id, req.user_id, 'reject')}
                              disabled={processing === req.id}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Reject"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
