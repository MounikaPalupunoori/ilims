import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: false,
        color:null,
        position:null,
        message:"",
        timeout:0,
    }),
    actions: {
        success(message) {
            this.alert = true,
            this.color = '#07bc0c',
            this.position = "top",
            this.message = message,
            this.timeout = 5000
        },
        error(message) {
            this.message = message,
            this.color= '#dc3545',
            this.position = "top",
            this.alert = true,
            this.timeout = 7000
        },
        close() {
            this.alert = false;
        }
    }
});