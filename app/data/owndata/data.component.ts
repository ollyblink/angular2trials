import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from "./data.service";
import {Data} from "../../models/data";

@Component({
  selector: 'owndata',
  templateUrl: 'app/data/owndata/data.component.html',
  styleUrls: ['app/data/owndata/data.component.css'],
  providers: [DataService]
})
export class DataComponent implements OnInit {
  private user: string;
  private spirometryData: Data[];
  private isAddItemShown: boolean = false;
  private message: string = "";
  private dataItem = new Data("", "", null, null);


  constructor(private router: Router, private dataService: DataService) {
  }

  public getOwnData(): void {
    this.dataService.getOwnData().then(json => {
      this.user = json.user;
      this.spirometryData = json.spirometryData;
    });
  }

  public deleteItem(title: string): void {
    this.message = title;
    this.dataService.deleteItem(title).then(message => {
      this.message = message;
      //reload
      this.getOwnData();
    });
  }

  public showAddItem(): void {
    this.isAddItemShown = (this.isAddItemShown == false ? true : false);
  }

  public addItem(): void {
    if (localStorage.getItem('user')) {
      this.dataService.addItem(this.dataItem.title, this.dataItem.fvc, this.dataItem.fev1).then(message => {
        this.message = message;
        //reload
        this.getOwnData();
      });
    }
  }

  public grantConsent(): void {
    let link = ['/grantconsent'];
    this.router.navigate(link);
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.getOwnData();
    }
  }
}
