#### 필요 라이브러리
- express
  - Node.js를 위한 웹프레임워크이다.
- mongodb & dotenv
  - 데이터는 Mongo DB에 저장한다.
  - Mongo DB는 API key를 발급 받아 적용시켜야 하는데, key를 노출시키지 않기 위해 dotenv를 사용한다.
  - `.env` 파일을 생성하고 key를 변수에 할당한다. 이후 DB와 통신이 필요할 때 변수를 불러와 사용한다.
  - `.env` 파일은 원격 저장소에 올리지 않도록 주의한다. `.gitignore`에 추가 해두도록 한다.
