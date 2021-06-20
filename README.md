# Web Programming Assignment : My Blog
------------
## 프로젝트 설명
웹 프로그래밍 수업 중 주어진 개인 블로그를 수행한 프로젝트 입니다. 제가 좋아하는 영화, 드라마를 게시한 블로그로 기획하여 블로그를 구현하였습니다. 블로그의 기능에는 Bgm, 시계, 검색, 프로필, 카테고리, 글쓰기, 친구추가, 게시글 좋아요, 댓글, 공유 기능으로 구현되어있습니다. 글쓰기 기능은 네이버 스마트 에디터 2.0 api를 이용하여 구현하였지만 db와 연결하지 못해 실제로 게시되지는 않습니다.
다양한 기능에 대해서는 하나씩 아래서 설명하겠습니다.   

### 1. 시계 기능
![clock](https://user-images.githubusercontent.com/47405655/122663445-7bc9e400-d1d5-11eb-84e7-7c641aa4b812.png)   
블로그 상단쪽에 위치하는 시계로, 1초마다 시간이 바뀝니다.    
   
   
* _현재 시간_   
```java script
//시계
var date;//전역변수로 사용

function nowclock() {
  date = new Date();//현재 시간 받아오기
  $('.clock').html(//해당 클래스에 코드 추가
    moment(date).format('YYYY/MM/DD HH:mm:ss')//해당 형식으로 날짜 표현
  );
}

$(document).ready(nowclock());
setInterval("nowclock()",1000);//1초마다 함수 호출
```     

### 2. 검색 기능
![search](https://user-images.githubusercontent.com/47405655/122663570-6c976600-d1d6-11eb-9ffb-52a4bf64c8d7.png)   
검색어를 입력하고 검색하면 해당 단어위치로 스크롤이 이동하고, 해당 검색어를 모두 찾아 배경색을 바꿔 찾아줍니다.   
   
* _검색 기능_   
```java script
//검색
function search() {//검색 버튼 클릭 or input 칸에서 엔터 클릭시
  $('.backgroundHighlight').removeClass('backgroundHighlight');//이전의 검색으로 highlight된 span의 클래스 제거
  var keyword = $('#keyword').val();//사용자가 입력한 keyword 가져오기
  if(!keyword) {//keword를 입력하지 않은경우
    alert("검색어를 입력하세요.");
  }else {//keword를 입력 한 경우
    var elements = $('p:contains('+keyword+')');//keword가 포함된 h5태그 가져오기
    if (!elements.text()) {//keword가 포함된 h5태그가 비었을 경우
      alert("검색 결과가 없습니다.")
    }else {//keword가 포함된 h5태그가 비어있지 않을 경우
      var topPos = elements.offset();//keword가 포함된 h5태그 위치 가져오기
      $('body,html').animate({scrollTop:topPos.top},300);//keword가 포함된 h5태그 위치로 스크롤 이동
      elements.each(function () {
          var regex = new RegExp(keyword,'gi');//keword가 포함된 h5태그 내에서 해당 keyword
                                               //'gi' g는 해당 keyword 모두 배열로 반환,
                                               // i는 대소문자 구분 않고 일치하면 반환
          $(this).html( $(this).text().replace(regex, "<span class='backgroundHighlight'>"+keyword+"</span>") );
          //해당 keyword가 있는 위치에 위의 문자열로 대체하여 배경색을 변경
      });
    }
  }
}
```     


### 3. 프로필 기능
![profile](https://user-images.githubusercontent.com/47405655/122662866-54711800-d1d1-11eb-93e6-a4b225cb87ee.png)
별명은 변경이 가능하며, 프로필 사진은 upload버튼이나 drag&drop을 이용하여 사진을 업로드 할 수 있습니다.   
   
* _drag&drop_   
```java script
//이미지 파일 drop 시 해당 url로 이동하지 않도록 설정
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };

//drag & drop 기능
function dragOver(e) {
    $(e.target).addClass('is-dragover');
}
function dragLeave(e) {
    $(e.target).removeClass('is-dragover');
}
function drop(e) {
    e.preventDefault();
    profileUpload(e);
}
```   

* _이미지 업로드 시_   
```java script
var fileName = document.getElementsByClassName('fileName');

document.addEventListener("DOMContentLoaded", function () {
    var input = document.querySelector( '#profile-input' );
    input.addEventListener( 'change', profileUpload);
});

function profileUpload(e){
    var profileImage = e.target.files || e.dataTransfer.files;
    if (profileImage.length > 1) {//파일 갯수가 한개보다 많으면
        alert('하나의 이미지만 업로드 해주세요.');//alert
        return;
    }
    if (profileImage[0].type.match(/image.*/)) {//파일이 이미지 형식일 경우
        $('#profile-input').css({//이미지 배경 속성으로 첨부
            "background-image": "url(" + window.URL.createObjectURL(profileImage[0]) + ")",
            "outline": "none",
            "background-size": "100% 100%"
        });
        $('.guide').css({//drag & drop 안내문구 삭제
            "visibility": "hidden"
        })
        $('.fileName').text(profileImage[0].name);//파일 이름 값 넣기
    }else{//이미지 형식이 아닐 경우
        alert('이미지가 아닙니다.');
        return;
    }

    $('#change-image').click(function(){//변경 등록 버튼 클릭시
      $('.profile-image').css({//사용자가 업로드 한 사진으로 이미지 설정
        "background-image": "url(" + window.URL.createObjectURL(profileImage[0]) + ")",
        "background-size": "180px 180px"
      });
    });
}

$(function(){
  $('#change-image').click(function(){//변경 등록 버튼 클릭시
      if ($('#profile-input').css("background-image")=="none") {//이미지 업로드하지 않았으면
        alert('이미지를 업로드 해주세요.')//alert
      }
  });
});
```   

   
* _프로필 변경 버튼 클릭 결과_   
![profile](https://user-images.githubusercontent.com/47405655/122663180-84211f80-d1d3-11eb-9edb-c7f0ddaca08d.png)   
   
### 4. 좋아요 기능
![like](https://user-images.githubusercontent.com/47405655/122663213-c2b6da00-d1d3-11eb-8748-74a06813f181.png)
좋아요 버튼을 클릭하면 like함수가 호출되어 버튼의 배경색과 글씨색이 변경됩니다. 좋아요 버튼이 눌린상태에서 한번 더 누르면 원래 상태로 되돌아가게 됩니다. 

* _좋아요 기능_   
```java script
//likes 버튼
var current = false;//like 버튼 상태 체크 변수(안눌린 상태)
function like(index) {//like버튼 클릭시 변화

  var box = document.getElementsByClassName('likes-box');//해당 클래스 객체로 받아오기
  if (index == 0) {//각 게시물 내에 있는 like 누를 때
    if(current == false){//like 안눌린 상태
      box[index].style.backgroundColor="#a1cddd"//배경색 변화
      box[index].style.color="white"//글씨색 변화
      current = true;//상태 변화(눌린상태)
    }else {//like 눌린 상태
      box[index].style.backgroundColor="white"//배경색 변화
      box[index].style.color="black"//글씨색 변화
      current = false;//상태 변화(안 눌린상태)
    }
  }else {//그리드 형식 내에 있는 like 누를 때
    if(current == false){//like 안눌린 상태
      box[index-1].style.backgroundColor="#a1cddd"//배경색 변화
      box[index-1].style.color="white"//글씨색 변화
      current = true;//상태 변화(눌린상태)
    }else {
      box[index-1].style.backgroundColor="white"//배경색 변화
      box[index-1].style.color="black"//글씨색 변화
      current = false;//상태 변화(안 눌린상태)
    }
  }
}
```   
    
       
### 4. SNS 공유 기능
![SNS](https://user-images.githubusercontent.com/47405655/122663649-360e1b00-d1d7-11eb-9429-7f82812ea902.png)   
공유 버튼 클릭시 각 SNS의 버튼들과 해당 게시글의 url이 나타납니다. 각 SNS 버튼들을 클릭하면 SNS의 공유창이 띄워집니다.   


* _SNS 기능_   
```java script
//likes 버튼
<div class="sns-share"><!--sns 박스-->
          <img src="./images/sns_naver.png" onclick="naver()" width="40"><!--naver-->
          <img src="./images/sns_face.png" onclick="facebook()" width="40"><!--facebook-->
          <img src="./images/sns_tw.png" onclick="twitter()" width="40"><!--twitter-->
          <img src="./images/sns_google.png" onclick="google()"width="40"></a><!--google-->
          <img src="./images/sns_kakao.png" onclick="kakao()" width="40"></a><!--kakao-->

          <script type="text/javascript">/*sns 이미지 클릭시 발생; 각 sns의 공유창 띄우기*/
            function naver(){
              window.open('http://share.naver.com/web/shareView.nhn?url=' +encodeURIComponent(document.URL)+'&title='+encodeURIComponent(document.title), 'naversharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            }
            function facebook(){
              window.open('https://www.facebook.com/sharer/sharer.php?u=' +encodeURIComponent(document.URL)+'&t='+encodeURIComponent(document.title), 'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            }
            function twitter(){
              window.open('https://twitter.com/intent/tweet?text=[%EA%B3%B5%EC%9C%A0]%20' +encodeURIComponent(document.URL)+'%20-%20'+encodeURIComponent(document.title), 'twittersharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            }
            function google(){
              window.open('https://plus.google.com/share?url=' +encodeURIComponent(document.URL), 'googleplussharedialog','menubar=no,toolbar=no,resizable=yes, scrollbars=yes,height=350,width=600');
            }
            function kakao(){
              window.open('https://story.kakao.com/s/share?url=' +encodeURIComponent(document.URL), 'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes, height=400,width=600');
            }
          </script>
```     

* _url 복사_   
```java script
function getURL(){
  var url = location.href;//현재 url 저장
  document.getElementById('url').value = url;// 해당 id의 value 값으로 url 주소 넣기
}

function copyLink(str) {//URL 복사 기능
  $("#url").select();//url 영역 선택 후
  document.execCommand('copy');//복사
  return;
};
```   

### 5. 전체 글 목록
![list](https://user-images.githubusercontent.com/47405655/122663327-8afc6200-d1d4-11eb-8cf8-b3862c9a9822.png)
목록 열기를 클릭하면 전체 글 목록이 보이도록 설정했습니다. 한 목록 페이지에 3개의 글 목록이 나열되고 총 10개의 글이 존재해, 목록 페이지 수는 4개로 구성됩니다.    

* _글 목록_   
```java script
<script type="text/javascript">


        $(function () {
        var colPerPage = 3;//페이지 마다 나타낼 행의 수

        var $listTable = $('#listTable');//목록 테이블
        var $tr = $($listTable).find('tbody tr');//목록 테이블 하위 tr요소 선택
        var colTotals = $tr.length;//총 행의 수


        for (i=0; i < 4; i++) {//페이지 숫자 작성하기
          $('<a href="#"></a>')
          .attr('rel', i)//(0,1,2)
          .html(i + 1+' ')//(1,2,3)
          .appendTo('#paging');
        }

        $tr.addClass('off-screen').slice(0, colPerPage).removeClass('off-screen');//off-screen(display:none) 설정 후
                                                                                  //페이지마다 나타낼 열의 수만큼 잘라내서 새로운 배열 만들기
                                                                                  //off-screen(display:none) 삭제
                                                                                  //목록 열기 버튼 누르면 바로 나올 table(페이지 숫자 선택 전에)

        var $pagingLink = $('#paging a');//페이지 숫자 (1,2,3)
        $pagingLink.on('click', function (evt) {
          evt.preventDefault();
          $("#paging a").css("font-size", "16px");/*페이지 숫자(1,2,3) 색 css*/
          var $this = $(this);
          $this.css("font-size","18px");/*선택 된 페이지 숫자 색 css */

          // 0 => 0(0*3), 3(0*3+3)
          // 1 => 3(1*3), 6(1*3+3)
          // 2 => 6(2*3), 9(2*3+3)

          var currPage = $this.attr('rel');//페이지 1이면 0, 페이지 2이면 1, 페이지 3이면 2
          var startPage = currPage * colPerPage;// 0 => 0(0*3),   1 => 3(1*3),   2 => 6(2*3) 로 시작페이지 설정
          var endPage = startPage + colPerPage;//  0 => 3(0*3+3), 1 => 6(1*3+3), 2 => 9(2*3+3)로 마지막페이지 설정

          $tr.addClass('off-screen')//페이지 선택하면
              .slice(startPage, endPage)//설정한 시작페이지와 마지막페이지로 배열 만들어서
              .removeClass('off-screen');//보여줌
          });
        });
        </script>
```


더 많은 기능들은 아래 링크를 통해 보실 수 있습니다.   

[블로그 전체 기능 설명 pdf][link]
[link]: https://github.com/ssun-aa/web/blob/8edf7df157890017278edb56d4965a2b2db5dea5/%EA%B8%B0%EB%A7%90%EA%B3%A0%EC%82%AC%20%EC%98%A8%EB%9D%BC%EC%9D%B8%20%EA%B3%BC%EC%A0%9C.pdf "블로그 전체 기능 설명" 
