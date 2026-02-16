import React, { useEffect } from 'react';

declare global {
    interface Window {
        Cal?: any;
    }
}

const CalEmbed: React.FC = () => {
    useEffect(() => {
        if (window.Cal) {
            window.Cal.ns["30min"]("inline", {
                elementOrSelector: "#my-cal-inline-30min",
                config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
                calLink: "scalewithjaryd/30min",
            });

            window.Cal.ns["30min"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
        }
    }, []);

    return (
        <div className="w-full h-full min-h-[600px] lg:min-h-[700px] overflow-hidden rounded-[48px] bg-white/5 border border-white/10 relative">
            <div
                id="my-cal-inline-30min"
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                className="custom-scrollbar"
            />
        </div>
    );
};

export default CalEmbed;
