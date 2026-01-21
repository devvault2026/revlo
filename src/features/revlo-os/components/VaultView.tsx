import React, { useState } from 'react';
import { VaultDocument } from '../types';
import { FileText, Search, Plus, Trash2, Edit, Save, Download, Tag, Book, Maximize2, Minimize2 } from 'lucide-react';

interface VaultViewProps {
    documents: VaultDocument[];
    setDocuments: React.Dispatch<React.SetStateAction<VaultDocument[]>>;
}

const VaultView: React.FC<VaultViewProps> = ({ documents, setDocuments }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedDocId, setSelectedDocId] = useState<string | null>(documents.length > 0 ? documents[0].id : null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const activeDoc = documents.find(d => d.id === selectedDocId);

    const filteredDocs = documents.filter(d =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreate = () => {
        const newDoc: VaultDocument = {
            id: crypto.randomUUID(),
            title: 'Untitled Intel',
            type: 'note',
            content: '# New Intelligence Entry\n\nStart compiling operational data...',
            tags: ['draft'],
            createdAt: new Date().toISOString()
        };
        setDocuments(prev => [newDoc, ...prev]);
        setSelectedDocId(newDoc.id);
        setIsEditing(true);
    };

    const handleDelete = (id: string) => {
        setDocuments(prev => prev.filter(d => d.id !== id));
        if (selectedDocId === id) setSelectedDocId(null);
    };

    const handleUpdateContent = (val: string) => {
        if (!selectedDocId) return;
        setDocuments(prev => prev.map(d => d.id === selectedDocId ? { ...d, content: val } : d));
    };

    const handleUpdateTitle = (val: string) => {
        if (!selectedDocId) return;
        setDocuments(prev => prev.map(d => d.id === selectedDocId ? { ...d, title: val } : d));
    };

    return (
        <div className="flex h-full bg-white overflow-hidden">
            {/* Intel Sidebar */}
            <div className={`transition-all duration-300 border-r border-slate-200 bg-slate-50 flex flex-col h-full ${isSidebarCollapsed ? 'w-20' : 'w-80'}`}>
                <div className={`border-b border-slate-100 bg-white transition-all duration-300 relative flex flex-col ${isSidebarCollapsed ? 'h-24 items-center justify-center p-0' : 'p-8'}`}>
                    {!isSidebarCollapsed ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 bg-purple-600 rounded-full" />
                                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Intel Directory</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={handleCreate} className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all shadow-lg active:scale-95">
                                        <Plus size={16} />
                                    </button>
                                    <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                        <Minimize2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">The Vault</h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Secure Intelligence</p>

                            <div className="relative">
                                <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
                                <input
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-400 font-bold"
                                    placeholder="Find intelligence..."
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 items-center">
                            <button onClick={handleCreate} className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all shadow-lg active:scale-95">
                                <Plus size={20} />
                            </button>
                            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm">
                                <Maximize2 size={18} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {filteredDocs.map(doc => (
                        <div
                            key={doc.id}
                            onClick={() => setSelectedDocId(doc.id)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedDocId === doc.id
                                ? 'bg-purple-600 text-white border-purple-600 shadow-xl'
                                : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-100'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`font-black text-sm truncate pr-2 ${selectedDocId === doc.id ? 'text-white' : 'text-slate-900'}`}>{doc.title}</span>
                                <span className={`text-[8px] px-2 py-0.5 rounded-full border uppercase font-black tracking-widest ${selectedDocId === doc.id ? 'bg-purple-500/20 text-purple-200 border-purple-500/30' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>{doc.type}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {doc.tags.map(tag => (
                                    <span key={tag} className={`text-[9px] font-bold px-2 py-0.5 rounded-lg border transition-colors ${selectedDocId === doc.id ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                                        # {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                    {filteredDocs.length === 0 && (
                        <div className="p-10 text-center text-slate-400">
                            <p className="font-black text-[10px] uppercase tracking-widest leading-none">Record Not Found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Reading/Editing Area */}
            <div className="flex-1 flex flex-col bg-slate-50/50 overflow-hidden">
                {activeDoc ? (
                    <>
                        <div className="p-8 border-b border-slate-100 bg-white flex justify-between items-center shadow-sm z-10">
                            <div className="flex-1 mr-6 min-w-0">
                                {isEditing ? (
                                    <input
                                        value={activeDoc.title}
                                        onChange={(e) => handleUpdateTitle(e.target.value)}
                                        className="bg-slate-50 text-2xl font-black text-slate-900 border-2 border-purple-500/20 focus:border-purple-500 rounded-2xl w-full px-6 py-2 transition-all focus:outline-none"
                                    />
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                            <Book size={24} />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-black text-slate-900 truncate tracking-tight">{activeDoc.title}</h1>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Stored: {new Date(activeDoc.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all shadow-lg ${isEditing ? 'bg-purple-600 text-white shadow-purple-200' : 'bg-white border-2 border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-200'}`}
                                >
                                    {isEditing ? <Save size={20} /> : <Edit size={20} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(activeDoc.id)}
                                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-lg"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                            <div className="max-w-4xl mx-auto bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/40 p-16 min-h-[85vh]">
                                {isEditing ? (
                                    <textarea
                                        value={activeDoc.content}
                                        onChange={(e) => handleUpdateContent(e.target.value)}
                                        className="w-full h-full min-h-[60vh] bg-transparent text-slate-700 font-mono text-base focus:outline-none resize-none leading-relaxed"
                                        placeholder="Commence intellectual synthesis..."
                                    />
                                ) : (
                                    <div className="prose prose-slate max-w-none">
                                        {activeDoc.content.split('\n').map((line, i) => {
                                            if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-black text-slate-900 mb-10 mt-4 tracking-tight leading-none">{line.replace('# ', '')}</h1>;
                                            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black text-slate-900 mb-8 mt-12 tracking-tight flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
                                                {line.replace('## ', '')}
                                            </h2>;
                                            if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-black text-slate-800 mb-6 mt-10 uppercase tracking-widest text-xs">{line.replace('### ', '')}</h3>;
                                            if (line.startsWith('- ')) return (
                                                <div key={i} className="flex gap-4 mb-4">
                                                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                                                    <p className="text-slate-600 font-medium leading-relaxed">{line.replace('- ', '')}</p>
                                                </div>
                                            );
                                            if (line.trim() === '') return <div key={i} className="h-6"></div>;
                                            return <p key={i} className="text-slate-600 mb-6 leading-relaxed text-lg font-medium opacity-90">{line}</p>;
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-10 border border-slate-100 shadow-2xl">
                            <Book size={40} className="text-purple-300 animate-pulse" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-[0.3em] leading-none mb-4">Vault Inactive</h2>
                        <p className="max-w-xs mx-auto text-slate-400 font-bold text-sm leading-relaxed uppercase tracking-widest opacity-60">
                            Select a secure intelligence record from the vault index to begin review protocols.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VaultView;
