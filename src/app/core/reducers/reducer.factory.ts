import { CoreSiteModel, EnumRecordStatus, ErrorExceptionResult, TokenInfoModel } from 'ntk-cms-api';

export interface ReducerCmsStore {
    tokenInfoModelState: TokenInfoModel;
    coreSiteModelState: CoreSiteModel;
    EnumRecordStatus: ErrorExceptionResult<EnumRecordStatus> ;
  }
