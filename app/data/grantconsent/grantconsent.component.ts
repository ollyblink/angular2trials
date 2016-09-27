import {Component, OnInit} from '@angular/core';
import {GrantConsentService} from "./grantconsent.service";

@Component({
  selector: 'grant-consent',
  templateUrl: 'app/data/grantconsent/grantconsent.component.html',
  styleUrls: ['app/data/grantconsent/grantconsent.component.css'],
  providers: [GrantConsentService]
})

export class GrantConsentComponent implements OnInit {
  private usersToConsent: string[] = [];
  private sentUsers: string[] = [];

  private message: string;

  public constructor(private grantConsentService: GrantConsentService) {

  }

  public onChange(username: string): void {
    this.grantDataAccess(username);
  }

  public grantDataAccess(username: string): void {
    this.grantConsentService.grantDataAccess(username).then(message => {
      this.message = message;
      this.ngOnInit();//reload

    })
  }

  public getUsersToGrantDataAccessTo(): void {
    this.grantConsentService.getUsersToGrantDataAccessTo().then(usersToConsent => this.usersToConsent = usersToConsent);
  }

  ngOnInit(): void {
    this.getUsersToGrantDataAccessTo();
    this.getSentUsers();
  }


  public getSentUsers(): void {
    this.grantConsentService.getSentUsers().then(sentUsers => this.sentUsers = sentUsers);
  }

  public deleteSentUser(receiver: string): void {
    this.grantConsentService.deleteSentUser(receiver).then(message => {
      this.message = message;
      this.ngOnInit();//reload
    });
  }

}
