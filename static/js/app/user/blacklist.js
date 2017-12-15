$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'mobile',
        title: '手机号',
        formatter: function(v, data) {
            if (data.user.mobile) {
                return data.user.mobile;
            } else {
                return "-"
            }
        }
    }, {
        title: "手机号",
        field: "userId",
        type: "select",
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
        visible: false
    }, {
        field: 'realName',
        title: '姓名',
        formatter: function(v, data) {
            if (data.user.realName) {
                return data.user.realName;
            } else {
                return "-"
            }
        },
    }, {
        field: 'nickname',
        title: '微信昵称',
        formatter: function(v, data) {
            if (data.user.nickname) {
                return data.user.nickname;
            } else {
                return "-"
            }
        },
    }, {
        field: 'idNo',
        title: '证件号码',
        formatter: function(v, data) {
            if (data.user.idNo) {
                return data.user.idNo;
            } else {
                return "-"
            }
        },
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "删除",
            "1": "有效"
        },
        search: true
    }, {
        field: 'createDatetime11',
        title: '注册时间',
        formatter: function(v, data) {
                return dateTimeFormat(data.user.createDatetime)
            }
            // formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '805245',
        searchParams: {
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "blacklist_addedit.html?v=1&id=" + data.id;
        }
    });
    //激活
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0) {
            toastr.info("已经不是黑名单了");
            return;
        }
        confirm("确定将该用户移出黑名单？").then(function() {
            reqApi({
                code: '805240',
                json: {
                    id: selRecords[0].id
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });


});