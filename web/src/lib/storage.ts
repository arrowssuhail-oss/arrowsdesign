const isClient = typeof window !== 'undefined';

export const db = {
    getItem: async <T>(key: string): Promise<T | null> => {
        if (!isClient) return null;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error("Error reading from storage", e);
            return null;
        }
    },
    setItem: async <T>(key: string, value: T): Promise<void> => {
        if (!isClient) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Error writing to storage", e);
        }
    },
    removeItem: async (key: string): Promise<void> => {
        if (!isClient) return;
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error("Error removing from storage", e);
        }
    }
};
