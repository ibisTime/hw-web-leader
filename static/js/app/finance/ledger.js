$(function() {
    var accountCode = getQueryString('accountCode') || '';
    var yl = getQueryString('accountCode') || '';
    var a = getQueryString('a') || '';

    var currencyList = {
        field: 'currency',
        title: '币种',
        type: 'select',
        key: 'currency',

        formatter: Dict.getNameForList("currency"),
        search: true
    }

    var realNameField = {
        field: 'realName',
        title: '户名',
        search: true
    }
    var refNoField = {
        field: 'refNo',
        title: '关联单号',
        // search: true
    }

    if (yl) {
        currencyList = {
            field: 'currency',
            title: '币种',
            type: 'select',
            key: 'currency',

            formatter: Dict.getNameForList("currency"),
        }

    }

    if (a) {
        realNameField = {
            field: 'realName',
            title: '户名',
        }

    }

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, realNameField, currencyList, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',
        formatter: Dict.getNameForList('biz_type'),
        search: true
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        formatter: Dict.getNameForList('jour_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }, {
        field1: 'dateStart',
        title1: '创建时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
        visible: false
    }, refNoField];
    buildList({
        columns: columns,
        pageCode: accountCode ? '802524' : '802520',
        searchParams: {
            accountNumber: accountCode,
            companyCode: OSS.company
        }
    });
    $('#flowBtn').remove();

    if (a) {
        $('.tools .toolbar').empty();
        $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
        $('#backBtn').on('click', function() {
            goBack();
        });
    }
});