var sum1=0;
var figure=0;
var indicator_point =  [];
var x_massive = [];
var y_massive = [];

x_massive [0]=[0,1.1,1.1,1.1,1.1,1.1,1.1,-100,1.1,1.1,1.1,1.1,1.1,1.1];
x_massive [1]=[0,-100,-100,2.6,-100,2.6,-100,-100,2.6,-100,2.6,-100,-100,2.6];
x_massive [2]=[0,1.2,1.2,1.2,-100,1.2,1.2,1.2,1.2,1.2,-100,1.2,1.2,1.2];
x_massive [3]=[0,1.2,1.2,1.2,-100,1.2,1.2,1.2,1.2,-100,1.2,1.2,1.2,1.2];
x_massive [4]=[0,1.5,-100,1.5,1.5,1.5,1.5,1.5,1.5,-100,1.5,-100,-100,1.5];
x_massive [5]=[0,1.2,1.2,1.2,1.2,-100,1.2,1.2,1.2,-100,1.2,1.2,1.2,1.2];
x_massive [6]=[0,1.1,1.1,1.1,1.1,-100,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1];
x_massive [7]=[0,1.9,1.9,1.9,-100,1.9,-100,-100,1.9,-100,1.9,-100,-100,1.9];
x_massive [8]=[0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0];
x_massive [9]=[0,1.1,1.1,1.1,1.1,1.1,1.1,1.1,1.1,-100,1.1,1.1,1.1,1.1];

function paint(id) 
{
    sum1=0; //первоначально сумма равна 0
        for(var k = 0; k < 10; k++){y_massive[k]=0;}//заполняем второй массив нулями

	        if(document.getElementById('id'+id).style.backgroundColor) 
            {
		    document.getElementById('id'+id).style.backgroundColor = "";
		    indicator_point[id]=0;
		    }
            else 
            {
         	document.getElementById('id'+id).style.backgroundColor = "black";
		    indicator_point[id]=1;//здесь отмеченный сегмент получает вес "1"
		    }
        for(var i=0; i < indicator_point.length; i++){
            if(indicator_point[i]!=1){
                indicator_point[i]=0;
            }
        }
        
       
        //зачем тут вообще нужно это суммирование???? Оно нигде не используется, разве что для задания размера массива indicator_point???
        
        for(var i = 0; i < 13; i++){ 
            sum1 += indicator_point[i+1]; 
        }
        
        for(var k = 0; k < 10; k++)
        {
            for(var i = 0; i < 13; i++)
            {   
                y_massive[k] += indicator_point[i+1]*x_massive[k][i+1];
            }
        }


        max_sum = Math.max.apply(null, y_massive);

        for(var k = 0; k < 10; k++)
        {
            
            if (y_massive[k]==max_sum) 
            {
                figure=k;
            }
        }
        
        

        if (max_sum==0) 
        {
            figure="";
        }
        


        document.getElementById("resume").innerHTML=figure;
        FindChance(y_massive,figure);

        
}
function FindChance(y_massive){
    var figure=0;
    for(var i=1; i < 11; i++){

    //находим max сумму
    var max_sum = Math.max.apply(null, y_massive);
    var softmax=0;
    var maxSoft = 0;


    for(var k = 0; k < 10; k++)
    {
        //суммируем все суммы массива y_massive
        softmax+= Math.pow(Math.E,y_massive[k]);
        if (y_massive[k]==max_sum) 
        {
            //если рассматриваемый в данный момент элемент - максимальный - задаем переменной figure значение текущей цифры 
            figure=k;
            maxSoft=Math.pow(Math.E,y_massive[k]);//находим экспоненту в степени максимальной суммы
        }
    }

    softmax=(maxSoft/softmax) * 100;//вычисляем шанс того, что именно эта цифра - загадана
   
            
            if (max_sum==0) 
            {
                figure="";
            }
            document.getElementById("Chance"+i).innerHTML=figure + " = " + softmax;//выводим текущую цифру и шанс её угадывания
    y_massive[figure]=-1000;
    
    }
    
}