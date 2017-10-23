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

    public itemA1: boolean = false;
    public itemB1: string = '';
    public itemB2: string = '';
    public itemC1: string = '';
    public itemC2: string = '';

    public mounted() {
        this.buildTag();

        Validator.extend('custom', {
            getMessage: field => 'The ' + field + ' value is not "abc".',
            validate: (value) => {
                console.log('Validator custom: ', value);
                return value === 'abc';
            }
        });

        Validator.extend('truthy', {
            getMessage: field => 'The ' + field + ' value is not truthy.',
            validate: value => {
                console.log('Validator: ', value);
                return value == true;
            }
        });

        // this.$validator.attach('champs', 'required|truthy');
        this.$validator.attach('itemA', 'truthy');
        this.$validator.attach('itemB', 'truthy');

    }

    public show($event): void {
        console.log($event);
    }

    public validateForm(scope: string) {
        (this as any).$validator.validateAll(scope).then((result) => {
            if (result) {
                alert('Form Submitted!');
            } else {
                alert('Error');
            }
        });
    }

    public validateAll() {
        (this as any).$validator.validateAll().then((result) => {
            if (result) {
                alert('Form Submitted!');
            } else {
                alert('Error');
            }
        });
    }

    public validateItemA() {
        this.$validator.validate('itemA', this.itemA1).then((result) => {
            console.log('itemA', this.itemA1, result);
        });
    }

    public validateItemB() {
        this.$validator.validate('itemB', this.validatedComputed).then((result) => {
            console.log('itemB', this.validatedComputed, result);
        });
    }

    public get validatedComputed(): boolean {
        if (this.itemB1 === 'a' && this.itemB2 === 'b') {
            return true;
        } else {
            return false;
        }
    }

    public setItemC2(): void {
        this.itemC2 = this.itemC1;
    }

    @Watch('$route')
    private buildTag(): void {
        this.tag = `<${this.$route.meta}></${this.$route.meta}>`;
    }
}
