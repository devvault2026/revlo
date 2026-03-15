import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';
import { reportWebVitals, reportNavigationTiming } from './utils/webVitals';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const isPublishableKeyValid = (key: string | undefined): key is string => {
    if (!key) return false;
    // Clerk publishable keys are of the form: pk_test_<...> or pk_live_<...>
    // This is a best-effort sanity check to avoid crashing the app in dev when the key is missing/invalid.
    const match = key.match(/^pk_(test|live)_[A-Za-z0-9]+$/);
    const lengthValid = key.length >= 40 && key.length <= 70;
    return Boolean(match && lengthValid);
};

const InvalidClerkKeyFallback = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-6">
        <h1 className="text-2xl font-semibold mb-4">Clerk configuration missing or invalid</h1>
        <p className="max-w-lg text-sm leading-relaxed mb-6">
            This app requires a valid <code className="bg-gray-100 px-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code> to enable authentication.
            Update <code className="bg-gray-100 px-1 rounded">.env.local</code> (or your environment) with a valid Clerk publishable key and restart the dev server.
        </p>
        <p className="text-sm text-gray-600">
            You can get your key from: <a className="text-blue-600 underline" href="https://dashboard.clerk.com/last-active?path=api-keys" target="_blank" rel="noreferrer">Clerk Dashboard → API Keys</a>
        </p>
    </div>
);

if (!isPublishableKeyValid(PUBLISHABLE_KEY)) {
    console.error(
        'Missing or invalid Clerk publishable key. Set VITE_CLERK_PUBLISHABLE_KEY to a valid value in your .env.local (see https://dashboard.clerk.com/last-active?path=api-keys).',
        { key: PUBLISHABLE_KEY }
    );

    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <HelmetProvider>
                <InvalidClerkKeyFallback />
            </HelmetProvider>
        </React.StrictMode>
    );
} else {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <HelmetProvider>
                <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
                    <App />
                </ClerkProvider>
            </HelmetProvider>
        </React.StrictMode>
    );

    // Initialize web vitals monitoring in production
    if (import.meta.env.PROD) {
        reportWebVitals();
        reportNavigationTiming();
    }
}
