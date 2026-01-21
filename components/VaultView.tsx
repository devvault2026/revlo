
import React, { useState } from 'react';
import { VaultDocument } from '../types';
import { FileText, Search, Plus, Trash2, Edit, Save, Download, Tag } from 'lucide-react';

interface VaultViewProps {
  documents: VaultDocument[];
  setDocuments: React.Dispatch<React.SetStateAction<VaultDocument[]>>;
}

const VaultView: React.FC<VaultViewProps> = ({ documents, setDocuments }) => {
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
          title: 'Untitled Note',
          type: 'note',
          content: '# New Entry\n\nStart writing...',
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
    <div className="flex h-full bg-slate-950 text-slate-200 font-sans">
      {/* Sidebar List */}
      <div className="w-80 border-r border-slate-800 bg-slate-900 flex flex-col">
        <div className="p-4 border-b border-slate-800">
           <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold text-white">The Vault</h2>
               <button onClick={handleCreate} className="p-1.5 bg-accent-500 rounded text-slate-900 hover:bg-accent-400">
                   <Plus size={16} />
               </button>
           </div>
           <div className="relative">
               <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
               <input 
                   value={searchQuery}
                   onChange={e => setSearchQuery(e.target.value)}
                   className="w-full bg-slate-950 border border-slate-700 rounded pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                   placeholder="Search knowledge base..."
               />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
            {filteredDocs.map(doc => (
                <div 
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors ${selectedDocId === doc.id ? 'bg-slate-800 border-l-2 border-l-accent-500' : ''}`}
                >
                    <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-white truncate pr-2">{doc.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                            doc.type === 'research' ? 'bg-purple-900/30 text-purple-400' : 
                            doc.type === 'uploaded' ? 'bg-blue-900/30 text-blue-400' : 
                            'bg-slate-700 text-slate-400'
                        }`}>{doc.type}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500 mb-2">
                        {new Date(doc.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {doc.tags.map(tag => (
                            <span key={tag} className="text-[10px] text-slate-400 bg-slate-950 px-1.5 rounded flex items-center">
                                <Tag size={8} className="mr-1"/> {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Editor / Reader */}
      <div className="flex-1 flex flex-col bg-slate-950">
          {activeDoc ? (
              <>
                <div className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between">
                    <div className="flex-1 mr-4">
                        {isEditing ? (
                            <input 
                                value={activeDoc.title} 
                                onChange={(e) => handleUpdateTitle(e.target.value)}
                                className="bg-slate-950 text-xl font-bold text-white border-b border-accent-500 focus:outline-none w-full"
                            />
                        ) : (
                            <h1 className="text-xl font-bold text-white truncate">{activeDoc.title}</h1>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setIsEditing(!isEditing)} 
                            className={`p-2 rounded transition-colors ${isEditing ? 'bg-accent-500 text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                        >
                            {isEditing ? <Save size={18} /> : <Edit size={18} />}
                        </button>
                        <button 
                            onClick={() => handleDelete(activeDoc.id)} 
                            className="p-2 rounded bg-slate-800 text-red-500 hover:bg-red-900/20"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto">
                        {isEditing ? (
                            <textarea 
                                value={activeDoc.content}
                                onChange={(e) => handleUpdateContent(e.target.value)}
                                className="w-full h-[80vh] bg-transparent text-slate-300 font-mono text-sm focus:outline-none resize-none"
                            />
                        ) : (
                            <div className="prose prose-invert prose-slate max-w-none">
                                {/* Simple Markdown Rendering simulation - mapping newlines to paragraphs */}
                                {activeDoc.content.split('\n').map((line, i) => {
                                    if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-white mb-4 mt-6">{line.replace('# ', '')}</h1>;
                                    if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mb-3 mt-5">{line.replace('## ', '')}</h2>;
                                    if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mb-2 mt-4">{line.replace('### ', '')}</h3>;
                                    if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc text-slate-300 mb-1">{line.replace('- ', '')}</li>;
                                    return <p key={i} className="text-slate-300 mb-2 leading-relaxed">{line}</p>;
                                })}
                            </div>
                        )}
                    </div>
                </div>
              </>
          ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                  <FileText size={64} className="opacity-20 mb-4"/>
                  <p>Select a document from the Vault.</p>
              </div>
          )}
      </div>
    </div>
  );
};

export default VaultView;
