/*
 * @Author: DC
 * @Date: 2025-01-01 12:02:05
 * @LastEditTime: 2025-01-01 12:03:07
 * @LastEditors: DC
 * @Description: 
 * @FilePath: /cesium-vue3-vite-github/src/views/mas3d/1.js
 * Never lose my passion
 */
import * as mars3d from "mars3d"
// import MarsMap from "./components/mars-work/mars-map.vue"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: {
      lat: 20.297277,
      lng: 111.105169,
      alt: 238162.1,
      heading: 359.5,
      pitch: -41.4
    }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  initDemoData()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

let pixelLayer

async function initDemoData() {
  const {
    consts,
    getBinary,
    resourceService,
    MicapsDiamond131GridDataProvider,
    getCR,
    Array2DGridDataProvider,
    ensureGridDataOptions,
    getPredefinedBitmapScale,
    predefinedLegendNames
  } = window.QE // quickearth.core.js
  const { CPixelLayer } = window.QEC // quickearth.cesium.js

  // public静态资源的路径
  consts.resourcePath = "//data.mars3d.cn/file/qe"

  globalMsg("数据加载中...")
  showLoading()

  // config资源配置
  await resourceService.loadResourceFromConfigPath("styles/demo.config.json")

  const xSize = 100
  const ySize = 100
  const cX = xSize / 2
  const cY = ySize / 2
  const dataArr = []
  const maxLen = Math.sqrt(cX * cX + cY * cY)
  for (let i = 0; i < ySize; i++) {
    for (let j = 0; j < xSize; j++) {
      // dataArr.push(1 - Math.sqrt((cX - j) * (cX - j) + (cY - i) * (cY - i)) / maxLen)
      // dataArr.push(Math.random(-33, 48))
      dataArr.push(Math.floor(Math.random() * (48 - (-33) + 1) + (-33)))
    }
  }
  const options = {
    xStart: 111.105169,
    xEnd: 108.060544,
    yStart: 20.297277,
    yEnd: 18.213416,
    xSize: 100,
    ySize: 100
  }
  ensureGridDataOptions(options)
  const provider2 = new Array2DGridDataProvider(dataArr, { gridOptions: options })

  // 加载数据
  const buffers = await getBinary("http://data.mars3d.cn/file/qe/data/Z_OTHE_RADAMOSAIC_20220412000000.bin.zip")
  const provider = new MicapsDiamond131GridDataProvider(buffers[0])
  console.log(provider.meta)
  console.log(provider.allGrids())
  console.log(provider.getGrid().maxMin)
  // 实时计算组合反射率底面（业务上建议单独输出组合反射率，减少前端计算）
  const cr = getCR(provider2, 0, true, false).upper
  const pixelStyle = {
    fillColor: "color-cr#res",
    zScale: 5,
    opaque: true,
    extrudeScale: 500
  }

  const maxMin = provider2.getGrid().maxMin
  const colorScale = await getPredefinedBitmapScale(predefinedLegendNames.MPL_RdYlBu, maxMin.min, maxMin.max)
  const style = {
    fillColor: "color-cr#res",
    zScale: 5,
    opaque: true,
    extrudeScale: 500
  }
  // API文档： https://qeapi.dev.91weather.com/classes/CPixelLayer.html
  // 或查看 public\lib\mars3d\thirdParty\quickearth\quickearth.cesium.d.ts文件
  // pixelLayer = new CPixelLayer().setDataSource(cr).setDrawOptions(pixelStyle)
  pixelLayer = new CPixelLayer().setDataSource(cr).setDrawOptions(style)
  map.scene.primitives.add(pixelLayer)

  globalMsg("数据加载完成")
  hideLoading()
}

export function changeScale(scale) {
  pixelLayer?.setDrawOptions({
    extrudeScale: scale
  })
}
