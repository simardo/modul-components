import '../../utils/polyfills';
import Vue from 'vue';
import i18nPlugin from '../../utils/i18n/i18n';
import { MI18n } from './i18n';

describe('i18n', () => {
    it('renders the key', () => {
        Vue.use(i18nPlugin);

        const vm: MI18n = new MI18n({ propsData: { i18nKey: 'bundle:key' } }).$mount();

        Vue.nextTick(() => {
            expect(vm.$el.textContent).toBe('bundle:key');
        });
    });

    it('renders the new value on key change', () => {
        Vue.use(i18nPlugin);

        const vm: MI18n = new MI18n({ propsData: { i18nKey: 'bundle:key' } }).$mount();
        vm.i18nKey = 'bundle:newKey';

        Vue.nextTick(() => {
            expect(vm.$el.textContent).toBe('bundle:newKey');
        });
    });
});
