function getTimeRemaining(endtime)
{
    var t       = endtime - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours   = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days    = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
        'total'  : t,
        'days'   : days,
        'hours'  : hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime)
{
    var clock       = document.getElementById(id);
    var daysSpan    = clock.querySelector('.days');
    var hoursSpan   = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock()
    {
        var t = getTimeRemaining(endtime);
        if (t.total <= 0) {
            clearInterval(timeInterval);
            minutesSpan.innerHTML = '00';
            secondsSpan.innerHTML = '00';

            $('#timer').addClass('hidden');
            $('#timeExpiredMessage').removeClass('hidden');

            return;
        }

        if (daysSpan) {
            daysSpan.innerHTML = t.days;
        }
        if (hoursSpan) {
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        }
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    }

    updateClock();
    var timeInterval = setInterval(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', function()
{
    var expiredDateString = $('[name="expireDate"]').val();
    var expireDate        = expiredDateString.split(' ')[0];
    var year              = expireDate.split('-')[0];
    var month             = expireDate.split('-')[1];
    var day               = expireDate.split('-')[2];
    var expireTime        = expiredDateString.split(' ')[1];
    var hour              = expireTime.split(':')[0];
    var minute            = expireTime.split(':')[1];
    var second            = expireTime.split(':')[2];
    var deadline          = new Date(year, month - 1, day, hour, minute, second);

    var timerDiv = document.getElementById('timer');
    timerDiv.removeAttribute('class');

    initializeClock('timer', deadline);
});
