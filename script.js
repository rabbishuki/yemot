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


        if (name && pass) {
            success();
            $.ajax({
                type: "GET",
                url: "https://www.call2all.co.il/ym/api/Login?username=" + name + "&password=" + pass,
                success: success,
                error: error
            });
        }

        function error(data, b, c) {
            /error/i.test(b) ? $('.login-form').prepend('<div class="error">שגיאת בגישה לשרת</div>') : '';
        };

        function success(data, b, c) {
            !/error/i.test(b) ? $('.login-form').prepend('<div class="success">התחברות בוצעה בהצלחה</div>') : '';
            if (data.token) {
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