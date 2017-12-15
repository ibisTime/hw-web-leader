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
    //激活
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 1 && selRecords[0].status != 2) {
            toastr.info("用户状态不能激活");
            return;
        }
        confirm("确定激活？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '0',
                    remark: selRecords[0].remark
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });

    //注销
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0) {
            toastr.info("用户状态不能注销");
            return;
        }

        confirm("确定注销？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '2',
                    remark: selRecords[0].remark
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });
	
	//审核
	$("#examineBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 3) {
            toastr.info("不是可审核的状态");
            return;
        }

        window.location.href = "activityLeader_examine.html?userId=" + selRecords[0].userId;
    })
});