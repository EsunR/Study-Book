import Konva from 'konva';
import { Group as GroupInstance } from 'konva/types/Group';
import { Image as ImageInstance } from 'konva/types/shapes/Image';
import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Group, Rect, Text, Circle, Shape } from 'react-konva';
import { getStatusColor, getStatusText } from '../controller';
import useMachineStatus from '../hook/useMachineStatus';
import { ACTIVE_COUNT } from '../localfiles';
import ScreenTheme from '../localfiles/theme';
import { IMachineListItem } from './MachineListView';
import CanvasImage from './subcomponents/CanvasImage';
import TextGroup from './subcomponents/TextGroup';

interface IMachineData {
  wind: { current: number };
  temperature: { current: number; setting: number };
}

const MachineContext = React.createContext<IMachineListItem | undefined>(
  undefined,
);

/**
 * 车厢
 */
const MachineBox: React.FC<{
  data: IMachineData;
  width: number;
} & Konva.NodeConfig> = props => {
  const { data, width, ...resetNodeProps } = props;
  const fanRef = useRef<ImageInstance>(null);
  const machine = useContext(MachineContext);
  const fanAnimInstanceRef = useRef<Konva.Animation>();
  const paddingHoz = useMemo(() => {
    return width * 0.1;
  }, [width]);
  const paddingVer = 13;

  function startFanAnim() {
    if (!fanRef.current) {
      return;
    }
    const fan = fanRef.current;
    const angularSpeed = 200;
    // 清除上一次的动画
    if (fanAnimInstanceRef.current) {
      fanAnimInstanceRef.current.stop();
      fanAnimInstanceRef.current = undefined;
    }
    // 开始新的动画
    fanAnimInstanceRef.current = new Konva.Animation(function(frame) {
      if (!frame) {
        return;
      }
      let angleDiff = (frame.timeDiff * angularSpeed) / 1000;
      fan.rotate(angleDiff);
    }, fan.getLayer());
    fanAnimInstanceRef.current.start();
  }

  useEffect(() => {
    if (machine && machine.status !== 'standby') {
      startFanAnim();
    }
    return () => {
      if (fanAnimInstanceRef.current) {
        fanAnimInstanceRef.current.stop();
        fanAnimInstanceRef.current = undefined;
      }
    };
  }, [fanRef, machine]);

  return (
    <Group {...resetNodeProps}>
      {/* 温度 */}
      <Group>
        <Rect
          width={width}
          height={85}
          stroke={ScreenTheme.normal}
          shadowColor={ScreenTheme.normal}
          shadowBlur={10}
        />
        <Group y={paddingVer} x={paddingHoz}>
          <Text
            text="温箱1"
            fill={ScreenTheme.normal}
            fontSize={ScreenTheme.basicFontSize}
          />
        </Group>
        <Group x={paddingHoz} y={paddingVer + 20}>
          <CanvasImage
            source={require('@/assets/fire_icon.png')}
            width={15}
            height={20}
            y={7}
          />
          <Text
            x={22}
            fontSize={ScreenTheme.basicFontSize}
            fill={ScreenTheme.normal}
            text="200℃"
          />
          <Text
            x={22}
            y={22}
            fontSize={ScreenTheme.basicFontSize}
            fill={ScreenTheme.normal}
            text="195℃"
          />
        </Group>
      </Group>
      {/* 温度 */}

      {/* 风速 */}
      <Group y={20 + 85}>
        <Rect
          width={width}
          height={60}
          stroke={ScreenTheme.normal}
          shadowColor={ScreenTheme.normal}
          shadowBlur={10}
        />
        <Group y={paddingVer} x={paddingHoz}>
          <Text
            text="风机1"
            fill={ScreenTheme.normal}
            fontSize={ScreenTheme.basicFontSize}
          />
        </Group>
        <Group x={paddingHoz} y={paddingVer + 20}>
          <CanvasImage
            source={require('@/assets/fan_icon.png')}
            width={18}
            height={18}
            x={9}
            y={9}
            offsetX={9}
            offsetY={9}
            ref={fanRef}
          />
          <Text
            text="1750转"
            fill={ScreenTheme.normal}
            fontSize={ScreenTheme.basicFontSize}
            x={22}
            y={3}
          />
        </Group>
      </Group>
      {/* 风速 */}
    </Group>
  );
};

/**
 * 机头
 */
const MachineHead: React.FC<Konva.NodeConfig> = props => {
  return (
    <Group {...props}>
      <TextGroup
        texts={['超喂', `上超:${20}`, `下超:${-5}`, `毛刷:${10}`]}
        lineHeight={23}
        fontSize={14}
        fill={ScreenTheme.normal}
        x={8}
        y={26}
      />
      <CanvasImage
        source={require('@/assets/dingxingji_head.png')}
        width={190}
        height={182}
      />
    </Group>
  );
};

/**
 * 机尾
 */
const MachineTail: React.FC<Konva.NodeConfig> = props => {
  const { ...resetNodeProps } = props;
  const machine = useContext(MachineContext);

  return (
    <Group {...resetNodeProps}>
      <CanvasImage
        source={require('@/assets/dingxingji_tail.png')}
        width={166}
        height={194}
      />
      {machine && machine.status === 'standby' ? null : (
        <Shape
          stroke={ScreenTheme.normal}
          sceneFunc={(context, shape) => {
            const baseX = 120;
            const baseY = 56;
            context.beginPath();
            context.moveTo(baseX, baseY);
            context.bezierCurveTo(
              baseX - 50,
              baseY + 50,
              baseX + 20,
              baseY + 70,
              baseX + 5,
              165,
            );
            context.fillStrokeShape(shape);
          }}
        />
      )}
    </Group>
  );
};

/**
 * 传送带
 */
const ConveyorBelt: React.FC<Konva.NodeConfig> = props => {
  const { width = 102, ...resetNodeProps } = props;
  const machine = useContext(MachineContext);
  const beltAnimInstanceRef = useRef<Konva.Animation>();
  const beltWrapperRef = useRef<GroupInstance>(null);
  const processItemWidth = 25;
  const processItemHeight = 20;
  const processHozPadding = 30; // 滚动条内容部分水平方向上的 padding

  const beltAnimAreaWidth = useMemo(() => {
    return width - processHozPadding * 2 - 2; /** -2 像素修正 */
  }, [width]);

  const startBeltAnim = () => {
    if (!beltWrapperRef.current) {
      return;
    }
    const beltWrapper = beltWrapperRef.current;
    // 清除上次动画
    if (beltAnimInstanceRef.current) {
      beltAnimInstanceRef.current.stop();
      beltAnimInstanceRef.current = undefined;
    }
    // 开始新动画
    const moveSpeed = 1.8;
    let currentX = -beltAnimAreaWidth;
    beltAnimInstanceRef.current = new Konva.Animation(frame => {
      if (!frame) {
        return;
      }
      beltWrapper.x(currentX);
      currentX += moveSpeed;
      if (currentX >= 0) {
        currentX = beltAnimAreaWidth;
      }
    }, beltWrapper.getLayer());
    beltAnimInstanceRef.current.start();
  };

  useEffect(() => {
    if (machine && machine.status !== 'standby') {
      startBeltAnim();
    }
    return () => {
      if (beltAnimInstanceRef.current) {
        beltAnimInstanceRef.current.stop();
        beltAnimInstanceRef.current = undefined;
      }
    };
  }, [beltWrapperRef, machine]);

  const renderProcessItem = () => {
    const processItems: ReactElement[] = [];
    for (let i = 0; i < Math.floor((width * 2) / processItemWidth); i++) {
      processItems.push(
        <Shape
          key={i}
          x={i * processItemWidth}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(10, 0);
            context.lineTo(processItemWidth, 0);
            context.lineTo(processItemWidth - 10, processItemHeight);
            context.lineTo(0, processItemHeight);
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          fill={ScreenTheme.normal}
        />,
      );
    }
    return processItems;
  };

  return (
    <Group {...resetNodeProps}>
      {/* 车速文字 */}
      <Group x={75} y={-50}>
        <Text
          text="车速:"
          fontSize={16}
          fill={ScreenTheme.normal}
          ref={ref => {
            if (ref) {
              const textWidth = ref.getWidth();
              ref.offsetX(textWidth / 2);
            }
          }}
        />
        <Text
          text="50M/MIN"
          fontSize={16}
          y={22}
          fill={ScreenTheme.normal}
          ref={ref => {
            if (ref) {
              const textWidth = ref.getWidth();
              ref.offsetX(textWidth / 2);
            }
          }}
        />
      </Group>
      {/* 车速文字 */}
      <Rect
        width={width}
        height={20}
        strokeWidth={2}
        stroke={ScreenTheme.normal}
        cornerRadius={20}
      />
      <Group
        x={processHozPadding}
        ref={ref => {
          if (ref) {
            ref.clip({
              x: 0,
              y: 0,
              width: beltAnimAreaWidth,
              height: 20,
            });
          }
        }}
      >
        <Group x={-beltAnimAreaWidth} ref={beltWrapperRef}>
          {machine && machine.status === 'standby' ? null : renderProcessItem()}
        </Group>
      </Group>
    </Group>
  );
};

/**
 * 整机
 */
type SettingMachineProps = {
  machine: IMachineListItem;
  pos: number;
} & Konva.NodeConfig;

const SettingMachine: React.FC<SettingMachineProps> = props => {
  const settingMachineWrapperRef = useRef<GroupInstance>(null);
  const badgeRef = useRef<GroupInstance>(null);
  const { machine, pos, ...resetNodeProps } = props;
  const { statusColor, statusText } = useMachineStatus(machine.status);
  const [machineData, setMachineData] = useState<IMachineData[]>();
  const moveToTargetPosAnimRef = useRef<Konva.Animation>();

  const statusTextColor = useMemo(() => {
    switch (status) {
      case 'normal':
        return '#111111';
      case 'danger':
        return '#FFFFFF';
      case 'standby':
        return '#FFFFFF';
      default:
        return '#111111';
    }
  }, [status]);

  // Handle
  const fetchMachineData = async () => {
    const id = machine && machine.id;
    // TODO: 获取温度、风速、当前生产卡，等信息
    setMachineData(
      new Array(10).fill({
        wind: {
          current: 1750,
        },
        temperature: {
          current: 1750,
          setting: 195,
        },
      }),
    );
  };

  const stopMoveToTargetAnim = () => {
    if (moveToTargetPosAnimRef.current) {
      moveToTargetPosAnimRef.current.stop();
      moveToTargetPosAnimRef.current = undefined;
    }
  };

  const moveToTargetPos = (pos: number) => {
    if (!settingMachineWrapperRef.current) {
      return;
    }
    const settMachineWrapper = settingMachineWrapperRef.current;
    stopMoveToTargetAnim();
    const moveSpeed = 20;
    const targetY = (pos - 1) * (306 + 10);
    if (pos <= ACTIVE_COUNT) {
      moveToTargetPosAnimRef.current = new Konva.Animation(() => {
        const currentY = settMachineWrapper.y();
        const nextY = currentY - moveSpeed;
        if (nextY <= targetY) {
          settMachineWrapper.y(targetY);
          stopMoveToTargetAnim();
        } else {
          settMachineWrapper.y(nextY);
        }
      }, settMachineWrapper.getLayer());
      moveToTargetPosAnimRef.current.start();
    } else {
      settMachineWrapper.y(targetY);
    }
  };

  // Effect
  useEffect(() => {
    if (badgeRef.current && settingMachineWrapperRef.current) {
      badgeRef.current.x(settingMachineWrapperRef.current.width() - 60);
    }
  }, [badgeRef, settingMachineWrapperRef]);

  useEffect(() => {
    if (typeof pos === 'number') {
      moveToTargetPos(pos);
    }
    return () => {
      stopMoveToTargetAnim();
    };
  }, [pos, settingMachineWrapperRef]);

  useEffect(() => {
    fetchMachineData();
  }, [machine]);

  return (
    <MachineContext.Provider value={machine}>
      <Group
        {...resetNodeProps}
        ref={settingMachineWrapperRef}
        width={1530}
        height={306}
        y={(4 - 1) * (306 + 10)}
      >
        <Rect
          width={1530}
          height={306}
          stroke={statusColor}
          strokeWidth={1}
          shadowColor={statusColor}
          shadowBlur={10}
        />
        <Rect height={306} width={4} fill={statusColor} />

        {/* Badge */}
        <Group ref={badgeRef}>
          <Rect
            height={28}
            width={60}
            fill={statusColor}
            cornerRadius={[0, 0, 0, 10]}
          />
          <Text
            text={statusText}
            fill={statusTextColor}
            fontSize={18}
            width={37}
            height={18}
            align="center"
            x={11}
            y={7}
            fontStyle="bold"
          />
        </Group>
        {/* Badge */}

        {/* 顶部信息 */}
        <Group y={27}>
          <Group x={31} y={7}>
            <Circle radius={5} fill={ScreenTheme.normal} />
            <Circle radius={10} fill={ScreenTheme.normal} opacity={0.5} />
          </Group>
          <Text
            text={machine.name}
            fontSize={18}
            fill={ScreenTheme.normal}
            x={51}
            y={0}
          />
          <Text
            x={156}
            y={3}
            fill="#FFFFFF"
            text={`生产卡信息：怡华 31024132 75D雪纺 10#黑色 机长-李华 挡车工-王军`}
            fontSize={14}
          />
        </Group>
        {/* 顶部信息 */}

        {/* 机器 */}
        <Group y={67}>
          <MachineHead x={51} y={12} />

          {/* 中部车厢 & 传送带 */}
          <ConveyorBelt width={1227} x={141} y={114} />
          <Group x={267} y={29}>
            {machineData instanceof Array
              ? machineData.map((dataItem, index) => {
                  const wrapperWidth = 1020;
                  const itemWidth = wrapperWidth / machineData.length;
                  return (
                    <MachineBox
                      key={index}
                      data={dataItem}
                      x={index * itemWidth}
                      width={itemWidth}
                    />
                  );
                })
              : null}
          </Group>
          {/* 中部车厢 & 传送带 */}

          {/* 机尾 */}
          <MachineTail x={1333} />
          {/* 机尾 */}
        </Group>
        {/* 机器 */}
      </Group>
    </MachineContext.Provider>
  );
};

export default SettingMachine;
