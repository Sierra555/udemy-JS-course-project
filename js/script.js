window.addEventListener('DOMContentLoaded', ()=> {
    // const tabs = document.querySelectorAll('.tabheader__item'),
    //     tabsContent = document.querySelectorAll(".tabcontent"),
    //     tabsParent = document.querySelector(".tabheader__items");
    // function hideTabsContent() {
    //     tabsContent.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show', 'fade');
    //     });
    //     tabs.forEach(item => {5
    //         item.classList.remove("tabheader__item_active");
    //     });
    // }
    // function showTabsContent(i=0) {
    //     tabsContent[i].classList.remove('hide');
    //     tabsContent[i].classList.add('show', 'fade');

    //     tabs[i].classList.add("tabheader__item_active");
    // }
    // hideTabsContent();
    // showTabsContent();

    // tabsParent.addEventListener('click',(event) => {
    //     const target = event.target;
    //     if (target && target.classList.contains("tabheader__item")){
    //         tabs.forEach((item, i) => {
    //             if (target == item) {
    //              hideTabsContent();
    //             showTabsContent(i);
    //          } 
    //         });
    //     }
    // });
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");
    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabsContent(i=0) {
         tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click',(event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });


    const deadline = "2022-12-02";
    function getRemainingTime(endtime) {
        let days, minutes, hours, seconds;
        let total = Date.parse(endtime) - Date.parse(new Date());
        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else {
        days = Math.floor(total /( 1000 * 60 * 60 *24));
        hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((total /( 1000 * 60)) % 60);
         seconds = Math.floor((total / 1000) % 60);
        }
        return {
            total: total,
            days,
            hours,
            minutes,
            seconds
        };
    } 
    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    }
    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateTimer, 1000);
        updateTimer();
        function updateTimer() {
            const time = getRemainingTime(endtime);
            days.innerHTML = addZero(time.days);
            hours.innerHTML = addZero(time.hours);
            minutes.innerHTML = addZero(time.minutes);
            seconds.innerHTML = addZero(time.seconds);
            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setTimer(".timer", deadline);
    //modal 
    const modalTriggers = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector(".modal");
      
   
    function openModal() {
         modal.classList.add('show');
        modal.classList.remove('hide');
        //  modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }
    modalTriggers.forEach(btn => {
         btn.addEventListener('click', () => {
         openModal();
    });
        
    });

   function closeModal(){modal.classList.remove('show');
        modal.classList.add('hide');
        //  modal.classList.toggle('show');
         document.body.style.overflow = ''; }
   

      modal.addEventListener('click', (event) => {
          const target = event.target;
             if (target === modal|| target.getAttribute("data-close")=="") {
                 closeModal();
          }
      });
    document.addEventListener("keydown", (event) => {
        let code = event.code;
        if (code === "Escape" && modal.classList.contains('show')) {
             closeModal();
        }
    });

    const modalTimer = setTimeout(openModal, 15000);


    window.addEventListener("scroll",scrollModalByScroll );
    function scrollModalByScroll() {
         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
             openModal();
             window.removeEventListener("scroll",scrollModalByScroll );
        }
    }


 //Класи для карточок

    
    class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.slt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.exchange = 36;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.convertToUAH();
        
        }
        convertToUAH() {
            this.price = +(this.price * this.exchange);
        }
        render() {
            const elem = document.createElement("div");
            if (this.classes.length === 0) {
                this.elem = "menu__item";
                elem.classList.add("menu__Item");
        }else {this.classes.forEach(className => { elem.classList.add(className); });}
              
            elem.innerHTML = `<div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                     <div class="menu__item-descr">${this.descr} </div>
                 <div class="menu__item-divider"></div>
                 <div class="menu__item-price">
                     <div class="menu__item-cost">Цена:</div>
                     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                 </div>`;
            this.parent.append(elem);
        }
        }
        new MenuCard(
            "img/tabs/vegy.jpg" ,
            "vegy",
            'Меню "Фітнес"',
            'Меню "Фітнес" - це новий підхід до приготування страв: більше свіжих овочів та фруктів. Продукт активних та здорових людей. Це абсолютно новий продукт з оптимальною ціною та високою якістю!',
            6.5,
            ".menu .container"
        ).render();
    
        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Преміум”',
            'Меню “Пісне” - це ретельний підбір інгредієнтів: повна відсутність продуктів тваринного походження, молоко з мигдалю, вівса, кокосу або гречки, правильна кількість білків за рахунок тофу та імпортних стейків вегетаріанських',
            15.5,
            ".menu .container"
        ).render();
        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            'Меню "Пісне"',
            'Меню “Пісне” - це ретельний підбір інгредієнтів: повна відсутність продуктів тваринного походження, молоко з мигдалю, вівса, кокосу або гречки, правильна кількість білків за рахунок тофу та імпортних стейків вегетаріанських',
            12,
            ".menu .container"
    ).render();
<<<<<<< HEAD


    //Forms
    // const forms = document.querySelectorAll("form");
    // const message = {
    //     loading:"Завантаження",
    //     success: "Дякую! Невдовзі ми з вами зв'яжемося",
    //     failure: "Упс, щось пішло не так :("
    // };
    // forms.forEach(item => {
    //     postData(item);
    // });
    // function postData(form) {
    //     form.addEventListener("submit", (e) => {
    //         e.preventDefault();

    //         const statusMessage = document.createElement('div');
    //         statusMessage.textContent = message.loading;
    //         form.append(statusMessage);

    //         const request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');
    //         // request.setRequestHeader("Content-type", "multipart/form-data");
            
    //         const formData = new FormData(form);
    //         request.send(formData);
    //         request.addEventListener('load',()=> {
    //             if (request.status === 200) {
    //                 console.log(request.response);
    //                 statusMessage.textContent = message.success;
    //                 form.reset();
    //                 setTimeout(() => {
    //                     statusMessage.remove();
    //                 }, 5000);
    //             }
    //             else { statusMessage.textContent = message.failure;}
    //         });
    //     });
    // }
    //json
    const forms = document.querySelectorAll('form');
    const message = {
        loading: "img/form/spinner.svg",
        success: "Дякую, незабаром ми з вами зв'яжимося!&#128521",
        failure: "Щось пішло не так &#128551"

=======
>>>>>>> 7141477b614730c6de911897829345ca215691b6
    const forms = document.querySelectorAll('form');
    const message = {
        loading: "Завантаження",
        success: "Дякую, незабаром ми з вами зв'яжимося",
        failure: "Щось пішло не так..."
    };
    forms.forEach(item => {
        postData(item);
    });
    function postData(form){
<<<<<<< HEAD
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.classList.add('spinner');
            form.insertAdjacentElement("afterend", statusMessage);

            //     const request = new XMLHttpRequest();
            //     request.open('POST', 'server.php');
            // request.setRequestHeader("Content-type", "application/json");

            const formData = new FormData(form);
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(obj)
            }).then(data => data.text())
                .then(data => {
                    showThanksModal(message.success);
                    console.log(data);
                    statusMessage.remove();
                })
                .catch(() => { showThanksModal(message.failure); })
                .finally(() => { form.reset(); });
      
      
    });
    }
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `<div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
     </div>`;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }
    

});
=======
>>>>>>> 7141477b614730c6de911897829345ca215691b6
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const statusMessage = document.createElement('div');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
    request.setRequestHeader("Content-type", "application/json");

        const formData = new FormData(form);
        const obj = {};
        formData.forEach((value,key) => {
            obj.key = value;
        });
        const json = JSON.stringify(obj);
        request.send(json);
        request.addEventListener("load", () => {
            if (request.status === 200) {
                statusMessage.textContent = message.success;
                console.log(request.response);
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            }
            else { statusMessage.textContent = message.failure; }
        });

    });
}   
<<<<<<< HEAD
});
=======
});
>>>>>>> 7141477b614730c6de911897829345ca215691b6
