$('.message a').click(function () {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});

$(document).ready(function () {
    $("#login").click(function (e) {
        e.preventDefault();
        var name = $('#l_user').val(),
            pass = $('#l_pass').val();

        // Check for blank fields.
        name ? $('#l_user').removeClass('error') : $('#l_user').addClass('error');
        pass ? $('#l_pass').removeClass('error') : $('#l_pass').addClass('error');
        !(name && pass) ? $('#response').html('חסר שם משתמש או סיסמא').addClass('error').removeClass('success') : '';

        if (name && pass) {
            if (name === 'yemot' && pass === '770') {
                update();
            } else {
                success();
                $.ajax({
                    type: "GET",
                    url: "https://www.call2all.co.il/ym/api/Login?username=" + name + "&password=" + pass,
                    success: success,
                    error: error
                });
            }    
        }

        function error(data, b, c) {
            /error/i.test(b) ? $('#response').html('שגיאת בגישה לשרת').addClass('error').removeClass('success') : '';
        };

        function success(data, b, c) {
            !/error/i.test(b) ? $('#response').html('התחברות בוצעה בהצלחה').addClass('success').removeClass('error') : '';
            if (data && data.token) {
                $.ajax({
                    type: "GET",
                    url: "https://www.call2all.co.il/ym/api/GetSession?token=" + data.token,
                    success: update,
                    error: error
                });
            }    
        };

        // For Now, This should be a redirect to the angular application.
        function update(data) {
            // Because Cors problem and no known password.
            if (!data) {
                data = {
                    username: 'שוקי גור',
                    units: '$770.0',
                    unitsExpireDate: '27/03/2017'
                }
            }

            $('.login-form').hide();
            $('#username').val(data.username);
            $('#units').val(data.units);
            $('#expire').val(data.unitsExpireDate);
            $('.data').show();
        };
    });
});