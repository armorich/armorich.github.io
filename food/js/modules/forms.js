import { closeModal, openModal } from "./modal"; 

function forms(modalTimerId) {
     //? Forms (AJAX запросы с использованием локального сервера MAMP) 

    // Переменная которая по тегу <form> получает элементы
    const forms = document.querySelectorAll('form');

    // Объект в котором находятся статусы запросов, пригодиться для оповещения пользователя о статусе
    const message = {
        loading: 'img/form/005 spinner.svg',
        success: 'Спсибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { // Перебор всех тегов <form>
        bindPostData(item); // Исппользование ф-ии для одной из пребранных форм
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    // 
    function bindPostData(form) {
        form.addEventListener('submit', (e) => { // Событие которое инициализирует отправку формы, работает только на <form> или <input type="submit">
            e.preventDefault(); //Сбро стандартного поведения браузера

            // Создание элемента на странице, в котором будет написан статус отправки данных на сервер
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; // Присваивание уведомлению класса .status
            statusMessage.style.cssText = `
                 display: block; 
                 margin: 0 auto;
             `; // Сразу после отправки присвоение статуса загрузки
            // form.append(statusMessage); // Добавление в конец полученной формы статуса
            form.insertAdjacentElement('afterend', statusMessage);


            // const request = new XMLHttpRequest(); // Моздание HTTP объекта, которые далее должен передать запрос на сервер
            // request.open('POST', 'server.php'); // Метод делающий пост запрос серверу 


            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');


            // Для создания объекта и для дальнейшей конвертации его в JSON
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            // Конвертация объекта в JSON
            //! PHP не умеет работать с JSON поэтому надо будет конвертировать в подходящий формат, в дальнейшем
            // const json = JSON.stringify(object); // Превращение из обычного объекта в JSON
            // request.send(json);



            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data); // Отображает в консоли переданные данные
                    showThanksModal(message.success); // Вызывается модальное окно с сообщением о благодарности 
                    form.reset(); // так производится очистка формы
                    statusMessage.remove(); // Удаление сообщения о статусе
                }).catch(() => { // В случае ошибки будет выполняться блок catch
                    showThanksModal(message.failure); // Вызывается модальное окно с сообщением об ошибке
                }).finally(() => {
                    form.reset();
                });


            // const formData = new FormData(form); // Создание пар ключ значение, аргументы для этого получаются с формы

            // Из-за спцифичночти FormData данные надо будет первести в JSON

            // request.send(formData);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response); // Отображает в консоли переданные данные
            //         showThanksModal(message.success); // Вызывается модальное окно с сообщением о благодарности 
            //         statusMessage.remove(); // Удаление сообщения о статусе
            //         form.reset(); // так производится очистка формы
            //     } else {
            //         showThanksModal(message.failure); // Вызывается модальное окно с сообщением об ошибке
            //     }
            // });
        });
    }

    // Modal with thanks message

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // Поулчаем диалоговое окно, сам блок

        prevModalDialog.classList.add('hide'); // Сразу же скрываем его
        openModal('.modal', modalTimerId); // Ф-я отвеччающая за открытие окна, переключает классы

        const thanksModal = document.createElement('div'); // Создание окна благодарности
        thanksModal.classList.add('modal__dialog'); // Добавление класса, основы для окна 

        // Добавление на страницу модального окна, в котором описывается и состояние отправки формы
        thanksModal.innerHTML = `  
             <div class="modal__content">
                 <div class="modal__close" data-close>×</div>
                 <div class="modal__title">${message}</div>
             </div>
         `;


        document.querySelector('.modal').append(thanksModal); // Добавленние окна благодарности
        setTimeout(() => { // Создание асинхронного кода по удалению окна после отправки формы
            thanksModal.remove(); // Удаление окна благодарности
            prevModalDialog.classList.add('show'); // Две следующие операции создают и скрывают модальное оконо с формой
            prevModalDialog.classList.remove('hide');
            closeModal('.modal'); // Ф-я закрытия модального окна 
        }, 4000);
    }

    // Пример с GET запросом
    //     fetch('https://jsonplaceholder.typicode.com/posts', {
    //             method: "POST",
    //             body: JSON.stringify({ name: 'Alex' }),
    //             headers: {
    //                 'Content-type': 'application/json'
    //             }
    //         }) // От сюда мы получим промис
    //         .then(response => response.json())
    //         .then(json => console.log(json));


    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms; 