import { useNavigate, useLocation, useParams } from "react-router-dom";
import { parseQuery } from "utils";

export const useRouter = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const params = useParams();

  return {
    push: navigate,
    goBack: () => navigate(-1),
    pathName: location.pathname,
    query: {
      ...parseQuery(location.search),
      ...params,
    },
  };
};
