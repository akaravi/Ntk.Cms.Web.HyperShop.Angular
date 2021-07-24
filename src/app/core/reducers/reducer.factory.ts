import { CoreSiteModel, EnumModel, ErrorExceptionResult, TokenInfoModel } from 'ntk-cms-api';

export interface ReducerCmsStore {
    tokenInfoModelState: TokenInfoModel;
    toreSiteModelState: CoreSiteModel;
    EnumRecordStatus: ErrorExceptionResult<EnumModel> ;
  }
