$(function(){

  var _html = $('html');
  var _body = $('body');
  var _window = $(window);

  var ww = _window.width();
  var wwNew = ww;

  const wwSlim= 400; //更窄螢幕
  const wwMedium = 700; //此值以下是手機
  const wwNormal = 1000; //此值以上是電腦
  const wwMaximum = 1440; // 最大寬度

  var _webHeader = $('.webHeader');
  var _menu = _webHeader.find('.menu'); // 寬版主選單
  var _goTop = $('.goTop');

  // _html.removeClass('no-js');


  // 製作側欄遮罩
  // --------------------------------------------------------------- //
  _body.append('<div class="sidebarMask"></div>');
  const _sidebarMask = $('.sidebarMask');
  // --------------------------------------------------------------- //

  // 製作燈箱遮罩
  // --------------------------------------------------------------- //
  _body.append('<div class="coverAll"></div>');
  const _coverAll = $('.coverAll');
  // --------------------------------------------------------------- //


  // 行動版側欄
  // --------------------------------------------------------------- //
  var _sidebar = $('.sidebar');
  var _sidebarCtrl = $('.sidebarCtrl');
  
  // 行動版「主選單」 
  _menu.clone().prependTo(_sidebar);  // 複製「主選單」到側欄給行動版用
  var _sidebarMenu = _sidebar.find('.menu');
  // --------------------------------------------------------------- //

  // 行動版側欄，顯示／隱藏
  // --------------------------------------------------------------- //
  var _sidebarA = _sidebar.find('a, button');
  // const sbA_lastIndex = _sidebarA.length - 1;
  var _sidebarA_first = _sidebarA.eq(0);
  var _sidebarA_last = _sidebarA.eq(_sidebarA.length - 1);


  _sidebar.hide();
  // 點擊漢堡圖示
  _sidebarCtrl.on('click' ,function(){
    if (_sidebar.hasClass('reveal')) {
      _sidebar.removeClass('reveal');
      _sidebarCtrl.css('right', 0);
      _sidebarMask.fadeOut(500, function(){
        _sidebar.hide();
        _sidebarCtrl.removeClass('closeIt');
        _body.removeClass('noScroll');
      });
    } else {
      _sidebar.show(100, function(){
        _sidebar.addClass('reveal');
        _sidebarCtrl.css('right', _sidebar.innerWidth() );
      });
      _sidebarMask.fadeIn(500 ,function(){
        _sidebarCtrl.addClass('closeIt');
      });
      _body.addClass('noScroll');
    }
  })

  // 點擊遮罩，隱藏側欄
  _sidebarMask.on( 'click', function(){
    _sidebar.removeClass('reveal');
    _sidebarCtrl.removeClass('closeIt').css('right', 0);
    $(this).fadeOut(500, function(){
      _sidebar.hide();
      _body.removeClass('noScroll');
    });
  })

  _sidebarA_last.on('keydown', function(e){
    if ( e.code === 'Tab' && !e.shiftKey ) {
      e.preventDefault();
      _sidebarCtrl.trigger('focus');
    }
  })
  // --------------------------------------------------------------- //



  // 行動版側欄「主選單」開合
  // --------------------------------------------------------------- //
  // _hasChildMobile.on( 'click', function(e){
  //   e.preventDefault();
    
  //   let _this = $(this);
  //   let _subMenu = _this.next('ul');

  //   if (_subMenu.is(':hidden')) {
  //     _subMenu.stop(true, false).slideDown();
  //     _this.attr('aria-expanded', true).parent().addClass('closeIt').siblings().removeClass('closeIt').find('ul:visible').slideUp().parent().removeClass('closeIt').children('a').attr('aria-expanded', false);
  //   } else {
  //     _subMenu.stop(true, false).slideUp().find('ul:visible').slideUp();
  //     _subMenu.find('.closeIt').removeClass('closeIt').children('a').attr('aria-expanded', false);
  //     _this.attr('aria-expanded', false).parent().removeClass('closeIt');
  //   }
  // })
  // --------------------------------------------------------------- //




  // 寬版「主選單」
  // --------------------------------------------------------------- //





  // 固定版頭 
  // --------------------------------------------------------------- //
  // var fixHeadThreshold;
  // var hh = _webHeader.innerHeight();

  // if ( ww >= wwNormal) {
  //   fixHeadThreshold = hh;
  // } else {
  //   fixHeadThreshold = 0;
  // }

  // _window.scroll(function(){
  //   if (_window.scrollTop() > fixHeadThreshold ) {
  //     _webHeader.addClass('fixed');
  //     _body.offset({top: hh});
  //     $('.goCenter').trigger('blur');
  //   } else {
  //     _webHeader.removeClass('fixed');
  //     _body.removeAttr('style');
  //   }

  //   // goTop button 顯示、隱藏
  //   // ----------------------------------------------- //
  //   _window.scrollTop() > 200 ? _goTop.addClass('show') :  _goTop.removeClass('show');
  // })
  // _window.trigger('scroll');
  // --------------------------------------------------------------- //




  // 版頭查詢區開合（手機版）
  // --------------------------------------------------------------- //
  // var _searchCtrl = $('.searchCtrl');
  // var _search = $('.search');
  // _search.append('<button class="skip" type="button">回到控制開關</button>');
  // var _skipSearch = _search.find('.skip');
  // const srSpeed = 320;

  // if (_search.is(':hidden')) {
  //   _searchCtrl.removeClass('closeIt').attr('aria-expanded', false);
  // } else {
  //   _searchCtrl.addClass('closeIt').attr('aria-expanded', true);
  // }

  // _searchCtrl.on( 'click', function(){
  //   if( _search.hasClass('reveal')) {
  //     _search.slideUp(srSpeed, function(){
  //       _search.removeClass('reveal').hide();
  //     })
  //     _searchCtrl.removeClass('closeIt').attr('aria-expanded', false);
  //   } else {
  //     _search.slideDown(srSpeed, function(){
  //       _search.addClass('reveal').find('input[type="text"]').trigger('focus');
  //       _searchCtrl.addClass('closeIt').attr('aria-expanded', true);
  //     });
  //   }
  // })

  // // skip, 回到查詢控制開關
  // _skipSearch.on( 'focus', function(){
  //   _searchCtrl.trigger('focus');
  // })
  // --------------------------------------------------------------- //











  // 回到頁面頂端 Go Top
  // --------------------------------------------------------------- //
  _goTop.on( 'click', function(){
    _html.stop(true,false).animate({scrollTop: 0}, 800, function(){
      $('.goCenter').trigger('focus');
    });
  });



	// 頁籤功能 
  // --------------------------------------------------------------- //
	function tabFun() {
		var activeClass = 'active'; // 啟動的 class
		var tabSet = $('.tabSet');
    
		tabSet.each(function () {
      let _this = $(this);
			// var _tabBtnBlock = _this.find('.tabItems');
			let _tabBtn = _this.find('.tabItems').children('button');
			let _tabBtnLength = _tabBtn.length;
			let _tabContent =  _this.find('.tabContent');
      
			_tabBtn.removeClass(activeClass).eq(0).addClass(activeClass);
			_tabContent.eq(0).show();

			for (let i = 0; i < _tabBtnLength; i++) {
				(
					function (i) {
						let _this = _tabBtn.eq(i);
						let _thisContent = _tabContent.eq(i);
						let _thisPrevItem = _tabContent.eq(i - 1);
						let _itemAllA = _thisContent.find('[href], input'); //這一個頁籤內容所有a和input項目
						let _prevItemAllA = _thisPrevItem.find('[href], input'); //前一個頁籤內容所有a和input項目
						let _isFirstTab = i === 0; //如果是第一個頁籤
						let _isLastTab = i === _tabBtnLength - 1; //如果是最後一個頁籤
						let _itemFirstA = _itemAllA.eq(0); //頁籤內容第一個a或是input
						let _itemLastA = _itemAllA.eq(-1); //頁籤內容最後一個a或是input
						let _prevItemLastA = _prevItemAllA.eq(-1); //前一個頁籤的最後一個a或是input

						// _this頁籤觸發focus內容裡的第一個a
						_this.on('keydown', function (e) {
							//頁籤第幾個按鈕觸發時無
							if (e.which === 9 && !e.shiftKey) { // 按下 tab 時沒有按著 shift
								e.preventDefault();
								startTab(i); //啟動頁籤切換功能
								if (_itemAllA.length) { // 如果 _itemAllA.length 不是 0（內容有至少一個 a 或 input）
									_itemFirstA.focus(); // 內容的第一個 a 或是 input focus
								} else {
									_tabBtn.eq(i + 1).focus(); // 當內容沒有 a 或是 input 跳下一個頁籤
								}
							} else if (e.which === 9 && e.shiftKey && !_isFirstTab) { // 按下 tab 時同時按著 shift，且不是第一個頁籤
								e.preventDefault();
								startTab(i - 1); //啟動頁籤切換功能，切換到上一個頁籤

								if (_prevItemAllA.length) { // 如果前ㄧ個頁籤的內容有至少一個 a 或 input
									_prevItemLastA.focus(); // 前一個頁籤內容的最後一個a或是input focus
								} else { // 當內容沒有a或是input
									_tabBtn.eq(i - 1).focus(); // focus 上一個頁籤
								}
							}
						});

						// 當按下shift+tab且為該內容的第一個a或是input
						// 將focus目標轉回tab頁籤上，呼叫上方功能startTab(i - 1);往前一個頁籤
						_itemFirstA.on('keydown', function (e) {
							if (e.which === 9 && e.shiftKey) {
								e.preventDefault();
								_tabBtn.eq(i).focus();
							}
						});

						//當按下shift+tab且為該內容的最後一個a或是input，focus到下一個頁籤
						_itemLastA.on('keydown', function (e) {
							if (e.which === 9 && !e.shiftKey && !_isLastTab) {
								e.preventDefault();
								_tabBtn.eq(i + 1).focus();
							}
						});
					})(i);

				//滑鼠點擊事件
				_tabBtn.on('click', function (e) {
					e.preventDefault();
					startTab( $(this).index() );
				});

				//切換tab
				function startTab(_now) {
					_tabBtn.eq(_now).addClass(activeClass).siblings().removeClass(activeClass);
					_tabContent.hide().eq(_now).show();
				}
			}
		});
	}
	tabFun();
  // --------------------------------------------------------------- //



  // 燈箱 
  // --------------------------------------------------------------- //
  var _lightbox = $('.lightbox');
  var _hideLightbox = _lightbox.find('.closeThis');
  const lbxSpeed = 400;

  _lightbox.before('<div class="coverAll"></div>');
  _lightbox.append('<button type="button" class="skip">焦點移到 "關閉此燈箱"</button>');
  var _cover = $('.coverAll');
  var _skipToClose = _lightbox.find('.skip');

  _skipToClose.focus( function () {
    _hideLightbox.focus();
  })

  // 關燈箱
  _hideLightbox.click(function(){
    let _targetLbx = $(this).parents('.lightbox');
    _targetLbx.stop(true, false).fadeOut(lbxSpeed,
      function(){
        _cpBigPhoto.find('.flowList').find('li').hide();
      }
    );
    _targetLbx.prev(_cover).fadeOut(lbxSpeed);
    _body.removeClass('noScroll');
  })

  _cover.click(function(){
    let _targetLbx = $(this).next('.lightbox');
    $(this).fadeOut(lbxSpeed);
    _body.removeClass('noScroll');
    _targetLbx.stop(true, false).fadeOut(lbxSpeed,
      function(){
        _cpBigPhoto.find('.flowList').find('li').hide();
      }
    );
  })

  _lightbox.on('keydown', function(e){
    if ( e.keyCode == 27) {
      _hideLightbox.trigger('click');
    }
  })


  // --------------------------------------------------------------- //

  const _memberCtrl = $('.memberCtrl');
  _memberCtrl.on('click', function(){
    $('.loginHere').show();

  })



  // 改變瀏覽器寬度 window resize 
  // --------------------------------------------------------------- //
  var winResizeTimer;
  _window.resize(function () {
    clearTimeout(winResizeTimer);
    winResizeTimer = setTimeout( function () {

      wwNew = _window.width();
      
      // 由小螢幕到寬螢幕
      // if( ww < wwNormal && wwNew >= wwNormal ) {
      //   if (_sidebar.hasClass('reveal')) {
      //     _sidebar.removeClass('reveal');
      //     _sidebarCtrl.removeClass('closeIt');
      //     _sidebarMask.hide();
      //     _body.removeClass('noScroll');
      //   }

      //   _body.removeAttr('style');
      //   _webHeader.removeClass('fixed');
      //   _search.removeClass('reveal').removeAttr('style')
      //   hh = _webHeader.outerHeight();
      //   fixHeadThreshold =  hh - _menu.innerHeight();
      //   _window.trigger('scroll');
      // }

      // 由寬螢幕到小螢幕
      // if( ww >= wwNormal && wwNew < wwNormal ){
      //   hh = _webHeader.outerHeight();
      //   fixHeadThreshold = 0;
      //   _body.removeAttr('style');
      //   if ( ! _webHeader.hasClass('mp') ) {
      //     _window.trigger('scroll');
      //   }
      // }
      ww = wwNew;
    }, 200);
  });
  // window resize  end -------------------------------------------- //
  


  // --------------------------------------------------------------- //
  // ----------------- 外掛套件 slick 參數設定 --------------------- //
  // --------------------------------------------------------------- //




	// rwd Table 
  // --------------------------------------------------------------- //
	// 把 th 的內容複製到對應的td的 data-th 屬性值
	var _rwdTable = $('.rwdTable');
	_rwdTable.each(function () {
		let _this = $(this);
		let _th = _this.find('thead>tr>th');
		let count = _th.length;
		let _tr = _this.find('tbody').children('tr');

		_tr.each(function () {
			let _td = $(this).children('td');
			for (let i = 0; i < count; i++) {
				_td.eq(i).attr('data-th', _th.eq(i).text());
			}
		})
	})
})