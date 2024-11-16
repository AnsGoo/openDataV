import * as echarts from 'echarts';
import { onMounted, onUnmounted } from 'vue';
import mydark from './theme';
export const useEchart = (chartEl) => {
    echarts.registerTheme('mydark', mydark);
    let chart = null;
    onMounted(() => {
        if (chartEl.value) {
            chart = echarts.init(chartEl.value, 'mydark');
            chart.clear();
        }
    });
    const resizeHandler = (entry) => {
        const { width, height } = entry.contentRect;
        chart?.resize({ width, height });
    };
    onUnmounted(() => {
        if (chart) {
            chart.clear();
            chart.dispose();
        }
    });
    const updateEchart = (option) => {
        try {
            chart?.setOption(option);
        }
        catch (e) {
            console.log(e);
        }
    };
    return { updateEchart, resizeHandler };
};
//# sourceMappingURL=hooks.js.map