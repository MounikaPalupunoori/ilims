import { defineStore } from 'pinia';

export const useLoaderStore = defineStore({
    id: 'loader',
    state: () => ({
        loader: false
    }),
    actions: {
        showLoader(value) {
            this.loader = value;
        },
    }
});