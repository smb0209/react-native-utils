import React from 'react';
import Svg, {Text as SvgText, TextProps} from 'react-native-svg';

type StrokeSvgTextProps = {
  text: string;
  fontSize?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fontFamily?: string;
};

type SvgTextWithPaintOrderProps = TextProps & {
  paintOrder?: 'stroke' | 'fill' | 'markers';
};

const TypedSvgText = SvgText as React.ComponentType<SvgTextWithPaintOrderProps>;

export function StrokeSvgText({
                                text,
                                fontSize = 32,
                                fill = '#FFFFFF',
                                stroke = '#000000',
                                strokeWidth = 2,
                                fontFamily,
                              }: StrokeSvgTextProps) {

  const svgTextProps: SvgTextWithPaintOrderProps = {
    x: '50%',
    y: '50%',
    fill,
    stroke,
    strokeWidth,
    textAnchor: 'middle',
    alignmentBaseline: 'middle',
    fontSize,
    fontFamily,
    paintOrder: 'stroke',
  };

  return (
    <Svg height={fontSize * 1.5} width="100%">
      <TypedSvgText {...svgTextProps}>
        {text}
      </TypedSvgText>
    </Svg>
  );
}
