package com.projectA.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectA.Mapper.input_mapper;
import com.projectA.Mapper.output_mapper;
import com.projectA.Mapper.result_mapper;
import com.projectA.Mapper.user_mapper;
import com.projectA.VO.Al_inputVO;
import com.projectA.VO.Al_outputVO;
import com.projectA.VO.Al_resultVO;
import com.projectA.VO.Al_userVO;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/NomAlearn")
public class BackController {

	@Autowired
	private input_mapper input;
	@Autowired
	private output_mapper output;
	@Autowired
	private result_mapper result;
	@Autowired
	private user_mapper user;

	@PostMapping("/getListResult") // 처음 리스트 불러오는 메소드 <- 좌측 리스트
	public ResponseEntity<List<Al_resultVO>> getListResult(@RequestBody Al_resultVO ResultInfo) {

		///////////////
		///// 전체값 가져와서 리액트에서 컨트롤하는 방향으로 변경 나중에 로그인 추가하면 아이디 값으로 가져오게끔 변경해야함
		/////////////// !!!!!!!!!!!!!!!!!!!!!
		////////////////
		String work = "noting";
		try {
			// 무슨 작업할지 확인
			if (ResultInfo.getWork() != null) {
				work = ResultInfo.getWork();
			}
			System.out.println(work);
		} catch (Exception e) {
			System.out.println("null 값 입니다~");
		}

		if (work.equals("myPage")) { // 프론트에서 work 파라미터에 myPage 라고 보내면 마이페이지 리스트만 불러온다.
			List<Al_resultVO> data = result.getMypageList();
			System.out.println("BookMark출력");
			return ResponseEntity.ok(data);
		} else {
			// DB의 al_result 에서 가져온 값들을 리스트 data 에 담아서 리엑트로 보낸다.
			List<Al_resultVO> data = result.getResultList();
			System.out.println("전챗값 출력");
			return ResponseEntity.ok(data);
		}

	}

	@PostMapping("/sendListResult") // 리스트 변경사항 있을 떄 작동하는 메소드 (반환할게 없을때 사용)
	public void sendListResult(@RequestBody Al_resultVO ResultInfo) {
		String work = ResultInfo.getWork();
		// 무슨 작업을 하는지 확인 프린트
		System.out.println("무야호1");
		System.out.println(ResultInfo.getOutputIdx());
		System.out.println(work);
		// if 문 사용 무슨 작업하는지 캐치
		if (work.equals("ChangeNumber")) {
			// 만약 react에서 ChangeNumber라는 문장을 work에 담아서 보냈을때 실행되는 매퍼 ListInfo에서 oldNumber,
			// newNumber 가져와 쿼리문 작동
			result.changeResultNumber(ResultInfo);
		} else if (work.equals("ChangeCheckBox")) {
			// sql ListInfo 내부의 favorite 값과 number 의 값을 활용해 변경
			result.changeResultCheckBox(ResultInfo);
		} else if (work.equals("ChangeMypage")) {
			result.mypageCheck(ResultInfo);
			System.out.println("마이페이지 변경완료");
		} else {
			System.out.println("오류");
		}
	}

	@GetMapping("/getListOutput") // 전체 출력값 가져오기 현재 차트에 사용중.
	public ResponseEntity<List<Al_outputVO>> getListOutput() {
		List<Al_outputVO> list = output.getListOutput();
		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).getTensileStrengthResult());
		}

		return ResponseEntity.ok(list);
	}

	@PostMapping("/sendListOutput") //
	public void sendListOutput(@RequestBody Al_outputVO OutputInfo) {
		String work = OutputInfo.getWork();
		// 무슨 작업을 하는지 확인 프린트
		System.out.println(work);

	}

	@PostMapping("/sendSearchData") // 조성을 입력해 검색하는 기능
	public ResponseEntity<List<Al_outputVO>> sendSearchData(@RequestBody Al_inputVO inputData) {
		// 검색자료를 토대로 output 자료 출력
		// 입력받은 데이터를 콘솔에 출력
		System.out.println("검색 데이터" + inputData);
		List<Al_outputVO> SearchResult = input.insertInputAndUseIdxSearchOutput(inputData);
		// 일단 DB에서 가져와서 바로 출력하는 기능임 -> 머신러닝 구현해서 코드 추가할것
		System.out.println(SearchResult.get(0).getInputIdx());
		return ResponseEntity.ok(SearchResult);
	}

	@PostMapping("/join") // 회원가입 -> 폐기
	public String join(@RequestBody Al_userVO joinData) {
		// 회원가입 메소드 작동 성공시 1을 반환한다.
		int result = user.join(joinData);
		if (result == 1) {
			System.out.println("회원가입 성공");
			String id = joinData.getUserId();
			// id 를 리액트로 보내서 "## 님 환영합니다 출력"
			return id;
		} else {
			System.out.println("회원가입 실패");
			return "회원가입이 실패하였습니다.";
		}

	}

	@PostMapping("/ChangePw") // 비밀번호 변경 userId, userPw, newPw 보내면됨
	public ResponseEntity<Map<String, Object>> ChangePw(@RequestBody Al_userVO data) {
		Map<String, Object> responseBody = new HashMap<>();
		int row = user.ChangePw(data);
		if (row == 1) {
			responseBody.put("message", "비밀번호 변경완료");
			return ResponseEntity.ok(responseBody);
		} else {
			responseBody.put("message", "비밀번호 변경실패");
			return ResponseEntity.ok(responseBody);
		}

	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Al_userVO loginData, HttpSession session,
			HttpServletResponse response) {
		Map<String, Object> responseBody = new HashMap<>();
		Al_userVO result = user.login(loginData);
		if (result != null) { // 로그인 성공 시
			System.out.println("로그인 성공");

			// 세션에 사용자 정보 저장
			Al_userVO user = new Al_userVO();
			user.setCompanyName(result.getCompanyName());
			user.setUserId(result.getUserId());
			session.setAttribute("user", user);

			// 쿠키 설정
			Cookie cookie = new Cookie("userId", session.getId());
			cookie.setHttpOnly(true);
			cookie.setPath("/");
			cookie.setMaxAge(43200);
			response.addCookie(cookie);

			// 응답에 최소한의 사용자 정보 포함 + 회사이름
			responseBody.put("message", "로그인 성공");
			responseBody.put("userId", user.getUserId());
			responseBody.put("companyName", user.getCompanyName());

			return ResponseEntity.ok(responseBody);
		} else {
			System.out.println("로그인 실패");
			responseBody.put("message", "로그인 실패");
			return ResponseEntity.ok(responseBody);
		}
	}

}