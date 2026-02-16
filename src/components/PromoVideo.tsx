import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, Users, TrendingUp, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const testimonials = [
    {
        url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023688/URGENT_Agency_Owners_and_Entrepreneurs_-_Emotional_Testimonial_Video_Will_Blow_Your_Mind_1_ipz5cc.mp4",
        poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023688/URGENT_Agency_Owners_and_Entrepreneurs_-_Emotional_Testimonial_Video_Will_Blow_Your_Mind_1_ipz5cc.jpg",
        title: "Emotional Growth",
        client: "Ecom Founder",
        id: "v1"
    },
    {
        url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023665/482268807_28714239028190908_2106583740464026710_n_fwvrem.mp4",
        poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023665/482268807_28714239028190908_2106583740464026710_n_fwvrem.jpg",
        title: "Scale Success",
        client: "Agency Owner",
        id: "v2"
    },
    {
        url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023677/5cf6990c-c4d7-4ba9-9b32-66fa2113d1d1_agmkru.mp4",
        poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023677/5cf6990c-c4d7-4ba9-9b32-66fa2113d1d1_agmkru.jpg",
        title: "Automation Edge",
        client: "Creative Director",
        id: "v3"
    },
    {
        url: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023844/Check_Out_Our_1_Testimonial___You_Cannot_Pay_For_Something_This_Good_1_okr5b6.mp4",
        poster: "https://res.cloudinary.com/dpfapm0tl/video/upload/v1769023844/Check_Out_Our_1_Testimonial___You_Cannot_Pay_For_Something_This_Good_1_okr5b6.jpg",
        title: "7-Figure Exit",
        client: "Patient Boost",
        id: "v4"
    }
];

const PromoVideo: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

    const nextTestimonial = () => {
        stopAllVideos();
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        stopAllVideos();
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const stopAllVideos = () => {
        Object.values(videoRefs.current).forEach(video => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        setPlayingId(null);
    };

    const togglePlay = (id: string) => {
        const video = videoRefs.current[id];
        if (!video) return;

        if (video.paused) {
            // Stop others first
            Object.keys(videoRefs.current).forEach(key => {
                if (key !== id && videoRefs.current[key]) {
                    videoRefs.current[key]!.pause();
                }
            });
            video.play();
            setPlayingId(id);
        } else {
            video.pause();
            setPlayingId(null);
        }
    };

    // Auto-scroll logic (optional, but let's keep it manual if user is interacting)

    return (
        <section className="relative py-24 bg-[#020408] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute inset-0 bg-grid-white opacity-[0.01]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col items-center text-center space-y-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full border border-red-500/20"
                    >
                        <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">
                            Warning: Industry Disruptive Content
                        </span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.9]"
                        >
                            THE PROOF <br />
                            <span className="gradient-text pr-10">OF CONCEPT.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl lg:text-2xl text-slate-400 max-w-2xl font-bold tracking-tight"
                        >
                            Watch why the world's elite agency owners are moving to Revlo. This isn't just a promo—it's the blueprint for absolute market domination.
                        </motion.p>
                    </div>
                </div>

                {/* Main Video Frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group mb-32"
                >
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.1)] bg-slate-900">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/4vrL5-yiR_o?autoplay=0&rel=0&modestbranding=1"
                            title="Revlo Promo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="scale-[1.01]"
                        />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-[26px] blur-2xl -z-10 opacity-50 transition-opacity duration-500" />
                </motion.div>

                {/* Testimonial Carousel Section */}
                <div className="relative pt-16 border-t border-white/5">
                    <div className="flex flex-col items-center mb-12">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4">Elite Success Signals</div>
                        <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter">Real Scalability Proof</h3>
                    </div>

                    <div className="relative flex items-center justify-center gap-4 lg:gap-8 min-h-[500px]">
                        {/* Nav Buttons */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-0 lg:left-4 z-40 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Carousel Content */}
                        <div className="w-full max-w-4xl mx-auto overflow-hidden px-4">
                            <div className="flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -100, scale: 0.9 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="relative w-full aspect-[9/16] lg:aspect-video rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl group cursor-pointer"
                                        onClick={() => togglePlay(testimonials[activeIndex].id)}
                                    >
                                        <video
                                            ref={el => videoRefs.current[testimonials[activeIndex].id] = el}
                                            src={testimonials[activeIndex].url}
                                            poster={testimonials[activeIndex].poster}
                                            playsInline
                                            preload="metadata"
                                            className="w-full h-full object-cover"
                                            onEnded={() => setPlayingId(null)}
                                        />

                                        {/* Play/Pause Overlay */}
                                        <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${playingId === testimonials[activeIndex].id ? 'opacity-0' : 'opacity-100'}`}>
                                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                                <Play className="w-8 h-8 text-white fill-white" />
                                            </div>
                                        </div>

                                        {/* Revlo Watermark */}
                                        <div className="absolute top-6 right-6 z-10 pointer-events-none flex flex-col items-end">
                                            <div className="flex items-center gap-2">
                                                <img src="/logo.png" alt="Revlo" className="w-10 h-10 object-contain brightness-0 invert" />
                                                <span className="text-[10px] font-black text-white italic tracking-tighter">REVLO</span>
                                            </div>
                                            <div className="text-[7px] font-black text-white/40 uppercase tracking-widest mt-1">Verified Protocol</div>
                                        </div>

                                        {/* Info Bar */}
                                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                            <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">{testimonials[activeIndex].client}</div>
                                            <div className="text-2xl font-black italic text-white uppercase tracking-tighter">{testimonials[activeIndex].title}</div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="absolute right-0 lg:right-4 z-40 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center gap-3 mt-12">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { stopAllVideos(); setActiveIndex(i); }}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-blue-600' : 'w-4 bg-white/10'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Stats Area */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 flex flex-col items-center gap-8"
                >
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
                        {[
                            { label: 'Verified Partners', value: '450+' },
                            { label: 'Agency Scale', value: '14.2x Avg' },
                            { label: 'Automated Revenue', value: '$84M+' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</div>
                                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PromoVideo;
