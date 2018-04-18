import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Events} from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {User} from '../../providers/user'
import {MobileAppSystem} from '../../providers/mobile.app.system'
import {MobileAppSystemP2l} from '../../providers/mobile.app.system.p2l'
import {MobileAppSystem1Line} from '../../providers/mobile.app.system.1line'


/**
 * Generated class for the HomeScreenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-screen',
  templateUrl: 'home-screen.html',
})
export class HomeScreenPage {
//  @ViewChild('input1') input1 ;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public events: Events,
  	public menu: MenuController,
    public mobileAppSystem:MobileAppSystem,
    public mobileAppSystemP2L:MobileAppSystemP2l,
    public mobileAppSystem1Line:MobileAppSystem1Line,
    public user:User ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeScreenPage');
    
    this.mobileAppSystemP2L.setSessionId(this.user.sessionInfo.sessionId); 
    this.mobileAppSystemP2L.setBaseUrl(this.mobileAppSystem.getBaseUrl());

    this.mobileAppSystem1Line.setSessionId(this.user.sessionInfo.sessionId); 
    this.mobileAppSystem1Line.setBaseUrl(this.mobileAppSystem.getBaseUrl());
      
    //for test . init.    
    //this.mobileAppSystemP2L.deAllocateJob(this.user.sessionInfo.userWarehouse, 151398503);

//    console.log(this.input1);
    this.events.publish('home:entered'); 
    this.user.orderInfo.zone = '';
  }

  ionViewDidEnter() {
  	this.menu.swipeEnable(true);
  }

  openConvey() {
  	this.navCtrl.setRoot('ScanOrderPage');
  }

  openP2Job() {

    this.events.publish('p2ljob:start');
    this.navCtrl.setRoot('P2lBeginJobPage');
  }

  open1Line(){
    this.events.publish('1line:start');
    this.navCtrl.setRoot('LinePickJobPage');
  }


}
