import { memberState } from "@recoil/user/atoms.mjs";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from 'react-router-dom';

const API_SERVER = import.meta.env.VITE_API_SERVER;

function useCustomAxios() {
	// 로그인 된 사용자 정보
	const user = useRecoilValue(memberState);
	const navigate = useNavigate();
  const location = useLocation();
	// ajax 통신에 사용할 공통 설정 지정
	const instance = axios.create({
		baseURL: API_SERVER,
		timeout: 1000 * 10,
		headers: {
			"content-type": "application/json", // request 데이터 타입
			accept: "application/json", // response 데이터 타입
		},
	});

	// 요청 인터셉터
	instance.interceptors.request.use(config => {
		if (user) {
			const accessToken = user.token.accessToken;
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	});
	instance.interceptors.response.use(
		res => res,
		err => {
      if (err.response?.status == '401') {
          const gotoLogin = confirm("go to login?");
          gotoLogin&&navigate('/users/login',{state:{from:location.pathname}});
      }else{
        return Promise.reject(err);
      }
    }
	);
	return instance;
}

export default useCustomAxios;
