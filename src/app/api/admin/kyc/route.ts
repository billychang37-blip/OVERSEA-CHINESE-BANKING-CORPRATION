import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { transactionId, userId, action } = await request.json(); // action = 'approve' or 'reject'
    
    if (!transactionId || !userId || !action) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const newKycStatus = action === 'approve' ? 'verified' : 'unverified';
    const newTxStatus = action === 'approve' ? 'completed' : 'failed';

    // 1. Update user metadata
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: { kyc_status: newKycStatus }
    });

    if (authError) {
      console.error("Failed to update auth metadata", authError);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    // 2. Update transaction status
    const { error: txError } = await supabaseAdmin
      .from('transactions')
      .update({ status: newTxStatus })
      .eq('id', transactionId);

    if (txError) {
      console.error("Failed to update transaction", txError);
      return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server Error' }, { status: 500 });
  }
}
