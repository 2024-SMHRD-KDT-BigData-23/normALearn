package com.projectA.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.projectA.VO.Al_resultVO;

@Mapper
public interface result_mapper {
	// 처음 리스트 가져옴
	public List<Al_resultVO> getResultList();
	// 드래그해서 순서 바뀔때 순서 바뀌게 해줌
	public Al_resultVO changeResultNumber(Al_resultVO data);
	// 체크박스로 Y N 변경
	public void changeResultCheckBox(Al_resultVO listInfo);
	// 마이페이지에 표시되는 result 값 on/off 
	public void mypageCheck(Al_resultVO resultInfo);
	
	public List<Al_resultVO> getMypageList();
	
	
	
}
