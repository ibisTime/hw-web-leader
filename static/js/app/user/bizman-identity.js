$(function() {
	
	var userId = getQueryString('userId');
	var view = !!getQueryString('v');
	
	var fields = [{
		field: 'userId',
		type: 'hidden',
		value: userId
	},{
		field: 'mobile',
		title: '手机号',
		required: true,
        readonly: true,
		mobile: true
	}, {
		field: 'idKind',
		title: '证件类型',
		type: 'select',
		required: true,
		data: {'1': '身份证'},
		value: '1'
	}, {
		field: 'realName',
		title: '真实姓名',
		required: true,
		maxlength: 10
	}, {
		field: 'idNo',
		title: '证件号',
		required: true,
		maxlength: 30
	}];
	
	buildDetail({
		fields: fields,
		code: {userId:userId},
		addCode: '805042',
		editCode: '805046',
		detailCode: '805056',
		view: view
	});
	
});