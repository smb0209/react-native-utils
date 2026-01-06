import {Platform} from "react-native";
export const DEFAULT_FONT_FAMILY = (lang?: string) => {
  if(lang === 'ja') {
    return Platform.OS === 'ios' ? 'HachiMaruPop-Regular' : 'HachiMaruPop-Regular';
  }
  return Platform.OS === 'ios' ? 'NanumGomSinCe' : 'NanumGomSinCe';
}

export const DEFAULT_APP_FONT_FAMILY = (lang?:string) => {
  if(lang === 'ja') {
    return Platform.OS === 'ios' ? 'PretendardVariable' : 'PretendardVariable';
  }
  return Platform.OS === 'ios' ? 'PretendardVariable' : 'PretendardVariable';
}
