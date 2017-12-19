$('title').html(OSS.systemName);
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return '';
}
sessionStorage.setItem('listSearchs', '');

var oriVal = $.fn.val;
$.fn.val = function(value) {
    var res = oriVal.apply($(this), arguments);
    if ($(this).is('select')) {
        $(this).trigger('chosen:updated');
    }
    return res || '';
};
var oriHtml = $.fn.html;
$.fn.html = function(value) {
    var res = oriHtml.apply($(this), arguments);
    if ($(this).is('select')) {
        $(this).trigger('chosen:updated');
    }
    return res;
};
// 扩展方法
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            var flag = 1;
            for (var i = 0; i < o[this.name].length; i++) {
                if (o[this.name][i] == this.value) {
                    flag = 0;
                    break;
                }
            }
            if (flag) {
                o[this.name].push(this.value || '');
            }
        } else {
            var value = this.value || '';
            if ($('#' + this.name).parent('li').attr('type') == 'amount') {
                value = moneyParse(value);
            }
            if ($('#' + this.name).attr('multiple')) {
                var values = [];
                $('#' + this.name).prev().find('.search-choice').each(function(i, item) {
                    values.push($(item).attr('data-value'));
                });
                o[this.name] = values;
            } else {
                o[this.name] = value;
            }
        }
    });
    return o;
};

$(function() {
	
	$('#hello-text').html(OSS.systemName);
	$('#footer-system').html(OSS.companyName);
    window.sessionStorage.setItem('systemCode', OSS.system);
    // frameset框架嵌套，跳转到最外层
    if (top.location != self.location) {
        top.location = self.location;
    }
	
    // 登录
    $('#loginBtn').click(function() {
        login();
    });

    $(document).on('keyup', function(e) {
        if (e.keyCode == '13') {
            login();
        }
    });

    // swiper
    var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 0,
        //effect : 'flip',
        observer: true,
        observeParents: true,
        threshold: 30,
        pagination: '.tabs',
        paginationClickable: true,
        bulletClass: 'tab',
        onlyExternal: true,
        bulletActiveClass: 'active',
        //        //loop: true,
    });
	
	var _cityGroup = $("#city-group");
    _cityGroup.citySelect({
        required: false
    });
    
    setTimeout(function(){
    	$('#province').chosen({ search_contains: true, allow_single_deselect: true });
    	$('#city').chosen({ search_contains: true, allow_single_deselect: true });
    	$('#area').chosen({ search_contains: true, allow_single_deselect: true });
    },10)
    
    // 登录
    $('#registerBtn').click(function() {
        mySwiper.slideNext();
    });

    $('#smsBtn').on('click', function() {
        if (!$('#mobile').val()) {
            toastr.info('请输入手机号');
        } else {
            $('#smsBtn').prop('disabled', true);
            reqApi({
	            code: '805950',
	            json: {
	            	bizType:'805045',
	            	mobile:$('#mobile').val(),
	            	kind:'OL'
	            },
				sync: true
	        }).then(function(data) {
	        	$('#smsBtn').prop('disabled', false);
                count($('#smsBtn'), 60);
	        },function(){
	        	$('#smsBtn').prop('disabled', false);
	        })
        }
    });
    
    var _formWrapper = $("#registerForm");
    _formWrapper.validate({
        'rules': {
            outName: {
                required: true,
            },
            mobile: {
                required: true,
                mobile: true
            },
            smsCaptcha: {
                required: true,
                "sms": true
            },
            realName: {
                required: true,
                chinese: true
            },
            idNo: {
                required: true,
                idCard: true
            },
            province: {
                required: true,
            },
            city: {
                required: true,
            },
            area: {
                required: true,
            },
            address: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            emeContact: {
                required: true,
            },
            emeMobile: {
                required: true,
                mobile: true
            },
        },
        onkeyup: false
    });

    $('#confirmBtn').on('click', function() {
        if(_formWrapper.valid()){
        	var param = _formWrapper.serializeObject()
        	param.idKind = '1'
			reqApi({
	            code: '805045',
	            json: param,
				sync: true
	        }).done(function(data) {
	        	toastr.success('申请成功');
	        	mySwiper.slidePrev();
	        });
        }
    });
    
    $('#goLoginBtn').on('click', function() {
    	mySwiper.slidePrev();
    });
	

});

function login() {
    if (!$('#loginName').val()) {
        toastr.info('请输入用户名');
        $('#loginName')[0].focus();
    } else if (!$('#loginPwd').val()) {
        toastr.info('请输入密码');
        $('#loginPwd')[0].focus();
    } else {
        var data = {};
        var t = $('#loginForm').serializeArray();
        data.kind = OSS.kind;

        $.each(t, function() {
            data[this.name] = this.value;
        });
		
		//获取七牛地址
		reqApi({
            code: '805917',
            json: {
            	ckey:'qiniu_domain'
            },
			sync: true
        }).done(function(data) {
            window.sessionStorage.setItem('qiniuUrl', 'http://'+data.cvalue);
        });
		
		//获取用户详情
        reqApi({
            code: '805050',
            json: data,
			sync: true
        }).then(function(data) {
            location.href = "main.html";
            window.sessionStorage.setItem('token', data.token || data.userId);
            window.sessionStorage.setItem('userId', data.userId);
        });
    }
}

function count(el, second) {
        el.prop('disabled', true);
        var timer = setInterval(function() {
            second--;
            el.val('重新发送(' + second + ')');
            if (second == 0) {
                el.val('获取验证码');
                el.prop('disabled', false);
                clearInterval(timer);
            }
        }, 1000);
    }