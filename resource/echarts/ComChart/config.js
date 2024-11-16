import { ComponentGroup, CustomComponent, DataMode } from '@open-data-v/base';
export const componentName = 'ComChart';
class ComChartComponent extends CustomComponent {
    constructor(id, name, icon) {
        super({
            component: componentName,
            group: ComponentGroup.OTHER,
            name: name ? name : '通用Echart图',
            id,
            width: 500,
            height: 170,
            icon,
            dataMode: DataMode.UNIVERSAL
        });
    }
}
export default ComChartComponent;
//# sourceMappingURL=config.js.map