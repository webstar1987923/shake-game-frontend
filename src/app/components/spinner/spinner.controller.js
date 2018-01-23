/* globals Shake */

export class SpinController {
	constructor($document, $timeout, $window, $scope,$http, $location) {
		'ngInject';

		this.rotation = 0;
		this.rot2 = 0;
		this.rot3 = 0;
		this.degree = 45;
		this.spin1Counter = 0;
		this.spin2Counter = 0;
		this.spin3Counter = 0;
		this.completed = 0;
		this.selectedItem1 = null;
		this.selectedItem2 = null;
		this.selectedItem3 = null;
		this.$document=$document;
		this.$timeout=$timeout;
		this.$http = $http;
		this.noticed = true;

		this.$spinFinished = 0;

		//parsing parameters from url	
		this.id = $location.absUrl().match(/id=([^&]*)/)[1];
		this.wechatID = $location.absUrl().match(/wechatID=([^&]*)/)[1];
		this.prize = $location.absUrl().match(/prize=([^&]*)/)[1];
		this.flag = $location.absUrl().match(/flag=([^&]*)/)[1];


		this.spinner1Choices=[{name:"ticket",id:0},{name:"ticket",id:1},{name:"gift",id:2},{name:"ticket",id:3},{name:"gift",id:4},{name:"ticket",id:5},{name:"gift",id:6},{name:"ticket",id:7}],
		this.spinner2Choices=[{name:"gift",id:0},{name:"ticket",id:1},{name:"gift",id:2},{name:"ticket",id:3},{name:"gift",id:4},{name:"gift",id:5},{name:"ticket",id:6},{name:"gift",id:7}],
		this.spinner3Choices=[{name:"ticket",id:0},{name:"gift",id:1},{name:"gift",id:2},{name:"ticket",id:3},{name:"gift",id:4},{name:"gift",id:5},{name:"ticket",id:6},{name:"gift",id:7}];

		var shakeEvent = new Shake({
			threshold: 15,
			timeout:   1000
		});
		shakeEvent.start();

		var _this=this;

		$window.addEventListener('shake', function() {
			if (_this.noticed || _this.spinFinished == 1) {
				return;
			}	

			_this.startGame();
			this.closeNoticeDialog();

		}, false);

		// click event for browser testing ONLY
		// disable for production
		$window.addEventListener('click', function() {			
			if (_this.noticed || _this.spinFinished == 1) {
				return;
			}

			_this.startGame();
		}, false);

		this.$scope = $scope;

		this.noticeWin();
		this.$timeout( this.closeNoticeDialog(), 3000);		
	}

	getRotation(id) {
		var string = this.$document.getElementById(id).style.transform;
		var start = string.indexOf('rotateY') + 8;
		var sliced = string.slice(start, start+10);
		sliced = sliced.replace(')','');
		sliced = sliced.replace('-','');
		sliced = sliced.replace('deg','');
		return ((parseInt(sliced) / 45) % 8) + 1;
	}

	getLeftFace(cF) {
		if (cF === 1) {
			return 8;
		} else {
			return cF - 1;
		}
	}

	getOldLeftFace(cF) {
		if (cF == 2) {
			return 8;
		} else if (cF == 1) {
			return 7;
		} else {
			return cF - 2;
		}
	}

	getRightFace(cF) {
		if (cF === 8) {
			return 1;
		} else {
			return cF + 1;
		}
	}	

	setShadows(id, c1, c2) {
		var currentFace = this.getRotation(id);
		var newLeftFace = this.getLeftFace(currentFace);
		var oldLeftFace = this.getOldLeftFace(currentFace);
		var newRightFace = this.getRightFace(currentFace);

		angular.element('#'+id+' .slotitem:nth-child('+currentFace+')').css('background', '#'+c1);	
		angular.element('#'+id+' .slotitem:nth-child('+newLeftFace+')').css('background', '#'+c2);
		angular.element('#'+id+' .slotitem:nth-child('+oldLeftFace+')').css('background', '#'+c1);
		angular.element('#'+id+' .slotitem:nth-child('+newRightFace+')').css('background', '#'+c2);
	}

	startFirstSpinner() {
		var _this=this

		var timerCallback = function() {
			_this.rotation += -45;
			angular.element('#slot1').css('transform', 'translateZ(-176px) rotateY('+_this.rotation+'deg)');
			
			_this.spin1Counter++;

			if (_this.spin1Counter == _this.selectedItem1.id + 40) {
				_this.completed++;
				_this.completedSpin();
			}			
			
			if (_this.spin1Counter <= 12) {
				_this.$timeout(timerCallback, 50);
			} else if (_this.spin1Counter <= 24 && _this.spin1Counter > 12) {
				_this.$timeout(timerCallback, 105);
			} else if (_this.spin1Counter > 24 && _this.spin1Counter < 40) {
				_this.$timeout(timerCallback, 100);
			} else if (_this.spin1Counter >= 40 && _this.spin1Counter < (40 + _this.selectedItem1.id)) {
				_this.$timeout(timerCallback, 100);
			}			
		};

		if (this.prize === "1"  || this.prize ==="2") {
			_this.selectedItem1 = _this.spinner1Choices[0];					
		} else {
			//_this.selectedItem1 = _this.spinner1Choices[Math.floor(Math.random()*_this.spinner1Choices.length)];	
			_this.selectedItem1 = _this.spinner1Choices[6];	
		}

		if (this.spin1Counter < 27) {
			_this.$timeout(timerCallback, 100);
		}
	}

	startSecondSpinner() {
		var _this=this;

		// initialize callback function
		// controls the speed and length that the spinner will spin
		var timerCallback = function() {
			
			_this.rot2 += _this.degree * 1 * -1;
			angular.element('#slot2').css('transform', 'translateZ(-176px) rotateY('+_this.rot2+'deg)');
			
			_this.spin2Counter++;

			if (_this.spin2Counter == _this.selectedItem2.id + 32) {
				_this.completed++;
				_this.completedSpin();
			}
			/*
			if (_this.spin2Counter <= 20) {
				_this.$timeout(timerCallback, 50);
			} else if (_this.spin2Counter <= 32 && _this.spin2Counter > 20) {
				_this.$timeout(timerCallback, 125);
			} else if (_this.spin2Counter > 32 && _this.spin2Counter < 48) {
				_this.$timeout(timerCallback, 200);
			} else if (_this.spin2Counter >= 48 && _this.spin2Counter < (48 + _this.selectedItem2.id)) {
				_this.$timeout(timerCallback, 200);
			}*/
			if (_this.spin2Counter <= 20) {
				_this.$timeout(timerCallback, 50);
			} else if (_this.spin2Counter <= 32 && _this.spin2Counter > 20) {
				_this.$timeout(timerCallback, 125);			
			} else if (_this.spin2Counter > 32 && _this.spin2Counter < (32 + _this.selectedItem2.id)) {
				_this.$timeout(timerCallback, 100);
			}
		};

		if (this.prize === "1"  || this.prize ==="2") {
			_this.selectedItem2 = _this.spinner2Choices[1];					
		} else {			
			//_this.selectedItem2 = _this.spinner2Choices[Math.floor(Math.random()*_this.spinner2Choices.length)];
			_this.selectedItem2 = _this.spinner2Choices[0];
		}		
		
		if (this.spin2Counter < 1) {
			this.$timeout(timerCallback, 100);
		}
	}

	startThirdSpinner() {
		var _this=this;

		// initialize callback function
		// controls the speed and length that the spinner will spin
		var timerCallback = function() {
			_this.rot3 += _this.degree * 1 * -1;
			angular.element('#slot3').css('transform','translateZ(-176px) rotateY('+_this.rot3+'deg)');
	
			_this.spin3Counter++;

			if (_this.spin3Counter === 56+ _this.selectedItem3.id) {
				_this.completed++;
				_this.completedSpin();
			}
			
			if (_this.spin3Counter <= 28) {
				_this.$timeout(timerCallback, 50);
			} else if (_this.spin3Counter <= 40 && _this.spin3Counter > 28) {
				_this.$timeout(timerCallback, 50);				
			} else if (_this.spin3Counter > 40 && _this.spin3Counter < 56) {
				_this.$timeout(timerCallback, 100);
			} else if (_this.spin3Counter >= 56 && _this.spin3Counter < (56 + _this.selectedItem3.id)) {
				_this.$timeout(timerCallback, 150);
			}			
						
		};

		if (this.prize === "1" || this.prize ==="2") {
			_this.selectedItem3 = this.spinner3Choices[0];			
		} else {
			//_this.selectedItem3 = this.spinner3Choices[Math.floor(Math.random()*this.spinner3Choices.length)];		
			_this.selectedItem3 = this.spinner3Choices[2];		
		}

		if (this.spin3Counter < 1) {
			this.$timeout(timerCallback, 100);
		}
	}

	completedSpin() {
		if (this.completed === 3) {
			/*if (this.selectedItem1.name === 'gift' && this.selectedItem2.name === 'gift' && this.selectedItem3.name === 'gift') {
				this.$timeout(this.giftWin, 1500);
			} else if (this.selectedItem1.name === 'ticket' && this.selectedItem2.name === 'ticket' && this.selectedItem3.name === 'ticket') {
				this.$timeout(this.ticketWin, 1500);
			} else {

				this.$timeout(this.notWin, 1500);
			}*/	

			this.spinFinished = 1;

			if (this.prize === "1" ) {
				this.$timeout(this.giftWin, 1500);
			} else if (this.prize === "2") {
				this.$timeout(this.ticketWin, 1500);
			} else if (this.prize === "0") {
				this.$timeout(this.notWin, 1500);
			}
		}
	}

	startGame() {
		if (this.spin1Counter < 1) {
			this.startFirstSpinner();
			this.startSecondSpinner();
			this.startThirdSpinner();
		} else {
			this.spin1Counter = 0; this.spin2Counter = 0; this.spin3Counter = 0;
			this.reset();
		}
	}

	reset() {
		var _this=this;
		angular.element('#slot1').css('transform','translateZ(-176px) rotateY(0deg)');
		angular.element('#slot2').css('transform','translateZ(-176px) rotateY(0deg)');
		angular.element('#slot3').css('transform','translateZ(-176px) rotateY(0deg)');
		this.completed = 0;
		this.rotation = 0; this.rot2 = 0; this.rot3 = 0;
		this.$timeout(function() {this
			_this.startFirstSpinner();
			_this.startSecondSpinner();
			_this.startThirdSpinner();
		}, 200);
	}

	noticeWin() {
		angular.element('.overlay').fadeIn();
		angular.element('.notice-info-dialog').fadeIn()
	}

	notWin() {
		angular.element('.overlay').fadeIn();
		angular.element('.not-winner-dialog').fadeIn()
	}

	giftWin() {
		angular.element('.overlay').fadeIn();
		angular.element('.gift-winner-dialog').fadeIn()
	}

	ticketWin() {
		angular.element('.overlay').fadeIn();
		angular.element('.ticket-winner-dialog').fadeIn();
	}

	leaveInfoWin() {
		angular.element('.overlay').fadeIn();
		angular.element('.leave-info-dialog').fadeIn()
	}
	afterleaveInfoWin() {

		angular.element('.overlay').fadeIn();
		angular.element('.after-leave-info-dialog').fadeIn()
	}

	closeDialog() {
		angular.element('.overlay').fadeOut();
		angular.element('.gift-winner-dialog').fadeOut();
		angular.element('.ticket-winner-dialog').fadeOut();               
		angular.element('.leave-info-dialog').fadeOut();
		angular.element('.after-leave-info-dialog').fadeOut();
		angular.element('.not-winner-dialog').fadeOut();	

		this.spinFinished = 0;			
	}

	closeNoticeDialog() {
		this.noticed = false;

		angular.element('.overlay').fadeOut();
		angular.element('.notice-info-dialog').fadeOut(1500);		
	}

	onLeaveInfoDlg() {		
		angular.element('.overlay').fadeOut();
		angular.element('.gift-winner-dialog').fadeOut();
		angular.element('.ticket-winner-dialog').fadeOut();

		this.leaveInfoWin();		
	}

	onSuggest(name, phone) {
		
		/*  register name/phone  */

		// enable for production		
		var parameters = {	
							id: this.id,
							userName: name,
							phoneNumber: phone,
							wechatID: this.wechatID
						};				        
		var config = {
			params: parameters
		};

        this.$http.get("http://huodongruanjian.com:8066/lottery/userInfo", config).
        			success(function (data,	status,	headers,	config) {
					})
					.error(function (data, status, header, config) {
		});
					
		angular.element('.overlay').fadeOut();
		angular.element('.leave-info-dialog').fadeOut();
		this.afterleaveInfoWin();
	}
}
