import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { BusinessService } from '../business.service';
import { Query1Service } from '../query1.service';
import { Query2Service } from '../query2.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  count=1;
  arrBirds: string [];

  personId = new FormControl();
  vehicleNo = new FormControl();
  date = new FormControl();
  policeId = new FormControl();
  licenseNo = new FormControl();
  time = new FormControl();
  pincode = new FormControl();
  injuries = new FormControl();
  roadType = new FormControl();
  weatherStatus = new FormControl();
  report = new FormControl();
  violationNo = new FormControl();
  crimeCode = new FormControl();
  area = new FormControl();
  personDetail =  new FormControl();
  // check(){
  //   console.log(this.person_name.value,this.person_age.value);
  //   console.log("yeah");
  // };
  constructor(private bs: BusinessService, private c1: Query1Service, private c2: Query2Service, private httpClient: HttpClient) { }

  addBusiness() {
    console.log(this.personId.value,this.vehicleNo.value,this.date.value,this.policeId.value,this.licenseNo.value,this.time.value,this.pincode.value,this.injuries.value,this.roadType.value,this.report.value,this.weatherStatus.value,this.violationNo.value,this.crimeCode.value,this.area.value);
    this.bs.addBusiness(this.personId.value,this.vehicleNo.value,this.date.value,this.policeId.value,this.licenseNo.value,this.time.value,this.pincode.value,this.injuries.value,this.roadType.value,this.report.value,this.weatherStatus.value,this.violationNo.value,this.crimeCode.value,this.area.value);
  }
  uri = 'http://localhost:4004/query';
  q1(){
    console.log('q1'+this.personDetail.value);
    this.c1.q1(this.personDetail.value);

    console.log('begin');

    this.httpClient.get(`${this.uri}/work4`)
    . subscribe((res: Response) => {
      // $scope.messages = JSON.parse(res);
      alert(res);
      // alert(JSON.stringify(res));
    })
  }
  q2() {
    console.log(2);

    this.httpClient.get(`${this.uri}/work5`)
    . subscribe((res: Response) => {
      // $scope.messages = JSON.parse(res);
      console.log(res);
      alert(res);
      // alert(JSON.stringify(res));
    })


    // this.c2.q2(2);
  }

  q3() {
    console.log(3);

    this.httpClient.get(`${this.uri}/work6`)
    . subscribe((res: Response) => {
      // $scope.messages = JSON.parse(res);
      console.log(res);
      alert(res);
      // alert(JSON.stringify(res));
    })


    // this.c2.q2(2);
  }


  q4() {
    console.log(3);

    this.httpClient.get(`${this.uri}/work7`)
    . subscribe((res: Response) => {
      // $scope.messages = JSON.parse(res);
      console.log(res);
      alert(res);
      // alert(JSON.stringify(res));
    })


    // this.c2.q2(2);
  }

  q5() {
    console.log(3);

    this.httpClient.get(`${this.uri}/work8`)
    . subscribe((res: Response) => {
      // $scope.messages = JSON.parse(res);
      console.log(res);
      alert(res);
      // alert(JSON.stringify(res));
    })


    // this.c2.q2(2);
  }



  q6() {
    console.log(3);

    this.httpClient.get(`${this.uri}/work9`)
    . subscribe((res: Response) => {
      // $scope.messages = JSON.parse(res);
      console.log(res);
      alert(res);
      // alert(JSON.stringify(res));
    })


    // this.c2.q2(2);
  }

  ngOnInit() {
  }

}