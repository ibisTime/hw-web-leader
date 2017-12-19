$(function() {
    var userId = getUserId();

    var fields = [{
        field: 'userMobile',
        title: '手机号',
        formatter: function(v, data){
    		return data.mobile;
        },
        required: true,
    }, {
        title: "户外昵称",
        field: "outName",
        required: true,
    }, {
        field: 'cuserId',
        title: '绑定C端账号',
        formatter: function(v, data){
        	if(v!=''&&v){
        		return data.cUser.nickname+"("+data.cUser.mobile+")";
        	}else{
        		return '<input id="bindCUserBtn" type="button" class="bindCUserBtn" value="绑定C端账号">';
        	}
        }
    }, {
        field: 'realName',
        title: '真实姓名',
        required: true,
    }, {
        field: 'idKind',
        title: '证件类型',
        type: 'select',
        data: { '1': '身份证' },
        required: true,
    }, {
        field: 'idNo',
        title: '证件号',
        required: true,
    }, {
        title: '所在地区',
        type: 'citySelect',
        required: true,
    }, {
        field: 'address',
        title: '详细地址',
        required: true,
    }, {
        field: 'email',
        title: '邮箱',
        required: true,
    }, {
        field: 'emeContact',
        title: '紧急联系人',
        required: true,
    }, {
        field: 'emeMobile',
        title: '紧急联系人手机号',
        required: true,
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        addCode:'805047',
        detailCode: '805121',
        view: true
    });
	
	$("#jsForm").on("click", "#bindCUserBtn", function(){
		var dw = dialog({
    		fixed: true,
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li class="pop-form-title">绑定C端</li></ul></form>'
        });
		
        dw.showModal();
        buildDetail({
            container: $('#formContainer'),
            fields:[{
		        field: 'mobile',
		        title: '手机号',
		        required: true,
            },{
		        field: 'smsCaptcha',
		        type: 'smsCaptcha',
		        title: '验证码',
		        bizType:'805082',
		        required: true,
            }],
            buttons: [{
                title: '确定',
        		field: 'confirm',
                handler: function() {
                    if ($("#popForm").valid()) {
                        var data = $('#popForm').serializeObject();
                		data.userId = userId;
                		
		                reqApi({
		                    code: '805082',
		                    json: data
		                }).done(function(data) {
                    		dw.close().remove();
                    		toastr.info('绑定成功');
                    		setTimeout(function(){
                    			location.reload(true)
                    		},800)
		                });
                    }
                }
            }, {
                title: '取消',
        		field: 'cancel',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
	})
});