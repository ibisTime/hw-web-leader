$(function() {
    var code = getQueryString('code');
    
    var columns = [{
        field: 'actName',
        title: '活动名称',
        formatter: function(v, data) {
            return data.activity.name;
        },
    }, {
        field: 'actLeader',
        title: '活动领队',
        formatter: function(v, data) {
            return data.leadUser.outName+"("+data.leadUser.mobile+")";
        },
    }, {
        field: 'amount',
        title: '活动金额',
        formatter: function(v, data) {
            return "￥"+moneyFormat(v);
        },
    }, {
        field: 'pAmount',
        title: '商品金额',
        formatter: function(v, data) {
            return "￥"+moneyFormat(v);
        },
    }, {
        field: 'rpAmount',
        title: '租赁商品金额',
        formatter: function(v, data) {
            return "￥"+moneyFormat(v);
        },
    }, {
        field: 'depRpAmount',
        title: '租赁押金',
        formatter: function(v, data) {
            return "￥"+moneyFormat(v);
        },
    }, {
        field: 'applyUser',
        title: '报名人',
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
        field: 'realName',
        title: '报名人真实姓名',
        formatter: function(v, data) {
            return data.user.realName;
        },
    }, {
        field: 'idNo',
        title: '报名人身份证号',
        formatter: function(v, data) {
            return data.user.idNo;
        },
    }, {
        field: 'outName',
        title: '户外昵称',
        formatter: function(v, data) {
            return data.user.outName;
        },
    }, {
        field: 'applyDatetime',
        title: '报名时间',
        formatter: dateTimeFormat,
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        data:{
        	'2':'已报名',
        	'4':'已成团',
        	'5':'已完成',
        	'9':'平台取消'
        },
        formatter: Dict.getNameForList("act_order_status"),
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
        	actCode:code,
        	statusList: ['2','4','5','9'],
            companyCode: OSS.company
        },
    });
    
    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>'+
        						'<li style="display:block;" id="exportBtn"><span><img src="/static/images/t01.png"></span>导出</li>');
    
    $('#backBtn').on('click', function() {
        goBack();
    });
    
	$('#exportBtn').click(function() {
        $('.export .btn').click();
    });
});