function tabs() {
    //! Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => { // Перебором получаеми все картинки, которые надо скрыть
            item.classList.add('hide'); // Добавляем класс скрытия
            item.classList.remove('show', 'fade'); // Убираем показывающий класс и анимацию
        });
        tabs.forEach(tab => { // Перебираем все табы
            tab.classList.remove('tabheader__item_active'); // Удаляем класс активной вкладки
        });
    }

    function showTabContent(i = 0) { // По умолчанию будет показываться первая картинка
        tabsContent[i].classList.add('show', 'fade'); // Добавляем показывающий класс и анимацию
        tabsContent[i].classList.remove('hide'); // Удаляем скрывающий класс

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();
    console.log('Hello');


    tabsParent.addEventListener('click', (event) => { // За счёт обработчика будем получать информацию по клику
        // и далее уже за счёт перебора получать аргумент i (порядковый номер), котторый будет вставляться в ф-ю показа
        const target = event.target; // чтобы постоянно не прописывать event.target можно занести в переменную

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => { // Перебираются все табы и передаются аргументы элементов и порядкого номера
                if (target == item) { // Если цель совпадает с элементом, то 
                    hideTabContent(); // Скрываются все табы и
                    showTabContent(i); // Показывается только тот, который совпол с пордковым номером
                    console.dir(event);
                }
            });
        }
    });
}

export default tabs;