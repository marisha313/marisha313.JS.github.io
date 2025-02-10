
document.addEventListener('mousemove', (event) => {
    let gun = document.querySelector('.gun');
    let fire = document.querySelector('#fireCanvas');
    let coord = gun.getBoundingClientRect(); // Возвращает координаты пушки 
    let coord2 = gun.getBoundingClientRect();
    let gunX = coord.left + coord.width / 2; // Центр элемента по X
    let gunY = coord.top + coord.height / 2; // Центр элемента по Y
    let angle = Math.atan2(event.clientY - gunY, event.clientX - gunX) + 1.5; // Получаем угол в радианах 
    // let fireX = coord2.left + coord2.width / 2; // Центр элемента по X
    // let fireY = coord2.top + coord2.height / 2; // Центр элемента по Y
    // let angle2 = Math.atan2(event.clientY - fireY, event.clientX - fireX) - 1.5; // Получаем угол в радианах 

    // Устанавливаем трансформацию с учетом точки поворота
    gun.style.transform = "rotate(" + angle + "rad)";
    // fire.style.transform = "rotate(" + angle + "rad)"; 
});


const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');
const particles = []; // Массив для хранения частиц огня
const numberOfParticles = 1000; // Количество частиц
let fire = false; // Установим переменную fire в false

// Создаем частицы огня
for (let i = 0; i < numberOfParticles; i++) {
    particles.push({
        x: canvas.width / 2, // Начальная позиция по X - центр
        y: canvas.height, // Начальная позиция по Y - снизу
        size: Math.random() * 10 + 5, // Случайный размер частицы
        speedY: Math.random() * -2 - 1, // Скорость по Y (вверх)
        speedX: Math.random() * 2 - 1, // Скорость по X (влево или вправо)
        color: `rgb(${Math.floor(Math.random() * 56) + 200}, ${Math.floor(Math.random() * 56) + 200}, 255)` // Случайный оттенок оранжевого/красного
    });
}

function drawFire() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем Canvas перед каждым кадром

    particles.forEach((particle, index) => {
        // Рисуем частицу
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();

        // Обновляем позицию частицы
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.size *= 0.98; // Уменьшаем размер частицы для эффекта затухания

        // Если частица слишком маленькая или вышла за пределы, пересоздаем её
        if (particle.size < 0.5 || particle.y < 0) {
            particles[index] = {
                x: canvas.width / 2,
                y: canvas.height,
                size: Math.random() * 10 + 5,
                speedY: Math.random() * -2 - 1,
                speedX: Math.random() * 2 - 1,
                color: `rgb(${Math.floor(Math.random() * 56) + 200}, ${Math.floor(Math.random() * 56) + 200}, 255)`
            };
        }
    });

    if (fire) {
        requestAnimationFrame(drawFire); // Запускаем следующий кадр анимации, только если fire равно true
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас, если огонь не активен
    }
}

// Запустим анимацию только при нажатии пробела
document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        if (!fire) { // Проверяем, активен ли огонь
            fire = true; // Устанавливаем флаг в true
            drawFire(); // Запускаем анимацию
        }
    }
});

// Останавливаем анимацию при отпускании пробела
document.addEventListener('keyup', (e) => {
    if (e.code === "Space") {
        fire = false; // Устанавливаем флаг в false, чтобы остановить анимацию
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас, когда огонь не активен
    }
});



//Не работает отсюда, пришлось встроить непосредственно на страницу

// function printText() {
//     const text = 'Rammstein'; // Определение текста
//     let current = 0; // Текущий индекс

//     // Получаем элемент для вывода текста
//     const outputElement = document.getElementById('Ramm');

//     // Функция для печати текста
//     setTimeout(function go() {
//         // Проверка на окончание текста
//         if (current < text.length) {
//             outputElement.innerHTML += text[current]; // Добавляем текущий символ
//             current++; // Увеличиваем текущий индекс

//         } else {
//             // Если текст закончился, очищаем элемент и начинаем снова
//             outputElement.innerHTML = ''; // Очищаем текст
//             current = 0; // Сбрасываем индекс
//     }

//         setTimeout(go, 600); // Запланируем следующий вызов через 100 мс
//     })


// }

// // Вызов функции печати текста
// printText();





// function printText(text) {
//     const text = 'Rammstein'
//     let current = 0;
//     document.getElementById('Ramm');

//     setTimeout(function go() {
//         document.write(text[current]);

//         if (current < text.length) {
//             setTimeout( go, 100);
//         }
//         current++;
//     }, 100);
// }
// printText(text);       


// МОДАЛЬНЫЕ ОКНА
//Два варианта для окон и ответов
const YesButton = document.getElementById('closeYes');
const NoButton = document.getElementById('closeNo');
const YesButton2 = document.getElementById('closeYes2');
const NoButton2 = document.getElementById('closeNo2');
const modal = document.getElementById('modal');
const modal2 = document.getElementById('modal2');
const overlay = document.getElementById('overlay');
const yes = document.getElementById('yes');

// Модальное окно - возраст
function openModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

// Показать сообщение
function showMessage() {
    yes.style.display = 'block';
    setTimeout(() => {
        yes.style.display = 'none';
    }, 3000); // Установка времени показа сообщения
}

// Кнопка Да - возраст
YesButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Скрыть первое модальное окно

    modal2.style.display = 'block'; // Показать второе модальное окно
});

// Кнопка Да - рок
YesButton2.addEventListener('click', () => {
    modal2.style.display = 'none'; // Скрыть второе модальное окно
    overlay.style.display = 'none'; // Скрыть оверлей
    showMessage(); // Показать сообщение
});

// Кнопка "Нет" в первом модальном окне
NoButton.addEventListener('click', () => {
    window.location.href = 'https://www.disney.com/'; // Перенаправление
});

// Кнопка Нет - возраст
NoButton2.addEventListener('click', () => {
    window.location.href = 'http://buzovaolga.ru/'; // Перенаправление
});

// // Закрыть окно кликнув куда угодно, но лучше сделать построже))
// overlay.addEventListener('click', () => {
//     modal.style.display = 'none';
//     modal2.style.display = 'none';
//     overlay.style.display = 'none';
// });

// Запускаем про возраст
openModal();




// Парсинг с GitHub

const openMe = document.getElementById('openMe');
const overlayMe = document.getElementById('overlayMe');
const press = document.getElementById('press');
const text = document.getElementById('text');
const avatar = document.getElementById('avatar');

openMe.addEventListener('click', () => {
    fetch('https://api.github.com/users/marisha313')
        .then(response => response.json())
        .then(githubUser => {
            avatar.src = githubUser.avatar_url;
            text.innerHTML = `${githubUser.name} - ${githubUser.bio}`;
            overlayMe.style.display = 'block'; // Показать оверлей
            press.style.display = 'block'; // Показать модальное окно
            console.log(githubUser);
        });
});

// Закрытие модального окна при клике на оверлей
overlayMe.addEventListener('click', () => {
    overlayMe.style.display = 'none'; // Скрыть оверлей
    press.style.display = 'none'; // Скрыть модальное окно
});


// Стилизация ссылок

let links = document.querySelectorAll('a');

for (let link of links) {
    let href = link.getAttribute('href')

    if (!href) continue;

    if (!href.includes('://')) continue;
    link.style.textDecoration = 'none';
    link.style.color = 'red';

}



// Счётчик дней

function getDaysToDate(targetDate) {
    let now = new Date();
    let target = new Date(targetDate); // Дата концерта

    // Разница в миллисекундах
    let diff = target - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24)); // Преобразование в дни
}


let targetDate = '2025-10-29'; //Ближайший концерт Тилля
let daysLeft = getDaysToDate(targetDate); // Вычисляем количество дней
document.getElementById('time').innerHTML = `${daysLeft}`; // Вывод результата в крутом формате






// // Скролл

// let point = document.querySelector('.pointer')
// let positionScr = 0;
// //   window.scrollTo(0, 0);

// window.addEventListener('scroll', () => {
//     positionScr = window.pageYOffset;

//     if (positionScr > 600) {
//         ;
//         point.style.display = 'block';
//     }
//     else {
//         point.style.display = 'none'; // Скрываем элемент
//     }
// });

// point.addEventListener('click', () => {
//     window.scrollTo(0, 0);
// })



//Скрипты для формы - опять не работают, кидаю напрямую

// let myAuth = document.querySelector('.auth-trigger');
// let myForm = document.forms[0];

// let loginName = document.querySelector('.login-name');
// let auth = document.querySelector('.auth');

// myAuth.addEventListener('click', () => {
//     myForm.classList.toggle('show');
// });

// myForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     let myLogin = document.querySelector('#login').value;
//     let rem = document.querySelector('#remember').checked;

//     loginName.innerHTML = `Привет, ${myLogin}!`;
//     auth.style.display = 'none';

//     // Устанавливаем куки
//     if (rem) {
//         document.cookie = `userName=${myLogin}; path=/; max-age=${30 * 24 * 60 * 60}`; // пусть хранится 30 дней
//     } else {
//         document.cookie = 'userName=; max-age=0;'; // Удаляем куку
//     }
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const cookies = document.cookie.split('; ');
//     const userCookie = cookies.find(cookie => cookie.startsWith('userName='));
//     if (userCookie) {
//         const userName = userCookie.split('=')[1];
//         loginName.innerHTML = "Привет, " + userName + "!";
//         auth.style.display = 'none';
//     }
// });