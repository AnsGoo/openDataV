import { ComponentGroup, CustomComponent, FormType } from '@open-data-v/base';
export const componentName = 'BorderBox2';
class BorderBoxComponent extends CustomComponent {
    constructor(id, name) {
        super({
            component: componentName,
            group: ComponentGroup.BORDER,
            name: name ? name : '2#边框',
            id,
            width: 200,
            height: 200
        });
    }
    _prop = [
        {
            label: '基础配置',
            prop: 'base',
            children: [
                {
                    prop: 'color1',
                    label: '边框颜色1',
                    type: FormType.COLOR,
                    props: {
                        defaultValue: '#4fd2dd'
                    }
                },
                {
                    prop: 'color2',
                    label: '边框颜色2',
                    type: FormType.COLOR,
                    props: {
                        defaultValue: '#235fa7'
                    }
                },
                {
                    prop: 'backgroundColor',
                    label: '底色',
                    type: FormType.COLOR,
                    props: {
                        defaultValue: '#00000000'
                    }
                }
            ]
        }
    ];
    _style = [];
}
export default BorderBoxComponent;
//# sourceMappingURL=config.js.map