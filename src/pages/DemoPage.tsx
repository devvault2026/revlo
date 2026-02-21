import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, Globe, ShieldAlert } from 'lucide-react';

const DemoPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [html, setHtml] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDemo = async () => {
            if (!slug) return;

            try {
                const { data, error: dbError } = await supabase
                    .from('leads')
                    .select('generated_site_code, name')
                    .eq('slug', slug)
                    .single();

                if (dbError) throw new Error("Demo not found.");
                if (!data?.generated_site_code) throw new Error("No demo code generated for this client.");

                setHtml(data.generated_site_code);
            } catch (err: any) {
                console.error("Failed to load demo:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDemo();
    }, [slug]);

    if (loading) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#020408] text-white">
                <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-purple-600/20 rounded-full blur-2xl animate-pulse" />
                    <Globe className="w-16 h-16 text-purple-500 relative z-10 animate-spin-slow" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-[0.3em] italic mb-2">Initializing Demo</h2>
                <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Bridging Static Assets...</span>
                </div>
            </div>
        );
    }

    if (error || !html) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#020408] text-white p-6 text-center">
                <ShieldAlert className="w-16 h-16 text-red-500 mb-6" />
                <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Transmission Failed</h1>
                <p className="text-slate-400 max-w-md mb-8 uppercase text-xs font-bold leading-relaxed tracking-widest">
                    {error || "The requested intelligence profile does not exist or has been decommissioned."}
                </p>
                <a href="/" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    Return to HQ
                </a>
            </div>
        );
    }

    return (
        <iframe
            srcDoc={html}
            title="Revlo Client Demo"
            className="w-screen h-screen border-none"
            sandbox="allow-scripts allow-forms allow-same-origin"
        />
    );
};

export default DemoPage;
