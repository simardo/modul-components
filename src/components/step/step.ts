import { ModulVue } from '../../utils/vue/vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import WithRender from './step.html?style=./step.scss';
import { STEP_NAME } from '../component-names';
import { TransitionAccordion, TransitionAccordionMixin } from '../../mixins/transition-accordion/transition-accordion';
import ElementQueries from 'css-element-queries/src/ElementQueries';
import IconPlugin from '../icon/icon';
import LinkPlugin from '../link/link';

export enum MStepState {
    Locked = 'locked',
    InProgress = 'in-progress',
    Success = 'success',
    Warning = 'warning',
    Error = 'error'
}

export enum MStepMode {
    Default = 'default',
    Accordion = 'accordion'
}

@WithRender
@Component({
    mixins: [
        TransitionAccordion
    ]
})
export class MStep extends ModulVue {
    @Prop()
    public state: MStepState;
    @Prop({ default: MStepMode.Default })
    public mode: MStepMode;
    @Prop({ default: false })
    public open: boolean;
    @Prop({ default: false })
    public required: boolean;
    @Prop({ default: 'default' })
    public iconName: string;
    @Prop({ default: false })
    public last: boolean;

    private internalOpen: boolean = false;
    private internalMode: MStepMode | string = MStepMode.Default;

    @Watch('open')
    protected openChanged(open: boolean): void {
        this.as<TransitionAccordionMixin>().isAnimActive = true;
        this.propOpen = open;
    }

    protected mounted(): void {
        this.propOpen = this.open;
        ElementQueries.init();
    }

    protected beforeDestroy(): void {
        ElementQueries.detach(this.$el);
    }

    private openStep(event): void {
        if (this.propMode == MStepMode.Accordion) {
            this.as<TransitionAccordionMixin>().isAnimActive = true;
            this.propOpen = !this.propOpen;
            this.$emit('open');
            event.currentTarget.blur();
        } else {
            if (!this.propOpen) {
                this.as<TransitionAccordionMixin>().isAnimActive = true;
                this.propOpen = true;
                this.$emit('open');
                event.currentTarget.blur();
            }
        }
    }

    private closeStep(): void {
        if (this.propOpen) {
            this.as<TransitionAccordionMixin>().isAnimActive = true;
            this.propOpen = false;
            this.$emit('closeStep');
        }
    }

    private getIcon(): string {
        let icon: string = '';
        switch (this.state) {
            case MStepState.Locked:
                icon = 'default';
                break;
            case MStepState.Success:
                icon = 'chip-check';
                break;
            case MStepState.Warning:
                icon = 'chip-check-yellow';
                break;
            case MStepState.Error:
                icon = 'chip-error';
                break;
            default:
                break;
        }
        return icon;
    }

    private get propOpen(): boolean {
        return this.internalOpen;
    }

    private set propOpen(open: boolean) {
        this.internalOpen = open != undefined ? open : false;
        if (this.internalOpen) {
            this.$emit('open');
        } else {
            this.$emit('close');
        }
        let refHeader: HTMLElement = this.$refs.header as HTMLElement;
        if (this.propMode == MStepMode.Accordion) {
            if (!refHeader.hasAttribute('tabindex')) {
                refHeader.setAttribute('tabindex', '0');
            }
        } else {
            if (this.propOpen) {
                if (refHeader.hasAttribute('tabindex')) {
                    refHeader.removeAttribute('tabindex');
                }
            } else {
                if (!refHeader.hasAttribute('tabindex')) {
                    refHeader.setAttribute('tabindex', '0');
                }
            }
        }
    }

    private get propMode(): MStepMode {
        return this.mode == MStepMode.Accordion ? this.mode : MStepMode.Default;
    }
}

const StepPlugin: PluginObject<any> = {
    install(v, options) {
        v.use(IconPlugin);
        v.use(LinkPlugin);
        v.component(STEP_NAME, MStep);
    }
};

export default StepPlugin;
