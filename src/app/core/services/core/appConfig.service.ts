import { AccessHelper } from './../../common/helper/accessHelper';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';


@Injectable()
export class AppConfigService {

  public version: string;
  public apiEndpointSomeData: string;

  constructor(private http: HttpClient, private accessHelper: AccessHelper) { }

  load(): Promise<any> | any {
    return this.accessHelper.CheckTokenDevice();
    // const promise = this.http.get('/assets/app.config.json')
    //   .toPromise()
    //   .then(data => {
    //     Object.assign(this, data);
    //     return data;
    //   });

    // return promise;
  }
}
