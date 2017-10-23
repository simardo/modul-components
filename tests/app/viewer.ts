import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import WithRender from './viewer.html';
import { Validator } from 'vee-validate';

@WithRender
@Component
export class Viewer extends Vue {
    public tag: string = '';

    public flag: boolean = false;
    public text: string = '';
    public text2: string = '';
    public textScope: string = '';
    public ddModel: string = '';
    public ddModelScope: string = '';
    public sessions: string[] = ['Automne 2017', 'Hiver 2018', 'Été 2018', 'Automne 2018', 'Hiver 2019', 'Été 2019'];

    public champs1: string = '';
    public champs2: string = '';
    public internal: string = '';

    public mounted() {
        this.buildTag();

        Validator.extend('truthy', {
            getMessage: field => 'The ' + field + ' value is not truthy.',
            validate: value => true
        });
        // let instance = new Validator( {nom: 'truthy'}, {} );
        this.$validator.attach('champs', 'required|truthy');
        this.$validator.attach('internal', 'required|truthy');

    }

    public show($event): void {
        console.log($event);
    }

    // public validate() {
    //     this.$validator.validateAll().then((result) => {
    //         console.log(`Validation Result: ${result}`);
    //     });
    // }
    public validateForm(scope: string) {
        (this as any).$validator.validateAll(scope).then((result) => {
            if (result) {
                alert('Form Submitted!');
            } else {
                alert('Error');
            }
        });
    }

    public validateField(field: string) {
        this.$validator.validate('champs', this.champs1).then((result) => {
            console.log(result);
        });
    }

    public validateInternal() {
        this.$validator.validate('internal', this.internal).then((result) => {
            console.log('internal', this.internal, result);
        });
    }

    public editInternal() {
        this.internal = 'abc';
    }

    @Watch('$route')
    private buildTag(): void {
        this.tag = `<${this.$route.meta}></${this.$route.meta}>`;
    }
}
