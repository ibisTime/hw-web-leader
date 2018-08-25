$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'name',
        title: '活动名称'
    }, {
        field: 'type',
        title: '类型',
        type: 'select',
        key: 'act_type',
        formatter: Dict.getNameForList('act_type'),
    }, {
        field: 'slogan',
        title: '广告语'
    }, {
        field: 'startDatetime',
        title: '开始时间',
        formatter: dateFormatData,
    },{
        field: 'endDatetime',
        title: '结束时间',
        formatter: dateFormatData,
    },{
        field: 'enrollEndDatetime',
        title: '报名截止时间',
        formatter: dateFormatData,
    },{
        field: 'placeDestProvince',
        title: '目的地所在市',
        formatter: function(v, data){
        	return data.placeDestProvince + " "+ data.placeDestCity
        },
    }, {
        field: 'placeDest',
        title: '目的地'
    }, {
        field: 'placeAsseProvince',
        title: '集合地所在市',
        formatter: function(v, data){
        	return data.placeAsseProvince + " "+ data.placeAsseCity
        },
    }, {
        field: 'placeAsse',
        title: '集合地'
    }, {
        field: 'groupNum',
        title: '最少成行人数'
    }, {
        field: 'groupNumMax',
        title: '最大成行人数',
    }, {
        field: 'amount',
        title: '收费金额',
        formatter: moneyFormat,
    }, {
        field: 'advPic',
        title: '广告图',
        type: "img",
		single: true,
        required: true,
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        required: true,
    }, {
        field: 'indexQd',
        title: '风景系数',
        formatter: function(v, data){
        	var start = ''
        	for (var i=1; i<=v; i++) {
        		start+='<i class="star"></i>'
        	}
        	return '<p class="starWrap" id="indexQd">'+start+'</p>';
        }
    }, {
        field: 'indexNd',
        title: '难度系数',
        formatter: function(v, data){
        	var start = ''
        	for (var i=1; i<=v; i++) {
        		start+='<i class="star"></i>'
        	}
        	return '<p class="starWrap" id="indexQd">'+start+'</p>';
        }
    }, {
        field: 'indexFj',
        title: '风险系数',
        formatter: function(v, data){
        	var start = ''
        	for (var i=1; i<=v; i++) {
        		start+='<i class="star"></i>'
        	}
        	return '<p class="starWrap" id="indexQd">'+start+'</p>';
        }
    }, {
        field: 'description',
        title: '活动介绍',
        type: 'textarea',
    }, {
        field: 'placeDesc',
        title: '地方介绍',
        type: 'textarea',
    }, {
        field: 'amountDesc',
        title: '费用介绍',
        type: 'textarea',
    }, {
        field: 'scheduling',
        title: '具体行程',
        type: 'textarea',
    }, {
        field: 'equipment',
        title: '装备建议',
        type: 'textarea',
    }, {
        field: 'cornerPic',
        title: '角标图片',
        type: "img",
		single: true
    }, {
        field: 'wxGroupQrcode',
        title: '微信群二维码',
        type: "img",
		single: true
    }, {
        field: 'customKey1',
        title: '自定义文本框名称1',
    }, {
        field: 'customKey2',
        title: '自定义文本框名称2',
    }, {
        field: 'customKey3',
        title: '自定义文本框名称3',
    }, {
        field: 'customKey4',
        title: '自定义文本框名称4',
    }, {
        field: 'customKey5',
        title: '自定义文本框名称5',
    }, {
        field: 'platformAdv',
        title: '广告',
        type: 'textarea',
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'act_status',
        formatter: Dict.getNameForList('act_status'),
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data:{
        	"0": "普通",
        	"1": "置顶"
        },
    }, {
        field: 'orderNo',
        title: '序号',
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat,
    },{
        field: 'remark',
        title: '备注'
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808706',
        view: true,
    });
    
});