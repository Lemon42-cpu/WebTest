const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const pagesEnd = document.getElementById("pagesE");
var sc = 0;
var min = 0;
var hor = 0;

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Работа не зачтена", 0),
	new Result("Работа зачтена", 7)
];

//Массив с вопросами
const questions = 
[
	new Question("Кем была создана стандартная разметка мишени для дартса?", 
	[
		new Answer(" Джимом Гарсайдом", 0),
		new Answer("Вильямом Анакиным", 0),
		new Answer("Брайаном Гамлином", 1),
		new Answer("Филом Тейлором", 0)
	]),

	new Question("На каком покрытии играют в кёрлинг?", 
	[
		new Answer("Асфальт", 0),
		new Answer("Паркет", 0),
		new Answer("Лёд", 1),
		new Answer("Трава", 0)
	]),

	new Question("Какие дистанции комплексным плаванием не проводятся на официальных соревнованиях:", 
	[
		new Answer("100 метров", 1),
		new Answer("200 метров", 0),
		new Answer("400 метров", 0),
        new Answer("800 метров", 0)
	]),
    new Question("Каково назначение гражданского направления прикладных боевых искусств?", 
	[
		new Answer("Самозащита", 1),
		new Answer("Нанесение наибольшего физического урона противнику", 0),
		new Answer("Достижение гармонии тела и духа", 0),
        new Answer("Задержание и нейтрализация противника", 0)
	]),
    new Question("Как называется вид спорта или спортивная дисциплина, заключающаяся в преодолении вплавь за наименьшее время различных дистанций?", 
	[
		new Answer("Рафтинг", 0),
		new Answer("Триатлон", 0),
		new Answer("Плавание", 1),
        new Answer("Дайвинг", 0)
	]),
    new Question("Какая самая длинная дистанция в программе мужского плавания в бассейне на Олимпийских Играх?", 
	[
		new Answer("5000 м.", 0),
		new Answer("1500 м.", 1),
		new Answer("10000 м.", 0),
        new Answer("800 м.", 0)
	]),
    new Question("Как называется рациональное использование приемов игры, метод организации соревновательной деятельности спортсменов для победы над соперником?", 
	[
		new Answer("Тактическая подготовка", 0),
		new Answer("Тактическое действие", 1),
		new Answer("Тактика игры", 0),
        new Answer("Тактическая комбинация", 0)
	]),
    new Question("Как называется педагогический процесс, направленный на развитие физических способностей и повышение функциональных возможностей, укрепление опорно-двигательного аппарата, обеспечивающих эффективное овладение навыками игры и способствующих высокой надежности игровых действий?", 
	[
		new Answer("Психологическая подготовка", 0),
		new Answer("Интегральная подготовка", 0),
		new Answer("Физическая подготовка", 1),
        new Answer("Теоретическая подготовка", 0)
	]),
    new Question("Какие состязательные структуры образованы отношениями руководства, организации, координации, содружества, подчинения, независимости и др. между игроками команды и их группами?", 
	[
		new Answer("Соподчинения", 1),
		new Answer("Ролевые", 0),
		new Answer("Функциональные", 0),
        new Answer("Информационные", 0)
	]),
    new Question("Какова максимальная длина дротика для дартса?", 
	[
		new Answer("30,5 см", 1),
		new Answer("15 см", 0),
		new Answer("25,5 см", 0),
        new Answer("17 см", 0)
	]),
    new Question("В каком городе находится Штаб-квартира международной федерации настольного тенниса ITTF?", 
	[
		new Answer("Лозанна", 1),
		new Answer("Нью-Йорк", 0),
		new Answer("Москва", 0),
        new Answer("Лондон", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);


Update();

    
    function sec() {
		sc++;	
		document.getElementById('time').innerHTML='Затрачено времени: ' + hor + ":" + min + ":" + sc;
        if (sc == 59){
            min++;
            sc = 0;
        }
        if (min == 59){
            hor++;
            min = 0;
        }
	}
var intervalID = setInterval(sec, 1000);
//Обновление теста
function Update()
{

	//Проверяем, есть ли ещё вопросы
                  
	if(quiz.current < quiz.questions.length) 
	{
  
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
        document.getElementById('time').id = 'stop';
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesEnd.innerHTML = "Количество правильных ответов: " + quiz.score + "/" + quiz.questions.length;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(index != correct)
		{
			btns[index].className = "button button_correct";
		}
		else
		{
			btns[index].className = "button button_correct";
		} 
	}


	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}