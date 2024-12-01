const subComponents = (this.subComponents || []).map((item) => item.toJson())
const component: ComponentDataType = {
  id: this.id,
  component: this.component,
  name: this.name,
  propValue: this.propValue,
  position: this.position,
  subComponents: subComponents.length > 0 ? subComponents : undefined,
  dataMode: this.dataMode,
  script: this.scriptConfig?.toJSON(),
  groupStyle: this.groupStyle,
  data: this.dataConfig
    ? {
        type: this.dataConfig?.type,
        requestOptions: this.dataConfig?.dataInstance.toJSON()
      }
    : undefined
}

console.log(component)
return component
