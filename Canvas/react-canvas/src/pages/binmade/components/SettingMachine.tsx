import Konva from 'konva';
import { Star as StarInstance } from 'konva/types/shapes/Star';
import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import { Group, Rect, Text, Circle, Shape } from 'react-konva';
import ScreenTheme from '../localfiles/theme';
import { IMachine, IMachineStatus } from './MachineView';

/**
 * 车厢
 */
const MachineBox: React.FC<{
  status: IMachineStatus;
  width: number;
} & Konva.NodeConfig> = props => {
  const { status, width, ...resetNodeProps } = props;
  const fanRef = useRef<StarInstance>(null);
  const paddingHoz = useMemo(() => {
    return width * 0.1;
  }, [width]);
  const paddingVer = 13;

  function startFanAnim() {
    if (!fanRef.current) {
      return;
    }
    const fan = fanRef.current;
    var angularSpeed = 90;
    var anim = new Konva.Animation(function(frame) {
      if (!frame) {
        return;
      }
      let angleDiff = (frame.timeDiff * angularSpeed) / 1000;
      fan.rotate(angleDiff);
      // update stuff
    }, fan.getLayer());

    anim.start();
  }

  useEffect(() => {
    startFanAnim();
  }, []);

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
          <Rect width={15} height={20} stroke={ScreenTheme.normal} y={7} />
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
          <Rect width={18} height={18} stroke={ScreenTheme.normal} />
          <Text
            text="1750转"
            fill={ScreenTheme.normal}
            fontSize={ScreenTheme.basicFontSize}
            x={22}
            y={3}
          />
        </Group>
        {/* <Star
          innerRadius={8}
          outerRadius={10}
          numPoints={5}
          fill="yellow"
          width={30}
          height={30}
          x={20}
          y={30}
          ref={fanRef}
        /> */}
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
    <Rect
      width={120}
      height={168}
      stroke={ScreenTheme.normal}
      strokeWidth={2}
      {...props}
    />
  );
};

/**
 * 机尾
 */
const MachineTail: React.FC<Konva.NodeConfig> = props => {
  return (
    <Rect
      width={166}
      height={194}
      stroke={ScreenTheme.normal}
      strokeWidth={2}
      {...props}
    />
  );
};

/**
 * 传送带
 */
const ConveyorBelt: React.FC<Konva.NodeConfig> = props => {
  const { width = 102, ...resetNodeProps } = props;
  const processItemWidth = 25;
  const processItemHeight = 20;
  const processHozPadding = 20; // 滚动条内容部分水平方向上的 padding

  const renderProcessItem = () => {
    const processItems: ReactElement[] = [];
    for (let i = 0; i < Math.floor(width / processItemWidth); i++) {
      processItems.push(
        <Shape
          key={i}
          x={i * processItemWidth}
          ref={ref => {
            if (ref) {
              const moveSpeed = 0.5;
              let currentX = (i - 1) * processItemWidth;
              const anim = new Konva.Animation(frame => {
                if (!frame) {
                  return;
                }
                ref.x(currentX);
                currentX += moveSpeed;
                if (currentX >= width - processHozPadding * 2) {
                  currentX = -processItemWidth;
                }
              }, ref.getLayer());
              anim.start();
            }
          }}
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
              width: width - processHozPadding * 2,
              height: 20,
            });
          }
        }}
      >
        {renderProcessItem()}
      </Group>
    </Group>
  );
};

/**
 * 整机
 */
type SettingMachineProps = {
  machine: IMachine;
} & Konva.NodeConfig;

const SettingMachine: React.FC<SettingMachineProps> = props => {
  const { machine, ...resetNodeProps } = props;

  return (
    <Group {...resetNodeProps} width={1530} height={306}>
      <Rect
        width={1530}
        height={306}
        stroke={ScreenTheme.normal}
        strokeWidth={1}
      />

      {/* Badge */}
      <Group>
        <Rect  />
      </Group>
      {/* Badge */}

      {/* 顶部信息 */}
      <Group y={27}>
        <Group x={31} y={7}>
          <Circle radius={5} fill={ScreenTheme.normal} />
          <Circle radius={10} fill={ScreenTheme.normal} opacity={0.5} />
        </Group>
        <Text
          text={machine.machine_name}
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
        <MachineHead x={51} y={26} />
        <Group x={267} y={29}>
          {machine.status.map((items, index) => {
            const wrapperWidth = 1020;
            const itemWidth = wrapperWidth / machine.status.length;
            return (
              <MachineBox
                key={index}
                status={items}
                x={index * itemWidth}
                width={itemWidth}
              />
            );
          })}
        </Group>
        <ConveyorBelt width={1200} y={113} x={150} />
        <MachineTail x={1333} />

        <Group x={218} y={65}>
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
      </Group>
      {/* 机器 */}
    </Group>
  );
};

export default SettingMachine;
