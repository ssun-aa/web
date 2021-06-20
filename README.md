# Web Programming Assignment : My Blog
------------
## 프로젝트 설명
웹 프로그래밍 수업 중 주어진 개인 블로그를 수행한 프로젝트 입니다. 제가 좋아하는 영화, 드라마를 게시한 블로그로 기획하여 블로그를 구현하였습니다. 블로그의 기능에는 Bgm, 시계, 검색, 프로필, 카테고리, 글쓰기, 친구추가, 게시글 좋아요, 댓글, 공유 기능으로 구현되어있습니다. 글쓰기 기능은 네이버 스마트 에디터 2.0 api를 이용하여 구현하였지만 db와 연결하지 못해 실제로 게시되지는 않습니다.
다양한 기능에 대해서는 하나씩 아래서 설명하겠습니다.   

### 1. 프로필 기능
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
   
* _프로필 변경 버튼 클릭 결과_   
![profile](https://user-images.githubusercontent.com/47405655/122663180-84211f80-d1d3-11eb-9edb-c7f0ddaca08d.png)   
   
### 2. 좋아요 기능
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
    
### 3. 전체 글 목록
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


