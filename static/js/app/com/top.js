$('title', window.parent.document).html(OSS.systemName);
$(function() {
	var timestamp = new Date().getTime()
	
    if (!sessionStorage.getItem('token')) {
        location.href = 'signin.html?timestamp=' + timestamp;
        return;
    }

    // 获取用户
    reqApi({
        code: '805121',
        cache: true,
        sync: true,
        json: {
            'userId': sessionStorage.getItem('userId')
        }
    }).then(function(data) {
        window.ossKind = data ? data.kind : '';
        $('#topUserName').html(data.loginName);
        $('#userName').html(data.loginName);
        sessionStorage.setItem('userName', data.loginName);
    });

    $("#logout").click(function() {
        ajaxGet(OSS.mainUrl + '/logOut', {
            token: window.sessionStorage.getItem('token')
        }).then(function(res) {
            if (res.errorCode == '0') {
                window.sessionStorage.setItem('token', '');
                window.sessionStorage.setItem('userId', '');
                window.sessionStorage.setItem('userName', '');
                window.sessionStorage.setItem('roleCode', '');
                window.sessionStorage.setItem('qiniuUrl', '');
                location.href = 'signin.html?timestamp=' + timestamp;
            }
        });
    });

    $('#change-pwd').on('click', function() {
        parent.frames["rightFrame"].window.location.href = 'system/user_pwd_change.html';
    });
});
