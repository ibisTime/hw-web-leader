$(function() {
    var userId = getUserId();

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名'
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        key: 'currency',
        formatter: Dict.getNameForList('currency')
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'amount',
        title: '余额',
        formatter: moneyFormat
    }, {
        field: 'frozenAmount',
        title: '冻结金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'currency_type',

        formatter: Dict.getNameForList('account_status'),
        // search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802503',
        searchParams: {
            userId: userId
        }
    });

    $('.tools .toolbar').html('<li style="display:block;" id="ledgerBtn"><span><img src="/static/images/t01.png"></span>查看明细</li>'
    				+'<li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>转账</li>');
//  				+'<li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
	
	//查看明细
    $('#ledgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "../finance/ledger.html?&a=1&accountCode=" + selRecords[0].accountNumber;
    });
    
    //设置置顶
	$("#setLocationBtn").on("click",function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
    	var dw = dialog({
    		fixed: true,
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li class="pop-form-title">转账</li></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            container: $('#formContainer'),
            fields: [{
		        field: 'location1',
		        title: '位置',
		        type: 'select',
		        value: '0',
		        data:{
		        	"0": "普通",
		        	"1": "置顶"
		        },
                required: true
		    }, {
		        field: 'orderNo',
		        title: '序号',
                required: true
		    }],
            buttons: [{
                title: '确定',
        		field: 'confirm',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var popFormData = $('#popForm').serializeObject();
                		var data={};
                		
                		data.code = selRecords[0].code;
                		data.location = popFormData.location1;
                		data.orderNo = popFormData.orderNo;
                		
		                reqApi({
		                    code: '808704',
		                    json: data
		                }).done(function(data) {
                    		dw.close().remove();
                            sucList()
		                });
                    }
                }
            }, {
                title: '取消',
        		field: 'cancel',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
        
    })
    
    
//  $('#goBackBtn').click(function() {
//      window.location.href = "customer.html"
//  });
});