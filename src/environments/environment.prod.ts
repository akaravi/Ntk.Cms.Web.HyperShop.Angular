import { EnumDeviceType, EnumOperatingSystemType } from 'ntk-cms-api';

export const environment = {
  production: true,
  cmsServerConfig : {
    configApiRetry: 1,
    configApiServerPath: 'https://apicms.ir/api/v1/',
    configRouteThumbnails: 'https://oco.ir/imageThumbnails/',
    configRouteUploadFileContent: 'https://apicms.ir/api/v1/FileContent/upload/',
  },
  cmsUiConfig : {
    Pathlogin: '/auth/login',
    Pathlogout: '/auth/logout',
    PathRegistery: '/auth/registery',
    PathSelectSite: '/site/selection',
    Pathdashboard: '/dashboard',
  },
  cmsTokenConfig : {
    SecurityKey: '000000000',
    ClientMACAddress: '',
    OSType: EnumOperatingSystemType.none,
    DeviceType: EnumDeviceType.WebSite,
    PackageName: '',
  }
};
