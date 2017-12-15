$(function() {
	
	var code = getQueryString('code');
	var hhr = getQueryString('hhr')||"";
	var bankCode ;
	
	var fields = [{
        field: 'realName',
        title: '户名',
		required: true
    },{
        field: 'bankName',
        title: '银行名称',
    	type: 'select',
		pageCode: '802115',
		params: {
			status: '1',
    		updater: '',
    		companyCode:'',
    		systemCode:''
		},
		keyName: 'bankName',
		valueName: '{{bankName.DATA}}',
		searchName: 'bankName',
		required: true,
		onChange:function(v,data){
			reqApi({
				code: '802116',
				json: {
					bankName: data.bankName
				},
				cache: true
			}).then(function(d) {
				bankCode=d[0].bankCode
			});
		}
    },{
        field: 'bankcardNumber',
        title: '银行卡号',
        number: true,
        minlength: 15,
		required: true
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '802017',
		addCode: '802010',
		editCode: '802012',
		beforeSubmit: function(data){
			data.type="PA";
			data.currency="CNY";
			data.userId=getUserId();
			data.bankCode = bankCode;
			
			return data;
		}
	});
	
});