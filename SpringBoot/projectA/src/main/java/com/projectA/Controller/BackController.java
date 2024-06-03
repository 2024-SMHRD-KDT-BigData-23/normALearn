package com.projectA.Controller;

import java.util.List;

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
import com.projectA.VO.Al_resultVO;
import com.projectA.VO.Al_userVO;

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

	@GetMapping("/getListResult") // 처음 리스트 불러오는 메소드
	public ResponseEntity<List<Al_resultVO>> getListResult() {
		// DB의 al_result 에서 가져온 값들을 리스트 data 에 담아서 리엑트로 보낸다.
		List<Al_resultVO> data = result.getResultList();
		// 확인용 for 문 완료시 삭제할것.
		for (int i = 0; i < data.size(); i++) {
			System.out.println(data.get(i).getNickname());
		}
		return ResponseEntity.ok(data);
	}

<<<<<<< HEAD
	@PostMapping("/sendListResult") // 리스트 변경시 작동하는 메소드
	public void sendListResult(@RequestBody Al_resultVO ListInfo) {
=======
	@GetMapping("/sendListResult") // 리스트 변경시 작동하는 메소드
	public String sendListResult(@RequestBody Al_resultVO ListInfo) {
>>>>>>> 54361a948f3b013ec1ea905e8c6ef93d52f290bf
		String work = ListInfo.getWork();
		System.out.println(work);
		// if 문 사용 무슨 작업하는지 캐치
		if (work.equals("ChangeNumber")) {
			// 만약 react에서 ChangeNumber라는 문장을 work에 담아서 보냈을때 실행되는 매퍼  ListInfo에서 oldNumber, newNumber 가져와 쿼리문 작동
			result.changeResultNumber(ListInfo);
			return "순서 변경";
		} else if (work.equals("ChangeCheckBox")) {
			// sql ListInfo 내부의 favorite 값과 number 의 값을 활용해 변경
			result.changeResultCheckBox(ListInfo);
			return "체크 박스";
		} else {
			System.out.println("오류");
			return "오류";
		}
	}

	@PostMapping("/join") // 회원가입
	public String join(@RequestBody Al_userVO joinData) {
		// 회원가입 메소드 작동 성공시 1을 반환한다.
		int result = user.join(joinData);
		if (result == 1) {
			System.out.println("Join Success");
			String id = joinData.getUserId();
			// id 를 리액트로 보내서 "## 님 환영합니다 출력"
			return id;
		} else {
			System.out.println("Join Failed");
			return "Join Failed";
		}

	}

	@PostMapping("/login") // 로그인
	public String login(@RequestBody Al_userVO loginData) {
		int result = user.login(loginData);
		if (result == 1) {
			System.out.println("Login Success");
			return loginData.getUserId();
		} else {
			System.out.println("Login Failed");
			return "아이디와 비밀번호를 확인하세요";
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
