import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error:unknown = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>페이지의 주소가 잘못되었거나, 주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.</p>
      <Link to="/">
        <div>
          홈으로 돌아가기
        </div>
      </Link>
    </div>
  );
}