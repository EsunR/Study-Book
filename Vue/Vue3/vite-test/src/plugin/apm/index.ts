import { App } from "vue";

interface IPerformance {
  sst?: number; // 静态资源请求时长
  rt?: number; // 渲染耗时
}

export class Apm {
  readonly optMap: Map<number, IPerformance> = new Map();
  private cacheMap: Map<number, IPerformance> = new Map();

  public optid: number = new Date().valueOf();

  getNewOptId() {
    return new Date().valueOf();
  }

  setOptId(optid: number) {
    this.optid = optid;
  }

  logStatic(timeType: 0 | 1) {
    const timeVal = new Date().valueOf();
    if (timeType) {
      const cacheData = this.cacheMap.get(this.optid);
      const optData = this.optMap.get(this.optid);
      if (cacheData?.sst && !optData?.sst) {
        this.optMap.set(this.optid, {
          ...optData,
          ...{ sst: timeVal - cacheData.sst },
        });
        this.cacheMap.delete(this.optid);
      }
    } else {
      const cacheData = this.cacheMap.get(this.optid);
      this.cacheMap.set(this.optid, { ...cacheData, ...{ sst: timeVal } });
    }
  }

  logRender(timeType: 0 | 1) {
    const timeVal = new Date().valueOf();
    if (timeType) {
      const cacheData = this.cacheMap.get(this.optid);
      const optData = this.optMap.get(this.optid);
      if (cacheData?.rt && !optData?.rt) {
        this.optMap.set(this.optid, {
          ...optData,
          ...{ rt: timeVal - cacheData.rt },
        });
        this.cacheMap.delete(this.optid);
      }
    } else {
      const cacheData = this.cacheMap.get(this.optid);
      this.cacheMap.set(this.optid, { ...cacheData, ...{ rt: timeVal } });
    }
  }
}

const apm = new Apm();

export function initApm(app: App<Element>) {
  app.config.globalProperties.$apm = apm;
}

export function useApm() {
  return apm;
}
