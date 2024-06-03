package com.projectA.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.projectA.VO.Al_resultVO;

@Mapper
public interface result_mapper {

	public List<Al_resultVO> getResultList();
	
	public Al_resultVO changeResultNumber(Al_resultVO data);
	
}
