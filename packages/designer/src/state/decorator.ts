import useSnapShotState from './snapshot'

const snapShotState = useSnapShotState()

export function saveComponent(instance:any) {
  return function (target: any, _name: string, descriptor: TypedPropertyDescriptor<any>) {
    console.log(target, target.prototype)
    console.log(descriptor)
    console.log(instance)
    const func = descriptor.value
    console.log(func)
    // window.localStorage.setItem('canvasData', JSON.stringify(target.layoutData))
    // new Promise((resolve) => {
    //   resolve(
    //     snapShotState.saveSnapshot(
    //       target.layoutData,
    //       target.canvasStyleData,
    //       target.dataSlotterData
    //     )
    //   )
    // })
  }
}
