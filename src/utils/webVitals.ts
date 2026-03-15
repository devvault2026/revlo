// Web Vitals monitoring for performance tracking
export const reportWebVitals = () => {
  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }

  // First Input Delay (FID) / Interaction to Next Paint (INP)
  if ('PerformanceObserver' in window) {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingDuration) {
            console.log('FID:', entry.processingDuration);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input', 'event'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }

  // Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutEntry = entry as any;
          if (!layoutEntry.hadRecentInput) {
            clsValue += layoutEntry.value || 0;
            console.log('CLS:', clsValue);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }
};

// Navigation timing
export const reportNavigationTiming = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = window.performance.timing;
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          console.log('Performance Metrics:');
          console.log('DNS lookup:', navigation.domainLookupEnd - navigation.domainLookupStart);
          console.log('TCP connection:', navigation.connectEnd - navigation.connectStart);
          console.log('Request time:', navigation.responseStart - navigation.requestStart);
          console.log('Response time:', navigation.responseEnd - navigation.responseStart);
          console.log('DOM interactive:', navigation.domInteractive - navigation.fetchStart);
          console.log('DOM complete:', navigation.domComplete - navigation.fetchStart);
          console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart);
        }
      }, 0);
    });
  }
};
