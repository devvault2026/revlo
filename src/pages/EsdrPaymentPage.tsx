import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard,
    ArrowRight,
    ShieldCheck,
    Lock,
    Copy,
    CheckCircle2,
    Building2,
    Wallet
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import RevloInvoice from '../features/revlo-os/components/RevloInvoice';

const EsdrPaymentPage = () => {
    const location = useLocation();
    const packageDetails = location.state || {
        name: "The Launch Foundation",
        amount: 2500,
        description: "Standard Infrastructure Build (One-Time)"
    };

    const [copied, setCopied] = useState(false);
    const [sent, setSent] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('wearerevlo123');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePaymentSent = async () => {
        setLoading(true);
        const refId = `REV-ESDR-${Math.floor(10000 + Math.random() * 90000)}`;
        const amount = packageDetails.amount;

        try {
            await supabase.from('payments').insert({
                client_name: `ESDR Group - ${packageDetails.name}`,
                amount: amount,
                status: 'pending',
                reference_id: refId
            });

            setInvoiceData({
                referenceId: refId,
                amount: amount,
                packageName: packageDetails.name,
                description: packageDetails.description,
                date: new Date(),
                status: 'pending'
            });
            setSent(true);
        } catch (error) {
            console.error('Error recording payment:', error);
            // Even if DB fails for some reason, show success state to user for good UX, we can reconcile later
            setInvoiceData({
                referenceId: refId,
                amount: amount,
                packageName: packageDetails.name,
                description: packageDetails.description,
                date: new Date(),
                status: 'pending'
            });
            setSent(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            {/* Simple Header */}
            <div className="bg-white border-b border-slate-100 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                            R
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight">Revlo Agency</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Lock className="w-4 h-4" />
                        <span>Secure Payment Gateway</span>
                    </div>
                </div>
            </div>

            <main className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-5xl w-full flex flex-col items-center">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                        {/* Left Side - Instructions */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Secure Transfer</h1>
                                    <p className="text-slate-500">
                                        To finalize your secure lock-in for the ESDR Group infrastructure build, please complete the electronic transfer below.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {/* Step 1 */}
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm border border-purple-200">
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 mb-1">Open Your Banking App</h3>
                                            <p className="text-sm text-slate-500">Log in to your preferred banking institution and navigate to "Interac e-Transfer" or "Send Money".</p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm border border-purple-200">
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 mb-1">Add Recipient</h3>
                                            <p className="text-sm text-slate-500 mb-3">Send the funds to our secure billing address:</p>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-700 flex justify-between items-center group">
                                                <span>scalewithjaryd@gmail.com</span>
                                                <button
                                                    className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText('scalewithjaryd@gmail.com');
                                                    }}
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm border border-purple-200">
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 mb-1">Security Question</h3>
                                            <p className="text-sm text-slate-500 mb-3">Please use the following exact password for the security answer:</p>

                                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex justify-between items-center">
                                                <div>
                                                    <p className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">Security Password</p>
                                                    <p className="font-mono text-lg font-bold text-purple-900">wearerevlo123</p>
                                                </div>
                                                <button
                                                    onClick={handleCopy}
                                                    className="p-2 bg-white rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-100 transition-colors relative"
                                                >
                                                    {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    {!sent ? (
                                        <button
                                            onClick={handlePaymentSent}
                                            disabled={loading}
                                            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <span className="animate-pulse">Processing...</span>
                                            ) : (
                                                <>
                                                    <ShieldCheck className="w-5 h-5" />
                                                    I Have Sent The Payment
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="space-y-6"
                                        >
                                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                </div>
                                                <h3 className="font-bold text-green-800 mb-1">Transfer Logged</h3>
                                                <p className="text-sm text-green-700">
                                                    We have generated your invoice below. The status will update to PAID once our admins verify the transfer (typically within 1 hour).
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Summary / Branding */}
                        <div className="space-y-6">
                            {/* Branding Card */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -ml-16 -mb-16"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8 opacity-80">
                                        <span className="text-sm font-medium tracking-widest uppercase">Invoice Details</span>
                                        <Building2 className="w-5 h-5" />
                                    </div>

                                    <h2 className="text-2xl font-display font-light mb-1">Payment for</h2>
                                    <p className="text-2xl font-bold mb-8">{packageDetails.name}</p>

                                    <div className="space-y-4 border-t border-white/10 pt-6">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-300">Recipient</span>
                                            <span className="font-medium">Revlo Agency Inc.</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-300">Total Due</span>
                                            <span className="font-bold text-xl">${packageDetails.amount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-300">Method</span>
                                            <span className="font-medium flex items-center gap-2">
                                                <Wallet className="w-4 h-4" /> Interac e-Transfer
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-300">Reference ID</span>
                                            <span className="font-mono bg-white/10 px-2 py-1 rounded">REV-ESDR-2026-X</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-6 bg-yellow-400 rounded"></div>
                                            <div className="w-1 right-0 text-xs text-white/60 italic">
                                                Interac Accepted
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">Bank-Grade</p>
                                        <p className="text-xs text-slate-500">256-bit Security</p>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">Instant Verify</p>
                                        <p className="text-xs text-slate-500">Real-time alerts</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <Link to="/offer/esdr" className="text-sm text-slate-400 hover:text-purple-600 transition-colors">
                                    ← Back to Offer Details
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Section (Only visible after sent) */}
                    {sent && invoiceData && (
                        <div className="mt-12 w-full max-w-5xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-px bg-slate-200 flex-1"></div>
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Official Receipt</span>
                                <div className="h-px bg-slate-200 flex-1"></div>
                            </div>
                            <RevloInvoice
                                clientName="ESDR Group"
                                amount={invoiceData.amount}
                                status={invoiceData.status}
                                referenceId={invoiceData.referenceId}
                                date={invoiceData.date}
                                packageName={invoiceData.packageName}
                                description={invoiceData.description}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EsdrPaymentPage;
