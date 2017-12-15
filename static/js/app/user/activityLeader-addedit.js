$(function() {

    var userId = getQueryString('userId');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'mobile',
        title: '手机号',
        required: true,
        readonly: view,
        mobile: true
    }, {
        title: "户外昵称",
        field: "outName",
        required: true,
        readonly: view,
    }, {
        field: 'realName',
        title: '真实姓名',
        readonly: view,
        required: true,
        maxlength: 10
    }, {
        field: 'idKind',
        title: '证件类型',
        type: 'select',
        readonly: view,
        data: { '1': '身份证' },
        required: true,
    }, {
        field: 'idNo',
        title: '证件号',
        readonly: view,
        required: true,
        idCard: true
    }, {
        title: '所在地区',
        type: 'citySelect',
        required: true,
        readonly: view,
        hidden: view
    }, {
        field: 'address',
        title: '详细地址',
        readonly: view,
        required: true,
    }, {
        field: 'email',
        title: '邮箱',
        readonly: view,
        required: true,
        email: true
    }, {
        field: 'emeContact',
        title: '紧急联系人',
        readonly: view,
        required: true,
        maxlength: 10
    }, {
        field: 'emeMobile',
        title: '紧急联系人手机号',
        required: true,
        readonly: view,
        mobile: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "ol_user_status",
        formatter: Dict.getNameForList("ol_user_status"),
        hidden: !view
    }, {
        field: 'remark',
        title: '备注',
        readonly: view,
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        addCode:'805047',
        detailCode: '805121',
        view: view
    });

});