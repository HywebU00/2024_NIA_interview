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



  // 會員選單
  // --------------------------------------------------------------- //
  const _ismember = _webHeader.find('.member');
  const _memberCenter = $('.memberCenter');
  _ismember.on('click', function(){
    if( _memberCenter.is(':hidden') ){
      _memberCenter.slideDown(200);
    } else {
      _memberCenter.slideUp(200);
    }
  })

  // --------------------------------------------------------------- //





  // 固定版頭 
  // --------------------------------------------------------------- //
  var fixHeadThreshold;
  var hh = _webHeader.outerHeight();

  if ( ww >= wwNormal) {
    fixHeadThreshold = hh;
  } else {
    fixHeadThreshold = 0;
  }

  _window.scroll(function(){
    if (_window.scrollTop() > fixHeadThreshold ) {
      _webHeader.addClass('fixed');
      _body.offset({top: hh});
      $('.goCenter').trigger('blur');
    }
    if (_window.scrollTop() == 0 ) {
      _webHeader.removeClass('fixed');
      _body.removeAttr('style');
    }

    // goTop button 顯示、隱藏
    // ----------------------------------------------- //
    _window.scrollTop() > 200 ? _goTop.addClass('show') :  _goTop.removeClass('show');
  })
  _window.trigger('scroll');
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





  // 彈出對話框
  // --------------------------------------------------------------- //
  var _popSection = $('.popSection');
  _popSection.before('<div class="coverAll"></div>'); // 製作燈箱遮罩
  _popSection.each(function(){
    let _this = $(this);
    let _coverAll = _this.prev('.coverAll');
    let _closePop = _this.find('.closeThis');

    _closePop.on('click', function(){
      _this.fadeOut(300);
      _coverAll.fadeOut(300);
      _body.removeClass('noScroll');
      if ( _closePop.parents('.register').length > 0) {
        $('.coverAll:visible').fadeOut(300);
      }
    })

    _coverAll.on('click', function(){
      $(this).add(_popSection.filter(':visible')).fadeOut(200);
      _body.removeClass('noScroll');
    })

  })


  // 顯示[會員登入]對話框
  // --------------------------------------------------------------- //
  const _loginBtn = $('.loginBtn');
  _loginBtn.on('click', function(){
    let popid = '#' + $(this).attr('data-tgID');
    _popSection.filter(popid).show().prev('.coverAll').fadeIn(200);
    _body.addClass('noScroll');
  })
  // --------------------------------------------------------------- //


  // 顯示[註冊成為會員]對話框
  // --------------------------------------------------------------- //
  const _membReg = _popSection.find('.membReg');
  _membReg.on('click', function(){
    let popid = '#' + $(this).attr('data-tgID');
    $(this).parents('.popSection').fadeOut(200).prev('.coverAll').hide();
    _popSection.filter(popid).fadeIn(200).prev('.coverAll').show();
  })
  // --------------------------------------------------------------- //


  // 顯示[忘記密碼]對話框
  const _forgetpw = _popSection.find('.forget').children('a, button');
  _forgetpw.on('click', function(){
    let popid = '#' + $(this).attr('data-tgID');
    $(this).parents('.popSection').fadeOut(200).prev('.coverAll').hide();
    _popSection.filter(popid).fadeIn(200).prev('.coverAll').show();
  })
  // --------------------------------------------------------------- //


  // 面(訪)談預約類別
  // --------------------------------------------------------------- //
  var _optionGroup = $('.optionGroup');
  _optionGroup.each(function(){
    let _this = $(this);
    let _label = _this.find('label');
    let _input = _label.children('input');

    _input.on('click', function(){
      _label.removeClass('checked');
      $(this).parent().addClass('checked');
    })
  })
  // --------------------------------------------------------------- //



  // 小月曆選年、月
  // --------------------------------------------------------------- //
  var _YMoption = $('.bookingCalendar').find('.year, .month');
  _YMoption.each(function(){
    let _this = $(this);
    let _button = _this.find('button.now');
    let _optionItems = _this.find('.options>li>a');
    _button.on('click', function(){
      let _options = $(this).next('.options');
      _options.is(':hidden') ? _options.slideDown(300) : _options.slideUp(300) ;
    })
    _optionItems.on('click', function(){
      setTimeout( () => {
        $(this).parents('.options').slideUp(300);
      }, 200);
    })
  })
  // --------------------------------------------------------------- //



  // [預約紀錄] 下載文件開合
  // --------------------------------------------------------------- //
  var _download = $('.download');
  _download.each( function(){
    let _this = $(this);
    let _fileSlideCtrl = _this.find('.slideCtrl');
    let _files = _this.find('.files');
    _fileSlideCtrl.on('click', function(){
      _files.is(':visible') ? _files.slideUp(300) : _files.slideDown(300);
    })
  })
  // --------------------------------------------------------------- //



  // 刪除[當前預約] 
  // --------------------------------------------------------------- //
  var _cancelIt = $('.records').find('button.cancelIt');
  _cancelIt.on('click', function(){
    $('.popSection.alert').show().prev('.coverAll').fadeIn(200);
  })

  // --------------------------------------------------------------- //

  // Cookie 訊息提示
  // --------------------------------------------------------------- //
  const _cookiesMsg = $('.cookiesMsg');
  const _closeCookiesMsg = _cookiesMsg.find('.closeThis');
  _closeCookiesMsg.on('click', function(){
    _cookiesMsg.fadeOut(250);
  })


  // --------------------------------------------------------------- //

  // 改變瀏覽器寬度 window resize 
  // --------------------------------------------------------------- //
  var winResizeTimer;
  _window.resize(function () {
    clearTimeout(winResizeTimer);
    winResizeTimer = setTimeout( function () {

      wwNew = _window.width();
      
      // 由小螢幕到寬螢幕
      if( ww < wwNormal && wwNew >= wwNormal ) {
        if (_sidebar.hasClass('reveal')) {
          _sidebar.removeClass('reveal');
          _sidebarCtrl.removeClass('closeIt');
          _sidebarMask.hide();
          _body.removeClass('noScroll');
        }

        _body.removeAttr('style');
        _webHeader.removeClass('fixed');
        hh = _webHeader.outerHeight();
        fixHeadThreshold =  hh;
        _window.trigger('scroll');
      }

      // 由寬螢幕到小螢幕
      if( ww >= wwNormal && wwNew < wwNormal ){
        hh = _webHeader.outerHeight();
        fixHeadThreshold = 0;
        _body.removeAttr('style');
        if ( ! _webHeader.hasClass('mp') ) {
          _window.trigger('scroll');
        }
      }
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