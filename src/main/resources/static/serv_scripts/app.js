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
	new Result("Работа зачтена", 4)
];

//Массив с вопросами
const questions = 
[
	new Question("Активная серверная страница получает от пользователя запрос по протоколу:", 
	[
		new Answer(" HTML", 0),
		new Answer("SQL", 0),
		new Answer("HTTP", 1),
		new Answer("SGML", 0)
	]),

	new Question("Технология клиент-сервер предполагает ", 
	[
		new Answer("перекачку данных с блокировкой доступа других пользователей", 0),
		new Answer(" обработку данных на компьютере пользователя", 0),
		new Answer("обращение к базе данных посредством SQL-запроса", 1),
		new Answer("самопроизвольную перекачку данных", 0)
	]),

	new Question("Сценарии можно создавать с помощью языка: ", 
	[
		new Answer("Assembler ", 0),
		new Answer("C++", 0),
		new Answer("SQL", 0),
		new Answer("SGML", 0),
        new Answer("HTML", 0),
        new Answer("JavaScript", 1)
	]),

	new Question("Сценарии в динамическом HTML заключаются в тэги", 
	[
		new Answer("script", 1),
		new Answer("title", 0),
		new Answer("table", 0)
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