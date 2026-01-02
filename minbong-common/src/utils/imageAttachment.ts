import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

export const pickAndResizeImage = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      async (response) => {
        if (response.didCancel || response.errorCode) {return resolve(null);}

        try {
          const asset = response.assets?.[0];
          const minWidth = 800;
          const minHeight = 1600;
          const maxWidth = Math.min(1400, asset?.width ?? minWidth);

          const ratio = (asset?.height ?? minHeight) / (asset?.width ?? minWidth);
          const newHeight = Math.round(maxWidth * ratio);

          if (!asset?.uri) {return resolve(null);}

          const resized = await ImageResizer.createResizedImage(
            asset.uri,
            maxWidth,
            newHeight,
            'JPEG',
            80
          );
          resolve(resized.uri);
        } catch (err) {
          console.warn('Resize failed', err);
          reject(err);
        }
      }
    );
  });
};
