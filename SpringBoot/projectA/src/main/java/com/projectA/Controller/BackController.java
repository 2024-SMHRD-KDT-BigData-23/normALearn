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

import com.projectA.Mapper.board_mapper;
import com.projectA.Mapper.input_mapper;
import com.projectA.Mapper.output_mapper;
import com.projectA.Mapper.result_mapper;
import com.projectA.Mapper.user_mapper;
import com.projectA.VO.Al_boardVO;
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
	@Autowired
	private board_mapper board;

	@PostMapping("/getListResult") // 처음 리스트 불러오는 메소드 <- 좌측 리스트 work 필드에 값이 없을시 아이디를 통해 전체 불러오는 메소드 작동
	public ResponseEntity<List<Al_resultVO>> getListResult(@RequestBody Al_resultVO ResultInfo) {
		String work = "";
		try {
			if (ResultInfo.getWork() != null) {
				work = ResultInfo.getWork();
			}
		} catch (Exception e) {
			System.out.println("work가 null값입니다.");
		}

		if (work.equals("myPage")) { // 프론트에서 work 파라미터에 myPage 라고 보내면 유저아이디에 맞는 자료 마이페이지 리스트만 불러온다.
			List<Al_resultVO> data = result.getMypageList(ResultInfo);
			System.out.println("BookMark출력");
			return ResponseEntity.ok(data);
		} else {
			// DB의 al_result 에서 가져온 값들을 리스트 data 에 담아서 리엑트로 보낸다.
			List<Al_resultVO> data = result.getResultList(ResultInfo);
			System.out.println("전챗값 출력");
			return ResponseEntity.ok(data);
		}

	}

	@PostMapping("/sendListResult") // 리스트 변경사항 있을 떄 작동하는 메소드 (반환할게 없을때 사용)
	public void sendListResult(@RequestBody Al_resultVO ResultInfo) {
		String work = ResultInfo.getWork();
		// 무슨 작업을 하는지 확인 프린트
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
	public ResponseEntity<List<Al_outputVO>> getListOutput(Al_outputVO data) {
		List<Al_outputVO> list = output.getListOutput(data);
		return ResponseEntity.ok(list);
	}

	@PostMapping("/sendListOutput") //
	public void sendListOutput(@RequestBody Al_outputVO OutputInfo) {
		
		String work = "없음";
		try {
			work = OutputInfo.getWork();
			System.out.println("작업내용 : "+work);
			// 무슨 작업을 하는지 확인 프린트
		} catch (Exception e) {}
		if(work.equals("updateProductName")) {
			output.updateProductName(OutputInfo);
		}
		
		
		

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

	@PostMapping("/clickListData")
    public ResponseEntity<List<Al_outputVO>> clickListData(@RequestBody Al_resultVO data){
        System.out.println(data.getOutputIdx());
        System.out.println(data.getUserId());
        List<Al_outputVO> ClickData = result.ClickListSerch(data);
        try {
            System.out.println(ClickData.get(0));
        } catch (Exception e) {
            System.out.println("DataMissing");
        } 
        return ResponseEntity.ok(ClickData);
    }

	@PostMapping("/ChangePw") // 비밀번호 변경 userId, userPw, newPw 보내면됨
	public ResponseEntity<Map<String, Object>> ChangePw(@RequestBody Al_userVO data) {
		Map<String, Object> responseBody = new HashMap<>();
		try {
			System.out.println(data.getUserId());
			System.out.println(data.getNewPw());
			System.out.println(data.getUserPw());
		} catch (Exception e) {
			// TODO: handle exception
		}
		int row = user.ChangePw(data);
		if (row == 1) {
			responseBody.put("message", "ok");
			return ResponseEntity.ok(responseBody);
		} else {
			responseBody.put("message", "fail");
			return ResponseEntity.ok(responseBody);
		}

	}
	
	@PostMapping("/board")
	public ResponseEntity<List<Al_boardVO>> board(@RequestBody Al_boardVO data){
		String work = "없음";
		try {
			work = data.getWork();
			System.out.println("작업내용 = "+work);
		} catch (Exception e) {}
		if(work.equals("write")) {
			board.writeBoard(data);
			System.out.println("작성완료");			
		}else if(work.equals("edit")) {
			// 게시물 수정시 제목 수정안해도 같이 보내야 합니다. 밸류값 가져오는 방식으로. sql update 문 한번에 바꾸는 거라..
			board.editBoard(data);
			System.out.println("수정완료");
		}else if(work.equals("Status")) {
			board.editProgress(data);
			System.out.println("상태변경");
		}else if(work.equals("delete")) {
			board.deleteBoard(data);
			System.out.println("삭제완료");
		}else {
			if(data.getUserId().equals("admin")) { // 만약 로그인한 계정이 "admin" 이라면 아이디 상관없이 전부 가져옴 
				List<Al_boardVO> responseBody =board.getAllBoardList(data);
				return ResponseEntity.ok(responseBody);
			}else {
				List<Al_boardVO> responseBody =board.getBoardList(data);
				return ResponseEntity.ok(responseBody);
			}
		}
		return null;
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
			session.setAttribute("userId", user);

			// 쿠키 설정
			Cookie cookie = new Cookie("Alsession", session.getId());
			cookie.setHttpOnly(true);
			cookie.setPath("/");
			cookie.setMaxAge(30);
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