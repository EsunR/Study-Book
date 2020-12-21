import { Group, Text } from 'react-konva';
import React from 'react';
import { NodeConfig } from 'konva/types/Node';
import { TextConfig } from 'konva/types/shapes/Text';

type TextGroupProps = {
  texts: string[];
} & NodeConfig &
  Pick<TextConfig, 'lineHeight' | 'fill' | 'fontFamily' | 'fontSize'>;

const TextGroup: React.FC<TextGroupProps> = props => {
  const {
    texts,
    lineHeight,
    fill,
    fontFamily,
    fontSize,
    ...resetProps
  } = props;

  return (
    <Group {...resetProps}>
      {texts instanceof Array
        ? texts.map((text, index) => (
            <Text
              lineHeight={1}
              fill={fill}
              fontFamily={fontFamily}
              fontSize={fontSize}
              text={text}
              y={(isNaN(Number(lineHeight)) ? 12 : Number(lineHeight)) * index}
            />
          ))
        : null}
    </Group>
  );
};

export default TextGroup;
