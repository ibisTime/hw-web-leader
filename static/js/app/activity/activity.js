$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '活动名称',
        search: true,
    }, {
        field: 'type',
        title: '类型',
        type: 'select',
        key: 'act_type',
        formatter: Dict.getNameForList('act_type'),
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'act_status',
        formatter: Dict.getNameForList('act_status'),
        search: true
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data:{
        	"0": "普通",
        	"1": "置顶"
        },
        search: true
    }, {
        field: 'placeAsse',
        title: '集合地'
    }, {
        field: 'placeDest',
        title: '目的地'
    }, {
        field: 'groupNum',
        title: '最少成行人数'
    }, {
        field: 'amount',
        title: '活动金额',
        formatter: moneyFormat
    }, {
        field: 'enrollEndDatetime',
        title: '报名截止时间',
        formatter: dateFormatData,
    },{
    	field: 'startDatetime',
        title: '开始时间',
        formatter: dateFormatData,
    },{
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat,
    },{
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '808705',
        searchParams: {
            companyCode: OSS.company,
            userId: getUserId()
        },
    });
    
    var timestamp = new Date().getTime()
    $('.tools .toolbar').html('<li style="display:block;" id="addBtn"><span><img src="/static/images/t01.png"></span>新增</li>'+
    						'<li style="display:block;" id="copyBtn"><span><img src="/static/images/t01.png"></span>复制新增</li>'+
    						'<li style="display:block;" id="editBtn"><span><img src="/static/images/t01.png"></span>修改</li>'+
    						'<li style="display:block;" id="deleteBtn"><span><img src="/static/images/t01.png"></span>删除</li>'+
    						'<li style="display:block;" id="detailBtn"><span><img src="/static/images/t01.png"></span>详情</li>' +
    						'<li style="display:block;" id="upBtn"><span><img src="/static/images/t01.png"></span>发布</li>' +
    						'<li style="display:block;" id="querySignInBtn"><span><img src="/static/images/t01.png"></span>报名查询</li>');

	$("#addBtn").on('click', function(){
		window.location.href = "activity_addedit.html?timestamp="+timestamp;
	})
	
	$("#editBtn").on('click', function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if(selRecords[0].status != "0" && selRecords[0].status != "2" ){
            toastr.info("活动不是可修改的状态");
            return;
        }
        
		window.location.href = "activity_addedit.html?code="+selRecords[0].code+"&timestamp="+timestamp;
	})
	
	//复制新增
	$("#copyBtn").on('click', function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
		window.location.href = "activity_addedit.html?iscopy=1&code="+selRecords[0].code+"&timestamp="+timestamp;
	})
	
	$("#detailBtn").on('click', function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
		window.location.href = "activity_detail.html?code="+selRecords[0].code+"&timestamp="+timestamp;
	})
	
	$('#deleteBtn').on('click', function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status != 0 && selRecords[0].status != 2) {
            toastr.info("活动不是可删除的状态");
            return;
        }
        
        confirm("确认是否删除该活动？").then(function() {

            reqApi({ 
            	code: '808701',
            	json: {
            		code: selRecords[0].code,
            	}}).done(function(data) {
	                sucList();
	            });
	            
        }, function() {});

    });
    
    //报名查询
    $("#querySignInBtn").on('click', function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if(selRecords[0].status == "0"){
            toastr.info("活动状态不可查询");
            return;
        }
        
		window.location.href = "activitySignInQuery.html?code="+selRecords[0].code+"&timestamp="+timestamp;
	})
	
	//发布活动
	$('#upBtn').on('click', function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status != "0") {
            toastr.info("活动不是可发布的状态");
            return;
        }
        
        confirm("确认是否发布该活动？").then(function() {

            reqApi({ 
            	code: '808703',
            	json: {
            		code: selRecords[0].code,
            	}}).done(function(data) {
	                sucList();
	            });
	            
        }, function() {});

    });
});