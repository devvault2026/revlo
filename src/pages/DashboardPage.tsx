import React from 'react';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 pt-32 pb-20"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-5xl font-black font-display mb-6">
                        Client <span className="gradient-text-alt">Dashboard</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-12">
                        Coming soon - Track your growth metrics and campaign performance
                    </p>

                    <div className="bg-white rounded-2xl p-12 shadow-xl border border-slate-200">
                        <p className="text-slate-500">
                            This dashboard will provide:<br />
                            • Real-time campaign analytics<br />
                            • Lead generation metrics<br />
                            • ROI tracking<br />
                            • Performance reports<br />
                            • Communication center
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardPage;
