import React from 'react';
import { motion } from 'framer-motion';
import { Star, PlayCircle } from 'lucide-react';

const testimonials = [
    {
        videoUrl: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023665/482268807_28714239028190908_2106583740464026710_n_fwvrem.mp4",
        name: "Verified Partner",
        role: "Agency Owner",
        tag: "Emotional Win",
        objectFit: "object-cover" as const
    },
    {
        videoUrl: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023844/Check_Out_Our_1_Testimonial___You_Cannot_Pay_For_Something_This_Good_1_okr5b6.mp4",
        name: "Elite Client",
        role: "Growth Partner",
        tag: "Must Watch",
        objectFit: "object-contain bg-black" as const
    },
    {
        videoUrl: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023677/5cf6990c-c4d7-4ba9-9b32-66fa2113d1d1_agmkru.mp4",
        name: "Scaling Founder",
        role: "Enterprise User",
        tag: "Scale Result",
        objectFit: "object-cover" as const
    },
    {
        videoUrl: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023688/URGENT_Agency_Owners_and_Entrepreneurs_-_Emotional_Testimonial_Video_Will_Blow_Your_Mind_1_ipz5cc.mp4",
        name: "Strategic Lead",
        role: "Industry Veteran",
        tag: "Strategy Win",
        objectFit: "object-cover" as const
    }
];

const TestimonialSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest mb-4 border border-purple-100"
                    >
                        <Star className="w-3 h-3 fill-current" /> Social Proof
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                        What Our Partners Say
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Real results, real scale. See how Revlo OS is transforming agency operations globally.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group bg-slate-900 rounded-3xl overflow-hidden shadow-2xl aspect-[9/16]"
                        >
                            {/* Watermark Overlay */}
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-[10px] font-black text-slate-900 shadow-lg">R</div>
                                <span className="text-[10px] text-white font-bold uppercase tracking-tighter drop-shadow-md">Revlo Verified</span>
                            </div>

                            {/* Play Hint */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                                    <PlayCircle className="w-8 h-8" />
                                </div>
                            </div>

                            <video
                                src={t.videoUrl}
                                className={`w-full h-full transition-all duration-700 ${t.objectFit} group-hover:scale-105`}
                                controls
                                preload="metadata"
                                playsInline
                                crossOrigin="anonymous"
                            >
                                <source src={t.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Info Overlay (Bottom) */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                                <span className="inline-block px-2 py-1 rounded bg-purple-600 text-[10px] font-bold text-white uppercase mb-2">
                                    {t.tag}
                                </span>
                                <h4 className="text-white font-bold text-lg">{t.name}</h4>
                                <p className="text-slate-400 text-sm">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex flex-wrap justify-center items-center gap-8 py-6 px-12 rounded-full border border-slate-100 bg-slate-50">
                        <div className="text-center">
                            <p className="text-2xl font-black text-slate-900">$2.4M+</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Revenue</p>
                        </div>
                        <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-slate-900">12k+</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leads Generated</p>
                        </div>
                        <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-slate-900">45+</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Partners</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
