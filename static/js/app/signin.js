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
//密码强度
function calculateSecurityLevel(password){
    var strength_L = 0;
    var strength_M = 0;
    var strength_H = 0;

    for (var i = 0; i < password.length; i++) {
        var code = password.charCodeAt(i);
        // 数字
        if (code >= 48 && code <= 57) {
            strength_L++;
            // 小写字母 大写字母
        } else if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            strength_M++;
            // 特殊符号
        } else if ((code >= 32 && code <= 47) || (code >= 58 && code <= 64) || (code >= 94 && code <= 96) || (code >= 123 && code <= 126)) {
            strength_H++;
        }
    }
    // 弱
    if ((strength_L == 0 && strength_M == 0) || (strength_L == 0 && strength_H == 0) || (strength_M == 0 && strength_H == 0)) {
        return "1";
    }
    // 强
    if (0 != strength_L && 0 != strength_M && 0 != strength_H) {
        return "3";
    }
    // 中
    return "2";
}

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
        initialSlide: '1',
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
	        	mySwiper.slideTo(0)
	        });
        }
    });
    
    var _finPwdForm = $("#finPwdForm");
        _finPwdForm.validate({
            'rules': {
                mobile: {
                    required: true,
                    mobile: true
                },
                smsCaptcha: {
                    required: true,
                    "sms": true
                },
                newLoginPwd: {
                    required: true,
                    maxlength: 16,
                    minlength: 6,
                    isNotFace: true
                },
                rePwd: {
                    required: true,
                    equalTo: "#newLoginPwd"
                }
            },
            onkeyup: false
        });
        
        
    $('#finPwdForm-smsBtn').on('click', function() {
        if (!$('#finPwdForm-mobile').val()) {
            toastr.info('请输入手机号');
        } else {
            $('#finPwdForm-smsBtn').prop('disabled', true);
            reqApi({
	            code: '805950',
	            json: {
	            	bizType:'805063',
	            	mobile:$('#finPwdForm-mobile').val(),
	            	kind:'OL'
	            },
				sync: true
	        }).then(function(data) {
	        	$('#finPwdForm-smsBtn').prop('disabled', false);
                count($('#finPwdForm-smsBtn'), 60);
	        },function(){
	        	$('#finPwdForm-smsBtn').prop('disabled', false);
	        })
        }
    });   
    $('#finPwdBtn').on('click', function() {
        if(_finPwdForm.valid()){
        	var param = _finPwdForm.serializeObject()
        	param.loginPwdStrength = calculateSecurityLevel(param.newLoginPwd)
        	param.kind = "OL";
			reqApi({
	            code: '805063',
	            json: param,
				sync: true
	        }).done(function(data) {
	        	toastr.success('找回成功');
	        	mySwiper.slideTo(0)
	        });
        }
    });
    
    // 注册
    $('#registerBtn').click(function() {
        mySwiper.slideTo(2)
    });
    
    //找回密码
    $('#goFinPwdBtn').on('click', function() {
    	mySwiper.slideTo(1)
    });
    
    //返回
    $('.goLoginBtn').on('click', function() {
    	mySwiper.slideTo(0)
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