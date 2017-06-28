import Vue from 'vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './dynamic-template.html';
import uuid from '../../utils/uuid/uuid';
import { DYNAMIC_TEMPLATE_NAME } from '../component-names';

@WithRender
@Component
export class MDynamicTemplate extends Vue {
    @Prop()
    public template: string;

    private tag: string = 'm-dt-' + uuid.generate();

    private get internalTemplate(): string {
        Vue.component(this.tag, {
            template: `<div>${this.template}</div>`
        });
        return this.tag;
    }
}

const DynamicTemplatePlugin: PluginObject<any> = {
    install(v, options) {
        v.component(DYNAMIC_TEMPLATE_NAME, MDynamicTemplate);
    }
};

export default DynamicTemplatePlugin;
