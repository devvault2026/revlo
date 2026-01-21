import React, { useEffect, useRef } from 'react';

interface SitePreviewProps {
  htmlContent: string;
}

const SitePreview: React.FC<SitePreviewProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [htmlContent]);

  return (
    <div className="w-full h-full bg-white/50 backdrop-blur-sm border border-purple-100 rounded-lg overflow-hidden flex flex-col shadow-2xl">
      <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-purple-50/">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-slate-400 text-xs font-mono">Live Preview: localhost:3000/demo/v1</div>
        <div></div>
      </div>
      <iframe
        ref={iframeRef}
        title="Site Preview"
        className="w-full flex-1 bg-white"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default SitePreview;