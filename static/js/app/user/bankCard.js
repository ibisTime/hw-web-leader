$(function() {
	var userId = getQueryString('userId');
	var hhr = getQueryString('hhr')||"";
	var c = !!getQueryString('c');//c端
	var b = !!getQueryString('b');//b端
	var h = !!getQueryString('h');//合伙人
	var g = !!getQueryString('g')||"";//礼品商
	
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
        field: 'realName',
        title: '户名',
    },{
        field: 'bankcardNumber',
        title: '银行卡号',
    },{
        field: 'bankName',
        title: '银行名称',
    },{
        field: 'createDatetime',
        title: '创建时间',
    	formatter: dateTimeFormat
    }];
    
	buildList({
		columns: columns,
		pageCode: '802015',
		searchParams: {
			'userId': userId
		}
	});
	
	$('.tools .toolbar').empty();
	if(hhr){
		$('.tools .toolbar').html('<li style="display:block;" id="addBtn"><span><img src="/static/images/t01.png"></span>新增</li><li style="display:block;" id="editBtn"><span><img src="/static/images/t01.png"></span>修改</li><li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
	}else{
		$('.tools .toolbar').html('<li style="display:block;" id="editBtn"><span><img src="/static/images/t01.png"></span>修改</li><li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
	}
	
	$('#addBtn').on('click', function() {
		if(!$("#tableList tbody .no-records-found").html()){
			toastr.info("只能添加一张银行卡");
			return;
		}
		location.href = "bankCard_addedit.html";
	});
	
	$('#editBtn').on('click', function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		
		location.href = "bankCard_addedit.html?Code="+selRecords[0].code+'&v=1&hhr='+hhr;
	});
	
	$('#backBtn').on('click', function() {
		if(hhr){
			location.href = "myaccount.html";
		}else if(c){
			location.href = "customer.html";
		}else if(b){
			location.href = "bizman.html";
		}else if(h){
			location.href = "partner.html";
		}else if(g){
			location.href = "giftDealer.html";
		}else{
			goBack();
		}
		
	});
});

