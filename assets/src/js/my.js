/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("heder-show-hide").style.top = "0";
  } else {
    document.getElementById("heder-show-hide").style.top = "-95px";
    document.getElementById("show-mobile-menu").classList.remove('active-nemu');
  }
  prevScrollpos = currentScrollPos;
}

// show hide mobile nav
function clickShowAndHideMenu() {
  document.getElementById('show-mobile-menu').classList.toggle('active-nemu');
}


// validation form

// Существует меньше способов выбрать узел DOM с устаревшими браузерами
var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');

// Ниже приведен трюк для достижения следующего узла Element Element в DOM
// Это опасно, потому что вы можете легко построить бесконечный цикл.
// В современных браузерах вам следует использовать элемент element.nextElementSibling
var error = email;
while ((error = error.nextSibling).nodeType != 1);

// As per the HTML5 Specification
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Многие устаревшие браузеры не поддерживают метод addEventListener.
// Вот простой способ справиться с этим; это далеко не единственный.
function addEvent(element, event, callback) {
  var previousEventCallBack = element["on"+event];
  element["on"+event] = function (e) {
    var output = callback(e);

    // Обратный вызов, который возвращает `false`, останавливает цепочку обратного вызова
     // и прерывает выполнение обратного вызова события.
    if (output === false) return false;

    if (typeof previousEventCallBack === 'function') {
      output = previousEventCallBack(e);
      if(output === false) return false;
    }
  }
};

// Теперь мы можем перестроить наше ограничение валидации
// Поскольку мы не полагаемся на псевдо-класс CSS, мы должны
// явно установить допустимый / недопустимый класс в поле электронной почты
addEvent(window, "load", function () {
// Здесь мы проверяем, пусто ли поле (помните, что поле не требуется)
   // Если это не так, мы проверяем, является ли его контент корректным адресом электронной почты.
  var test = email.value.length === 0 || emailRegExp.test(email.value);

  email.className = test ? "valid" : "invalid";
});

// Это определяет, что происходит, когда пользователь вводит в поле
addEvent(email, "input", function () {
  var test = email.value.length === 0 || emailRegExp.test(email.value);
  if (test) {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }
});

// Это определяет, что происходит, когда пользователь пытается отправить данные
addEvent(form, "submit", function () {
  var test = email.value.length === 0 || emailRegExp.test(email.value);

  if (!test) {
    email.className = "invalid";
    error.innerHTML = "I expect an e-mail, darling!";
    error.className = "error active";

    // Некоторые устаревшие браузеры не поддерживают метод event.preventDefault ()
    return false;
  } else {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  }
});