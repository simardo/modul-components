import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './i18n.html';
import { I18N_NAME } from '../component-names';
import { ModulVue } from '../../utils/vue/vue';

@WithRender
@Component
export class MI18n extends ModulVue {
    @Prop()
    public k: string;
    @Prop()
    public params: string[];
    @Prop({ default: true })
    public htmlEncode: boolean;

    protected created(): void {
        if (!this.$i18n) {
            throw new Error('<' + I18N_NAME + '>: this.$i18n is undefined, you must register the i18n plugin.');
        }
    }

    private get text(): string {
        let result = '';
        if (this.k) {
            let p: string[] = this.params === undefined ? [] : this.params;
            result = this.$i18n.translate(this.k, p, undefined, undefined, this.htmlEncode);
        }

        return result;
    }
}

const I18nPlugin: PluginObject<any> = {
    install(v, options) {
        console.debug(I18N_NAME, 'plugin.install');
        v.component(I18N_NAME, MI18n);
    }
};

export default I18nPlugin;
