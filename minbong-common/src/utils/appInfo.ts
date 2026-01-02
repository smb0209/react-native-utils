import DeviceInfo from 'react-native-device-info';

export const isBeforeVersion = (target: string) => {
  try {
    const current = getVersion ();
    const c = current.split ('.').map (Number);
    const t = target.split ('.').map (Number);
    for (let i = 0; i < Math.max (c.length, t.length); i ++) {
      const cv = c[i] ?? 0;
      const tv = t[i] ?? 0;
      if (cv < tv) return true;
      if (cv > tv) return false;
    }
  } catch (e) {
    console.error ('Error with isBeforeVersion');
    return false;
  }
  return false;
};

export const getVersion = () => {
  return DeviceInfo.getVersion ();
};

export const getFullAppVersion = () => {
  const version = DeviceInfo.getVersion ();
  const build = DeviceInfo.getBuildNumber ();
  return `${version} (${build})`;
};
