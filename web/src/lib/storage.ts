// Simple wrapper for localStorage to mimic async db behavior
export const db = {
    getItem: async <T>(key: string): Promise<T | null> => {
        if (typeof window === 'undefined') return null;
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    setItem: async <T>(key: string, value: T): Promise<void> => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(key, JSON.stringify(value));
    }
};
