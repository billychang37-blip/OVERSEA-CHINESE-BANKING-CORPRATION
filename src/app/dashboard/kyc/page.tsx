"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle2, 
  Lock, Headphones, Image as ImageIcon, ArrowRight, ChevronDown, FileText
} from "lucide-react";

export default function KYCPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      if (selectedFile.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  return (
    <div className="px-4 md:px-10 pb-12 pt-6 w-full animate-in fade-in duration-500">
      <div className="max-w-[1300px]">
        
        {/* Back Button */}
        <div 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 font-semibold text-[15px] cursor-pointer mb-6 hover:opacity-80 transition-opacity w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </div>

        {/* Main Massive Card */}
        <div className="bg-white rounded-[2rem] p-5 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
            
            {/* Left Column - Form & Info */}
            <div className="space-y-8">
              
              {/* Header */}
              <div>
                <div className="flex items-center gap-5 mb-5">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center border border-red-100/50">
                    <ShieldCheck className="w-7 h-7 text-[#E81C24]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-[22px] font-bold text-gray-900 mb-1 tracking-tight">Complete Your KYC Verification</h1>
                    <p className="text-gray-500 font-medium text-[14px]">Your identity. Our priority.</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-[14px] leading-relaxed max-w-2xl">
                  In line with global regulations and to ensure the security of your account, all users are required to complete <span className="font-bold text-[#E81C24]">Know Your Customer (KYC)</span> verification before accessing full banking services.
                </p>
              </div>

              {/* Why KYC is Important Banner */}
              <div className="bg-[#FFF4F4] border border-[#FFE5E8] rounded-2xl p-4 md:p-6 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-[#E81C24] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">Why KYC is Important</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    KYC helps us verify your identity, prevent fraud, and protect your account and funds. It is a legal requirement and a critical step in ensuring a secure banking experience for you.
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="border border-gray-100 rounded-2xl p-7">
                <h3 className="text-[16px] font-bold text-gray-900 mb-6">Submit Your Information</h3>
                
                <div className="space-y-6">
                  {/* Document Type Dropdown */}
                  <div>
                    <label className="block text-gray-700 font-semibold text-[13px] mb-2">Document Type</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white cursor-pointer text-gray-600">
                        <option value="">Select document type</option>
                        <option value="passport">Passport</option>
                        <option value="id">National ID Card</option>
                        <option value="license">Driver's License</option>
                        <option value="tin">Tax Identification Number (TIN)</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Upload Document */}
                  <div>
                    <label className="block text-gray-700 font-semibold text-[13px] mb-2">Upload Document</label>
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors items-center bg-white p-1.5 pl-1.5 pr-4">
                      <label className="bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer text-gray-700 text-[13px] font-medium px-4 py-2 rounded-lg border border-gray-200/60 shrink-0">
                        Choose File
                        <input type="file" className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
                      </label>
                      <span className="text-gray-400 text-[13px] ml-3 truncate flex-1">
                        {file ? file.name : "No file chosen"}
                      </span>
                    </div>
                    <p className="text-gray-400 text-[12px] mt-2">Accepted formats: JPG, PNG, PDF (Max size: 5MB)</p>
                  </div>

                  {/* Document Preview */}
                  <div>
                    <label className="block text-gray-700 font-semibold text-[13px] mb-2">Document Preview</label>
                    <div className="border border-dashed border-gray-300 rounded-xl h-[160px] flex flex-col items-center justify-center bg-gray-50/50 relative overflow-hidden">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Document Preview" className="w-full h-full object-contain p-2" />
                      ) : file && !previewUrl ? (
                        <div className="flex flex-col items-center text-center px-4">
                          <FileText className="w-10 h-10 text-[#E81C24] mb-3" />
                          <span className="text-[14px] font-semibold text-gray-700 mb-1">Document Uploaded</span>
                          <span className="text-[12px] text-gray-500 truncate max-w-[200px]">{file.name}</span>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                          <span className="text-[14px] font-semibold text-gray-700 mb-1">No document uploaded yet</span>
                          <span className="text-[12px] text-gray-500">Preview will appear here</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button className="bg-[#E81C24] hover:bg-[#d41920] text-white font-bold py-3 px-6 rounded-xl transition-colors text-[14px]">
                    Submit for Review
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Side Cards */}
            <div className="space-y-5">
              
              {/* Important Notice */}
              <div className="bg-[#FFF4F4] border border-[#FFE5E8] rounded-2xl p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-[#E81C24]" />
                  <h3 className="text-[15px] font-bold text-[#E81C24]">Important Notice</h3>
                </div>
                <p className="text-[14px] font-bold text-gray-900 leading-snug mb-5 pr-4">
                  Accounts without verified KYC may face the following:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#E81C24] shrink-0" />
                    <span className="text-[13px] text-gray-600 font-medium">Account suspension or permanent ban</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#E81C24] shrink-0" />
                    <span className="text-[13px] text-gray-600 font-medium">Restrictions on deposits and withdrawals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#E81C24] shrink-0" />
                    <span className="text-[13px] text-gray-600 font-medium">Limits on transactions and transfers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#E81C24] shrink-0" />
                    <span className="text-[13px] text-gray-600 font-medium">Inability to access premium features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#E81C24] shrink-0" />
                    <span className="text-[13px] text-gray-600 font-medium">Delays in customer support</span>
                  </li>
                </ul>
              </div>

              {/* Your Information is Safe */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-5 h-5 text-gray-800" />
                  <h3 className="text-[15px] font-bold text-gray-900">Your Information is Safe</h3>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
                  We use bank-grade encryption to protect your personal data. Your information will never be shared with third parties.
                </p>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Secure • Encrypted • Confidential
                </div>
              </div>

              {/* Need Help? */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-2 mb-3">
                  <Headphones className="w-5 h-5 text-gray-800" />
                  <h3 className="text-[15px] font-bold text-gray-900">Need Help?</h3>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
                  If you have any questions or need assistance, our support team is here to help you.
                </p>
                <button className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-200 rounded-xl font-bold text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
