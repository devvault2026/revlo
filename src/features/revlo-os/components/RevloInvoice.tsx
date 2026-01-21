import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Printer, Download, CheckCircle2, Building2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceProps {
    clientName?: string;
    amount?: number;
    status: 'pending' | 'paid';
    referenceId: string;
    date: Date;
    packageName?: string;
    description?: string;
}

const RevloInvoice: React.FC<InvoiceProps> = ({
    clientName = "ESDR Group",
    amount = 2500,
    status,
    referenceId,
    date,
    packageName = "Digital Infrastructure Launch",
    description = "Website Build, AI Chatbot Setup, Vault Integration, App Forms"
}) => {
    const invoiceRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!invoiceRef.current) return;

        try {
            const canvas = await html2canvas(invoiceRef.current, {
                scale: 2,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`Revlo-Invoice-${referenceId}.pdf`);
        } catch (err) {
            console.error("Invoice generation failed", err);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex justify-end gap-3 mb-6 noprint">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                >
                    <Download className="w-4 h-4" /> Download PDF
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 md:p-12 rounded-none shadow-2xl relative overflow-hidden text-slate-900"
                ref={invoiceRef}
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {/* Watermark / Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100/50 to-blue-100/50 rounded-bl-full pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start mb-16 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xl">
                            R
                        </div>
                        <div>
                            <h1 className="font-bold text-xl tracking-tight">REVLO AGENCY</h1>
                            <p className="text-xs text-slate-400 uppercase tracking-widest">Automation & Growth</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-4xl font-light text-slate-300">INVOICE</h2>
                        <p className="font-mono text-sm text-slate-500 mt-2">#{referenceId}</p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-12 mb-16 relative z-10">
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Billed To</h3>
                        <div className="space-y-1">
                            <h4 className="font-bold text-lg text-slate-900">{clientName}</h4>
                            <p className="text-slate-500 text-sm">Emmanuelle & Partners</p>
                            <p className="text-slate-500 text-sm">Ottawa, ON</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Payment Details</h3>
                        <div className="space-y-1">
                            <p className="text-sm text-slate-600"><span className="text-slate-400">Date Issued:</span> {date.toLocaleDateString()}</p>
                            <p className="text-sm text-slate-600"><span className="text-slate-400">Method:</span> Interac e-Transfer</p>
                            <p className="text-sm text-slate-600"><span className="text-slate-400">Sent To:</span> scalewithjaryd@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* Line Items */}
                <div className="mb-12 relative z-10">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-slate-100">
                                <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
                                <th className="text-right py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-50">
                                <td className="py-6">
                                    <p className="font-bold text-slate-900">{packageName}</p>
                                    <p className="text-sm text-slate-500 mt-1">{description}</p>
                                </td>
                                <td className="py-6 text-right font-mono font-medium">
                                    ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="py-6 text-right font-bold text-slate-900">Total Due</td>
                                <td className="py-6 text-right font-bold text-2xl font-mono text-purple-600">
                                    ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Status Stamp */}
                <div className="absolute bottom-12 right-12 transform -rotate-12 border-4 border-dashed rounded-xl px-8 py-2 z-0 opacity-50 scale-125"
                    style={{
                        borderColor: status === 'paid' ? '#22c55e' : '#eab308',
                        color: status === 'paid' ? '#22c55e' : '#eab308'
                    }}
                >
                    <span className="text-4xl font-black uppercase tracking-widest">
                        {status === 'paid' ? 'PAID' : 'PENDING'}
                    </span>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 pt-8 mt-12 text-center text-sm text-slate-400 relative z-10">
                    <p className="mb-2">Thank you for your business. Let's build something great.</p>
                    <p className="text-xs">Revlo Agency Inc. | www.wearerevlo.com</p>
                </div>
            </motion.div>
        </div>
    );
};

export default RevloInvoice;
