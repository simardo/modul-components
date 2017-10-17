import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import WithRender from './viewer.html';

@WithRender
@Component
export class Viewer extends Vue {
    public tag: string = '';

    public flag: boolean = false;
    public text: string = '';
    public ddModel: string = '';
    public sessions: string[] = ['Automne 2017', 'Hiver 2018', 'Été 2018', 'Automne 2018', 'Hiver 2019', 'Été 2019'];

    public mounted() {
        this.buildTag();
    }

    public show($event): void {
        console.log($event);
    }

    // public validate() {
    //     this.$validator.validateAll().then((result) => {
    //         console.log(`Validation Result: ${result}`);
    //     });
    // }

    @Watch('$route')
    private buildTag(): void {
        this.tag = `<${this.$route.meta}></${this.$route.meta}>`;
    }
}
