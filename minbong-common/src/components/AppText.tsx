import {Text, TextProps} from 'react-native';
import {DEFAULT_APP_FONT_FAMILY} from '../utils/commonStyleUtil';
import i18n from '../i18n';

export default function AppText(props: TextProps) {
  const defaultAppFontFamily = DEFAULT_APP_FONT_FAMILY(i18n.language);
  return (
    <Text
      {...props}
      style={[
        {fontFamily: defaultAppFontFamily},
        props.style,
      ]}
    />
  );
}
