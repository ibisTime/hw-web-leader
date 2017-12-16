$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
        search: true
    }, {
        field: 'actName',
        title: '活动名称',
        search: true,
        formatter: function(v, data) {
            return data.activity.name;
        },
    }, {
        field: 'applyUser',
        title: '下单用户',
        search: true,
        formatter: function(v, data) {
            return data.user?data.user.nickname+"("+data.user.mobile+")":v;
        },
        type: 'select',
        search: true,
        pageCode: '805120',
        params: {
            kind: 'C',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: "{{nickname.DATA}}-{{mobile.DATA}}",
        searchName: 'mobile',
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: 'act_order_status',
        formatter: Dict.getNameForList("act_order_status"),
        search: true,
    }, {
        field: 'applyDatetime',
        title: '报名时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '报名时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '808737',
        searchParams: {
        	leaderUser: getUserId(),
            companyCode: OSS.company
        },
    });
    
//  $('.tools .toolbar').html('<li style="display:block;" id="detailBtn"><span><img src="/static/images/t01.png"></span>详情</li>');
    
    //详情
    $("#detailBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        };
        var orderData = selRecords[0].orderData?"1":"";
	    var rorderList = selRecords[0].rorderList?"1":"";
	    
    	window.location.href = "activityOrder_addedit.html?code=" + selRecords[0].code+"&orderData="+orderData+"&rorderList="+rorderList;
    });

});