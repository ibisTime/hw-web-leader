$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var d = new Date();
    d.setDate(d.getDate());
    var minDate = d.format('yyyy-MM-dd');

    var fields = [{
        field: 'name',
        title: '活动名称',
        required: true
    }, {
        field: 'type',
        title: '类型',
        type: 'select',
        key: 'act_type',
        formatter: Dict.getNameForList('act_type'),
        required: true,
    }, {
        field: 'slogan',
        title: '广告语',
    }, {
        title: '活动时间',
        formatter: dateFormatData,
        field1: 'startDatetime',
        title1: '审核时间',
        field2: 'endDatetime',
        minDate: minDate,
        type : 'date',
        twoDate: true,
        required: true,
    },{
        field: 'enrollEndDatetime',
        title: '报名截止时间',
        formatter: dateFormatData,
        type : 'date',
        minDate: minDate,
        required: true,
    },{
        title: '目的地所在市',
        type: 'citySelect',
        provinceField:'placeDestProvince',
        cityField:'placeDestCity',
        noArea: true,
        required: true,
    }, {
        field: 'placeDest',
        title: '目的地',
        required: true,
    }, {
        title: '集合地所在市',
        type: 'citySelect',
        provinceField:'placeAsseProvince',
        cityField:'placeAsseCity',
        noArea: true,
        required: true,
    }, {
        field: 'placeAsse',
        title: '集合地',
        required: true,
    }, {
        field: 'groupNum',
        title: '最少成行人数',
        required: true,
    }, {
        field: 'groupNumMax',
        title: '最大成行人数',
    }, {
        field: 'amount',
        title: '收费金额',
        amount: true,
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
        title: '强度系数',
        type: 'start',
    }, {
        field: 'indexNd',
        title: '难度系数',
        type: 'start',
    }, {
        field: 'indexFj',
        title: '风险系数',
        type: 'start',
    }, {
        field: 'description',
        title: '活动介绍',
        type: 'textarea',
        required: true,
    }, {
        field: 'placeDesc',
        title: '地方介绍',
        type: 'textarea',
        required: true,
    }, {
        field: 'amountDesc',
        title: '费用介绍',
        type: 'textarea',
        required: true,
    }, {
        field: 'scheduling',
        title: '具体行程',
        type: 'textarea',
        required: true,
    }, {
        field: 'equipment',
        title: '装备建议',
        type: 'textarea',
        required: true,
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode:'808700',
        editCode:'808702',
        detailCode: '808706',
        view: view,
        beforeSubmit: function(data){
        	data.userId = getUserId();
        	return data;
        }
    });

});