//이미지 파일 drop 시 해당 url로 이동하지 않도록 설정
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };

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


//목록 열기
$(function(){//목록 열기 글자 클릭시
  $('.list-button').click(function(){//목록열기/목록닫기 글자 클릭시
    if($('.list').css("display")=="none") {// 목록 list 안보이는 상태에서 누르면
      $('.list').css("display","block");//보이도록 만들고
      $('.list-button').text("목록 닫기"); //목록 열기 글자를 목록 닫기로 변경
    }else {
      $('.list').css("display","none");//Best 카테고리 항복 전부 보이는 상태이면
      $('.list-button').text("목록 열기");//목록 닫기 글자를 목록 열기로 변경
    }
  });
});


//친구 추가 버튼 클릭 시
function open_page() {
  window.open('http://localhost:8080/relationship.html', "친구 추가", "width=580, height=300, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );
}




//프로필 , 글쓰기 버튼 클릭 시
var first = 0;//글쓰기 양식을 한번만 불러오기 위한 조건 변수

$(function(){
  $('#profile-button').click(function(){//프로필 버튼 클릭시
    $('section').css( "display","none" );//section 영역 안보이게 설정
    $('#smartEditorText').css( "display","none" );//글쓰기 영역 안보이게 설정
    $('#profile-form').css( "display","inline-block" );//프로필 영역 보이게 설정
  });


  $('#write-button').click(function(){//글쓰기 버튼 클릭시
    $('#title').val("");//제목 입력 칸 초기화
    $('#textTest').val("");//내용 입력 칸 초기화
    $('section').css( "display","none" );//section 영역 안보이게 설정
    $('#profile-form').css( "display","none" );//프로필 영역 안보이게 설정
    $('#smartEditorText').css( "display","inline-block" );//글쓰기 영역 보이게 설정

    if (first == 0) {//글쓰기 양식 한번만
      var oEditors=[];
      nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "textTest",  //textarea ID
        sSkinURI: "SmartEditor2Skin.html",  //skin경로
        fCreator: "createSEditor2",
        htParams : {fOnBeforeUnload : function(){}} // 이페이지 나오기 alert 삭제
      });
      first = 1;
    }
  });
});

//글쓰기 양식 저장 or 취소 버튼 클릭시
$(function(){
  $('#save').click(function(){//프로필 버튼 클릭시
    alert("저장되었습니다.");
    $('section').css( "display","block" );//section 영역 보이게 설정
    $('#profile-form').css( "display","none" );//프로필 영역 안보이게 설정
    $('#smartEditorText').css( "display","none" );//글쓰기 영역 안보이게 설정
  });
  $('#cancle').click(function(){//프로필 버튼 클릭시
    if (confirm("작성된 글이 저장되지 않았습니다. 양식을 벗어나시겠습니까?") == true){//확인
      $('section').css( "display","block" );//section 영역 보이게 설정
      $('#profile-form').css( "display","none" );//프로필 영역 안보이게 설정
      $('#smartEditorText').css( "display","none" );//글쓰기 영역 안보이게 설정
    }else{//취소

    return;
    }
  });
});

//프로필양식 닉네임 입력 시
$(document).ready(function(){
       $("#nickname-input").keypress(function (e) {//닉네임 입력 칸에 엔터 키 입력 들어오면
        if (e.which == 13){//엔터 키 입력시
           $(function(){
             var nickname = $('#nickname-input').val();//사용자가 입력한 닉네임 가져오기
             if (!nickname) {
               alert("닉네임을 입력하세요.");
             }else {
              $('#nickname').text(nickname);//우측 프로필의 닉네임 칸에 입력한 닉네임 값으로 변경
             }
           });
         }
    });
});

//프로필 이미지 업로드 시
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


//그리드 클릭 시 해당 게시글로 이동하는 기능
function goReplace(str){//grid onclick 함수; 해당 게시글로 이동
  location.replace(str);
}


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

//해당 게시글의 url 가져오는 함수; sns박스 열리면 호출됨
function getURL(){
  var url = location.href;//현재 url 저장
  document.getElementById('url').value = url;// 해당 id의 value 값으로 url 주소 넣기
}

//공유, 댓글 수
$(function(){//공유, 댓글 창 열고 닫기
  var shareOpen; //공유 창 상태 변수

  $('.share-box').click(function(){//공유 버튼 클릭시
    if ($( ".sns-share" ).css( "display" )=="none") { //sns박스가 안보일때 공유 버튼을 누르면
      $( ".sns-share" ).css( "display","block" );//sns박스를 보이게 만들고
      $('#comments').css( "top","-135px" );//댓글창의 위치를 조절해서 겹치게 만들기
      $('#comments').css( "margin-bottom","-115px" );//겹치는 문제로 발생하는 댓글창의 마진을 줄여 공백 없애기
      getURL();//해당 게시글의 url 가져오는 함수
      shareOpen= true;//공유 창이 열려있을때 값
    }else {//sns박스가 보일때 공유 버튼을 누르면
      $( ".sns-share" ).css( "display","none" );//sns박스를 안보이게 만들고
      $('#comments').css( "top","0px" );//댓글 창 위치 조정
      $('#comments').css( "margin-bottom","20px" );//겹치지 않을때는 원래 마진으로 변경
      shareOpen= false;//공유 창이 닫혀있을때 값
    }
  });

  $('.comments-box').click(function(){//댓글 수 버튼 클릭시
    if (shareOpen==true) {//공유 창이 열려있을때면
      $('#comments').css( "top","-135px" );//댓글창의 위치를 조절해서 겹치게 만들기
      $('#comments').css( "margin-bottom","-115px" );//겹치는 문제로 발생하는 댓글창의 마진을 줄여 공백 없애기
    }else {//공유 창 닫혀있을 때면
      $('#comments').css( "top","0px" );//댓글 창 위치 조절
      $('#comments').css( "margin-bottom","20px" );//겹치지 않을때는 원래 마진으로 변경
    }

    $('#comments').toggle();//번갈아 가면서 닫았다 열었다
  });
});


//url 복사 버튼
$(function(){
  $('#urlCopy').click(function(){//URL 버튼 클릭시
    $( ".sns-share" ).css( "display","none" );//sns박스를 안보이게 만들고
    $( ".url-after" ).css( "display","block" );//안내사항을 보이게 만듦
  });

  $('#urlClosed').click(function(){//URL X버튼 클릭시
    $( ".sns-share" ).css( "display","block" );//sns박스를 보이게 만들고
    $( ".url-after" ).css( "display","none" );//안내사항을 안보이게 만듦
  });
});


//url 복사 버튼 onclick 함수
function copyLink(str) {//URL 복사 기능
  $("#url").select();//url 영역 선택 후
  document.execCommand('copy');//복사
  return;
};

//댓글 입력 기능
var userCommentImage;
$(function(){//댓글 내용 반영하기
  var getTag = $('.user-comment-group').html();//현재 작성되어있지만 display=none으로 설정한 댓글 기본 형식 가져오기
  var i=0;//댓글 수 체크
  $('.comments-submit').click(function(){//댓글 등록 버튼 클릭시
    var name = $('.id').val();//사용자가 입력한 id 가져오기
    var comment = $('.comments-text').val();//사용자가 입력한 댓글 가져오기
    $(".userImg").attr('class','userImg'+i);//댓글 형식 중 userImg 변수 이름 변경
    if (!userCommentImage) {//이미지가 입력되지 않았을때
      $('.userImg'+i).css({//기본 이미지로 설정
        "background-color": "white"
      });
    }else {//이미지 입력 되었을 때
      $('.userImg'+i).css({//사용자가 업로드 한 사진으로 이미지 설정
        "background-image": "url(" + window.URL.createObjectURL(userCommentImage[0]) + ")",
        "background-size": "25px 25px"
      });
    }

    if (!comment) {//내용이 입력 되지 않았을때
      alert("내용을 입력하세요.");// alert 창 띄우기
    }else if (!name) {//닉네임이 입력 되지 않았을때
      alert("닉네임을 입력하세요.");// alert 창 띄우기
    }else {//내용이 입력 되었을때
      $(".text").attr('class','text'+i);// 댓글 형식 중 text 변수 이름 변경
      $(".userId").attr('class','userId'+i);// 댓글 형식 중 userId 변수 이름 변경
      $(".date").attr('class','date'+i);// 댓글 형식 중 text 변수 이름 변경

      $('.user-comment').css('display','block');//display block으로 변경

      $(".text"+i).text(comment);//변경된 text변수에 댓글내용을 값으로 넣기
      $(".userId"+i).text(name);//변경된 userId번수에 댓글내용을 값으로 넣기

      $(".date"+i).html(//해당 클래스에 코드 추가
        moment(date).format('YYYY/MM/DD HH:mm')//해당 형식으로 날짜 표현
      );

      $(".user-comment-group").append(getTag);//해당 div에 반영된 댓글 형식 추가
      i++;//댓글수 증가
      $(".comments-box").text("댓글수 "+i);//댓글 수 변경
      $('.comments-text').val('');//댓글창 초기화
      $('.id').val('');//id칸 초기화
      $('#img').css({
        "background-image": "url("+"images/user.svg"+")"
      });//이미지칸 초기화
      $('.camera').css({//기본 이미지 위에 있던 카메라 이미지 삽입
        "display": "inline-block"
      });//이미지칸 초기화
    }
  });
});

window.addEventListener("DOMContentLoaded", function () {
  var input = document.querySelector('#photo');//댓글 창의 사용자 프로필 이미지 사진 첨부 input
  input.addEventListener( 'change', changeImage);//change 되면 changeImage함수 호출
});

//댓글 기능 중 프로필 이미지 기능
function changeImage(e){
    userCommentImage = e.target.files || e.dataTransfer.files;
    if (userCommentImage[0].type.match(/image.*/)) {//이미지 파일일 경우
        $('#img').css({//댓글 작성자의 프로필 이미지 변경
            "background-image": "url(" + window.URL.createObjectURL(userCommentImage[0]) + ")",
            "background-repeat": "no-repeat",
            "z-index": "1000",
            "background-size": "25px 25px"
        });

        $('.camera').css({//기본 이미지 위에 있던 카메라 이미지 삭제
          "display": "none"
        });
      }else{
          alert('이미지가 아닙니다.');
          return;
      }
}

//우측 카테고리 기능
$(function(){
  $('.category-button-set').click(function(){//카테고리 접기 클릭시
    if($('.categoryAll').css("display")=="none") {//카테고리 항목 전부 안보이는 상태에서 누르면
      $('.categoryAll').css("display","block");//보이도록 만들고
      $('.category-button').css("transform","rotate(0deg)");//접기 모양 원래대로
    }else {
      $('.categoryAll').css("display","none");//카테고리 항복 전부 보이는 상태이면
      $('.category-button').css("transform","rotate(180deg)");//접기 모양 뒤집기
    }
    return ;
  });


  $('.Best-button').click(function(){// Best 카테고리 접기 클릭시
    if($('.BestAll').css("display")=="none") {// Best 카테고리 항목 전부 안보이는 상태에서 누르면
      $('.BestAll').css("display","block");//보이도록 만들고
      $('.Best-button').css("transform","rotate(0deg)");//접기 모양 그대로
    }else {
      $('.BestAll').css("display","none");//Best 카테고리 항복 전부 보이는 상태이면
      $('.Best-button').css("transform","rotate(180deg)");//접기 모양 뒤집기
    }
    return ;
  });

  $('.Action-button').click(function(){//Action 카테고리 접기 클릭시
    if($('.ActionAll').css("display")=="none") {// Action 카테고리 항목 전부 안보이는 상태에서 누르면
      $('.ActionAll').css("display","block");//보이도록 만들고
      $('.Action-button').css("transform","rotate(0deg)");//접기 모양 그대로
    }else {
      $('.ActionAll').css("display","none");//Action 카테고리 항복 전부 보이는 상태이면
      $('.Action-button').css("transform","rotate(180deg)");//접기 모양 뒤집기
    }
    return ;
  });

  $('.Comedy-button').click(function(){//Comedy 카테고리 접기 클릭시
    if($('.ComedyAll').css("display")=="none") {// Comedy 카테고리 항목 전부 안보이는 상태에서 누르면
      $('.ComedyAll').css("display","block");//보이도록 만들고
      $('.Comedy-button').css("transform","rotate(0deg)");//접기 모양 그대로
    }else {
      $('.ComedyAll').css("display","none");//Comedy 카테고리 항복 전부 보이는 상태이면
      $('.Comedy-button').css("transform","rotate(180deg)");//접기 모양 뒤집기
    }
    return ;
  });

  $('.Romance-button').click(function(){//Romance 카테고리 접기 클릭시
    if($('.RomanceAll').css("display")=="none") {//Romance 카테고리 항목 전부 안보이는 상태에서 누르면
      $('.RomanceAll').css("display","block");//보이도록 만들고
      $('.Romance-button').css("transform","rotate(0deg)");//접기 모양 그대로
    }else {
      $('.RomanceAll').css("display","none");//Romance 카테고리 항복 전부 보이는 상태이면
      $('.Romance-button').css("transform","rotate(180deg)");//접기 모양 뒤집기
    }
    return ;
  });

  $('.recent-button-set').click(function(){//최신 글 접기 클릭시
    if($('.recentAll').css("display")=="none") {// recent 카테고리 항목 전부 안보이는 상태에서 누르면
      $('.recentAll').css("display","block");//보이도록 만들고
      $('.recent-button').css("transform","rotate(0deg)");//접기 모양 그대로
    }else {
      $('.recentAll').css("display","none");//recent 카테고리 항복 전부 보이는 상태이면
      $('.recent-button').css("transform","rotate(180deg)");//접기 모양 뒤집기
    }
    return ;
  });
});
