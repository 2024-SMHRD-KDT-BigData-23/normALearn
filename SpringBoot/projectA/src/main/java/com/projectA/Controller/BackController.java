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
import org.springframework.web.bind.annotation.ResponseBody;
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

	@GetMapping("/getListResult") // 처음 리스트 불러오는 메소드 <- 좌측 리스트
	public ResponseEntity<List<Al_resultVO>> getListResult() {
		// DB의 al_result 에서 가져온 값들을 리스트 data 에 담아서 리엑트로 보낸다.
		List<Al_resultVO> data = result.getResultList();
		// 확인용 for 문 완료시 삭제할것.
		for (int i = 0; i < data.size(); i++) {
			System.out.println(data.get(i).getNickname());
		}
		return ResponseEntity.ok(data);
	}

	@PostMapping("/sendListResult") // 리스트 변경사항 있을 떄 작동하는 메소드
	public void sendListResult(@RequestBody Al_resultVO ResultInfo) {
		String work = ResultInfo.getWork();
		// 무슨 작업을 하는지 확인 프린트
		System.out.println("무야호");
		System.out.println(work);
		// if 문 사용 무슨 작업하는지 캐치
		if (work.equals("ChangeNumber")) {
			// 만약 react에서 ChangeNumber라는 문장을 work에 담아서 보냈을때 실행되는 매퍼  ListInfo에서 oldNumber, newNumber 가져와 쿼리문 작동
			result.changeResultNumber(ResultInfo);
		} else if (work.equals("ChangeCheckBox")) {
			// sql ListInfo 내부의 favorite 값과 number 의 값을 활용해 변경
			result.changeResultCheckBox(ResultInfo);
		} else if (work.equals("MypageCheck")){
			result.mypageCheck(ResultInfo);
		} else {
			System.out.println("오류");
		}
	}
	
	@GetMapping("/getListOutput") // 전체 출력값 가져오기 현재 차트에 사용중.
	public ResponseEntity <List<Al_outputVO>> getListOutput(){
		List<Al_outputVO> list = output.getListOutput();
		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).getTensileTtrengthResult());
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
	public ResponseEntity<List<Al_outputVO>> sendSearchData(@RequestBody Al_inputVO inputData){
		// 검색자료를 토대로 output 자료 출력
		List<Al_outputVO> SearchResult =input.insertInputAndUseIdxSearchOutput(inputData);
		// 일단 DB에서 가져와서 바로 출력하는 기능임 -> 머신러닝 구현해서 코드 추가할것
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

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Al_userVO loginData, HttpSession session, HttpServletResponse response) {
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
	        Cookie cookie = new Cookie("WoogunSession", session.getId());
	        cookie.setHttpOnly(true);
	        cookie.setPath("/");
	        cookie.setMaxAge(-1);
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


	@PostMapping("/submit")
	public String submitData(@RequestBody Al_userVO profile) {
		// 입력받은 데이터를 처리
		// List<Al_userVO> data = user.findAll();
		// System.out.println(data.get(0).getUserid());
		// System.out.println(data.get(0).getCompanyname());
		// System.out.println("일단은 처리해봐~");
		// System.out.println(profile.getUserid());
		// System.out.println(profile.getUserpw());
		// System.out.println(profile.getCompanyname());
		// System.out.println(profile.getApikey());
		return "Received data: " + profile;
	}
}
