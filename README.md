# Todo List (프로젝트 제목)

## 📑 프로젝트 소개

할 일 목록을 관리하는 간단한 웹 애플리케이션입니다. Next.js와 TypeScript를 사용하여 제작되었으며, Vercel을 통해 배포되었습니다.

- **배포 링크**: [여기에 Vercel 배포 링크를 삽입하세요]
- **API 문서**: [https://assignment-todolist-api.vercel.app/docs/](https://assignment-todolist-api.vercel.app/docs/)

---

## ✨ 주요 기능

- **할 일 관리 (CRUD)**: 할 일 목록을 조회하고, 새로운 할 일을 추가, 수정, 삭제할 수 있습니다.
- **상태 관리**: 'TO DO'와 'DONE' 상태를 구분하고, 체크박스를 통해 상태를 변경할 수 있습니다.
- **상세 페이지**: 각 할 일 항목을 클릭하여 메모 및 이미지 첨부가 가능한 상세 페이지로 이동합니다.
- **반응형 디자인**: 데스크탑, 태블릿, 모바일 등 다양한 화면 크기에 최적화된 UI를 제공합니다.

---

## 🛠️ 기술 스택

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: REST API
- **Deployment**: Vercel

---

## 🚀 설치 및 실행 방법

1.  **레포지토리 클론**:

    ```bash
    git clone [이 레포지토리의 URL]
    ```

2.  **폴더로 이동**:

    ```bash
    cd [프로젝트 폴더 이름]
    ```

3.  **패키지 설치**:

    ```bash
    npm install
    ```

4.  **환경 변수 설정**:
    `src/lib/api.ts` 파일의 `TENANT_ID`를 본인의 고유한 ID로 변경해주세요.

    ```typescript
    const TENANT_ID = "YOUR_TENANT_ID";
    ```

5.  **개발 서버 실행**:

    ```bash
    npm run dev
    ```

6.  브라우저에서 `http://localhost:3000`으로 접속합니다.
