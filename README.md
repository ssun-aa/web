# Web Programming Assignment : My Blog
------------
## 프로젝트 설명
웹 프로그래밍 수업 중 주어진 개인 블로그를 수행한 프로젝트 입니다. 제가 좋아하는 영화, 드라마를 게시한 블로그로 기획하여 블로그를 구현하였습니다. 블로그의 기능에는 Bgm, 시계, 검색, 프로필, 카테고리, 글쓰기, 친구추가, 게시글 좋아요, 댓글, 공유 기능으로 구현되어있습니다. 글쓰기 기능은 네이버 스마트 에디터 2.0 api를 이용하여 구현하였지만 db와 연결하지 못해 실제로 게시되지는 않습니다.
다양한 기능에 대해서는 하나씩 아래서 설명하겠습니다.   

## 프로필 기능
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


