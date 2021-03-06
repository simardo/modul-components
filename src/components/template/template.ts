import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import WithRender from './template.html?style=./template.scss';
import { TEMPLATE_NAME } from '../component-names';
import { ElementQueries } from '../../mixins/element-queries/element-queries';

@WithRender
@Component({
    mixins: [ElementQueries]
})
export class Mtemplate extends Vue {
    @Prop({ default: false })
    public footerFullWidth: boolean;
    @Prop()
    public contentWidth: string;

    private get hasHeaderSlot(): boolean {
        return !!this.$slots.header;
    }

    private get hasDefaultSlot(): boolean {
        return !!this.$slots.default;
    }

    private get hasColumnSlot(): boolean {
        return !!this.$slots.column;
    }

    private get hasFooterSlot(): boolean {
        return !!this.$slots.footer;
    }
}

const Template: PluginObject<any> = {
    install(v, options) {
        v.component(TEMPLATE_NAME, Mtemplate);
    }
};

export default Template;
