

$(document.body).on('click', '.popup-close', function (e) {
    e.preventDefault();
    $(this).closest('.popup').remove();
    $('body').removeClass('active');
});

$(document.body).on('click', '[data-popup]', function (e) {
    e.preventDefault();
    $('.popup').remove();
    $('body').addClass('active');

    var data = {}
    if ($(this).data('id')){
        data.id = $(this).data('id');
    }

    $('body').append('<div class="popup"><div class="popup-inner"><div class="popup-loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div></div>')
    $.post(API + '/popup/' + $(this).data('popup'), data, function (response) {
        $('.popup').remove();
        $('body').append(response.html);
    }, 'json');

});

$(document.body).on('submit', '[data-form]', function (e) {
    e.preventDefault();
    let data = $(this).serialize(),
        submitBtn = $('button[type="submit"]', this),
        endpoint = $(this).data('form');
    submitBtn.addClass('loading');
	var formData = new FormData($(this)[0]);
	$.ajax({
    url: API + '/' + endpoint,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,

    success: function (response) {
		submitBtn.removeClass('loading');
        if (response.error) {
            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        } else {
            if (response.success == true) {
                window.location.reload(true);
            } else if (response.callback) {
                window[response.callback](response);
            } else {
                Snackbar.show({
                    customClass: 'success',
                    text: response.success,
                    actionText: 'Tamam',
                    pos: 'top-center'
                });
            }
        }
    }
	});

});
/*
$(document.body).on('click', '[data-series]', function (e) {
    e.preventDefault();
    $('.popup').remove();
    $('body').addClass('active');
    $('body').append('<div class="popup"><div class="popup-inner"><div class="popup-loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div></div>')
    $.post(API + '/series-detail', {movie: $(this).data('series')}, function (response) {
        $('.popup').remove();
        $('body').append(response.html);
    }, 'json');
}); */

/*$(document.body).on('click', '[data-movie]', function (e) {
    e.preventDefault();
    $('.popup').remove();
    $('body').addClass('active');
    $('body').append('<div class="popup"><div class="popup-inner"><div class="popup-loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div></div>')
    $.post(API + '/movie-detail', {movie: $(this).data('movie')}, function (response) {
        $('.popup').remove();
        $('body').append(response.html);
    }, 'json');
});*/

$(document.body).on('change', '.season-selectbox select', function (e) {
    e.preventDefault();
    var value = $('option:selected', this).val();
    $('.all-episodes .episodes').hide().filter(':eq(' + (value - 1) + ')').fadeIn(300);
});

$(document.body).on('keyup', function (e) {
    if (e.key == 'Escape' || e.keyCode == 27) {
        $('.popup').remove();
        $('body').removeClass('active');
    }
});

$(document.body).on('click', '.profile-actions >a', function (e) {
    e.preventDefault();
    $('.profile-actions .dropdown').toggleClass('active');
});

$(document.body).on('click', '[data-like]', function (e) {
    e.preventDefault();
    let that = $(this);
    $.post(API + '/like-comment', {id: $(this).data('like')}, function (response) {
        if (response.success) {
            Snackbar.show({
                customClass: 'success',
                text: 'Yorumu beğendin!',
                actionText: 'Tamam',
                pos: 'top-center'
            });
            that.addClass('active');
            that.find('span').text(parseInt(that.find('span').text()) + 1);
        } else {
            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        }
    }, 'json');
});

$(document.body).on('click', '[data-like-video]', function (e) {
    e.preventDefault();
    let that = $(this);
    $.post(API + '/like-video-comment', {id: $(this).attr("data-like-video")}, function (response) {
        if (response.success) {
            Snackbar.show({
                customClass: 'success',
                text: 'Yorumu beğendin!',
                actionText: 'Tamam',
                pos: 'top-center'
            });
            that.addClass('active');
            that.find('span').text(parseInt(that.find('span').text()) + 1);
        } else {
            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        }
    }, 'json');
});

$(document.body).on('click', '[data-episode-like]', function (e) {
    e.preventDefault();
    let that = $(this);
    $.post(API + '/episode-like-comment', {id: $(this).data('episode-like')}, function (response) {
        if (response.success) {
            Snackbar.show({
                customClass: 'success',
                text: 'Yorumu beğendin!',
                actionText: 'Tamam',
                pos: 'top-center'
            });
            that.addClass('active');
            that.find('span').text(parseInt(that.find('span').text()) + 1);
        } else {
            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        }
    }, 'json');
});

$(document.body).on('click', '[data-reply-like]', function (e) {
    e.preventDefault();
    let that = $(this);
    $.post(API + '/reply-like-comment', {id: $(this).data('reply-like')}, function (response) {
        if (response.success) {
            Snackbar.show({
                customClass: 'success',
                text: 'Yorumu beğendin!',
                actionText: 'Tamam',
                pos: 'top-center'
            });
            that.addClass('active');
            that.find('span').text(parseInt(that.find('span').text()) + 1);
        } else {
            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        }
    }, 'json');
});

$(document.body).on('click', '[data-watchlist]', function (e) {
    e.preventDefault();
    let el = $(this);
    $.post(API + '/watchlist', {id: el.data('watchlist'), type: el.data('type')}, function (response) {
        if (response.added) {
            el.addClass('active');
            el.attr('title', 'Kaldır');

            $('.watch-later.active').removeClass('active').attr('title', 'Sonra İzle');
            el.closest('.watchlist-item').remove();

            Snackbar.show({
                customClass: 'success',
                text: 'İzledikleriniz arasına eklendi',
                actionText: 'Tamam',
                pos: 'top-center'
            });

        }
        if (response.removed) {
            el.removeClass('active');
            el.attr('title', 'İşaretle');
            if (typeof isWatched !== 'undefined'){
                isWatched = false;
            }
        }
        if (response.error) {

            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });

        }
    }, 'json');
});

$(document.body).on('click', '[data-wishlist]', function (e) {
    e.preventDefault();
    let el = $(this);
    $.post(API + '/wishlist', {id: el.data('wishlist'), type: el.data('type')}, function (response) {
        if (response.added) {
            el.addClass('active');
            el.attr('title', 'Kaldır');

            Snackbar.show({
                customClass: 'success',
                text: 'Sonra izlemen için kaydedildi, sonra izleyeceklerim sekmesinden görebilirsin.',
                actionText: 'Tamam',
                pos: 'top-center'
            });

        }
        if (response.removed) {
            el.removeClass('active');
            el.attr('title', 'Sonra İzle');
        }
        if (response.error) {

            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });

        }
    }, 'json');
});

$(document.body).on('click', '.spoiler-text', function (e) {
    e.preventDefault();
    $(this).toggleClass('show');
});
$(document.body).on('click', '.spoiler-alert', function (e) {
    e.preventDefault();
    $(this).next('.spoiler-text').toggleClass('show');
});

let menu = $('.header .menu').html();
let userMenu = $('.header .user-menu')[0].outerHTML;
$('<div class="mobile-menu">' + menu.replace(/data-target=".menu li"/, 'data-target=".mobile-menu ul li"') + userMenu + '</div>').appendTo($('body'));

$('.menu-btn').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('active');
    $('.mobile-menu').toggleClass('active');
});

$('html').on('click', function (event) {
    var target = $(event.target);
    if (target.is('.profile-actions') || target.parents('.profile-actions').length > 0)
        return;
    $('.profile-actions .dropdown')
        .removeClass('active');
});

function timeToSeconds(time) {
    time = time.split(':');
    let hours = parseInt(time[0]) * 60 * 60;
    let minutes = parseInt(time[1]) * 60;
    let seconds = time[2].split('.');
    let second = parseInt(seconds[0]);
    let millisecond = parseInt(seconds[1]);
    time = parseInt(hours + minutes + second);
    time += '.' + millisecond;
    return time;
}

function formatSeconds(milliseconds) {

    milliseconds *= 1000;
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
}

function getTotalDuration(part) {
    let total = 0;
    for (let i = 0; i <= part - 1; i++) {
        total += parseFloat(timeToSeconds(durations[i]));
    }
    return total;
}

function seekToPlayer(currentTime) {
    let total = 0;
    let part = 0;
    let last = 0;
    for (let d in durations) {
        total += parseFloat(timeToSeconds(durations[d]));
        if (total > currentTime) {
            part = d;
            last = parseFloat(timeToSeconds(durations[d]));
            break;
        }
    }
    player.load(player.playlistItem([part]));
    player.play();
    console.log(total, currentTime, part)
    player.seek(parseFloat(last) - (parseFloat(total) - parseFloat(currentTime)));
}

/****
 AJAX REQUEST
 ***/
const container = $('#container');
const pre_content = $('#pre_content');
const meta = $('#meta');

window.onpopstate = function (event) {
    NProgress.start();
    $.get(document.location.pathname + document.location.search, function (response) {
        NProgress.done();
        if (response.title) {
            document.title = response.title;
        }
        $('[data-request]').removeClass('active');
        $('[href="' + (document.location.pathname + document.location.search) + '"]').parent().addClass('active');
        if (response.content) {
            container.removeClass('active').html('');
            setTimeout(function () {
                container.html(response.content).addClass('active');
            }, 100);
        }
        if (response.pre_content) {
            pre_content.removeClass('active').html('');
            setTimeout(function () {
                pre_content.html(response.pre_content).addClass('active');
            }, 100);
        } else {
            pre_content.html('');
        }
        if (response.scripts) {
            setTimeout(function () {
                $('#scripts').html(response.scripts);
            }, 100);
        }
        $('.dropdown').removeClass('active');
        ga('send', {
            hitType: 'event',
            eventCategory: 'Url',
            eventAction: 'pageload',
            eventLabel: document.location.pathname
        });
    }, 'json');
}

/*$(document.body).on('click', '[data-request]', function (e) {
    e.preventDefault();
    if (e.currentTarget.nodeName === 'A') {
        var url = $(this).attr('href');
    } else {
        var url = $('a', this).attr('href');
    }
    loadPage(url);
}); */

function loadPage(url) {
    if (url != location.pathname + location.search) {
        NProgress.start();
        $.get(url, function (response) {
            NProgress.done();
            $('[data-request]').removeClass('active');
            $('[href="' + url + '"]').parent().addClass('active');
            document.title = response.title;
            history.pushState(null, response.title, url);
            if (response.content) {
                container.removeClass('active').html('');
                setTimeout(function () {
                    container.html(response.content).addClass('active');
                }, 100);
            }
            if (response.pre_content) {
                pre_content.removeClass('active').html('');
                setTimeout(function () {
                    pre_content.html(response.pre_content).addClass('active');
                }, 100);
            } else {
                pre_content.html('');
            }
            if (response.scripts) {
                setTimeout(function () {
                    $('#scripts').html(response.scripts);
                }, 100);
            }
            $('.popup-close').click();
            $('.dropdown').removeClass('active');
            $('body, .mobile-menu').removeClass('active');
            $(window).scrollTop(0);
            ga('send', {
                hitType: 'event',
                eventCategory: 'Url',
                eventAction: 'pageload',
                eventLabel: location.pathname + location.search
            });
        }, 'json');
    }
}

function tab(){
    $('[tab]').each(function(){
        var tab = $('[tab-list] li', this),
            content = $('[tab-content]');

        tab.filter(':first').addClass('active');
        content.filter(':not(:first)').hide();
        tab.on('click', function(e){
            e.preventDefault();
            tab.removeClass('active').filter(this).addClass('active');
            content.hide().filter(':eq(' + $(this).index() + ')').fadeIn(300);
        });
    });
}

function likeEpisode(id){
    $.post(API + '/like-episode', {id}, function(response){
        if (response.error){
            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        } else {
            $('.episode-likes .like-bar span').animate({
                width: response.percent
            }, {
                duration: 250
            });
            let like = parseInt($('.like-count').text())
            $('.like-count').text(like + 1)
            Snackbar.show({
                customClass: 'success',
                text: response.success,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        }
    }, 'json');
}

function dislikeEpisode(id){
    $.post(API + '/dislike-episode', {id}, function(response){
        if (response.error){
            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        } else {
            $('.episode-likes .like-bar span').animate({
                width: response.percent
            }, {
                duration: 250
            });
            let dislike = parseInt($('.dislike-count').text())
            $('.dislike-count').text(dislike + 1)
            Snackbar.show({
                customClass: 'success',
                text: response.success,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        }
    }, 'json');
}

function followSeries(id, el) {
    $.post(API + '/follow-series', {id}, function(response) {
        if (response.error) {
            Snackbar.show({
                customClass: 'error',
                text: response.error,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        } else {
            if (response.added) {
                $(el).addClass('following')
                if ($(el).hasClass('with-text')) {
                    $(el).text('TAKİPTEN ÇIKART')
                }
            } else {
                $(el).removeClass('following')
                if ($(el).hasClass('with-text')) {
                    $(el).text('TAKİP ET')
                }
            }
            Snackbar.show({
                customClass: 'success',
                text: response.success,
                actionText: 'Tamam',
                pos: 'top-center'
            });
        }
    }, 'json');
}

$(document.body).on('click', '.popup', function(e){
    if (!$('.popup .popup-inner')[0].contains(e.target)){
        $(this).remove();
        $('body').removeClass('active');
    }
});







$("#video1").on("click", function(){



    let countUrl = activeItem;



    skipButton.style.display = 'none';
    if(video_urls.length >= countUrl+1){

        console.log('start item');

        if(countUrl+1 === video_urls.length){

            manageAds(video_urls[activeItem], video_seconds[activeItem], ad_urls[activeItem]);
            playVideo();


        } else{

            manageAds(video_urls[activeItem+1], video_seconds[activeItem+1], ad_urls[activeItem]);

        }



    }else{
        $('.play-btn, .image').css('display', 'flex');
        skipButton.style.display = 'none';
        video1.style.display = 'none';
        video1.muted = true;
        SoundToggle.style.display = 'none';
        playVideo();
    }


});


$(function(){

    

	

	$(".drop-li span").mouseout(function(){
		$(".drop").removeClass("open");
	})
	
		$(".drop").mouseover(function(){
		$(".drop").addClass("open");
	})
	
})