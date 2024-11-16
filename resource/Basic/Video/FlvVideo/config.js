import { ComponentGroup, CustomComponent, FormType } from '@open-data-v/base';
export const componentName = 'FlvVideo';
class FlvVideoComponent extends CustomComponent {
    constructor(id, name) {
        super({
            component: componentName,
            group: ComponentGroup.BASIC,
            name: name ? name : '视频',
            id,
            width: 400,
            height: 225
        });
    }
    _prop = [
        {
            label: '视频配置',
            prop: 'basic',
            children: [
                {
                    prop: 'url',
                    label: '视频地址',
                    type: FormType.TEXT,
                    props: {
                        defaultValue: 'https://mazwai.com/videvo_files/video/free/2019-01/small_watermarked/181004_04_Dolphins-Whale_06_preview.webm'
                    }
                },
                {
                    prop: 'videoType',
                    label: '视频类型',
                    type: FormType.TEXT,
                    props: {
                        defaultValue: 'webm'
                    }
                },
                {
                    prop: 'controls',
                    label: '控制器',
                    type: FormType.SWITCH,
                    props: {
                        defaultValue: true
                    }
                },
                {
                    prop: 'autoplay',
                    label: '自动播放',
                    type: FormType.SWITCH,
                    props: {
                        defaultValue: true
                    }
                },
                {
                    prop: 'muted',
                    label: '静音',
                    type: FormType.SWITCH,
                    props: {
                        defaultValue: true
                    }
                }
            ]
        }
    ];
    _style = [];
}
export default FlvVideoComponent;
//# sourceMappingURL=config.js.map