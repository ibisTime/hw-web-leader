$(function() {
    var userId = getUserId();
    var fromUserId = '';
    
    reqApi({
        code: '805121',
        json: { "userId": userId },
        sync: true
    }).done(function(data) {
    	fromUserId = data.cuserId 
    	
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
	            userId: userId,
	            currency:"XJK,JF"
	        }
	    });
	
	    $('.tools .toolbar').html('<li style="display:block;" id="ledgerBtn"><span><img src="/static/images/t01.png"></span>查看明细</li>'
	    				+'<li style="display:block;" id="transferAccountsBtn"><span><img src="/static/images/t01.png"></span>转账</li>');
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
	    
	    //转账
		$("#transferAccountsBtn").on("click",function(){
	        var selRecords = $('#tableList').bootstrapTable('getSelections');
	        if (selRecords.length <= 0) {
	            toastr.info("请选择一个账户");
	            return;
	        }
	        
	        if(!fromUserId){
	        	toastr.info("未绑定C端账号，请前往我的详情绑定！");
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
			        field: 'amount1',
			        title: '转账金额',
	                amount: true
			    }],
	            buttons: [{
	                title: '确定',
	        		field: 'confirm',
	                handler: function() {
	                    if ($('#popForm').valid()) {
	                        var popFormData = $('#popForm').serializeObject();
	                		var data={};
	                		
	                		data.amount = popFormData.amount1;
	                		data.currency = selRecords[0].currency;
	                		data.toUserId = fromUserId;
	                		data.fromUserId = userId
	                		
			                reqApi({
			                    code: '802419',
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
    
    	
    	
    });

    
//  $('#goBackBtn').click(function() {
//      window.location.href = "customer.html"
//  });
});