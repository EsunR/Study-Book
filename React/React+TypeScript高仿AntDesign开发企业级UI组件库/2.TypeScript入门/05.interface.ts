// 定义接口
interface Radio {
  switchRadio(): void;
}

interface Battery {
  checkBVatteryStatus(): void;
}

interface RadioWithBattery extends Radio {
  checkBVatteryStatus(): void;
}

// 在类中实现接口
class Car implements Radio {
  switchRadio() {}
}

class Phone implements Radio, Battery {
  switchRadio() {}
  checkBVatteryStatus() {}
}

class CellPhone implements RadioWithBattery {
  switchRadio() {}
  checkBVatteryStatus() {}
}
