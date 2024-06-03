package com.projectA.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.projectA.VO.Al_outputVO;

@Mapper
public interface output_mapper {
	
	public List<Al_outputVO> getListOutput();

}
