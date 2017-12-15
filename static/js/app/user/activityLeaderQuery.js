$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'outName',
        title: '户外昵称'
    }, {
        field: 'mobile',
        title: '手机号',
        search: true
    }, {
        field: 'realName',
        title: '姓名'
    }, {
        field: 'idNo',
        title: '证件号码'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'ol_user_status',
        formatter: Dict.getNameForList('ol_user_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat,
        field1: 'createDatetimeStart',
        title1: '注册时间',
        type1: 'date',
        field2: 'createDatetimeEnd',
        type2: 'date',
        twoDate: true,
        search: true,
    },{
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: 'OL',
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "activityLeader_addedit.html?v=1&userId=" + data.userId;
        }
    });
    
    //账户
    $('#accountBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "customer_account.html?&c=1&userId=" + selRecords[0].userId;
    });

});