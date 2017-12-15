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
        field: 'applyUser',
        title: '下单用户',
        search: true,
        formatter: function(v, data) {
            return data.user?data.user.mobile:v;
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
        valueName: 'mobile',
        searchName: 'mobile',
    }, {
        field: 'payType',
        title: '买单方式',
        key: 'pay_type',
        formatter: Dict.getNameForList("pay_type"),
        type: 'select',
        search: true,
    }, {
        field: 'totalAmount',
        title: '总价',
        formatter: moneyFormat
    }, {
        field: 'totalYunfei',
        title: '运费',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: 'act_order_status',
        formatter: Dict.getNameForList("act_order_status"),
        search: true,
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '下单时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
    }, {
        field: "payDatetime",
        title: "支付时间",
        formatter: dateTimeFormat,
        field1: 'payDatetimeStart',
        title1: '支付时间',
        type: 'date',
        field2: 'payDatetimeEnd',
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
        beforeDetail: function(){
        	var selRecords = $('#tableList').bootstrapTable('getSelections');
        	
		    var orderData = selRecords[0].orderData?"1":"";
		    var rorderList = selRecords[0].rorderList?"1":"";
		    
        	window.location.href = "activityOrder_addedit.html?code=" + selRecords[0].code+"&orderData="+orderData+"&rorderList="+rorderList;
        }
    });
    //流水查询
    $("#ledgerBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        };
        window.location.href = "order_ledger.html?refNo=" + selRecords[0].code;
    });

});