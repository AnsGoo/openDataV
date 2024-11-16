import { ComponentGroup, CustomComponent, FormType } from '@open-data-v/base';
export const componentName = 'Image';
class ImageComponent extends CustomComponent {
    constructor(id, name) {
        super({
            component: componentName,
            group: ComponentGroup.BASIC,
            name: name ? name : '图片',
            id,
            width: 200,
            height: 200
        });
    }
    _prop = [];
    _style = [
        {
            label: '背景设置',
            prop: 'back',
            children: [
                {
                    prop: 'background',
                    label: '背景',
                    type: FormType.BACKGROUND,
                    props: {
                        defaultValue: { backgroundColor: '#14c9c9' }
                    }
                }
            ]
        }
    ];
}
export default ImageComponent;
//# sourceMappingURL=config.js.map