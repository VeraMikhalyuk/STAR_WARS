/**
 * Created by Verochka on 15.01.2015.
 */
  // Создать таймер времени в игре
   <script type="text/javascript">
    function startTimer() {
        var my_timer = document.getElementById("my_timer");
        var time = my_timer.innerHTML;
        var arr = time.split(":");
        var h = arr[0];
        var m = arr[1];
        var s = arr[2];
        if(s == 59)
        {
        s = "00";
        if(m == 59)
        {
        m = "0";
        if(h == 23)
        {
        h = "00";
        }else{
        h++;
        if (h < 10) h = "0" + h;
        }
        }else{
        m++;
        if (m < 10) m = "0" + m;
        }
        }else{
        s++;
        if (s < 10) s = "0" + s;
        }
        document.getElementById("my_timer").innerHTML = h+":"+m+":"+s;
        setTimeout(startTimer, 1000);
        }
    window.onload = function(){
        startTimer();
        }
    </script>

   //Создание главного меню
    <table cellspacing="0" cellpadding="0" class="board_containter_table">
    <tr>
        <td>

            <H1><font color="white">Меню </font> </H1>
        </td>
    </tr>
    <tr>
    <td>
        <a href="#win1" class="button6 play" class="button button-green">Играть</a>
    </td>
    </tr>
<tr>
    <td>
        <a href="nastroyki.html" class="button6 setting">Настройки</a>
    </td>
</tr>
<tr>
<td>
    <a href="контакты.html" class="button6 contact">Разработчики</a><br>
</td>
</tr>
<tr>
<td>
    <a href="rules.html" class="button6 rules">Правила игры</a><br>
</td>
</tr><!---->
</table>

//Добавление музыки в меню
    <audio autoplay="autoplay" >

        <source src="mu/SWмарш.mp3" type="audio/mpeg">
        Your browser does not support the audio tag.
        </audio>
