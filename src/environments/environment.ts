import { EnumDeviceType, EnumOperatingSystemType } from 'ntk-cms-api';

export const environment = {
  production: false,
  cmsServerConfig: {
    configApiRetry: 1,
    configApiServerPath: 'https://apicms.ir/api/v1/',
    // configApiServerPath: 'http://localhost:2390/api/v1/', // Test Api
    configRouteThumbnails: 'https://oco.ir/imageThumbnails/',
    configRouteUploadFileContent: 'https://apicms.ir/api/v1/FileContent/upload/',
  },
  cmsUiConfig: {
    Pathlogin: '/auth/login',
    Pathlogout: '/auth/logout',
    PathRegistery: '/auth/registery',
    PathSelectSite: '/site/selection',
    Pathdashboard: '/dashboard',
  },
  cmsTokenConfig: {
    SecurityKey: 'AAAA', // site 91185 app:158
    ClientMACAddress: '',
    OSType: EnumOperatingSystemType.none,
    DeviceType: EnumDeviceType.WebSite,
    // PackageName: 'Ntk.Android.Ticketing',
    PackageName: '',
  }
};
