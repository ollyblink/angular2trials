import {Component, OnInit} from '@angular/core';
import {ConsentDataService} from "./consentdata.service";
import {Data} from "../../models/data";

@Component({
  selector: 'consentdata',
  templateUrl: '/app/data/consentdata/consentdata.component.html',
  styleUrls: ['/app/data/consentdata/consentdata.component.css'],
  providers: [ConsentDataService]
})

export class ConsentDataComponent implements OnInit {
  private user: string;
  private spirometryData: Data[];
  private consentedUsers: string[];
  private selectedUser: string;

  public constructor(private consentDataService: ConsentDataService) {

  }

  public getOtherData(username: string): void {
    this.consentDataService.getOtherData(username).then(json => {
      this.user = json.user;
      this.spirometryData = json.spirometryData;
    });
  }

  public onChange(selectedUser: string) {
    this.selectedUser = selectedUser;
    this.getOtherData(this.selectedUser);
  }

  ngOnInit(): void {
    this.consentDataService.getUsersToGrantConsentTo().then(consentedUsers => {
      this.consentedUsers = consentedUsers;
    });
  }

}
