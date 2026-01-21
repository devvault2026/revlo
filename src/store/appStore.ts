import { create } from 'zustand';

interface AppState {
    // Navigation
    currentSection: string;
    setCurrentSection: (section: string) => void;

    // Form State
    formData: {
        name: string;
        email: string;
        company: string;
        revenue: string;
        message: string;
    };
    updateFormData: (data: Partial<AppState['formData']>) => void;
    resetFormData: () => void;

    // UI State
    isMenuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;

    // Modal State
    isModalOpen: boolean;
    modalContent: 'demo' | 'contact' | 'success' | null;
    openModal: (content: 'demo' | 'contact' | 'success') => void;
    closeModal: () => void;

    // Auth State
    user: any | null;
    setUser: (user: any | null) => void;
}

const initialFormData = {
    name: '',
    email: '',
    company: '',
    revenue: '',
    message: '',
};

export const useAppStore = create<AppState>((set) => ({
    // Navigation
    currentSection: 'home',
    setCurrentSection: (section) => set({ currentSection: section }),

    // Form State
    formData: initialFormData,
    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data },
        })),
    resetFormData: () => set({ formData: initialFormData }),

    // UI State
    isMenuOpen: false,
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    closeMenu: () => set({ isMenuOpen: false }),

    // Modal State
    isModalOpen: false,
    modalContent: null,
    openModal: (content) => set({ isModalOpen: true, modalContent: content }),
    closeModal: () => set({ isModalOpen: false, modalContent: null }),

    // Auth State
    user: null, // Initialize user as null
    setUser: (user) => set({ user }),
}));
