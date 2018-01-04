$(function() {

    var code = getQueryString('code');
    var orderData = !!getQueryString('orderData');
    var rorderList = !!getQueryString('rorderList');
    var toUser = getQueryString('toUser');
    var amountType = getQueryString('amount');
    amountType = amountType=='0'?true:false
    
    var addressFields =[]
    var orderDataFields =[]
    var rorderListFields =[]
    
    //有选择商品
    if(orderData){
    	orderDataFields = [{
	    	title: "商品信息",
	        type: "title"
	    }, {
	        title: "商品信息",
	        field: "productOrderList",
	        type: "o2m",
	        readonly: true,
	        _keys: ['orderData','productOrderList'],
	        columns: [{
	            title: "订单编号",
	            field: "orderCode"
	        }, {
	            title: "商品名称",
	            field: "name",
	            formatter: function(v, data) {
	                return data.product.name;
	            }
	        }, {
	            title: "产品规格",
	            field: "productSpecsName"
	        }, {
	            title: "商品价格",
	            field: "price1",
	            formatter: function(v, data) {
	                return "￥"+moneyFormat(v)
	            }
	        }, {
	            title: "数量",
	            field: "quantity"
	        }]
        }]
    }
    
    //有选择租赁
    if(rorderList){
    	rorderListFields = [{
	    	title: "租赁信息",
	        type: "title"
	    }, {
	        title: "租赁信息",
	        field: "rorderList",
	        type: "o2m",
	        readonly: true,
	        columns: [{
	            title: "订单编号",
	            field: "code"
	        }, {
	            title: "租赁名称",
	            field: "name",
	            formatter: function(v, data) {
	                return data.rproduct.name;
	            }
	        }, {
	            title: "租赁日期",
	            field: "bookDatetime",
	            formatter: dateFormatData,
	        }, {
	            title: "租赁天数",
	            field: "rentDay"
	        }, {
	            title: "产品数量",
	            field: "quantity"
	        }, {
	            title: "商品价格",
	            field: "price1",
	            formatter: function(v, data) {
                    return "￥"+moneyFormat(v)
	            }
	        }, {
	            title: "押金",
	            field: "realDeposit",
	            formatter: function(v, data) {
                    return "￥"+moneyFormat(v)
	            }
	        }, {
	            title: "数量",
	            field: "quantity"
	        }]
	    }];
    }
    
    //有选择商品时地址取商品订单，只有租赁时取租赁
    if(orderData){
    	if(toUser==OSS.SYS_USER){
    		addressFields = [{
		        title: "收货地址",
		        type: "title"
		    }, {
		        field: 'receiver',
		        title: '收件人',
		        readonly: true,
	            formatter: function(v, data) {
	                return data.orderData.receiver
	            }
		    }, {
		        field: 'reMobile',
		        title: '联系方式',
		        readonly: true,
	            formatter: function(v, data) {
	                return data.orderData.reMobile
	            }
		    }, {
		        field: 'reAddress',
		        title: '收货地址',
		        readonly: true,
	            formatter: function(v, data) {
	                return data.orderData.reAddress
	            }
		    }]
    	}else{
    		addressFields = [{
		        title: "自提地址",
		        type: "title"
		    }, {
		        field: 'reAddress',
		        title: '自提地址',
		        readonly: true,
	            formatter: function(v, data) {
	                return data.orderData.takeAddress
	            }
		    }]
    	}
    }else if(rorderList){
    	
    	if(toUser==OSS.SYS_USER){
	    	addressFields = [{
		        title: "收货地址",
		        type: "title"
		    }, {
		        field: 'receiver',
		        title: '收件人',
		        readonly: true,
	            formatter: function(v, data) {
	                return data.rorderList[0].receiver
	            }
		    }, {
		        field: 'reMobile',
		        title: '联系方式',
		        readonly: true,
	            formatter: function(v, data) {
	                return data.rorderList[0].reMobile
	            }
		    }, {
		        field: 'reAddress',
		        title: '收货地址',
		        readonly: true,
	            formatter: function(v, data) {
	                return data.rorderList[0].reAddress
	            }
		    }]
	    }else{
    		addressFields = [{
		        title: "自提地址",
		        type: "title"
		    }, {
		        field: 'reAddress',
		        title: '自提地址',
		        readonly: true,
	            formatter: function(v, data) {
	                return data.rorderList[0].takeAddress
	            }
		    }]
    	}
    }
    
    
    var fields = [{
        title: "订单信息",
        type: "title"
    }, {
        field: 'code1',
        title: '订单编号',
        formatter: function(v, data) {
            return data.code;
        },
        readonly: true,
    }, {
        title: '下单人',
        field: 'mobile',
        readonly: true,
        formatter: function(v, data) {
            return data.user.nickname+"("+data.user.mobile+")";
        }
    }, {
        title: "下单说明",
        field: "applyNote",
        readonly: true
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'totalAmount1',
        title: '总额',
        formatter: function(v, data) {
            return v!=''&&v?"￥"+moneyFormat(v):'￥0'
        },
        readonly: true
    }, {
        field: 'pAmount',
        title: '商品金额',
        formatter: function(v, data) {
            return v!=''&&v?"￥"+moneyFormat(v):'￥0'
        },
        readonly: true
    }, {
        field: 'rpAmount',
        title: '租赁商品金额',
        formatter: function(v, data) {
            return v!=''&&v?"￥"+moneyFormat(v)+"(含押金:￥"+moneyFormat(data.depRpAmount)+")":'￥0'
        },
        readonly: true
    }, {
        field: 'payAmount1',
        title: '实际支付总额',
        formatter: function(v, data) {
            return v!=''&&v?"￥"+moneyFormat(v):'￥0'
        },
        readonly: true
    }, {
        field: 'payType',
        title: '买单方式',
        key: 'pay_type',
        formatter: Dict.getNameForList("pay_type"),
        type: 'select',
    }, {
        field: 'payDatetime',
        title: '支付时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: "运输方式",
        field: "orderToUser",
        formatter: function(v, data) {
        	if(toUser == OSS.SYS_USER){
        		return '邮寄'
        	}else{
        		return '自提'
        	}
        }
    }, {
        field: 'remark',
        title: '备注',
        readonly: true
    },{
    	title: "活动信息",
        type: "title"
    },{
        field: 'actName',
        title: '名称',
        formatter: function(v, data) {
            return data.activity.name;
        },
        readonly: true,
    }, {
        field: "leaderMobile",
        title: "领队",
        formatter: function(v, data) {
            return data.leadUser.outName+"("+data.leadUser.mobile+")";
        }
    },{
        field: 'actAmount',
        title: '费用',
        formatter: function(v, data) {
            return "￥"+moneyFormat(data.activity.amount);
        },
        readonly: true,
    }, {
        field: 'actDate',
        title: '日期',
        formatter: function(v, data) {
            return dateFormat(data.activity.startDatetime,"yyyy-MM-dd")+"至"+dateFormat(data.activity.endDatetime,"yyyy-MM-dd");
        },
        readonly: true,
    }, {
        field: 'actEnrollEndDatetime',
        title: '报名截止日期',
        formatter: function(v, data) {
            return dateFormat(data.activity.enrollEndDatetime,"yyyy-MM-dd");
        },
        readonly: true,
    }, {
        field: 'actPlaceDest',
        title: '目的地',
        formatter: function(v, data) {
            return data.activity.placeDest;
        },
        readonly: true,
    }, {
        field: 'actPlaceAsse',
        title: '集合地',
        formatter: function(v, data) {
            return data.activity.placeAsse;
        },
        readonly: true,
    },{
        title: "下单人信息",
        type: "title",
        hidden: amountType,
    },{
        title: '户外昵称',
        field: 'outName',
        readonly: true,
        hidden: amountType,
        formatter: function(v, data) {
            return data.user.outName;
        }
    },{
        title: '联系电话',
        field: 'usermobile',
        readonly: true,
        hidden: amountType,
        formatter: function(v, data) {
            return data.user.mobile;
        }
    },{
        title: '真实姓名',
        field: 'realName',
        readonly: true,
        hidden: amountType,
        formatter: function(v, data) {
            return data.user.realName;
        }
    },{
        title: '身份证号',
        field: 'idNo',
        readonly: true,
        hidden: amountType,
        formatter: function(v, data) {
            return data.user.idNo;
        }
    }];
	
	fields = fields.concat(orderDataFields)
	fields = fields.concat(rorderListFields)
	fields = fields.concat(addressFields)
	
    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808736',
        view: true
    });

});