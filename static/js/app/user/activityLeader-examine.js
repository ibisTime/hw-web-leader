$(function() {

    var userId = getQueryString('userId');

    var fields = [{
        field: 'mobile',
        title: '手机号',
        required: true,
        readonly: true,
        mobile: true
    }, {
        title: "户外昵称",
        field: "outName",
        readonly: true,
        required: true,
    }, {
        field: 'realName',
        title: '真实姓名',
        required: true,
        readonly: true,
        maxlength: 10
    }, {
        field: 'idKind',
        title: '证件类型',
        type: 'select',
        data: { '1': '身份证' },
        required: true,
        readonly: true,
    }, {
        field: 'idNo',
        title: '证件号',
        required: true,
        readonly: true,
        idCard: true
    }, {
        title: '所在地区',
        field: 'citySelect1',
		formatter: function(v, r) {
			var res = $.unique([r.province, r.city, r.area]).reverse();
			return res.join(' / ');
		},
        required: true,
        readonly: true,
    }, {
        field: 'address',
        title: '详细地址',
        readonly: true,
        required: true,
    }, {
        field: 'email',
        title: '邮箱',
        required: true,
        readonly: true,
        email: true
    }, {
        field: 'emeContact',
        title: '紧急联系人',
        required: true,
        readonly: true,
        maxlength: 10
    }, {
        field: 'emeMobile',
        title: '紧急联系人手机号',
        required: true,
        readonly: true,
        mobile: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "ol_user_status",
        formatter: Dict.getNameForList("ol_user_status"),
        readonly: true,
    }, {
        field: 'remark',
        title: '备注',
        readonly: false,
        required: true,
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        detailCode: '805121',
        buttons : [{
	        title: '通过',
	        handler: function() {
	            if ($('#jsForm').valid()) {
	                var data = $('#jsForm').serializeObject();
	                data.approveResult = '1';
	                data.approver = getUserName();
	                data.userId = userId;
	                reqApi({
	                    code: '805046',
	                    json: data
	                }).done(function(data) {
	                    sucDetail();
	                });
	            }
	        }
	    }, {
	        title: '不通过',
	        handler: function() {
	            if ($('#jsForm').valid()) {
	                var data = $('#jsForm').serializeObject();
	                data.approveResult = '0';
	                data.approver = getUserName();
	                data.userId = userId;
	                reqApi({
	                    code: '805046',
	                    json: data
	                }).done(function(data) {
	                    sucDetail();
	                });
	            }
	        }
	    }, {
	        title: '返回',
	        handler: function() {
	            goBack();
	        }
	    }]
    });

});