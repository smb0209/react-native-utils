import RNFS from 'react-native-fs';
import {trackEvent} from '@/utils/amplitude.ts';

export async function unlinkImageFile(uri?: string | null): Promise<boolean> {
  if (uri && uri.startsWith('file://')) {
    try {
      const path = uri.replace('file://', '');
      const exists = await RNFS.exists(path);
      if (exists) {
        await RNFS.unlink(path);
        console.log('Deleted file:', path);
        return true;
      } else {
        console.log('File not Exist', path);
        return true;
      }
    } catch (err) {
      console.warn('Failed to delete image file:', err);
      trackEvent('Failed to delete image file:', {error: err});

    }
  }
  return false;
}
