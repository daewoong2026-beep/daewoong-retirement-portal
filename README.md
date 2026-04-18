# 대웅제약 퇴직 접수 시스템 (HTML 단일 파일 버전)

**서버 설치 없이 브라우저에서 바로 열어 쓰는 버전**입니다.
VS Code로 열어서 수정도 가능합니다.

---

## 📁 파일 구성 (4개만)

```
html-app/
├── config.js       ← Supabase URL/Key 입력 (⚠️ 여기만 수정하면 됨)
├── common.js       ← 공통 유틸
├── index.html      ← 직원용 (로그인→포털→안내/접수)
└── admin.html      ← 관리자용 (대시보드/목록/업로드/권한)
```

---

## 🚀 사용 방법 (3단계)

### 1단계: 폴더 압축 해제 후 VS Code로 열기

`html-app` 폴더를 VS Code에서 열어주세요.

### 2단계: `config.js` 수정 (딱 2줄만)

```js
const SUPABASE_CONFIG = {
  url: "https://xxxxxxxx.supabase.co",   // ← 여기에 거현량 프로젝트 URL
  anonKey: "eyJhbGciOi...",              // ← 여기에 anon public key
  companyCode: "DAEWOONG",
  schema: "retirement",
};
```

**값 찾는 방법:**
- 거현량 Supabase 대시보드 → 좌측 **Settings** → **API** 메뉴
- `Project URL` 과 `anon public` key 복사

### 3단계: 브라우저에서 열기

- **`index.html` 더블클릭** → 직원 페이지 자동으로 브라우저에서 열림
- **`admin.html` 더블클릭** → 관리자 로그인 페이지

끝입니다! 🎉

---

## 🧪 테스트 순서

### ① 먼저 관리자로 로그인
`admin.html` 열기 → Supabase에 등록한 이메일/비밀번호로 로그인

### ② 직원명부 업로드
- 사이드바 → **직원명부 업로드**
- `sample_employees.xlsx` 업로드 (테스트용 10명)

### ③ 직원 페이지에서 접수 테스트
- `index.html` 열기
- 사번: `20180001`, 이름: `김민수` 입력
- 안내 보기 or 접수하기 선택
- 접수하기 선택 시 생년월일: `1985-03-12`
- 퇴사일 등 입력 후 제출 → "퇴직접수가 완료되었습니다." 확인

### ④ 관리자 페이지에서 확인
- `admin.html` → **퇴직자 관리** 메뉴
- 방금 접수한 직원이 목록에 나타남
- **대시보드** 에서 숫자 증가 확인

---

## 🌐 나중에 배포하려면 (선택)

HTML 파일이라 어디든 올리면 됩니다:

### 옵션 A: Netlify Drop (가장 쉬움)
1. <https://app.netlify.com/drop> 접속
2. `html-app` 폴더를 드래그 앤 드롭
3. 끝. URL이 발급됨 (예: `https://random-name.netlify.app`)

### 옵션 B: Vercel
1. GitHub에 폴더 업로드
2. <https://vercel.com> 에서 Import → Deploy

### 옵션 C: 사내 IIS / Apache / Nginx
그냥 `html-app` 폴더를 정적 파일 서빙하도록 올리면 됨.

---

## ⚙️ VS Code에서 수정할 때 팁

### 라이브 서버로 실행 (권장)
1. VS Code 확장 프로그램에서 **Live Server** 설치
2. `index.html` 우클릭 → "Open with Live Server"
3. 코드 수정 시 자동 새로고침

### 파일 구조
- **디자인 수정**: `index.html` / `admin.html` 안의 HTML + Tailwind 클래스 수정
- **로직 수정**: 같은 파일의 `<script>` 안의 JS 수정
- **색상/폰트 변경**: 파일 상단 `tailwind.config` 블록에서 수정
- **Supabase 호출**: `sb.from('테이블명')...` 패턴 검색

### 예시: 브랜드 컬러 변경
```js
// index.html 상단 tailwind.config에서
brand: { 
  DEFAULT: '#1E40AF',  // ← 이 값만 바꾸면 전체 블루 톤이 바뀜
  ...
}
```

---

## 🔒 보안 관련

- **anon key를 HTML에 넣는 게 안전한가?** → 네. Supabase의 anon key는 공개되어도 되는 키입니다. RLS(행 레벨 보안)로 DB에서 직접 접근 제어가 됩니다.
- **관리자 로그인 우회 가능?** → 클라이언트 JS는 우회 가능하지만, 실제 데이터 접근은 RLS가 막기 때문에 DB 수준에서는 안전합니다.
- 민감 데이터를 다루려면 Next.js 버전(서버사이드 보호)을 쓰는 것을 권장합니다.

---

## ❓ 자주 묻는 문제

### ✋ "⚠️ 초기 설정 필요" 노란 배너가 뜸
→ `config.js` 에 URL과 anon key 입력이 안 됐어요. 2단계 다시 확인.

### ✋ 로그인했는데 "권한이 없습니다"
→ Supabase SQL Editor에서 실행:
```sql
insert into retirement.user_roles (user_id, role_name)
values ('본인의-UUID', 'hr_admin');
```

### ✋ "Could not find the table ..." 에러
→ **Settings → API → Exposed schemas** 에 `retirement` 추가 + Restart project 를 했는지 확인.

### ✋ 직원명부 업로드 시 "company not found"
→ SQL이 제대로 실행되지 않은 상태. `01_schema_isolated_v11.sql` 재실행 필요.

### ✋ 직원 페이지에서 사번/이름 일치한다는데 인증 실패
→ 직원명부에 해당 직원의 `employment_status`가 `재직` 인지 확인. (재직 상태만 접수 가능)

---

문제 생기면 에러 메시지 전체를 알려주세요. 🙌
