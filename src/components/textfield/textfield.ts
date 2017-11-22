import { ModulVue } from '../../utils/vue/vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Model, Watch } from 'vue-property-decorator';
import WithRender from './textfield.html?style=./textfield.scss';
import { TEXTFIELD_NAME } from '../component-names';
import { InputState, InputStateMixin } from '../../mixins/input-state/input-state';
import { InputManagement } from '../../mixins/input-management/input-management';
import { KeyCode } from '../../utils/keycode/keycode';
import InputStyle from '../input-style/input-style';
import ValidationMesagePlugin from '../validation-message/validation-message';
import ButtonPlugin from '../button/button';

export enum MTextFieldType {
    Text = 'text',
    Password = 'password',
    EMail = 'email',
    Url = 'url',
    Telephone = 'tel'
}

const ICON_NAME_PASSWORD_VISIBLE: string = 'default';
const ICON_NAME_PASSWORD_HIDDEN: string = 'default';

@WithRender
@Component({
    mixins: [
        InputState,
        InputManagement
    ]
})
export class MTextField extends ModulVue {

    @Prop({
        default: MTextFieldType.Text,
        validator: value =>
            value == MTextFieldType.EMail ||
            value == MTextFieldType.Password ||
            value == MTextFieldType.Telephone ||
            value == MTextFieldType.Text ||
            value == MTextFieldType.Url
    })
    public type: MTextFieldType;
    @Prop({ default: true })
    public passwordIcon: boolean;

    private passwordAsText: boolean = false;

    private iconDescriptionShowPassword: string = this.$i18n.translate('m-textfield:show-password');
    private iconDescriptionHidePassword: string = this.$i18n.translate('m-textfield:hide-password');

    protected mounted(): void {
        (this.$refs.input as HTMLElement).setAttribute('type', this.inputType);
    }

    @Watch('type')
    private typeChanged(type: MTextFieldType): void {
        console.warn('<' + TEXTFIELD_NAME + '>: Change of property "type" is not supported');
        (this.$refs.input as HTMLElement).setAttribute('type', this.inputType);
    }

    private togglePasswordVisibility(event): void {
        this.passwordAsText = !this.passwordAsText;
    }

    private get inputType(): MTextFieldType {
        let type: MTextFieldType = MTextFieldType.Text;
        if (this.type == MTextFieldType.Password && this.passwordAsText) {
            type = MTextFieldType.Text;
        } else if (this.type == MTextFieldType.Password || this.type == MTextFieldType.EMail || this.type == MTextFieldType.Url ||
            this.type == MTextFieldType.Telephone) {
            type = this.type;
        }
        this.$nextTick(() => {
            let inputEl: HTMLElement = this.$refs.input as HTMLElement;
            if (inputEl) {
                inputEl.setAttribute('type', type);
            }
        });
        return type;
    }

    private get iconNamePassword() {
        return this.passwordAsText ? ICON_NAME_PASSWORD_HIDDEN : ICON_NAME_PASSWORD_VISIBLE;
    }

    private get iconDescriptionPassword() {
        return this.passwordAsText ? this.iconDescriptionHidePassword : this.iconDescriptionShowPassword;
    }

    private get propPasswordIcon(): boolean {
        return this.passwordIcon && this.type == MTextFieldType.Password && this.as<InputStateMixin>().active;
    }
}

const TextFieldPlugin: PluginObject<any> = {
    install(v, options) {
        v.use(InputStyle);
        v.use(ValidationMesagePlugin);
        v.use(ButtonPlugin);
        v.component(TEXTFIELD_NAME, MTextField);
    }
};

export default TextFieldPlugin;
