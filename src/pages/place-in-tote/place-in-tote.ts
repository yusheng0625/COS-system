import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import {MobileAppSystem} from '../../providers/mobile.app.system'
import {AlertService} from '../../providers/alert.service'
import {User} from '../../providers/user'
/**
 * Generated class for the PlacInTotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export class Product{
	rowId:number;
	binLocation:string;
	stockCode:string;
}

export class ProductOrder extends Product{
	pickQty:number;
	confirmQty:number;
}


@IonicPage()
@Component({
  selector: 'page-place-in-tote',
  templateUrl: 'place-in-tote.html',
})
export class PlaceInTotePage {

  productOrderList:ProductOrder[];
  toteBarcode:string;  

  constructor(public navCtrl: NavController, public navParams: NavParams,
  			  public mobileAppSystem:MobileAppSystem, 
  			  public alertService:AlertService,
  			  public user:User) {
  	this.toteBarcode = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacInTotePage');
    let svc = this;
    this.mobileAppSystem.getProductListNotInTote(this.user.orderInfo.orderBarcode, this.user.orderInfo.zone, function(res:any){
    	if(res==null)return;
    	svc.productOrderList = res.result.productList;
    });
  }

  openPage() {
  	if(this.toteBarcode=='')return;

  	let svc = this;
  	let productList: Product[] = [];

	for(var productOrder of this.productOrderList) {
		productList.push({rowId: productOrder.rowId, binLocation: productOrder.binLocation, stockCode: productOrder.stockCode});
	}

  	//let productList;
	this.mobileAppSystem.placeInTote(this.user.orderInfo.orderBarcode, 
		this.toteBarcode, this.user.orderInfo.zone, productList, function(res:any){

		if(res.result.orderComplete == 'Y')
		{
			svc.onOrderComplete();
		}
		else if(res.result.orderComplete == 'N')
		{
			svc.alertService.doConfirm(res.result.statusMsg, '', 'YES', 'NO').then(function(yes:any){
				if(yes==true)
				{
					svc.allocateNewToteToOrder();	
				}
			});	
		}
	});
  	//this.navCtrl.push('OrderStatusPage');
  }


  private allocateNewToteToOrder()
  {
  	if(this.toteBarcode=='')return;

  	let svc = this;
  	let productList: Product[] = [];

	for(var productOrder of this.productOrderList) {
		productList.push({rowId: productOrder.rowId, binLocation: productOrder.binLocation, stockCode: productOrder.stockCode});
	}

  	//let productList;
	this.mobileAppSystem.allocateNewToteToOrder(this.user.orderInfo.orderBarcode, 
		this.toteBarcode, this.user.orderInfo.zone, productList, function(res:any){
		if(res==null)return;
			
		if(res.result.orderComplete == 'Y')
		{
			svc.onOrderComplete();
		}
		else if(res.result.orderComplete == 'N')
		{
			svc.navCtrl.push('ScanProductPage');
		}
	});  	
  }

  private onOrderComplete()
  {
	this.alertService.doAlert('Order Complete!', '', 'OK');
	this.navCtrl.push('OrderStatusPage');
  } 


}
