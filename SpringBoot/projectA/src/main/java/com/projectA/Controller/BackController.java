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

	@GetMapping("/getListResult")
	public ResponseEntity<List<Al_resultVO>> getListResult() {
		// DB의 al_result 에서 가져온 값들을 리스트 data 에 담아서 리엑트로 보낸다.
		List<Al_resultVO> data = result.getResultList();
		for (int i = 0; i < data.size(); i++) {
			System.out.println(data.get(i).getNickname());
		}
		return ResponseEntity.ok(data);
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