import { ModulVue } from '../../utils/vue/vue';
import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './limit-text.html?style=./limit-text.scss';
import { LIMIT_TEXT_NAME } from '../component-names';
import I18nPlugin from '../i18n/i18n';
import LinkPlugin from '../link/link';

@WithRender
@Component
export class MLimitText extends ModulVue {

    @Prop()
    public open: boolean;

    @Prop({ default: 4 })
    public lines: number;

    // TODO: force non-breakable spaces, brackets, default values?
    @Prop({ default: '[ + ]' })
    public openLabel: string;

    @Prop({ default: '[ - ]' })
    public closeLabel: string;

    private openHiddenText: string = this.$i18n.translate('m-limit-text:open');
    private closeHiddenText: string = this.$i18n.translate('m-limit-text:close');
    private internalOpen: boolean = false;
    private contentHeight: number = 0;
    private maxHeight: number = 0;
    private overflow: boolean = false;

    protected mounted() {
        console.log('MOUNTED');
        this.computeHeight();
    }

    protected updated() {
        console.log('UPDATED');
        this.computeHeight();
    }

    private computeHeight() {
        this.contentHeight = (this.$refs.container as HTMLElement).scrollHeight;
        this.maxHeight = (this.$refs.test as HTMLElement).clientHeight * this.lines;
        this.overflow = this.contentHeight > this.maxHeight;
    }

    private get maxHeightStyle() {
        console.log('GET STYLE', this.contentHeight, this.maxHeight);
        if (this.overflow) {
            console.log('OVERFLOW');
            return this.propOpen ? this.contentHeight + 'px' : this.maxHeight + 'px';
        }
        return 'none';
    }

    private get propOpen() {
        if (this.open !== undefined) {
            return this.open;
        }
        return this.internalOpen;
    }

    private onOpen() {
        this.internalOpen = true;
        this.$emit('update:open', true);
    }

    private onClose() {
        this.internalOpen = false;
        this.$emit('update:open', false);
    }
}

const LimitTextPlugin: PluginObject<any> = {
    install(v, options) {
        v.use(I18nPlugin);
        v.use(LinkPlugin);
        v.component(LIMIT_TEXT_NAME, MLimitText);
    }
};

export default LimitTextPlugin;
