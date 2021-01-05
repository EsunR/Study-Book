import { Group, Text } from 'react-konva';
import React, { forwardRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { NodeConfig } from 'konva/types/Node';
import { Text as TextInstance, TextConfig } from 'konva/types/shapes/Text';
import { Group as GroupInstance } from 'konva/types/Group';

type TextGroupProps = {
  texts: string[];
} & NodeConfig &
  Pick<TextConfig, 'lineHeight' | 'fill' | 'fontFamily' | 'fontSize'>;

const TextGroup: React.FC<TextGroupProps> = forwardRef<GroupInstance, TextGroupProps>(
  (props, ref) => {
    const { texts, lineHeight, fill, fontFamily, fontSize, ...resetProps } = props;
    // const textRefs = useRef<MutableRefObject<TextInstance>[]>([]);
    // const [timeStamp, setTimeStamp] = useState<any>(new Date().valueOf());
    // const [maxTextWidth, setMaxTextWidth] = useState<number>(0);

    // useEffect(() => {
    //   // 构建 refs
    //   textRefs.current = texts.map(React.createRef) as MutableRefObject<TextInstance>[];
    //   setTimeStamp(new Date().valueOf());
    // }, [texts]);

    // useEffect(() => {
    //   let max = 0;
    //   if (textRefs.current instanceof Array) {
    //     textRefs.current.forEach(textRef => {
    //       if (textRef.current && textRef.current.getWidth() > max) {
    //         max = textRef.current.getWidth();
    //       }
    //     });
    //   }
    //   setMaxTextWidth(max);
    // }, [textRefs.current]);

    // useEffect(() => {
    //   console.log('maxTextWidth: ', maxTextWidth);
    // }, [maxTextWidth]);

    return (
      <Group {...resetProps} ref={ref}>
        {texts instanceof Array
          ? texts.map((text, index) => (
              <Text
                key={index}
                lineHeight={1}
                fill={fill}
                fontFamily={fontFamily}
                fontSize={fontSize}
                text={text}
                y={(isNaN(Number(lineHeight)) ? 12 : Number(lineHeight)) * index}
                // ref={textRefs.current[index]}
              />
            ))
          : null}
      </Group>
    );
  },
);

export default TextGroup;
