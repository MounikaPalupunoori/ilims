import { defineStore } from 'pinia';

export const usePaginationStore = defineStore({
    id: 'pagination',
    state: () => ({
        currentPage: 1
    }),
    actions: {
        prev() {
            this.currentPage = this.currentPage- 1;
        },
        next(totalItems) {
            if (this.currentPage < totalItems) {
                this.currentPage = this.currentPage + 1;
            }
        },
        resetPage(value){
            this.currentPage = value
        }
    }
});