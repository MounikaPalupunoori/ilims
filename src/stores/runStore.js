import { defineStore } from 'pinia';

export const useRunStore = defineStore({
    id: 'run',
    state: () => ({
       createRunView:true,
       configView1:false,
       configView2:false,
       runView:false
    }),
    actions: {
        configView1Next() {
           this.configView1 = true;
           this.createRunView = false;
           this.runView=false
        },
        configView1Close() {
            this.configView1 = false;
            this.createRunView = true;
            this.runView=false
         },
         configView2Next() {
            this.configView2 = true;
            this.createRunView = false;
            this.configView1 = false;
            this.runView=false
         },
         configView2Close() {
             this.configView2 = false;
             this.createRunView = false;
             this.configView1 = true;
             this.runView=false
          },
        runViewNext(){
            this.runView = true;
            this.configView2 = false;
            this.createRunView = false;
            this.configView1 = false;
        },
        runViewClose(){
            this.runView = false;
            this.configView2 = true;
            this.createRunView = false;
            this.configView1 = false;
        }
    }
});