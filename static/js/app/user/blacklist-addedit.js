$(function() {

    var id = getQueryString('id');
    var view = !!getQueryString('v');
    var idkindDict={
        "1":"身份证"
    };
    var gendarDict={
        "0":"未知","1":"男", "2":"女"
    };
    var fields = [{
        field: 'mobile',
        title: '手机号',
        formatter:function(v,data){
            return data.user.mobile;
        },
        readonly: view,
        mobile: true
    }, {
        title:"微信昵称",
        field:"nickname",
        formatter:function(v,data){
            return data.user.nickname;
        }
    },{
        field: 'idKind',
        title: '证件类型',
        type: 'select',
        readonly: view,
        formatter:function(v,data){
            return  idkindDict[data.user.idKind]
        }
    }, {
        field: 'idNo',
        title: '证件号',
        formatter:function(v,data){
            return data.user.idNo;
        },
        readonly: view,
        maxlength: 30
    }, {
        field: 'realName',
        title: '真实姓名',
        readonly: view,
        formatter:function(v,data){
            return data.user.realName;
        },
    },{
        title:"性别",
        field:"gender",
        formatter:function(v,data){
            return gendarDict[data.user.gender]
        }
    }, {
        title:"芝麻信用分数",
        field:"zmScore",
        formatter:function(v,data){
            return data.user.zmScore;
        }
    },{
        title: "状态",
        field: "status",
        type: "select",
        type: 'select',
        data: {
            "0": "删除",
            "1": "有效"
        },
        readonly: view,
    }, {
        field: 'createDatetime11',
        title: '注册时间',
        formatter:function(v,data){
            return dateTimeFormat(data.user.createDatetime)
        }
    }, {
        field: 'remark',
        title: '备注',
        readonly: view
    }];

    buildDetail({
        fields: fields,
        code: {
            id: id
        },
        detailCode: '805246',
        view: view
    });

});