# Simple WebChat (3/10 update)

using **vue.js** & **socket.io**



1. 프로젝트 폴더를 하나 만들기
   + ex(socketVue)
2. terminal에 프로젝트 폴더를 열어준다.
3. $ **npm init**
   - 추가하고싶은 내용들을 추가한다.
   - package.json 파일이 추가된다.
4. $ **npm install —save express**
   - 서버를 구현해준다.
   <br>
5. 서버와의 통신을 위한 코드 작성

   #### src/server.js

   ~~~javascript
   var express = require('express');
   var app = express();
   var server = require('http').createServer(app);
    
   var port = 8000;
    
   app.get('/', function(req,res){
           res.end( 'Hello World' );
   });
    
   server.listen(port, function(){
       console.log('Hello WebChat Server! I am Seohyun! Hello THERE!!!');
   });
   ~~~

   ​
   <br>
6. $ **npm install nodemon -g**

   * 서버를 수정하면 새로고침 버튼을 누르지 않아도 자동 새로고침 된다.

   * nodemon은 프로젝트 폴더의 파일들을 모니터링하고 있다가 파일이 수정될 경우, 자동으로 서버를 restart 해준다. 

   * npm 1.0 버전 이상일 경우, 커맨드라인에서 명령어를 사용할 것이기 때문에 -g 글로벌 설치를 해주자.

   <img width="843" alt="1" src="https://user-images.githubusercontent.com/35247295/37221137-3d554874-240c-11e8-8b71-b65605698d0b.png">
   <br>
7. **localhost:8000** 에 접속해보자.

   + hello world 라고 적힌 것을 볼 수 있다.
   <img width="228" alt="2" src="https://user-images.githubusercontent.com/35247295/37221208-79ddffa2-240c-11e8-825d-1d6228da5914.png">
   <br>
8. **fs** 라이브러리를 사용해서 파일을 직접 읽어와보자.

   #### src/server.js

   ~~~javascript
   var fs = require('fs');

   app.get('/', function(req,res){
     fs.readFile('./Web/index.html',function(error, data){
       res.end(data);
     });
   });

   ~~~
   ​
   #### Web/index.html

   ~~~html
   <!DOCTYPE html>
   <html>
   <head>
       <meta charset="utf-8"/>
   </head>
   <body>
       Hello WebChat in HTML
   </body>
   </html>
   ~~~
   ​
   * 실행해보면 다음과 같은 결과가 나오게된다.
   <img width="226" alt="3" src="https://user-images.githubusercontent.com/35247295/37221222-89a5daa4-240c-11e8-8244-dce5ba3560dd.png">

9. $ **npm install —save socket.io**

   - **socket.io** 는 java나 php에서 어렵게 동작하던 socket기술을 매우 쉽고 빠르게 채팅앱을 구현할 수 있도록 만들어진 javascript library이다.
   - [socket.io document](https://socket.io/)
     
   <br>
10. 설치한 socket.io 라이브러리를 직접 사용해보자
      #### src/server.js
      ~~~javascript
      var express = require('express');
      var app = express();
      var server = require('http').createServer(app);
      var fs = require('fs');
      var io = require('socket.io')(server);	//추가
      var port = 8000;

      //추가
      app.use('/lib', express.static(__dirname + "/lib"));	

      app.get('/', function(req,res){
        fs.readFile('./Web/index.html',function(error, data){
          res.end(data);
        });
      });

      //추가
      io.on('connection',function(socket){
          console.log('a user connected');
      });
      ~~~
      ​
      - 실제로 라이브러리를 사용하기 위해 'lib'폴더 안에 있는 파일을 사용하겠다는 코드를 작성해준다.

        + 만약 경로문제로 인해 실행이 안될 경우, **node_modules**폴더 > **socket.io-client**폴더 > **socket.io.js** 파일을 찾아서 복사 후 src/lib/에 붙어넣어준다.

      - **on.'connection'** 은 콜백함수인데, socket을 반환한다. 

        이를 확인하기위해 console.log를 찍어 실행되는지 확인해본다.
    <br>
    
11. [클라이언트] user connection 확인

    #### Web/index.html

    ~~~html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <!-- 추가 -->
        <script src="lib/socket.io.js"></script>
        <script>
            var socket= io();
        </script>
        <!-- 추가 -->
    </head>
    <body>
        Hello WebChat in HTML
    </body>
    </html>

    ~~~
    ​ 
    $ **nodemon src/server.js** 

    1. 콘솔창에 **"Hello WebChat Sever! … "** 가 뜨고
    2. **localhost:8000**에 접속한 후
    3. 콘솔창에 **"a user connected"** 라는 문구가 찍히면 성공!

    <img width="598" alt="4" src="https://user-images.githubusercontent.com/35247295/37221233-96dea0a2-240c-11e8-901f-3dff6e60767e.png">

   <br>
12. [클라이언트] user disconnection 확인

    #### src/server.js

    ~~~javascript
    io.on('connection',function(socket){
        console.log('a user connected');
        
        socket.on('disconnect', function(msg){
          console.log("a user disconnected");
        });

    });
    ~~~
    ​
    1. **localhost:8000** 접속을 끊을 경우
    2. 콘솔창에 **"a user disconnnected"** 라는 문구가 보이면 성공!

    <img width="598" alt="5" src="https://user-images.githubusercontent.com/35247295/37221257-a560b78c-240c-11e8-8557-e3a2907b04ee.png">
   <br>  
13. Vue를 사용해보자

    $ **npm install vue**

    + 10번과 같이 node_modules/vue/dist/ 에서 **vue.min.js**를 복사한 후 src/lib에 넣어준다.
    + 그 후, 다음과 같은 코드를 head태그 안에 넣어주자
    #### Web/index.html
    ~~~html
    <script src="lib/vue.min.js"></script>
    <script src="http://code.jquery.com/jquery-3.1.0.min.js"></script>
    ~~~
    ​
   <br>
14. 보낸 메세지를 받아오기

    [클라이언트]

    #### Web/index.html

    ~~~vue
    <body>
        <div id="app">
          {{ chatList }}
          <ul id="chatlist">
          </ul>
          <input type="text" id="inputChat" @keyup.13="ChatSend"/>
          <button @click.1="ChatSend" class="w3-button w3-indigo">Send</button>
        </div>
    </body>
    <script>
        var app = new Vue({
          el : "#app",
          data: {
          },

          computed: {
            chatList : function(){
              socket.on('client',function(msg){
                  $('#chatlist').append($('<li>').text(msg));
              });
             }
          },

          methods : {
            ChatSend : function(){
              // if there is no input
              if($("#inputChat").val() == ""){
                  return false
              }
              else{
                socket.emit("client", $("#inputChat").val());
                $("#inputChat").val("");
                return false;
              }
            }
          }
        });
      </script>
    ~~~
    ​
    + **@keyup.13** : input 창에 엔터를 치면 **ChatSend** 메소드 동작

    + **@click.1** : 'Send'버튼을 클릭 시 **ChatSend** 메소드 동작

    + **ChatSend** 메소드

      - input이 없을 경우, 동작하지 않는다.
      - input이 있다면, server로 입력값을 보낸다.

    + **Computed** 

      + 클라이언트가 보낸 메세지를 받아서 chatlist에 계속 추가해준다.

      ​

    [서버]

    #### src/server.js

    ```js
    io.on('connection',function(socket){
        console.log('a user connected');
    	
        //추가
        socket.on('client', function(msg){
          io.emit('client', msg);
        });

        socket.on('disconnect', function(msg){
          console.log("a user disconnected");
        });
    });
    ```
    ​
    + 메세지를 보낸 사람을 포함해서 모두에게 메세지를 보낼 때 사용된다. 


   <br>
15. 자유롭게 **CSS**를 작성해주면 완료!
   <br>
16. example

      ![6](https://user-images.githubusercontent.com/35247295/37221258-a711ff50-240c-11e8-9433-d097ddbf393e.gif)

