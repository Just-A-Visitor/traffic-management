import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  uri = 'http://localhost:4004/business';

  constructor(private http: HttpClient) { }
  addBusiness(personId,vehicleNo,date,policeId,licenseNo,time,pincode,injuries,roadType,report,weatherStatus,violationNo,crimeCode,area) {
    const obj = {
        personId : personId,
        vehicleNo : vehicleNo,
        date : date,
        policeId : policeId,
        licenseNo : licenseNo,
        time : time,
        pincode :pincode,
        injuries : injuries,
        roadType : roadType,
        report : report,
        weatherStatus : weatherStatus,
        violationNo : violationNo,
        crimeCode : crimeCode,
        area : area,

    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
}