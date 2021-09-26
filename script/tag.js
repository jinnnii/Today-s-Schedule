/*Dropdown Menu*/
$('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});

/*End Dropdown Menu*/
$('.dropdown-menu li').click(function () {
    var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
        msg = '<span class="msg">Hidden input value: ';
    $('.msg').html(msg + input + '</span>');
});

/*------------------------Emoji-picker-------------------------*/

const emoji = document.querySelector('.emoji');
const emoji_button = document.querySelector('.emoji_mood p');
const emoji_picker = document.querySelector('emoji-picker');


$('.emoji_mood').click(() => {
    //$('.emoji').attr('tabindex', 0).focus();
    $('emoji-picker').toggleClass('active');
    $('emoji-picker').slideToggle(300);
});

//$('.emoji').focusout(() => {
//    $('emoji-picker').removeClass('active');
//    $('emoji-picker').slideUp(300);
//});

emoji_picker.addEventListener('emoji-click', (event) => {
    emoji_button.innerHTML = event.detail.emoji.unicode;

    $('emoji-picker').removeClass('active');
    $('emoji-picker').slideUp(300);
});
document.addEventListener('click', (event) => {
    if (emoji_picker.classList.contains('active')) {
        if (event.target.tagName !== 'EMOJI-PICKER'
            && event.target.className !== 'tossing'
            && event.target.className !== 'emoji_mood') {
            $('emoji-picker').removeClass('active');
            $('emoji-picker').slideUp(300);
        }
    }

});
